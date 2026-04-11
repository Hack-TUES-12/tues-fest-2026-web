import { type Metadata } from 'next';
import { notFound } from 'next/navigation';

import { TF_TITLE } from '@/constants/seo';
import { growthbook } from '@/lib/growthbook/server';
import Schedule from '@/partials/home/Schedule';

export const metadata: Metadata = {
	title: 'Програма',
	description: `Програма на ${TF_TITLE} — часове и събития за деня.`,
};

export default async function SchedulePage() {
	const gb = await growthbook();
	if (!gb.isOn('tf-schedule')) {
		notFound();
	}

	return (
		<div className="mx-auto w-full max-w-screen-2xl">
			<Schedule />
		</div>
	);
}
