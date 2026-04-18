'use client';

import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/lib/trpc/react';
import { type RouterOutputs } from '@/lib/trpc/react';

type LeaderboardData = RouterOutputs['voting']['getTopProjectsByVotes'];

interface LeaderboardClientProps {
	initialData: LeaderboardData;
}

export function LeaderboardClient({ initialData }: LeaderboardClientProps) {
	const trpc = useTRPC();
	const { data, isLoading, error } = useQuery({
		...trpc.voting.getTopProjectsByVotes.queryOptions(),
		initialData,
		refetchInterval: 5000, // Poll every 5 seconds
	});

	if (error) {
		return <div>Error loading leaderboard: {error.message}</div>;
	}

	if (!data || data.length === 0) {
		return <div>No voting data available</div>;
	}

	return (
		<div>
			<h1>Класация</h1>
			<table>
				<thead>
					<tr>
						<th>Ранг</th>
						<th>Проект</th>
						<th>Гласове</th>
					</tr>
				</thead>
				<tbody>
					{data.map((project: any, index: number) => (
						<tr key={project.id}>
							<td>{index + 1}</td>
							<td>{project.name}</td>
							<td>{project.voteCount}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
