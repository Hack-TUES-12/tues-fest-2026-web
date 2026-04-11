import type { Metadata } from 'next';

import { ProjectContainer } from '@/partials/projects/project-container';
import { getProjects } from './actions';

import { ProjectsIndexClient } from './projects-index-client';

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

const ProjectsPage = async () => {
	const projects = await getProjects();
	const shuffledProjects = [...projects].sort(() => Math.random() - 0.5);

	return (
		<ProjectContainer>
			<ProjectsIndexClient projects={shuffledProjects} />
		</ProjectContainer>
	);
};

export default ProjectsPage;
