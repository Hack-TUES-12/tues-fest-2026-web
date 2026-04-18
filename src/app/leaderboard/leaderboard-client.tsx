'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { motion, useReducedMotion } from 'motion/react';
import { TbMedal, TbTrophy, TbArrowRight } from 'react-icons/tb';
import { useTRPC } from '@/lib/trpc/react';
import { type RouterOutputs } from '@/lib/trpc/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	listItemEntrance,
	SECTION_FADE_IN_DURATION_SEC,
	sectionFadeIn,
	sectionFadeUp,
} from '@/lib/motion/section-in-view';
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

export function LeaderboardClient({ initialData }: LeaderboardClientProps) {
	const reducedMotion = useReducedMotion();
	const trpc = useTRPC();
	const { data, isLoading, error } = useQuery({
		...trpc.voting.getTopProjectsByVotes.queryOptions(),
		initialData,
		refetchInterval: 5000, // Poll every 5 seconds
	});

	if (error) {
		return (
			<div className="relative px-4 pt-10 pb-24 md:px-8 md:pt-14">
				<div className="mx-auto max-w-3xl text-center">
					<p className="text-destructive">Error loading leaderboard: {error.message}</p>
				</div>
			</div>
		);
	}

	const top3 = data?.slice(0, 3) ?? [];
	const remaining = data?.slice(3, 10) ?? [];
	const hasData = data && data.length > 0;

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
				{/* Hero Section */}
				<motion.section
					className="relative isolate mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center"
					{...sectionFadeIn(reducedMotion, 0)}
				>
					<motion.p
						className="text-primary text-sm font-medium tracking-widest"
						{...sectionFadeUp(reducedMotion, 0.06)}
					>
						Проекти
					</motion.p>
					<motion.h1
						className="font-title text-5xl text-white md:text-6xl"
						{...sectionFadeUp(reducedMotion, 0.12)}
					>
						Класация
					</motion.h1>
					<motion.p
						className="text-foreground/75 max-w-2xl text-lg leading-relaxed text-pretty"
						{...sectionFadeUp(reducedMotion, 0.18)}
					>
						Вижте най-гласуваните проекти от ТУЕС Фест. Класацията се обновява всеки 5 секунди.
					</motion.p>

					<IfTFFeatureOn feature="project-voting">
						<motion.div {...sectionFadeUp(reducedMotion, 0.26)}>
							<Button asChild variant="default" size="lg" className="shadow-primary/20 font-bold shadow-lg">
								<Link href="/projects">
									<TbArrowRight size={18} />
									Гласувайте
								</Link>
							</Button>
						</motion.div>
					</IfTFFeatureOn>
				</motion.section>

				{/* Top 3 Section */}
				{hasData && top3.length > 0 && (
					<motion.section
						className="mx-auto w-full max-w-5xl"
						{...sectionFadeIn(reducedMotion, 0)}
					>
						<div className="grid gap-6 md:gap-8">
							{top3.length === 1 && (
								<motion.div {...listItemEntrance(reducedMotion, 0, 0.12, SECTION_FADE_IN_DURATION_SEC)}>
									<TopPlaceCard
										place={1}
										project={top3[0]!}
										Icon={MEDAL_ICONS[0]!}
										colorClass={MEDAL_COLORS[0]!}
										toneClas={MEDAL_TONES[0]!}
									/>
								</motion.div>
							)}

							{top3.length === 2 && (
								<div className="grid gap-6 md:grid-cols-2 md:gap-8">
									{top3.map((project, idx) => (
										<motion.div
											key={project.id}
											{...listItemEntrance(reducedMotion, idx, 0.12, SECTION_FADE_IN_DURATION_SEC)}
										>
											<TopPlaceCard
												place={idx + 1}
												project={project}
												Icon={MEDAL_ICONS[idx]!}
												colorClass={MEDAL_COLORS[idx]!}
												toneClas={MEDAL_TONES[idx]!}
											/>
										</motion.div>
									))}
								</div>
							)}

							{top3.length >= 3 && (
								<div className="grid gap-6 md:grid-cols-3 md:gap-8">
									{/* 2nd place - left, bigger */}
									<motion.div
										className="md:col-start-1 md:row-start-1"
										{...listItemEntrance(reducedMotion, 1, 0.12, SECTION_FADE_IN_DURATION_SEC)}
									>
										<TopPlaceCard
											place={2}
											project={top3[1]!}
											Icon={MEDAL_ICONS[1]!}
											colorClass={MEDAL_COLORS[1]!}
											toneClas={MEDAL_TONES[1]!}
											isSecond
										/>
									</motion.div>

									{/* 1st place - center, biggest */}
									<motion.div
										className="md:col-start-2 md:row-start-1"
										{...listItemEntrance(reducedMotion, 0, 0.12, SECTION_FADE_IN_DURATION_SEC)}
									>
										<TopPlaceCard
											place={1}
											project={top3[0]!}
											Icon={MEDAL_ICONS[0]!}
											colorClass={MEDAL_COLORS[0]!}
											toneClas={MEDAL_TONES[0]!}
											isFirst
										/>
									</motion.div>

									{/* 3rd place - right, bigger */}
									<motion.div
										className="md:col-start-3 md:row-start-1"
										{...listItemEntrance(reducedMotion, 2, 0.12, SECTION_FADE_IN_DURATION_SEC)}
									>
										<TopPlaceCard
											place={3}
											project={top3[2]!}
											Icon={MEDAL_ICONS[2]!}
											colorClass={MEDAL_COLORS[2]!}
											toneClas={MEDAL_TONES[2]!}
											isThird
										/>
									</motion.div>
								</div>
							)}
						</div>
					</motion.section>
				)}

				{/* Full Leaderboard (1-10) */}
				{hasData && data.length > 0 && (
					<motion.section
						className="mx-auto w-full max-w-5xl"
						{...sectionFadeIn(reducedMotion, 0)}
					>
						<div className="mb-8">
							<h2 className="font-title text-3xl text-white md:text-4xl text-center">
								Топ 10 проекти
							</h2>
						</div>

						<div className="space-y-2">
							{data.map((project, index) => {
								const place = index + 1;
								return (
									<motion.div
										key={project.id}
										layoutId={`project-${project.id}`}
										layout
										{...listItemEntrance(
											reducedMotion,
											index,
											0.05,
											SECTION_FADE_IN_DURATION_SEC + 0.3,
										)}
									>
										<div className="bg-card/70 rounded-xl px-4 py-3.5 shadow-lg backdrop-blur-md transition-all duration-200 hover:bg-card/85 hover:shadow-xl hover:scale-[1.01] md:px-6 md:py-4">
											<div className="flex items-center gap-4 md:gap-6">
												{/* Rank */}
												<motion.div
													className="flex shrink-0 items-center justify-center w-12 md:w-16"
													layoutId={`rank-${project.id}`}
													layout
												>
													<span className={cn(
														'font-title text-2xl md:text-3xl font-bold transition-colors duration-300',
														place <= 3 ? MEDAL_COLORS[place - 1] : 'text-foreground/60'
													)}>
														{place}
													</span>
												</motion.div>

												{/* Project Name */}
												<div className="flex-1 min-w-0">
													<p className="text-white font-medium text-base md:text-lg truncate">
														{project.name}
													</p>
												</div>

												{/* Vote Count */}
												<motion.div
													className="flex shrink-0 items-center gap-2"
													layoutId={`votes-${project.id}`}
													layout
												>
													<span className="text-foreground/70 text-sm md:text-base">
														{project.voteCount}
													</span>
													<span className="text-foreground/50 text-xs md:text-sm">
														гласове
													</span>
												</motion.div>
											</div>
										</div>
									</motion.div>
								);
							})}
						</div>
					</motion.section>
				)}

				{!hasData && !isLoading && (
					<motion.section
						className="mx-auto w-full max-w-3xl text-center"
						{...sectionFadeIn(reducedMotion, 0)}
					>
						<p className="text-foreground/60">Няма налични данни за гласуване</p>
					</motion.section>
				)}
			</div>
		</div>
	);
}

