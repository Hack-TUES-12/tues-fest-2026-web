import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ABOUT_IMAGE_1, ABOUT_IMAGE_2, ABOUT_TEXT } from '@/constants/home/about';
import { TF_DATE_STRING, TF_LOCATION, TF_SLOGAN, TF_TIME_STRING, TF_YEAR } from '@/constants/event';
import { IfTFFeatureOn } from '@/lib/growthbook/react/client';

const About = () => (
	<section id="about" className="relative">
		<div className="relative px-4 py-12 lg:px-8 z-10 overflow-hidden pb-48 mx-auto max-w-6xl">

			{/* Unified layout: flex-col on mobile, side-by-side grid on desktop */}
			<div className="relative flex flex-col gap-12 lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">

				{/* Left: overlapping images */}
				<div className="relative" style={{ paddingBottom: '110%' }}>
					{/* Green + decoration — top-left */}
					<span
						className="absolute -left-4 -top-4 z-30 select-none text-8xl font-black leading-none text-muted"
						aria-hidden="true"
					>
						+
					</span>

					{/* Image 1 — large rectangle, top-left */}
					<img
						src={ABOUT_IMAGE_1}
						alt="TUES FEST — публика на събитието"
						className="absolute left-[50%] -translate-x-1/2 top-[15%] z-10 w-[75%] rounded-2xl object-cover aspect-video shadow-2xl transition-all duration-300 hover:scale-105"
					/>

					{/* Image 3 — smaller rectangle, bottom-left */}
					<img
						src={ABOUT_IMAGE_2}
						alt="TUES FEST — момент от събитието"
						className="absolute left-[20%] bottom-0 z-10 w-[75%] rounded-2xl object-cover aspect-video shadow-2xl transition-all duration-300 hover:scale-105"
					/>

					{/* Image 2 — circle, bottom-right, overlapping both */}
					{/* <img
						src={ABOUT_IMAGE_2}
						alt="TUES FEST — зала пълна с хора"
						className="absolute top-[50%] -translate-y-1/3 left-[50%] -translate-x-1/2 z-20 w-[40%] rounded-full object-cover aspect-square shadow-2xl transition-all duration-300 hover:scale-105"
					/> */}

					{/* Orange + decoration — bottom-right */}
					<span
						className="absolute bottom-[1%] right-[1%] z-30 select-none text-7xl font-black leading-none text-secondary translate-x-1/2 translate-y-1/2"
						aria-hidden="true"
					>
						+
					</span>
				</div>

				{/* Right: text content */}
				<div className="flex flex-col items-center text-center gap-6 lg:items-start lg:text-left">
					{/* Title */}
					<div className="flex flex-col gap-1">
						<p className="text-xl text-white tracking-widest">Повече за</p>
						<h2 className="font-mighty text-7xl leading-none text-primary lg:text-8xl">TUES Fest</h2>
					</div>

					{/* Main text */}
					<p>{ABOUT_TEXT}</p>

					{/* Info sections */}
					<div className="flex flex-col gap-4">
						<div>
							<h3 className="mb-2 text-2xl font-bold text-primary">Кога и къде?</h3>
							<p className="text-lg text-foreground/80">
								TUES Fest {TF_YEAR} ще се проведе на {TF_DATE_STRING} от {TF_TIME_STRING} часа на територията на {TF_LOCATION}.
							</p>
						</div>
						<div>
							<h3 className="mb-2 text-2xl font-bold text-primary">Какво ще видите?</h3>
							<p className="text-lg text-foreground/80">
								Ще имате възможност да се запознаете с ТУЕС към ТУ-София отблизо и с това какво ни прави различното училище.
							</p>
						</div>
					</div>

					{/* CTA button */}
					<IfTFFeatureOn feature="tf-schedule">
						<Button asChild variant="default" size="lg" className="font-bold w-fit">
							<Link href="/schedule">Виж програмата</Link>
						</Button>
					</IfTFFeatureOn>
				</div>

				{/* Purple circle decoration — bottom center of layout, half-visible */}
				<img
					src="/decorations/purple-circle.svg"
					alt=""
					aria-hidden="true"
					className="pointer-events-none absolute -bottom-48 left-1/2 -z-10 w-[80%] max-w-2xl translate-y-1/2 -translate-x-1/2"
				/>
			</div>
		</div>
		{/* Organizers section */}
		<div className="relative z-10">
			{/* Background image */}
			<div className="relative min-h-[100vh] w-full overflow-hidden">
				<img
					src="/team/team1.jpg"
					alt=""
					aria-hidden="true"
					className="absolute inset-0 h-full w-full object-cover object-top"
				/>
				{/* Gradient — stronger at bottom so card blends in */}
				<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
			</div>

			{/* Card — negative margin pulls it up to straddle the image bottom */}
			<div className="relative z-10 flex justify-center px-4 -mt-40">
				<Card className="w-full max-w-4xl px-8 py-10 text-center">
					<CardContent className="flex flex-col items-center gap-6 p-0">
						<div className="space-y-1">
							<p className="text-primary tracking-widest">Организатори</p>
							<h2 className="font-title text-4xl lg:text-5xl">Кой стои зад TUES Fest?</h2>
						</div>

						<p>
							TUES Fest {TF_YEAR} &quot;<span className="text-primary">{TF_SLOGAN}</span>&quot; се организира от ученици за ученици, под менторството на АЗТУЕС! Организационният екип вярва, че за поредна година ще покаже на света какво е да си ученик в ТУЕС към ТУ - София.
						</p>

						<Button asChild variant="default" size="lg" className="font-bold">
							<Link href="/about">
								Повече за ТУЕС
							</Link>
						</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	</section>
);

export default About;
