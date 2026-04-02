'use client';

import { useCallback, useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { TESTIMONIALS, TESTIMONIALS_TITLE } from '@/constants/home/testimonials';
import Quote from './testimonial/Quote';

const AUTOPLAY_DELAY = 5000;

const Testimonial = () => {
	const [current, setCurrent] = useState(0);
	const [paused, setPaused] = useState(false);
	const total = TESTIMONIALS.length;

	const prev = useCallback(() => setCurrent(i => (i - 1 + total) % total), [total]);
	const next = useCallback(() => setCurrent(i => (i + 1) % total), [total]);

	useEffect(() => {
		if (paused) return;
		const id = setInterval(next, AUTOPLAY_DELAY);
		return () => clearInterval(id);
	}, [paused, next]);

	const item = TESTIMONIALS[current]!;

	return (
		<section className="relative px-4 py-12 md:px-8">
			{/* Section header */}
			<div className="mb-24 flex flex-col items-center gap-2 text-center">
				<p className="text-primary tracking-widest">Казват за нас</p>
				<h2 className="font-title text-4xl text-white md:text-5xl">{TESTIMONIALS_TITLE}</h2>
			</div>

			{/* Slide */}
			<div
				className="flex justify-center"
				onMouseEnter={() => setPaused(true)}
				onMouseLeave={() => setPaused(false)}
			>
				<div className="w-full max-w-4xl">
					<Quote
						key={current}
						img={item.img}
						name={item.testimonyName}
						text={item.testimonyBody}
						desc={item.testimonyDesc}
						colorIndex={current}
					/>

					{/* Nav buttons */}
					<div className="mt-8 flex justify-end gap-3">
						<button
							onClick={prev}
							aria-label="Previous slide"
							className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-card/50 text-white/50 backdrop-blur-sm transition-colors hover:border-primary/30 hover:text-primary"
						>
							<ArrowLeft className="size-4" />
						</button>
						<button
							onClick={next}
							aria-label="Next slide"
							className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-card/50 text-white/50 backdrop-blur-sm transition-colors hover:border-primary/30 hover:text-primary"
						>
							<ArrowRight className="size-4" />
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Testimonial;
