'use client';

import { memo, useEffect, useRef, useState } from 'react';

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

function unitLabel(box: (typeof BOXES)[number], v: number) {
	return v === 1 ? box.labelOne : box.label;
}

export const HeroCountdown = memo(function HeroCountdown() {
	const [initial] = useState(getTimeLeft);
	const rootRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const root = rootRef.current;
		if (!root) return;

		const valueEls: (HTMLSpanElement | null)[] = [];
		const labelEls: (HTMLSpanElement | null)[] = [];

		const boxes = root.querySelectorAll<HTMLElement>('[data-tf-countdown-box]');
		boxes.forEach((box, i) => {
			valueEls[i] = box.querySelector('[data-tf-countdown-value]');
			labelEls[i] = box.querySelector('[data-tf-countdown-label]');
		});

		const apply = (t: ReturnType<typeof getTimeLeft>) => {
			const vals = [t.days, t.hours, t.minutes, t.seconds];
			for (let i = 0; i < BOXES.length; i++) {
				const box = BOXES[i];
				if (!box) continue;
				const v = vals[i] ?? 0;
				const ve = valueEls[i];
				const le = labelEls[i];
				if (ve) ve.textContent = fmt(v);
				if (le) le.textContent = unitLabel(box, v);
			}
		};

		let id: ReturnType<typeof setInterval> | undefined;

		const start = () => {
			apply(getTimeLeft());
			id = setInterval(() => apply(getTimeLeft()), 1000);
		};

		const stop = () => {
			if (id !== undefined) {
				clearInterval(id);
				id = undefined;
			}
		};

		start();

		const onVisibility = () => {
			if (document.hidden) stop();
			else start();
		};

		document.addEventListener('visibilitychange', onVisibility);
		return () => {
			stop();
			document.removeEventListener('visibilitychange', onVisibility);
		};
	}, []);

	const values = [initial.days, initial.hours, initial.minutes, initial.seconds];

	return (
		<div
			ref={rootRef}
			className="flex w-full min-w-0 flex-nowrap items-center justify-center gap-[clamp(0.15rem,1.5vw,1rem)] lg:justify-end"
		>
			{BOXES.map((box, i) => {
				const v = values[i] ?? 0;
				return (
					<div
						key={box.label}
						data-tf-countdown-box
						className={`flex max-w-24 sm:max-w-none aspect-square flex-1 flex-col items-center justify-center gap-[clamp(0.1rem,0.6vw,0.35rem)] rounded-2xl border border-white/15 p-[clamp(0.2rem,1.2vw,0.75rem)] sm:w-[clamp(5.3rem,15.5vw,7rem)] sm:flex-none shrink-0 ${box.className}`}
					>
						<span
							data-tf-countdown-value
							className="font-mighty text-[clamp(2rem,6.2vw,3rem)] leading-none text-white tabular-nums"
						>
							{fmt(v)}
						</span>
						<span
							data-tf-countdown-label
							className="text-center text-[clamp(0.6rem,2.6vw,0.65rem)] font-medium uppercase leading-tight tracking-[clamp(0.02em,0.35vw,0.2em)] text-white/70"
						>
							{unitLabel(box, v)}
						</span>
					</div>
				);
			})}
		</div>
	);
});
