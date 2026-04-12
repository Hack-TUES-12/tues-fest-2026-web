'use client';

import type { ReactNode } from 'react';
import { useLayoutEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

import { SECTION_IN_VIEW_TALL, sectionFadeUp, sectionFadeUpOnMount } from '@/lib/motion/section-in-view';

/** Matches `project-list` grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` */
const MD_MIN = '(min-width: 768px)';
const LG_MIN = '(min-width: 1024px)';

function getProjectGridColumnCount(): number {
	if (typeof window === 'undefined') return 1;
	if (window.matchMedia(LG_MIN).matches) return 3;
	if (window.matchMedia(MD_MIN).matches) return 2;
	return 1;
}

/**
 * Real column count after layout, without painting an intermediate frame at `1` (SSR default).
 * Needed so the “first row uses on-mount” split matches the visible grid on desktop before paint.
 */
function useProjectGridColumnCountAfterLayout(): number {
	const [columnCount, setColumnCount] = useState(1);
	useLayoutEffect(() => {
		setColumnCount(getProjectGridColumnCount());
		const mqMd = window.matchMedia(MD_MIN);
		const mqLg = window.matchMedia(LG_MIN);
		const onChange = () => setColumnCount(getProjectGridColumnCount());
		mqMd.addEventListener('change', onChange);
		mqLg.addEventListener('change', onChange);
		return () => {
			mqMd.removeEventListener('change', onChange);
			mqLg.removeEventListener('change', onChange);
		};
	}, []);
	return columnCount;
}

export function ProjectCardMotion({
	children,
	index,
}: {
	children: ReactNode;
	index: number;
}) {
	const reducedMotion = useReducedMotion();
	const columnCount = useProjectGridColumnCountAfterLayout();
	const columnIndex = index % columnCount;
	const delaySec = 0.06 + columnIndex * 0.055;
	const isFirstRow = index < columnCount;

	if (isFirstRow) {
		return (
			<motion.div className="min-w-0 h-full" {...sectionFadeUpOnMount(reducedMotion, delaySec)}>
				{children}
			</motion.div>
		);
	}

	return (
		<motion.div
			className="min-w-0 h-full"
			{...sectionFadeUp(reducedMotion, delaySec)}
			viewport={SECTION_IN_VIEW_TALL}
		>
			{children}
		</motion.div>
	);
}
