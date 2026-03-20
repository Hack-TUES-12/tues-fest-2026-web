import { ImageResponse } from 'next/og';
import { notFound } from 'next/navigation';

import {
	loadStandardOpengraphImageAssets,
	STANDARD_OG_CONTENT_TYPE,
	STANDARD_OG_IMAGE_SIZE,
} from '@/lib/opengraph/standard-opengraph-assets';
import { OpengraphTitleImage } from '@/partials/opengraph/title-image';

import { getProjectById } from '../actions';

export const size = STANDARD_OG_IMAGE_SIZE;
export const contentType = STANDARD_OG_CONTENT_TYPE;

type Props = {
	params: Promise<{ projectId: string }>;
};

export default async function Image(props: Props) {
	const { projectId } = await props.params;
	const id = Number.parseInt(projectId, 10);
	if (Number.isNaN(id)) {
		notFound();
	}

	const project = await getProjectById(id);
	if (project === undefined || project === null) {
		notFound();
	}

	const { backgroundImageUrl, fonts } = await loadStandardOpengraphImageAssets();

	return new ImageResponse(
		<OpengraphTitleImage title={project.title} waveImageUrl={backgroundImageUrl} headingSize="sm" />,
		{
			...size,
			fonts,
		}
	);
}
