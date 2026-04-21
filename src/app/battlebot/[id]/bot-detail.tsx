'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, useReducedMotion } from 'motion/react';
import {
	TbArrowLeft,
	TbBrandGithub,
	TbBrandYoutube,
	TbSword,
	TbUser,
	TbWeight,
} from 'react-icons/tb';

import { useTRPC } from '@/lib/trpc/react';
import { type RouterOutputs } from '@/lib/trpc/react';
import { sectionFadeUp } from '@/lib/motion/section-in-view';

type Bot = NonNullable<RouterOutputs['battleBots']['getBot']>;

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

function PhotoGallery({ bot }: { bot: Bot }) {
	const [active, setActive] = useState(0);

	if (bot.photoCount === 0) {
		return (
			<div
				className="flex aspect-[4/3] w-full items-center justify-center rounded-2xl"
				style={{
					background: `radial-gradient(ellipse at 60% 40%, ${bot.textColor}25 0%, transparent 70%), var(--color-card)`,
				}}
			>
				<span
					className="font-title select-none text-8xl font-bold opacity-15"
					style={{ color: bot.textColor }}
				>
					{bot.name.charAt(0).toUpperCase()}
				</span>
			</div>
		);
	}

	const photos = Array.from({ length: bot.photoCount }, (_, i) => ({
		src: `/battlebots/${encodeURIComponent(bot.name)}/${i + 1}.webp`,
		alt: `${bot.name} — снимка ${i + 1}`,
	}));

	return (
		<div className="flex flex-col gap-3">
			<div className="relative overflow-hidden rounded-2xl bg-card/60">
				<img
					key={photos[active]!.src}
					src={photos[active]!.src}
					alt={photos[active]!.alt}
					className="aspect-[4/3] w-full object-cover"
				/>
			</div>
			{photos.length > 1 && (
				<div className="flex flex-wrap gap-2">
					{photos.map((p, i) => (
						<button
							key={p.src}
							onClick={() => setActive(i)}
							className={`overflow-hidden rounded-lg border transition-all duration-200 ${
								i === active
									? 'border-white/30 opacity-100'
									: 'border-white/5 opacity-50 hover:opacity-75'
							}`}
						>
							<img src={p.src} alt={p.alt} className="h-14 w-14 object-cover" />
						</button>
					))}
				</div>
			)}
		</div>
	);
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
	return (
		<div className="flex items-center gap-3 py-3">
			<span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-foreground/50">
				{icon}
			</span>
			<div className="flex flex-1 items-center justify-between gap-4">
				<span className="text-sm text-foreground/50">{label}</span>
				<span className="text-sm font-medium text-foreground/90">{value}</span>
			</div>
		</div>
	);
}


