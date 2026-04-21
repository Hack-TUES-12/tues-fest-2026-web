import { z } from 'zod';
import { eq } from 'drizzle-orm';

import { db } from '@/server/db';
import { battleBots, battleBotParticipants } from '@/server/db/schema';
import { BracketRoundSchema } from './battle-bots.schemas';
import { fetchTournamentBracket } from './battle-bots.utils';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const battleBotsRouter = createTRPCRouter({
	getTournament: publicProcedure.output(z.array(BracketRoundSchema)).query(() => {
		return fetchTournamentBracket();
	}),

	getBots: publicProcedure.query(() => {
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
