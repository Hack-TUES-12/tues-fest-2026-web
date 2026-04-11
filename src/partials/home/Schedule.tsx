import { Card } from '@/components/ui/card';
import { SCHEDULE } from '@/constants/home/schedule';
import { cn } from '@/lib/utils';

/** Accent → primary → secondary → muted, then repeat. */
const SCHEDULE_PART_STYLES = [
	{
		ring: 'border-accent/40 bg-accent/10',
		dot: 'bg-accent',
		dotShadow: 'shadow-[0_0_8px_theme(colors.accent/50)]',
		badge: 'border-accent/25 bg-accent/10 text-accent',
		title: 'text-accent',
		card: 'border-accent/20 hover:border-accent/45',
	},
	{
		ring: 'border-primary/40 bg-primary/10',
		dot: 'bg-primary',
		dotShadow: 'shadow-[0_0_8px_theme(colors.primary/50)]',
		badge: 'border-primary/25 bg-primary/10 text-primary',
		title: 'text-primary',
		card: 'border-primary/20 hover:border-primary/45',
	},
	{
		ring: 'border-secondary/40 bg-secondary/10',
		dot: 'bg-secondary',
		dotShadow: 'shadow-[0_0_8px_theme(colors.secondary/50)]',
		badge: 'border-secondary/25 bg-secondary/10 text-secondary',
		title: 'text-secondary',
		card: 'border-secondary/20 hover:border-secondary/45',
	},
	{
		ring: 'border-muted/40 bg-muted/10',
		dot: 'bg-muted',
		dotShadow: 'shadow-[0_0_8px_theme(colors.muted/50)]',
		badge: 'border-muted/25 bg-muted/10 text-muted',
		title: 'text-muted',
		card: 'border-muted/20 hover:border-muted/45',
	},
] as const;

function Schedule() {
	return (
		<section id="schedule" className="relative px-4 py-12 md:px-8">
			{/* Section header */}
			<div className="mb-12 flex flex-col items-center gap-2 text-center">
				<p className="text-accent tracking-widest">Какво предстои</p>
				<h2 className="font-title text-4xl text-white md:text-5xl">Програма</h2>
			</div>

			{/* Timeline */}
			<div className="relative mx-auto max-w-3xl">
				{/* Vertical spine — multi-stop gradient through the four theme hues */}
				<div
					className="pointer-events-none absolute top-4 bottom-4 left-4 w-px sm:left-5"
					style={{
						background:
							'linear-gradient(to bottom, color-mix(in oklch, var(--color-accent) 45%, transparent) 0%, color-mix(in oklch, var(--color-primary) 40%, transparent) 33%, color-mix(in oklch, var(--color-secondary) 40%, transparent) 66%, color-mix(in oklch, var(--color-muted) 40%, transparent) 100%)',
					}}
				/>

				<div className="flex flex-col gap-6">
					{SCHEDULE.map((item, i) => {
						const s = SCHEDULE_PART_STYLES[i % SCHEDULE_PART_STYLES.length]!;
						return (
							<div key={item.title} className="flex gap-6 sm:gap-8">
								{/* Timeline dot */}
								<div className="relative z-10 mt-5 flex shrink-0 flex-col items-center">
									<div
										className={cn(
											'flex size-9 items-center justify-center rounded-full border backdrop-blur-sm',
											s.ring,
										)}
									>
										<div
											className={cn('size-2.5 rounded-full', s.dot, s.dotShadow)}
										/>
									</div>
								</div>

								{/* Content card */}
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
								</Card>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}

export default Schedule;
