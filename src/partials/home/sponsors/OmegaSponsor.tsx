'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Globe } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { OMEGA_SPONSOR } from '@/constants/home/sponsors';
import { cn, parseBoldText } from '@/lib/utils';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function shouldShowDescription(description?: string) {
	return description && !description.toLowerCase().includes('lorem ipsum');
}

function isHorizontalRule(p: string) {
	return p.startsWith('==');
}

// ─── Read-more dialog ────────────────────────────────────────────────────────

function OmegaReadMore({
	onOpenChange,
}: {
	onOpenChange?: (open: boolean) => void;
}) {
	return (
		<div className="mt-4 flex justify-center">
			<Dialog onOpenChange={onOpenChange}>
				<DialogTrigger asChild>
					<Button variant="ghost">Покажи повече</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>{OMEGA_SPONSOR.name}</DialogTitle>
					</DialogHeader>
					<div className="space-y-1 text-sm">
						{OMEGA_SPONSOR.description?.split('\n').map((p, i) =>
							isHorizontalRule(p) ? <Separator key={i} /> : <p key={i}>{parseBoldText(p)}</p>
						)}
					</div>
					<DialogFooter>
						<Button asChild variant="outline" className="w-full min-w-0 break-words sm:w-auto">
							<Link
								href={OMEGA_SPONSOR.url}
								target="_blank"
								className="flex items-center justify-center break-words"
							>
								<Globe className="mr-2 h-4 w-4 shrink-0" />
								<span className="break-words">Уебсайт на {OMEGA_SPONSOR.name}</span>
							</Link>
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}

// ─── Omega Sponsor section ────────────────────────────────────────────────────

export default function OmegaSponsor() {
	const [isPaused, setIsPaused] = useState(false);

	const logoSrc = OMEGA_SPONSOR.logo;

	return (
		<div className="relative z-10 mb-72 flex max-w-3xl flex-col items-center">
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
									<OmegaReadMore onOpenChange={setIsPaused} />
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
