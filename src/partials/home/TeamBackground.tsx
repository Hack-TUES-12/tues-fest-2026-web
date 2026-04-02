'use client';

import { useEffect, useState } from 'react';

const IMAGES = [
	'/team/team1.webp',
	'/team/team2.webp',
	'/team/team3.webp',
	'/team/team4.webp',
	'/team/team5.webp',
];

export const TeamBackground = () => {
	const [current, setCurrent] = useState(0);
	const [prev, setPrev] = useState<number | null>(null);

	useEffect(() => {
		const id = setInterval(() => {
			setCurrent(c => {
				setPrev(c);
				return (c + 1) % IMAGES.length;
			});
		}, 3000);
		return () => clearInterval(id);
	}, []);

	return (
		<>
			{/* Previous image fades out */}
			{prev !== null && (
				<img
					key={`prev-${prev}`}
					src={IMAGES[prev]}
					alt=""
					aria-hidden="true"
					className="absolute inset-0 h-full w-full object-cover object-top animate-fade-out"
				/>
			)}
			{/* Current image fades in */}
			<img
				key={`cur-${current}`}
				src={IMAGES[current]}
				alt=""
				aria-hidden="true"
				className="absolute inset-0 h-full w-full object-cover object-top animate-fade-in"
			/>
		</>
	);
};
