import { type Metadata } from 'next';
import Link from 'next/link';
import { TbBus, TbCar, TbExternalLink, TbMap2, TbTrain, TbWalk } from 'react-icons/tb';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LOCATION_EMBED_URL, LOCATION_MAP_URL, LOCATION_STREET_VIEW_URL, TF_DATE_STRING, TF_LOCATION, TF_TIME_STRING, TF_YEAR } from '@/constants/event';
import { TF_TITLE } from '@/constants/seo';

export const metadata = {
	title: 'Локация',
	description: `Информация за локацията на ${TF_TITLE} - ${TF_LOCATION} и как да стигнете до там.`,
} satisfies Metadata;

const TRANSPORT_OPTIONS = [
	{
		icon: TbBus,
		title: 'Автобус и тролейбус',
		description: 'Множество автобусни и тролейбусни линии спират в непосредствена близост до София Тех Парк по бул. „Цариградско шосе".',
	},
	{
		icon: TbTrain,
		title: 'Метро',
		description: 'Слезте на метростанция „Младост 1" и продължете с автобус 73 до София Тех Парк.',
	},
	{
		icon: TbCar,
		title: 'Автомобил',
		description: 'На територията на Sofia Tech Park има безплатен паркинг с голям капацитет.',
	},
	{
		icon: TbWalk,
		title: 'Пеша / велосипед',
		description: 'Ако идвате от Младост или Business Park Sofia, локацията е достижима пеша или с велосипед.',
	},
];

export default function Location() {
	return (
		<section className="relative overflow-x-hidden flex flex-col items-center gap-14 px-4 pb-14 pt-14 md:px-8">
			{/* Background decoration */}
			<img
				src="/decorations/purple-circle.svg"
				alt=""
				aria-hidden="true"
				className="pointer-events-none absolute right-0 top-0 w-[50vw] max-w-2xl translate-x-1/3 -translate-y-1/3 select-none"
				style={{ zIndex: -1 }}
			/>

			{/* Hero */}
			<div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
				<p className="text-primary tracking-widest">Локация</p>
				<h1 className="font-title text-5xl text-white md:text-6xl">Намери ни</h1>
				<p className="text-lg text-foreground/70">
					{TF_TITLE} ще се проведе на {TF_DATE_STRING} в{' '}
					<span className="text-white">{TF_LOCATION}</span> {' '}- дом на стотици технологични, бизнес и образователни конференции, семинари, обучения и изложения всяка година.
				</p>
				<Button asChild variant="default" size="lg" className="font-bold">
					<Link
						href={LOCATION_MAP_URL}
						target="_blank"
						rel="noopener noreferrer"
					>
						<TbMap2 size={20} />
						Отвори в Google Maps
					</Link>
				</Button>
			</div>

			{/* Map + details grid */}
			<div className="mx-auto grid w-full max-w-5xl gap-6 md:grid-cols-[1fr,1fr]">
				{/* Map */}
				<div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl md:row-span-2">
					<iframe
						src={LOCATION_EMBED_URL}
						title="Карта на локацията - форум Джон Атанасов, София Тех Парк, София"
						width="100%"
						height="100%"
						className="min-h-80 border-0 md:min-h-full"
						style={{ minHeight: '420px' }}
						allowFullScreen
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
					/>
				</div>

				{/* Address card */}
				<Card className="px-8 py-7">
					<CardContent className="p-0 flex flex-col gap-3">
						<h2 className="text-2xl font-bold text-primary">Адрес</h2>
						<p className="text-foreground/80 leading-relaxed">
							бул. „Цариградско шосе" 111И, 1784 София — иновационен форум „Джон Атанасов" в
							рамките на София Тех Парк.
						</p>
						<p className="text-foreground/80 leading-relaxed">
							Форумът е модерно конферентно пространство, кръстено на Джон Атанасов — пионер в
							компютърната наука с български корени, чието наследство вдъхновява поколения
							технолози.
						</p>
						<Link
							href={LOCATION_STREET_VIEW_URL}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-1.5 text-sm text-primary underline-offset-4 hover:underline"
						>
							<TbExternalLink size={16} />
							Разгледай локацията в Google Maps
						</Link>
					</CardContent>
				</Card>

				{/* Date & time card */}
				<Card className="px-8 py-7">
					<CardContent className="p-0 flex flex-col gap-3">
						<h2 className="text-2xl font-bold text-primary">Кога?</h2>
						<p className="text-foreground/80 leading-relaxed">
							Събитието ще се проведе на{' '}
							<span className="font-semibold text-white">{TF_DATE_STRING}</span>, като вратите
							отварят в <span className="font-semibold text-white">{TF_TIME_STRING} часа</span>.
						</p>
						<p className="text-foreground/80 leading-relaxed">
							Над 150 ученически проекта ще бъдат изложени на място. Влезте в контакт с авторите,
							гласувайте за любимите си проекти и се срещнете с компаниите спонсори.
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Transport options */}
			<div className="mx-auto w-full max-w-5xl">
				<div className="mb-6 text-center">
					<p className="text-primary tracking-widest mb-1">Транспорт</p>
					<h2 className="font-title text-4xl text-white">Как да стигнете до там?</h2>
				</div>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					{TRANSPORT_OPTIONS.map(({ icon: Icon, title, description }) => (
						<div
							key={title}
							className="flex gap-4 rounded-2xl border border-white/10 bg-card/50 p-6 backdrop-blur-sm"
						>
							<div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
								<Icon size={22} />
							</div>
							<div>
								<h3 className="mb-1 font-semibold text-white">{title}</h3>
								<p className="text-sm text-foreground/70 leading-relaxed">{description}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
