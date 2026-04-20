import { type Metadata } from 'next';

import { HydrateClient, api } from '@/lib/trpc/server';

import { BracketLive } from './bracket-live';

export const metadata: Metadata = {
	title: 'Battle Bots — На живо',
	description: 'Следете резултатите на Battle Bots турнира на TUES Fest 2026 в реално време.',
};

export default async function BattlebotLivePage() {
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

				<div className="relative z-10 flex w-full flex-col items-center gap-14">
					{/* Header — same pattern as /about, /schedule, /leaderboard */}
					<section className="flex flex-col items-center gap-2 text-center">
						<p className="text-secondary text-sm font-medium tracking-widest uppercase">
							TUES Battle Bots
						</p>
						<h1 className="font-title text-5xl text-white md:text-6xl">Резултати от турнира</h1>
						<p className="text-foreground/70 max-w-xl text-pretty text-lg leading-relaxed">
							Следете резултатите от състезанието TUES Battle Bots 2026 в реално време.
						</p>
					</section>

					<BracketLive />
				</div>
			</div>
		</HydrateClient>
	);
}
