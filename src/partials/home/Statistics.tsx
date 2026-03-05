'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Bar, BarChart, Cell, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GradientHeading } from '@/components/ui/gradient-heading';
import { FOLDERS } from '@/info/folders';
import { STATISTICS } from '@/info/statistics';
import { statistics } from 'effect/FastCheck';

export default function Statistics() {
	const [selectedFolderIndex, setSelectedFolderIndex] = useState(9);

	return (
		<section id="statistics" className="px-4 py-12 md:px-8">
			<div className="mb-12 max-w-4xl mx-auto text-center flex flex-col items-center">
				<p className="text-muted text-xl tracking-widest mb-1">История</p>
				<h2 className="font-title text-4xl md:text-5xl text-white mb-4">
					Пътят ни досега
				</h2>
				<p className="text-foreground max-w-3xl text-lg">
					TUES Fest през годините. Разгледайте историята на емблематичния ден на отворените врати на ТУЕС. Вижте откъде започна всичко и как събитието достигна успеха, който има днес.
				</p>
			</div>

			{/* Timeline Navigation — breaks out of section's horizontal padding so line spans full width */}
			<div className="mb-16 -mx-4 md:-mx-8">
				<FolderNavigation
					selectedFolderIndex={selectedFolderIndex}
					setSelectedFolderIndex={setSelectedFolderIndex}
				/>
			</div>

			<div className="block mx-auto w-full max-w-4xl xl:grid xl:grid-cols-2 xl:gap-8">
				{/* Desktop Statistics */}
				<div className="hidden w-full xl:block">
					<StatisticsCards selectedFolderIndex={selectedFolderIndex} />
				</div>

				{/* Fest Card */}
				<div className="py-8 xl:hidden">
					<FestCard selectedFolderIndex={selectedFolderIndex} />
				</div>
				<FestCard className="hidden xl:flex" selectedFolderIndex={selectedFolderIndex} />

				{/* Mobile/Tablet Statistics */}
				<div className="block w-full xl:hidden">
					<StatisticsCards selectedFolderIndex={selectedFolderIndex} />
				</div>
			</div>
		</section>
	);
}

function StatisticsCards({ selectedFolderIndex }: { selectedFolderIndex: number }) {
	return (
		<div className="space-y-6 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 xl:flex xl:flex-col">
			{STATISTICS.map((statistic, i) => (
				<Card variant='muted' key={statistic.title} className="bg-card/80 border-border backdrop-blur-sm">
					<CardTitle className='text-lg px-8'>{statistic.title} - {statistic.data[i]?.total}</CardTitle>
					<CardContent className='pl-0'>
						<BarStatistic selectedFolderIndex={selectedFolderIndex} data={statistic.data} />
					</CardContent>
				</Card>
			))}
		</div>
	);
}

function BarStatistic({
	selectedFolderIndex,
	data,
}: {
	selectedFolderIndex: number;
	data: {
		name: string;
		total: number;
	}[];
}) {
	const folder = FOLDERS.find((folder) => folder.id === selectedFolderIndex);

	return (
		<ResponsiveContainer width="100%" height={200}>
			<BarChart data={data}>
				<XAxis dataKey="name" stroke="currentColor" fontSize={12} tickLine={false} axisLine={false} />
				<YAxis
					stroke="currentColor"
					fontSize={12}
					tickLine={false}
					axisLine={false}
					tickFormatter={(value) => `${value}`}
				/>
				<Bar dataKey="total" radius={[4, 4, 0, 0]}>
					{data.map((entry, index) => (
						<Cell
							key={`cell-${index}`}
							fill={folder?.name === entry.name ? 'var(--muted)' : 'var(--gray-dark)'}
						/>
					))}
				</Bar>
			</BarChart>
		</ResponsiveContainer>
	);
}

