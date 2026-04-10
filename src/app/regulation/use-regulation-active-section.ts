'use client';

import { useCallback, useEffect, useState } from 'react';

function setsEqual(a: Set<string>, b: Set<string>): boolean {
	if (a.size !== b.size) return false;
	for (const id of b) if (!a.has(id)) return false;
	return true;
}

/**
 * Timeline “active” state per section (recomputed on scroll/resize):
 * - **Current**: reading line (focal Y) intersects the section.
 * - **Passed (down)**: section lies entirely above that line (`bottom < focalY`).
 *   When the user scrolls back up, this clears as soon as the section is no longer fully above the line.
 */
export function useRegulationActiveSection(sectionIds: readonly string[]): {
	isSectionActive: (id: string) => boolean;
} {
	const [activeIds, setActiveIds] = useState<Set<string>>(() => new Set());

	useEffect(() => {
		const compute = () => {
			const focalY = window.innerHeight * 0.38;
			const next = new Set<string>();

			for (const id of sectionIds) {
				const el = document.getElementById(id);
				if (!el) continue;
				const r = el.getBoundingClientRect();
				const isCurrent = focalY >= r.top && focalY <= r.bottom;
				const isScrolledPastDown = r.bottom < focalY;
				if (isCurrent || isScrolledPastDown) next.add(id);
			}

			setActiveIds((prev) => (setsEqual(prev, next) ? prev : next));
		};

		compute();
		window.addEventListener('scroll', compute, { passive: true });
		window.addEventListener('resize', compute);

		return () => {
			window.removeEventListener('scroll', compute);
			window.removeEventListener('resize', compute);
		};
	}, [sectionIds.join('\0')]);

	const isSectionActive = useCallback(
		(id: string) => activeIds.has(id),
		[activeIds],
	);

	return { isSectionActive };
}
