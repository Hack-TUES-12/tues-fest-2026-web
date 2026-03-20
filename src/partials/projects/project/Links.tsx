import { type ReactNode } from 'react';
import Link from 'next/link';
import { TbBrandGit, TbBrandGithub, TbBrandGoogleDrive, TbGlobe } from 'react-icons/tb';
import invariant from 'tiny-invariant';

import { Button } from '@/components/ui/button';
import { type Links } from '@/app/projects/[projectId]/page';

const Linky = ({ text, url, icon }: { text: string; url: string; icon: ReactNode }) => (
	<Button asChild variant="outline" size="lg" className="w-full justify-start gap-3">
		<Link href={url} target="_blank" rel="noreferrer">
			{icon}
			<span className="text-sm font-semibold">{text}</span>
		</Link>
	</Button>
);

const LinksContainer = ({ links }: { links: Readonly<Links> }) => {
	const hasLinks = links.repoUrls.length > 0 || links.demoUrl;
	if (!hasLinks) return null;

	return (
		<div className="rounded-2xl border border-white/10 bg-card/50 p-6 backdrop-blur-sm">
			<p className="mb-3 text-xs font-medium uppercase tracking-widest text-white/40">Линкове</p>
			<div className="flex flex-col gap-3">
				<GithubLink repoUrls={links.repoUrls} />
				{links.demoUrl && (
					<Linky text="Уебсайт" url={links.demoUrl} icon={<TbGlobe size={20} />} />
				)}
			</div>
		</div>
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

const GithubLink = ({ repoUrls }: { repoUrls: readonly string[] }) => {
	if (repoUrls.length !== 1) {
		return (
			<>
				{repoUrls.map((url, i) => (
					<Linky
						key={i}
						text={new URL(url).pathname}
						url={url}
						icon={<GithubIcon repoUrl={url} size={20} />}
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
			icon={<GithubIcon repoUrl={firstRepoUrl} size={20} />}
		/>
	);
};

export default LinksContainer;
