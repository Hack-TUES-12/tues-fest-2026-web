'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { TbArrowRight, TbMedal, TbRefresh, TbTrophy } from 'react-icons/tb';
import { useTRPC } from '@/lib/trpc/react';
import { type RouterOutputs } from '@/lib/trpc/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { IfTFFeatureOn } from '@/lib/growthbook/react/client';
import { cn } from '@/lib/utils';

type LeaderboardData = RouterOutputs['voting']['getTopProjectsByVotes'];

interface LeaderboardClientProps {
	initialData: LeaderboardData;
}

const MEDAL_ICONS = [TbTrophy, TbMedal, TbMedal];
const MEDAL_COLORS = ['text-yellow-400', 'text-gray-300', 'text-orange-400'];
const MEDAL_TONES = [
	'bg-yellow-400/10 text-yellow-400',
	'bg-gray-400/10 text-gray-300',
	'bg-orange-400/10 text-orange-400',
];

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const LAYOUT_SPRING = {
	type: 'spring' as const,
	stiffness: 380,
	damping: 38,
	mass: 0.7,
} as const;

export function LeaderboardClient({ initialData }: LeaderboardClientProps) {
	const reducedMotion = useReducedMotion();
	const trpc = useTRPC();
	const [simData, setSimData] = useState<LeaderboardData | null>(null);

	const { data, isLoading, error } = useQuery({
		...trpc.voting.getTopProjectsByVotes.queryOptions(),
		initialData,
		refetchInterval: 5000,
	});

	const displayData = simData ?? data;

	function simulateReorder() {
		const base = displayData ?? [];
		if (base.length === 0) return;
		const shuffled = [...base]
			.map((p) => ({
				...p,
				voteCount: Math.max(0, p.voteCount + Math.floor(Math.random() * 10) - 5),
			}))
			.sort((a, b) => b.voteCount - a.voteCount);
		setSimData(shuffled);
	}

	if (error) {
		return (
			<div className="relative px-4 pt-10 pb-24 md:px-8 md:pt-14">
				<div className="mx-auto max-w-3xl text-center">
					<p className="text-destructive">Error loading leaderboard: {error.message}</p>
				</div>
			</div>
		);
	}

	const top3 = displayData?.slice(0, 3) ?? [];
	const hasData = displayData && displayData.length > 0;

	return (
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
					className="pointer-events-none absolute top-0 left-0 h-auto w-[min(50vw,40rem)] max-w-4xl -translate-x-1/4 -translate-y-1/4 opacity-90 select-none"
				/>
				<img
					src="/decorations/blue-circle.svg"
					alt=""
					aria-hidden="true"
					className="pointer-events-none absolute bottom-0 right-0 h-auto w-[min(42vw,32rem)] translate-x-1/4 opacity-80 select-none"
				/>
			</div>

			<div className="relative z-10 flex w-full flex-col items-center gap-16 md:gap-20">
				{/* Hero */}
				<section className="relative isolate mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center">
					<motion.p
						className="text-primary text-sm font-medium tracking-widest"
						initial={reducedMotion ? false : { opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.05, ease: EASE_OUT }}
					>
						Проекти
					</motion.p>
					<motion.h1
						className="font-title text-5xl text-white md:text-6xl"
						initial={reducedMotion ? false : { opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.12, ease: EASE_OUT }}
					>
						Класация
					</motion.h1>
					<motion.p
						className="text-foreground/75 max-w-2xl text-lg leading-relaxed text-pretty"
						initial={reducedMotion ? false : { opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.18, ease: EASE_OUT }}
					>
						Вижте най-гласуваните проекти от ТУЕС Фест. Класацията се обновява на всеки 5 секунди.
					</motion.p>

					<IfTFFeatureOn feature="project-voting">
						<motion.div
							initial={reducedMotion ? false : { opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.26, ease: EASE_OUT }}
						>
							<Button asChild variant="default" size="lg" className="shadow-primary/20 font-bold shadow-lg">
								<Link href="/projects">
									<TbArrowRight size={18} />
									Гласувайте
								</Link>
							</Button>
						</motion.div>
					</IfTFFeatureOn>
				</section>

				{/* Top 3 */}
				{hasData && top3.length > 0 && (
					<section className="mx-auto w-full max-w-5xl">
						{top3.length >= 3 ? (
							<div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:items-end md:gap-6">
								{/* 2nd */}
								<motion.div
									key={top3[1]!.id}
									initial={reducedMotion ? false : { opacity: 0, y: 24 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.55, delay: 0.35, ease: EASE_OUT }}
									className="md:order-1"
								>
									<TopPlaceCard place={2} project={top3[1]!} />
								</motion.div>
								{/* 1st */}
								<motion.div
									key={top3[0]!.id}
									initial={reducedMotion ? false : { opacity: 0, y: 24 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.55, delay: 0.22, ease: EASE_OUT }}
									className="md:order-2"
								>
									<TopPlaceCard place={1} project={top3[0]!} isFirst />
								</motion.div>
								{/* 3rd */}
								<motion.div
									key={top3[2]!.id}
									initial={reducedMotion ? false : { opacity: 0, y: 24 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.55, delay: 0.45, ease: EASE_OUT }}
									className="md:order-3"
								>
									<TopPlaceCard place={3} project={top3[2]!} />
								</motion.div>
							</div>
						) : (
							<div className={cn('grid gap-4', top3.length === 2 ? 'md:grid-cols-2' : '')}>
								{top3.map((project, idx) => (
									<motion.div
										key={project.id}
										initial={reducedMotion ? false : { opacity: 0, y: 24 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.55, delay: 0.22 + idx * 0.1, ease: EASE_OUT }}
									>
										<TopPlaceCard place={idx + 1} project={project} isFirst={idx === 0} />
									</motion.div>
								))}
							</div>
						)}
					</section>
				)}

				{/* Full leaderboard 1–10 */}
				{hasData && displayData.length > 0 && (
					<section className="mx-auto w-full max-w-5xl">
						<motion.h2
							className="font-title mb-6 text-center text-3xl text-white md:text-4xl"
							initial={reducedMotion ? false : { opacity: 0, y: 12 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.5, ease: EASE_OUT }}
						>
							Топ 10 проекти
						</motion.h2>

						{process.env.NODE_ENV === 'development' && (
							<motion.div
								initial={reducedMotion ? false : { opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.4, delay: 0.4 }}
							>
								<Button
									onClick={simulateReorder}
									variant="outline"
									size="sm"
									className="border-dashed border-white/20 text-foreground/50 hover:text-foreground/80"
								>
									<TbRefresh size={14} />
									Simulate reorder
								</Button>
							</motion.div>
						)}

						<motion.div layout className="space-y-2">
							<AnimatePresence mode="popLayout" initial={false}>
								{displayData.map((project, index) => {
									const place = index + 1;
									return (
										<motion.div
											key={project.id}
											layoutId={`row-${project.id}`}
											layout="position"
											initial={reducedMotion ? false : { opacity: 0, x: -16 }}
											animate={{ opacity: 1, x: 0 }}
											exit={{ opacity: 0, scale: 0.95 }}
											transition={{
												layout: LAYOUT_SPRING,
												opacity: { duration: 0.3, delay: isLoading ? 0 : index * 0.04, ease: EASE_OUT },
												x: { duration: 0.35, delay: isLoading ? 0 : index * 0.04, ease: EASE_OUT },
											}}
										>
											<div className="bg-card/70 rounded-xl px-4 py-3.5 shadow-sm backdrop-blur-md transition-colors duration-200 hover:bg-card/85 md:px-6 md:py-4">
												<div className="flex items-center gap-4 md:gap-6">
													<div className="flex w-10 shrink-0 items-center justify-center md:w-14">
														<span
															className={cn(
																'font-title text-2xl font-bold md:text-3xl',
																place === 1 && 'text-yellow-400',
																place === 2 && 'text-gray-300',
																place === 3 && 'text-orange-400',
																place > 3 && 'text-foreground/40',
															)}
														>
															{place}
														</span>
													</div>

													<div className="min-w-0 flex-1">
														<p className="truncate text-base font-medium text-white md:text-lg">
															{project.name}
														</p>
													</div>

													<div className="flex shrink-0 items-baseline gap-1.5">
														<span className="font-mono text-sm font-medium text-foreground/80 md:text-base">
															{project.voteCount}
														</span>
														<span className="text-xs text-foreground/40">гласа</span>
													</div>
												</div>
											</div>
										</motion.div>
									);
								})}
							</AnimatePresence>
						</motion.div>
					</section>
				)}

				{!hasData && !isLoading && (
					<p className="text-foreground/60">Няма налични данни за гласуване.</p>
				)}
			</div>
		</div>
	);
}

