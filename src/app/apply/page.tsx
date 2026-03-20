import Link from 'next/link';
import { TbArrowRight, TbBook, TbBrain, TbCheck, TbExternalLink, TbNetwork, TbStar } from 'react-icons/tb';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TF_YEAR, TUES_AGE } from '@/constants/event';
import Calculator from '@/partials/apply/Calculator';

export const metadata = {
	title: 'Кандидатстване в ТУЕС',
	description:
		'Научете как може да кандидатствате в ТУЕС след НВО на 7ми клас в ТУЕС - Технологично училище "Електронни системи"',
	keywords: [
		'туес',
		'туес фест',
		'кандидатстване',
		'калкулатор',
		'калкулатор на бал',
		'изчисли бал',
		`изчисли бал ${TF_YEAR}`,
		'изчисли си бала',
		`изчисли си бала ${TF_YEAR}`,
		`изчисли бал ${TF_YEAR} туес`,
		'кандидатстване в туес',
		`кандидатстване в туес ${TF_YEAR}`,
		'нво',
		`нво ${TF_YEAR}`,
		`нво ${TF_YEAR} туес`,
		'матури',
		`матури ${TF_YEAR}`,
		'матури 7ми клас',
		'матури 7 клас',
		`матури ${TF_YEAR} туес`,
		'матури 7ми клас туес',
		'матури 7 клас туес',
		'седми клас',
		'седми клас туес',
		'осми клас',
		'гимназия',
		'гимназии',
		'топ гимназии',
		`топ гимназии ${TF_YEAR}`,
		'топ училища',
		`топ училища ${TF_YEAR}`,
		'софия',
		'софия туес',
		'минимален бал',
		'минимален бал туес',
		'висок бал',
		'най-висок бал',
	],
};

const WHY_TUES = [
	'Специализиран учебен план',
	'Училище интегрирано във ВУЗ',
	'Преподават завършили ТУЕС',
	'Тясна връзка с ИТ бранша',
];

const SPECIALTIES = [
	{
		icon: TbBook,
		title: 'Системно програмиране',
		detail: '2 паралелки × 26 ученици',
	},
	{
		icon: TbNetwork,
		title: 'Компютърни мрежи',
		detail: '1 паралелка × 26 ученици',
	},
	{
		icon: TbBrain,
		title: 'Програмиране на изкуствен интелект',
		detail: '1 паралелка × 26 ученици',
	},
];

const SCORE_FORMULA = [
	{ label: 'НВО — Български език и литература', note: '× 1' },
	{ label: 'НВО — Математика', note: '× 3' },
	{ label: 'Оценка по Математика (7. клас)', note: '' },
	{ label: 'Оценка по Физика (7. клас)', note: '' },
];

