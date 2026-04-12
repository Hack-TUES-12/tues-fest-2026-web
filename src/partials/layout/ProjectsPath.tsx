'use client';

import React from 'react';
import Link from 'next/link';
import { TbChevronRight, TbHome } from 'react-icons/tb';
import { cn } from '@/lib/utils';

export type PathItem = {
	name: string;
	url: string;
};

const CATEGORY_STYLES: Record<string, string> = {
	software: 'bg-gradient-to-br from-muted/20 to-muted-end/20 border border-muted text-muted',
	embedded: 'bg-gradient-to-br from-primary/20 to-primary-end/20 border border-primary text-primary',
	networks: 'bg-gradient-to-br from-accent/20 to-accent/20 border border-accent text-accent',
	battlebot: 'bg-gradient-to-br from-accent/20 to-accent/20 border border-accent text-accent',
};

const ProjectsPath = ({
	path,
	color,
	maxWidth = '4xl',
}: {
	path?: PathItem[] | null | undefined;
	color: 'software' | 'embedded' | 'networks' | 'battlebot';
	/** Listing pages use `6xl`; project detail uses `4xl` (default). */
	maxWidth?: '4xl' | '6xl';
}) => {
	if (!path) return null;

	return (
		<nav
			aria-label="breadcrumb"
			className={cn('mx-auto', maxWidth === '6xl' ? 'max-w-6xl' : 'max-w-4xl')}
		>
			<div className="rounded-2xl bg-card/50 px-6 py-4 backdrop-blur-xl">
				<ol className={cn(
					"w-fit rounded-3xl sm:rounded-4xl px-3 py-2 flex flex-wrap items-center gap-1.5 text-sm",
					CATEGORY_STYLES[color]
				)}>
					{path.map((item, index) => {
						const isLast = index === path.length - 1;
						const isFirst = index === 0;

						return (
							<React.Fragment key={item?.url || `end-${index}`}>
								<li className="inline-flex items-center gap-1.5">
									{item?.url ? (
										<Link
											href={item.url}
											className="inline-flex items-center gap-1.5 tracking-wide transition-colors duration-200 hover:text-white/90"
										>
											{isFirst && <TbHome className="size-3.5 shrink-0" />}
											{item.name}
										</Link>
									) : (
										<span
											aria-current="page"
											className="font-medium tracking-wide"
										>
											{item.name}
										</span>
									)}
								</li>

								{!isLast && (
									<li role="presentation" aria-hidden="true">
										<TbChevronRight className="size-3.5" />
									</li>
								)}
							</React.Fragment>
						);
					})}
				</ol>
			</div>
		</nav>
	);
};

export default ProjectsPath;
