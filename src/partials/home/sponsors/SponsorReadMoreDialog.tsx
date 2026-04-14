'use client';

import type { CSSProperties } from 'react';
import { useRef, useState } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, BookOpen, XIcon } from 'lucide-react';

import type { VariantProps } from 'class-variance-authority';

import { Button, buttonVariants } from '@/components/ui/button';
import {
	Dialog,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { HERO_LIKE_EASE_OUT } from '@/lib/motion/section-in-view';
import { cn, parseBoldText } from '@/lib/utils';

import {
	SPONSOR_DIALOG_TIER_ACCENT,
	SPONSOR_DIALOG_TIER_LABELS,
	type SponsorDialogTier,
	type SponsorSectionAccent,
} from './sponsor-dialog-tier';

type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>['variant']>;

const ACCENT_UI: Record<
	SponsorSectionAccent,
	{
		dialogContent: string;
		header: string;
		logoFrame: string;
		dialogTitle: string;
		dialogDescription: string;
		separator: string;
		footer: string;
		bodyStrong: string;
		linkClass: string;
		triggerVariant: ButtonVariant;
		ctaVariant: ButtonVariant;
	}
> = {
	primary: {
		dialogContent: 'border border-border/80 border-t-[3px] border-t-primary',
		header: 'border-b border-b-primary/35 bg-gradient-to-br from-primary/16 via-background to-background',
		logoFrame: 'border-primary/50',
		dialogTitle: 'text-primary',
		dialogDescription: 'text-primary/90',
		separator: 'bg-primary/40',
		footer: 'border-t border-t-primary/30 bg-primary/8',
		bodyStrong: '[&_strong]:text-primary',
		linkClass: 'break-words text-primary underline-offset-2 hover:underline',
		triggerVariant: 'primary-outline',
		ctaVariant: 'primary-outline',
	},
	secondary: {
		dialogContent: 'border border-border/80 border-t-[3px] border-t-secondary',
		header: 'border-b border-b-secondary/35 bg-gradient-to-br from-secondary/16 via-background to-background',
		logoFrame: 'border-secondary/50',
		dialogTitle: 'text-secondary',
		dialogDescription: 'text-secondary/90',
		separator: 'bg-secondary/40',
		footer: 'border-t border-t-secondary/30 bg-secondary/8',
		bodyStrong: '[&_strong]:text-secondary',
		linkClass: 'break-words text-secondary underline-offset-2 hover:underline',
		triggerVariant: 'secondary-secondary',
		ctaVariant: 'secondary-secondary',
	},
	muted: {
		dialogContent: 'border border-border/80 border-t-[3px] border-t-muted',
		header: 'border-b border-b-muted/35 bg-gradient-to-br from-muted/16 via-background to-background',
		logoFrame: 'border-muted/50',
		dialogTitle: 'text-muted',
		dialogDescription: 'text-muted/90',
		separator: 'bg-muted/40',
		footer: 'border-t border-t-muted/30 bg-muted/8',
		bodyStrong: '[&_strong]:text-muted',
		linkClass: 'break-words text-muted underline-offset-2 hover:underline',
		triggerVariant: 'muted-secondary',
		ctaVariant: 'muted-secondary',
	},
};

function isHorizontalRule(p: string) {
	return p.startsWith('==');
}

export type SponsorReadMoreDialogProps = {
	name: string;
	description: string;
	url: string;
	logo: string;
	tier: SponsorDialogTier;
	onOpenChange?: (open: boolean) => void;
};

export function SponsorReadMoreDialog({
	name,
	description,
	url,
	logo,
	tier,
	onOpenChange,
}: SponsorReadMoreDialogProps) {
	const reducedMotion = useReducedMotion();
	const [open, setOpen] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const closingRef = useRef(false);

	const unoptimized = logo.endsWith('.svg');
	const accent = SPONSOR_DIALOG_TIER_ACCENT[tier];
	const ui = ACCENT_UI[accent];

	const motionDuration = reducedMotion ? 0 : 0.38;

	const handleOpenChange = (next: boolean) => {
		if (next) {
			closingRef.current = false;
			setIsClosing(false);
			setOpen(true);
			onOpenChange?.(true);
			return;
		}
		if (closingRef.current || !open) return;
		if (reducedMotion) {
			setOpen(false);
			onOpenChange?.(false);
			return;
		}
		closingRef.current = true;
		setIsClosing(true);
	};

	const onPanelAnimationComplete = () => {
		if (!closingRef.current) return;
		closingRef.current = false;
		setIsClosing(false);
		setOpen(false);
		onOpenChange?.(false);
	};

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>
				<Button variant={ui.triggerVariant} size="sm" className="gap-2">
					<BookOpen className="size-4 opacity-80" aria-hidden />
					Покажи повече
				</Button>
			</DialogTrigger>
			<DialogPortal>
				<DialogPrimitive.Overlay asChild>
					<motion.div
						data-slot="dialog-overlay"
						className="fixed inset-0 z-50 bg-black/50"
						initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
						animate={{
							opacity: reducedMotion ? 1 : isClosing ? 0 : 1,
						}}
						transition={{
							duration: motionDuration,
							ease: [...HERO_LIKE_EASE_OUT],
						}}
					/>
				</DialogPrimitive.Overlay>
				<div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-3">
					<DialogPrimitive.Content asChild>
						<motion.div
							data-slot="dialog-content"
							className={cn(
								'bg-background pointer-events-auto relative flex max-h-[min(90dvh,44rem)] min-h-0 w-full max-w-[calc(100%-1.5rem)] flex-col gap-0 overflow-hidden rounded-lg p-0 shadow-none outline-none sm:max-w-xl md:max-w-2xl',
							)}
							initial={
								reducedMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 18, scale: 0.97 }
							}
							animate={
								isClosing
									? { opacity: 0, y: 18, scale: 0.97 }
									: { opacity: 1, y: 0, scale: 1 }
							}
							transition={{
								duration: motionDuration,
								ease: [...HERO_LIKE_EASE_OUT],
							}}
							onAnimationComplete={onPanelAnimationComplete}
						>
							<div className="flex min-h-0 min-w-0 flex-1 flex-col">
								<div className={cn('shrink-0 px-6 py-6 border-b border-white/15')}>
									<DialogHeader className="space-y-0 text-center sm:text-left">
										<div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
											<div
												className={cn(
													'relative flex h-[4.5rem] w-[7.5rem] shrink-0 items-center justify-center rounded-xl border bg-white p-3'
												)}
												style={{ aspectRatio: '13/7' } as CSSProperties}
											>
												<Image
													src={logo}
													alt={name}
													width={120}
													height={84}
													className="h-full w-full object-contain"
													unoptimized={unoptimized}
												/>
											</div>
											<div className="min-w-0 flex-1">
												<DialogTitle
													className={cn(
														'text-2xl leading-tight font-normal tracking-tight md:text-3xl'
													)}
												>
													{name}
												</DialogTitle>
												<DialogDescription className={cn('text-base')}>
													{SPONSOR_DIALOG_TIER_LABELS[tier]}
												</DialogDescription>
											</div>
										</div>
									</DialogHeader>
								</div>

								<div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain px-6 py-4">
									<div
										className={cn(
											'space-y-3 text-base leading-relaxed text-foreground/90',
											ui.bodyStrong
										)}
									>
										{description.split('\n').map((p, i) =>
											isHorizontalRule(p) ? (
												<Separator key={i} className={cn('my-4', ui.separator)} />
											) : (
												<p key={i}>{parseBoldText(p, ui.linkClass)}</p>
											)
										)}
									</div>
								</div>

								<DialogFooter
									className={cn(
										'mt-auto shrink-0 flex-col gap-0 p-4 sm:flex-col sm:space-x-0',
										ui.footer
									)}
								>
									<Button asChild variant={ui.ctaVariant} size="lg" className="w-full gap-2">
										<Link
											href={url}
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center justify-center no-underline"
										>
											<span className="min-w-0 flex-1 text-center">Уебсайт на {name}</span>
											<ArrowUpRight className="size-4 shrink-0 opacity-90" aria-hidden />
										</Link>
									</Button>
								</DialogFooter>
							</div>
							<DialogPrimitive.Close
								type="button"
								className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground rounded-xs focus:outline-hidden absolute top-4 right-4 opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0"
							>
								<XIcon />
								<span className="sr-only">Close</span>
							</DialogPrimitive.Close>
						</motion.div>
					</DialogPrimitive.Content>
				</div>
			</DialogPortal>
		</Dialog>
	);
}
