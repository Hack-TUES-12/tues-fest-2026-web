/** Matches hero (`Logos.tsx`) easing — shared by in-view section entrances */
export const HERO_LIKE_EASE_OUT = [0.22, 1, 0.36, 1] as const;

export const SECTION_IN_VIEW = {
	once: true,
	amount: 0.05,
	margin: '0px 0px -5% 0px',
} as const;

/**
 * For blocks taller than the viewport: default `amount` (15% of element height) is often never
 * reached, so `whileInView` never fires and `initial` opacity stays 0.
 */
export const SECTION_IN_VIEW_TALL = {
	once: true,
	amount: 0.01,
	margin: '0px 0px -10% 0px',
} as const;

export function sectionFadeUp(reducedMotion: boolean | null, delaySec: number) {
	return {
		initial: reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
		whileInView: { opacity: 1, y: 0 },
		viewport: SECTION_IN_VIEW,
		transition: {
			duration: reducedMotion ? 0 : 0.55,
			delay: reducedMotion ? 0 : delaySec,
			ease: HERO_LIKE_EASE_OUT,
		},
	};
}

export function sectionFadeIn(reducedMotion: boolean | null, delaySec: number) {
	return {
		initial: reducedMotion ? { opacity: 1 } : { opacity: 0 },
		whileInView: { opacity: 1 },
		viewport: SECTION_IN_VIEW,
		transition: {
			duration: reducedMotion ? 0 : 0.7,
			delay: reducedMotion ? 0 : delaySec,
			ease: HERO_LIKE_EASE_OUT,
		},
	};
}
