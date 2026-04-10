'use client';

import type { ReactNode } from 'react';

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import {
	RegulationAccentProvider,
	regulationAccentOpenTriggerClass,
	regulationAccentTriggerHoverClass,
	type RegulationAccent,
} from './regulation-accent';

const bodyTypography = 'text-[1.0625rem] leading-[1.75] md:text-lg md:leading-[1.8]';

const triggerBase = 'font-title text-lg text-white hover:no-underline md:text-xl';

export function RegulationAccordionSection({
	sectionId,
	title,
	accent,
	children,
	triggerClassName,
}: {
	/** DOM id for in-page anchors (e.g. `section-3`). */
	sectionId: string;
	title: ReactNode;
	/** Theme color for open trigger title and clause numbers inside this section. */
	accent: RegulationAccent;
	children: ReactNode;
	triggerClassName?: string;
}) {
	return (
		<Card className="border-white/10 bg-card/80 gap-0 shadow-sm backdrop-blur-sm sm:px-4">
			<CardContent>
				<Accordion type="single" collapsible defaultValue="open">
					<AccordionItem value="open" id={sectionId} className="scroll-mt-28 border-0">
						<AccordionTrigger
							className={cn(
								triggerBase,
								regulationAccentTriggerHoverClass(accent),
								regulationAccentOpenTriggerClass(accent),
								triggerClassName,
								"cursor-pointer font-bold"
							)}
						>
							{title}
						</AccordionTrigger>
						<AccordionContent className={cn(
							bodyTypography,
							"px-3 sm:px-6"
						)}>
							<RegulationAccentProvider accent={accent}>{children}</RegulationAccentProvider>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</CardContent>
		</Card>
	);
}
