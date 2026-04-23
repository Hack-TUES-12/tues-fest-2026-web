import Link from 'next/link';
import { type Metadata } from 'next';
import { TbArrowRight, TbVideo } from 'react-icons/tb';

import { Button } from '@/components/ui/button';
import { growthbook } from '@/lib/growthbook/server';
import { HydrateClient, api } from '@/lib/trpc/server';

import { BotsGrid } from './bots-grid';

export const metadata: Metadata = {
	title: 'Роботи — TUES Battle Bots',
	description: 'Всички участници в TUES Battle Bots 2026.',
};

export default async function BattlebotsPage() {
	void api.battleBots.getBots.prefetch();

	const gb = await growthbook();
	const streamIsOn = gb.isOn('tf-battle-bots-stream');
	const resultsIsOn = gb.isOn('tf-battle-bots-results');
	const livePageIsOn = streamIsOn || resultsIsOn;

	return (
		<HydrateClient>
			<div className="relative px-4 pt-10 pb-24 md:px-8 md:pt-14">
				{/* Background decorations */}
				<div
					className="pointer-events-none absolute top-0 bottom-0 left-1/2 z-0 w-[100dvw] max-w-none -translate-x-1/2"
					aria-hidden
				>
					<img
						src="/decorations/purple-circle.svg"
						alt=""
						aria-hidden="true"
						className="pointer-events-none absolute top-0 right-0 h-auto w-[min(45vw,34rem)] translate-x-1/3 -translate-y-1/4 opacity-60 select-none"
					/>
					<img
						src="/decorations/purple-circle.svg"
						alt=""
						aria-hidden="true"
						className="pointer-events-none absolute bottom-[20%] left-0 h-auto w-[min(35vw,26rem)] -translate-x-1/3 opacity-40 select-none"
					/>
				</div>

				<div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10">
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-2">
							<p className="text-primary text-sm font-medium tracking-widest uppercase">
								TUES Fest 2026
							</p>
							<h1 className="font-title text-4xl text-white md:text-5xl">Battle Bots</h1>
							<p className="text-foreground/65 max-w-xl text-base leading-relaxed">
								Осем отбора. Осем робота. Само един победител. Запознай се с участниците в турнира.
							</p>
						</div>

						{livePageIsOn && (
							<div className="flex gap-3">
								{streamIsOn && (
									<Button asChild variant="default" size="default" className="font-bold">
										<Link href="/battlebot/live">
											<TbVideo size={16} />
											Гледай на живо
										</Link>
									</Button>
								)}
								{resultsIsOn && (
									<Button asChild variant="default-secondary" size="default" className="font-bold">
										<Link href="/battlebot/live">
											Резултати от турнира
											<TbArrowRight size={16} />
										</Link>
									</Button>
								)}
							</div>
						)}
					</div>

					<BotsGrid />
				</div>
			</div>
		</HydrateClient>
	);
}
