import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { notFound } from 'next/navigation';

import { ProjectsRouteScrollReset } from '@/app/projects/projects-route-scroll';
import { FloatingVoteOverlay } from '@/components/ui/floating-vote-overlay';
import { TF_DATE_STRING, TF_LOCATION, TF_ROUNDED_PROJECT_COUNT, TF_YEAR } from '@/constants/event';
import { OG_METADATA, TF_TITLE, TWITTER_METADATA } from '@/constants/seo';
import { IfTFFeatureOn } from '@/lib/growthbook/react/client';
import { growthbook } from '@/lib/growthbook/server';

const { images: _defaultOgImages, ...openGraphWithoutDefaultImage } = OG_METADATA;
const { images: _defaultTwitterImages, ...twitterWithoutDefaultImage } = TWITTER_METADATA;

export const metadata = {
	metadataBase: new URL('https://tuesfest.bg/'),
	title: {
		default: 'Проекти',
		template: `%s – Проект на ТУЕС Фест ${TF_YEAR}`,
	},
	description: `Тук може да откриете проектите на учениците на ТУЕС. Тази година над ${TF_ROUNDED_PROJECT_COUNT} проекта ще бъдат представени само на ${TF_DATE_STRING} в ${TF_LOCATION}.`,
	keywords: [
		'туес',
		'туес фест',
		`туес фест ${TF_YEAR}`,
		'туесфест',
		`туесфест ${TF_YEAR}`,
		'туесфест.bg',
		'проекти',
		'ученически проекти',
		'ученици',
		'ученически',
		'инициативи',
		'инициатива',
		'иновации',
		'иновативни',
		'училища',
		'училища софия',
		'училища българия',
		'програмиране',
		'програмиране за деца',
		'програмиране за ученици',
	],
	twitter: {
		...twitterWithoutDefaultImage,
		title: `Проекти | ${TF_TITLE}`,
		description: `Разгледайте над ${TF_ROUNDED_PROJECT_COUNT} ученически проекта на ${TF_TITLE}.`,
	},
	openGraph: {
		...openGraphWithoutDefaultImage,
		title: `Проекти | ${OG_METADATA.siteName}`,
		description: `Разгледайте над ${TF_ROUNDED_PROJECT_COUNT} ученически проекта на ${TF_TITLE}.`,
	},
};

export default async function ProjectsLayout({ children }: { children: React.ReactNode }) {
	const gb = await growthbook();
	if (gb.isOff('tf-show-projects')) {
		notFound();
	}

	return (
		<NuqsAdapter>
			<ProjectsRouteScrollReset />
			{children}
			<IfTFFeatureOn feature="project-voting">
				<FloatingVoteOverlay />
			</IfTFFeatureOn>
		</NuqsAdapter>
	);
}
