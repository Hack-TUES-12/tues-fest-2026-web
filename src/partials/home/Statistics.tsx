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

			{/* Timeline Navigation */}
			<div className="mb-16 px-4">
				<FolderNavigation
					selectedFolderIndex={selectedFolderIndex}
					setSelectedFolderIndex={setSelectedFolderIndex}
				/>
			</div>

			<div className="block w-full xl:flex xl:gap-8">
				{/* Desktop Statistics */}
				<div className="hidden w-full xl:block xl:w-1/3">
					<StatisticsCards selectedFolderIndex={selectedFolderIndex} />
				</div>

				{/* Images Container */}
				<div className="py-16 xl:hidden">
					<ImagesContainer selectedFolderIndex={selectedFolderIndex} />
				</div>
				<ImagesContainer className="hidden xl:block xl:w-1/2" selectedFolderIndex={selectedFolderIndex} />

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
		<div className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0 xl:flex xl:flex-col">
			{STATISTICS.map((statistic) => (
				<Card key={statistic.title} className="bg-card/80 border-border backdrop-blur-sm">
					<CardHeader className="flex flex-row items-center gap-2">
						<statistic.icon className="text-primary h-5 w-5" />
						<CardTitle>{statistic.title}</CardTitle>
					</CardHeader>
					<CardContent>
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
							fill={folder?.name === entry.name ? 'var(--primary)' : 'var(--muted)'}
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

	// Where the selected item should appear within the 3-item window (0 = left, 1 = center, 2 = right)
	const displayPosition =
		currentIndex === 0 ? 0
		: currentIndex === FOLDERS.length - 1 ? 2
		: 1;

	// Shift the track so the selected item lands on its display position
	const translateX = ((displayPosition - currentIndex) / FOLDERS.length) * 100;

	// The line splits at the center of the selected dot (as % of the viewport)
	const lineSplitPercent = ((displayPosition + 0.5) / 3) * 100;

	return (
		<div className="w-full space-y-10">
			{/* Timeline */}
			<div className="relative" style={{ height: '72px' }}>
				{/* Line — split point animates with the selected dot's position */}
				<div className="absolute inset-x-0 flex" style={{ top: '13px', height: '2px' }}>
					<div
						className="bg-muted"
						style={{
							width: `${lineSplitPercent}%`,
							transition: 'width 350ms cubic-bezier(0.4, 0, 0.2, 1)',
						}}
					/>
					<div
						className="bg-dark-muted flex-1"
						style={{ transition: 'flex 350ms cubic-bezier(0.4, 0, 0.2, 1)' }}
					/>
				</div>

				{/* Sliding track — clips off-screen dots */}
				<div className="absolute inset-x-0 overflow-hidden" style={{ height: '72px' }}>
					<div
						className="flex will-change-transform"
						style={{
							width: `${(FOLDERS.length / 3) * 100}%`,
							transform: `translateX(${translateX}%)`,
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
												className={`rounded-full border-2 border-black flex items-center justify-center transition-all duration-350 ${isSelected ? 'w-9 h-9' : 'w-7 h-7'}`}
											>
												<div
													className="w-5 h-5 rounded-full bg-muted"
													style={{
														boxShadow: '0 0 0 2px white, 0 0 24px 6px var(--color-muted)',
													}}
												/>
											</div>
										) : (
											<div
												className="w-5 h-5 rounded-full bg-dark-muted"
												style={{ boxShadow: '0 0 0 2px var(--background)' }}
											/>
										)}
									</button>

									{/* Label */}
									<span
										className={`whitespace-nowrap font-mono transition-all duration-350 ${
											isSelected
												? 'text-muted text-base font-bold'
												: isPrev
													? 'text-muted/60 text-sm'
													: 'text-dark-muted text-sm'
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
				<Button
					variant="outline"
					size="icon"
					onClick={handlePrevious}
					disabled={currentIndex === 0}
					className="border-muted text-muted hover:bg-muted/10 disabled:opacity-30 disabled:cursor-not-allowed"
				>
					<ChevronLeft className="h-4 w-4" />
				</Button>
				<Button
					variant="outline"
					size="icon"
					onClick={handleNext}
					disabled={currentIndex === FOLDERS.length - 1}
					className="border-muted text-muted hover:bg-muted/10 disabled:opacity-30 disabled:cursor-not-allowed"
				>
					<ChevronRight className="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
}

function ImagesContainer({ selectedFolderIndex, className }: { selectedFolderIndex: number; className?: string }) {
	const folder = FOLDERS.find((folder) => folder.id === selectedFolderIndex);
	const [isFirstImageVisible, setIsFirstImageVisible] = useState(false);
	const [isSecondImageVisible, setIsSecondImageVisible] = useState(false);

	useEffect(() => {
		setIsFirstImageVisible(false);
		setIsSecondImageVisible(false);

		const timer1 = setTimeout(() => {
			setIsFirstImageVisible(true);
		}, 300);

		const timer2 = setTimeout(() => {
			setIsSecondImageVisible(true);
		}, 600);

		return () => {
			clearTimeout(timer1);
			clearTimeout(timer2);
		};
	}, [selectedFolderIndex]);

	if (!folder) return null;

	return (
		<div className={`relative h-[500px] ${className ?? 'w-full'}`}>
			<div
				className={`absolute left-4 top-4 z-20 w-[280px] overflow-hidden rounded-lg shadow-lg transition-all 
          duration-500 sm:w-[310px] lg:w-[360px] xl:w-[400px] 2xl:w-[450px] 
          ${isFirstImageVisible ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}`}
			>
				<Image
					key={`${folder.id}-image-1`}
					alt={`${folder.name} image 1`}
					src={folder.image1 || '/placeholder.svg'}
					className="h-auto w-full"
				/>
			</div>
			<div
				className={`absolute bottom-4 right-4 z-30 w-[280px] overflow-hidden rounded-lg shadow-lg transition-all 
          duration-500 sm:w-[310px] lg:w-[360px] xl:w-[400px] 2xl:w-[450px] 
          ${isSecondImageVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
			>
				<Image
					key={`${folder.id}-image-2`}
					alt={`${folder.name} image 2`}
					src={folder.image2 || '/placeholder.svg'}
					className="h-auto w-full"
				/>
			</div>
		</div>
	);
}
