import { Card, CardContent } from '@/components/ui/card';
import About from '@/partials/home/About';
import Expectations from '@/partials/home/Expectations';
import EventLanding from '@/partials/home/Logos';
import Schedule from '@/partials/home/Schedule';
import Statistics from '@/partials/home/Statistics';
import Testimonial from '@/partials/home/Testimonial';
import { IfTFFeatureOn } from '@/lib/growthbook/react/client';

export const revalidate = 0;

export default function Home() {
	return (
		<div className='w-full'>
			<section className="relative isolate flex min-h-[calc(100vh-var(--header-height))] w-full flex-col overflow-hidden">
				<EventLanding />
			</section>
			<About />
			<Statistics />
			<div className="mx-auto w-full max-w-screen-2xl">
				<IfTFFeatureOn feature="tf-expectations-section">
					<Expectations />
				</IfTFFeatureOn>
				<IfTFFeatureOn feature="tf-schedule">
					<Schedule />
				</IfTFFeatureOn>
				<Testimonial />
			</div>
		</div>
	);
}
