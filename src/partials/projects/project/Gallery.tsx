'use client';

import { Card } from '@/components/ui/card';
import {
	isProjectCategory,
	PROJECT_CATEGORY_NAV_HOVER_BG_CLASS,
	PROJECT_CATEGORY_THEME_COLOR_VAR,
} from '@/constants/projects';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { TbChevronLeft, TbChevronRight, TbX } from 'react-icons/tb';
import invariant from 'tiny-invariant';

const GalleryModal = ({
	images,
	startingIndex,
	closeModal,
}: {
	images: readonly string[];
	startingIndex: number;
	closeModal: () => void;
}) => {
	const [index, setIndex] = useState(startingIndex);
	const modalRef = useRef<HTMLDivElement>(null);

	const next = useCallback(() => {
		setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
	}, [images.length]);

	const prev = useCallback(() => {
		setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
	}, [images.length]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') closeModal();
			if (e.key === 'ArrowRight') next();
			if (e.key === 'ArrowLeft') prev();
			if ([' ', 'Enter', 'Tab', 'Backspace'].includes(e.key)) e.preventDefault();
		};

		const handleWheel = (e: WheelEvent) => {
			e.preventDefault();
			setTimeout(() => (e.deltaY > 0 ? next() : prev()), 500);
		};

		const handleOutsideClick = (e: MouseEvent) => {
			if (modalRef.current && !modalRef.current.contains(e.target as Node)) closeModal();
		};

		document.addEventListener('keydown', handleKeyDown);
		document.addEventListener('wheel', handleWheel, { passive: false });
		document.addEventListener('click', handleOutsideClick);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.removeEventListener('wheel', handleWheel);
			document.removeEventListener('click', handleOutsideClick);
		};
	}, [closeModal, next, prev]);

	const activeImage = images[index];
	invariant(activeImage, 'Invalid gallery image index');

	return (
		<div className="fixed inset-0 z-[1001] flex items-center justify-center bg-black/70 backdrop-blur-md">
			<div ref={modalRef} className="relative flex h-full w-full max-w-screen-lg flex-col">
				{/* Close */}
				<div className="absolute left-4 top-4 z-10">
					<button
						className="flex items-center gap-2 rounded-xl border border-white/20 bg-black/60 px-4 py-2 text-sm text-white backdrop-blur-sm transition-colors hover:bg-white/10"
						onClick={closeModal}
					>
						<TbX className="size-4" />
						Затвори
					</button>
				</div>

				{/* Counter */}
				<div className="absolute right-4 top-4 z-10">
					<span className="rounded-xl border border-white/20 bg-black/60 px-4 py-2 text-sm text-white/70 backdrop-blur-sm">
						{index + 1} / {images.length}
					</span>
				</div>

				{/* Image */}
				<div className="flex h-full items-center justify-center p-16">
					<img
						src={activeImage}
						alt={`снимка ${index + 1} на проект`}
						className="max-h-full max-w-full rounded-2xl object-contain shadow-2xl"
					/>
				</div>

				{/* Prev */}
				<div className="absolute left-4 top-1/2 z-10 -translate-y-1/2">
					<button
						className="flex items-center justify-center rounded-xl border border-white/20 bg-black/60 p-3 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/10"
						onClick={prev}
					>
						<TbChevronLeft size={24} />
					</button>
				</div>

				{/* Next */}
				<div className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
					<button
						className="flex items-center justify-center rounded-xl border border-white/20 bg-black/60 p-3 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/10"
						onClick={next}
					>
						<TbChevronRight size={24} />
					</button>
				</div>
			</div>
		</div>
	);
};

const scrollThumbStripClasses =
	'scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden';

function GalleryStripNavButton({
	direction,
	disabled,
	onClick,
	ariaLabel,
	themeColorVar,
	hoverBgClass,
}: {
	direction: 'left' | 'right';
	disabled: boolean;
	onClick: () => void;
	ariaLabel: string;
	themeColorVar: string;
	hoverBgClass: string;
}) {
	const Icon = direction === 'left' ? ChevronLeft : ChevronRight;
	return (
		<button
			type="button"
			aria-label={ariaLabel}
			disabled={disabled}
			onClick={onClick}
			className={cn(
				'flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-30',
				hoverBgClass,
			)}
			style={{
				borderColor: `var(${themeColorVar})`,
				color: `var(${themeColorVar})`,
			}}
		>
			<Icon className="h-5 w-5" aria-hidden />
		</button>
	);
}

