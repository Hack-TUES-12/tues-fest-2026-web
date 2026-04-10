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
import { RegulationTimelineRail } from './regulation-timeline-rail';

const bodyTypography = 'text-[1.0625rem] leading-[1.75] md:text-lg md:leading-[1.8]';

const triggerBase = 'font-title text-lg text-white hover:no-underline md:text-xl';

export function RegulationAccordionSection({
	sectionId,
	title,
	accent,
	isActive,
	isFirst,
	isLast,
	children,
	triggerClassName,
}: {
	/** DOM id for in-page anchors (e.g. `section-3`). */
	sectionId: string;
	title: ReactNode;
	/** Theme color for open trigger title, clause numbers, and timeline when in view. */
	accent: RegulationAccent;
	/** Section is in the reading viewport — timeline line/dot use accent color. */
	isActive: boolean;
	isFirst?: boolean;
	isLast?: boolean;
	children: ReactNode;
	triggerClassName?: string;
}) {
	return (
		<div id={sectionId} className="scroll-mt-28 flex gap-2 sm:gap-4">
			<RegulationTimelineRail
				accent={accent}
				isActive={isActive}
				isFirst={isFirst}
				isLast={isLast}
			/>
			<div className="min-w-0 flex-1">
				<Card className="border-white/10 bg-card/80 gap-0 shadow-sm backdrop-blur-sm sm:px-4">
					<CardContent>
						<Accordion type="single" collapsible defaultValue="open">
							<AccordionItem value="open" className="border-0">
								<AccordionTrigger
									className={cn(
										triggerBase,
										regulationAccentTriggerHoverClass(accent),
										regulationAccentOpenTriggerClass(accent),
										triggerClassName,
										'cursor-pointer font-bold',
									)}
								>
									{title}
								</AccordionTrigger>
								<AccordionContent
									className={cn(bodyTypography, 'px-3 sm:px-6')}
								>
									<RegulationAccentProvider accent={accent}>{children}</RegulationAccentProvider>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
