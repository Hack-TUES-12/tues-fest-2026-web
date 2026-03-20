import 'server-only';

/** Matches app `font-title` / `--font-pt-mono` (PT Mono). */
export const OG_FONT_TITLE_FAMILY = 'PT Mono';

/** Google Fonts OFL build (same face as `next/font` PT_Mono). */
const PT_MONO_TTF_URL =
	'https://raw.githubusercontent.com/google/fonts/main/ofl/ptmono/PTM55FT.ttf';

export async function loadPtMonoFontData(): Promise<ArrayBuffer> {
	const res = await fetch(PT_MONO_TTF_URL, {
		next: { revalidate: 60 * 60 * 24 * 7 },
	});
	if (!res.ok) {
		throw new Error(`Failed to load PT Mono for OG image: ${res.status} ${res.statusText}`);
	}
	return res.arrayBuffer();
}

export async function getPtMonoImageFont() {
	const data = await loadPtMonoFontData();
	return {
		name: OG_FONT_TITLE_FAMILY,
		data,
		style: 'normal' as const,
		weight: 400 as const,
	};
}
