import { notFound } from 'next/navigation';
import { type Metadata } from 'next';

import { HydrateClient, api } from '@/lib/trpc/server';

import { BotDetail } from './bot-detail';

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { id } = await params;
	const parsed = parseInt(id, 10);
	if (isNaN(parsed)) return { title: 'Battle Bot' };

	const bot = await api.battleBots.getBot({ id: parsed });
	if (!bot) return { title: 'Battle Bot' };

	return {
		title: `${bot.name} — TUES Battle Bots`,
		description: bot.slogan ?? bot.description,
	};
}

export default async function BotPage({ params }: Props) {
	const { id } = await params;
	const parsed = parseInt(id, 10);
	if (isNaN(parsed)) notFound();

	void api.battleBots.getBot.prefetch({ id: parsed });

	return (
		<HydrateClient>
			<BotDetail id={parsed} />
		</HydrateClient>
	);
}
