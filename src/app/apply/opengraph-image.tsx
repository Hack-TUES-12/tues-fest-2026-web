import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { ImageResponse } from 'next/og';

import { getPtMonoImageFont } from '@/lib/opengraph/pt-mono-font';
import { OpengraphTitleImage } from '@/partials/opengraph/title-image';

// Image metadata
export const alt = 'Прием в ТУЕС';
export const size = {
	width: 1200,
	height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
	const [rubikMonoOneData, backgroundImageUrl, ptMonoFont] = await Promise.all([
		readFile(join(process.cwd(), 'src/assets/fonts/RubikMonoOne-Regular.ttf')),
		readFile(join(process.cwd(), 'public/logo/opengraph.png')).then((buffer) => {
			const base64 = buffer.toString('base64');
			return `data:image/png;base64,${base64}`;
		}),
		getPtMonoImageFont(),
	]);

	return new ImageResponse(
		<OpengraphTitleImage title={alt} waveImageUrl={backgroundImageUrl} headingSize="sm" />,
		{
			...size,
			fonts: [ptMonoFont, {
				name: 'Rubik Mono One',
				data: rubikMonoOneData,
				style: 'normal',
				weight: 400,
			}],
		}
	);
}
