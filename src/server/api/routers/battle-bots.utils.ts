import { unstable_cache } from 'next/cache';
import { eq } from 'drizzle-orm';
import { type z } from 'zod';

import { env } from 'env.mjs';
import { db } from '@/server/db';
import { battleBots } from '@/server/db/schema';

import { MatchesResponseSchema, type ParticipantEntrySchema } from './battle-bots.schemas';

export const BATTLE_BOTS_CACHE_TAG = 'battle-bots-tournament';
export const BATTLE_BOTS_LIST_CACHE_TAG = 'battle-bots-list';

async function fetchBotsUncached() {
	return db
		.select({
			id: battleBots.id,
			name: battleBots.name,
			teamName: battleBots.teamName,
			slogan: battleBots.slogan,
			weapon: battleBots.weapon,
			weightKg: battleBots.weightKg,
			photoCount: battleBots.photoCount,
			primaryColor: battleBots.primaryColor,
			textColor: battleBots.textColor,
		})
		.from(battleBots);
}

export const fetchBots =
	env.NODE_ENV === 'development'
		? fetchBotsUncached
		: unstable_cache(fetchBotsUncached, [BATTLE_BOTS_LIST_CACHE_TAG], {
				tags: [BATTLE_BOTS_LIST_CACHE_TAG],
				revalidate: 5 * 60,
			});

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

		const dbBots = await db
			.select({ name: battleBots.name, primaryColor: battleBots.primaryColor, textColor: battleBots.textColor })
			.from(battleBots);
		const colorMap = new Map(dbBots.map((b) => [b.name, { primaryColor: b.primaryColor, textColor: b.textColor }]));

		const positiveMatches = matchData.filter((m) => m.attributes.round > 0);
		const maxRound = Math.max(...positiveMatches.map((m) => m.attributes.round));
		const roundNumbers = [
			...new Set(positiveMatches.map((m) => m.attributes.round)),
		].sort((a, b) => a - b);

		const rounds = roundNumbers.map((round) => {
			const matches = positiveMatches
				.filter((m) => m.attributes.round === round)
				.map((m) => {
					const p1Id = m.relationships?.player1?.data?.id;
					const p2Id = m.relationships?.player2?.data?.id;
					const p1 = p1Id !== undefined ? participantMap.get(p1Id) : undefined;
					const p2 = p2Id !== undefined ? participantMap.get(p2Id) : undefined;

					const p1Colors = p1 ? (colorMap.get(p1.name) ?? { primaryColor: null, textColor: null }) : null;
					const p2Colors = p2 ? (colorMap.get(p2.name) ?? { primaryColor: null, textColor: null }) : null;

					return {
						id: parseInt(m.id, 10),
						player1: p1
							? {
									...p1,
									score: parseScore(m.attributes.scores, 0),
									primaryColor: p1Colors?.primaryColor ?? null,
									textColor: p1Colors?.textColor ?? null,
								}
							: null,
						player2: p2
							? {
									...p2,
									score: parseScore(m.attributes.scores, 1),
									primaryColor: p2Colors?.primaryColor ?? null,
									textColor: p2Colors?.textColor ?? null,
								}
							: null,
						winnerId: m.attributes.winners ?? null,
						state: m.attributes.state,
					};
				});

			return { label: getRoundLabel(round, maxRound), matches, round };
		});

		// Sync scores to DB for participants whose names exist in the battle_bots table
		await Promise.all(
			rounds.flatMap(({ round, matches }) => {
				const column =
					round === maxRound
						? battleBots.finalResult
						: round === maxRound - 1
							? battleBots.semiFinalResult
							: battleBots.quarterFinalResult;

				return matches.flatMap(({ player1, player2 }) =>
					[
						player1 && player1.score !== null ? { name: player1.name, score: player1.score } : null,
						player2 && player2.score !== null ? { name: player2.name, score: player2.score } : null,
					]
						.filter((p) => p !== null)
						.map(({ name, score }) =>
							db
								.update(battleBots)
								.set({ [column.name]: score })
								.where(eq(battleBots.name, name)),
						),
				);
			}),
		);

		return rounds.map(({ label, matches }) => ({ label, matches }));
	},
	['battle-bots-bracket'],
	{ tags: [BATTLE_BOTS_CACHE_TAG], revalidate: 300 },
);
