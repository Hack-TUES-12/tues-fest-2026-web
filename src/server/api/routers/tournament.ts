import { z } from 'zod';
import { eq } from 'drizzle-orm';

import { db } from '@/server/db';
import { battleBots, battleBotParticipants } from '@/server/db/schema';
import { BracketRoundSchema } from './battle-bots.schemas';
import { fetchBots, fetchTournamentBracket } from './battle-bots.utils';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const battleBotsRouter = createTRPCRouter({
	getTournament: publicProcedure.output(z.array(BracketRoundSchema)).query(() => {
		return fetchTournamentBracket();
	}),

	getBots: publicProcedure.query(() => {
		return fetchBots();
	}),

	getBot: publicProcedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
		const [bot] = await db.select().from(battleBots).where(eq(battleBots.id, input.id));
		if (!bot) return null;
		const participants = await db
			.select({ name: battleBotParticipants.participantName })
			.from(battleBotParticipants)
			.where(eq(battleBotParticipants.botId, input.id));
		return { ...bot, participants: participants.map((p) => p.name) };
	}),
});
