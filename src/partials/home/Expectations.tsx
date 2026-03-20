import type { ReactElement } from 'react';

import { EXPECTATIONS } from '@/constants/home/expectations';

const Expectation = ({
	icon,
	title,
	text,
	index,
}: {
	icon: ReactElement;
	title: string;
	text: string;
	index: number;
}) => (
	<div className="group flex flex-col gap-4 rounded-2xl border border-white/10 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-accent/30 hover:bg-card/80">
		{/* Number + icon row */}
		<div className="flex items-center justify-between">
			<div className="flex size-11 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent/20">
				{icon}
			</div>
			<span className="font-mighty text-4xl leading-none text-white/5 transition-colors duration-300 group-hover:text-accent/20">
				{String(index + 1).padStart(2, '0')}
			</span>
		</div>

		{/* Text */}
		<div className="flex flex-col gap-2">
			<h3 className="text-lg font-semibold text-white">{title}</h3>
			<p className="text-sm leading-relaxed text-white/60">{text}</p>
		</div>
	</div>
);

const Expectations = () => (
	<section id="expectations" className="px-4 py-12 md:px-8">
		{/* Section header */}
		<div className="mb-10 flex flex-col items-center gap-2 text-center">
			<p className="text-accent tracking-widest">На живо</p>
			<h2 className="font-title text-4xl text-white md:text-5xl">На ТУЕС Фест очаквайте</h2>
		</div>

		<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{EXPECTATIONS.map((expectation, i) => (
				<Expectation key={expectation.title} {...expectation} index={i} />
			))}
		</div>
	</section>
);

export default Expectations;
