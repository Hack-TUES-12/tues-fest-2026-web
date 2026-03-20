import 'server-only';

import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { getPtMonoImageFont } from './pt-mono-font';

/** Shared OG card size (same as apply / social previews). */
export const STANDARD_OG_IMAGE_SIZE = {
	width: 1200,
	height: 630,
} as const;

export const STANDARD_OG_CONTENT_TYPE = 'image/png';

export type StandardOpengraphFont = {
	name: string;
	data: Buffer | ArrayBuffer;
	style: 'normal';
	weight: 400;
};

/**
 * Loads Rubik Mono + PT Mono + `/logo/opengraph.png` for route-level opengraph-image.tsx files
 * (same pattern as {@link src/app/apply/opengraph-image.tsx}).
 */
export async function loadStandardOpengraphImageAssets(): Promise<{
	backgroundImageUrl: string;
	fonts: StandardOpengraphFont[];
}> {
	const [rubikMonoOneData, backgroundBuffer, ptMonoFont] = await Promise.all([
		readFile(join(process.cwd(), 'src/assets/fonts/RubikMonoOne-Regular.ttf')),
		readFile(join(process.cwd(), 'public/logo/opengraph.png')),
		getPtMonoImageFont(),
	]);

	const backgroundImageUrl = `data:image/png;base64,${backgroundBuffer.toString('base64')}`;

	return {
		backgroundImageUrl,
		fonts: [
			ptMonoFont,
			{
				name: 'Rubik Mono One',
				data: rubikMonoOneData,
				style: 'normal',
				weight: 400,
			},
		],
	};
}
