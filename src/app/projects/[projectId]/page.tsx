import { notFound } from 'next/navigation';
import invariant from 'tiny-invariant';

import { OG_METADATA, TF_TITLE, TWITTER_METADATA } from '@/constants/seo';
import { PROJECT_CATEGORIES, PROJECT_TYPES, type ProjectCategory } from '@/constants/projects';
import { ProjectContainer } from '@/partials/projects/project-container';
import { getProjectById, getProjects } from '../actions';

import { ProjectPageClient } from './project-page-client';

export type Links = {
	repoUrls: readonly string[];
	demoUrl: string | null;
};

export type Contributor = {
	name: string;
	class: string;
};

export type Picture = {
	url: string;
	is_thumbnail: boolean;
};

export type Project = {
	id: number;
	title: string;
	description: string;
	video: string;
	type: string;
	category: string;
	has_thumbnail: boolean;
	links: Links;
	creators: Contributor[];
	images: Picture[];
	next_id: number;
	prev_id: number;
};

export async function generateMetadata(props: { params: Promise<{ projectId: string }> }) {
	const params = await props.params;
	const projectId = parseInt(params.projectId, 10);
	const project = await getProjectById(projectId);

	if (project === undefined || project === null) notFound();

	const ogImages = project.thumbnail
		? [{ url: project.thumbnail, alt: project.title }]
		: OG_METADATA.images;

	return {
		title: project.title,
		description: project.description,
		twitter: {
			...TWITTER_METADATA,
			title: `${project.title} | ${TF_TITLE}`,
			description: project.description,
			images: project.thumbnail ? [project.thumbnail] : TWITTER_METADATA.images,
		},
		openGraph: {
			...OG_METADATA,
			title: `${project.title} | ${OG_METADATA.siteName}`,
			description: project.description,
			url: `https://tuesfest.bg/projects/${project.id}`,
			images: ogImages,
		},
	};
}

export async function generateStaticParams() {
	const projects = await getProjects();
	return projects.map((project) => ({
		projectId: project.id.toString(),
	}));
}

const CATEGORY_STYLES: Record<string, string> = {
	software: 'bg-gradient-to-br from-muted/30 to-muted-end/30 border border-muted text-muted',
	embedded: 'bg-gradient-to-br from-primary/30 to-primary-end/30 border border-primary text-primary',
	networks: 'bg-gradient-to-br from-accent/30 to-accent/30 border border-accent text-accent',
	battlebot: 'bg-gradient-to-br from-accent/30 to-accent/30 border border-accent text-accent',
};

const CATEGORY_VOTE_VARIANTS: Record<string, 'default' | 'muted' | 'secondary' | 'accent'> = {
	software: 'muted',
	embedded: 'default',
	networks: 'accent',
	battlebot: 'accent',
};

const ProjectPage = async (props: { params: Promise<{ projectId: string }> }) => {
	const params = await props.params;
	const projectId = parseInt(params.projectId, 10);
	const project = await getProjectById(projectId);
	if (!project) notFound();

	const path = [
		{
			name: TF_TITLE,
			url: '/',
		},
		{
			name: 'Проекти',
			url: '/projects',
		},
		{
			name: project.title,
			url: '',
		},
	];

	// FIXME: duplicate code, seen elsewhere
	const thumbnail = project.thumbnail ?? project.images[0];
	invariant(thumbnail, `Project with ID ${project.id} (${project.title}) has no thumbnail or images`);

	const categoryLabel = PROJECT_CATEGORIES[project.category as keyof typeof PROJECT_CATEGORIES] ?? project.category;
	const categoryStyle =
		CATEGORY_STYLES[project.category] ?? CATEGORY_STYLES.software ?? 'border border-muted text-muted';
	const voteVariant =
		CATEGORY_VOTE_VARIANTS[project.category] ?? CATEGORY_VOTE_VARIANTS.software ?? 'default';
	const hasLinks = project.links.repoUrls.length > 0 || project.links.demoUrl != null;
	const hasContributors = project.contributors.length > 0;
	// @ts-expect-error TODO: fix
	const typeLabel = PROJECT_TYPES[project.type] as string | undefined;

	return (
		<ProjectContainer category={project.category as ProjectCategory}>
			<ProjectPageClient
				project={project}
				path={path}
				thumbnail={thumbnail}
				categoryLabel={categoryLabel}
				categoryStyle={categoryStyle}
				typeLabel={typeLabel}
				voteVariant={voteVariant}
				hasLinks={hasLinks}
				hasContributors={hasContributors}
			/>
		</ProjectContainer>
	);
};

export default ProjectPage;
