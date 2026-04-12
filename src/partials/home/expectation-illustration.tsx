'use client';

import Image from 'next/image';
import { useState } from 'react';

import type { ExpectationIllustrationAspect } from '@/constants/home/expectations';
import { cn } from '@/lib/utils';

export function ExpectationIllustration({
	index,
	title,
	illustrationAspect,
	reverse
}: {
	index: number;
	title: string;
	illustrationAspect: ExpectationIllustrationAspect;
	reverse: boolean
}) {
	const [failed, setFailed] = useState(false);
	const src = `/assets/home/expectations/${index + 1}.webp`;
	const [aw, ah] = illustrationAspect;

	return (
		<figure
			className="relative mx-auto min-w-0 max-w-full max-lg:max-h-[16rem] max-lg:w-[50%] max-lg:min-w-[20rem] max-lg:max-w-none lg:mx-0 lg:w-full lg:self-center aspect-16/9"
		>
			{!failed ? (
				<Image
					src={src}
					alt=""
					fill
					className={cn(
						"z-[1] object-contain p-4 object-center",
						reverse ? "lg:object-left" : "lg:object-right"
					)}
					sizes="(max-width: 1023px) min(75vw, 100vw), (max-width: 1280px) 40vw, 480px"
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
