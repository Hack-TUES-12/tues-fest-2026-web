'use client';

import { cn } from '@/lib/utils';

import {
	regulationAccentBgClass,
	regulationAccentGlowVar,
	regulationAccentInactiveBgClass,
	regulationAccentInactiveEndVar,
	type RegulationAccent,
} from './regulation-accent';

/**
 * Vertical timeline rail (Statistics FolderNavigation dot + 2px line language).
 * Lines and dot use the section accent while `isActive`; otherwise that hue’s dark inactive token.
 */
export function RegulationTimelineRail({
	accent,
	isActive,
	isFirst,
	isLast,
}: {
	accent: RegulationAccent;
	isActive: boolean;
	isFirst?: boolean;
	isLast?: boolean;
}) {
	const lineActive = regulationAccentBgClass(accent);
	const lineInactive = regulationAccentInactiveBgClass(accent);
	const glow = regulationAccentGlowVar(accent);
	const inactiveEnd = regulationAccentInactiveEndVar(accent);
	const lineGradient = (endVar: string) =>
		`linear-gradient(to bottom, transparent 0%, ${endVar} 35%, ${endVar} 100%)`;

	const opacityFade = 'transition-opacity duration-300 ease-out';

	return (
		<div
			className="flex w-9 shrink-0 flex-col items-center self-stretch py-1"
			aria-hidden
		>
			{/* Long stroke: crossfade inactive vs active gradients (CSS cannot interpolate gradient strings). */}
			<div
				className={cn('relative w-[2px] flex-1 rounded-full mb-0.5', isFirst && 'min-h-3')}
			>
				<div
					className={cn(
						'pointer-events-none absolute inset-0 rounded-full',
						opacityFade,
					)}
					style={{
						background: lineGradient(inactiveEnd),
						opacity: isActive ? 0 : 1,
					}}
				/>
				<div
					className={cn(
						'pointer-events-none absolute inset-0 rounded-full',
						opacityFade,
					)}
					style={{
						background: lineGradient(glow),
						opacity: isActive ? 1 : 0,
					}}
				/>
			</div>
			<div className="relative flex h-7 w-7 shrink-0 items-center justify-center">
				<div
					className={cn(
						'absolute inset-0 flex items-center justify-center',
						opacityFade,
					)}
					style={{ opacity: isActive ? 0 : 1 }}
				>
					<div
						className={cn('h-4 w-4 rounded-full', lineInactive)}
						style={{ boxShadow: '0 0 0 2px var(--background)' }}
					/>
				</div>
				<div
					className={cn(
						'absolute inset-0 flex items-center justify-center',
						opacityFade,
					)}
					style={{ opacity: isActive ? 1 : 0 }}
				>
					<div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-black">
						<div
							className={cn('h-5 w-5 rounded-full', lineActive)}
							style={{
								boxShadow: `0 0 0 2px white, 0 0 24px 6px ${glow}`,
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
