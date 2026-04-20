'use client';

import { motion, useReducedMotion } from 'motion/react';

import { sectionFadeUp } from '@/lib/motion/section-in-view';

export const ResultsHeader = () => {
	const reducedMotion = useReducedMotion();

	return (
		<section className="flex flex-col items-center gap-2 text-center">
			<motion.p
				className="text-secondary text-sm font-medium tracking-widest uppercase"
				{...sectionFadeUp(reducedMotion, 0.06)}
			>
				TUES Battle Bots
			</motion.p>
			<motion.h1
				className="font-title text-3xl text-white md:text-4xl"
				{...sectionFadeUp(reducedMotion, 0.12)}
			>
				Резултати от турнира
			</motion.h1>
			<motion.p
				className="text-foreground/70 max-w-xl text-pretty text-lg leading-relaxed"
				{...sectionFadeUp(reducedMotion, 0.18)}
			>
				Следете резултатите от състезанието TUES Battle Bots 2026 в реално време.
			</motion.p>
		</section>
	);
};
