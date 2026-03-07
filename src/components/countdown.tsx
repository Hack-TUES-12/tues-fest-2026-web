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

const Unit = ({ value, label }: { value: number; label: string }) => (
	<div className="flex min-w-[5rem] flex-col items-center gap-1 rounded-2xl border border-white/10 bg-card/60 px-5 py-4 backdrop-blur-sm sm:min-w-[6rem]">
		<span className="font-mighty text-4xl leading-none text-white sm:text-5xl">
			{fmt(value)}
		</span>
		<span className="text-xs font-medium uppercase tracking-widest text-white/40">{label}</span>
	</div>
);

const SEPARATORS = [':', ':', ':'];

const Countdown = () => {
	const [time, setTime] = useState(getTimeLeft);

	useEffect(() => {
		const id = setInterval(() => setTime(getTimeLeft()), 1000);
		return () => clearInterval(id);
	}, []);

	const units = [
		{ value: time.days,    label: time.days    === 1 ? 'ден'     : 'дни'     },
		{ value: time.hours,   label: time.hours   === 1 ? 'час'     : 'часа'    },
		{ value: time.minutes, label: time.minutes === 1 ? 'минута'  : 'минути'  },
		{ value: time.seconds, label: time.seconds === 1 ? 'секунда' : 'секунди' },
	];

	return (
		<div className="flex flex-wrap items-center justify-center gap-2">
			{units.map((unit, i) => (
				<>
					<Unit key={unit.label} value={unit.value} label={unit.label} />
					{i < SEPARATORS.length && (
						<span
							key={`sep-${i}`}
							className="mb-4 hidden text-2xl font-bold text-white/20 sm:block"
						>
							{SEPARATORS[i]}
						</span>
					)}
				</>
			))}
		</div>
	);
};

export default Countdown;
