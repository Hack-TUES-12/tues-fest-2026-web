import { env } from 'env.mjs';
import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '../trpc';

const BASE = 'https://api.challonge.com/v2';

// Actual v2 API shapes (id is on the outer object as a string, not in attributes)

const ParticipantEntrySchema = z.object({
	id: z.string(), // numeric string, e.g. "291674167"
	type: z.literal('participant'),
	attributes: z.object({
		name: z.string(),
		seed: z.number(),
	}),
});

const MatchEntrySchema = z.object({
	id: z.string(),
	type: z.literal('match'),
	attributes: z.object({
		state: z.string(),
		round: z.number(),
		scores: z.string(), // e.g. "36 - 23"
		winners: z.number().nullable().optional(),
	}),
	relationships: z
		.object({
			player1: z
				.object({ data: z.object({ id: z.string() }).nullable().optional() })
				.optional(),
			player2: z
				.object({ data: z.object({ id: z.string() }).nullable().optional() })
				.optional(),
		})
		.optional(),
});

const MatchesResponseSchema = z.object({
	data: z.array(MatchEntrySchema),
	included: z.array(ParticipantEntrySchema).optional(),
});

const BracketParticipantSchema = z
	.object({ id: z.number(), name: z.string(), seed: z.number(), score: z.number().nullable() })
	.nullable();

const BracketMatchSchema = z.object({
	id: z.number(),
	player1: BracketParticipantSchema,
	player2: BracketParticipantSchema,
	winnerId: z.number().nullable(),
	state: z.string(),
});

const BracketRoundSchema = z.object({
	label: z.string(),
	matches: z.array(BracketMatchSchema),
});

function getRoundLabel(round: number, maxRound: number): string {
	if (round === maxRound) return 'Финал';
	if (round === maxRound - 1) return 'Полуфинал';
	if (round === 1) return 'Четвъртфинал';
	return `Рунд ${round}`;
}

function parseScore(scores: string, playerIndex: 0 | 1): number | null {
	const parts = scores.split(' - ');
	const val = parts[playerIndex];
	if (val === undefined || val === '') return null;
	const n = parseInt(val, 10);
	return isNaN(n) ? null : n;
}

export const tournamentRouter = createTRPCRouter({
	getBracket: publicProcedure.output(z.array(BracketRoundSchema)).query(async () => {
		const key = env.CHALLONGE_API_KEY;
		const id = env.CHALLONGE_TOURNAMENT_ID;

		const headers = {
			Accept: 'application/json',
			'Content-Type': 'application/vnd.api+json',
			Authorization: key,
		};

		const matchesRes = await fetch(`${BASE}/tournaments/${id}/matches`, { headers });
		const matchesJson: unknown = await matchesRes.json();

		const { data: matchData, included } = MatchesResponseSchema.parse(matchesJson);

		// Build participant map from the included sideload (id string → participant)
		const participantMap = new Map(
			(included ?? []).map((p) => [
				p.id,
				{ id: parseInt(p.id, 10), name: p.attributes.name, seed: p.attributes.seed },
			]),
		);

		const positiveMatches = matchData.filter((m) => m.attributes.round > 0);
		const maxRound = Math.max(...positiveMatches.map((m) => m.attributes.round));
		const roundNumbers = [
			...new Set(positiveMatches.map((m) => m.attributes.round)),
		].sort((a, b) => a - b);

		return roundNumbers.map((round) => {
			const matches = positiveMatches
				.filter((m) => m.attributes.round === round)
				.map((m) => {
					const p1Id = m.relationships?.player1?.data?.id;
					const p2Id = m.relationships?.player2?.data?.id;
					const p1 = p1Id !== undefined ? participantMap.get(p1Id) : undefined;
					const p2 = p2Id !== undefined ? participantMap.get(p2Id) : undefined;

					return {
						id: parseInt(m.id, 10),
						player1: p1 ? { ...p1, score: parseScore(m.attributes.scores, 0) } : null,
						player2: p2 ? { ...p2, score: parseScore(m.attributes.scores, 1) } : null,
						winnerId: m.attributes.winners ?? null,
						state: m.attributes.state,
					};
				});

			return { label: getRoundLabel(round, maxRound), matches };
		});
	}),
});
