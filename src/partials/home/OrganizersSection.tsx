'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TF_SLOGAN, TF_YEAR } from '@/constants/event';

import { TeamBackground } from './TeamBackground';

export const OrganizersSection = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			if (!containerRef.current) return;
			const rect = containerRef.current.getBoundingClientRect();
			const stickyDistance = containerRef.current.offsetHeight - window.innerHeight;
			if (stickyDistance <= 0) return;
			const p = Math.max(0, Math.min(1, -rect.top / stickyDistance));
			setProgress(p);
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Card starts 100vh below its final resting spot and rises to translateY(0)
	const cardY = (1 - progress) * 100;

	return (
		<div ref={containerRef} className="relative" style={{ height: '200vh' }}>
			{/* Sticky stage — stays in viewport while container scrolls */}
			<div className="sticky top-0 h-screen">
				{/* Background */}
				<TeamBackground />
				<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

				{/* Card — animates up from below */}
				<div
					className="absolute inset-x-0 top-[50%] -translate-y-1/2 z-10 flex justify-center px-4 pb-0"
					style={{ transform: `translateY(${cardY}vh)` }}
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
