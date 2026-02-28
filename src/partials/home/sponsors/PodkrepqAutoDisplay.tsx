'use client';

import { useEffect, useState, useMemo, useCallback, Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Globe } from 'lucide-react';
import invariant from 'tiny-invariant';

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
import { Podkrepqsht } from '@/constants/home/sponsors';
import { cn, parseBoldText } from '@/lib/utils';

// ─── Constants ────────────────────────────────────────────────────────────────

const CENTER_SLOT_INDEX = 3;
const VISIBLE_SLOTS = 7;
const AUTO_ADVANCE_INTERVAL = 4000;
const ROLL_STEP_DELAY = 200;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function normalizeIndex(index: number, length: number): number {
	if (index < 0) return length + index;
	if (index >= length) return index - length;
	return index;
}

function calculateShortestDistance(from: number, to: number, length: number): number {
	const directDistance = to - from;
	const wrappedDistance = directDistance > 0 ? directDistance - length : directDistance + length;
	return Math.abs(directDistance) <= length / 2 ? directDistance : wrappedDistance;
}

/** Vertical offset for non-center logos so the row has a slight arc shape */
function getTranslateY(distance: number): string {
	const abs = Math.abs(distance);
	if (abs === 1) return '-50%';
	if (abs === 2) return '-25%';
	if (abs === 3) return '25%';
	return '0%';
}

function shouldShowDescription(description?: string) {
	return description && !description.toLowerCase().includes('lorem ipsum');
}

function isHorizontalRule(p: string) {
	return p.startsWith('==');
}

// ─── Read-more dialog ────────────────────────────────────────────────────────

