'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import {
	TbArrowRight,
	TbCpu,
	TbFlame,
	TbPlus,
	TbShield,
	TbSword,
	TbTournament,
	TbTrophy,
	TbVideo,
} from 'react-icons/tb';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	listItemEntrance,
	listItemIconEntrance,
	sectionFadeIn,
	sectionFadeUp,
} from '@/lib/motion/section-in-view';
import { cn } from '@/lib/utils';

const WHAT_IS_LIST = [
	'Ученически турнир по роботика на живо',
	'Автономни роботи, програмирани от учениците',
	'Елиминационна схема — един отбор оцелява',
	'Провежда се в Иновационен форум „Джон Атанасов"',
	'Организиран от учениците на ТУЕС',
] as const;

const FORMAT_CARDS = [
	{
		icon: TbCpu,
		eyebrow: 'Строеж',
		title: 'Проектирай и програмирай',
		body: 'Всеки отбор проектира и програмира собствен робот. Машините трябва да са автономни — без дистанционно управление.',
	},
	{
		icon: TbSword,
		eyebrow: 'Схватка',
		title: 'Влез в арената',
		body: 'Два робота влизат в арената. Целта е да обездвижиш противника — единственото ограничение е твоята стратегия.',
	},
	{
		icon: TbTournament,
		eyebrow: 'Турнир',
		title: 'Елиминационна схема',
		body: 'Победителите от всеки мач продължават напред. Губещите отпадат. Последният останал вдига купата.',
	},
	{
		icon: TbTrophy,
		eyebrow: 'Награди',
		title: 'Слава и признание',
		body: 'Победителят в турнира получава официално признание и вписва името си в историята на TUES Battle Bots.',
	},
] as const;

const FORMAT_CARD_TONES = [
	{ icon: 'bg-secondary/10 text-secondary', eyebrow: 'text-secondary' },
	{ icon: 'bg-primary/10 text-primary', eyebrow: 'text-primary' },
	{ icon: 'bg-secondary/10 text-secondary', eyebrow: 'text-secondary' },
	{ icon: 'bg-primary/10 text-primary', eyebrow: 'text-primary' },
] as const;

const RULES_LIST = [
	'Роботите трябва да са изградени от ученици',
	'Битките продължават не повече от 3 минути',
	'Мачът приключва при обездвижване или напускане на арената',
] as const;

const cardSurface =
	'rounded-2xl bg-card/70 shadow-lg backdrop-blur-sm transition-colors duration-300 hover:bg-card/85';

const LIST_STAGGER = 0.08;
const LIST_BASE = 0.15;

