'use client';

import Link from 'next/link';
import {
	TbArrowRight,
	TbBrain,
	TbBriefcase,
	TbCheck,
	TbCode,
	TbCpu,
	TbExternalLink,
	TbHistory,
	TbNetwork,
	TbSchool,
	TbTrophy,
} from 'react-icons/tb';
import { motion, useReducedMotion } from 'motion/react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TF_YEAR, TUES_AGE } from '@/constants/event';
import { IfTFFeatureOn } from '@/lib/growthbook/react/client';
import { listItemEntrance, sectionFadeIn, sectionFadeUp } from '@/lib/motion/section-in-view';
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
	{ icon: 'bg-primary/10 text-primary' },
	{ icon: 'bg-secondary/10 text-secondary' },
	{ icon: 'bg-accent/10 text-accent' },
	{ icon: 'bg-muted/10 text-muted' },
] as const;

const EDUCATION_ITEMS = [
	'Участие в национални и международни състезания',
	'Hack TUES — хакатон, организиран от ученици за ученици',
	'Workshop-и и лекции от ИТ професионалисти',
	'Cisco академия за актуалните мрежови технологии',
	'Разнообразни извънкласни дейности',
	'Разширено изучаване на английски език',
] as const;

const SUCCESS_FACTORS = [
	'Тясна интеграция с Технически университет — София',
	'Гъвкав специализиран учебен план',
	'Преподаватели от ИТ бизнеса и университета',
	'Активната роля на завършилите в живота на училището',
	'Тясна връзка с реалния бизнес — стажове, дипломни проекти и практики',
] as const;

const SECTION_EYEBROW = [
	'text-primary',
	'text-secondary',
	'text-accent',
	'text-muted',
] as const;

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
			{subtitle ? <p className="max-w-2xl text-pretty text-foreground/70">{subtitle}</p> : null}
		</div>
	);
}

const cardSurface =
	'rounded-2xl bg-card/70 shadow-lg backdrop-blur-sm transition-colors duration-300 hover:bg-card/85';

