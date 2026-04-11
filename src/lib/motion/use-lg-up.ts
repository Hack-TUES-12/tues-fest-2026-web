'use client';

import { useSyncExternalStore } from 'react';

const LG_QUERY = '(min-width: 1024px)';

function subscribe(onChange: () => void) {
	const mq = window.matchMedia(LG_QUERY);
	mq.addEventListener('change', onChange);
	return () => mq.removeEventListener('change', onChange);
}

function getSnapshot() {
	return window.matchMedia(LG_QUERY).matches;
}

function getServerSnapshot() {
	return false;
}

/** `true` when viewport is `lg` (1024px) or wider. SSR / first paint: `false` (mobile). */
export function useLgUp() {
	return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
