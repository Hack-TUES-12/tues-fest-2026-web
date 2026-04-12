'use client';

import { usePathname } from 'next/navigation';
import { useLayoutEffect, useRef } from 'react';

function isProjectsListingPath(path: string) {
	return path === '/projects' || /^\/projects\/category\/[^/]+$/.test(path);
}

/**
 * When `loading.tsx` briefly replaces the page between category links, the document can be shorter
 * than the prior scroll offset; WebKit often keeps a large `scrollY` so the breadcrumb and filter
 * sit above the viewport. Reset scroll only when switching between listing URLs so back-navigation
 * from a project page can still restore list scroll.
 */
export function ProjectsRouteScrollReset() {
	const pathname = usePathname();
	const prevPathRef = useRef<string | null>(null);

	useLayoutEffect(() => {
		const prev = prevPathRef.current;
		prevPathRef.current = pathname;
		if (prev === null) return;
		if (isProjectsListingPath(prev) && isProjectsListingPath(pathname)) {
			window.scrollTo(0, 0);
		}
	}, [pathname]);

	return null;
}
