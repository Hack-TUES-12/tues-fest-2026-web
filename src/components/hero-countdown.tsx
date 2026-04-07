'use client';

import { useEffect, useState } from 'react';

import { TF_DATE } from '@/constants/event';

function getTimeLeft() {
	const gap = TF_DATE.getTime() - Date.now();
	const second = 1000;
	const minute = second * 60;
	const hour = minute * 60;
	const day = hour * 24;
	return {
		days: Math.max(0, Math.floor(gap / day)),
		hours: Math.max(0, Math.floor((gap % day) / hour)),
		minutes: Math.max(0, Math.floor((gap % hour) / minute)),
		seconds: Math.max(0, Math.floor((gap % minute) / second)),
	};
}

const fmt = (n: number) => String(n).padStart(2, '0');

const BOXES = [
	{
		label: 'дни',
		labelOne: 'ден',
		className: 'bg-accent/50 backdrop-blur-md',
	},
	{
		label: 'часа',
		labelOne: 'час',
		className: 'bg-secondary/50 backdrop-blur-md',
	},
	{
		label: 'минути',
		labelOne: 'минута',
		className: 'bg-muted/50 backdrop-blur-md',
	},
	{
		label: 'секунди',
		labelOne: 'секунда',
		className: 'bg-primary/50 backdrop-blur-md',
	},
] as const;

export function HeroCountdown() {
	const [time, setTime] = useState(getTimeLeft);

	useEffect(() => {
		const id = setInterval(() => setTime(getTimeLeft()), 1000);
		return () => clearInterval(id);
	}, []);

	const values = [time.days, time.hours, time.minutes, time.seconds];

	return (
		<div className="flex w-full min-w-0 flex-nowrap items-center justify-center gap-[clamp(0.15rem,1.5vw,1rem)] lg:justify-end">
			{BOXES.map((box, i) => {
				const v = values[i] ?? 0;
				const unitLabel = v === 1 ? box.labelOne : box.label;
				return (
					<div
						key={box.label}
						className={`flex aspect-square w-[clamp(4rem,15.5vw,7rem)] shrink-0 flex-col items-center justify-center gap-[clamp(0.1rem,0.6vw,0.35rem)] rounded-2xl border border-white/15 p-[clamp(0.2rem,1.2vw,0.75rem)] ${box.className}`}
					>
						<span className="font-mighty text-[clamp(2rem,6.2vw,3rem)] leading-none text-white tabular-nums">
							{fmt(v)}
						</span>
						<span className="text-center text-[clamp(0.6rem,2.6vw,0.65rem)] font-medium uppercase leading-tight tracking-[clamp(0.02em,0.35vw,0.2em)] text-white/70">
							{unitLabel}
						</span>
					</div>
				);
			})}
		</div>
	);
}
