'use client';

import { motion, useReducedMotion } from 'motion/react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';

import { TF_TITLE } from '@/constants/seo';
import { sectionFadeIn, sectionFadeUp } from '@/lib/motion/section-in-view';
import { useTFFeature } from '@/lib/growthbook/react/hooks';

import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

const FALLBACK_STREAM_ID = 'jfKfPfyJRdk';

export const LiveStream = () => {
	const reducedMotion = useReducedMotion();
	const streamFeature = useTFFeature('tf-battle-bots-stream');
	const streamId = streamFeature.value?.youtubeId ?? FALLBACK_STREAM_ID;

	if (!streamFeature.on) return null;

	return (
		<motion.section
			className="flex w-full max-w-4xl flex-col items-center gap-6"
			{...sectionFadeIn(reducedMotion, 0)}
		>
			<div className="flex flex-col items-center gap-2 text-center">
				<motion.p
					className="text-secondary text-sm font-medium tracking-widest uppercase"
					{...sectionFadeUp(reducedMotion, 0.06)}
				>
					На живо
				</motion.p>
				<motion.h2
					className="font-title text-5xl text-white md:text-6xl"
					{...sectionFadeUp(reducedMotion, 0.12)}
				>
					Гледайте Battle Bots
				</motion.h2>
				<motion.p
					className="text-foreground/70 max-w-xl text-pretty text-lg leading-relaxed"
					{...sectionFadeUp(reducedMotion, 0.18)}
				>
					Гледайте предаването на живо от състезанието TUES Battle Bots в Иновационен форум "Джон Атанасов".
				</motion.p>
			</div>
			<motion.div
				className="w-full overflow-hidden rounded-2xl border border-white/10 shadow-lg shadow-black/30"
				{...sectionFadeUp(reducedMotion, 0.26)}
			>
				<LiteYouTubeEmbed id={streamId} title={`Battle Bots На живо | ${TF_TITLE}`} poster="hqdefault" />
			</motion.div>
		</motion.section>
	);
};
