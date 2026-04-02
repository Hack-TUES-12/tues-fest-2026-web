'use client';

import { useCallback, useRef, useState } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	type CarouselApi,
} from '@/components/ui/carousel';
import { TESTIMONIALS, TESTIMONIALS_TITLE } from '@/constants/home/testimonials';
import Quote from './testimonial/Quote';

const Testimonial = () => {
	const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));
	const [api, setApi] = useState<CarouselApi>();

	const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
	const scrollNext = useCallback(() => api?.scrollNext(), [api]);

	return (
		<section className="relative px-4 py-12 md:px-8">
			{/* Section header */}
			<div className="mb-12 flex flex-col items-center gap-2 text-center">
				<p className="text-primary tracking-widest">Казват за нас</p>
				<h2 className="font-title text-4xl text-white md:text-5xl">{TESTIMONIALS_TITLE}</h2>
			</div>

			{/* Carousel */}
			<div className="flex justify-center">
				<Carousel
					opts={{ loop: true }}
					className="w-full max-w-4xl"
					plugins={[plugin.current]}
					setApi={setApi}
					onMouseEnter={plugin.current.stop}
					onMouseLeave={plugin.current.reset}
				>
					<CarouselContent>
						{TESTIMONIALS.map((item, index) => (
							<CarouselItem key={item.img.src} className="self-center">
								<Quote
									img={item.img}
									name={item.testimonyName}
									text={item.testimonyBody}
									desc={item.testimonyDesc}
									colorIndex={index}
								/>
							</CarouselItem>
						))}
					</CarouselContent>

					{/* Nav buttons – bottom-right, aligned with the right (text) column */}
					<div className="mt-8 flex justify-end gap-3">
						<button
							onClick={scrollPrev}
							aria-label="Previous slide"
							className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-card/50 text-white/50 backdrop-blur-sm transition-colors hover:border-primary/30 hover:text-primary"
						>
							<ArrowLeft className="size-4" />
						</button>
						<button
							onClick={scrollNext}
							aria-label="Next slide"
							className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-card/50 text-white/50 backdrop-blur-sm transition-colors hover:border-primary/30 hover:text-primary"
						>
							<ArrowRight className="size-4" />
						</button>
					</div>
				</Carousel>
			</div>
		</section>
	);
};

export default Testimonial;
