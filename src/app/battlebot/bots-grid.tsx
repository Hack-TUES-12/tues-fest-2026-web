'use client';

import { useLayoutEffect, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { motion, useReducedMotion } from 'motion/react';
import { TbSword, TbWeight } from 'react-icons/tb';

import { useTRPC } from '@/lib/trpc/react';
import { type RouterOutputs } from '@/lib/trpc/react';
import { SECTION_IN_VIEW_TALL, sectionFadeUp, sectionFadeUpOnMount } from '@/lib/motion/section-in-view';

type Bot = RouterOutputs['battleBots']['getBots'][number];

/** Matches the grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4` */
const SM_MIN = '(min-width: 640px)';
const LG_MIN = '(min-width: 1024px)';
const XL_MIN = '(min-width: 1280px)';

function getColumnCount(): number {
	if (typeof window === 'undefined') return 1;
	if (window.matchMedia(XL_MIN).matches) return 4;
	if (window.matchMedia(LG_MIN).matches) return 3;
	if (window.matchMedia(SM_MIN).matches) return 2;
	return 1;
}

function useColumnCount(): number {
	const [cols, setCols] = useState(1);
	useLayoutEffect(() => {
		setCols(getColumnCount());
		const mqs = [SM_MIN, LG_MIN, XL_MIN].map((q) => window.matchMedia(q));
		const onChange = () => setCols(getColumnCount());
		mqs.forEach((mq) => mq.addEventListener('change', onChange));
		return () => mqs.forEach((mq) => mq.removeEventListener('change', onChange));
	}, []);
	return cols;
}

function BotCardMotion({ children, index, columnCount }: { children: ReactNode; index: number; columnCount: number }) {
	const reducedMotion = useReducedMotion();
	const colIndex = index % columnCount;
	const delaySec = 0.06 + colIndex * 0.055;
	const isFirstRow = index < columnCount;

	if (isFirstRow) {
		return (
			<motion.div className="min-w-0 h-full" {...sectionFadeUpOnMount(reducedMotion, delaySec)}>
				{children}
			</motion.div>
		);
	}

	return (
		<motion.div
			className="min-w-0 h-full"
			{...sectionFadeUp(reducedMotion, delaySec)}
			viewport={SECTION_IN_VIEW_TALL}
		>
			{children}
		</motion.div>
	);
}

function BotCard({ bot }: { bot: Bot }) {
	const hasPhoto = bot.photoCount > 0;
	const photoUrl = hasPhoto ? `/battlebots/${encodeURIComponent(bot.name)}/1.webp` : null;

	return (
		<Link href={`/battlebot/${bot.id}`} className="group block h-full focus-visible:outline-none">
			<article className="flex h-full flex-col overflow-hidden rounded-2xl bg-card/70 shadow-lg backdrop-blur-sm transition-all duration-300 group-focus-visible:ring-2">
				{/* Photo / placeholder */}
				<div className="relative aspect-[4/3] overflow-hidden">
					{photoUrl ? (
						<img
							src={photoUrl}
							alt={bot.name}
							className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
						/>
					) : (
						<div
							className="flex h-full w-full items-center justify-center"
							style={{
								background: `radial-gradient(ellipse at 60% 40%, ${bot.primaryColor}30 0%, transparent 70%), var(--color-card)`,
							}}
						>
							<span
								className="font-title select-none text-5xl font-bold opacity-20"
								style={{ color: bot.primaryColor }}
							>
								{bot.name.charAt(0).toUpperCase()}
							</span>
						</div>
					)}
					<div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card/90 to-transparent" />
				</div>

				{/* Color accent bar */}
				<div
					className="h-[3px] w-full shrink-0 opacity-70 transition-opacity duration-300 group-hover:opacity-100"
					style={{ backgroundColor: bot.primaryColor }}
				/>

				{/* Content */}
				<div className="flex flex-1 flex-col gap-3 p-5">
					<div className="flex flex-col gap-0.5">
						<h2 className="font-title text-lg leading-snug text-white">{bot.name}</h2>
						<p className="text-xs font-medium tracking-wide text-foreground/50 uppercase">
							{bot.teamName}
						</p>
					</div>

					{bot.slogan && (
						<p className="line-clamp-2 text-sm italic text-foreground/60">
							&ldquo;{bot.slogan}&rdquo;
						</p>
					)}

					<div className="mt-auto flex flex-wrap gap-2 pt-1">
						<span className="flex items-center gap-1.5 rounded-full border border-white/8 bg-white/5 px-3 py-1 text-xs text-foreground/65">
							<TbSword size={12} />
							{bot.weapon}
						</span>
						<span className="flex items-center gap-1.5 rounded-full border border-white/8 bg-white/5 px-3 py-1 text-xs text-foreground/65">
							<TbWeight size={12} />
							{parseFloat(bot.weightKg).toLocaleString('bg-BG', { maximumFractionDigits: 1 })} кг
						</span>
					</div>
				</div>
			</article>
		</Link>
	);
}

export function BotsGrid() {
	const trpc = useTRPC();
	const columnCount = useColumnCount();
	const { data: bots, isLoading } = useQuery(trpc.battleBots.getBots.queryOptions());

	if (isLoading) return null;

	if (!bots?.length) {
		return (
			<p className="py-12 text-center text-sm text-foreground/50">
				Роботите скоро ще бъдат обявени.
			</p>
		);
	}

	return (
		<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{bots.map((bot, i) => (
				<BotCardMotion key={bot.id} index={i} columnCount={columnCount}>
					<BotCard bot={bot} />
				</BotCardMotion>
			))}
		</div>
	);
}