export function AboutPageContent() {
	const reducedMotion = useReducedMotion();

	return (
		<div className="relative flex w-full flex-col items-center gap-16 px-4 pb-24 pt-10 md:gap-20 md:px-8 md:pt-14">
			{/* Background — matches location / schedule decorative language */}
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
				className="relative isolate mx-auto flex w-full max-w-3xl flex-col items-center gap-5 text-center"
				{...sectionFadeIn(reducedMotion, 0)}
			>
				<motion.p
					className="text-sm font-medium tracking-widest text-primary"
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
					className="max-w-2xl text-pretty text-lg leading-relaxed text-foreground/75"
					{...sectionFadeUp(reducedMotion, 0.18)}
				>
					Технологично училище „Електронни системи“ към ТУ-София е специализирано технологично
					училище от национално значение, което вече{' '}
					<span className="font-semibold text-white">{TUES_AGE} години</span> подготвя бъдещите лидери
					на ИТ сектора в България и отвъд.
				</motion.p>
				<motion.div {...sectionFadeUp(reducedMotion, 0.26)}>
					<Button asChild variant="default" size="lg" className="font-bold shadow-lg shadow-primary/20">
						<Link href="https://elsys-bg.org" target="_blank" rel="noopener noreferrer">
							<TbExternalLink size={18} />
							Официален сайт на ТУЕС
						</Link>
					</Button>
				</motion.div>
			</motion.section>

			{/* Stats */}
			<motion.section
				className="mx-auto w-full max-w-5xl"
				id="about-stats"
				{...sectionFadeIn(reducedMotion, 0)}
			>
				<div className="mb-6 text-center md:mb-8">
					<p className="text-sm font-medium tracking-widest text-muted">В цифри</p>
					<h2 className="mt-2 font-title text-3xl text-white md:text-4xl">ТУЕС накратко</h2>
				</div>
				<div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
					{STATS.map(({ icon: Icon, value, label }, index) => {
						const tone = STAT_TONES[index % STAT_TONES.length]!;
						return (
							<motion.div
								key={label}
								className="flex flex-col items-center gap-3 px-3 py-6 text-center sm:px-4 bg-card/80 rounded-xl"
								{...sectionFadeUp(reducedMotion, 0.05 * index)}
							>
								<div
									className={cn(
										'flex size-11 items-center justify-center rounded-xl sm:size-12',
										tone.icon,
									)}
								>
									<Icon size={26} className="sm:h-7 sm:w-7" />
								</div>
								<p className="font-title text-3xl text-white sm:text-4xl">{value}</p>
								<p className="text-xs leading-snug text-foreground/65 sm:text-sm">{label}</p>
							</motion.div>
						);
					})}
				</div>
			</motion.section>

			{/* Intro + image */}
			<motion.section
				className="mx-auto grid w-full max-w-5xl gap-10 md:grid-cols-2 md:items-center md:gap-12"
				{...sectionFadeIn(reducedMotion, 0)}
			>
				<motion.div
					className="flex flex-col gap-5 text-pretty leading-relaxed text-foreground/80"
					{...sectionFadeUp(reducedMotion, 0.06)}
				>
					<p>
						Възпитаниците на ТУЕС преминават през задълбочена и специализирана 5-годишна програма,
						която им позволява да се позиционират възможно най-бързо в технологичния сектор.
					</p>
					<p>
						За {TF_YEAR - 1} г. ТУЕС за пореден път се нареди на{' '}
						<span className="font-semibold text-white">второ място</span> по минимален бал на първо
						класиране в 7. клас в България.
					</p>
					<IfTFFeatureOn feature="tf-show-apply">
						<Link
							href="/apply"
							className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 transition-colors hover:text-primary/90 hover:underline"
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
					<img
						src="/assets/about/about.png"
						alt="Ученици на ТУЕС"
						className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
					/>
				</motion.div>
			</motion.section>

			{/* Specialties */}
			<motion.section className="mx-auto w-full max-w-5xl" {...sectionFadeIn(reducedMotion, 0)}>
				<SectionHeading
					eyebrow="Професии"
					title="Какво можеш да учиш?"
					toneIndex={0}
				/>
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
									<p className="text-sm leading-relaxed text-foreground/70">{description}</p>
								</div>
								{href ? (
									<span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100">
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
							<motion.div key={title} className={cardClass} {...listItemEntrance(reducedMotion, index, 0.08)}>
								{inner}
							</motion.div>
						);
					})}
				</div>
				<IfTFFeatureOn feature="tf-show-apply">
					<div className="mt-8 flex w-full justify-center">
						<Link
							href="/apply"
							className="inline-flex items-center gap-2 text-base font-medium text-primary underline-offset-4 transition-colors hover:text-primary/90 hover:underline"
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
				<Card
					variant="accent"
					className="bg-card/70 px-6 py-8 shadow-lg backdrop-blur-md sm:px-8 sm:py-9"
				>
					<CardContent className="flex flex-col gap-6 p-0">
						<div className="space-y-2">
							<p className="text-sm font-medium tracking-widest text-accent">Обучение</p>
							<h2 className="font-title text-2xl text-white md:text-3xl">Освен специализирания план</h2>
							<p className="text-sm text-foreground/65">ТУЕС предлага:</p>
						</div>
						<ul className="flex flex-col gap-2">
							{EDUCATION_ITEMS.map((item, i) => (
								<motion.li
									key={item}
									className="flex items-start gap-3 rounded-xl bg-white/[0.04] px-4 py-3"
									{...listItemEntrance(reducedMotion, i, 0.06)}
								>
									<span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
										<TbCheck size={14} strokeWidth={2.5} />
									</span>
									<span className="text-sm leading-relaxed text-foreground/85">{item}</span>
								</motion.li>
							))}
						</ul>
					</CardContent>
				</Card>

				<Card
					variant="primary"
					className="bg-card/70 px-6 py-8 shadow-lg backdrop-blur-md sm:px-8 sm:py-9"
				>
					<CardContent className="flex flex-col gap-6 p-0">
						<div className="space-y-2">
							<p className="text-sm font-medium tracking-widest text-primary">Успех</p>
							<h2 className="font-title text-2xl text-white md:text-3xl">ТУЕС успява благодарение на</h2>
						</div>
						<ul className="flex flex-col gap-2">
							{SUCCESS_FACTORS.map((item, i) => (
								<motion.li
									key={item}
									className="flex items-start gap-3 rounded-xl bg-white/[0.04] px-4 py-3"
									{...listItemEntrance(reducedMotion, i, 0.06)}
								>
									<span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
										{i + 1}
									</span>
									<span className="text-sm leading-relaxed text-foreground/85">{item}</span>
								</motion.li>
							))}
						</ul>
					</CardContent>
				</Card>
			</motion.section>

			{/* Hack TUES */}
			<motion.section className="mx-auto w-full max-w-5xl" {...sectionFadeIn(reducedMotion, 0)}>
				<SectionHeading eyebrow="Хакатон" title="Hack TUES" toneIndex={2} />

				<motion.div
					className="overflow-hidden rounded-2xl shadow-2xl shadow-black/50"
					{...sectionFadeUp(reducedMotion, 0.08)}
				>
					<img
						src="/assets/about/ht11_image.jpg"
						alt="Hack TUES 11 организатори"
						className="aspect-[21/9] w-full object-cover md:aspect-[2.4/1]"
					/>
				</motion.div>

				<div className="mt-8 grid gap-4 md:grid-cols-2">
					{[
						{
							label: 'Какво е?',
							body:
								'Hack TUES е едно от ключовите събития за ТУЕС — ученици в отбори от 3–5 участници създават от нулата ИТ проект за два дни по зададена тема и го представят пред професионално жури от преподаватели и ИТ специалисти.',
						},
						{
							label: 'Значимост',
							body:
								'Единственият хакатон в България, организиран от ученици за ученици. Намерил е място сред иновативните практики на ЮНЕСКО за техническо и професионално образование — единствената образователна практика от България в тази инициатива.',
						},
					].map((block, i) => (
						<motion.div
							key={block.label}
							className={cn('p-6 sm:p-7', cardSurface)}
							{...listItemEntrance(reducedMotion, i, 0.08)}
						>
							<p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary/90">
								{block.label}
							</p>
							<p className="text-sm leading-relaxed text-foreground/80">{block.body}</p>
						</motion.div>
					))}
					<motion.div
						className={cn('md:col-span-2', cardSurface, 'p-6 sm:p-7')}
						{...listItemEntrance(reducedMotion, 2, 0.08)}
					>
						<p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-secondary/90">
							Организация
						</p>
						<p className="text-sm leading-relaxed text-foreground/80">
							Събитието стартира през 2015 г. и досега има единадесет издания. Всяка година се подготвя
							от организационен екип, съставен от ученици в 11. клас, под менторството на АЗТУЕС.
							Участниците развиват умения по програмиране, работа в екип и презентиране, а запознанствата
							с ментори често прерастват в предложения за работа.
						</p>
					</motion.div>
				</div>

				<div className="mt-8 flex justify-center">
					<Button asChild variant="default" size="lg" className="font-bold shadow-lg shadow-primary/20">
						<Link href="https://hack-tues.com" target="_blank" rel="noopener noreferrer">
							<TbExternalLink size={18} />
							Виж повече за Hack TUES
						</Link>
					</Button>
				</div>
			</motion.section>
		</div>
	);
}
