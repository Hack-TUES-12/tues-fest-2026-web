import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ABOUT_IMAGE } from '@/constants/home/about';
import { TF_DATE_STRING, TF_LOCATION, TF_YEAR } from '@/constants/event';

const About = () => (
	<section id="about" className="relative overflow-hidden px-4 py-12 md:px-8">
		<div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center">

			{/* Title area — circle is positioned relative to this wrapper */}
			<div className="relative flex w-full flex-col items-center gap-1">
				{/* Subtitle */}
				<p className="text-xl text-white tracking-widest">Какво е</p>

				{/* Title */}
				<h2 className="relative z-10 font-mighty text-7xl leading-none text-primary md:text-8xl">
					TUES Fest
				</h2>

				{/* Purple circle decoration: top starts at bottom of title area, centered, 75vw wide */}
				<img
					src="/decorations/purple-circle.svg"
					alt=""
					aria-hidden="true"
					className="pointer-events-none absolute max-w-3xl min-w-lg"
					style={{
						top: '100%',
						left: '50%',
						transform: 'translateX(-50%)',
						width: '50vw',
					}}
				/>
			</div>

			{/* Content below title — z-10 to appear above the circle decoration */}
			<div className="relative z-10 flex w-full flex-col items-center gap-8">
				{/* Main text */}
				<p className="max-w-2xl">
					Денят на отворените врати на Технологично училище &quot;Електронни системи&quot; към
					Техническия университет - София, познат като ТУЕС ФЕСТ, наближава.
				</p>

				{/* Cards grid */}
				<div className="grid w-full grid-cols-1 gap-4 text-left md:grid-cols-2">
					<Card className="px-8 py-7">
						<CardContent className="p-0">
							<h3 className="mb-2 text-2xl font-bold text-primary">Кога и къде?</h3>
							<p className="text-md text-foreground/80">
								ТУЕС ФЕСТ {TF_YEAR} ще се проведе на {TF_DATE_STRING} на територията на площад
								&quot;Независимост&quot; под куполите на &quot;Ларгото&quot;, София.
							</p>
						</CardContent>
					</Card>

					<Card className="px-8 py-7">
						<CardContent className="p-0">
							<h3 className="mb-2 text-2xl font-bold text-primary">Какво ще видите?</h3>
							<p className="text-xl text-foreground/80">
								Ще имате възможност да се запознаете с ТУЕС към ТУ-София отблизо и с това какво ни прави
								различното училище.
							</p>
						</CardContent>
					</Card>
				</div>

				{/* CTA button */}
				<Button asChild variant="default" size="lg" className="font-bold">
					<Link href="/schedule">Виж програмата</Link>
				</Button>
			</div>
		</div>

		{/* Photo (commented out) */}
		{/* <div className="mt-8 overflow-hidden rounded-lg">
			<img
				src={ABOUT_IMAGE || '/placeholder.svg'}
				alt="TUES FEST"
				className="aspect-video w-full rounded-lg object-cover object-bottom shadow-md transition-all duration-300 hover:scale-105"
			/>
		</div> */}
	</section>
);

export default About;
