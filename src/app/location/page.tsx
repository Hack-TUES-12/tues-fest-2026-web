import { type Metadata } from 'next';
import Link from 'next/link';
import { TbBus, TbCar, TbExternalLink, TbMap2, TbTrain, TbWalk } from 'react-icons/tb';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TF_DATE_STRING, TF_LOCATION, TF_YEAR } from '@/constants/event';
import { TF_TITLE } from '@/constants/seo';

const LOCATION_MAP_URL =
	'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d733.0729700320611!2d23.32159637614092!3d42.6975400791878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa856ee63f96cf%3A0xa6d65ce76c5bbe5f!2sSofia%20Center%2C%20pl.%20%22Nezavisimost%22%2C%201000%20Sofia!5e0!3m2!1sen!2sbg!4v1742839905608!5m2!1sen!2sbg&hl=bg';

export const metadata = {
	title: 'Локация',
	description: `Информация за локацията ${TF_TITLE} - Ларго, пл. Независимост, София и как да стигнете до там.`,
} satisfies Metadata;

const TRANSPORT_OPTIONS = [
	{
		icon: TbTrain,
		title: 'Метро',
		description: 'Метростанция „Сердика" е буквално на входа на локацията — най-бързият начин за пристигане.',
	},
	{
		icon: TbBus,
		title: 'Автобус и трамвай',
		description: 'Множество автобусни и трамвайни линии минават в близост до площад „Независимост".',
	},
	{
		icon: TbCar,
		title: 'Автомобил',
		description: 'Платени паркинги се намират в радиус от 5–10 минути пеша от локацията.',
	},
	{
		icon: TbWalk,
		title: 'Пеша',
		description: 'Ако сте в центъра на София, локацията е лесно достижима пеша от много точки.',
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
					{TF_TITLE} {TF_YEAR} ще се проведе на {TF_DATE_STRING} на{' '}
					<span className="text-white">{TF_LOCATION}</span> под стъклените куполи на „Ларгото", в самия
					център на София.
				</p>
				<Button asChild variant="default" size="lg" className="font-bold">
					<Link
						href="https://maps.app.goo.gl/j2Q4m2hV6aXeUWGG8"
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
						src={LOCATION_MAP_URL}
						title="Карта на локацията - Ларго, пл. Независимост, София"
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
							Пл. „Независимост", 1000 София — закритото пространство под стъклените куполи на
							Ларгото, в подлеза на метростанция „Сердика".
						</p>
						<p className="text-foreground/80 leading-relaxed">
							Мястото е емблематично за центъра на София с впечатляващите си стъклени куполи и
							видимите археологически останки от античния град Сердика.
						</p>
						<Link
							href="https://maps.app.goo.gl/j2Q4m2hV6aXeUWGG8"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-1.5 text-sm text-primary underline-offset-4 hover:underline"
						>
							<TbExternalLink size={16} />
							3D изглед на локацията в Google Maps
						</Link>
					</CardContent>
				</Card>

				{/* Date & time card */}
				<Card className="px-8 py-7">
					<CardContent className="p-0 flex flex-col gap-3">
						<h2 className="text-2xl font-bold text-primary">Кога?</h2>
						<p className="text-foreground/80 leading-relaxed">
							Събитието ще се проведе на{' '}
							<span className="font-semibold text-white">{TF_DATE_STRING}</span>, като вратите се
							отварят в <span className="font-semibold text-white">10:00 часа</span>.
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
