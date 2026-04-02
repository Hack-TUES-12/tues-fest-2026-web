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
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
	const selected = selectedIndex !== null ? TESTIMONIALS[selectedIndex] : null;

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		let animationId: number | null = null;
		let listenerAttached = false;

		const animate = () => {
			const containerTop = container.getBoundingClientRect().top;

			cardRefs.current.forEach((card, i) => {
				if (!card) return;
				const cardHeight = card.offsetHeight;
				// How many px past this card's natural sticky threshold we've scrolled
				const scrolled = STICKY_TOP - containerTop - i * (cardHeight + MARGIN_Y);

				if (scrolled > 0) {
					const scale = Math.max((cardHeight - scrolled * 0.05) / cardHeight, 0.82);
					card.style.transform = `translateY(${MARGIN_Y * i}px) scale(${scale})`;
				} else {
					card.style.transform = `translateY(${MARGIN_Y * i}px)`;
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
			observer.disconnect();
			if (listenerAttached) window.removeEventListener('scroll', onScroll);
			if (animationId) cancelAnimationFrame(animationId);
		};
	}, []);

	return (
		<section className="relative px-4 py-12 md:px-8">
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
							className="w-full cursor-pointer rounded-2xl border border-white/10 bg-card p-8 shadow-2xl text-left transition-colors hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
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
