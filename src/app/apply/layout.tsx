import { notFound } from 'next/navigation';

import { growthbook } from '@/lib/growthbook/server';

/** Avoid caching a 404 for this segment when the flag was off earlier. */
export const dynamic = 'force-dynamic';

export default async function ApplyLayout({ children }: { children: React.ReactNode }) {
	const gb = await growthbook();
	if (gb.isOff('tf-show-apply')) {
		notFound();
	}

	return <>{children}</>;
}
