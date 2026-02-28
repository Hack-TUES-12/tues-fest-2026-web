import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "node:path";
// @ts-ignore - typescript-eslint has type definitions but TypeScript cannot resolve them in this context
import tseslint from 'typescript-eslint';
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

export default tseslint.config(
	{
		ignores: ['.next'],
	},
	...compat.extends('next/core-web-vitals'),
	{
		files: ['**/*.ts', '**/*.tsx'],
		extends: [
			...tseslint.configs.recommended,
			...tseslint.configs.recommendedTypeChecked,
			...tseslint.configs.stylisticTypeChecked,
		],
		rules: {
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-unsafe-assignment': 'warn',
			'@typescript-eslint/array-type': 'off',
			'@typescript-eslint/consistent-type-definitions': 'off',
			'@typescript-eslint/consistent-type-imports': [
				'warn',
				{ prefer: 'type-imports', fixStyle: 'inline-type-imports' },
			],
			'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
			'@typescript-eslint/require-await': 'off',
			'@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: { attributes: false } }],
		},
	},
	{
		linterOptions: {
			reportUnusedDisableDirectives: true,
		},
		languageOptions: {
			parserOptions: {
				projectService: true,
			},
		},
	}
);
