'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { TbArrowRight, TbBus, TbCar, TbExternalLink, TbMap2, TbTrain, TbWalk } from 'react-icons/tb';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	LOCATION_EMBED_URL,
	LOCATION_MAP_URL,
	LOCATION_STREET_VIEW_URL,
	TF_DATE_STRING,
	TF_LOCATION,
	TF_ROUNDED_PROJECT_COUNT,
	TF_TIME_STRING,
} from '@/constants/event';
import { TF_TITLE } from '@/constants/seo';
import { IfTFFeatureOn } from '@/lib/growthbook/react/client';
import {
	listItemEntrance,
	SECTION_FADE_IN_DURATION_SEC,
	sectionFadeIn,
	sectionFadeUp,
} from '@/lib/motion/section-in-view';
import { cn } from '@/lib/utils';

const TRANSPORT_OPTIONS = [
	{
		icon: TbBus,
		title: 'Автобус и тролейбус',
		description:
			'Множество автобусни и тролейбусни линии спират в непосредствена близост до София Тех Парк по бул. „Цариградско шосе".',
	},
	{
		icon: TbTrain,
		title: 'Метро',
		description: 'Слезте на метростанция „Младост 1" и продължете с автобус 73 до София Тех Парк.',
	},
	{
		icon: TbCar,
		title: 'Автомобил',
		description: 'На територията на Sofia Tech Park има безплатен паркинг с голям капацитет.',
	},
	{
		icon: TbWalk,
		title: 'Пеша / велосипед',
		description:
			'Ако идвате от Младост или Business Park Sofia, локацията е достижима пеша или с велосипед.',
	},
] as const;

const TRANSPORT_ICON_TONES = [
	{ wrap: 'bg-primary/10 text-primary' },
	{ wrap: 'bg-secondary/10 text-secondary' },
	{ wrap: 'bg-accent/10 text-accent' },
	{ wrap: 'bg-muted/10 text-muted' },
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
	const tone = SECTION_EYEBROW[toneIndex % SECTION_EYEBROW.length]!;
	return (
		<div className="mb-8 flex flex-col items-center gap-2 text-center md:mb-10">
			<p className={cn('text-sm font-medium tracking-widest', tone)}>{eyebrow}</p>
			<h2 className="font-title text-4xl text-white md:text-5xl">{title}</h2>
			{subtitle ? <p className="text-foreground/70 max-w-2xl text-pretty">{subtitle}</p> : null}
		</div>
	);
}

const cardShell =
	'border-white/5 bg-card/70 px-6 py-8 shadow-lg backdrop-blur-md sm:px-8 sm:py-9';

const outlineCta =
	'border-white/15 bg-card/30 font-semibold text-white shadow-none transition-colors hover:border-primary/40 hover:bg-card/50 hover:text-primary';

