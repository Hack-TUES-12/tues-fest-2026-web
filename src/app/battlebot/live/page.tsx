import { type Metadata } from 'next';
import { notFound } from 'next/navigation';

import { growthbook } from '@/lib/growthbook/server';
import { HydrateClient, api } from '@/lib/trpc/server';

import { LiveStream } from './live-stream';
import { ResultsHeader } from './results-header';
import { BracketLive } from './bracket-live';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
	title: 'Battle Bots — На живо',
	description: 'Следете резултатите на Battle Bots турнира на TUES Fest 2026 в реално време.',
};

export default async function BattlebotLivePage() {
	const gb = await growthbook();
	const streamIsOn = gb.isOn('tf-battle-bots-stream');
	const resultsIsOn = gb.isOn('tf-battle-bots-results');

	if (!streamIsOn && !resultsIsOn) {
		notFound();
	}

	void api.battleBots.getTournament.prefetch();

	return (
		<HydrateClient>
			<div className="relative px-4 pt-10 pb-24 md:px-8 md:pt-14">
				{/* Background decorations */}
				<div
					className="pointer-events-none absolute top-0 bottom-0 left-1/2 z-0 w-[100dvw] max-w-none -translate-x-1/2"
					aria-hidden
				>
					<img
						src="/decorations/battle-bots-circle.svg"
						alt=""
						aria-hidden="true"
						className="pointer-events-none absolute top-0 right-0 h-auto w-[min(35vw,26rem)] translate-x-1/4 -translate-y-1/3 opacity-60 select-none"
					/>
					<img
						src="/decorations/battle-bots-circle.svg"
						alt=""
						aria-hidden="true"
						className="pointer-events-none absolute bottom-0 left-0 h-auto w-[min(32vw,28rem)] translate-y-1/5 -translate-x-1/4 opacity-50 select-none"
					/>
				</div>

				<div className="relative z-10 flex w-full flex-col items-center gap-24">
					<LiveStream />

					{resultsIsOn && (
						<div className='flex flex-col gap-12'>
							<ResultsHeader />
							<BracketLive />
						</div>
					)}
				</div>
			</div>
		</HydrateClient>
	);
}
