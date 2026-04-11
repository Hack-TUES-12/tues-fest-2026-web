'use client';

import Image from 'next/image';
import { useState } from 'react';

export function ExpectationIllustration({ index, title }: { index: number; title: string }) {
	const [failed, setFailed] = useState(false);
	const src = `/assets/home/expectations/${index + 1}.webp`;

	return (
		<figure className="relative mx-auto aspect-[5/4] w-full max-w-[min(100%,320px)] lg:mx-0 lg:max-w-none">
			<div
				className="absolute inset-0 rounded-3xl bg-white/[0.04] ring-1 ring-white/[0.06]"
				aria-hidden
			/>
			{!failed ? (
				<Image
					src={src}
					alt=""
					fill
					className="z-[1] object-contain object-center p-4"
					sizes="(max-width: 1024px) min(320px, 100vw), 28vw"
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
