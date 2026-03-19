import { Card, CardContent } from '@/components/ui/card';
import About from '@/partials/home/About';
import Expectations from '@/partials/home/Expectations';
import EventLanding from '@/partials/home/Logos';
import Schedule from '@/partials/home/Schedule';
import Statistics from '@/partials/home/Statistics';
import Testimonial from '@/partials/home/Testimonial';

export const revalidate = 0;

export default function Home() {
	return (
		<>
			<section className="flex min-h-[calc(100vh-var(--header-height))] w-full flex-col items-center justify-center gap-4 overflow-hidden p-1 pt-4 sm:p-4 md:gap-16 ">
				{/* Background decorations */}
				<img
					src="/decorations/purple-circle.svg"
					alt=""
					aria-hidden="true"
					className="pointer-events-none absolute left-[calc(50%-50vw)] top-0 w-[55vw] min-w-md max-w-2xl -translate-x-1/2 -translate-y-1/2 select-none"
					style={{ zIndex: -1 }}
				/>
				<img
					src="/decorations/green-circle.svg"
					alt=""
					aria-hidden="true"
					className="pointer-events-none min-w-xs absolute bottom-0 right-[calc(50%-50vw)] w-[40vw] max-w-xl translate-x-1/3 hidden md:block translate-y-1/3 select-none"
					style={{ zIndex: -1 }}
				/>
				
				<EventLanding />
			</section>
			<About />
			<Statistics />
			<div className="mx-auto w-full max-w-screen-2xl">
				<Expectations />
				<Schedule />
					<Testimonial />
			</div>
		</>
	);
}