export function BattlebotPageContent() {
	const reducedMotion = useReducedMotion();

	return (
		<div className="relative px-4 pt-10 pb-24 md:px-8 md:pt-14">
			{/* Background decorations — same as /battlebot/live */}
			<div
				className="pointer-events-none absolute top-0 bottom-0 left-1/2 z-0 w-[100dvw] max-w-none -translate-x-1/2"
				aria-hidden
			>
				<img
					src="/decorations/purple-circle.svg"
					alt=""
					aria-hidden="true"
					className="pointer-events-none absolute top-0 left-0 h-auto w-[min(50vw,36rem)] -translate-x-1/4 -translate-y-1/4 opacity-70 select-none"
				/>
				<img
					src="/decorations/purple-circle.svg"
					alt=""
					aria-hidden="true"
					className="pointer-events-none absolute top-[30%] right-0 h-auto w-[min(42vw,32rem)] translate-x-1/4 opacity-55 select-none"
				/>
				<img
					src="/decorations/purple-circle.svg"
					alt=""
					aria-hidden="true"
					className="pointer-events-none absolute bottom-0 left-0 h-auto w-[min(32vw,28rem)] -translate-x-1/4 translate-y-1/5 opacity-45 select-none"
				/>
			</div>

			<div className="relative z-10 flex w-full flex-col items-center gap-16 md:gap-20">
				{/* Hero */}
				<motion.section
					className="relative isolate mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center"
					{...sectionFadeIn(reducedMotion, 0)}
				>
					<motion.p
						className="text-primary text-sm font-medium tracking-widest uppercase"
						{...sectionFadeUp(reducedMotion, 0.06)}
					>
						TUES Fest 2026
					</motion.p>
					<motion.h1
						className="font-title text-5xl text-white md:text-6xl"
						{...sectionFadeUp(reducedMotion, 0.12)}
					>
						TUES Battle Bots
					</motion.h1>
					<motion.p
						className="text-foreground/75 max-w-2xl text-pretty text-lg leading-relaxed"
						{...sectionFadeUp(reducedMotion, 0.18)}
					>
						Моментът от TUES Fest, в който всеки зарязва това, което прави, и излиза да наблюдава арената. Всеки от вас ще има възможност да гледа ожесточените битки между роботите на участниците, а от арената ще излезе само един победител.
					</motion.p>
					<motion.div
						className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center"
						{...sectionFadeUp(reducedMotion, 0.26)}
					>
						<Button
							asChild
							variant="default"
							size="lg"
							className="shadow-primary/20 font-bold shadow-lg"
						>
							<Link href="/battlebot/live">
								Гледай на живо
							</Link>
						</Button>
						<Button
							asChild
							variant="default-secondary"
							size="lg"
							className=""
						>
							<Link href="/battlebot/live">
								Резултати от турнира
								<TbArrowRight size={18} />
							</Link>
						</Button>
					</motion.div>
				</motion.section>

				{/* What is Battle Bots + visual */}
				<motion.section
					className="mx-auto w-full max-w-5xl"
					{...sectionFadeIn(reducedMotion, 0)}
				>
					<div className="grid mx-auto gap-10 md:grid-cols-2 md:items-center md:gap-12">
						<motion.div
							className="flex flex-col gap-4"
							{...sectionFadeUp(reducedMotion, 0.06)}
						>
							<div className="flex flex-col gap-2">
								<motion.p
									className="text-primary text-sm font-medium tracking-widest uppercase"
									{...sectionFadeUp(reducedMotion, 0)}
								>
									За състезанието
								</motion.p>
								<motion.h2
									className="font-title text-3xl text-white md:text-4xl"
									{...sectionFadeUp(reducedMotion, 0.06)}
								>
									Какво е Battle Bots?
								</motion.h2>
							</div>
							<p>8 бойни робота, които ученици сами разработват, ще се изправят един срещу друг в арената на <span className='text-primary'>TUES Battle Bots 2026</span>. Състезанието се провежда под формата на турнир, като всяка битка трае 3 минути или докато единият робот не спре да функционира. Битките ще бъдат коментирани и оценени от професионалисти в сферата на роботиката. Състезанието започва точно в <span className='text-primary'>15:30 часа</span> на <span className='text-primary'>26.04.2026</span>.</p>
						</motion.div>

						<Card
							variant="secondary"
							className="bg-card/70 px-6 py-8 shadow-lg backdrop-blur-md sm:px-8 sm:py-9"
						>
							<CardContent className="flex flex-col gap-4 p-0">
								<div className="space-y-2">
									<p className="text-primary text-sm font-medium tracking-widest uppercase">Правила</p>
									<h2 className="font-title text-2xl text-white md:text-3xl">Основни правила</h2>
								</div>
								<ul className="flex flex-col gap-2 px-2">
									{RULES_LIST.map((item, i) => (
										<motion.li
											key={item}
											className="flex items-start gap-2"
											{...listItemEntrance(reducedMotion, i, LIST_STAGGER, LIST_BASE)}
										>
											<motion.span
												className="inline-flex shrink-0 origin-center pt-0.5"
												{...listItemIconEntrance(reducedMotion, i, LIST_STAGGER, LIST_BASE)}
											>
												<TbPlus
													className="size-6 shrink-0 stroke-[3.5] text-primary"
													aria-hidden
												/>
											</motion.span>
											<span className="pt-1 text-sm text-foreground/85">{item}</span>
										</motion.li>
									))}
								</ul>
							</CardContent>
						</Card>
					</div>
				</motion.section>

				{/* Rules + CTA */}
				<motion.section
					className="mx-auto flex w-full max-w-5xl gap-8 flex-col items-center"
					{...sectionFadeIn(reducedMotion, 0)}
				>
					<div className="flex flex-col items-center gap-6">
						<div className='text-center'>
							<p className="text-primary text-sm font-medium tracking-widest uppercase">На живо</p>
							<h2 className="font-title text-2xl text-white md:text-3xl">Гледай турнира</h2>
							<p className="text-foreground/70 text-sm leading-relaxed">
								Следи битките на живо — резултати в реално време и излъчване директно на сайта.
							</p>
						</div>
						<motion.div
							className="flex gap-3"
							{...sectionFadeUp(reducedMotion, 0.14)}
						>
							<Button
								asChild
								variant="default"
								size="lg"
								className="shadow-primary/20 font-bold shadow-lg"
							>
								<Link href="/battlebot/live">
									<TbVideo size={18} />
									Гледай на живо
								</Link>
							</Button>
							<Button
								asChild
								variant="default-secondary"
								size="lg"
								className="font-bold"
							>
								<Link href="/battlebot/live">
									Резултати от турнира
									<TbArrowRight size={18} />
								</Link>
							</Button>
						</motion.div>
					</div>
				</motion.section>
			</div>
		</div>
	);
}
