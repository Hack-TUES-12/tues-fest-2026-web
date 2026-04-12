'use client';

import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { SiFacebook, SiInstagram, SiLinkedin, SiYoutube } from 'react-icons/si';
import {
	TbArrowRight,
	TbBrain,
	TbBriefcase,
	TbCode,
	TbCpu,
	TbExternalLink,
	TbHistory,
	TbNetwork,
	TbBrandLinktree,
	TbPlus,
	TbSchool,
	TbTrophy,
} from 'react-icons/tb';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TF_YEAR, TUES_AGE } from '@/constants/event';
import { IfTFFeatureOn } from '@/lib/growthbook/react/client';
import {
	listItemEntrance,
	listItemIconEntrance,
	SECTION_FADE_IN_DURATION_SEC,
	sectionFadeIn,
	sectionFadeUp,
} from '@/lib/motion/section-in-view';
import { cn } from '@/lib/utils';

const STATS = [
	{ icon: TbSchool, value: '3500+', label: 'завършили ученици' },
	{ icon: TbTrophy, value: '96', label: 'награди и отличия' },
	{ icon: TbBriefcase, value: '140', label: 'стажа на година' },
	{ icon: TbHistory, value: `${TUES_AGE}`, label: 'годишна история' },
] as const;

const STAT_TONES = [
	{ icon: 'bg-primary/10 text-primary' },
	{ icon: 'bg-secondary/10 text-secondary' },
	{ icon: 'bg-accent/10 text-accent' },
	{ icon: 'bg-muted/10 text-muted' },
] as const;

const SPECIALTIES = [
	{
		icon: TbBrain,
		title: 'Интелигентни системи',
		description:
			'Специалността, която ще ви подготви за работа в една от най-бързо развиващите се области на ИТ — ще се научите да създавате софтуер, който мисли.',
		href: 'https://elsys-bg.org/priem/specialnost-programirane-na-izkustven-intelekt',
	},
	{
		icon: TbCpu,
		title: 'Роботика',
		description:
			'Специалността за тези, които искат да свържат физическия и дигиталния свят — ще се научите да програмирате вградени системи, микроконтролери и всякакъв вид хардуер.',
		href: null as string | null,
	},
	{
		icon: TbCode,
		title: 'Разработка на софтуер',
		description:
			'Най-задълбочената училищна програма по програмиране в България — незаменим трамплин за всеки с амбиции за кариера в ИТ сектора.',
		href: 'https://elsys-bg.org/priem/specialnost-sistemno-programirane',
	},
	{
		icon: TbNetwork,
		title: 'Комуникационни и компютърни мрежи',
		description:
			'Първата крачка към вълнуващата инженерна професия. Ще учите за проектиране на електроника, комуникации, мрежи, роботика и IoT.',
		href: 'https://elsys-bg.org/priem/specialnost-komputyrni-mreji',
	},
] as const;

const SPECIALTY_CARD_TONES = [
	{ icon: 'bg-primary/10 text-primary', text: 'text-primary' },
	{ icon: 'bg-secondary/10 text-secondary', text: 'text-secondary' },
	{ icon: 'bg-accent/10 text-accent', text: 'text-accent' },
	{ icon: 'bg-muted/10 text-muted', text: 'text-muted' },
] as const;

/** Plain string, or segments: `['текст ', { text: 'връзка', href: '/path' }, ' още']` */
type EducationInlineLink = { text: string; href: string; external?: boolean };
type EducationItem = string | readonly (string | EducationInlineLink)[];

function renderEducationItem(item: EducationItem, linkClassName: string) {
	if (typeof item === 'string') {
		return item;
	}
	return item.map((part, j) => {
		if (typeof part === 'string') {
			return <Fragment key={j}>{part}</Fragment>;
		}
		const external = part.external ?? /^https?:\/\//.test(part.href);
		if (external) {
			return (
				<a key={j} href={part.href} target="_blank" rel="noopener noreferrer" className={linkClassName}>
					{part.text}
				</a>
			);
		}
		return (
			<Link key={j} href={part.href} className={linkClassName}>
				{part.text}
			</Link>
		);
	});
}

