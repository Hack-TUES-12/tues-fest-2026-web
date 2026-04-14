'use client';

import { motion, useReducedMotion } from 'motion/react';

import { sectionFadeIn, sectionFadeUp } from '@/lib/motion/section-in-view';

type PartnersPageShellProps = {
	children: React.ReactNode;
};

export function PartnersPageShell({ children }: PartnersPageShellProps) {
	const reducedMotion = useReducedMotion();

	return (
		<div className="relative px-4 pt-10 pb-24 md:px-8 md:pt-14">
			<div className="relative z-10 flex w-full flex-col gap-16 md:gap-20">
				<motion.section
					className="mx-auto flex w-full max-w-3xl flex-col items-center gap-5 text-center"
					{...sectionFadeIn(reducedMotion, 0)}
				>
					<motion.h1
						className="font-title text-5xl text-white md:text-6xl"
						{...sectionFadeUp(reducedMotion, 0.08)}
					>
						Нашите спонсори и партньори
					</motion.h1>
					<motion.p
						className="text-foreground/75 max-w-2xl text-lg leading-relaxed text-pretty"
						{...sectionFadeUp(reducedMotion, 0.14)}
					>
						Благодарим безкрайно на всички компании, които ни подкрепиха. Без вас събитията нямаше да
						бъдат възможни!
					</motion.p>
				</motion.section>

				{children}
			</div>
		</div>
	);
}
