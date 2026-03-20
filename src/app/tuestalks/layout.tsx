import { notFound } from 'next/navigation';

import { growthbook } from '@/lib/growthbook/server';

export default async function TUESTalksLayout({ children }: { children: React.ReactNode }) {
	const gb = await growthbook();
	if (gb.isOff('tf-show-tuestalks')) {
		notFound();
	}

	return <>{children}</>;
}
