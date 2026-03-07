import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ABOUT_IMAGE_1, ABOUT_IMAGE_2, ABOUT_TEXT } from '@/constants/home/about';
import { TF_DATE_STRING, TF_LOCATION, TF_SLOGAN, TF_YEAR } from '@/constants/event';

const About = () => (
	<section id="about" className="relative overflow-hidden px-4 py-12 md:px-8">
		<div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center">

			{/* Title area — circle is positioned relative to this wrapper */}
			<div className="relative flex w-full flex-col items-center gap-1">
				{/* Subtitle */}
				<p className="text-xl text-white tracking-widest">Какво е</p>

				{/* Title */}
				<h2 className="relative z-10 font-mighty text-7xl leading-none text-primary md:text-8xl">
					TUES Fest
				</h2>

				{/* Purple circle decoration: top starts at bottom of title area, centered, 75vw wide */}
				<img
					src="/decorations/purple-circle.svg"
					alt=""
					aria-hidden="true"
					className="pointer-events-none absolute max-w-3xl min-w-lg"
					style={{
						top: '100%',
						left: '50%',
						transform: 'translateX(-50%)',
						width: '50vw',
					}}
				/>
			</div>

			{/* Content below title — z-10 to appear above the circle decoration */}
			<div className="relative z-10 flex w-full flex-col items-center gap-8">
				{/* Main text */}
				<p className="max-w-2xl">
					{ABOUT_TEXT}
				</p>

				{/* Cards grid */}
				<div className="grid w-full grid-cols-1 gap-4 text-left md:grid-cols-2">
					<Card className="px-8 py-7">
						<CardContent className="p-0">
							<h3 className="mb-2 text-2xl font-bold text-primary">Кога и къде?</h3>
							<p className="text-md text-foreground/80">
								TUES Fest {TF_YEAR} ще се проведе на {TF_DATE_STRING} на територията на {TF_LOCATION}.
							</p>
						</CardContent>
					</Card>

					<Card className="px-8 py-7">
						<CardContent className="p-0">
							<h3 className="mb-2 text-2xl font-bold text-primary">Какво ще видите?</h3>
							<p className="text-md text-foreground/80">
								Ще имате възможност да се запознаете с ТУЕС към ТУ-София отблизо и с това какво ни прави
								различното училище.
							</p>
						</CardContent>
					</Card>
				</div>

				{/* CTA button */}
				<Button asChild variant="default" size="lg" className="font-bold">
					<Link href="/schedule">Виж програмата</Link>
				</Button>
			</div>
		</div>

		{/* Images — overlapping on desktop, stacked on mobile */}
		<div className="mx-auto mt-12 w-full max-w-4xl px-4 md:px-8">

			{/* Mobile: clean stacked cascade */}
			<div className="flex flex-col gap-3 md:hidden">
				<img
					src={ABOUT_IMAGE_1}
					alt="TUES FEST — публика на събитието"
					className="w-full rounded-2xl object-cover aspect-video shadow-xl transition-all duration-300 hover:scale-105"
				/>
				<img
					src={ABOUT_IMAGE_2}
					alt="TUES FEST — зала пълна с хора"
					className="w-full rounded-2xl object-cover aspect-video shadow-xl transition-all duration-300 hover:scale-105"
				/>
			</div>

			{/* Desktop: diagonal overlapping layout */}
			<div className="relative hidden md:block w-full" style={{ paddingBottom: '62%' }}>
				{/* Green + decoration — top-left */}
				<span
					className="absolute left-4 -top-4 z-30 select-none text-8xl font-black leading-none text-muted -translate-y-1/2"
					aria-hidden="true"
				>
					+
				</span>

				{/* Image 1 — top-left */}
				<img
					src={ABOUT_IMAGE_1}
					alt="TUES FEST — публика на събитието"
					className="absolute left-0 top-0 z-10 w-[65%] rounded-2xl object-cover aspect-video shadow-2xl transition-all duration-300 hover:scale-105"
				/>

				{/* Image 2 — bottom-right, on top */}
				<img
					src={ABOUT_IMAGE_2}
					alt="TUES FEST — зала пълна с хора"
					className="absolute bottom-0 right-0 z-20 w-[65%] rounded-2xl object-cover aspect-video shadow-2xl transition-all duration-300 hover:scale-105"
				/>

				{/* Orange + decoration — bottom-right */}
				<span
					className="absolute bottom-12 -right-3 translate-x-1/2 z-30 select-none text-7xl font-black leading-none text-secondary"
					aria-hidden="true"
				>
					+
				</span>
			</div>
		</div>

		{/* Organizers section */}
		<div className="mx-auto mt-24 flex max-w-5xl flex-col items-center gap-6 text-center md:px-8">
			<div className='space-y-1'>
				<p className="text-primary tracking-widest">Организатори</p>

				<h2 className="font-title text-4xl md:text-5xl">Кой стои зад TUES Fest?</h2>
			</div>

			<p>
				TUES Fest {TF_YEAR} &quot;<span className="text-primary">{TF_SLOGAN}</span>&quot; се организира от ученици за ученици, под менторството на АЗТУЕС! Организационният екип вярва, че за поредна година ще покаже на света какво е да си ученик в ТУЕС към ТУ - София.
			</p>

			<Button asChild variant="default" size="lg" className="font-bold">
				<Link href="/about">
					Повече за ТУЕС
				</Link>
			</Button>
		</div>
	</section>
);

export default About;
