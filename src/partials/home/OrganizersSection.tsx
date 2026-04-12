'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TF_SLOGAN, TF_YEAR } from '@/constants/event';

import { TeamBackground } from './TeamBackground';

/** Pixels — set once on mount (and on orientation change). Not updated on iOS Safari resize when the URL bar shows/hides. */
const ORGANIZERS_VH_VAR = '--organizers-viewport-h';

function readStableViewportHeightPx(): number {
	if (typeof window === 'undefined') return 0;
	return window.visualViewport?.height ?? window.innerHeight;
}

function applyOrganizersViewportLock(root: HTMLDivElement) {
	root.style.setProperty(ORGANIZERS_VH_VAR, `${readStableViewportHeightPx()}px`);
}

export const OrganizersSection = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const stickyRef = useRef<HTMLDivElement>(null);
	const [progress, setProgress] = useState(0);

	// Lock section height to the first measured viewport — svh/vh still track the dynamic toolbar on some iOS versions.
	// We intentionally do not listen to `resize` (Safari fires it when the URL bar shows/hides).
	useLayoutEffect(() => {
		const root = containerRef.current;
		if (!root) return;
		applyOrganizersViewportLock(root);
		// Safari sometimes reports an interim height on the first frame.
		const id = requestAnimationFrame(() => requestAnimationFrame(() => applyOrganizersViewportLock(root)));
		return () => cancelAnimationFrame(id);
	}, []);

	useEffect(() => {
		const root = containerRef.current;
		if (!root) return;
		const onOrientation = () => {
			setTimeout(() => applyOrganizersViewportLock(root), 0);
			setTimeout(() => applyOrganizersViewportLock(root), 400);
		};
		window.addEventListener('orientationchange', onOrientation);
		return () => window.removeEventListener('orientationchange', onOrientation);
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			if (!containerRef.current || !stickyRef.current) return;
			const rect = containerRef.current.getBoundingClientRect();
			const stickyDistance =
				containerRef.current.offsetHeight - stickyRef.current.offsetHeight;
			if (stickyDistance <= 0) return;
			const p = Math.max(0, Math.min(1, -rect.top / stickyDistance));
			setProgress(p);
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Card starts one viewport height below its final resting spot and rises to translateY(0)
	const cardY = (1 - progress) * 100;

	return (
		<div
			ref={containerRef}
			className="relative"
			style={{
				height: `calc(var(${ORGANIZERS_VH_VAR}, 100svh) * 2)`,
			}}
		>
			{/* Sticky stage — full-bleed by escaping the max-w-screen-2xl main container */}
			<div
				ref={stickyRef}
				className="sticky top-0 overflow-hidden"
				style={{
					width: '100vw',
					marginLeft: 'calc(50% - 50vw)',
					height: `var(${ORGANIZERS_VH_VAR}, 100svh)`,
				}}
			>
				{/* Background — z-0 so gradient + black overlay stay above the image stack */}
				<TeamBackground />
				{/* Static gradient at the bottom so the card blends in */}
				<div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
				{/* Progressive dark overlay — grows with scroll progress */}
				<div
					className="absolute inset-0 z-[2] bg-black pointer-events-none"
					style={{ opacity: progress * 0.60 }}
				/>

				{/* Card — animates up from below */}
				<div
					className="absolute inset-x-0 top-[50%] -translate-y-1/2 z-10 flex justify-center px-4 pb-0"
					style={{
						transform: `translateY(calc(${cardY} * var(${ORGANIZERS_VH_VAR}, 100svh) / 100))`,
					}}
				>
					<Card className="w-full max-w-4xl px-8 py-10 text-center">
						<CardContent className="flex flex-col items-center gap-6 p-0">
							<div className="space-y-1">
								<p className="text-muted tracking-widest">Организатори</p>
								<h2 className="font-title text-4xl lg:text-5xl">Кой стои зад TUES Fest?</h2>
							</div>

							<p>
								TUES Fest {TF_YEAR} &quot;<span className="text-muted">{TF_SLOGAN}</span>&quot; се организира от ученици за ученици, под менторството на АЗТУЕС! Организационният екип вярва, че за поредна година ще покаже на света какво е да си ученик в ТУЕС към ТУ - София.
							</p>

							<Button asChild variant="muted" size="lg" className="font-bold">
								<Link href="/about">Повече за ТУЕС</Link>
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};
