'use client';

import Image from 'next/image';
import Link from 'next/link';

import { HeroCountdown } from '@/components/hero-countdown';
import { Button, buttonVariants } from '@/components/ui/button';
import { TF_DATE_COMPACT, TF_LOCATION, TF_SLOGAN, TF_YEAR } from '@/constants/event';
import { useTFFeature } from '@/lib/growthbook/react/hooks';
import { cn } from '@/lib/utils';

const HERO_BG = '/assets/about/about1.png';

/** Light topo-style line overlay */
const TOPO_PATTERN =
	"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cpath fill='none' stroke='%23ffffff' stroke-opacity='0.07' stroke-width='0.6' d='M0 80c26-18 52-18 80 0s54 18 80 0M0 40c28-12 56-12 80 0s52 12 80 0M0 120c24 14 48 14 80 0s56-14 80 0'/%3E%3C/svg%3E\")";

export default function EventLanding() {
	const ctaFeature = useTFFeature('tf-landing-cta');
	const cta = ctaFeature.value ?? {
		label: 'Разгледай проектите',
		link: '/projects',
	};

	return (
		<div className="relative flex min-h-0 w-full flex-1 flex-col">
			{/* Background photo */}
			<div className="pointer-events-none absolute inset-0 -z-20">
				<Image
					src={HERO_BG}
					alt=""
					fill
					className="object-cover object-center"
					priority
					sizes="100vw"
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/85" />
				<div className="absolute inset-0 bg-primary/10 mix-blend-soft-light" />
			</div>

			{/* Topographic overlay */}
			<div
				className="pointer-events-none absolute inset-0 -z-10"
				style={{
					backgroundImage: TOPO_PATTERN,
					backgroundSize: '200px 200px',
				}}
				aria-hidden
			/>

			{/* Decorative plus signs */}
			<span
				className="pointer-events-none absolute left-[8%] top-[12%] z-0 select-none font-black leading-none text-secondary opacity-50 max-md:text-7xl md:left-[12%] md:text-[clamp(5rem,12vw,11rem)]"
				aria-hidden
			>
				+
			</span>
			<span
				className="pointer-events-none absolute bottom-[18%] right-[10%] z-0 select-none font-black leading-none text-primary opacity-45 max-md:text-6xl md:right-[15%] md:text-[clamp(4rem,10vw,9rem)]"
				aria-hidden
			>
				+
			</span>

			<div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 py-16 md:px-8 md:py-20 lg:py-24">
				<div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
					{/* Left: branding + CTAs */}
					<div className="flex flex-col items-center gap-8 text-center lg:items-start lg:text-left">
						<div className="flex flex-col gap-3">
							<h1 className="font-mighty leading-[0.9] tracking-wide">
								<span className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 lg:justify-start">
									<span className="text-[clamp(2.75rem,10vw,5.5rem)] text-white drop-shadow-lg">
										TUES FEST
									</span>
									<span className="text-[clamp(2.25rem,8vw,4.5rem)] text-muted drop-shadow-lg">
										{TF_YEAR}
									</span>
								</span>
							</h1>
							<p className="font-title text-[clamp(1rem,2.5vw,1.35rem)] tracking-[0.2em] text-primary/90 uppercase">
								{TF_SLOGAN}
							</p>
						</div>

						<div className="flex w-full max-w-md flex-col gap-3 sm:flex-row sm:justify-center lg:max-w-none lg:justify-start">
							<Link
								href="#about"
								className={cn(
									buttonVariants({ variant: 'outline', size: 'lg' }),
									'w-full border-primary/60 bg-transparent text-white hover:bg-white/10 hover:text-white sm:w-auto'
								)}
							>
								Виж повече
							</Link>
							<Button size="lg" className="w-full font-bold sm:w-auto" asChild>
								<Link href={cta.link}>{cta.label}</Link>
							</Button>
						</div>
					</div>

					{/* Right: countdown + meta + mascot */}
					<div className="relative flex flex-col items-center gap-8 lg:items-end">
						<HeroCountdown />

						<div className="w-full max-w-md space-y-2 text-center lg:text-right">
							<p className="font-mighty text-3xl text-white drop-shadow-md sm:text-4xl md:text-5xl">
								{TF_DATE_COMPACT}
							</p>
							<p className="text-sm leading-relaxed text-white/75 sm:text-base">{TF_LOCATION}</p>
						</div>

						<div className="relative mt-4 w-full max-w-[220px] sm:max-w-[260px] lg:absolute lg:bottom-[-2rem] lg:right-0 lg:mt-0 lg:max-w-[200px] xl:max-w-[240px]">
							<Image
								src="/assets/mascot.png"
								alt=""
								width={480}
								height={480}
								className="h-auto w-full object-contain object-bottom drop-shadow-2xl"
								aria-hidden
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
