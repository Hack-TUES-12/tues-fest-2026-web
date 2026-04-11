'use client';

import { useCallback, useEffect, useState } from 'react';

function setsEqual(a: Set<string>, b: Set<string>): boolean {
	if (a.size !== b.size) return false;
	for (const id of b) if (!a.has(id)) return false;
	return true;
}

const DEFAULT_FOCAL_Y_RATIO = 0.38;

export type UseRegulationActiveSectionOptions = {
	/**
	 * Reading line as a fraction of viewport height (0–1). Higher = line lower on the screen —
	 * sections tend to activate earlier while scrolling down. Default matches regulation (`0.38`).
	 */
	focalYRatio?: number;
};

/**
 * Timeline “active” state per section (recomputed on scroll/resize):
 * - **Current**: reading line (focal Y) intersects the section.
 * - **Passed (down)**: section lies entirely above that line (`bottom < focalY`).
 *   When the user scrolls back up, this clears as soon as the section is no longer fully above the line.
 */
export function useRegulationActiveSection(
	sectionIds: readonly string[],
	options?: UseRegulationActiveSectionOptions,
): {
	isSectionActive: (id: string) => boolean;
	/** Section whose box contains the reading line (closest by vertical center) — for `aria-current` in TOC. */
	currentSectionId: string | null;
} {
	const focalYRatio = options?.focalYRatio ?? DEFAULT_FOCAL_Y_RATIO;

	const [activeIds, setActiveIds] = useState<Set<string>>(() => new Set());
	const [currentSectionId, setCurrentSectionId] = useState<string | null>(null);

	useEffect(() => {
		const compute = () => {
			const focalY = window.innerHeight * focalYRatio;
			const next = new Set<string>();
			let bestId: string | null = null;
			let bestDist = Infinity;

			for (const id of sectionIds) {
				const el = document.getElementById(id);
				if (!el) continue;
				const r = el.getBoundingClientRect();
				const isCurrent = focalY >= r.top && focalY <= r.bottom;
				const isScrolledPastDown = r.bottom < focalY;
				if (isCurrent || isScrolledPastDown) next.add(id);
				if (isCurrent) {
					const center = r.top + r.height / 2;
					const d = Math.abs(center - focalY);
					if (d < bestDist) {
						bestDist = d;
						bestId = id;
					}
				}
			}

			setActiveIds((prev) => (setsEqual(prev, next) ? prev : next));
			setCurrentSectionId((prev) => (prev === bestId ? prev : bestId));
		};

		compute();
		window.addEventListener('scroll', compute, { passive: true });
		window.addEventListener('resize', compute);

		return () => {
			window.removeEventListener('scroll', compute);
			window.removeEventListener('resize', compute);
		};
	}, [sectionIds.join('\0'), focalYRatio]);

	const isSectionActive = useCallback(
		(id: string) => activeIds.has(id),
		[activeIds],
	);

	return { isSectionActive, currentSectionId };
}
