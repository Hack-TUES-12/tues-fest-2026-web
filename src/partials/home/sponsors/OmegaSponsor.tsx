'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { OMEGA_SPONSOR } from '@/constants/home/sponsors';
import { cn, parseBoldText } from '@/lib/utils';

import { SponsorReadMoreDialog } from './SponsorReadMoreDialog';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function shouldShowDescription(description?: string) {
	return description && !description.toLowerCase().includes('lorem ipsum');
}

function isHorizontalRule(p: string) {
	return p.startsWith('==');
}

// ─── Omega Sponsor section ────────────────────────────────────────────────────

export default function OmegaSponsor() {
	const [isPaused, setIsPaused] = useState(false);

	const logoSrc = OMEGA_SPONSOR.logo;

	return (
		<div className="relative w-full z-10 flex flex-col items-center">
			{/* Section title */}
			<h2 className="font-mighty scroll-m-20 mb-6 text-center text-4xl first:mt-0 md:text-5xl">
				Omega Sponsor
			</h2>

		{/* Logo card — wrapper gives us a positioned anchor for the background SVG */}
		<div
			className="relative mb-16 w-36 sm:w-56 md:w-92"
			style={{ aspectRatio: '13/7' } as React.CSSProperties}
		>
			{/* Background decoration: starts at the vertical midpoint of the logo box */}
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src="/decorations/orange-circle.svg"
				alt=""
				aria-hidden="true"
			className="w-[110vw] pointer-events-none absolute"
			style={{
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, 0)',
				maxWidth: '100rem',
				minWidth: '70rem',
				zIndex: -1,
			}}
			/>

			<Link
				href={OMEGA_SPONSOR.url}
				target="_blank"
				className={cn(
					'absolute inset-0 rounded-sm shadow-[0_4px_6px_-1px_rgba(0,0,0,0.7)] transition-all duration-700 ease-in-out',
					'customClass' in OMEGA_SPONSOR &&
						typeof OMEGA_SPONSOR.customClass === 'string' &&
						OMEGA_SPONSOR.customClass
						? OMEGA_SPONSOR.customClass
						: 'bg-white'
				)}
			>
				<div className="absolute inset-0 box-border flex items-center justify-center p-4">
					<Image
						src={logoSrc}
						alt={OMEGA_SPONSOR.name}
						width={160}
						height={112}
						className="object-contain"
						style={{
							objectFit: 'contain',
							width: '100%',
							height: '100%',
							maxWidth: '100%',
							maxHeight: '100%',
							display: 'block',
							WebkitTransform: 'translateZ(0)',
							transform: 'translateZ(0)',
						}}
						loading="eager"
						priority
					/>
				</div>
			</Link>
		</div>

			{/* Info card */}
			<div className="relative w-full">
				<Card variant='secondary' className="relative flex w-full flex-col p-8">
					<CardTitle className="mb-6 text-center font-medium">{OMEGA_SPONSOR.name}</CardTitle>
					<CardContent className="min-h-0 flex-shrink flex-grow p-5">
						<div className="h-full">
							{shouldShowDescription(OMEGA_SPONSOR.description) ? (
								<>
									<div className="flex h-42 flex-shrink flex-grow flex-col overflow-clip">
										<div className="inline-flex h-full flex-1 flex-shrink flex-grow flex-col text-center [mask-image:linear-gradient(to_bottom,black,black_calc(100%_-_1.5rem),transparent)]">
											{OMEGA_SPONSOR.description!.split('\n').map((p, i) =>
												isHorizontalRule(p) ? (
													<Separator key={i} />
												) : (
													<p key={i}>{parseBoldText(p)}</p>
												)
											)}
										</div>
									</div>
									<div className="mt-4 flex justify-center">
										<SponsorReadMoreDialog
											name={OMEGA_SPONSOR.name}
											url={OMEGA_SPONSOR.url}
											logo={OMEGA_SPONSOR.logo}
											description={OMEGA_SPONSOR.description}
											tier="omega"
											onOpenChange={setIsPaused}
										/>
									</div>
								</>
							) : (
								<div className="flex h-[150px] flex-col items-center justify-center gap-1">
									<p className="flex flex-1 flex-col justify-center text-center text-xl font-bold">
										Благодарим на {OMEGA_SPONSOR.name} за подкрепата!
									</p>
									<p className="justify-self-end">
										<Link href={OMEGA_SPONSOR.url} target="_blank">
											<Button variant="ghost">Уебсайт</Button>
										</Link>
									</p>
								</div>
							)}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
