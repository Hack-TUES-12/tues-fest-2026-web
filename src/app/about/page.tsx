import { type Metadata } from 'next';
import Link from 'next/link';
import {
	TbArrowRight,
	TbBrain,
	TbBriefcase,
	TbCheck,
	TbCode,
	TbExternalLink,
	TbHistory,
	TbNetwork,
	TbSchool,
	TbTrophy,
} from 'react-icons/tb';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TF_YEAR, TUES_AGE } from '@/constants/event';

export const metadata = {
	title: 'За ТУЕС',
	description: `Научете повече за най-доброто училище в България - Технологично училище "Електронни системи", което през ${TF_YEAR} беше с втори най-висок бал за страната. ТУЕС е училище с ${TUES_AGE} години история, което е специализирано в областта на ИТ и единствено в България подготвя специалисти в областта на системно програмиране.`,
	keywords: [
		'туес',
		'туес фест',
		`туес фест ${TF_YEAR}`,
		'технологично училище електронни системи',
		'технологично',
		'училище',
		'електронни',
		'системи',
		`туес ${TF_YEAR}`,
		'кандидатстване',
		'училища софия',
		'училища',
		'софия',
		'софия туес',
		'най-добро училище',
		'най-добро училище в българия',
		'най-добро училище в софия',
		'висок бал',
		'елитно училище',
		'елитно',
		'училище в софия',
		'минимален бал',
		'минимален бал за туес',
		'минимален бал софия',
	],
} satisfies Metadata;

const STATS = [
	{ icon: TbSchool,    value: '3012', label: 'завършили ученици' },
	{ icon: TbTrophy,    value: '96',   label: 'награди и отличия' },
	{ icon: TbBriefcase, value: '140',  label: 'стажа на година' },
	{ icon: TbHistory,   value: `${TUES_AGE}`, label: 'годишна история' },
];

const SPECIALTIES = [
	{
		icon: TbCode,
		title: 'Системно програмиране',
		description:
			'Най-задълбочената училищна програма по програмиране в България — незаменим трамплин за всеки с амбиции за кариера в ИТ сектора.',
		href: 'https://elsys-bg.org/priem/specialnost-sistemno-programirane',
	},
	{
		icon: TbNetwork,
		title: 'Компютърни мрежи',
		description:
			'Първата крачка към вълнуващата инженерна професия. Ще учите за проектиране на електроника, комуникации, мрежи, роботика и IoT.',
		href: 'https://elsys-bg.org/priem/specialnost-komputyrni-mreji',
	},
	{
		icon: TbBrain,
		title: 'Програмиране на изкуствен интелект',
		description:
			'Специалността, която ще ви подготви за работа в една от най-бързо развиващите се области на ИТ — ще се научите да създавате софтуер, който мисли.',
		href: 'https://elsys-bg.org/priem/specialnost-sistemno-programirane',
	},
];

const EDUCATION_ITEMS = [
	'Разширено изучаване на английски език',
	'Учебни програми, покриващи всички общообразователни предмети',
	'Cisco академия за актуалните мрежови технологии',
	'Вградени микроконтролерни системи (Arduino)',
	'Участие в национални и международни състезания',
	'HackTUES — хакатон, организиран от ученици за ученици',
	'Работилници и лекции от ИТ професионалисти',
	'Разнообразни извънкласни клубове',
];

const SUCCESS_FACTORS = [
	'Тясна интеграция с Технически университет — София',
	'Гъвкав специализиран учебен план',
	'Преподаватели от университета и ИТ практици',
	'Активната роля на завършилите в живота на училището',
	'Тясна връзка с реалния бизнес — стажове, дипломни проекти и практики',
];

