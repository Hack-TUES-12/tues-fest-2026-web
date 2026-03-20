import type { Metadata } from 'next';

import { TF_TITLE } from '@/constants/seo';
import { STANDARD_OG_IMAGE_SIZE } from '@/lib/opengraph/standard-opengraph-assets';
import ProjectsPath, { type PathItem } from '@/partials/layout/ProjectsPath';
import { ProjectContainer } from '@/partials/projects/project-container';
import { InteractiveProjectFilter } from '@/partials/projects/project-filter/static';
import { ProjectList } from '@/partials/projects/project-list';
import { getProjects } from './actions';

/** Ensures `/projects` has og:image / twitter:image (layout openGraph omits `images`). */
export const metadata: Metadata = {
	openGraph: {
		images: [
			{
				url: '/projects/opengraph-image',
				width: STANDARD_OG_IMAGE_SIZE.width,
				height: STANDARD_OG_IMAGE_SIZE.height,
				alt: 'Проекти',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		images: [
			{
				url: '/projects/twitter-image',
				width: STANDARD_OG_IMAGE_SIZE.width,
				height: STANDARD_OG_IMAGE_SIZE.height,
				alt: 'Проекти',
			},
		],
	},
};

const PATH: PathItem[] = [
	{
		name: TF_TITLE,
		url: '/',
	},
	{
		name: 'Проекти',
		url: '',
	},
];

const ProjectsPage = async () => {
	const projects = await getProjects();
	const shuffledProjects = [...projects].sort(() => Math.random() - 0.5);

	return (
		<ProjectContainer>
			<ProjectsPath path={PATH} />

			<InteractiveProjectFilter current="Всички" />

			<ProjectList projects={shuffledProjects} />
		</ProjectContainer>
	);
};

export default ProjectsPage;
