'use client';

import Link from 'next/link';
import {
	TbArrowRight,
	TbBrain,
	TbCheck,
	TbCode,
	TbCpu,
	TbExternalLink,
	TbNetwork,
	TbPlus,
} from 'react-icons/tb';
import { SiFacebook, SiInstagram, SiLinkedin, SiYoutube } from 'react-icons/si';
import { motion, useReducedMotion } from 'motion/react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TF_YEAR, TUES_AGE } from '@/constants/event';
import Calculator from '@/partials/apply/Calculator';
import {
	listItemEntrance,
	listItemIconEntrance,
	SECTION_FADE_IN_DURATION_SEC,
	sectionFadeIn,
	sectionFadeUp,
} from '@/lib/motion/section-in-view';
import { cn } from '@/lib/utils';

const WHY_TUES = [
	'Специализиран учебен план',
	'Училище интегрирано във ВУЗ',
	'Преподават завършили ТУЕС',
	'Тясна връзка с ИТ бранша',
] as const;

const SPECIALTIES = [
	{
		icon: TbBrain,
		title: 'Интелигентни системи',
		lines: [
			'Разширено изучаване на английски + втори език немски — 1 паралелка × 26 ученици',
			'Разширено изучаване на немски + втори език английски — 1 паралелка × 26 ученици',
		],
	},
	{
		icon: TbCpu,
		title: 'Роботика',
		lines: [
			'Разширено изучаване на английски + втори език немски — 1 паралелка × 26 ученици',
			'Разширено изучаване на немски + втори език английски — 1 паралелка × 26 ученици',
		],
	},
	{
		icon: TbCode,
		title: 'Разработка на софтуер',
		lines: ['Разширено изучаване на английски + втори език немски — 1 паралелка × 26 ученици'],
	},
	{
		icon: TbNetwork,
		title: 'Комуникационни и компютърни мрежи',
		lines: ['Разширено изучаване на английски + втори език немски — 1 паралелка × 26 ученици'],
	},
] as const;

const SPECIALTY_ICON_TONES = [
	'bg-primary/10 text-primary',
	'bg-secondary/10 text-secondary',
	'bg-accent/10 text-accent',
	'bg-muted/10 text-muted',
] as const;

const SCORE_FORMULA = [
	{ label: 'НВО — Български език и литература', note: '× 1' },
	{ label: 'НВО — Математика', note: '× 3' },
	{ label: 'Оценка по Математика (7. клас)', note: '' },
	{ label: 'Оценка по Физика (7. клас)', note: '' },
] as const;

/** Match about-page education lists (`listItemIconEntrance` timing). */
const FORMULA_LIST_STAGGER_SEC = 0.08;
const FORMULA_LIST_MOTION_BASE_SEC = 0.15;

const SECTION_EYEBROW = [
	'text-primary',
	'text-secondary',
	'text-accent',
	'text-muted',
] as const;

const APPLY_HERO_SOCIAL_LINKS = [
	{ href: 'https://www.facebook.com/tues.bg', label: 'Facebook', Icon: SiFacebook },
	{ href: 'https://www.instagram.com/tues.bg/', label: 'Instagram', Icon: SiInstagram },
	{ href: 'https://www.linkedin.com/school/tues', label: 'LinkedIn', Icon: SiLinkedin },
	{ href: 'https://www.youtube.com/@TUES', label: 'YouTube', Icon: SiYoutube },
] as const;

const APPLY_HERO_SOCIAL_ICON_BUTTON =
	'rounded-full border-white/15 bg-card/30 text-white transition-colors hover:border-muted/40 hover:bg-card/50 hover:text-muted';

function SectionHeading({
	eyebrow,
	title,
	subtitle,
	toneIndex,
	align = 'center',
}: {
	eyebrow: string;
	title: string;
	subtitle?: string;
	toneIndex: number;
	align?: 'center' | 'start';
}) {
	const tone = SECTION_EYEBROW[toneIndex % SECTION_EYEBROW.length];
	return (
		<div
			className={cn(
				'mb-6 flex flex-col gap-2 md:mb-8',
				align === 'center' ? 'items-center text-center' : 'items-start text-left',
			)}
		>
			<p className={cn('text-sm font-medium tracking-widest', tone)}>{eyebrow}</p>
			<h2 className="font-title text-3xl text-white md:text-4xl lg:text-5xl">{title}</h2>
			{subtitle ? (
				<p className="max-w-2xl text-pretty text-foreground/70 md:text-base">{subtitle}</p>
			) : null}
		</div>
	);
}

