import { type z } from 'zod';

import { type ParticipantEntrySchema } from './battle-bots.schemas';

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
