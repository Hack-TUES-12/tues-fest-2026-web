import { type MetadataRoute } from 'next';

import { PROJECT_CATEGORIES } from '@/constants/projects';
import { growthbook } from '@/lib/growthbook/server';
import { getProjects } from './projects/actions';

const BASE_URL = 'https://tuesfest.bg';

// Revalidate the sitemap every hour (matches GrowthBook prod cache TTL)
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const gb = await growthbook();

	const entries: MetadataRoute.Sitemap = [
		{
			url: BASE_URL,
			changeFrequency: 'daily',
			priority: 1,
		},
		{
			url: `${BASE_URL}/about`,
			changeFrequency: 'weekly',
			priority: 0.8,
		},
		{
			url: `${BASE_URL}/location`,
			changeFrequency: 'weekly',
			priority: 0.7,
		},
		{
			url: `${BASE_URL}/regulation`,
			changeFrequency: 'monthly',
			priority: 0.65,
		},
	];

	if (gb.isOn('tf-show-apply')) {
		entries.push({
			url: `${BASE_URL}/apply`,
			changeFrequency: 'weekly',
			priority: 0.8,
		});
	}

	if (gb.isOn('tf-show-partners')) {
		entries.push({
			url: `${BASE_URL}/partners`,
			changeFrequency: 'weekly',
			priority: 0.7,
		});
	}

	if (gb.isOn('tf-show-tuestalks')) {
		entries.push({
			url: `${BASE_URL}/tuestalks`,
			changeFrequency: 'weekly',
			priority: 0.8,
		});
	}

	if (gb.isOn('tf-show-projects')) {
		entries.push({
			url: `${BASE_URL}/projects`,
			changeFrequency: 'daily',
			priority: 0.9,
		});

		for (const category of Object.keys(PROJECT_CATEGORIES)) {
			// The category page redirects battlebot → /projects, so skip it
			if (category === 'battlebot') continue;
			entries.push({
				url: `${BASE_URL}/projects/category/${category}`,
				changeFrequency: 'daily',
				priority: 0.8,
			});
		}

		const projects = await getProjects();
		for (const project of projects) {
			entries.push({
				url: `${BASE_URL}/projects/${project.id}`,
				changeFrequency: 'weekly',
				priority: 0.7,
			});
		}
	}

	return entries;
}