export default function AboutPage() {
	return (
		<section className="relative overflow-x-hidden flex flex-col items-center gap-16 px-4 pb-16 pt-14 md:px-8">
			{/* Background decorations */}
			<img
				src="/decorations/purple-circle.svg"
				alt=""
				aria-hidden="true"
				className="pointer-events-none absolute left-0 top-0 w-[50vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 select-none"
				style={{ zIndex: -1 }}
			/>
			<img
				src="/decorations/blue-circle.svg"
				alt=""
				aria-hidden="true"
				className="pointer-events-none absolute bottom-1/3 right-0 w-[40vw] max-w-xl translate-x-1/2 select-none"
				style={{ zIndex: -1 }}
			/>

			{/* ── Hero ─────────────────────────────────────────────────── */}
			<div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
				<p className="text-primary tracking-widest">Училището</p>
				<h1 className="font-title text-5xl text-white md:text-6xl">За ТУЕС</h1>
				<p className="text-lg text-foreground/70">
					Технологично училище „Електронни системи" към ТУ-София е специализирано технологично
					училище от национално значение, което вече{' '}
					<span className="font-semibold text-white">{TUES_AGE} години</span> подготвя бъдещите
					лидери на ИТ сектора в България и отвъд.
				</p>
				<Button asChild variant="default" size="lg" className="font-bold mt-2">
					<Link href="https://elsys-bg.org" target="_blank" rel="noopener noreferrer">
						<TbExternalLink size={18} />
						Официален сайт на ТУЕС
					</Link>
				</Button>
			</div>

			{/* ── Stats ────────────────────────────────────────────────── */}
			<div className="mx-auto grid w-full max-w-5xl grid-cols-2 gap-4 sm:grid-cols-4">
				{STATS.map(({ icon: Icon, value, label }) => (
					<div
						key={label}
						className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-card/50 px-4 py-6 text-center backdrop-blur-sm"
					>
						<Icon size={32} className="text-primary" />
						<p className="text-4xl font-black text-white">{value}</p>
						<p className="text-sm text-white/60">{label}</p>
					</div>
				))}
			</div>

			{/* ── Intro + image ─────────────────────────────────────────── */}
			<div className="mx-auto grid w-full max-w-5xl gap-6 md:grid-cols-2 md:items-center">
				<div className="flex flex-col gap-4 text-foreground/80 leading-relaxed">
					<p>
						Възпитаниците на ТУЕС преминават през задълбочена и специализирана 5-годишна програма,
						която им позволява да се позиционират възможно най-бързо в технологичния сектор.
					</p>
					<p>
						За {TF_YEAR} г. ТУЕС се нареди на{' '}
						<span className="font-semibold text-white">второ място</span> по минимален бал на
						първо класиране в 7. клас в България.
					</p>
					<Link
						href="/apply"
						className="inline-flex items-center gap-1.5 text-sm text-primary underline-offset-4 hover:underline"
					>
						<TbArrowRight size={15} />
						Информация за кандидатстване
					</Link>
				</div>
				<div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
					<img
						src="/assets/about/about.png"
						alt="Ученици на ТУЕС"
						className="w-full object-cover transition-transform duration-500 hover:scale-105"
					/>
				</div>
			</div>

			{/* ── Specialties ───────────────────────────────────────────── */}
			<div className="mx-auto w-full max-w-5xl">
				<div className="mb-6 text-center">
					<p className="text-primary mb-1 tracking-widest">Специалности</p>
					<h2 className="font-title text-4xl text-white">Какво можеш да учиш?</h2>
				</div>
				<div className="grid gap-4 md:grid-cols-3">
					{SPECIALTIES.map(({ icon: Icon, title, description, href }) => (
						<Link
							key={title}
							href={href}
							target="_blank"
							rel="noopener noreferrer"
							className="group flex flex-col gap-4 rounded-2xl border border-white/10 bg-card/50 p-6 backdrop-blur-sm transition-colors duration-200 hover:border-white/20 hover:bg-card/80"
						>
							<div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
								<Icon size={22} />
							</div>
							<div className="flex flex-col gap-2">
								<h3 className="font-semibold text-white">{title}</h3>
								<p className="text-sm leading-relaxed text-white/60">{description}</p>
							</div>
							<span className="mt-auto inline-flex items-center gap-1 text-xs text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100">
								Научи повече <TbArrowRight size={13} />
							</span>
						</Link>
					))}
				</div>
			</div>

			{/* ── Education ─────────────────────────────────────────────── */}
			<div className="mx-auto grid w-full max-w-5xl gap-6 md:grid-cols-[3fr,2fr]">
				<Card className="px-8 py-7">
					<CardContent className="p-0 flex flex-col gap-5">
						<div className="space-y-1">
							<p className="text-primary text-xs font-medium uppercase tracking-widest">Обучение</p>
							<h2 className="text-2xl font-bold text-white">Освен специализирания план</h2>
							<p className="text-sm text-foreground/70">ТУЕС предлага:</p>
						</div>
						<div className="flex flex-col gap-2">
							{EDUCATION_ITEMS.map((item) => (
								<div
									key={item}
									className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
								>
									<div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
										<TbCheck size={12} />
									</div>
									<span className="text-sm text-white/80">{item}</span>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				<Card className="px-8 py-7">
					<CardContent className="p-0 flex flex-col gap-5">
						<div className="space-y-1">
							<p className="text-primary text-xs font-medium uppercase tracking-widest">Успех</p>
							<h2 className="text-2xl font-bold text-white">ТУЕС успява благодарение на</h2>
						</div>
						<div className="flex flex-col gap-2">
							{SUCCESS_FACTORS.map((item, i) => (
								<div
									key={item}
									className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
								>
									<span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary text-xs font-bold">
										{i + 1}
									</span>
									<span className="text-sm text-white/80">{item}</span>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>

			{/* ── HackTUES ──────────────────────────────────────────────── */}
			<div className="mx-auto w-full max-w-5xl">
				<div className="mb-6 text-center">
					<p className="text-primary mb-1 tracking-widest">Събитие</p>
					<h2 className="font-title text-4xl text-white">Hack TUES</h2>
				</div>

				<div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
					<img
						src="/assets/about/ht11_image.jpg"
						alt="HackTUES 11 организатори"
						className="w-full object-cover"
					/>
				</div>

				<div className="mt-6 grid gap-4 md:grid-cols-2">
					<div className="rounded-2xl border border-white/10 bg-card/50 p-6 backdrop-blur-sm">
						<p className="mb-3 text-xs font-medium uppercase tracking-widest text-white/40">Какво е?</p>
						<p className="text-sm leading-relaxed text-white/80">
							HackTUES е един от ключовите събития за ТУЕС — ученици в отбори от 3–5 участници
							създават от нулата ИТ проект за два дни по зададена тема и го представят пред
							професионално жури от преподаватели и ИТ специалисти.
						</p>
					</div>
					<div className="rounded-2xl border border-white/10 bg-card/50 p-6 backdrop-blur-sm">
						<p className="mb-3 text-xs font-medium uppercase tracking-widest text-white/40">Значимост</p>
						<p className="text-sm leading-relaxed text-white/80">
							Единственият по рода си хакатон в България, организиран от ученици за ученици.
							Намерил е място сред иновативните практики на ЮНЕСКО за техническо и професионално
							образование — единствената образователна практика от България в тази инициатива.
						</p>
					</div>
					<div className="rounded-2xl border border-white/10 bg-card/50 p-6 backdrop-blur-sm md:col-span-2">
						<p className="mb-3 text-xs font-medium uppercase tracking-widest text-white/40">Организация</p>
						<p className="text-sm leading-relaxed text-white/80">
							Събитието стартира през 2015 г. и досега има единадесет издания. Всяка година се
							организира от координационен екип ученици от 11. клас под менторството на АЗТУЕС.
							Участниците развиват умения по програмиране, работа в екип и презентация, а
							запознанствата с ментори понякога прерастват в предложения за стаж.
						</p>
					</div>
				</div>

				<div className="mt-4 flex justify-center">
					<Button asChild variant="default" size="lg" className="font-bold">
						<Link href="https://hacktues.bg" target="_blank" rel="noopener noreferrer">
							<TbExternalLink size={18} />
							Виж повече за Hack TUES
						</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
