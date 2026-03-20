import { ImageResponse } from 'next/og';
import { notFound } from 'next/navigation';

import { isProjectCategory, PROJECT_CATEGORIES } from '@/constants/projects';
import {
	loadStandardOpengraphImageAssets,
	STANDARD_OG_CONTENT_TYPE,
	STANDARD_OG_IMAGE_SIZE,
} from '@/lib/opengraph/standard-opengraph-assets';
import { OpengraphTitleImage } from '@/partials/opengraph/title-image';

export const size = STANDARD_OG_IMAGE_SIZE;
export const contentType = STANDARD_OG_CONTENT_TYPE;

type Props = {
	params: Promise<{ category: string }>;
};

export default async function Image(props: Props) {
	const { category: categoryParam } = await props.params;
	const category = categoryParam.toString();

	if (!isProjectCategory(category) || category === 'battlebot') {
		notFound();
	}

	const title = `Проекти: ${PROJECT_CATEGORIES[category]}`;
	const { backgroundImageUrl, fonts } = await loadStandardOpengraphImageAssets();

	return new ImageResponse(
		<OpengraphTitleImage title={title} waveImageUrl={backgroundImageUrl} headingSize="sm" />,
		{
			...size,
			fonts,
		}
	);
}
