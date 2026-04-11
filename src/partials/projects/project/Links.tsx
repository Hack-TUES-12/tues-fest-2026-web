'use client';

import { type ReactNode } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { TbBrandGit, TbBrandGithub, TbBrandGoogleDrive, TbGlobe } from 'react-icons/tb';
import invariant from 'tiny-invariant';

import { type Links } from '@/app/projects/[projectId]/page';
import { Card } from '@/components/ui/card';
import {
	isProjectCategory,
	PROJECT_CATEGORY_LINK_LABEL_HOVER_CLASS,
	PROJECT_CATEGORY_TEXT_CLASS,
} from '@/constants/projects';
import { listItemEntrance, listItemIconEntrance } from '@/lib/motion/section-in-view';
import { cn } from '@/lib/utils';

const LINK_ICON_SIZE = 28;

type LinkEntry = {
	key: string;
	text: string;
	url: string;
	icon: ReactNode;
};

type IconMotion = ReturnType<typeof listItemIconEntrance>;

const Linky = ({
	text,
	url,
	icon,
	accentTextClass,
	linkLabelHoverClass,
	iconMotionProps,
}: {
	text: string;
	url: string;
	icon: ReactNode;
	accentTextClass: string;
	linkLabelHoverClass: string;
	iconMotionProps: IconMotion;
}) => (
	<div className="w-full justify-start">
		<Link
			href={url}
			target="_blank"
			rel="noreferrer"
			className="group flex items-center gap-3 rounded-md outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
		>
			<motion.span
				className={cn('inline-flex shrink-0 items-center origin-center', accentTextClass)}
				{...iconMotionProps}
			>
				{icon}
			</motion.span>
			<span
				className={cn(
					'text-sm font-semibold text-white transition-colors',
					linkLabelHoverClass,
				)}
			>
				{text}
			</span>
		</Link>
	</div>
);

const GithubIcon = ({ repoUrl, size }: { repoUrl: string; size: number }) => {
	if (repoUrl.includes('https://github.com')) {
		return <TbBrandGithub size={size} />;
	}
	if (repoUrl.includes('https://drive.google.com')) {
		return <TbBrandGoogleDrive size={size} />;
	}
	return <TbBrandGit size={size} />;
};

function buildLinkEntries(links: Readonly<Links>): LinkEntry[] {
	const entries: LinkEntry[] = [];

	if (links.repoUrls.length > 1) {
		links.repoUrls.forEach((url, i) => {
			entries.push({
				key: `repo-${i}-${url}`,
				text: new URL(url).pathname,
				url,
				icon: <GithubIcon repoUrl={url} size={LINK_ICON_SIZE} />,
			});
		});
	} else if (links.repoUrls.length === 1) {
		const url = links.repoUrls[0];
		invariant(url, 'No repo URLs');
		entries.push({
			key: 'repo',
			text: 'Код на проекта',
			url,
			icon: <GithubIcon repoUrl={url} size={LINK_ICON_SIZE} />,
		});
	}

	if (links.demoUrl) {
		entries.push({
			key: 'demo',
			text: 'Уебсайт',
			url: links.demoUrl,
			icon: <TbGlobe size={LINK_ICON_SIZE} />,
		});
	}

	return entries;
}

const LinksContainer = ({ links, category }: { links: Readonly<Links>; category: string }) => {
	const hasLinks = links.repoUrls.length > 0 || links.demoUrl;
	if (!hasLinks) return null;

	const reducedMotion = useReducedMotion();
	const entries = buildLinkEntries(links);

	const accentTextClass = isProjectCategory(category)
		? PROJECT_CATEGORY_TEXT_CLASS[category]
		: PROJECT_CATEGORY_TEXT_CLASS.software;
	const linkLabelHoverClass = isProjectCategory(category)
		? PROJECT_CATEGORY_LINK_LABEL_HOVER_CLASS[category]
		: PROJECT_CATEGORY_LINK_LABEL_HOVER_CLASS.software;

	return (
		<Card className="rounded-2xl bg-card/50 px-6 py-4 backdrop-blur-sm">
			<div className="flex flex-col gap-4">
				<p className={cn('text-2xl font-mono font-bold', accentTextClass)}>Линкове</p>
				<div className="flex flex-col gap-3 px-3">
					{entries.map((entry, index) => (
						<motion.div key={entry.key} {...listItemEntrance(reducedMotion, index)}>
							<Linky
								text={entry.text}
								url={entry.url}
								accentTextClass={accentTextClass}
								linkLabelHoverClass={linkLabelHoverClass}
								iconMotionProps={listItemIconEntrance(reducedMotion, index)}
								icon={entry.icon}
							/>
						</motion.div>
					))}
				</div>
			</div>
		</Card>
	);
};

export default LinksContainer;
