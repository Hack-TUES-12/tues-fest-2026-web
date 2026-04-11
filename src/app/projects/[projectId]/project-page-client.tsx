'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';

import { Card } from '@/components/ui/card';
import { isProjectCategory } from '@/constants/projects';
import { IfTFFeatureOn } from '@/lib/growthbook/react/client';
import { SECTION_IN_VIEW_TALL, sectionFadeUp } from '@/lib/motion/section-in-view';
import { cn } from '@/lib/utils';
import ProjectsPath, { type PathItem } from '@/partials/layout/ProjectsPath';
import Contributors from '@/partials/projects/project/Contributors';
import { ProjectDescription } from '@/partials/projects/project/Description';
import Gallery from '@/partials/projects/project/Gallery';
import LinksContainer from '@/partials/projects/project/Links';
import Video from '@/partials/projects/project/Video';
import { VoteSelectProjectButton } from '@/partials/projects/project/VoteButton';

import type { ProjectType } from '../actions';

type VoteVariant = 'default' | 'muted' | 'secondary' | 'accent';

export type ProjectPageClientProps = {
	project: ProjectType;
	path: PathItem[];
	thumbnail: string;
	categoryLabel: string;
	categoryStyle: string;
	typeLabel: string | undefined;
	voteVariant: VoteVariant;
	hasLinks: boolean;
	hasContributors: boolean;
};

export function ProjectPageClient({
	project,
	path,
	thumbnail,
	categoryLabel,
	categoryStyle,
	typeLabel,
	voteVariant,
	hasLinks,
	hasContributors,
}: ProjectPageClientProps) {
	const reducedMotion = useReducedMotion();
	const pathColor = isProjectCategory(project.category) ? project.category : 'software';

	return (
		<>
			<motion.div {...sectionFadeUp(reducedMotion, 0)}>
				<ProjectsPath color={pathColor} path={path} />
			</motion.div>

			<div className="mx-auto w-full max-w-4xl">
				<motion.div {...sectionFadeUp(reducedMotion, 0.08)} viewport={SECTION_IN_VIEW_TALL}>
					<Card className="w-full gap-8 bg-card/50 px-6">
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

						<div className="flex flex-col gap-6">
							<div className="space-y-1">
								<div className="w-full space-y-3">
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
									<h1
										className={cn(
											'font-mono text-3xl font-bold md:text-4xl',
											`text-${voteVariant}`,
										)}
									>
										{project.title}
									</h1>
								</div>

								<div className="prose prose-md prose-invert max-w-none leading-relaxed text-foreground/80">
									<ProjectDescription description={project.description} />
								</div>
							</div>

							<IfTFFeatureOn feature="project-voting">
								<div>
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
										size="sm"
									/>
								</div>
							</IfTFFeatureOn>
						</div>
					</Card>
				</motion.div>

				<div className="mt-6 flex w-full flex-col gap-6">
					{(hasContributors || hasLinks) && (
						<motion.div
							className={cn(
								'grid w-full gap-6',
								hasContributors && hasLinks && 'md:grid-cols-2',
							)}
							{...sectionFadeUp(reducedMotion, 0.18)}
						>
							{hasContributors && (
								<Contributors contributors={project.contributors} category={project.category} />
							)}
							{hasLinks && <LinksContainer links={project.links} category={project.category} />}
						</motion.div>
					)}

					{project.images.length > 0 && (
						<motion.div className="w-full" {...sectionFadeUp(reducedMotion, 0.26)}>
							<Gallery name={project.title} category={project.category} images={project.images} />
						</motion.div>
					)}
				</div>
			</div>
		</>
	);
}
