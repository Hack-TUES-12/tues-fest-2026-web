'use client';

import Image from 'next/image';
import { useState } from 'react';

import type { ExpectationIllustrationAspect } from '@/constants/home/expectations';

export function ExpectationIllustration({
	index,
	title,
	illustrationAspect,
}: {
	index: number;
	title: string;
	illustrationAspect: ExpectationIllustrationAspect;
}) {
	const [failed, setFailed] = useState(false);
	const src = `/assets/home/expectations/${index + 1}.png`;
	const [aw, ah] = illustrationAspect;

	return (
		<figure
			className="relative mx-auto w-full max-w-[min(100%,320px)] lg:h-full lg:w-auto lg:shrink-0 lg:max-w-none lg:mx-0"
			style={{ aspectRatio: `${aw} / ${ah}` }}
		>
			{!failed ? (
				<Image
					src={src}
					alt=""
					fill
					className="z-[1] object-contain object-center p-4"
					sizes="(max-width: 1024px) min(320px, 100vw), (max-width: 1280px) 40vw, 480px"
					onError={() => setFailed(true)}
					priority={index === 0}
				/>
			) : null}
			{failed ? (
				<div
					className="absolute inset-0 z-[1] flex items-center justify-center rounded-3xl p-4 text-center text-xs text-white/25"
					aria-hidden
				>
					Илюстрация
				</div>
			) : null}
			<figcaption className="sr-only">{title}</figcaption>
		</figure>
	);
}