interface TopPlaceCardProps {
	place: number;
	project: LeaderboardData[0];
	isFirst?: boolean;
}

function TopPlaceCard({ place, project, isFirst }: TopPlaceCardProps) {
	const Icon = MEDAL_ICONS[place - 1]!;
	const colorClass = MEDAL_COLORS[place - 1]!;
	const toneClass = MEDAL_TONES[place - 1]!;

	return (
		<Card
			variant="primary"
			className={cn(
				'bg-card/70 px-6 py-8 shadow-lg backdrop-blur-md sm:px-8',
				isFirst ? 'sm:py-10' : 'sm:py-8',
			)}
		>
			<CardContent className="flex flex-col items-center gap-4 p-0">
				<div className={cn('flex items-center justify-center rounded-xl', toneClass, isFirst ? 'size-16' : 'size-12')}>
					<Icon size={isFirst ? 36 : 26} className={colorClass} />
				</div>

				<p
					className={cn(
						'font-title text-center font-bold leading-tight text-white',
						isFirst ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl',
					)}
				>
					{project.name}
				</p>

				<div className="flex flex-col items-center gap-1">
					<p className="text-xs text-foreground/50">Гласове</p>
					<p
						className={cn(
							'font-title font-bold text-primary',
							isFirst ? 'text-4xl md:text-5xl' : 'text-3xl md:text-4xl',
						)}
					>
						{project.voteCount}
					</p>
				</div>

				<div
					className={cn(
						'rounded-full px-3 py-1 text-xs font-bold',
						place === 1 && 'bg-yellow-400/15 text-yellow-400',
						place === 2 && 'bg-gray-400/15 text-gray-300',
						place === 3 && 'bg-orange-400/15 text-orange-400',
					)}
				>
					{place === 1 ? '🥇' : place === 2 ? '🥈' : '🥉'} Място {place}
				</div>
			</CardContent>
		</Card>
	);
}
