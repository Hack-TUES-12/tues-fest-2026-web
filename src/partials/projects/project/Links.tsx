import { type ReactNode } from 'react';
import Link from 'next/link';
import { TbBrandGit, TbBrandGithub, TbBrandGoogleDrive, TbGlobe } from 'react-icons/tb';
import invariant from 'tiny-invariant';

import { type Links } from '@/app/projects/[projectId]/page';
import { Card } from '@/components/ui/card';
import {
	isProjectCategory,
	PROJECT_CATEGORY_LINK_LABEL_HOVER_CLASS,
	PROJECT_CATEGORY_TEXT_CLASS,
} from '@/constants/projects';
import { cn } from '@/lib/utils';

const LINK_ICON_SIZE = 28;

const Linky = ({
	text,
	url,
	icon,
	accentTextClass,
	linkLabelHoverClass,
}: {
	text: string;
	url: string;
	icon: ReactNode;
	accentTextClass: string;
	linkLabelHoverClass: string;
}) => (
	<div className="w-full justify-start">
		<Link
			href={url}
			target="_blank"
			rel="noreferrer"
			className="group flex items-center gap-3 rounded-md outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
		>
			<span className={cn('inline-flex shrink-0 items-center', accentTextClass)}>
				{icon}
			</span>
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

const LinksContainer = ({ links, category }: { links: Readonly<Links>; category: string }) => {
	const hasLinks = links.repoUrls.length > 0 || links.demoUrl;
	if (!hasLinks) return null;

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
					<GithubLink
						repoUrls={links.repoUrls}
						accentTextClass={accentTextClass}
						linkLabelHoverClass={linkLabelHoverClass}
					/>
					{links.demoUrl && (
						<Linky
							text="Уебсайт"
							url={links.demoUrl}
							accentTextClass={accentTextClass}
							linkLabelHoverClass={linkLabelHoverClass}
							icon={<TbGlobe size={LINK_ICON_SIZE} />}
						/>
					)}
				</div>
			</div>
		</Card>
	);
};

const GithubIcon = ({ repoUrl, size }: { repoUrl: string; size: number }) => {
	if (repoUrl.includes('https://github.com')) {
		return <TbBrandGithub size={size} />;
	}
	if (repoUrl.includes('https://drive.google.com')) {
		return <TbBrandGoogleDrive size={size} />;
	}
	return <TbBrandGit size={size} />;
};

const GithubLink = ({
	repoUrls,
	accentTextClass,
	linkLabelHoverClass,
}: {
	repoUrls: readonly string[];
	accentTextClass: string;
	linkLabelHoverClass: string;
}) => {
	if (repoUrls.length !== 1) {
		return (
			<>
				{repoUrls.map((url, i) => (
					<Linky
						key={i}
						text={new URL(url).pathname}
						url={url}
						accentTextClass={accentTextClass}
						linkLabelHoverClass={linkLabelHoverClass}
						icon={<GithubIcon repoUrl={url} size={LINK_ICON_SIZE} />}
					/>
				))}
			</>
		);
	}
	const firstRepoUrl = repoUrls[0];
	invariant(firstRepoUrl, 'No repo URLs');
	return (
		<Linky
			text="Код на проекта"
			url={firstRepoUrl}
			accentTextClass={accentTextClass}
			linkLabelHoverClass={linkLabelHoverClass}
			icon={<GithubIcon repoUrl={firstRepoUrl} size={LINK_ICON_SIZE} />}
		/>
	);
};

export default LinksContainer;