export function LocationPageContent() {
	const reducedMotion = useReducedMotion();

	return (
		<div className="relative px-4 pt-10 pb-24 md:px-8 md:pt-14">
			<div
				className="pointer-events-none absolute top-0 bottom-0 left-1/2 z-0 w-[100dvw] max-w-none -translate-x-1/2"
				aria-hidden
			>
				<Image
					src="/decorations/purple-circle.svg"
					alt=""
					width={448}
					height={448}
					unoptimized
					aria-hidden
					className="pointer-events-none absolute top-0 left-0 h-auto w-[min(50vw,40rem)] max-w-4xl -translate-x-1/4 -translate-y-1/4 opacity-90 select-none"
				/>
				<Image
					src="/decorations/green-circle.svg"
					alt=""
					width={384}
					height={384}
					unoptimized
					aria-hidden
					className="pointer-events-none absolute right-0 bottom-[8%] h-auto w-[min(42vw,32rem)] translate-x-1/4 opacity-80 select-none"
				/>
				<Image
					src="/decorations/orange-circle.svg"
					alt=""
					width={400}
					height={400}
					unoptimized
					aria-hidden
					className="pointer-events-none absolute top-[18%] right-0 h-auto w-[min(38vw,28rem)] max-w-xl translate-x-1/3 opacity-70 select-none"
				/>
				<Image
					src="/decorations/blue-circle.svg"
					alt=""
					width={384}
					height={384}
					unoptimized
					aria-hidden
					className="pointer-events-none absolute top-[36%] left-0 h-auto w-[min(48vw,36rem)] max-w-lg -translate-x-1/4 opacity-75 select-none"
				/>
			</div>

			<div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-16 md:gap-20">
				{/* Hero */}
				<motion.section
					className="flex w-full flex-col items-center gap-6 text-center"
					{...sectionFadeIn(reducedMotion, 0)}
				>
					<motion.p
						className="text-primary text-sm font-medium tracking-widest"
						{...sectionFadeUp(reducedMotion, 0.06)}
					>
						Локация
					</motion.p>
					<motion.h1
						className="font-title text-5xl text-white md:text-6xl"
						{...sectionFadeUp(reducedMotion, 0.12)}
					>
						Намери ни
					</motion.h1>
					<motion.p
						className="text-foreground/75 max-w-2xl text-lg leading-relaxed text-pretty"
						{...sectionFadeUp(reducedMotion, 0.18)}
					>
						{TF_TITLE} ще се проведе на {TF_DATE_STRING} в{' '}
						<span className="font-semibold text-white">{TF_LOCATION}</span> — дом на стотици
						технологични, бизнес и образователни конференции, семинари, обучения и изложения всяка
						година.
					</motion.p>
					<motion.div
						className="flex w-full max-w-md flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center"
						{...sectionFadeUp(reducedMotion, 0.26)}
					>
						<Button asChild variant="default" size="lg" className="shadow-primary/20 font-bold shadow-lg">
							<Link href={LOCATION_MAP_URL} target="_blank" rel="noopener noreferrer">
								<TbMap2 size={20} aria-hidden />
								Отвори в Google Maps
							</Link>
						</Button>
						<Button asChild variant="outline" size="lg" className={outlineCta}>
							<Link href={LOCATION_STREET_VIEW_URL} target="_blank" rel="noopener noreferrer">
								<TbExternalLink size={18} aria-hidden />
								Street View
							</Link>
						</Button>
						<IfTFFeatureOn feature="tf-schedule">
							<Button asChild variant="outline" size="lg" className={outlineCta}>
								<Link href="/schedule">Програма на деня</Link>
							</Button>
						</IfTFFeatureOn>
					</motion.div>
				</motion.section>

				{/* Map + details */}
				<motion.section
					className="grid w-full gap-6 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,1fr)] lg:grid-rows-2 lg:items-stretch lg:gap-8"
					{...sectionFadeIn(reducedMotion, 0)}
				>
					<motion.div
						className="min-h-[min(420px,55vh)] lg:row-span-2 lg:min-h-0"
						{...sectionFadeUp(reducedMotion, 0.06)}
					>
						<div className="relative h-full min-h-[min(420px,55vh)] overflow-hidden rounded-2xl shadow-2xl shadow-black/40 ring-1 ring-white/10 ring-inset lg:min-h-full">
							<iframe
								src={LOCATION_EMBED_URL}
								title="Карта на локацията — форум Джон Атанасов, София Тех Парк, София"
								className="absolute inset-0 h-full w-full border-0"
								allowFullScreen
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
							/>
						</div>
					</motion.div>

					<motion.div {...sectionFadeUp(reducedMotion, 0.12)}>
						<Card variant="primary" className={cn('h-full', cardShell)}>
							<CardContent className="flex flex-col gap-4 p-0">
								<div className="space-y-2">
									<p className="text-primary text-sm font-medium tracking-widest">Адрес</p>
									<h2 className="font-title text-2xl text-white md:text-3xl">
										Форум „Джон Атанасов“
									</h2>
								</div>
								<div className="text-foreground/80 flex flex-col gap-3 text-sm leading-relaxed">
									<p>
										бул. „Цариградско шосе" 111И, 1784 София — иновационен форум „Джон Атанасов" в
										рамките на София Тех Парк.
									</p>
									<p>
										Форумът е модерно конферентно пространство, кръстено на Джон Атанасов — пионер в
										компютърната наука с български корени, чието наследство вдъхновява поколения
										технолози.
									</p>
								</div>
								<Link
									href={LOCATION_STREET_VIEW_URL}
									target="_blank"
									rel="noopener noreferrer"
									className="text-primary hover:text-primary/90 inline-flex w-fit items-center gap-1.5 text-sm font-medium underline-offset-4 transition-colors hover:underline"
								>
									<TbExternalLink size={16} aria-hidden />
									Разгледай в Google Maps
								</Link>
							</CardContent>
						</Card>
					</motion.div>

					<motion.div {...sectionFadeUp(reducedMotion, 0.18)}>
						<Card variant="accent" className={cn('h-full', cardShell)}>
							<CardContent className="flex flex-col gap-4 p-0">
								<div className="space-y-2">
									<p className="text-accent text-sm font-medium tracking-widest">Кога</p>
									<h2 className="font-title text-2xl text-white md:text-3xl">Денят на събитието</h2>
								</div>
								<div className="text-foreground/80 flex flex-col gap-3 text-sm leading-relaxed">
									<p>
										Събитието е на{' '}
										<span className="font-semibold text-white">{TF_DATE_STRING}</span>, а вратите
										отварят в <span className="font-semibold text-white">{TF_TIME_STRING} часа</span>.
									</p>
									<p>
										Над {TF_ROUNDED_PROJECT_COUNT} ученически проекта ще бъдат изложени на място.
										Влезте в контакт с авторите, гласувайте за любимите си проекти и се срещнете с
										компаниите спонсори.
									</p>
								</div>
								<IfTFFeatureOn feature="tf-show-projects">
									<Link
										href="/projects"
										className="text-accent hover:text-accent/90 inline-flex w-fit items-center gap-1.5 text-sm font-medium underline-offset-4 transition-colors hover:underline"
									>
										Виж проектите
										<TbArrowRight size={16} className="opacity-90" aria-hidden />
									</Link>
								</IfTFFeatureOn>
							</CardContent>
						</Card>
					</motion.div>
				</motion.section>

				{/* Transport */}
				<motion.section className="w-full" {...sectionFadeIn(reducedMotion, 0)}>
					<SectionHeading
						eyebrow="Транспорт"
						title="Как да стигнете до там?"
						subtitle="София Тех Парк е лесно достъпен с градски транспорт и автомобил."
						toneIndex={1}
					/>
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						{TRANSPORT_OPTIONS.map(({ icon: Icon, title, description }, index) => {
							const tone = TRANSPORT_ICON_TONES[index % TRANSPORT_ICON_TONES.length]!;
							return (
								<motion.div
									key={title}
									className={cn(
										'flex gap-4 rounded-2xl border border-white/10 bg-card/70 p-6 shadow-lg backdrop-blur-sm transition-colors duration-300 hover:bg-card/85 sm:p-7'
									)}
									{...listItemEntrance(
										reducedMotion,
										index,
										0.08,
										SECTION_FADE_IN_DURATION_SEC * 0.35
									)}
								>
									<div
										className={cn(
											'mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-xl sm:size-12',
											tone.wrap
										)}
									>
										<Icon size={24} className="sm:h-[26px] sm:w-[26px]" aria-hidden />
									</div>
									<div className="min-w-0">
										<h3 className="font-title mb-1.5 text-lg text-white md:text-xl">{title}</h3>
										<p className="text-foreground/70 text-sm leading-relaxed">{description}</p>
									</div>
								</motion.div>
							);
						})}
					</div>
				</motion.section>
			</div>
		</div>
	);
}
