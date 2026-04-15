import React from 'react';
import { unstable_cache } from 'next/cache';

import { isProjectCategory, type ProjectCategory } from '@/constants/projects';

import TF2025ProjectsAdapter from './adapter';

const adapter = TF2025ProjectsAdapter();

type RawProject = NonNullable<Awaited<ReturnType<(typeof adapter)['getProjectById']>>>;

/** Adapter JSON infers `category` as `string`; normalize at the boundary. */
export type ProjectType = Omit<RawProject, 'category'> & { category: ProjectCategory };

function toProjectType(project: RawProject): ProjectType {
	const category: ProjectCategory = isProjectCategory(project.category) ? project.category : 'software';
	return { ...project, category };
}

// TODO: add cache
export const getProjectById = React.cache(async (id: number): Promise<ProjectType | null> => {
	const project = await adapter.getProjectById(id);
	if (!project) return null;
	return toProjectType(project);
});

export const getProjects = unstable_cache(
	React.cache(async (): Promise<ProjectType[]> => {
		const projects = await adapter.getProjects();
		return projects.map(toProjectType);
	}),
	['all-projects'],
	{
		revalidate: 20 * 60 * 1000,
	}
);

export const getProjectsByCategory = unstable_cache(
	React.cache(async (category: string): Promise<ProjectType[]> => {
		const projects = await adapter.getProjectsByCategory(category);
		return projects.map(toProjectType);
	}),
	['projects-by-category'],
	{
		revalidate: 20 * 60 * 1000,
	}
);
