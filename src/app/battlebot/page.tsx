import { type Metadata } from 'next';

import { BattlebotPageContent } from './battlebot-page-content';

export const metadata: Metadata = {
	title: 'TUES Battle Bots',
	description: 'Състезание с роботи на TUES Fest 2026, вдъхновено от Battle Bots.',
};

export default function BattlebotPage() {
	return <BattlebotPageContent />;
}
