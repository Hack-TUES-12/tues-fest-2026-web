'use client';

import { createContext, useContext, type ReactNode } from 'react';

export type RegulationAccent = 'primary' | 'secondary' | 'accent' | 'muted';

const RegulationAccentContext = createContext<RegulationAccent>('primary');

export function RegulationAccentProvider({
	accent,
	children,
}: {
	accent: RegulationAccent;
	children: ReactNode;
}) {
	return <RegulationAccentContext.Provider value={accent}>{children}</RegulationAccentContext.Provider>;
}

export function useRegulationAccent(): RegulationAccent {
	return useContext(RegulationAccentContext);
}

/** Accordion trigger label on hover (Tailwind needs full class strings — no dynamic `hover:text-${x}`). */
export function regulationAccentTriggerHoverClass(accent: RegulationAccent): string {
	switch (accent) {
		case 'primary':
			return 'hover:text-primary';
		case 'secondary':
			return 'hover:text-secondary';
		case 'accent':
			return 'hover:text-accent';
		case 'muted':
			return 'hover:text-muted';
	}
}

/** Open accordion trigger label color. */
export function regulationAccentOpenTriggerClass(accent: RegulationAccent): string {
	switch (accent) {
		case 'primary':
			return '[&[data-state=open]]:text-primary';
		case 'secondary':
			return '[&[data-state=open]]:text-secondary';
		case 'accent':
			return '[&[data-state=open]]:text-accent';
		case 'muted':
			return '[&[data-state=open]]:text-muted';
	}
}

/** Clause numbering (e.g. “1.1.”) color — matches section accent. */
export function regulationAccentClauseNumberClass(accent: RegulationAccent): string {
	switch (accent) {
		case 'primary':
			return 'text-primary';
		case 'secondary':
			return 'text-secondary';
		case 'accent':
			return 'text-accent';
		case 'muted':
			return 'text-muted';
	}
}
