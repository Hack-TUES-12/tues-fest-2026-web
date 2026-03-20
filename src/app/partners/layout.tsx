import { notFound } from 'next/navigation';

import { growthbook } from '@/lib/growthbook/server';

export default async function PartnersLayout({ children }: { children: React.ReactNode }) {
	const gb = await growthbook();
	if (gb.isOff('tf-show-partners')) {
		notFound();
	}

	return <>{children}</>;
}
