'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TF_SLOGAN, TF_YEAR } from '@/constants/event';

import { TeamBackground } from './TeamBackground';

/** Ignore sub-pixel noise in p; still snap at scroll range ends. */
const PROGRESS_EPS = 0.002;

export const OrganizersSection = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const stickyRef = useRef<HTMLDivElement>(null);
	const overlayRef = useRef<HTMLDivElement>(null);
	const cardLiftRef = useRef<HTMLDivElement>(null);
	const lastPRef = useRef(-1);

	useEffect(() => {
		let rafId: number | null = null;

		const applyProgress = (p: number) => {
			const overlay = overlayRef.current;
			const cardLift = cardLiftRef.current;
			if (!overlay || !cardLift) return;
			overlay.style.opacity = String(p * 0.6);
			cardLift.style.transform = `translateY(${(1 - p) * 100}lvh)`;
		};

		const measureAndMaybeApply = () => {
			const container = containerRef.current;
			const sticky = stickyRef.current;
			if (!container || !sticky) return;

			const rect = container.getBoundingClientRect();
			const stickyDistance = container.offsetHeight - sticky.offsetHeight;
			if (stickyDistance <= 0) return;

			const p = Math.max(0, Math.min(1, -rect.top / stickyDistance));
			const prev = lastPRef.current;
			const atStart = p <= PROGRESS_EPS;
			const atEnd = p >= 1 - PROGRESS_EPS;
			if (
				prev >= 0 &&
				!atStart &&
				!atEnd &&
				Math.abs(p - prev) < PROGRESS_EPS
			) {
				return;
			}
			lastPRef.current = p;
			applyProgress(p);
		};

		const scheduleMeasure = () => {
			if (rafId !== null) return;
			rafId = requestAnimationFrame(() => {
				rafId = null;
				measureAndMaybeApply();
			});
		};

		measureAndMaybeApply();
		window.addEventListener('scroll', scheduleMeasure, { passive: true });
		return () => {
			window.removeEventListener('scroll', scheduleMeasure);
			if (rafId !== null) cancelAnimationFrame(rafId);
		};
	}, []);

	return (
		<div ref={containerRef} className="relative h-[200lvh]">
			{/* Sticky stage — full-bleed by escaping the max-w-screen-2xl main container */}
			<div
				ref={stickyRef}
				className="sticky top-0 h-[100lvh] overflow-hidden"
				style={{
					width: '100vw',
					marginLeft: 'calc(50% - 50vw)',
				}}
			>
				{/* Background — z-0 so gradient + black overlay stay above the image stack */}
				<TeamBackground />
				{/* Static gradient at the bottom so the card blends in */}
				<div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
				{/* Progressive dark overlay — grows with scroll progress */}
				<div
					ref={overlayRef}
					className="absolute inset-0 z-[2] bg-black pointer-events-none"
					style={{ opacity: 0 }}
				/>

				{/* Card — animates up from below */}
				<div
					ref={cardLiftRef}
					className="absolute inset-x-0 top-[50%] -translate-y-1/2 z-10 flex justify-center px-4 pb-0"
					style={{ transform: 'translateY(100lvh)' }}
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
