'use client';

import React from 'react';
import Link from 'next/link';
import { TbChevronRight, TbHome } from 'react-icons/tb';

export type PathItem = {
	name: string;
	url: string;
};

const ProjectsPath = ({ path }: { path?: PathItem[] | null | undefined }) => {
	if (!path) return null;

	return (
		<nav aria-label="breadcrumb">
			<div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3">
				<ol className="flex flex-wrap items-center gap-1.5 text-sm">
					{path.map((item, index) => {
						const isLast = index === path.length - 1;
						const isFirst = index === 0;

						return (
							<React.Fragment key={item?.url || `end-${index}`}>
								<li className="inline-flex items-center gap-1.5">
									{item?.url ? (
										<Link
											href={item.url}
											className="inline-flex items-center gap-1.5 tracking-wide text-white/50 transition-colors duration-200 hover:text-white/90"
										>
											{isFirst && <TbHome className="size-3.5 shrink-0" />}
											{item.name}
										</Link>
									) : (
										<span
											aria-current="page"
											className="font-medium tracking-wide text-white"
										>
											{item.name}
										</span>
									)}
								</li>

								{!isLast && (
									<li role="presentation" aria-hidden="true">
										<TbChevronRight className="size-3.5 text-white/25" />
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
