'use client';

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

const Gallery = ({ name, images }: { name: string; images: readonly string[] }) => {
	const [modal, setModal] = useState(false);
	const [index, setIndex] = useState(0);

	const openModal = (i: number) => {
		setIndex(i);
		setModal(true);
	};

	return (
		<>
			<div className="rounded-2xl border border-white/10 bg-card/50 p-6 backdrop-blur-sm md:p-8">
				<p className="mb-4 text-xs font-medium uppercase tracking-widest text-white/40">Галерия</p>
				<div className="flex gap-3 overflow-x-auto pb-2">
					{images.map((image, i) => (
						<button
							key={image}
							onClick={() => openModal(i)}
							className="group relative aspect-square h-40 shrink-0 overflow-hidden rounded-xl border border-white/10 transition-all duration-300 hover:border-white/30 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:h-48"
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
			{modal && <GalleryModal images={images} startingIndex={index} closeModal={() => setModal(false)} />}
		</>
	);
};

export default Gallery;
