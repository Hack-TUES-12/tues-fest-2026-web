'use client';

import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import { TESTIMONIALS, TESTIMONIALS_TITLE } from '@/constants/home/testimonials';
import Quote from './testimonial/Quote';

const Testimonial = () => {
	const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

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
					className="w-full max-w-3xl"
					plugins={[plugin.current]}
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

					{/* Custom nav buttons */}
					<CarouselPrevious className="border-white/10 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:bg-primary/10 hover:text-primary" />
					<CarouselNext className="border-white/10 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:bg-primary/10 hover:text-primary" />
				</Carousel>
			</div>
		</section>
	);
};

export default Testimonial;
