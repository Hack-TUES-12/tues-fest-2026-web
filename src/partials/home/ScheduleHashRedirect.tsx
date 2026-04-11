'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/** Old home URL `/#schedule` → `/schedule`. */
export function ScheduleHashRedirect() {
	const router = useRouter();

	useEffect(() => {
		if (window.location.hash === '#schedule') {
			router.replace('/schedule' + window.location.search);
		}
	}, [router]);

	return null;
}