function FolderNavigation({
	selectedFolderIndex,
	setSelectedFolderIndex,
}: {
	selectedFolderIndex: number;
	setSelectedFolderIndex: (id: number) => void;
}) {
	const currentIndex = FOLDERS.findIndex((f) => f.id === selectedFolderIndex);

	const handlePrevious = () => {
		if (currentIndex > 0 && FOLDERS[currentIndex - 1]) {
			setSelectedFolderIndex(FOLDERS[currentIndex - 1]!.id);
		}
	};

	const handleNext = () => {
		if (currentIndex < FOLDERS.length - 1 && FOLDERS[currentIndex + 1]) {
			setSelectedFolderIndex(FOLDERS[currentIndex + 1]!.id);
		}
	};

	// ── Desktop (3-item window) ──────────────────────────────────────────────
	// Where the selected item appears within the 3-item window (0 = left, 1 = center, 2 = right)
	const displayPosition =
		currentIndex === 0 ? 0
		: currentIndex === FOLDERS.length - 1 ? 2
		: 1;
	// Shift the track so the selected item lands on its display position
	const desktopTranslateX = ((displayPosition - currentIndex) / FOLDERS.length) * 100;
	// Line split at the center of the selected dot as % of viewport
	const desktopLineSplit = ((displayPosition + 0.5) / 3) * 100;

	// ── Mobile (1-item window) ────────────────────────────────────────────────
	// Selected is always centered → split always 50 %, translateX centres the item
	const mobileTranslateX = (-currentIndex / FOLDERS.length) * 100;

	return (
		<div className="w-full space-y-10">
			{/* ── Timeline ─────────────────────────────────────────────────── */}
			<div className="relative" style={{ height: '72px' }}>

				{/* Line: mobile — always split at 50 % */}
				<div
					className="md:hidden absolute flex pointer-events-none"
					style={{ top: '13px', height: '2px', left: '50%', transform: 'translateX(-50%)', width: '100vw' }}
				>
					<div className="w-1/2 bg-muted" />
					<div className="flex-1 bg-dark-muted" />
				</div>

				{/* Line: desktop — split animates with the selected dot */}
				<div
					className="hidden md:flex absolute pointer-events-none"
					style={{ top: '13px', height: '2px', left: '50%', transform: 'translateX(-50%)', width: '100vw' }}
				>
					<div
						className="bg-muted"
						style={{
							width: `${desktopLineSplit}%`,
							transition: 'width 350ms cubic-bezier(0.4, 0, 0.2, 1)',
						}}
					/>
					<div className="flex-1 bg-dark-muted" />
				</div>

				{/* Track: mobile — 1 item fills the full viewport */}
				<div className="md:hidden absolute inset-x-0" style={{ height: '72px' }}>
					<div
						className="flex will-change-transform"
						style={{
							width: `${FOLDERS.length * 100}%`,
							transform: `translateX(${mobileTranslateX}%)`,
							transition: 'transform 350ms cubic-bezier(0.4, 0, 0.2, 1)',
						}}
					>
						{FOLDERS.map((folder, index) => {
							const isSelected = folder.id === selectedFolderIndex;
							return (
								<div
									key={folder.id}
									className="flex flex-col items-center gap-3"
									style={{ width: `${100 / FOLDERS.length}%` }}
								>
									<div className="w-9 h-9 rounded-full border-2 border-black flex items-center justify-center">
										<div
											className="w-7 h-7 rounded-full bg-muted"
											style={{ boxShadow: '0 0 0 2px white, 0 0 24px 6px var(--color-muted)' }}
										/>
									</div>
									<span className={`whitespace-nowrap font-mono text-2xl transition-opacity duration-350 ${isSelected ? 'text-white opacity-100' : 'opacity-0'}`}>
										TUES Fest {folder.name}
									</span>
								</div>
							);
						})}
					</div>
				</div>

				{/* Track: desktop — 3 items visible */}
				<div className="hidden md:block absolute inset-x-0" style={{ height: '72px' }}>
					<div
						className="flex will-change-transform"
						style={{
							width: `${(FOLDERS.length / 3) * 100}%`,
							transform: `translateX(${desktopTranslateX}%)`,
							transition: 'transform 350ms cubic-bezier(0.4, 0, 0.2, 1)',
						}}
					>
						{FOLDERS.map((folder, index) => {
							const isSelected = folder.id === selectedFolderIndex;
							const isPrev = index < currentIndex;

							return (
								<div
									key={folder.id}
									className="flex flex-col items-center gap-3"
									style={{ width: `${100 / FOLDERS.length}%` }}
								>
									{/* Dot */}
									<button
										onClick={() => setSelectedFolderIndex(folder.id)}
										className="focus:outline-none"
										title={`TUES Fest ${folder.name}`}
									>
										{isSelected || isPrev ? (
											<div
												className={`rounded-full border-2 border-black flex items-center justify-center transition-all duration-350 ${isSelected ? 'w-9 h-9' : 'w-7 h-7 cursor-pointer'}`}
											>
												<div
													className={`${isSelected ? 'w-7 h-7' : 'w-5 h-5'} rounded-full bg-muted`}
													style={{ boxShadow: '0 0 0 2px white, 0 0 24px 6px var(--color-muted)' }}
												/>
											</div>
										) : (
											<div
												className="cursor-pointer w-5 h-5 translate-y-[4px] rounded-full bg-dark-muted"
												style={{ boxShadow: '0 0 0 2px var(--background)' }}
											/>
										)}
									</button>

									{/* Label */}
									<span
										className={`whitespace-nowrap font-mono transition-all duration-350 ${
											isSelected
												? 'text-white text-2xl'
												: isPrev
													? 'text-muted text-md'
													: 'text-dark-muted text-md'
										}`}
									>
										TUES Fest {folder.name}
									</span>
								</div>
							);
						})}
					</div>
				</div>
			</div>

			{/* Navigation Buttons */}
			<div className="flex justify-center gap-4">
				<button
					onClick={handlePrevious}
					disabled={currentIndex === 0}
					className="cursor-pointer size-11 rounded-full border flex items-center justify-center hover:bg-muted/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
					style={{ borderColor: 'var(--color-muted)', color: 'var(--color-muted)' }}
				>
					<ChevronLeft className="h-4 w-4" />
				</button>
				<button
					onClick={handleNext}
					disabled={currentIndex === FOLDERS.length - 1}
					className="cursor-pointer size-11 rounded-full border flex items-center justify-center hover:bg-muted/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
					style={{ borderColor: 'var(--color-muted)', color: 'var(--color-muted)' }}
				>
					<ChevronRight className="h-4 w-4" />
				</button>
			</div>
		</div>
	);
}

