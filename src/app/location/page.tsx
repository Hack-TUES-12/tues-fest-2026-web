import { type Metadata } from 'next';

import { TF_LOCATION } from '@/constants/event';
import { TF_TITLE } from '@/constants/seo';
import { LocationPageContent } from '@/partials/location/LocationPageContent';

export const metadata = {
	title: 'Локация',
	description: `Информация за локацията на ${TF_TITLE} — ${TF_LOCATION} и как да стигнете до там.`,
} satisfies Metadata;

export default function LocationPage() {
	return <LocationPageContent />;
}
