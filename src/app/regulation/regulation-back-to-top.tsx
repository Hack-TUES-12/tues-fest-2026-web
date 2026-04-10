'use client';

import { useEffect, useState } from 'react';
import { TbChevronUp } from 'react-icons/tb';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const SHOW_AFTER_Y = 400;
/** Space between button bottom and footer top when the footer is in view. */
const FOOTER_GAP_PX = 64;

function defaultBottomPx(): number {
	if (typeof window === 'undefined') return 24;
	return window.matchMedia('(min-width: 768px)').matches ? 32 : 24;
}

export function RegulationBackToTop() {
	const [visible, setVisible] = useState(false);
	const [bottomPx, setBottomPx] = useState(24);

	useEffect(() => {
		const update = () => {
			setVisible(window.scrollY > SHOW_AFTER_Y);

			const footer = document.querySelector('footer');
			const base = defaultBottomPx();
			if (!footer) {
				setBottomPx(base);
				return;
			}

			const rect = footer.getBoundingClientRect();
			const vh = window.innerHeight;
			// Lift by this many px from the viewport bottom so the button clears the footer.
			const liftPx = vh - rect.top + FOOTER_GAP_PX;
			setBottomPx(Math.max(base, liftPx));
		};

		update();
		window.addEventListener('scroll', update, { passive: true });
		window.addEventListener('resize', update);
		return () => {
			window.removeEventListener('scroll', update);
			window.removeEventListener('resize', update);
		};
	}, []);

	return (
		<Button
			type="button"
			variant="primary-outline"
			size="icon"
			aria-label="Към началото на страницата"
			tabIndex={visible ? 0 : -1}
			className={cn(
				'fixed right-4 z-50 size-11 rounded-full shadow-lg transition-[opacity,transform,visibility] duration-300 md:right-8',
				visible
					? 'visible pointer-events-auto translate-y-0 opacity-100'
					: 'invisible pointer-events-none translate-y-2 opacity-0',
			)}
			style={{ bottom: bottomPx }}
			onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
		>
			<TbChevronUp className="size-6" aria-hidden />
		</Button>
	);
}
