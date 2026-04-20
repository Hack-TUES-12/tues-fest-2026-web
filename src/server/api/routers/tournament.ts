import { z } from 'zod';

import { BracketRoundSchema } from './battle-bots.schemas';
import { fetchTournamentBracket } from './battle-bots.utils';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const battleBotsRouter = createTRPCRouter({
	getTournament: publicProcedure.output(z.array(BracketRoundSchema)).query(() => {
		return fetchTournamentBracket();
	}),
});