export function BotDetail({ id }: { id: number }) {
	const trpc = useTRPC();
	const reducedMotion = useReducedMotion();

	const { data: bot, isLoading } = useQuery(trpc.battleBots.getBot.queryOptions({ id }));

	if (isLoading) return null;
	if (!bot) notFound();

	return (
		<div className="px-4 pt-10 pb-24 md:px-8 md:pt-14">
			<div className="mx-auto max-w-5xl">
				{/* Back link */}
				<motion.div
					initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: -8 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.4, ease: EASE_OUT }}
				>
					<Link
						href="/battlebot"
						className="mb-8 inline-flex items-center gap-1.5 text-sm text-foreground/50 transition-colors hover:text-foreground/80"
					>
						<TbArrowLeft size={15} />
						Всички роботи
					</Link>
				</motion.div>

				{/* Hero */}
				<motion.div
					className="mb-10 flex flex-col gap-3"
					{...sectionFadeUp(reducedMotion, 0)}
				>
					<p
						className="text-xs font-semibold tracking-widest uppercase"
						style={{ color: bot.textColor }}
					>
						{bot.teamName}
					</p>
					<h1 className="font-title text-4xl leading-tight text-white md:text-5xl">
						{bot.name}
					</h1>
					{/* Colored rule */}
					<div
						className="h-[3px] w-16 rounded-full"
						style={{ backgroundColor: bot.textColor }}
					/>
					{bot.slogan && (
						<p className="mt-1 max-w-xl text-lg italic text-foreground/60">
							&ldquo;{bot.slogan}&rdquo;
						</p>
					)}
				</motion.div>

				{/* Main layout */}
				<div className="grid gap-10 md:grid-cols-[1fr_340px]">
					{/* Left column */}
					<div className="flex flex-col gap-6">
						{/* Description */}
						<motion.section {...sectionFadeUp(reducedMotion, 0.06)}>
							<div className="rounded-2xl bg-card/70 p-6 shadow-lg backdrop-blur-sm">
								<h2
									className="mb-3 text-xs font-semibold tracking-widest uppercase"
									style={{ color: bot.textColor }}
								>
									За робота
								</h2>
								<p className="text-sm leading-relaxed text-foreground/80">{bot.description}</p>
							</div>
						</motion.section>

						{/* Specs */}
						<motion.section {...sectionFadeUp(reducedMotion, 0.1)}>
							<div className="rounded-2xl bg-card/70 shadow-lg backdrop-blur-sm">
								<div className="px-6 py-4">
									<h2
										className="mb-1 text-xs font-semibold tracking-widest uppercase"
										style={{ color: bot.textColor }}
									>
										Характеристики
									</h2>
								</div>
								<div className="divide-y divide-white/5 px-6">
									<InfoRow
										icon={<TbSword size={15} />}
										label="Оръжие"
										value={bot.weapon}
									/>
									<InfoRow
										icon={<TbWeight size={15} />}
										label="Тегло"
										value={`${parseFloat(bot.weightKg).toLocaleString('bg-BG', { maximumFractionDigits: 2 })} кг`}
									/>
								</div>
							</div>
						</motion.section>

						{/* Participants */}
						{bot.participants.length > 0 && (
							<motion.section {...sectionFadeUp(reducedMotion, 0.14)}>
								<div className="rounded-2xl bg-card/70 shadow-lg backdrop-blur-sm">
									<div className="px-6 py-4">
										<h2
											className="mb-1 text-xs font-semibold tracking-widest uppercase"
											style={{ color: bot.textColor }}
										>
											Участници
										</h2>
									</div>
									<ul className="divide-y divide-white/5 px-6 pb-2">
										{bot.participants.map((name) => (
											<li key={name} className="flex items-center gap-3 py-3">
												<span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white/5">
													<TbUser size={13} className="text-foreground/40" />
												</span>
												<span className="text-sm text-foreground/85">{name}</span>
											</li>
										))}
									</ul>
								</div>
							</motion.section>
						)}

					</div>

					{/* Right column — photos + links */}
					<motion.div className="flex flex-col gap-4" {...sectionFadeUp(reducedMotion, 0.08)}>
						<PhotoGallery bot={bot} />
						{(bot.repoUrl ?? bot.youtubeId) && (
							<div className="flex gap-2">
								{bot.repoUrl && (
									<a
										href={bot.repoUrl}
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Хранилище"
										className="inline-flex size-10 items-center justify-center rounded-full transition-opacity hover:opacity-80"
										style={{
											border: `1.5px solid ${bot.primaryColor}`,
											backgroundColor: `${bot.primaryColor}32`,
											color: bot.primaryColor,
										}}
									>
										<TbBrandGithub size={20} />
									</a>
								)}
								{bot.youtubeId && (
									<a
										href={`https://www.youtube.com/watch?v=${bot.youtubeId}`}
										target="_blank"
										rel="noopener noreferrer"
										aria-label="YouTube"
										className="inline-flex size-10 items-center justify-center rounded-full transition-opacity hover:opacity-80"
										style={{
											border: `1.5px solid ${bot.primaryColor}`,
											backgroundColor: `${bot.primaryColor}32`,
											color: bot.primaryColor,
										}}
									>
										<TbBrandYoutube size={20} />
									</a>
								)}
							</div>
						)}
					</motion.div>
				</div>

				{/* YouTube embed */}
				{bot.youtubeId && (
					<motion.section
						className="mt-10"
						{...sectionFadeUp(reducedMotion, 0.22)}
					>
						<h2
							className="mb-4 text-xs font-semibold tracking-widest uppercase"
							style={{ color: bot.textColor }}
						>
							Видео
						</h2>
						<div className="overflow-hidden rounded-2xl shadow-lg">
							<div className="relative aspect-video w-full">
								<iframe
									src={`https://www.youtube.com/embed/${bot.youtubeId}`}
									title={`${bot.name} — видео`}
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen
									className="absolute inset-0 h-full w-full"
								/>
							</div>
						</div>
					</motion.section>
				)}
			</div>
		</div>
	);
}
