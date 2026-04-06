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
		<div className="flex flex-wrap justify-end gap-3 sm:gap-4">
			{BOXES.map((box, i) => {
				const v = values[i] ?? 0;
				const unitLabel = v === 1 ? box.labelOne : box.label;
				return (
					<div
						key={box.label}
						className={`flex aspect-square w-[4.75rem] shrink-0 flex-col items-center justify-center gap-1 rounded-2xl border border-white/15 p-2 sm:w-24 sm:p-3 md:w-28 ${box.className}`}
					>
						<span className="font-mighty text-3xl leading-none text-white sm:text-4xl md:text-5xl">
							{fmt(v)}
						</span>
						<span className="text-[0.65rem] font-medium uppercase tracking-widest text-white/70">
							{unitLabel}
						</span>
					</div>
				);
			})}
		</div>
	);
}
