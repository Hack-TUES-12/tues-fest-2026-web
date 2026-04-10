'use client';

import { TbChevronRight } from 'react-icons/tb';

import { cn } from '@/lib/utils';

import {
	regulationAccentClauseNumberClass,
	type RegulationAccent,
} from './regulation-accent';

export type RegulationTocItem = { readonly id: string; readonly label: string };

function rowSurfaceClass(accent: RegulationAccent, active: boolean): string {
	if (active) {
		switch (accent) {
			case 'primary':
				return 'border-primary/50 bg-primary/[0.12]';
			case 'secondary':
				return 'border-secondary/50 bg-secondary/[0.12]';
			case 'accent':
				return 'border-accent/50 bg-accent/[0.12]';
			case 'muted':
				return 'border-muted/50 bg-muted/[0.12]';
		}
	}
	switch (accent) {
		case 'primary':
			return 'border-white/[0.07] bg-white/[0.02] hover:border-primary/35 hover:bg-primary/[0.06]';
		case 'secondary':
			return 'border-white/[0.07] bg-white/[0.02] hover:border-secondary/35 hover:bg-secondary/[0.06]';
		case 'accent':
			return 'border-white/[0.07] bg-white/[0.02] hover:border-accent/35 hover:bg-accent/[0.06]';
		case 'muted':
			return 'border-white/[0.07] bg-white/[0.02] hover:border-muted/35 hover:bg-muted/[0.06]';
	}
}

function focusRingClass(accent: RegulationAccent): string {
	switch (accent) {
		case 'primary':
			return 'focus-visible:ring-primary/45';
		case 'secondary':
			return 'focus-visible:ring-secondary/45';
		case 'accent':
			return 'focus-visible:ring-accent/45';
		case 'muted':
			return 'focus-visible:ring-muted/45';
	}
}

function numberHoverClass(accent: RegulationAccent): string {
	switch (accent) {
		case 'primary':
			return 'group-hover:text-primary';
		case 'secondary':
			return 'group-hover:text-secondary';
		case 'accent':
			return 'group-hover:text-accent';
		case 'muted':
			return 'group-hover:text-muted';
	}
}

export function RegulationToc({
	items,
	sectionAccents,
	isSectionActive,
	currentSectionId,
	onNavigate,
}: {
	items: readonly RegulationTocItem[];
	sectionAccents: readonly RegulationAccent[];
	isSectionActive: (sectionId: string) => boolean;
	/** Single id for `aria-current` (reading line). */
	currentSectionId: string | null;
	onNavigate: (sectionId: string) => void;
}) {
	const count = items.length;

	return (
		<div
			id="regulation-toc"
			className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-card/95 via-card/80 to-card/60 shadow-sm backdrop-blur-md"
		>
			<div
				className="pointer-events-none absolute inset-0 opacity-[0.35]"
				aria-hidden
				style={{
					background:
						'radial-gradient(120% 80% at 0% 0%, color-mix(in srgb, var(--color-primary) 22%, transparent), transparent 55%), radial-gradient(90% 70% at 100% 100%, color-mix(in srgb, var(--color-accent) 18%, transparent), transparent 50%)',
				}}
			/>

			<div className="relative px-5 py-6 sm:px-7 sm:py-8">
				<div className="flex flex-wrap items-end justify-between gap-3 border-b border-white/10 pb-5">
					<div>
						<p className="font-title text-xs tracking-[0.2em] text-primary/90">Навигация</p>
						<h2 className="mt-1 font-title text-2xl tracking-wide text-white sm:text-[1.65rem]">Съдържание</h2>
					</div>
					<p className="font-mono text-xs tabular-nums text-foreground/45 sm:text-sm">
						{count} {count === 1 ? 'раздел' : 'раздела'}
					</p>
				</div>

				<nav aria-label="Съдържание на регламента" className="mt-5">
					<ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-x-3 sm:gap-y-2.5">
						{items.map((item, index) => {
							const n = index + 1;
							const accent = sectionAccents[index] ?? 'primary';
							const active = isSectionActive(item.id);
							const isCurrentLocation = currentSectionId === item.id;
							return (
								<li key={item.id}>
									<button
										type="button"
										onClick={() => onNavigate(item.id)}
										aria-current={isCurrentLocation ? 'location' : undefined}
										className={cn(
											'cursor-pointer group flex w-full items-center gap-3 rounded-xl border text-left transition-[border-color,background-color,color] duration-200 sm:gap-3.5',
											'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
											focusRingClass(accent),
											rowSurfaceClass(accent, active),
											'px-3 py-3 sm:px-3.5 sm:py-3',
										)}
									>
										<span
											className={cn(
												'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border font-title text-sm tabular-nums transition-colors sm:h-10 sm:w-10 sm:text-base',
												active
													? cn('border-black/25 bg-black/20', regulationAccentClauseNumberClass(accent))
													: cn(
															'border-white/10 bg-black/15 text-foreground/45',
															numberHoverClass(accent),
														),
											)}
										>
											{n}
										</span>
										<span
											className={cn(
												'min-w-0 flex-1 text-[0.9375rem] leading-snug sm:text-base',
												active ? 'font-medium text-white' : 'text-foreground/80',
											)}
										>
											{item.label}
										</span>
										<TbChevronRight
											className={cn(
												'size-4 shrink-0 transition-transform duration-200 sm:size-[1.125rem]',
												'translate-x-0 group-hover:translate-x-0.5',
												active
													? regulationAccentClauseNumberClass(accent)
													: cn('text-foreground/25', numberHoverClass(accent)),
											)}
											aria-hidden
										/>
									</button>
								</li>
							);
						})}
					</ul>
				</nav>
			</div>
		</div>
	);
}
