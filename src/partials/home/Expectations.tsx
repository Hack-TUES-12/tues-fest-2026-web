import { EXPECTATIONS } from '@/constants/home/expectations';

import { ExpectationIllustration } from './expectation-illustration';

const HEADING_TONE = ['text-primary', 'text-secondary', 'text-accent'] as const;

function ExpectationRow({
	title,
	text,
	index,
	reverse,
}: {
	title: string;
	text: string;
	index: number;
	reverse: boolean;
}) {
	const tone = HEADING_TONE[index % HEADING_TONE.length];

	const card = (
		<div
			className={`flex flex-col justify-center gap-3 rounded-[1.5rem] bg-[#1a1a1a] px-8 py-8 lg:min-h-[200px] lg:px-10 lg:py-10 ${reverse ? 'text-right' : 'text-left'}`}
		>
			<h3 className={`font-title text-2xl font-semibold md:text-3xl ${tone}`}>{title}</h3>
			<p className="text-sm leading-relaxed text-white/60 md:text-base">{text}</p>
		</div>
	);

	const illus = (
		<div className="flex shrink-0 items-center justify-center lg:w-[min(100%,32%)]">
			<ExpectationIllustration index={index} title={title} />
		</div>
	);

	return (
		<div
			className={
				reverse
					? 'grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(180px,32%)] lg:items-center lg:gap-12'
					: 'grid gap-8 lg:grid-cols-[minmax(180px,32%)_minmax(0,1fr)] lg:items-center lg:gap-12'
			}
		>
			{reverse ? (
				<>
					<div className="min-w-0 lg:order-1">{card}</div>
					<div className="min-w-0 lg:order-2">{illus}</div>
				</>
			) : (
				<>
					<div className="min-w-0">{illus}</div>
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
		<div className="mx-auto max-w-6xl">
			<div className="mb-14 flex flex-col items-center gap-2 text-center md:mb-20">
				<p className="text-accent tracking-widest">На живо</p>
				<h2 className="font-title text-4xl text-white md:text-5xl">На ТУЕС Фест очаквайте</h2>
			</div>

			<div className="flex flex-col gap-16 md:gap-20 lg:gap-24">
				{EXPECTATIONS.map((expectation, i) => (
					<ExpectationRow
						key={expectation.title}
						title={expectation.title}
						text={expectation.text}
						index={i}
						reverse={i % 2 === 1}
					/>
				))}
			</div>
		</div>
	</section>
);

export default Expectations;