export function ApplyPageContent() {
	const reducedMotion = useReducedMotion();

	return (
		<div className="relative flex w-full flex-col items-center gap-16 px-4 pb-24 pt-10 md:gap-20 md:px-8 md:pt-14">
			<img
				src="/decorations/purple-circle.svg"
				alt=""
				aria-hidden="true"
				className="pointer-events-none absolute left-0 top-0 -z-10 w-[min(50vw,28rem)] max-w-2xl -translate-x-1/3 -translate-y-1/4 select-none opacity-90"
			/>
			<img
				src="/decorations/blue-circle.svg"
				alt=""
				aria-hidden="true"
				className="pointer-events-none absolute bottom-[15%] right-0 -z-10 w-[min(42vw,22rem)] max-w-xl translate-x-1/4 select-none opacity-80"
			/>

			{/* Hero */}
			<motion.section
				className="relative isolate mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center"
				{...sectionFadeIn(reducedMotion, 0)}
			>
				<motion.p
					className="text-sm font-medium tracking-widest text-muted"
					{...sectionFadeUp(reducedMotion, 0.06)}
				>
					Кандидатстване
				</motion.p>
				<motion.h1
					className="font-title text-5xl text-white md:text-6xl"
					{...sectionFadeUp(reducedMotion, 0.12)}
				>
					Защо ТУЕС?
				</motion.h1>
				<motion.p
					className="max-w-2xl text-pretty text-lg leading-relaxed text-foreground/75"
					{...sectionFadeUp(reducedMotion, 0.18)}
				>
					Технологично училище „Електронни системи“ към ТУ-София е специализирано технологично училище
					от национално значение, което вече{' '}
					<span className="font-semibold text-white">{TUES_AGE} години</span> подготвя бъдещите лидери на
					ИТ сектора в България и отвъд.
				</motion.p>
				<motion.p
					className="max-w-2xl text-pretty text-base leading-relaxed text-foreground/65"
					{...sectionFadeUp(reducedMotion, 0.22)}
				>
					За {TF_YEAR - 1} г., ТУЕС се нареди на <span className="font-semibold text-white">второ място</span> по
					минимален бал на първо класиране в 7. клас!
				</motion.p>
				<motion.div
					className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center"
					{...sectionFadeUp(reducedMotion, 0.28)}
				>
					<Button asChild variant="muted" size="lg" className="font-bold shadow-lg shadow-muted/25">
						<Link
							href="https://elsys-bg.org/priem/red-i-uslovija-za-priem"
							target="_blank"
							rel="noopener noreferrer"
						>
							<TbExternalLink size={18} />
							Правила и условия за прием
						</Link>
					</Button>
					<Button asChild variant="outline" size="lg" className="font-bold border-white/20 bg-card/20 hover:bg-card/40">
						<Link href="https://elsys-bg.org" target="_blank" rel="noopener noreferrer">
							<TbExternalLink size={18} />
							elsys-bg.org
						</Link>
					</Button>
				</motion.div>
				<div className="flex flex-col items-center gap-3">
					<p className="text-xs font-medium tracking-widest text-white/45">Социални мрежи</p>
					<div className="flex flex-wrap items-center justify-center gap-3">
						{APPLY_HERO_SOCIAL_LINKS.map(({ href, label, Icon }, index) => (
							<motion.div
								key={href}
								{...listItemIconEntrance(
									reducedMotion,
									index,
									0.12,
									SECTION_FADE_IN_DURATION_SEC,
								)}
							>
								<Button variant="outline" size="icon" className={APPLY_HERO_SOCIAL_ICON_BUTTON} asChild>
									<Link href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
										<Icon className="size-5" aria-hidden />
									</Link>
								</Button>
							</motion.div>
						))}
					</div>
				</div>
			</motion.section>

			{/* Уникалност + image */}
			<motion.section
				className="mx-auto w-full max-w-5xl"
				{...sectionFadeIn(reducedMotion, 0)}
			>
				<div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-12">
					<div>
						<SectionHeading
							eyebrow="Уникалност"
							title="Кое прави ТУЕС специално?"
							toneIndex={3}
							align="start"
						/>
						<ul className="mt-2 flex flex-col gap-2">
							{WHY_TUES.map((item, index) => (
								<motion.li
									key={item}
									className="flex items-center gap-4 rounded-xl bg-white/[0.04] px-4 py-3.5 backdrop-blur-sm"
									{...listItemEntrance(reducedMotion, index, 0.07)}
								>
									<span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted/15 text-muted">
										<TbCheck size={16} strokeWidth={2.5} />
									</span>
									<span className="text-sm leading-relaxed text-foreground/85 md:text-base">{item}</span>
								</motion.li>
							))}
						</ul>
						<motion.div className="mt-4" {...sectionFadeUp(reducedMotion, 0.32)}>
							<Link
								href="/about"
								className="text-muted hover:text-muted/90 inline-flex items-center gap-2 text-sm font-medium underline-offset-4 transition-colors hover:underline md:text-base"
							>
								Виж повече
								<TbArrowRight size={18} aria-hidden />
							</Link>
						</motion.div>
					</div>
					<motion.div
						className="relative overflow-hidden rounded-2xl shadow-2xl shadow-black/40"
						{...sectionFadeUp(reducedMotion, 0.1)}
					>
						<img
							src="/assets/apply/whytues.png"
							alt="Защо ТУЕС?"
							className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
						/>
					</motion.div>
				</div>
			</motion.section>

			{/* How to apply + Formula / Calculator (2-col: calculator left, formula right) */}
			<motion.section
				className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 md:gap-8"
				{...sectionFadeIn(reducedMotion, 0)}
			>
				<Card
					variant="accent"
					className="bg-card/70 px-6 py-8 shadow-lg backdrop-blur-md sm:px-8 sm:py-9 md:col-span-2"
				>
					<CardContent className="flex flex-col gap-6 p-0">
						<div className="space-y-2">
							<p className="text-sm font-medium tracking-widest text-primary">Професии</p>
							<h2 className="font-title text-2xl text-white md:text-3xl">Как да кандидатствам?</h2>
							<p className="text-sm text-foreground/70">
								За учебната {TF_YEAR}/{TF_YEAR + 1} г. ТУЕС приема ученици по следните професии:
							</p>
						</div>
						<ul className="flex flex-col gap-2">
							{SPECIALTIES.map(({ icon: Icon, title, lines }, index) => (
								<motion.li
									key={title}
									className="flex items-start gap-4 rounded-xl bg-white/[0.04] px-4 py-4 transition-colors duration-200 hover:bg-white/[0.06]"
									{...listItemEntrance(reducedMotion, index, 0.06)}
								>
									<div
										className={cn(
											'flex size-9 shrink-0 items-center justify-center rounded-xl',
											SPECIALTY_ICON_TONES[index % SPECIALTY_ICON_TONES.length],
										)}
									>
										<Icon size={18} />
									</div>
									<div className="min-w-0 flex-1">
										<p className="font-semibold text-white">{title}</p>
										<ul className="mt-2 space-y-1.5 border-l border-white/10 pl-3">
											{lines.map((line) => (
												<li
													key={line}
													className="text-xs leading-relaxed text-foreground/65 md:text-sm"
												>
													{line}
												</li>
											))}
										</ul>
									</div>
								</motion.li>
							))}
						</ul>
					</CardContent>
				</Card>

				<Card
					variant="primary"
					className="order-1 min-w-0 bg-card/70 px-6 py-8 shadow-lg backdrop-blur-md sm:px-8 sm:py-9 md:order-none"
				>
					<CardContent className="flex flex-col gap-6 p-0">
						<div className="space-y-2">
							<p className="text-sm uppercase font-medium text-primary">Формула</p>
							<h2 className="font-title text-2xl text-white md:text-3xl">Как се формира балът?</h2>
							<p className="text-sm text-foreground/70">Балът е сбор от следните компоненти:</p>
						</div>
						<ul className="flex flex-col gap-2 px-2">
							{SCORE_FORMULA.map(({ label, note }, i) => (
								<motion.li
									key={label}
									className="flex items-start gap-2"
									{...listItemEntrance(
										reducedMotion,
										i,
										FORMULA_LIST_STAGGER_SEC,
										FORMULA_LIST_MOTION_BASE_SEC,
									)}
								>
									<motion.span
										className="inline-flex shrink-0 origin-center pt-0.5"
										{...listItemIconEntrance(
											reducedMotion,
											i,
											FORMULA_LIST_STAGGER_SEC,
											FORMULA_LIST_MOTION_BASE_SEC,
										)}
									>
										<TbPlus
											className="size-6 shrink-0 stroke-[3.5] text-primary"
											aria-hidden
										/>
									</motion.span>
									<div className="flex min-w-0 flex-1 items-center justify-between gap-2 rounded-xl">
										<span className="pt-1 text-sm text-foreground/85">{label}</span>
										{note ? (
											<span className="shrink-0 rounded-full bg-primary/15 px-3 py-0.5 mt-1 text-xs font-bold text-primary">
												{note}
											</span>
										) : null}
									</div>
								</motion.li>
							))}
						</ul>
					</CardContent>
				</Card>

				<motion.div
					className="order-2 min-w-0 md:order-none"
					{...sectionFadeUp(reducedMotion, 0.08)}
				>
					<Calculator className="bg-card/70 shadow-lg backdrop-blur-md" />
				</motion.div>
			</motion.section>
		</div>
	);
}
