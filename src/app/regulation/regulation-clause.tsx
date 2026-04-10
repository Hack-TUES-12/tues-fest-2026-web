'use client';

import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

import { regulationAccentClauseNumberClass, useRegulationAccent } from './regulation-accent';

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
	const accent = useRegulationAccent();

	return (
		<h3
			id={id}
			className={cn(
				'mt-5 scroll-mt-28 text-base font-semibold leading-relaxed text-white first:mt-0 md:text-[1.0625rem]',
				className,
			)}
		>
			<span className={regulationAccentClauseNumberClass(accent)}>{n}</span>{' '}
			<span className="font-normal text-foreground/85">{children}</span>
		</h3>
	);
}
