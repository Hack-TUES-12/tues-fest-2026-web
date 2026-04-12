'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

import { HeroCountdown } from '@/components/hero-countdown';
import { Button, buttonVariants } from '@/components/ui/button';
import { TF_DATE_COMPACT, TF_LOCATION, TF_SLOGAN, TF_YEAR } from '@/constants/event';
import { useTFFeature } from '@/lib/growthbook/react/hooks';

const HERO_BG = '/assets/about/about1.png';

/** Typography shared by all hero “+” decorations (matches pink plus) */
const HERO_PLUS_TEXT = 'select-none font-black leading-none text-primary opacity-60';
const HERO_PLUS_FONT_SIZE = 'clamp(1.75rem, 4.5vw, 3.75rem)';

function scrollToAboutSection() {
	const about = document.getElementById('about');
	if (!about) return;
	const nav = document.querySelector('header');
	const headerOffset = nav instanceof HTMLElement ? nav.offsetHeight : 80;
	const y = about.getBoundingClientRect().top + window.scrollY - headerOffset;
	window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
}

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export default function EventLanding() {
	const reducedMotion = useReducedMotion();
	const ctaFeature = useTFFeature('tf-landing-cta');
	const cta = ctaFeature.value ?? {
		label: 'Разгледай проектите',
		link: '/projects',
	};

	const fadeUp = (delaySec: number) => ({
		initial: reducedMotion
			? { opacity: 1, y: 0 }
			: { opacity: 0, y: 20 },
		animate: { opacity: 1, y: 0 },
		transition: {
			duration: reducedMotion ? 0 : 0.55,
			delay: reducedMotion ? 0 : delaySec,
			ease: EASE_OUT,
		},
	});

	const slideInRight = (delaySec: number) => ({
		initial: reducedMotion
			? { opacity: 1, x: 0 }
			: { opacity: 0, x: 28 },
		animate: { opacity: 1, x: 0 },
		transition: {
			duration: reducedMotion ? 0 : 0.65,
			delay: reducedMotion ? 0 : delaySec,
			ease: EASE_OUT,
		},
	});

	return (
		<div className="relative flex min-h-0 w-full flex-1 flex-col">
			{/* Dobri */}
			<motion.div
				className='absolute bottom-0 right-0 hidden aspect-29/25 sm:block'
				style={{
					width: 'clamp(12rem, 20vw, 20rem)',
				}}
				{...slideInRight(0.42)}
			>
				<Image
					src="/assets/home/hero-dobri.svg"
					fill
					alt='Dobri bobri'
				/>
			</motion.div>

			{/* Background photo + vignette */}
			<div className="pointer-events-none absolute inset-0 isolate -z-20">
				<Image
					src={HERO_BG}
					alt=""
					fill
					className="object-cover object-center"
					priority
					sizes="100vw"
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/65 to-black/85" />
			</div>

			<div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 py-16 md:px-8 md:py-20 lg:py-24">
				<div className="grid grid-cols-1 items-center gap-x-12 gap-y-6 lg:grid-cols-2 lg:grid-rows-[auto_auto] lg:gap-x-16 lg:gap-y-7 xl:gap-x-20 xl:gap-y-8">
					{/* Branding: col 1 row 1 on lg; first in flow on sm+; first on xs */}
					<div className="relative order-1 flex flex-col items-center text-center lg:col-start-1 lg:row-start-1 lg:items-start lg:text-left">
						<div className="flex w-full flex-col items-center lg:items-start">
							{/* Shared width = first row (TUES + year); Fest + slogan right-aligned to that edge */}
							<div className="flex w-full justify-center lg:justify-start">
								<div className="inline-flex min-w-0 max-w-full flex-col items-stretch">
									<h1 className="inline-flex flex-col items-stretch font-mighty leading-[0.85]">
										{/* Row 1: blue + on T stem; orange + above TUES–year gap */}
										<motion.span
											className="relative flex items-end justify-start gap-2"
											{...fadeUp(0)}
										>
											<span className="relative inline-block text-[clamp(5.75rem,14vw,14rem)] leading-none text-white drop-shadow-lg">
												{/* Blue: overlaps vertical stem of T, slightly left of center */}
												<span
													className="pointer-events-none absolute left-[0.11em] top-[0.47em] z-[1] -translate-x-1/2 -translate-y-1/2 select-none leading-none font-mono text-accent opacity-90"
													style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}
													aria-hidden
												>
													<span
														className="inline-block animate-tf-plus-float"
														style={{ animationDelay: '-0.35s' }}
													>
														+
													</span>
												</span>
												TUES
												{/* Orange: above the gap between TUES and the year (centered on flex gap) */}
												<span
													className="pointer-events-none absolute left-full top-[3rem] z-[1] ml-1 translate-x-1/2 -translate-y-full select-none leading-none font-mono text-secondary opacity-80"
													style={{
														fontSize: 'clamp(4rem, 12vw, 9rem)',
													}}
													aria-hidden
												>
													<span
														className="inline-block animate-tf-plus-float"
														style={{ animationDelay: '-1.15s' }}
													>
														+
													</span>
												</span>
											</span>
											<span className="relative z-0 text-[clamp(2.4rem,4.8vw,4rem)] leading-none text-muted drop-shadow-lg">
												{TF_YEAR}
											</span>
										</motion.span>
										<motion.span
											className="sm:-mt-2 md:-mt-3 text-right text-[clamp(5.75rem,14vw,14rem)] pr-3 text-white drop-shadow-lg"
											{...fadeUp(0.07)}
										>
											Fest
										</motion.span>
									</h1>
									<motion.p
										className="sm:-mt-2 md:-mt-3 min-w-0 break-words text-right pr-3 font-mighty text-[clamp(1.6rem,3.2vw,3rem)] uppercase leading-tight text-primary"
										{...fadeUp(0.14)}
									>
										{TF_SLOGAN}
									</motion.p>
								</div>
								{/* Pink: immediately right of the button row (reference: under Fest / slogan) */}
								<motion.span
									className="pointer-events-none absolute bottom-0 right-0 z-0 hidden select-none leading-none text-primary lg:block"
									style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}
									aria-hidden
									{...fadeUp(0.16)}
								>
									<span
										className="inline-block animate-tf-plus-float"
										style={{ animationDelay: '-2.05s' }}
									>
										+
									</span>
								</motion.span>
							</div>
						</div>
					</div>

					{/* Right: countdown + meta + mascot — under sm: between title and CTAs; sm–lg: after CTAs; lg: col 2 */}
					<div className="relative order-2 flex flex-col-reverse items-center gap-4 sm:order-3 lg:flex-col lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:items-end">
						<motion.div className="w-full" {...fadeUp(0.18)}>
							<HeroCountdown />
						</motion.div>

						<motion.div
							className="w-full max-w-md text-center lg:text-end"
							{...fadeUp(0.26)}
						>
							<p className="font-mighty text-4xl text-white drop-shadow-md">
								{TF_DATE_COMPACT}
							</p>
							<p className="text-lg leading-relaxed text-white/75 sm:text-xl">{TF_LOCATION}</p>
						</motion.div>

						{/* <div className="relative mt-4 w-full max-w-[220px] sm:max-w-[260px] lg:absolute lg:bottom-[-2rem] lg:right-0 lg:mt-0 lg:max-w-[200px] xl:max-w-[240px]">
							<Image
								src="/assets/mascot.png"
								alt=""
								width={480}
								height={480}
								className="h-auto w-full object-contain object-bottom drop-shadow-2xl"
								aria-hidden
							/>
						</div> */}
					</div>

					<motion.div
						className="order-3 mx-auto flex w-full max-w-64 justify-center lg:order-2 lg:col-start-1 lg:row-start-2 lg:mx-0 lg:max-w-auto lg:justify-start"
						{...fadeUp(0.32)}
					>
						<div className="relative flex w-full max-w-md flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center">
							<Button
								variant={"primary-outline"}
								size={"lg"}
								className="w-full sm:w-auto"
								onClick={scrollToAboutSection}
							>
								Виж повече
							</Button>
							<Button size="lg" className="w-full font-bold sm:w-auto" asChild>
								<Link href={cta.link}>{cta.label}</Link>
							</Button>
						</div>
					</motion.div>
				</div>
			</div>

			<div className="relative z-10 mt-auto flex justify-center pb-6 pt-2">
				<motion.button
					type="button"
					onClick={scrollToAboutSection}
					aria-label="Превърти към секцията за събитието"
					className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
					{...fadeUp(0.48)}
				>
					<ChevronDown className="size-5 stroke-[2.5]" aria-hidden />
				</motion.button>
			</div>
		</div>
	);
}
