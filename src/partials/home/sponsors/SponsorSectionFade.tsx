'use client';

import { motion, useReducedMotion } from 'motion/react';

import { sectionFadeInTall } from '@/lib/motion/section-in-view';

type SponsorSectionFadeProps = {
	children: React.ReactNode;
	className?: string;
	/** Used to stagger delays between stacked sponsor tiers */
	index?: number;
};

const STAGGER_SEC = 0.06;

export function SponsorSectionFade({ children, className, index = 0 }: SponsorSectionFadeProps) {
	const reducedMotion = useReducedMotion();
	return (
		<motion.div className={className} {...sectionFadeInTall(reducedMotion, index * STAGGER_SEC)}>
			{children}
		</motion.div>
	);
}