function FestCard({ selectedFolderIndex, className }: { selectedFolderIndex: number; className?: string }) {
	const folder = FOLDERS.find((f) => f.id === selectedFolderIndex);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		setVisible(false);
		const t = setTimeout(() => setVisible(true), 100);
		return () => clearTimeout(t);
	}, [selectedFolderIndex]);

	if (!folder) return null;

	return (
		<div className={`flex items-stretch ${className ?? 'w-full'}`}>
			<div
				className="relative w-full overflow-hidden rounded-2xl"
				style={{ minHeight: '480px' }}
			>
				{/* Background image */}
				<Image
					key={folder.id}
					src={folder.image1}
					alt={`TUES Fest ${folder.name}`}
					fill
					className="object-cover transition-opacity duration-500"
					style={{ opacity: visible ? 1 : 0 }}
				/>

				{/* Gradient overlay */}
				<div
					className="absolute inset-0"
					style={{
						background:
							'linear-gradient(to bottom, transparent 0%, transparent 50%, color-mix(in srgb, var(--muted-end) 50%, transparent) 100%)',
					}}
				/>

				{/* Bottom content */}
				<div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-3">
					<h3 className="font-mighty text-white text-4xl">TUES Fest {folder.name}</h3>
					<div>
						<a href={folder.website} target="_blank" rel="noopener noreferrer">
							<Button variant="muted">Виж повече</Button>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
