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

/** Staggered list rows (contributors, links): small delay per `index`. */
export function listItemEntrance(
	reducedMotion: boolean | null,
	index: number,
	staggerSec = 0.1,
) {
	return {
		initial: reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 },
		whileInView: { opacity: 1, y: 0 },
		viewport: SECTION_IN_VIEW,
		transition: {
			duration: reducedMotion ? 0 : 0.35,
			delay: reducedMotion ? 0 : index * staggerSec,
			ease: HERO_LIKE_EASE_OUT,
		},
	};
}

/** Icon inside each row: scale up + rotate into place (same stagger as row). */
export function listItemIconEntrance(
	reducedMotion: boolean | null,
	index: number,
	staggerSec = 0.1,
) {
	return {
		initial: reducedMotion
			? { scale: 1, rotate: 0, opacity: 1 }
			: { scale: 0.55, rotate: -22, opacity: 0 },
		whileInView: { scale: 1, rotate: 0, opacity: 1 },
		viewport: SECTION_IN_VIEW,
		transition: {
			duration: reducedMotion ? 0 : 1,
			delay: reducedMotion ? 0 : index * staggerSec,
			ease: HERO_LIKE_EASE_OUT,
		},
	};
}

const EXPECTATION_ROW_SLIDE_PX = 56;

/** Expectations row: on `lg+`, slide in from left (normal) or right (reverse); below `lg`, fade only. */
export function expectationRowMotion(
	reducedMotion: boolean | null,
	isLg: boolean,
	reverse: boolean,
	delaySec: number,
) {
	if (reducedMotion) {
		return {
			initial: { opacity: 1, x: 0 },
			whileInView: { opacity: 1, x: 0 },
			viewport: SECTION_IN_VIEW,
			transition: { duration: 0 },
		};
	}
	if (!isLg) {
		return {
			initial: { opacity: 0, x: 0 },
			whileInView: { opacity: 1, x: 0 },
			viewport: SECTION_IN_VIEW,
			transition: {
				duration: 0.55,
				delay: delaySec,
				ease: HERO_LIKE_EASE_OUT,
			},
		};
	}
	return {
		initial: { opacity: 0, x: reverse ? EXPECTATION_ROW_SLIDE_PX : -EXPECTATION_ROW_SLIDE_PX },
		whileInView: { opacity: 1, x: 0 },
		viewport: SECTION_IN_VIEW,
		transition: {
			duration: 0.55,
			delay: delaySec,
			ease: HERO_LIKE_EASE_OUT,
		},
	};
}
