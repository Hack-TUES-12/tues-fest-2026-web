'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';

import { sectionFadeIn } from '@/lib/motion/section-in-view';

export function ExpectationsSectionDecorations() {
	const reducedMotion = useReducedMotion();

	return (
		<>
			<motion.div
				aria-hidden
				className="pointer-events-none absolute bottom-0 left-0 z-0 h-auto w-[min(100%,36rem)] max-w-none translate-y-1/4 select-none md:-translate-x-1/4"
				{...sectionFadeIn(reducedMotion, 0.08)}
			>
				<Image
					src="/decorations/orange-circle.svg"
					alt=""
					width={600}
					height={600}
					aria-hidden
					unoptimized
					className="h-auto w-full max-w-none"
				/>
			</motion.div>
			<motion.div
				aria-hidden
				className="pointer-events-none absolute right-0 top-1/3 z-0 h-auto w-[min(100%,36rem)] max-w-none -translate-y-1/2 select-none md:translate-x-1/4"
				{...sectionFadeIn(reducedMotion, 0.16)}
			>
				<Image
					src="/decorations/blue-circle.svg"
					alt=""
					width={600}
					height={600}
					aria-hidden
					unoptimized
					className="h-auto w-full max-w-none"
				/>
			</motion.div>
		</>
	);
}
