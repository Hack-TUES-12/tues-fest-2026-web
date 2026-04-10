import { type Metadata } from 'next';

import { TF_YEAR } from '@/constants/event';

import { RegulationPageClient } from './regulation-client';

export const metadata = {
	title: 'Регламент',
	description: `Официален регламент на TUES Fest ${TF_YEAR} — условия за участие с проект, провеждане на събитието и правила за гласуване.`,
	keywords: [
		'туес фест регламент',
		`туес фест ${TF_YEAR}`,
		'правила',
		'участие',
		'проекти',
		'гласуване',
	],
} satisfies Metadata;

export default function RegulationPage() {
	return <RegulationPageClient />;
}
