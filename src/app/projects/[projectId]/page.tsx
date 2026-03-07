import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import invariant from 'tiny-invariant';

import { OG_METADATA, TF_TITLE, TWITTER_METADATA } from '@/constants/seo';
import { PROJECT_CATEGORIES, PROJECT_TYPES, type ProjectCategory } from '@/constants/projects';
import { IfTFFeatureOn } from '@/lib/growthbook/react/client';
import { cn } from '@/lib/utils';
import ProjectsPath from '@/partials/layout/ProjectsPath';
import { ProjectContainer } from '@/partials/projects/project-container';
import Contributors from '@/partials/projects/project/Contributors';
import { ProjectDescription } from '@/partials/projects/project/Description';
import Gallery from '@/partials/projects/project/Gallery';
import LinksContainer from '@/partials/projects/project/Links';
import Video from '@/partials/projects/project/Video';
import { VoteSelectProjectButton } from '@/partials/projects/project/VoteButton';
import { getProjectById, getProjects } from '../actions';

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

	return {
		title: project.title,
		description: project.description,
		twitter: {
			...TWITTER_METADATA,
			title: `${project.title} | ${TF_TITLE}`,
			description: project.description,
			images: project.images.map((image) => ({
				url: image,
			})),
		},
		openGraph: {
			...OG_METADATA,
			title: `${project.title} | ${OG_METADATA.siteName}`,
			description: project.description,
			url: `https://tuesfest.bg/projects/${project.id}`,
			images: project.images.map((image) => ({
				url: image,
			})),
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
	networks: 'bg-gradient-to-br from-secondary/30 to-secondary-end/30 border border-secondary text-secondary',
	battlebot: 'bg-gradient-to-br from-accent/30 to-accent/30 border border-accent text-accent',
};

const CATEGORY_VOTE_VARIANTS: Record<string, 'default' | 'muted' | 'secondary' | 'accent'> = {
	software: 'muted',
	embedded: 'default',
	networks: 'secondary',
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
	const categoryStyle = CATEGORY_STYLES[project.category] ?? CATEGORY_STYLES.software;
	const voteVariant = CATEGORY_VOTE_VARIANTS[project.category] ?? 'default';
	// @ts-expect-error TODO: fix
	const typeLabel = PROJECT_TYPES[project.type] as string | undefined;

	return (
		<ProjectContainer category={project.category as ProjectCategory}>
			{/* Breadcrumb */}
			<ProjectsPath path={path} />

			{/* Hero — video/thumbnail */}
			<div className="mx-auto w-full max-w-5xl">
				<div className="overflow-hidden rounded-2xl border border-white/10 bg-card/50 shadow-2xl backdrop-blur-sm">
					{project.youtubeId ? (
						<Video name={project.title} id={project.youtubeId} />
					) : (
						<div className="relative w-full" style={{ paddingTop: '56.25%' }}>
							<Image
								key={project.id}
								src={thumbnail}
								alt={project.title}
								className="absolute left-0 top-0 object-cover"
								fill
							/>
						</div>
					)}
				</div>
			</div>

			{/* Title + meta */}
			<div className="mx-auto w-full max-w-5xl space-y-3">
				<div className="flex flex-wrap items-center gap-3">
					<span
						className={cn(
							'inline-block rounded-full px-4 py-1 text-xs font-medium tracking-widest',
							categoryStyle,
						)}
					>
						{categoryLabel}
					</span>
					{typeLabel && (
						<span className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-medium tracking-widest text-white/60">
							{typeLabel}
						</span>
					)}
				</div>
				<h1 className="font-title text-4xl text-white md:text-5xl">{project.title}</h1>
			</div>

			{/* Main content grid */}
			<div className="mx-auto grid w-full max-w-5xl gap-6 md:grid-cols-[2fr,1fr]">
				{/* Description */}
				<div className="rounded-2xl border border-white/10 bg-card/50 p-6 backdrop-blur-sm md:p-8">
					<p className="mb-4 text-xs font-medium uppercase tracking-widest text-white/40">Описание</p>
					<div className="prose prose-sm prose-invert max-w-none leading-relaxed text-foreground/80">
						<ProjectDescription description={project.description} />
					</div>
				</div>

				{/* Sidebar */}
				<div className="flex flex-col gap-4">
					{/* Vote card */}
					<IfTFFeatureOn feature="project-voting">
						<div className="rounded-2xl border border-white/10 bg-card/50 p-6 backdrop-blur-sm">
							<p className="mb-1 text-xs font-medium uppercase tracking-widest text-white/40">
								Гласуване
							</p>
							<h3 className="mb-2 text-lg font-semibold text-white">
								Гласувай за {project.contributors.length > 1 ? 'нас' : 'мен'}!
							</h3>
							<p className="mb-4 text-sm text-white/60">
								Ако смяташ, че проектът{' '}
								{project.contributors.length > 1 ? 'ни' : 'ми'} заслужава наградата за избор на
								публиката — гласувай сега!
							</p>
							<VoteSelectProjectButton
								project={{
									id: project.id,
									title: project.title,
									thumbnail,
									category: project.category,
								}}
								variant={voteVariant}
								className="w-full"
								size="lg"
							/>
						</div>
					</IfTFFeatureOn>

					{/* Links */}
					<LinksContainer links={project.links} />
				</div>
			</div>

			{/* Contributors */}
			{project.contributors.length > 0 && (
				<div className="mx-auto w-full max-w-5xl">
					<Contributors contributors={project.contributors} />
				</div>
			)}

			{/* Gallery */}
			{project.images.length > 0 && (
				<div className="mx-auto w-full max-w-5xl">
					<Gallery
						name={project.title}
						images={project.images.length > 0 ? project.images : [project.thumbnail!]}
					/>
				</div>
			)}
		</ProjectContainer>
	);
};

export default ProjectPage;
