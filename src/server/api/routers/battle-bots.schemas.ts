import { z } from 'zod';

export const ParticipantEntrySchema = z.object({
	id: z.string(),
	type: z.literal('participant'),
	attributes: z.object({
		name: z.string(),
		seed: z.number(),
	}),
});

export const MatchEntrySchema = z.object({
	id: z.string(),
	type: z.literal('match'),
	attributes: z.object({
		state: z.string(),
		round: z.number(),
		scores: z.string(),
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

export const MatchesResponseSchema = z.object({
	data: z.array(MatchEntrySchema),
	included: z.array(ParticipantEntrySchema).optional(),
});

export const BracketParticipantSchema = z
	.object({ id: z.number(), name: z.string(), seed: z.number(), score: z.number().nullable() })
	.nullable();

export const BracketMatchSchema = z.object({
	id: z.number(),
	player1: BracketParticipantSchema,
	player2: BracketParticipantSchema,
	winnerId: z.number().nullable(),
	state: z.string(),
});

export const BracketRoundSchema = z.object({
	label: z.string(),
	matches: z.array(BracketMatchSchema),
});
