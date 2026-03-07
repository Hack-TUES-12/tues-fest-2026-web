import type { ProjectCategory } from '@/constants/projects';

const CATEGORY_CIRCLE: Record<ProjectCategory | 'all', string> = {
	all: '/decorations/blue-circle.svg',
	embedded: '/decorations/purple-circle.svg',
	software: '/decorations/green-circle.svg',
	networks: '/decorations/orange-circle.svg',
	battlebot: '/decorations/blue-circle.svg',
};

export function ProjectContainer({
	children,
	category = 'all',
}: {
	children: React.ReactNode;
	category?: ProjectCategory | 'all';
}) {
	const circle = CATEGORY_CIRCLE[category];

	return (
		<div className="container mx-auto space-y-5 px-3 pb-5 pt-10">
			<img
				src={circle}
				alt=""
				aria-hidden="true"
				className="pointer-events-none fixed left-0 top-0 min-w-lg w-[60vw] -translate-x-1/2 -translate-y-1/2 select-none"
				style={{ zIndex: -1 }}
			/>
			<img
				src={circle}
				alt=""
				aria-hidden="true"
				className="pointer-events-none fixed bottom-0 right-0 min-w-sm w-[45vw] translate-x-1/2 translate-y-1/2 select-none"
				style={{ zIndex: -1 }}
			/>
			{children}
		</div>
	);
}
