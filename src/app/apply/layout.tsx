import { notFound } from 'next/navigation';

import { growthbook } from '@/lib/growthbook/server';

export default async function ApplyLayout({ children }: { children: React.ReactNode }) {
	const gb = await growthbook();
	if (gb.isOff('tf-show-apply')) {
		notFound();
	}

	return <>{children}</>;
}
