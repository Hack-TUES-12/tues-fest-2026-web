'use client';

import { motion, useReducedMotion } from 'motion/react';

import type { ProjectType } from '@/app/projects/actions';
import { TF_TITLE } from '@/constants/seo';
import { sectionFadeUp } from '@/lib/motion/section-in-view';
import ProjectsPath, { type PathItem } from '@/partials/layout/ProjectsPath';
import { InteractiveProjectFilter } from '@/partials/projects/project-filter/static';
import { ProjectList } from '@/partials/projects/project-list';

const PATH: PathItem[] = [
	{ name: TF_TITLE, url: '/' },
	{ name: 'Проекти', url: '' },
];

export function ProjectsIndexClient({ projects }: { projects: readonly ProjectType[] }) {
	const reducedMotion = useReducedMotion();

	return (
		<>
			<motion.div {...sectionFadeUp(reducedMotion, 0)}>
				<ProjectsPath path={PATH} color="networks" maxWidth="6xl" />
			</motion.div>

			<motion.div {...sectionFadeUp(reducedMotion, 0.08)}>
				<InteractiveProjectFilter current="Всички" />
			</motion.div>

			<ProjectList projects={projects} />
		</>
	);
}
