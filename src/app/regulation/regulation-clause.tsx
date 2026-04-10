import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

export function RegulationClause({
	id,
	n,
	children,
	className,
}: {
	id: string;
	n: string;
	children: ReactNode;
	className?: string;
}) {
	return (
		<h3
			id={id}
			className={cn(
				'mt-5 scroll-mt-28 text-base font-semibold leading-relaxed text-white first:mt-0 md:text-[1.0625rem]',
				className,
			)}
		>
			<span className="text-primary">{n}</span> <span className="font-normal text-foreground/85">{children}</span>
		</h3>
	);
}