const Gallery = ({
	name,
	images,
	category,
}: {
	name: string;
	images: readonly string[];
	category: string;
}) => {
	const [modal, setModal] = useState(false);
	const [modalStartIndex, setModalStartIndex] = useState(0);
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(false);
	const [hasOverflow, setHasOverflow] = useState(false);

	const scrollerRef = useRef<HTMLDivElement>(null);

	const openModal = (i: number) => {
		setModalStartIndex(i);
		setModal(true);
	};

	const updateScrollState = useCallback(() => {
		const el = scrollerRef.current;
		if (!el) return;
		const { scrollLeft, scrollWidth, clientWidth } = el;
		const overflow = scrollWidth > clientWidth + 1;
		setHasOverflow(overflow);
		setCanScrollLeft(scrollLeft > 2);
		setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 2);
	}, []);

	const getScrollStep = useCallback(() => {
		const el = scrollerRef.current;
		if (!el) return 200;
		const thumb = el.querySelector<HTMLElement>('[data-gallery-thumb]');
		if (!thumb) return 200;
		const row = thumb.parentElement;
		const gap = row ? Number.parseFloat(getComputedStyle(row).gap) || 12 : 12;
		return thumb.offsetWidth + gap;
	}, []);

	const scrollStrip = useCallback(
		(direction: -1 | 1) => {
			const el = scrollerRef.current;
			if (!el) return;
			el.scrollBy({ left: direction * getScrollStep(), behavior: 'smooth' });
		},
		[getScrollStep],
	);

	useEffect(() => {
		updateScrollState();
	}, [images, updateScrollState]);

	useEffect(() => {
		const el = scrollerRef.current;
		if (!el) return;
		const ro = new ResizeObserver(() => updateScrollState());
		ro.observe(el);
		el.addEventListener('scroll', updateScrollState, { passive: true });
		return () => {
			ro.disconnect();
			el.removeEventListener('scroll', updateScrollState);
		};
	}, [updateScrollState]);

	invariant(images.length > 0, 'Gallery has no images');

	const themeColorVar = isProjectCategory(category)
		? PROJECT_CATEGORY_THEME_COLOR_VAR[category]
		: PROJECT_CATEGORY_THEME_COLOR_VAR.software;
	const navHoverBgClass = isProjectCategory(category)
		? PROJECT_CATEGORY_NAV_HOVER_BG_CLASS[category]
		: PROJECT_CATEGORY_NAV_HOVER_BG_CLASS.software;

	return (
		<>
			<div
				role="region"
				aria-label={`Галерия снимки за ${name}`}
				className={cn('w-full', hasOverflow && 'flex items-center gap-4')}
			>
				{hasOverflow && (
					<GalleryStripNavButton
						direction="left"
						ariaLabel="Превърти галерията наляво"
						disabled={!canScrollLeft}
						themeColorVar={themeColorVar}
						hoverBgClass={navHoverBgClass}
						onClick={() => scrollStrip(-1)}
					/>
				)}

				<Card
					className={cn(
						'rounded-2xl bg-card/50 px-6 py-8 backdrop-blur-sm',
						hasOverflow && 'min-w-0 flex-1',
					)}
				>
					<div
						ref={scrollerRef}
						className={cn('overflow-x-auto pb-2', scrollThumbStripClasses)}
					>
						<div className="flex w-max gap-3">
							{images.map((image, i) => (
								<button
									key={image}
									type="button"
									data-gallery-thumb
									onClick={() => openModal(i)}
									className="cursor-pointer group relative aspect-square h-40 shrink-0 overflow-hidden rounded-xl transition-all duration-300 hover:border-white/30 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:h-48"
								>
									<img
										src={image}
										alt={`снимка ${i + 1} от проект ${name}`}
										className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
									/>
									<div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
								</button>
							))}
						</div>
					</div>
				</Card>

				{hasOverflow && (
					<GalleryStripNavButton
						direction="right"
						ariaLabel="Превърти галерията надясно"
						disabled={!canScrollRight}
						themeColorVar={themeColorVar}
						hoverBgClass={navHoverBgClass}
						onClick={() => scrollStrip(1)}
					/>
				)}
			</div>
			{modal && (
				<GalleryModal
					images={images}
					startingIndex={modalStartIndex}
					closeModal={() => setModal(false)}
				/>
			)}
		</>
	);
};

export default Gallery;
