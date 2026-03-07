'use client';

import Link from 'next/link';
import { ChevronDown, MapPin, Clock4, Rocket } from 'lucide-react';

import Countdown from '@/components/countdown';
import { Button, buttonVariants } from '@/components/ui/button';
import { TF_DATE_STRING, TF_LOCATION, TF_YEAR } from '@/constants/event';
import { cn } from '@/lib/utils';

export default function EventLanding() {
	return (
		<div className="relative flex w-full flex-col items-center justify-center gap-10 px-4 py-8 text-center md:px-8">

			{/* Background decorations */}
			<img
				src="/decorations/purple-circle.svg"
				alt=""
				aria-hidden="true"
				className="pointer-events-none absolute left-0 top-0 w-[55vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 select-none"
				style={{ zIndex: -1 }}
			/>
			<img
				src="/decorations/green-circle.svg"
				alt=""
				aria-hidden="true"
				className="pointer-events-none absolute bottom-0 right-0 w-[40vw] max-w-xl translate-x-1/3 translate-y-1/3 select-none"
				style={{ zIndex: -1 }}
			/>

			{/* Year badge */}
			<div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
				<span className="size-2 animate-pulse rounded-full bg-primary" />
				<span className="text-sm font-medium tracking-widest text-white/70">It all starts here</span>
			</div>

			{/* Main title */}
			<div className="flex flex-col items-center gap-2">
				<h1 className="font-mighty leading-none tracking-wide">
					<span className="block text-[clamp(4rem,14vw,10rem)] text-primary drop-shadow-lg">
						TUES FEST
					</span>
					<span className="block text-[clamp(3rem,10vw,7rem)] text-white">
						{TF_YEAR}
					</span>
				</h1>
			</div>

			{/* Countdown */}
			<Countdown />

			{/* CTA */}
			<Button size="xl" className="font-bold uppercase" asChild>
				<Link href="/projects">
					<Rocket className="size-5" />
					Разгледай проектите
				</Link>
			</Button>

			{/* Date + location chips */}
			<div className="flex flex-wrap items-center justify-center gap-3">
				<div
					className={cn(
						buttonVariants({ variant: 'outline', size: 'lg' }),
						'pointer-events-none gap-2'
					)}
				>
					<Clock4 className="text-primary h-4 w-4" />
					<span>{TF_DATE_STRING}</span>
				</div>
				<Button variant="outline" size="lg" asChild className="gap-2">
					<Link href="/location">
						<MapPin className="text-primary h-4 w-4" />
						{TF_LOCATION}
					</Link>
				</Button>
			</div>

			{/* Scroll indicator */}
			<div className="hidden animate-bounce sm:block">
				<Link
					href="#about"
					aria-label="Виж повече"
					className="flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
				>
					<ChevronDown className="size-5 stroke-[2.5]" />
				</Link>
			</div>
		</div>
	);
}