interface TopPlaceCardProps {
	place: number;
	project: LeaderboardData[0];
	Icon: React.ComponentType<{ size: number; className?: string }>;
	colorClass: string;
	toneClas: string;
	isFirst?: boolean;
	isSecond?: boolean;
	isThird?: boolean;
}

function TopPlaceCard({
	place,
	project,
	Icon,
	colorClass,
	toneClas,
	isFirst,
	isSecond,
	isThird,
}: TopPlaceCardProps) {
	const sizeClass = isFirst ? 'md:scale-110' : isSecond || isThird ? 'md:scale-95' : '';

	return (
		<Card
			variant="primary"
			className={cn(
				'bg-card/70 relative overflow-hidden px-6 py-8 shadow-lg backdrop-blur-md transition-transform duration-300 sm:px-8 sm:py-9',
				sizeClass,
			)}
		>
			<CardContent className="flex flex-col items-center gap-4 p-0">
				{/* Medal Icon */}
				<div className={cn('flex size-14 items-center justify-center rounded-xl', toneClas)}>
					<Icon size={32} className={colorClass} />
				</div>

				{/* Project Name */}
				<div className="text-center">
					<p className="font-title text-xl md:text-2xl text-white font-bold leading-tight">
						{project.name}
					</p>
				</div>

				{/* Vote Count */}
				<div className="flex flex-col items-center gap-2">
					<p className="text-foreground/70 text-sm">Гласове</p>
					<p className="font-title text-3xl md:text-4xl text-primary font-bold">
						{project.voteCount}
					</p>
				</div>

				{/* Place Badge */}
				<div className={cn(
					'mt-2 rounded-full px-4 py-1.5 text-sm font-bold',
					place === 1 && 'bg-yellow-400/20 text-yellow-400',
					place === 2 && 'bg-gray-400/20 text-gray-300',
					place === 3 && 'bg-orange-400/20 text-orange-400',
				)}>
					Място {place}
				</div>
			</CardContent>
		</Card>
	);
}
