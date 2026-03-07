'use client';

import { useEffect, useState } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const EMPTY_CALC = {
	bgl: 0,
	math: 0,
	math7: 2,
	phys7: 2,
};

const EMPTY_ERR = {
	bgl: '',
	math: '',
	math7: '',
	phys7: '',
};

const CalculatorField = ({
	name,
	label,
	hint,
	min,
	max,
	value,
	error,
	onChange,
}: {
	name: string;
	label: string;
	hint: string;
	min: number;
	max: number;
	value: number | '';
	error: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
	<div className="flex flex-col gap-1.5">
		<label htmlFor={name} className="text-sm font-medium text-white/80">
			{label}
			<span className="ml-1.5 text-xs text-white/40">{hint}</span>
		</label>
		<input
			type="number"
			id={name}
			name={name}
			className={cn(
				'w-full rounded-xl border bg-white/5 px-4 py-2.5 text-base font-medium text-white outline-none transition-colors duration-200 placeholder:text-white/20',
				'focus:border-muted/60 focus:bg-muted/5',
				error ? 'border-red-500/60' : 'border-white/10 hover:border-white/20',
			)}
			min={min}
			max={max}
			value={value}
			onChange={onChange}
		/>
		{error && <p className="text-xs text-red-400">{error}</p>}
	</div>
);

const MAX_SCORE = 100 + 300 + 50 + 50; // 500

const Calculator = ({ className }: { className?: string }) => {
	const [result, setResult] = useState(0);
	const [calculator, setCalculator] = useState<{
		bgl: number | '';
		math: number | '';
		math7: number | '';
		phys7: number | '';
	}>(EMPTY_CALC);
	const [errorCalculator, setErrorCalculator] = useState(EMPTY_ERR);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCalculator({ ...calculator, [e.target.name]: e.target.value === '' ? '' : parseFloat(e.target.value) });
	};

	useEffect(() => {
		if (calculator.bgl === '' || calculator.math === '' || calculator.math7 === '' || calculator.phys7 === '')
			return;

		const errors = { ...EMPTY_ERR };

		errors.bgl = calculator.bgl < 0 || calculator.bgl > 100 ? 'Трябва да е между 0 и 100т.' : '';
		errors.math = calculator.math < 0 || calculator.math > 100 ? 'Трябва да е между 0 и 100т.' : '';
		errors.math7 = calculator.math7 < 2 || calculator.math7 > 6 ? 'Трябва да е между 2 и 6.' : '';
		errors.phys7 = calculator.phys7 < 2 || calculator.phys7 > 6 ? 'Трябва да е между 2 и 6.' : '';

		setErrorCalculator(errors);
		if (errors.bgl || errors.math || errors.math7 || errors.phys7) return;

		setResult(
			calculator.bgl +
				calculator.math * 3 +
				(calculator.math7 - 1) * 10 +
				(calculator.phys7 - 1) * 10,
		);
	}, [calculator]);

	const percentage = MAX_SCORE > 0 ? (result / MAX_SCORE) * 100 : 0;

	return (
		<Card className={cn('px-8 py-7', className)}>
			<CardContent className="p-0 flex flex-col gap-5">
				<div className="space-y-1">
					<p className="text-muted tracking-widest text-xs font-medium uppercase">Калкулатор</p>
					<h2 className="text-2xl font-bold text-white">Изчисли си бала</h2>
					<p className="text-sm text-foreground/60">
						Въведи резултатите си, за да видиш приблизителния си бал за ТУЕС.
					</p>
				</div>

				<form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
					<CalculatorField
						name="bgl"
						label="НВО — Български език"
						hint="(0–100т.)"
						min={0}
						max={100}
						value={calculator.bgl}
						error={errorCalculator.bgl}
						onChange={handleChange}
					/>
					<CalculatorField
						name="math"
						label="НВО — Математика"
						hint="(0–100т.)"
						min={0}
						max={100}
						value={calculator.math}
						error={errorCalculator.math}
						onChange={handleChange}
					/>
					<CalculatorField
						name="math7"
						label="Оценка Математика — 7. клас"
						hint="(2–6)"
						min={2}
						max={6}
						value={calculator.math7}
						error={errorCalculator.math7}
						onChange={handleChange}
					/>
					<CalculatorField
						name="phys7"
						label="Оценка Физика — 7. клас"
						hint="(2–6)"
						min={2}
						max={6}
						value={calculator.phys7}
						error={errorCalculator.phys7}
						onChange={handleChange}
					/>
				</form>

				{/* Result */}
				<div className="mt-2 rounded-2xl border border-white/10 bg-white/5 p-5">
					<p className="mb-3 text-xs font-medium uppercase tracking-widest text-white/40">Твоят бал</p>
					<div className="flex items-end justify-between gap-2 mb-3">
						<span className="text-5xl font-black text-white leading-none">
							{result > 0 ? result.toFixed(2) : '—'}
						</span>
						<span className="text-sm text-white/40 mb-1">/ {MAX_SCORE}</span>
					</div>
					{/* Progress bar */}
					<div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
						<div
							className="h-full rounded-full bg-muted transition-all duration-500 ease-out"
							style={{ width: `${percentage}%` }}
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default Calculator;
