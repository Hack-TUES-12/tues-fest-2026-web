import 'server-only';

import { cache } from 'react';
import { configureCache, GrowthBook, setPolyfills } from '@growthbook/growthbook';
import { Duration } from 'effect';

import { env } from '@/../env.mjs';
import type { TFFeatures } from './features';

// Tag fetch requests for on-demand revalidation (GrowthBook webhook → revalidateTag('growthbook')).
// React `cache()` still dedupes GrowthBook fetches within a single request.
setPolyfills({
	fetch: cache((url: string, init: RequestInit) =>
		fetch(url, {
			...init,
			next: {
				revalidate:
					env.NODE_ENV === 'development' ? Duration.toSeconds('3 seconds') : Duration.toSeconds('1 hour'),
				tags: ['growthbook'],
			},
		})
	),
});

// Disable the built-in cache since we're using Next.js's fetch Data Cache instead
configureCache({
	disableCache: true,
});

export async function growthbook() {
	const gb = new GrowthBook<TFFeatures>({
		apiHost: env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
		clientKey: env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
	});

	await gb.init({
		timeout: Duration.toMillis('1 minute'),
	});

	/**
	 * You would set any user-identifying attributes here
	 *
	 * @see https://docs.growthbook.io/guide/nextjs-app-router#5-integrate-the-growthbook-sdk-into-our-nextjs-app
	 **/

	return gb;
}
