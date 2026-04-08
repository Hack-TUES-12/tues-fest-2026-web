'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';

import { OrganizersSection } from './OrganizersSection';

import { Button } from '@/components/ui/button';
import { ABOUT_IMAGE_1, ABOUT_IMAGE_2, ABOUT_TEXT } from '@/constants/home/about';
import { TF_DATE_STRING, TF_LOCATION, TF_TIME_STRING, TF_YEAR } from '@/constants/event';
import { IfTFFeatureOn } from '@/lib/growthbook/react/client';
import { sectionFadeIn, sectionFadeUp } from '@/lib/motion/section-in-view';

const About = () => {
	const reducedMotion = useReducedMotion();

	return (
		<section id="about" className="relative">
			<div className="relative z-10 mx-auto max-w-6xl overflow-hidden px-4 pb-32 pt-12 lg:px-8">
				{/* Unified layout: flex-col on mobile, side-by-side grid on desktop */}
				<div className="relative flex flex-col gap-12 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12">
					{/* Left: overlapping images */}
					<motion.div
						className="relative"
						style={{ paddingBottom: '110%' }}
						{...sectionFadeUp(reducedMotion, 0)}
					>
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
							className="absolute left-[50%] top-[15%] z-10 aspect-video w-[75%] -translate-x-1/2 rounded-2xl object-cover shadow-2xl transition-all duration-300 hover:scale-105"
						/>

						{/* Image 3 — smaller rectangle, bottom-left */}
						<img
							src={ABOUT_IMAGE_2}
							alt="TUES FEST — момент от събитието"
							className="absolute bottom-0 left-[20%] z-10 aspect-video w-[75%] rounded-2xl object-cover shadow-2xl transition-all duration-300 hover:scale-105"
						/>

						{/* Orange + decoration — bottom-right */}
						<span
							className="absolute bottom-[1%] right-[1%] z-30 translate-x-1/2 translate-y-1/2 select-none text-7xl font-black leading-none text-secondary"
							aria-hidden="true"
						>
							+
						</span>
					</motion.div>

					{/* Right: text content */}
					<div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
						{/* Title */}
						<div className="flex flex-col gap-1">
							<motion.p
								className="text-xl tracking-widest text-white"
								{...sectionFadeUp(reducedMotion, 0.07)}
							>
								Повече за
							</motion.p>
							<motion.h2
								className="font-mighty text-7xl leading-none text-primary lg:text-8xl"
								{...sectionFadeUp(reducedMotion, 0.14)}
							>
								TUES Fest
							</motion.h2>
						</div>

						<motion.p {...sectionFadeUp(reducedMotion, 0.21)}>{ABOUT_TEXT}</motion.p>

						{/* Info sections */}
						<motion.div className="flex flex-col gap-4" {...sectionFadeUp(reducedMotion, 0.28)}>
							<div>
								<h3 className="mb-2 text-2xl font-bold text-primary">Кога и къде?</h3>
								<p className="text-lg text-foreground/80">
									TUES Fest {TF_YEAR} ще се проведе на {TF_DATE_STRING} от {TF_TIME_STRING} часа на
									територията на {TF_LOCATION}.
								</p>
							</div>
							<div>
								<h3 className="mb-2 text-2xl font-bold text-primary">Какво ще видите?</h3>
								<p className="text-lg text-foreground/80">
									Ще имате възможност да се запознаете с ТУЕС към ТУ-София отблизо и с това какво ни
									прави различното училище.
								</p>
							</div>
						</motion.div>

						{/* CTA button */}
						<IfTFFeatureOn feature="tf-schedule">
							<motion.div {...sectionFadeUp(reducedMotion, 0.35)}>
								<Button asChild variant="default" size="lg" className="w-fit font-bold">
									<Link href="/schedule">Виж програмата</Link>
								</Button>
							</motion.div>
						</IfTFFeatureOn>
					</div>

					{/* Purple circle decoration — bottom center of layout, half-visible */}
					<motion.img
						src="/decorations/purple-circle.svg"
						alt=""
						aria-hidden="true"
						className="pointer-events-none absolute -bottom-48 left-1/2 -z-10 w-[80%] max-w-2xl -translate-x-1/2 translate-y-1/2"
						{...sectionFadeIn(reducedMotion, 0.1)}
					/>
				</div>
			</div>
			<OrganizersSection />
		</section>
	);
};

export default About;
