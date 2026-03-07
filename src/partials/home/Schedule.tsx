'use client';

import { useEffect } from 'react';

import { SCHEDULE } from '@/constants/home/schedule';

function Schedule() {
	useEffect(() => {
		const hash = window.location.hash;
		if (hash === '#schedule') {
			setTimeout(() => {
				const el = document.getElementById('schedule');
				if (el) {
					el.scrollIntoView({ behavior: 'smooth' });
				}
			}, 0);
		}
	}, []);

	return (
		<section id="schedule" className="relative px-4 py-12 md:px-8">
			{/* Section header */}
			<div className="mb-12 flex flex-col items-center gap-2 text-center">
				<p className="text-accent tracking-widest">Какво предстои</p>
				<h2 className="font-title text-4xl text-white md:text-5xl">Програма</h2>
			</div>

			{/* Timeline */}
			<div className="relative mx-auto max-w-3xl">
				{/* Vertical connecting line */}
				<div className="absolute top-4 bottom-4 left-4 w-px bg-gradient-to-b from-accent/40 via-accent/20 to-transparent sm:left-5" />

				<div className="flex flex-col gap-6">
					{SCHEDULE.map((item, i) => (
						<div key={item.title} className="flex gap-6 sm:gap-8">
							{/* Timeline dot */}
							<div className="relative z-10 mt-5 flex shrink-0 flex-col items-center">
								<div className="flex size-9 items-center justify-center rounded-full border border-accent/40 bg-accent/10 backdrop-blur-sm">
									<div className="size-2.5 rounded-full bg-accent shadow-[0_0_8px_theme(colors.accent/50)]" />
								</div>
							</div>

							{/* Content card */}
							<div className="group w-full rounded-2xl border border-white/10 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-accent/30 hover:bg-card/80">
								{/* Time badge */}
								<div className="mb-3 flex items-center gap-2">
									<span className="font-title rounded-full border border-accent/20 bg-accent/10 px-3 py-0.5 text-xs font-semibold tracking-widest text-accent">
										{item.start} – {item.end}
									</span>
								</div>

								{/* Title */}
								<h3 className="mb-3 text-xl font-bold text-white">{item.title}</h3>

								{/* Description */}
								<div className="text-sm leading-relaxed text-white/60">
									{item.description}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export default Schedule;