const ApplyPage = () => (
	<section className="relative overflow-x-hidden flex flex-col items-center gap-16 px-4 pb-16 pt-14 md:px-8">
		{/* Background decorations */}
		<img
			src="/decorations/green-circle.svg"
			alt=""
			aria-hidden="true"
			className="pointer-events-none absolute left-0 top-0 w-[50vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 select-none"
			style={{ zIndex: -1 }}
		/>
		<img
			src="/decorations/green-circle.svg"
			alt=""
			aria-hidden="true"
			className="pointer-events-none absolute bottom-0 right-0 w-[40vw] max-w-xl translate-x-1/3 translate-y-1/3 select-none"
			style={{ zIndex: -1 }}
		/>

		{/* Hero */}
		<div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
			<p className="text-muted tracking-widest">Кандидатстване</p>
			<h1 className="font-title text-5xl text-white md:text-6xl">Защо ТУЕС?</h1>
			<p className="text-lg text-foreground/70">
				Технологично училище „Електронни системи" към ТУ-София е специализирано технологично
				училище от национално значение, което вече{' '}
				<span className="text-white font-semibold">{TUES_AGE} години</span> подготвя бъдещите
				лидери на ИТ сектора в България и отвъд.
			</p>
			<p className="text-foreground/60 text-base">
				За {TF_YEAR} г., ТУЕС се нареди на <span className="text-white">второ място</span> по
				минимален бал на първо класиране в 7. клас!
			</p>
			<Button asChild variant="muted" size="lg" className="font-bold mt-2">
				<Link href="https://elsys-bg.org/priem/red-i-uslovija-za-priem" target="_blank" rel="noopener noreferrer">
					<TbExternalLink size={18} />
					Научете повече за приема
				</Link>
			</Button>
		</div>

		{/* Why TUES — features + image */}
		<div className="mx-auto w-full max-w-5xl">
			<div className="grid gap-6 md:grid-cols-2 md:items-center">
				{/* Features list */}
				<div className="flex flex-col gap-4">
					<div className="space-y-1">
						<p className="text-muted tracking-widest text-sm">Уникалност</p>
						<h2 className="font-title text-4xl text-white md:text-5xl">
							Кое прави ТУЕС специално?
						</h2>
					</div>
					<div className="mt-2 flex flex-col gap-3">
						{WHY_TUES.map((item) => (
							<div
								key={item}
								className="flex items-center gap-4 rounded-2xl border border-white/10 bg-card/50 px-5 py-4 backdrop-blur-sm"
							>
								<div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted/15 text-muted">
									<TbCheck size={16} />
								</div>
								<span className="text-white/90">{item}</span>
							</div>
						))}
					</div>
				</div>

				{/* Image */}
				<div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
					<img
						src="/assets/apply/whytues.png"
						alt="Защо ТУЕС?"
						className="w-full object-cover transition-transform duration-500 hover:scale-105"
					/>
				</div>
			</div>
		</div>

		{/* How to apply + Calculator */}
		<div className="mx-auto grid w-full max-w-5xl gap-6 md:grid-cols-[3fr,2fr]">
			{/* Left: how to apply */}
			<div className="flex flex-col gap-6">
				{/* Specialties */}
				<Card className="px-8 py-7">
					<CardContent className="p-0 flex flex-col gap-5">
						<div className="space-y-1">
							<p className="text-muted tracking-widest text-xs font-medium uppercase">Специалности</p>
							<h2 className="text-2xl font-bold text-white">
								Как да кандидатствам?
							</h2>
							<p className="text-foreground/70 text-sm">
								За учебната {TF_YEAR}/{TF_YEAR + 1} г. ТУЕС приема ученици по следните специалности:
							</p>
						</div>
						<div className="flex flex-col gap-3">
							{SPECIALTIES.map(({ icon: Icon, title, detail }) => (
								<div
									key={title}
									className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-5 py-4 transition-colors duration-200 hover:bg-white/10"
								>
									<div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-muted/10 text-muted">
										<Icon size={18} />
									</div>
									<div>
										<p className="font-semibold text-white text-sm">{title}</p>
										<p className="text-xs text-white/50 mt-0.5">{detail}</p>
									</div>
								</div>
							))}
						</div>
						<Link
							href="https://elsys-bg.org/priem/red-i-uslovija-za-priem"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-1.5 text-sm text-muted underline-offset-4 hover:underline mt-1"
						>
							<TbArrowRight size={15} />
							Научете повече за приема в ТУЕС
						</Link>
					</CardContent>
				</Card>

				{/* Score formula */}
				<Card className="px-8 py-7">
					<CardContent className="p-0 flex flex-col gap-5">
						<div className="space-y-1">
							<p className="text-muted tracking-widest text-xs font-medium uppercase">Формула</p>
							<h2 className="text-2xl font-bold text-white">Как се формира балът?</h2>
							<p className="text-foreground/70 text-sm">Балът е сбор от следните компоненти:</p>
						</div>
						<div className="flex flex-col gap-2">
							{SCORE_FORMULA.map(({ label, note }, i) => (
								<div
									key={label}
									className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-5 py-3"
								>
									<div className="flex items-center gap-3">
										<span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted/15 text-muted text-xs font-bold">
											{i + 1}
										</span>
										<span className="text-sm text-white/80">{label}</span>
									</div>
									{note && (
										<span className="shrink-0 rounded-full bg-muted/15 px-3 py-0.5 text-xs font-bold text-muted">
											{note}
										</span>
									)}
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Right: calculator */}
			<Calculator />
		</div>
	</section>
);

export default ApplyPage;
