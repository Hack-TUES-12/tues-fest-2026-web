import { revalidateTag } from 'next/cache';

import { env } from 'env.mjs';

import { BATTLE_BOTS_CACHE_TAG } from '@/server/api/routers/battle-bots.utils';

export async function POST(req: Request) {
	const secret = req.headers.get('x-revalidate-secret');
	if (secret !== env.REVALIDATION_SECRET) {
		return Response.json({ error: 'Unauthorized' }, { status: 401 });
	}

	revalidateTag(BATTLE_BOTS_CACHE_TAG, 'max');
	return Response.json({ revalidated: true }, { status: 200 });
}
