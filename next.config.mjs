/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import './env.mjs';

const appDir = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
export default {
	// Avoid inferring a parent folder when multiple lockfiles exist (fixes Turbopack root + static `/public` resolution).
	turbopack: {
		root: appDir,
	},
	images: {
		localPatterns: [
			// /logo (e.g. motto.png?v=… cache bust)
			{ pathname: '/**' },
		],
	},
	redirects: async () => {
		return [
			{
				source: '/vote',
				destination: '/projects',
				permanent: false, // fear of commitment
			},
		];
	},
};