function PodkrepqReadMore({
	name,
	description,
	url,
	onOpenChange,
}: {
	name: string;
	description: string;
	url: string;
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
						<DialogTitle>{name}</DialogTitle>
					</DialogHeader>
					<div className="space-y-1 text-sm">
						{description?.split('\n').map((p, i) =>
							isHorizontalRule(p) ? <Separator key={i} /> : <p key={i}>{parseBoldText(p)}</p>
						)}
					</div>
					<DialogFooter>
						<Button asChild variant="outline" className="w-full min-w-0 break-words sm:w-auto">
							<Link href={url} target="_blank" className="flex items-center justify-center break-words">
								<Globe className="mr-2 h-4 w-4 shrink-0" />
								<span className="break-words">Уебсайт на {name}</span>
							</Link>
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}

// ─── Partner info card ────────────────────────────────────────────────────────

function PartnerCard({
	podkrepqsht,
	setIsPaused = () => {},
}: {
	podkrepqsht: Podkrepqsht;
	setIsPaused?: Dispatch<SetStateAction<boolean>>;
}) {
	return (
		<Card className="relative flex w-full flex-col p-8">
			<CardTitle className="mb-6 text-center font-medium">{podkrepqsht.name}</CardTitle>
			<CardContent className="min-h-0 flex-shrink flex-grow p-5">
				<div className="h-full">
					{shouldShowDescription(podkrepqsht.description) ? (
						<>
							<div className="flex h-42 flex-shrink flex-grow flex-col overflow-clip">
								<div className="inline-flex h-full flex-1 flex-shrink flex-grow flex-col text-center [mask-image:linear-gradient(to_bottom,black,black_calc(100%_-_1.5rem),transparent)]">
									{podkrepqsht.description!.split('\n').map((p, i) =>
										isHorizontalRule(p) ? (
											<Separator key={i} />
										) : (
											<p key={i}>{parseBoldText(p)}</p>
										)
									)}
								</div>
							</div>
							<PodkrepqReadMore
								name={podkrepqsht.name}
								url={podkrepqsht.url}
								description={podkrepqsht.description!}
								onOpenChange={setIsPaused}
							/>
						</>
					) : (
						<div className="flex h-[150px] flex-col items-center justify-center gap-1">
							<p className="flex flex-1 flex-col justify-center text-center text-xl font-bold">
								Благодарим на {podkrepqsht.name} за подкрепата!
							</p>
							<p className="justify-self-end">
								<Link href={podkrepqsht.url} target="_blank">
									<Button variant="ghost">Уебсайт</Button>
								</Link>
							</p>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}

// ─── Main carousel ────────────────────────────────────────────────────────────

export default function PodkrepqAutoDisplay({
	podkrepqshti,
	imagePriority,
	startIndex,
}: {
	podkrepqshti: Podkrepqsht[];
	imagePriority?: boolean;
	startIndex?: number;
}) {
	invariant(
		!startIndex || (startIndex >= 0 && startIndex < podkrepqshti.length),
		'startIndex must be a valid index'
	);

	// Duplicate the array until we have at least VISIBLE_SLOTS entries
	const expandedList = useMemo(() => {
		if (podkrepqshti.length > VISIBLE_SLOTS) return podkrepqshti;
		const repeatCount = Math.floor(VISIBLE_SLOTS / podkrepqshti.length) + 1;
		return Array.from({ length: repeatCount }, () => podkrepqshti).flat();
	}, [podkrepqshti]);

	const [liveIndex, setLiveIndex] = useState(startIndex ?? 0);
	const [isPaused, setIsPaused] = useState(false);
	const [isRolling, setIsRolling] = useState(false);

	// Auto-advance
	useEffect(() => {
		if (isPaused || isRolling) return;
		const id = setInterval(() => {
			setLiveIndex((prev) => (prev === expandedList.length - 1 ? 0 : prev + 1));
		}, AUTO_ADVANCE_INTERVAL);
		return () => clearInterval(id);
	}, [expandedList.length, isPaused, isRolling]);

	// Animated roll to a specific slot
	const rollToIndex = useCallback(
		(targetIndex: number) => {
			if (targetIndex === liveIndex || isRolling) return;
			setIsRolling(true);
			const steps = calculateShortestDistance(liveIndex, targetIndex, expandedList.length);
			const stepCount = Math.abs(steps);
			const direction = steps > 0 ? 1 : -1;
			let currentStep = 0;

			const rollInterval = setInterval(() => {
				currentStep++;
				setLiveIndex((prev) => {
					if (direction > 0) return prev === expandedList.length - 1 ? 0 : prev + 1;
					return prev === 0 ? expandedList.length - 1 : prev - 1;
				});
				if (currentStep >= stepCount) {
					clearInterval(rollInterval);
					setIsRolling(false);
				}
			}, ROLL_STEP_DELAY);
		},
		[liveIndex, isRolling, expandedList.length]
	);

	// Which array items fill each of the 7 visible slots
	const visibleLogos = useMemo(() => {
		return Array.from({ length: VISIBLE_SLOTS }, (_, slotIndex) => {
			const offset = slotIndex - CENTER_SLOT_INDEX;
			const index = normalizeIndex(liveIndex + offset, expandedList.length);
			return { podkrepqsht: expandedList[index], actualIndex: index };
		});
	}, [liveIndex, expandedList]);

	return (
		<div className="flex flex-col items-center justify-center gap-12">
			{/* ── Logo row ── */}
			<div className="relative mx-auto h-40 w-full max-w-7xl px-4 sm:h-40 md:h-52 mb-4">
				{visibleLogos.map(({ podkrepqsht, actualIndex }, slotIndex) => {
					const distanceFromCenter = slotIndex - CENTER_SLOT_INDEX;
					const isCenter = slotIndex === CENTER_SLOT_INDEX;
					const logoSrc = podkrepqsht.logo;
					const isStringSrc = typeof logoSrc === 'string';
					const unoptimized = isStringSrc && (logoSrc as string).endsWith('.svg');

					return (
						<Link
							key={actualIndex}
							href={podkrepqsht.url}
							target="_blank"
							className={cn(
								'absolute left-1/2 top-1/2 flex items-center justify-center transition-all duration-700 ease-in-out',
								isCenter ? 'z-25' : 'z-20'
							)}
							style={{
								transform: `translateX(calc(-50% + ${distanceFromCenter * 110}%)) translateY(${getTranslateY(distanceFromCenter)}) scale(${isCenter ? 1.6 : 1})`,
							}}
							onClick={(e) => {
								e.preventDefault();
								if (!isCenter) {
									rollToIndex(actualIndex);
								} else {
									window.open(podkrepqsht.url, '_blank');
								}
							}}
						>
							<div
								className={cn(
									'relative w-36 rounded-sm shadow-[0_4px_6px_-1px_rgba(0,0,0,0.7)] transition-all duration-700 ease-in-out md:w-56',
									'customClass' in podkrepqsht &&
										typeof podkrepqsht.customClass === 'string' &&
										podkrepqsht.customClass
										? podkrepqsht.customClass
										: 'bg-white'
								)}
								style={{ aspectRatio: '13/7' } as React.CSSProperties}
							>
								<div className="absolute inset-0 box-border flex items-center justify-center p-4">
									<Image
										src={logoSrc as string}
										alt={podkrepqsht.name}
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
										priority={imagePriority}
										unoptimized={unoptimized}
										loading={imagePriority ? 'eager' : 'lazy'}
									/>
								</div>
							</div>
						</Link>
					);
				})}
			</div>

			{/* ── Partner info card ── */}
			<div className="relative mt-4 flex w-full items-start justify-center min-h-[1000px] sm:min-h-[600px] md:w-[500px] md:min-h-[500px] lg:w-[600px] lg:min-h-[650px] 2xl:min-h-[750px]">
				<div className="w-full">
					<PartnerCard podkrepqsht={expandedList[liveIndex]} setIsPaused={setIsPaused} />
				</div>
			</div>
		</div>
	);
}
