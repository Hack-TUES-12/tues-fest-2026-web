'use client';

import { useMemo } from 'react';
import { TbBrandYoutube } from 'react-icons/tb';

import { RegulationTimelineRail } from '@/app/regulation/regulation-timeline-rail';
import type { RegulationAccent } from '@/app/regulation/regulation-accent';
import { useRegulationActiveSection } from '@/app/regulation/use-regulation-active-section';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SCHEDULE } from '@/constants/home/schedule';
import { cn } from '@/lib/utils';

/** Matches `SCHEDULE_PART_STYLES` order — border/label in each card’s hue. */
const SCHEDULE_LIVE_BUTTON_VARIANTS = [
	'accent-secondary',
	'default-secondary',
	'secondary-secondary',
	'muted-secondary',
] as const;

/** Accent → primary → secondary → muted, then repeat. */
const SCHEDULE_PART_STYLES = [
	{
		badge: 'border-accent/25 bg-accent/10 text-accent',
		title: 'text-accent',
		card: 'border-accent/20 hover:border-accent/45',
	},
	{
		badge: 'border-primary/25 bg-primary/10 text-primary',
		title: 'text-primary',
		card: 'border-primary/20 hover:border-primary/45',
	},
	{
		badge: 'border-secondary/25 bg-secondary/10 text-secondary',
		title: 'text-secondary',
		card: 'border-secondary/20 hover:border-secondary/45',
	},
	{
		badge: 'border-muted/25 bg-muted/10 text-muted',
		title: 'text-muted',
		card: 'border-muted/20 hover:border-muted/45',
	},
] as const;

/** Same hue order as `SCHEDULE_PART_STYLES` — pairs with regulation rail tokens. */
const SCHEDULE_RAIL_ACCENTS: readonly RegulationAccent[] = [
	'accent',
	'primary',
	'secondary',
	'muted',
];

/** DOM ids for scroll-based rail active state — same focal-line logic as `/regulation`. */
function scheduleSectionIds(): string[] {
	return SCHEDULE.map((_, i) => `schedule-section-${i}`);
}

/** Lower reading line than regulation (0.38) so timeline rails activate earlier on `/schedule`. */
const SCHEDULE_FOCAL_Y_RATIO = 0.52;

function Schedule() {
	const sectionIds = useMemo(() => scheduleSectionIds(), []);
	const { isSectionActive } = useRegulationActiveSection(sectionIds, {
		focalYRatio: SCHEDULE_FOCAL_Y_RATIO,
	});

	return (
		<section
			id="schedule"
			className="relative isolate overflow-x-hidden px-4 py-12 md:px-8"
		>
			<img
				src="/decorations/blue-circle.svg"
				alt=""
				aria-hidden
				className="pointer-events-none absolute left-0 top-0 z-0 w-[50vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 select-none"
			/>
			<img
				src="/decorations/orange-circle.svg"
				alt=""
				aria-hidden
				className="pointer-events-none absolute bottom-1/4 right-0 z-0 w-[40vw] max-w-xl translate-x-1/3 select-none"
			/>

			<div className="relative z-10">
			{/* Section header */}
			<div className="mb-12 flex flex-col items-center gap-2 text-center">
				<p className="text-accent tracking-widest">Какво предстои</p>
				<h2 className="font-title text-4xl text-white md:text-5xl">Програма</h2>
			</div>

			{/* Timeline — rail matches /regulation (2px stroke + gradient + dot language) */}
			<div className="relative mx-auto max-w-3xl">
				<div className="flex flex-col gap-6">
					{SCHEDULE.map((item, i) => {
						const s = SCHEDULE_PART_STYLES[i % SCHEDULE_PART_STYLES.length]!;
						const railAccent = SCHEDULE_RAIL_ACCENTS[i % SCHEDULE_RAIL_ACCENTS.length]!;
						return (
							<div
								key={item.title}
								id={sectionIds[i]}
								className="scroll-mt-28 flex gap-2 sm:gap-4"
							>
								<RegulationTimelineRail
									accent={railAccent}
									isActive={isSectionActive(sectionIds[i]!)}
									isFirst={i === 0}
									isLast={i === SCHEDULE.length - 1}
									size="sm"
								/>

								<div className="min-w-0 flex-1">
									<Card
										className={cn(
											'group w-full rounded-2xl bg-card/70 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-card/90 gap-1',
											s.card,
										)}
									>
									{/* Time badge */}
									<div className="mb-4 flex items-center gap-2">
										<span
											className={cn(
												'font-title rounded-full border px-3 py-0.5 text-xs font-semibold tracking-widest',
												s.badge,
											)}
										>
											{item.start} – {item.end}
										</span>
									</div>

									{/* Title */}
									<h3 className={cn('font-mono text-2xl font-bold', s.title)}>
										{item.title}
									</h3>

									{/* Description */}
									<div className="text-sm leading-relaxed text-white/60">
										{item.description}
									</div>

									{item.liveStream && (
										<Button
											variant={SCHEDULE_LIVE_BUTTON_VARIANTS[i % 4]}
											className="mt-6 font-title text-xs tracking-widest w-fit"
											asChild
										>
											<a
												href={item.liveStream.href}
												target="_blank"
												rel="noopener noreferrer"
											>
												<TbBrandYoutube className="size-4 shrink-0" aria-hidden />
												{item.liveStream.label}
											</a>
										</Button>
									)}
									</Card>
								</div>
							</div>
						);
					})}
				</div>
			</div>
			</div>
		</section>
	);
}

export default Schedule;
