import { type Metadata } from 'next';
import { notFound } from 'next/navigation';

import { TF_YEAR } from '@/constants/event';
import { growthbook } from '@/lib/growthbook/server';
import { api } from '@/lib/trpc/server';
import { LeaderboardClient } from './leaderboard-client';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
	title: 'Класация на проекти',
	description: `Вижте класацията на най-гласуваните проекти на ТУЕС Фест ${TF_YEAR}. Следете кой проект има най-много гласове.`,
	keywords: ['туес фест', 'класация', 'проекти', 'гласове', 'лидерборд'],
};

export default async function LeaderboardPage() {
	// Check feature flag
	const gb = await growthbook();
	if (gb.isOff('project-voting')) {
		notFound();
	}

	// Fetch initial data
	const initialData = await api.voting.getTopProjectsByVotes();

	return <LeaderboardClient initialData={initialData} />;
}
