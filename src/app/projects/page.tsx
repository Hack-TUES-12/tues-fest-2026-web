import type { Metadata } from 'next';

import { TF_TITLE } from '@/constants/seo';
import ProjectsPath, { type PathItem } from '@/partials/layout/ProjectsPath';
import { ProjectContainer } from '@/partials/projects/project-container';
import { InteractiveProjectFilter } from '@/partials/projects/project-filter/static';
import { ProjectList } from '@/partials/projects/project-list';
import { getProjects } from './actions';

// og:image and twitter:image are provided automatically by the sibling
// opengraph-image.tsx / twitter-image.tsx files, which generate hash-based
// URLs (e.g. /projects/opengraph-image?abc123). Do NOT set openGraph.images
// or twitter.images here — doing so overrides the hash URL with a plain URL
// that never cache-busts when the image changes.
export const metadata: Metadata = {
	twitter: {
		card: 'summary_large_image',
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
