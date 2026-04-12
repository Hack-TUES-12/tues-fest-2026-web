'use client';

import type { ProjectType } from '@/app/projects/actions';
import { TF_TITLE } from '@/constants/seo';
import ProjectsPath, { type PathItem } from '@/partials/layout/ProjectsPath';
import { InteractiveProjectFilter } from '@/partials/projects/project-filter/static';
import { ProjectList } from '@/partials/projects/project-list';

const PATH: PathItem[] = [
	{ name: TF_TITLE, url: '/' },
	{ name: 'Проекти', url: '' },
];

export function ProjectsIndexClient({ projects }: { projects: readonly ProjectType[] }) {
	return (
		<>
			{/* No `whileInView` here: Safari often fails to fire in-view for the listing header after navigations, leaving breadcrumb/filter at opacity 0. */}
			<ProjectsPath path={PATH} color="networks" maxWidth="6xl" />
			<InteractiveProjectFilter current="Всички" />
			<ProjectList projects={projects} />
		</>
	);
}
