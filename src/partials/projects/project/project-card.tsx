import Image from 'next/image';
import Link from 'next/link';
// import { FaYoutube } from 'react-icons/fa';
import invariant from 'tiny-invariant';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { ProjectType } from '@/app/projects/actions';
import { IfTFFeatureOn } from '@/lib/growthbook/react/client';
import { PROJECT_CATEGORIES } from '@/constants/projects';
import { cn } from '@/lib/utils';
import { VoteSelectProjectButton } from './VoteButton';

export const ProjectCard = ({ project }: { project: ProjectType }) => {
	// FIXME: duplicate code, seen elsewhere
	const thumbnail = project.thumbnail ?? project.images[0];
	invariant(thumbnail, `Project with ID ${project.id} (${project.title}) has no thumbnail or images`);

	const href = `/projects/${project.id}`;

	const description = project.description.length > 100
		? project.description.slice(0, 100) + '...'
		: project.description;

	return (
		<Card className="group z-20 max-w-[500px] transition-all duration-300 hover:shadow-lg">
			<CardContent className="relative mx-auto mt-4 w-[90%]" style={{ paddingTop: '56.25%' }}>
				<Link href={href}>
					<Image
						key={project.id}
						src={thumbnail}
						alt={project.title}
						className="absolute left-0 top-0 rounded-lg object-cover"
						layout="fill"
						objectFit="cover"
					/>
				</Link>
			</CardContent>
		<CardHeader className="flex h-full flex-col items-start gap-4">
				<CategoryTag category={project.category} />
				<div className='flex flex-col gap-1'>
					<CardTitle className="font-title font-normal text-2xl text-white">
						<Link href={href}>{project.title}</Link>
					</CardTitle>
					{/* {project.youtubeId && (
						<YoutubeLink href={`https://www.youtube.com/watch?v=${encodeURIComponent(project.youtubeId)}`} />
					)} */}
					<p className="text-sm text-foreground">{description}</p>
				</div>
			</CardHeader>
			<IfTFFeatureOn feature="project-voting">
				<CardFooter className="pt-0">
				<VoteSelectProjectButton
					project={{
						id: project.id,
						title: project.title,
						thumbnail,
						category: project.category,
					}}
					variant={CATEGORY_BUTTON_VARIANTS[project.category] ?? 'default'}
					className="w-full font-medium transition-all duration-300 group-hover:scale-[1.02]"
					size="lg"
				/>
				</CardFooter>
			</IfTFFeatureOn>
		</Card>
	);
};

import type { ComponentProps } from 'react';
import type { Button } from '@/components/ui/button';

const CATEGORY_BUTTON_VARIANTS: Record<string, ComponentProps<typeof Button>['variant']> = {
	software: 'muted',
	embedded: 'default',
	networks: 'secondary',
	battlebot: 'accent',
};

const CATEGORY_STYLES: Record<string, string> = {
	software: 'bg-gradient-to-br from-muted/30 to-muted-end/30 border border-muted text-muted',
	embedded: 'bg-gradient-to-br from-primary/30 to-primary-end/30 border border-primary text-primary',
	networks: 'bg-gradient-to-br from-secondary/30 to-secondary-end/30 border border-secondary text-secondary',
	battlebot: 'bg-gradient-to-br from-accent/30 to-accent/30 border border-accent text-accent',
};

const CategoryTag = ({ category }: { category: string }) => {
	const label = PROJECT_CATEGORIES[category as keyof typeof PROJECT_CATEGORIES] ?? category;
	const className = CATEGORY_STYLES[category] ?? CATEGORY_STYLES.software;
	return (
		<span className={cn('inline-block tracking-widest rounded-full px-4 py-1 text-xs font-medium', className)}>
			{label}
		</span>
	);
};

// const YoutubeLink = ({ href }: { href: string }) => {
// 	return (
// 		<div className="hover:text-primary m-1 rounded-lg p-1 transition-all duration-100 hover:scale-110">
// 			<Link href={href} target="_blank">
// 				<FaYoutube size={32} />
// 			</Link>
// 		</div>
// 	);
// };
