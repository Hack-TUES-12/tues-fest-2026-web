'use client';

import { useEffect, useRef, useState } from 'react';

import { TESTIMONIALS, TESTIMONIALS_TITLE } from '@/constants/home/testimonials';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import Quote from './testimonial/Quote';

const STICKY_TOP = 80; // px from viewport top where cards stick
const MARGIN_Y = 10; // vertical offset (px) added per stacked card

const Testimonial = () => {
	const containerRef = useRef<HTMLUListElement>(null);
	const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
	const cardHeightsRef = useRef<number[]>([]);
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
	const selected = selectedIndex !== null ? TESTIMONIALS[selectedIndex] : null;

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		let animationId: number | null = null;
		let listenerAttached = false;

		const refreshCardHeights = () => {
			const next: number[] = [];
			cardRefs.current.forEach((card, i) => {
				if (card) next[i] = card.offsetHeight;
			});
			cardHeightsRef.current = next;
		};

		refreshCardHeights();

		const resizeObserver = new ResizeObserver(() => {
			refreshCardHeights();
		});
		cardRefs.current.forEach((card) => {
			if (card) resizeObserver.observe(card);
		});

		const animate = () => {
			const containerTop = container.getBoundingClientRect().top;
			const heights = cardHeightsRef.current;

			cardRefs.current.forEach((card, i) => {
				if (!card) return;
				let cardHeight = heights[i];
				if (cardHeight == null || cardHeight <= 0) {
					cardHeight = card.offsetHeight;
					heights[i] = cardHeight;
				}
				// How many px past this card's natural sticky threshold we've scrolled
				const scrolled = STICKY_TOP - containerTop - i * (cardHeight + MARGIN_Y);

				if (scrolled > 0) {
					const scale = Math.max((cardHeight - scrolled * 0.05) / cardHeight, 0.82);
					card.style.transform = `translate3d(0, ${MARGIN_Y * i}px, 0) scale(${scale})`;
				} else {
					card.style.transform = `translate3d(0, ${MARGIN_Y * i}px, 0)`;
				}
			});

			animationId = null;
		};

		const onScroll = () => {
			if (animationId) return;
			animationId = requestAnimationFrame(animate);
		};

		const observer = new IntersectionObserver((entries) => {
			const entry = entries[0];
			if (!entry) return;

			if (entry.isIntersecting) {
				if (listenerAttached) return;
				window.addEventListener('scroll', onScroll, { passive: true });
				listenerAttached = true;
			} else {
				if (!listenerAttached) return;
				window.removeEventListener('scroll', onScroll);
				listenerAttached = false;
			}
		});

		observer.observe(container);

		return () => {
			resizeObserver.disconnect();
			observer.disconnect();
			if (listenerAttached) window.removeEventListener('scroll', onScroll);
			if (animationId) cancelAnimationFrame(animationId);
		};
	}, []);

	return (
		<section id='testimonial' className="relative px-4 py-12 md:px-8">
			{/* Section header */}
			<div className="mb-24 flex flex-col items-center gap-2 text-center">
				<p className="text-primary tracking-widest">Какво казват за нас</p>
				<h2 className="font-title text-4xl text-white md:text-5xl">{TESTIMONIALS_TITLE}</h2>
			</div>

			{/* Stacking cards list */}
			<ul ref={containerRef} className="mx-auto max-w-4xl">
				{TESTIMONIALS.map((item, i) => (
					<li
						key={i}
						ref={(el) => {
							cardRefs.current[i] = el;
						}}
						className="sticky min-h-[100vh]"
						style={{ top: `${STICKY_TOP}px`, transformOrigin: 'center top' }}
					>
					<button
						onClick={() => setSelectedIndex(i)}
						className="w-full cursor-pointer rounded-2xl border border-white/10 bg-card p-8 shadow-2xl text-left transition-colors hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 max-h-[calc(100vh-6rem)] overflow-y-auto"
					>
							<Quote
								img={item.img}
								name={item.testimonyName}
								text={item.testimonyBody}
								desc={item.testimonyDesc}
								colorIndex={i}
							/>
						</button>
					</li>
				))}
			</ul>

			{/* Detail dialog */}
			<Dialog open={selectedIndex !== null} onOpenChange={(open) => !open && setSelectedIndex(null)}>
				<DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-3xl border-white/10 bg-card p-8 max-h-[90vh] overflow-y-auto">
					{selected && (
						<Quote
							img={selected.img}
							name={selected.testimonyName}
							text={selected.testimonyBody}
							desc={selected.testimonyDesc}
							colorIndex={selectedIndex!}
							vertical
						/>
					)}
				</DialogContent>
			</Dialog>
		</section>
	);
};

export default Testimonial;
