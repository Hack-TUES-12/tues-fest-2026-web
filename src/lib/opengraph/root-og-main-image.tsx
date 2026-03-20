import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { ImageResponse } from 'next/og';

/** Default OG/Twitter canvas — full-bleed `public/logo/opengraph-main.png` only (no text/UI). */
export const ROOT_OG_MAIN_SIZE = {
	width: 1200,
	height: 630,
} as const;

export async function createOpengraphMainImageResponse() {
	const buffer = await readFile(join(process.cwd(), 'public/logo/opengraph-main.png'));
	const src = `data:image/png;base64,${buffer.toString('base64')}`;

	return new ImageResponse(
		(
			<div
				style={{
					display: 'flex',
					width: '100%',
					height: '100%',
				}}
			>
				<img
					alt=""
					src={src}
					width={ROOT_OG_MAIN_SIZE.width}
					height={ROOT_OG_MAIN_SIZE.height}
					style={{
						width: '100%',
						height: '100%',
						objectFit: 'cover',
					}}
				/>
			</div>
		),
		{
			...ROOT_OG_MAIN_SIZE,
		},
	);
}
