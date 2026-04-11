import About from '@/partials/home/About';
import Expectations from '@/partials/home/Expectations';
import EventLanding from '@/partials/home/Logos';
import { OrganizersSection } from '@/partials/home/OrganizersSection';
import Schedule from '@/partials/home/Schedule';
import Statistics from '@/partials/home/Statistics';
import Testimonial from '@/partials/home/Testimonial';
import { IfTFFeatureOn } from '@/lib/growthbook/react/client';

export const revalidate = 0;

export default function Home() {
	return (
		<div className='w-full'>
			<section className="relative isolate mx-[calc(50%-50vw)] flex min-h-[calc(100vh-var(--header-height))] w-screen max-w-[100vw] flex-col overflow-hidden">
				<EventLanding />
			</section>
			<About />
			<IfTFFeatureOn feature="tf-expectations-section">
				<Expectations />
			</IfTFFeatureOn>
			<OrganizersSection />
			<Statistics />
			<div className="mx-auto w-full max-w-screen-2xl">
				<IfTFFeatureOn feature="tf-schedule">
					<Schedule />
				</IfTFFeatureOn>
				<Testimonial />
			</div>
		</div>
	);
}