const EDUCATION_ITEMS_IN_SCHOOL: readonly EducationItem[] = [
	'Разширено изучаване на английски и немски език',
	'Стаж в реални ИТ компании',
	[
		{ text: 'Cisco академия ', href: 'https://elsys-bg.org/klubove/cisco-akademija' },
		'за актуалните мрежови технологии',
	],
	'Workshop-и и лекции от ИТ професионалисти',
	[
		'Клубове по ',
		{ text: 'изкуствен интелект', href: 'https://elsys-bg.org/klubove/tues-ai-software' },
		' и ',
		{ text: 'роботика', href: 'https://elsys-bg.org/klubove/embedded-klub' },
		', в които по-големи ученици преподават на по-малките',
	],
];

const EDUCATION_ITEMS_OUTSIDE_SCHOOL: readonly EducationItem[] = [
	'Участие в национални и международни състезания',
	[{ text: 'Hack TUES', href: 'https://hack-tues.com' }, ' — хакатон, организиран от ученици за ученици'],
	'TUES Talks - първият ученически подкаст в България',
	'Уникална общност от преподаватели, завършили и настоящи ученици',
	[
		'Извънкласни дейности и ',
		{ text: 'клубове', href: 'https://elsys-bg.org/uchenicheski-jivot/klubove' },
		' в разнообразни сфери',
	],
	// 'Участие в мобилности по проекти Еразъм+',
];

const SUCCESS_FACTORS = [
	'Тясна интеграция с Технически университет — София',
	'Гъвкав специализиран учебен план',
	'Обучение в крак с най-новите технологии',
	'Преподаватели от ИТ бизнеса и университета',
	'Активната роля на завършилите в живота на училището',
	'Тясна връзка с реалния бизнес — стажове, дипломни проекти и практики',
] as const;

const SECTION_EYEBROW = ['text-primary', 'text-secondary', 'text-accent', 'text-muted'] as const;

function SectionHeading({
	eyebrow,
	title,
	subtitle,
	toneIndex,
}: {
	eyebrow: string;
	title: string;
	subtitle?: string;
	toneIndex: number;
}) {
	const tone = SECTION_EYEBROW[toneIndex % SECTION_EYEBROW.length];
	return (
		<div className="mb-8 flex flex-col items-center gap-2 text-center md:mb-10">
			<p className={cn('text-sm font-medium tracking-widest', tone)}>{eyebrow}</p>
			<h2 className="font-title text-4xl text-white md:text-5xl">{title}</h2>
			{subtitle ? <p className="text-foreground/70 max-w-2xl text-pretty">{subtitle}</p> : null}
		</div>
	);
}

const cardSurface = 'rounded-2xl bg-card/70 shadow-lg backdrop-blur-sm transition-colors duration-300 hover:bg-card/85';

/** Education list: row fade + plus scale/rotate — shorter wait than full `SECTION_FADE_IN_DURATION_SEC`. */
const EDUCATION_LIST_MOTION_BASE_SEC = 0.15;
const EDUCATION_LIST_STAGGER_SEC = 0.08;

/** Stagger card shells so each panel fades in after the previous (list animations unchanged inside). */
const EDUCATION_CARD_FADE_STAGGER_SEC = 0.12;

const EDUCATION_LINK_CLASS_ACCENT = 'font-medium text-accent underline-offset-2 transition-colors hover:underline';
const EDUCATION_LINK_CLASS_MUTED = 'font-medium text-muted underline-offset-2 transition-colors hover:underline';

/** Same URLs and styling as schedule / footer — TUES community channels. */
const ABOUT_HERO_SOCIAL_LINKS = [
	{ href: 'https://www.facebook.com/tues.bg', label: 'Facebook', Icon: SiFacebook },
	{ href: 'https://www.instagram.com/tues.bg/', label: 'Instagram', Icon: SiInstagram },
	{ href: 'https://www.linkedin.com/school/tues', label: 'LinkedIn', Icon: SiLinkedin },
	{ href: 'https://www.youtube.com/@TUES', label: 'YouTube', Icon: SiYoutube },
] as const;

const ABOUT_HERO_SOCIAL_ICON_BUTTON =
	'rounded-full border-white/15 bg-card/30 text-white transition-colors hover:border-primary/40 hover:bg-card/50 hover:text-primary';

