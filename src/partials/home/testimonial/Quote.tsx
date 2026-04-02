import Image, { StaticImageData } from 'next/image';

type Color = 'primary' | 'secondary' | 'accent' | 'muted';

const COLORS: Color[] = ['primary', 'secondary', 'accent', 'muted'];

const colorClasses: Record<Color, { name: string; ring: string; circleBg: string }> = {
	primary: {
		name: 'text-primary',
		ring: 'ring-primary/50',
		circleBg: 'bg-primary',
	},
	secondary: {
		name: 'text-secondary',
		ring: 'ring-secondary/50',
		circleBg: 'bg-secondary',
	},
	accent: {
		name: 'text-accent',
		ring: 'ring-accent/50',
		circleBg: 'bg-accent',
	},
	muted: {
		name: 'text-muted-foreground',
		ring: 'ring-muted-foreground/50',
		circleBg: 'bg-muted-foreground',
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
	const color = COLORS[(colorIndex ?? 0) % 4] ?? 'primary';
	const cls = colorClasses[color];

	return (
		<div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-12">
			{/* Left: portrait with colored circle background */}
			<div className="relative flex-shrink-0 md:pt-2">
				<div className="relative h-56 w-56 md:h-64 md:w-64">
					{/* Offset colored circle */}
					<div
						className={`absolute inset-0 translate-x-3 translate-y-3 rounded-full ${cls.circleBg} opacity-90`}
					/>
					{/* Photo */}
					<div className={`absolute inset-0 overflow-hidden rounded-full ring-4 ${cls.ring}`}>
						<Image src={img} alt={name} fill className="object-cover object-top" />
					</div>
				</div>
			</div>

			{/* Right: quote content */}
			<div className="flex flex-1 flex-col gap-4">

				{/* Quote text */}
				<div className='relative'>
					{/* Decorative opening quotes */}
					<span className="absolute top-0 left-0 -translate-y-[30%] -translate-x-[25%] font-serif text-[300px] leading-none text-white/10 select-none">&ldquo;</span>
					<p className="-mt-4 text-base leading-relaxed text-white/70 sm:text-lg">{text}</p>
				</div>

				{/* Name + description */}
				<div className="mt-2 flex flex-col gap-1">
					<span className={`font-title text-2xl font-bold italic ${cls.name}`}>{name}</span>
					<span className="text-sm text-white/40">{desc}</span>
				</div>
			</div>
		</div>
	);
};

export default Quote;
