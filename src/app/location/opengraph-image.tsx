import { ImageResponse } from 'next/og';

import { TF_LOCATION } from '@/constants/event';
import {
	loadStandardOpengraphImageAssets,
	STANDARD_OG_CONTENT_TYPE,
	STANDARD_OG_IMAGE_SIZE,
} from '@/lib/opengraph/standard-opengraph-assets';
import { OpengraphTitleImage } from '@/partials/opengraph/title-image';

export const alt = 'Локация';
export const size = STANDARD_OG_IMAGE_SIZE;
export const contentType = STANDARD_OG_CONTENT_TYPE;

export default async function Image() {
	const { backgroundImageUrl, fonts } = await loadStandardOpengraphImageAssets();

	return new ImageResponse(
		(
			<OpengraphTitleImage
				title={alt}
				underTitle={TF_LOCATION}
				waveImageUrl={backgroundImageUrl}
				headingSize="sm"
			/>
		),
		{
			...size,
			fonts,
		}
	);
}