/** Same channels as schedule / footer — Hack TUES community. */
const HACK_TUES_SOCIAL_LINKS = [
	{ href: 'https://facebook.com/HackTUES', label: 'Hack TUES във Facebook', Icon: SiFacebook },
	{ href: 'https://www.instagram.com/hacktuesfest/', label: 'Hack TUES в Instagram', Icon: SiInstagram },
	{ href: 'https://www.linkedin.com/company/hacktues-tuesfest/', label: 'Hack TUES в LinkedIn', Icon: SiLinkedin },
	{ href: 'https://linktr.ee/hack.tues.fest', label: 'Всички връзки към Hack TUES (Linktree)', Icon: TbBrandLinktree },
] as const;

const HACK_TUES_SOCIAL_ICON_BUTTON =
	'rounded-full border-white/15 bg-card/30 text-white transition-colors hover:border-secondary/40 hover:bg-card/50 hover:text-secondary';

export function AboutPageContent() {
	const reducedMotion = useReducedMotion();

	return (
		<div className="relative flex w-full flex-col items-center gap-16 px-4 pt-10 pb-24 md:gap-20 md:px-8 md:pt-14">
			{/* Background — matches location / schedule decorative language */}
			<Image
				src="/decorations/purple-circle.svg"
				alt=""
				width={448}
				height={448}
				unoptimized
				aria-hidden
				className="pointer-events-none absolute top-0 left-0 -z-10 h-auto w-[min(50vw,28rem)] max-w-2xl -translate-x-1/3 -translate-y-1/4 opacity-90 select-none"
			/>
			<Image
				src="/decorations/blue-circle.svg"
				alt=""
				width={384}
				height={384}
				unoptimized
				aria-hidden
				className="pointer-events-none absolute right-0 bottom-[15%] -z-10 h-auto w-[min(42vw,22rem)] max-w-xl translate-x-1/4 opacity-80 select-none"
			/>

			{/* Hero */}
			<motion.section
				className="relative isolate mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center"
				{...sectionFadeIn(reducedMotion, 0)}
			>
				<motion.p
					className="text-primary text-sm font-medium tracking-widest"
					{...sectionFadeUp(reducedMotion, 0.06)}
				>
					Училището
				</motion.p>
				<motion.h1
					className="font-title text-5xl text-white md:text-6xl"
					{...sectionFadeUp(reducedMotion, 0.12)}
				>
					За ТУЕС
				</motion.h1>
				<motion.p
					className="text-foreground/75 max-w-2xl text-lg leading-relaxed text-pretty"
					{...sectionFadeUp(reducedMotion, 0.18)}
				>
					Технологично училище „Електронни системи“ към ТУ-София е специализирано технологично училище от
					национално значение, което вече <span className="font-semibold text-white">{TUES_AGE} години</span>{' '}
					подготвя бъдещите лидери на ИТ сектора в България и отвъд.
				</motion.p>
				<motion.div {...sectionFadeUp(reducedMotion, 0.26)}>
					<Button asChild variant="default" size="lg" className="shadow-primary/20 font-bold shadow-lg">
						<Link href="https://elsys-bg.org" target="_blank" rel="noopener noreferrer">
							<TbExternalLink size={18} />
							Официален сайт на ТУЕС
						</Link>
					</Button>
				</motion.div>
				<div className="flex flex-col items-center gap-3">
					<p className="text-xs font-medium tracking-widest text-white/45">Социални мрежи</p>
					<div className="flex flex-wrap items-center justify-center gap-3">
						{ABOUT_HERO_SOCIAL_LINKS.map(({ href, label, Icon }, index) => (
							<motion.div
								key={href}
								{...listItemIconEntrance(reducedMotion, index, 0.12, SECTION_FADE_IN_DURATION_SEC)}
							>
								<Button variant="outline" size="icon" className={ABOUT_HERO_SOCIAL_ICON_BUTTON} asChild>
									<Link href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
										<Icon className="size-5" aria-hidden />
									</Link>
								</Button>
							</motion.div>
						))}
					</div>
				</div>
			</motion.section>

			{/* Stats */}
			<motion.section className="mx-auto w-full max-w-5xl" id="about-stats" {...sectionFadeIn(reducedMotion, 0)}>
				<div className="mb-6 text-center md:mb-8">
					<p className="text-muted text-sm font-medium tracking-widest">В цифри</p>
					<h2 className="font-title mt-2 text-3xl text-white md:text-4xl">ТУЕС накратко</h2>
				</div>
				<div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
					{STATS.map(({ icon: Icon, value, label }, index) => {
						const tone = STAT_TONES[index % STAT_TONES.length]!;
						return (
							<motion.div
								key={label}
								className="bg-card/80 flex flex-col items-center gap-3 rounded-xl px-3 py-6 text-center sm:px-4"
								{...sectionFadeUp(reducedMotion, 0.05 * index)}
							>
								<div
									className={cn(
										'flex size-11 items-center justify-center rounded-xl sm:size-12',
										tone.icon
									)}
								>
									<Icon size={26} className="sm:h-7 sm:w-7" />
								</div>
								<p className="font-title text-3xl text-white sm:text-4xl">{value}</p>
								<p className="text-foreground/65 text-xs leading-snug sm:text-sm">{label}</p>
							</motion.div>
						);
					})}
				</div>
			</motion.section>

			{/* Intro + image */}
			<motion.section
				className="mx-auto flex w-full max-w-5xl flex-col gap-8 md:gap-10"
				{...sectionFadeIn(reducedMotion, 0)}
			>
				<div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-12">
					<motion.div
						className="text-foreground/80 flex flex-col gap-5 leading-relaxed text-pretty"
						{...sectionFadeUp(reducedMotion, 0.06)}
					>
						<motion.h2
							className="font-title text-3xl text-white md:text-4xl"
							{...sectionFadeUp(reducedMotion, 0)}
						>
							Кандидатстване
						</motion.h2>
						<p>
							Възпитаниците на ТУЕС преминават през задълбочена и специализирана 5-годишна програма, която
							им позволява да се позиционират възможно най-бързо в технологичния сектор.
						</p>
						<p>
							За {TF_YEAR - 1} г. ТУЕС за пореден път се нареди на{' '}
							<span className="font-semibold text-white">второ място</span> по минимален бал на първо
							класиране в 7. клас в България.
						</p>
						<IfTFFeatureOn feature="tf-show-apply">
							<Link
								href="/apply"
								className="text-primary hover:text-primary/90 inline-flex w-fit items-center gap-1.5 text-sm font-medium underline-offset-4 transition-colors hover:underline"
							>
								<TbArrowRight size={16} />
								Информация за кандидатстване
							</Link>
						</IfTFFeatureOn>
					</motion.div>
					<motion.div
						className="relative overflow-hidden rounded-2xl shadow-2xl shadow-black/40"
						{...sectionFadeUp(reducedMotion, 0.12)}
					>
						<div className="relative aspect-[4/3] w-full">
							<Image
								src="/assets/about/about.png"
								alt="Ученици на ТУЕС"
								fill
								sizes="(max-width: 768px) 100vw, min(42rem, 50vw)"
								className="object-cover transition-transform duration-500 hover:scale-[1.02]"
							/>
						</div>
					</motion.div>
				</div>
			</motion.section>

			{/* Specialties */}
			<motion.section className="mx-auto w-full max-w-5xl" {...sectionFadeIn(reducedMotion, 0)}>
				<SectionHeading eyebrow="Професии" title="Какво можеш да учиш?" toneIndex={0} />
				<div className="grid gap-4 md:grid-cols-2">
					{SPECIALTIES.map(({ icon: Icon, title, description, href }, index) => {
						const tone = SPECIALTY_CARD_TONES[index % SPECIALTY_CARD_TONES.length]!;
						const inner = (
							<>
								<div className={cn('flex size-11 items-center justify-center rounded-xl', tone.icon)}>
									<Icon size={22} />
								</div>
								<div className="flex flex-col gap-2">
									<h3 className="font-title text-lg text-white md:text-xl">{title}</h3>
									<p className="text-foreground/70 text-sm leading-relaxed">{description}</p>
								</div>
								{href ? (
									<span
										className={cn(
											'mt-auto inline-flex items-center gap-1 text-xs font-medium opacity-0 transition-opacity duration-200 group-hover:opacity-100',
											tone.text
										)}
									>
										Научи повече <TbArrowRight size={13} />
									</span>
								) : null}
							</>
						);
						const cardClass = cn('group flex flex-col gap-4 p-6 sm:p-7', cardSurface);
						return href ? (
							<motion.div key={title} {...listItemEntrance(reducedMotion, index, 0.08)}>
								<Link
									href={href}
									target="_blank"
									rel="noopener noreferrer"
									className={cn(cardClass, 'block h-full')}
								>
									{inner}
								</Link>
							</motion.div>
						) : (
							<motion.div
								key={title}
								className={cardClass}
								{...listItemEntrance(reducedMotion, index, 0.08)}
							>
								{inner}
							</motion.div>
						);
					})}
				</div>
				<IfTFFeatureOn feature="tf-show-apply">
					<div className="mt-8 flex w-full justify-center">
						<Link
							href="/apply"
							className="text-primary hover:text-primary/90 inline-flex items-center gap-2 text-base font-medium underline-offset-4 transition-colors hover:underline"
						>
							Научете повече за специалностите и кандидатстването
							<TbArrowRight size={18} />
						</Link>
					</div>
				</IfTFFeatureOn>
			</motion.section>

			{/* Education + success */}
			<motion.section
				className="mx-auto grid w-full max-w-5xl gap-6 md:grid-cols-[3fr,2fr] md:gap-8"
				{...sectionFadeIn(reducedMotion, 0)}
			>
				<div className="flex min-w-0 flex-col gap-8">
					<div className="flex flex-col gap-2 px-6 text-center sm:px-8">
						<motion.p
							className="text-primary text-sm font-medium tracking-widest"
							{...sectionFadeUp(reducedMotion, 0)}
						>
							Ползи
						</motion.p>
						<motion.h1
							className="font-title text-3xl text-white md:text-4xl"
							{...sectionFadeUp(reducedMotion, 0.06)}
						>
							Какво предлага училището?
						</motion.h1>
					</div>
					<div className="grid min-w-0 grid-cols-1 gap-6 md:grid-cols-2">
						<motion.div
							className="h-full min-w-0"
							{...sectionFadeIn(reducedMotion, 0 * EDUCATION_CARD_FADE_STAGGER_SEC)}
						>
							<Card
								variant="accent"
								className="bg-card/70 h-full px-6 py-8 shadow-lg backdrop-blur-md sm:px-8 sm:py-9"
							>
							<CardContent className="flex flex-col gap-2 p-0">
								<div className="space-y-2">
									<p className="text-accent text-sm font-medium tracking-widest">Обучение</p>
									<h2 className="font-title text-2xl text-white md:text-3xl">
										Освен специализирания план
									</h2>
									<p className="text-sm">ТУЕС предлага:</p>
								</div>
								<ul className="flex flex-col gap-2 px-2">
									{EDUCATION_ITEMS_IN_SCHOOL.map((item, i) => (
										<motion.li
											key={`education-in-${i}`}
											className="flex items-start gap-2"
											{...listItemEntrance(
												reducedMotion,
												i,
												EDUCATION_LIST_STAGGER_SEC,
												EDUCATION_LIST_MOTION_BASE_SEC
											)}
										>
											<motion.span
												className="inline-flex shrink-0 origin-center pt-0.5"
												{...listItemIconEntrance(
													reducedMotion,
													i,
													EDUCATION_LIST_STAGGER_SEC,
													EDUCATION_LIST_MOTION_BASE_SEC
												)}
											>
												<TbPlus
													className={cn('size-6 shrink-0 stroke-[3.5]', 'text-accent')}
													aria-hidden
												/>
											</motion.span>
											<span className="pt-1 text-sm">
												{renderEducationItem(item, EDUCATION_LINK_CLASS_ACCENT)}
											</span>
										</motion.li>
									))}
								</ul>
							</CardContent>
						</Card>
						</motion.div>

						<motion.div
							className="h-full min-w-0"
							{...sectionFadeIn(reducedMotion, 1 * EDUCATION_CARD_FADE_STAGGER_SEC)}
						>
							<Card
								variant="muted"
								className="bg-card/70 h-full px-6 py-8 shadow-lg backdrop-blur-md sm:px-8 sm:py-9"
							>
							<CardContent className="flex flex-col gap-2 p-0">
								<div className="space-y-2">
									<p className="text-muted text-sm font-medium tracking-widest">Извън обучението</p>
									<h2 className="font-title text-2xl text-white md:text-3xl">
										Извън училищното обучение
									</h2>
									<p className="text-sm">ТУЕС предлага:</p>
								</div>
								<ul className="flex flex-col gap-2 px-2">
									{EDUCATION_ITEMS_OUTSIDE_SCHOOL.map((item, i) => (
										<motion.li
											key={`education-out-${i}`}
											className="flex items-start gap-2"
											{...listItemEntrance(
												reducedMotion,
												i,
												EDUCATION_LIST_STAGGER_SEC,
												EDUCATION_LIST_MOTION_BASE_SEC
											)}
										>
											<motion.span
												className="inline-flex shrink-0 origin-center pt-0.5"
												{...listItemIconEntrance(
													reducedMotion,
													i,
													EDUCATION_LIST_STAGGER_SEC,
													EDUCATION_LIST_MOTION_BASE_SEC
												)}
											>
												<TbPlus
													className={cn('size-6 shrink-0 stroke-[3.5]', 'text-muted')}
													aria-hidden
												/>
											</motion.span>
											<span className="pt-1 text-sm">
												{renderEducationItem(item, EDUCATION_LINK_CLASS_MUTED)}
											</span>
										</motion.li>
									))}
								</ul>
							</CardContent>
						</Card>
						</motion.div>
					</div>
				</div>

				<motion.div
					className="min-w-0 md:h-full md:min-h-0"
					{...sectionFadeIn(reducedMotion, 2 * EDUCATION_CARD_FADE_STAGGER_SEC)}
				>
					<Card variant="primary" className="bg-card/70 h-full px-6 py-8 shadow-lg backdrop-blur-md sm:px-8 sm:py-9">
					<CardContent className="flex flex-col gap-6 p-0">
						<div className="space-y-2">
							<p className="text-primary text-sm font-medium tracking-widest">Успех</p>
							<h2 className="font-title text-2xl text-white md:text-3xl">ТУЕС успява благодарение на</h2>
						</div>
						<ul className="flex flex-col gap-2 px-2">
							{SUCCESS_FACTORS.map((item, i) => (
								<motion.li
									key={`success-${i}`}
									className="flex items-start gap-2"
									{...listItemEntrance(
										reducedMotion,
										i,
										EDUCATION_LIST_STAGGER_SEC,
										EDUCATION_LIST_MOTION_BASE_SEC
									)}
								>
									<motion.span
										className="inline-flex shrink-0 origin-center pt-0.5"
										{...listItemIconEntrance(
											reducedMotion,
											i,
											EDUCATION_LIST_STAGGER_SEC,
											EDUCATION_LIST_MOTION_BASE_SEC
										)}
									>
										<TbPlus
											className={cn('size-6 shrink-0 stroke-[3.5]', 'text-primary')}
											aria-hidden
										/>
									</motion.span>
									<span className="text-foreground/85 pt-1 text-sm leading-relaxed">{item}</span>
								</motion.li>
							))}
						</ul>
					</CardContent>
				</Card>
				</motion.div>
			</motion.section>

			{/* Hack TUES — split layout: visual column + reading column (lg+) */}
			<motion.section className="mx-auto w-full max-w-5xl" {...sectionFadeIn(reducedMotion, 0)}>
				<div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-stretch lg:gap-12 xl:gap-14">
					{/* Column A: heading + photo fills column width and remaining height (matches row on lg) */}
					<div className="flex min-h-0 min-w-0 flex-col gap-6 lg:h-full lg:gap-8">
						<div className="shrink-0 text-center lg:text-start flex flex-col gap-2">
							<motion.p
								className="text-muted text-sm font-medium tracking-widest"
								{...sectionFadeUp(reducedMotion, 0)}
							>
								Хакатон
							</motion.p>
							<motion.h2
								className="font-title text-3xl text-white md:text-4xl lg:text-[2.75rem] lg:leading-tight"
								{...sectionFadeUp(reducedMotion, 0.06)}
							>
								Hack TUES
							</motion.h2>
						</div>
						<motion.div
							className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-2xl shadow-black/40 lg:aspect-auto lg:min-h-0 lg:flex-1"
							{...sectionFadeUp(reducedMotion, 0.1)}
						>
							<Image
								src="/team/team1.webp"
								alt="Организационният екип на Hack TUES 12"
								fill
								unoptimized={true}
								sizes="(max-width: 1023px) min(100vw - 2rem, 64rem), min(31rem, 52vw)"
								className="object-cover transition-transform duration-500 hover:scale-[1.02]"
							/>
							<div
								className="pointer-events-none absolute inset-0 z-[1] rounded-2xl ring-1 ring-white/10 ring-inset"
								aria-hidden
							/>
						</motion.div>
					</div>

					{/* Column B: narrative stack + CTA */}
					<div className="flex min-h-0 min-w-0 flex-col gap-6 lg:h-full">
						<motion.div {...listItemEntrance(reducedMotion, 0, 0.08)}>
							<Card
								variant="accent"
								className="bg-card/70 h-full border-white/5 px-6 py-8 shadow-lg backdrop-blur-md sm:px-8 sm:py-9"
							>
								<CardContent className="flex flex-col gap-3 p-0">
									<p className="text-muted text-sm font-medium tracking-widest">Какво представлява?</p>
									<p className="text-foreground/80 text-sm leading-relaxed">
										Hack TUES е едно от ключовите събития за ТУЕС — ученици в отбори от 3–5
										участници създават от нулата ИТ проект за два дни по зададена тема и го
										представят пред професионално жури от преподаватели и ИТ специалисти.
									</p>
								</CardContent>
							</Card>
						</motion.div>
						<motion.div {...listItemEntrance(reducedMotion, 1, 0.08)}>
							<Card
								variant="muted"
								className="bg-card/70 h-full border-white/5 px-6 py-8 shadow-lg backdrop-blur-md sm:px-8 sm:py-9"
							>
								<CardContent className="flex flex-col gap-3 p-0">
									<p className="text-secondary text-sm font-medium tracking-widest">Значимост</p>
									<p className="text-foreground/80 text-sm leading-relaxed">
										Единственият хакатон в България, организиран от ученици за ученици. Намерил е
										място сред иновативните практики на ЮНЕСКО за техническо и професионално
										образование — единствената образователна практика от България в тази инициатива.
									</p>
								</CardContent>
							</Card>
						</motion.div>
						<motion.div {...listItemEntrance(reducedMotion, 2, 0.08)}>
							<Card
								variant="primary"
								className="bg-card/70 border-white/5 px-6 py-8 shadow-lg backdrop-blur-md sm:px-8 sm:py-9"
							>
								<CardContent className="flex flex-col gap-3 p-0">
									<p className="text-muted text-sm font-medium tracking-widest">Организация</p>
									<p className="text-foreground/80 text-sm leading-relaxed">
										Събитието стартира през 2015 г. и досега има дванадесет издания. Всяка година се
										подготвя от организационен екип, съставен от ученици в 11. клас, под
										менторството на АЗТУЕС. Участниците развиват умения по програмиране, работа в
										екип и презентиране, а запознанствата с ментори често прерастват в предложения
										за работа.
									</p>
								</CardContent>
							</Card>
						</motion.div>
						<motion.div
							className="flex flex-col items-center gap-4 pt-2 lg:items-start"
							{...sectionFadeUp(reducedMotion, 0.14)}
						>
							<Button
								asChild
								variant="muted"
								size="lg"
								className="shadow-muted/20 w-full font-bold shadow-lg sm:w-auto"
							>
								<Link href="https://hack-tues.com" target="_blank" rel="noopener noreferrer">
									<TbExternalLink size={18} />
									Виж повече за Hack TUES
								</Link>
							</Button>
							<div className="flex w-full flex-col gap-3">
								<p className="text-center text-xs font-medium tracking-widest text-white/45 lg:text-left">
									Hack TUES в социалните мрежи
								</p>
								<div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
									{HACK_TUES_SOCIAL_LINKS.map(({ href, label, Icon }, index) => (
										<motion.div
											key={href}
											{...listItemIconEntrance(
												reducedMotion,
												index,
												0.06,
												SECTION_FADE_IN_DURATION_SEC
											)}
										>
											<Button
												variant="outline"
												size="icon"
												className={HACK_TUES_SOCIAL_ICON_BUTTON}
												asChild
											>
												<Link href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
													<Icon className="size-5" aria-hidden />
												</Link>
											</Button>
										</motion.div>
									))}
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</motion.section>
		</div>
	);
}
