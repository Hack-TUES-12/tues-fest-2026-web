import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { type ExpectationIllustrationAspect, EXPECTATIONS } from '@/constants/home/expectations';
import { IfTFFeatureOn } from '@/lib/growthbook/react/client';

import { ExpectationIllustration } from './expectation-illustration';
import { ExpectationsSectionDecorations } from './expectations-section-decorations';

const HEADING_TONE = ['text-primary', 'text-secondary', 'text-accent'] as const;

function ExpectationRow({
	title,
	text,
	index,
	reverse,
	illustrationAspect,
}: {
	title: string;
	text: string;
	index: number;
	reverse: boolean;
	illustrationAspect: ExpectationIllustrationAspect;
}) {
	const tone = HEADING_TONE[index % HEADING_TONE.length];

	const card = (
		<div
			className={`flex flex-col justify-center gap-3 rounded-[1.5rem] bg-[#1a1a1a] px-8 py-8 text-center lg:min-h-[200px] lg:px-10 lg:py-10 ${reverse ? 'lg:text-right' : 'lg:text-left'}`}
		>
			<h3 className={`font-title text-2xl font-semibold md:text-3xl ${tone}`}>{title}</h3>
			<p className="text-sm leading-relaxed text-white/60 md:text-base">{text}</p>
		</div>
	);

	const illus = (
		<div
			className={
				reverse
					? 'flex w-full shrink-0 justify-center max-lg:mx-auto lg:h-full lg:min-h-0 lg:w-full lg:justify-start'
					: 'flex w-full shrink-0 justify-center max-lg:mx-auto lg:h-full lg:min-h-0 lg:w-full lg:justify-end'
			}
		>
			<ExpectationIllustration
				index={index}
				title={title}
				illustrationAspect={illustrationAspect}
			/>
		</div>
	);

	return (
		<div
			className={
				reverse
					? 'grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-stretch lg:gap-12'
					: 'grid gap-8 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-stretch lg:gap-12'
			}
		>
			{reverse ? (
				<>
					<div className="min-w-0 max-lg:order-2 lg:order-1">{card}</div>
					<div className="min-h-0 min-w-0 max-lg:order-1 lg:order-2">{illus}</div>
				</>
			) : (
				<>
					<div className="min-h-0 min-w-0">{illus}</div>
					<div className="min-w-0">{card}</div>
				</>
			)}
		</div>
	);
}

const Expectations = () => (
	<section
		id="expectations"
		className="relative isolate mx-[calc(50%-50vw)] w-screen max-w-[100vw] bg-black px-4 py-16 md:px-8 md:py-24"
	>
		<div
			className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
			aria-hidden
		>
			<ExpectationsSectionDecorations />
		</div>
		<div className="relative z-10 mx-auto max-w-6xl">
			<div className="mb-14 flex flex-col items-center gap-2 text-center md:mb-20">
				<p className="text-accent tracking-widest">На живо</p>
				<h2 className="font-title text-4xl text-white md:text-5xl">На ТУЕС Фест очаквайте</h2>
			</div>

			<div className="flex flex-col max-w-5xl mx-auto gap-16 md:gap-20 lg:gap-24">
				{EXPECTATIONS.map((expectation, i) => (
					<ExpectationRow
						key={expectation.title}
						title={expectation.title}
						text={expectation.text}
						index={i}
						reverse={i % 2 === 1}
						illustrationAspect={expectation.illustrationAspect}
					/>
				))}
			</div>

			<IfTFFeatureOn feature="tf-schedule">
				<div className="mt-16 flex justify-center md:mt-20">
					<Button asChild variant="default" size="lg" className="w-fit font-bold">
						<Link href="/schedule">Виж програмата</Link>
					</Button>
				</div>
			</IfTFFeatureOn>
		</div>
	</section>
);

export default Expectations;
