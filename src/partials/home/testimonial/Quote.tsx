import Image, { StaticImageData } from 'next/image';
import { TbQuote } from 'react-icons/tb';

type Color = 'primary' | 'secondary' | 'accent' | 'muted';

const COLORS: Color[] = ['primary', 'secondary', 'accent', 'muted'];

const colorClasses: Record<
	Color,
	{ quote: string; name: string; ring: string; border: string; bg: string }
> = {
	primary: {
		quote: 'text-primary/20',
		name: 'text-primary',
		ring: 'ring-primary/40',
		border: 'hover:border-primary/30',
		bg: 'bg-primary/5',
	},
	secondary: {
		quote: 'text-secondary/20',
		name: 'text-secondary',
		ring: 'ring-secondary/40',
		border: 'hover:border-secondary/30',
		bg: 'bg-secondary/5',
	},
	accent: {
		quote: 'text-accent/20',
		name: 'text-accent',
		ring: 'ring-accent/40',
		border: 'hover:border-accent/30',
		bg: 'bg-accent/5',
	},
	muted: {
		quote: 'text-muted/20',
		name: 'text-muted',
		ring: 'ring-muted/40',
		border: 'hover:border-muted/30',
		bg: 'bg-muted/5',
	},
};

const Quote = ({
	img,
	name,
	text,
	desc,
	colorIndex = 0,
}: {
	img: StaticImageData;
	name: string;
	text: string;
	desc: string;
	colorIndex?: number;
}) => {
	const color = COLORS[colorIndex % 4];
	const cls = colorClasses[color];

	return (
		<div
			className={`relative flex w-full flex-col gap-5 rounded-2xl border border-white/10 backdrop-blur-sm transition-all duration-300 ${cls.bg} ${cls.border} p-6 sm:p-8`}
		>
			{/* Large decorative quote mark */}
			<TbQuote className={`absolute top-5 right-5 size-14 rotate-180 ${cls.quote}`} />

			{/* Quote text */}
			<p className="relative z-10 text-base leading-relaxed text-white/70 sm:text-lg">
				{text}
			</p>

			{/* Author row */}
			<div className={`flex items-center gap-4 border-t border-white/10 pt-5`}>
				<Image
					src={img}
					alt={name}
					width={48}
					height={48}
					className={`size-12 shrink-0 rounded-full object-cover ring-2 ${cls.ring}`}
				/>
				<div className="flex flex-col gap-0.5">
					<span className={`font-semibold leading-tight ${cls.name}`}>{name}</span>
					<span className="text-xs leading-snug text-white/40">{desc}</span>
				</div>
			</div>
		</div>
	);
};

export default Quote;
