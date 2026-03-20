import { ImageResponse } from 'next/og';

import { TF_TITLE } from '@/constants/seo';
import { getPtMonoImageFont, OG_FONT_TITLE_FAMILY } from '@/lib/opengraph/pt-mono-font';

// Image metadata
export const alt = TF_TITLE;
export const size = {
	width: 760,
	height: 325,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
	const ptMonoFont = await getPtMonoImageFont();

	return new ImageResponse(
		(
			<div tw="bg-[#000000] flex flex-col items-center justify-center w-full h-full p-3">
				<div tw="flex flex-col items-center justify-center text-center">
					<h1 tw="flex flex-col items-center">
						<span
							style={{ fontFamily: OG_FONT_TITLE_FAMILY, color: '#ffffff', fontWeight: 400 }}
							tw="block text-7xl"
						>
							TUES FEST
						</span>
					</h1>
				</div>
			</div>
		),
		{
			...size,
			fonts: [ptMonoFont],
		}
	);
}
