'use client';

import { cn } from '@/lib/utils';

import {
	regulationAccentBgClass,
	regulationAccentGlowVar,
	regulationAccentInactiveBgClass,
	regulationAccentInactiveEndVar,
	type RegulationAccent,
} from './regulation-accent';

const railDotSizes = {
	default: {
		column: 'w-9',
		dotWrap: 'h-7 w-7',
		inactive: 'h-4 w-4',
		activeOuter: 'h-7 w-7',
		activeInner: 'h-5 w-5',
		glowSpread: '24px 6px',
	},
	sm: {
		column: 'w-7',
		dotWrap: 'h-5 w-5',
		inactive: 'h-3 w-3',
		activeOuter: 'h-5 w-5',
		activeInner: 'h-3 w-3',
		glowSpread: '16px 4px',
	},
} as const;

/**
 * Vertical timeline rail (Statistics FolderNavigation dot + 2px line language).
 * Lines and dot use the section accent while `isActive`; otherwise that hue’s dark inactive token.
 */
export function RegulationTimelineRail({
	accent,
	isActive,
	isFirst,
	isLast,
	size = 'default',
}: {
	accent: RegulationAccent;
	isActive: boolean;
	isFirst?: boolean;
	isLast?: boolean;
	/** Smaller dot stack — e.g. schedule page. */
	size?: keyof typeof railDotSizes;
}) {
	const dim = railDotSizes[size];
	const lineActive = regulationAccentBgClass(accent);
	const lineInactive = regulationAccentInactiveBgClass(accent);
	const glow = regulationAccentGlowVar(accent);
	const inactiveEnd = regulationAccentInactiveEndVar(accent);
	const lineGradient = (endVar: string) =>
		`linear-gradient(to bottom, transparent 0%, ${endVar} 35%, ${endVar} 100%)`;

	const opacityFade = 'transition-opacity duration-300 ease-out';

	return (
		<div
			className={cn('flex shrink-0 flex-col items-center self-stretch py-1', dim.column)}
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
			<div
				className={cn(
					'relative flex shrink-0 items-center justify-center',
					dim.dotWrap,
				)}
			>
				<div
					className={cn(
						'absolute inset-0 flex items-center justify-center',
						opacityFade,
					)}
					style={{ opacity: isActive ? 0 : 1 }}
				>
					<div
						className={cn('rounded-full', dim.inactive, lineInactive)}
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
					<div
						className={cn(
							'flex items-center justify-center rounded-full border-2 border-black',
							dim.activeOuter,
						)}
					>
						<div
							className={cn('rounded-full', dim.activeInner, lineActive)}
							style={{
								boxShadow: `0 0 0 2px white, 0 0 ${dim.glowSpread} ${glow}`,
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
