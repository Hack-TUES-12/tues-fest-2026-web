import Link from 'next/link';

import { PROJECT_CATEGORY_MAP } from '@/constants/projects';
import { cn } from '@/lib/utils';

export function FilterSectionContainer({ children }: { children: React.ReactNode }) {
	return (
		<section>
			<div className="rounded-2xl border border-white/10 bg-card/50 px-6 py-5 backdrop-blur-xl">
				<div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
					{children}
				</div>
			</div>
		</section>
	);
}

interface CategoryLink {
	text: string;
	href: string;
	activeClass: string;
	inactiveClass: string;
}

interface CategoryLinkProps extends CategoryLink {
	isCurrent: boolean;
	search: string | null;
}

function CategoryLink({ text, href, isCurrent, search, activeClass, inactiveClass }: CategoryLinkProps) {
	return (
		<Link
			href={search ? `${href}?${new URLSearchParams({ search })}` : href}
			className={cn(
				'inline-flex items-center rounded-full border px-5 py-2 text-sm font-medium tracking-widest transition-all duration-200',
				isCurrent ? activeClass : inactiveClass
			)}
		>
			{text}
		</Link>
	);
}

const CATEGORIES = [
	{
		text: 'Всички',
		category: 'all',
		href: '/projects',
		activeClass: 'bg-white/15 border-white/40 text-white',
		inactiveClass: 'border-white/10 text-white/50 hover:border-white/30 hover:text-white/80',
	},
	{
		...PROJECT_CATEGORY_MAP.embedded,
		activeClass: 'bg-gradient-to-br from-primary/30 to-primary-end/30 border-primary text-primary',
		inactiveClass: 'border-primary/20 text-primary/50 hover:border-primary/50 hover:text-primary/80',
	},
	{
		...PROJECT_CATEGORY_MAP.software,
		activeClass: 'bg-gradient-to-br from-muted/30 to-muted-end/30 border-muted text-muted',
		inactiveClass: 'border-muted/20 text-muted/50 hover:border-muted/50 hover:text-muted/80',
	},
	{
		...PROJECT_CATEGORY_MAP.networks,
		text: 'Мрежи',
		activeClass: 'bg-gradient-to-br from-secondary/30 to-secondary-end/30 border-secondary text-secondary',
		inactiveClass: 'border-secondary/20 text-secondary/50 hover:border-secondary/50 hover:text-secondary/80',
	},
] as const;

export type CategoryLinkText = (typeof CATEGORIES)[number]['text'];

type CategoryLinkListProps = {
	current: CategoryLinkText | null;
	search: string | null;
};

export function FilterLinkList({ current, search }: CategoryLinkListProps) {
	return (
		<div className="flex flex-wrap justify-center gap-3 lg:justify-start">
			{CATEGORIES.map((link) => (
				<CategoryLink key={link.href} {...link} search={search} isCurrent={link.text === current} />
			))}
		</div>
	);
}
