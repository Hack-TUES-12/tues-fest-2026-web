import { type Metadata } from 'next';

import { HydrateClient, api } from '@/lib/trpc/server';

import { BracketLive } from './bracket-live';

export const metadata: Metadata = {
	title: 'Battle Bots — На живо',
};

export default async function BattlebotLivePage() {
	void api.battleBots.getTournament.prefetch();

	return (
		<HydrateClient>
			<main style={{ padding: '2rem', fontFamily: 'monospace' }}>
				<h1>Battle Bots — На живо</h1>
				<BracketLive />
			</main>
		</HydrateClient>
	);
}
