import { unstable_cache } from 'next/cache';
import { type z } from 'zod';

import { env } from 'env.mjs';

import { MatchesResponseSchema, type ParticipantEntrySchema } from './battle-bots.schemas';

export const BATTLE_BOTS_CACHE_TAG = 'battle-bots-tournament';

const BASE = 'https://api.challonge.com/v2';

export function getRoundLabel(round: number, maxRound: number): string {
	if (round === maxRound) return 'Финал';
	if (round === maxRound - 1) return 'Полуфинал';
	if (round === 1) return 'Четвъртфинал';
	return `Рунд ${round}`;
}

export function parseScore(scores: string, playerIndex: 0 | 1): number | null {
	const parts = scores.split(' - ');
	const val = parts[playerIndex];
	if (val === undefined || val === '') return null;
	const n = parseInt(val, 10);
	return isNaN(n) ? null : n;
}

export function buildParticipantMap(
	included: z.infer<typeof ParticipantEntrySchema>[],
): Map<string, { id: number; name: string; seed: number }> {
	return new Map(
		included.map((p) => [
			p.id,
			{ id: parseInt(p.id, 10), name: p.attributes.name, seed: p.attributes.seed },
		]),
	);
}

export const fetchTournamentBracket = unstable_cache(
	async () => {
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
		const participantMap = buildParticipantMap(included ?? []);

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
	},
	['battle-bots-bracket'],
	{ tags: [BATTLE_BOTS_CACHE_TAG], revalidate: 300 },
);
