'use client';

import { motion, useReducedMotion } from 'motion/react';
import { TbPlus } from 'react-icons/tb';

import { Contributor } from '@/app/projects/[projectId]/page';
import { Card } from '@/components/ui/card';
import { isProjectCategory, PROJECT_CATEGORY_TEXT_CLASS } from '@/constants/projects';
import { listItemEntrance, listItemIconEntrance } from '@/lib/motion/section-in-view';
import { cn } from '@/lib/utils';

/** "11 В" → "11в" style line suffix next to the name */
function compactClassLabel(classStr: string) {
	return classStr.replace(/\s+/g, '').toLowerCase();
}

const Contributors = ({
	contributors,
	category,
}: {
	contributors: readonly Contributor[];
	category: string;
}) => {
	const reducedMotion = useReducedMotion();
	const accentTextClass = isProjectCategory(category)
		? PROJECT_CATEGORY_TEXT_CLASS[category]
		: PROJECT_CATEGORY_TEXT_CLASS.software;

	return (
		<Card className="rounded-2xl bg-card/50 backdrop-blur-sm px-6 py-4">
			<div className="flex flex-col gap-2">
				<p
					className={cn(
						'text-2xl font-mono font-bold',
						accentTextClass,
					)}
				>
					{contributors.length > 1 ? 'Участници' : 'Автор'}
				</p>
				<ul className="flex flex-col gap-3 px-2">
					{contributors.map((creator, index) => (
						<motion.li
							key={creator?.name}
							className="flex items-center gap-2"
							{...listItemEntrance(reducedMotion, index)}
						>
							<motion.span
								className="inline-flex shrink-0 origin-center"
								{...listItemIconEntrance(reducedMotion, index)}
							>
								<TbPlus
									className={cn('size-7 stroke-[3.5]', accentTextClass)}
									aria-hidden
								/>
							</motion.span>
							<span className="font-mono text-sm tracking-wide text-white md:text-base">
								{creator.name} {compactClassLabel(creator.class)}
							</span>
						</motion.li>
					))}
				</ul>
			</div>
		</Card>
	);
};

export default Contributors;
