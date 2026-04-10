'use client';

import { cn } from '@/lib/utils';

import {
	regulationAccentBgClass,
	regulationAccentGlowVar,
	type RegulationAccent,
} from './regulation-accent';

const lineInactive = 'bg-dark-muted';

/**
 * Vertical timeline rail (Statistics FolderNavigation dot + 2px line language).
 * Lines and dot use the section accent only while `isActive`; otherwise `dark-muted`.
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
	const glow = regulationAccentGlowVar(accent);

	return (
		<div
			className="flex w-9 shrink-0 flex-col items-center self-stretch py-1"
			aria-hidden
		>
			{/* Long stroke above; dot sits at its lower end, then a short tail below. */}
			<div
				className={cn(
					'w-[2px] flex-1 rounded-full transition-colors duration-300 ease-out mb-0.5',
					isActive ? lineActive : lineInactive,
					isFirst && 'min-h-3',
				)}
			/>
			<div className="flex shrink-0 items-center justify-center">
				{isActive ? (
					<div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-black transition-all duration-300">
						<div
							className={cn('h-5 w-5 rounded-full', lineActive)}
							style={{
								boxShadow: `0 0 0 2px white, 0 0 24px 6px ${glow}`,
							}}
						/>
					</div>
				) : (
					<div
						className="h-4 w-4 rounded-full bg-dark-muted transition-colors duration-300"
						style={{ boxShadow: '0 0 0 2px var(--background)' }}
					/>
				)}
			</div>
		</div>
	);
}
