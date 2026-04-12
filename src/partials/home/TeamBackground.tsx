'use client';

import { useEffect, useRef, useState } from 'react';

const IMAGES = [
	'/team/team1.webp',
	'/team/team2.webp',
	'/team/team3.webp',
	'/team/team4.webp',
	'/team/team5.webp',
];

const FADE_MS = 1000;
const INTERVAL_MS = 3000;

/**
 * Two persistent `<img>` layers: only the hidden layer receives a new `src` after preload.
 * The top layer fades out — no fade-in on new pixels, no Next/Image remount.
 */
export const TeamBackground = () => {
	const [slot0, setSlot0] = useState(0);
	const [slot1, setSlot1] = useState(1);
	const [topSlot, setTopSlot] = useState<0 | 1>(0);
	const [topFading, setTopFading] = useState(false);

	const slotsRef = useRef<[number, number]>([0, 1]);
	const topSlotRef = useRef<0 | 1>(0);

	useEffect(() => {
		slotsRef.current = [slot0, slot1];
	}, [slot0, slot1]);

	useEffect(() => {
		topSlotRef.current = topSlot;
	}, [topSlot]);

	useEffect(() => {
		const runAdvance = () => {
			const t = topSlotRef.current;
			const [s0, s1] = slotsRef.current;
			const visibleIdx = t === 0 ? s0 : s1;
			const nextIdx = (visibleIdx + 1) % IMAGES.length;
			const bottomSlot = (1 - t) as 0 | 1;

			const img = new window.Image();
			img.src = IMAGES[nextIdx]!;
			const afterReady = () => {
				requestAnimationFrame(() => {
					requestAnimationFrame(() => {
						if (bottomSlot === 0) {
							slotsRef.current[0] = nextIdx;
							setSlot0(nextIdx);
						} else {
							slotsRef.current[1] = nextIdx;
							setSlot1(nextIdx);
						}
						requestAnimationFrame(() => setTopFading(true));
					});
				});
			};
			// decode() waits for a full bitmap; onload alone can still flash on <img> paint in WebKit.
			if (typeof img.decode === 'function') {
				void img.decode().then(afterReady).catch(() => {
					const run = () => afterReady();
					if (img.complete) run();
					else img.onload = run;
				});
			} else {
				const run = () => afterReady();
				if (img.complete) run();
				else img.onload = run;
			}
		};

		const id = window.setInterval(runAdvance, INTERVAL_MS);
		return () => window.clearInterval(id);
	}, []);

	const onFadeEnd = (e: React.TransitionEvent<HTMLImageElement>) => {
		if (e.propertyName !== 'opacity') return;
		if (!topFading) return;
		setTopFading(false);
		const nextTop = (1 - topSlotRef.current) as 0 | 1;
		topSlotRef.current = nextTop;
		setTopSlot(nextTop);
	};

	const z0 = topSlot === 0 ? 2 : 1;
	const z1 = topSlot === 1 ? 2 : 1;
	const op0 = topSlot === 0 && topFading ? 0 : 1;
	const op1 = topSlot === 1 && topFading ? 0 : 1;

	const common =
		'pointer-events-none absolute inset-0 h-full w-full object-cover object-top [transform:translateZ(0)] [backface-visibility:hidden]';

	return (
		<div className="absolute inset-0 z-0 bg-black">
			<img
				src={IMAGES[slot0]}
				alt=""
				aria-hidden
				decoding="async"
				fetchPriority={slot0 === 0 ? 'high' : 'low'}
				className={common}
				style={{
					zIndex: z0,
					opacity: op0,
					transition:
						topSlot === 0 && topFading ? `opacity ${FADE_MS}ms ease-in-out` : 'opacity 0ms linear',
				}}
				onTransitionEnd={topSlot === 0 ? onFadeEnd : undefined}
			/>
			<img
				src={IMAGES[slot1]}
				alt=""
				aria-hidden
				decoding="async"
				fetchPriority="low"
				className={common}
				style={{
					zIndex: z1,
					opacity: op1,
					transition:
						topSlot === 1 && topFading ? `opacity ${FADE_MS}ms ease-in-out` : 'opacity 0ms linear',
				}}
				onTransitionEnd={topSlot === 1 ? onFadeEnd : undefined}
			/>
		</div>
	);
};
