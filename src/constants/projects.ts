import { toLowerCase } from 'string-ts';

export const PROJECT_TYPES = {
	extra: 'Извънкласна дейност',
	class: 'Курсов проект',
	diploma: 'Дипломна работа',
} as const;

export type ProjectType = (typeof PROJECT_TYPES)[keyof typeof PROJECT_TYPES];

export const PROJECT_CATEGORIES = {
	software: 'Софтуер',
	embedded: 'Хардуер',
	networks: 'Компютърни мрежи',
	battlebot: 'Battle Bots',
} as const;

export type ProjectCategory = keyof typeof PROJECT_CATEGORIES;

/** Tailwind `text-*` token per category (matches badge / vote accents). */
export const PROJECT_CATEGORY_TEXT_CLASS: Record<ProjectCategory, string> = {
	software: 'text-muted',
	embedded: 'text-primary',
	networks: 'text-accent',
	battlebot: 'text-accent',
};

/** `group-hover:text-*` for link labels (hover anywhere on the row). */
export const PROJECT_CATEGORY_LINK_LABEL_HOVER_CLASS: Record<ProjectCategory, string> = {
	software: 'group-hover:text-muted',
	embedded: 'group-hover:text-primary',
	networks: 'group-hover:text-accent',
	battlebot: 'group-hover:text-accent',
};

/** For `style={{ color: \`var(${…})\` }}` — same tokens as Statistics folder nav buttons. */
export const PROJECT_CATEGORY_THEME_COLOR_VAR: Record<ProjectCategory, string> = {
	software: '--color-muted',
	embedded: '--color-primary',
	networks: '--color-accent',
	battlebot: '--color-accent',
};

/** Matches `Statistics.tsx` timeline arrows: `hover:bg-muted/10`, etc. */
export const PROJECT_CATEGORY_NAV_HOVER_BG_CLASS: Record<ProjectCategory, string> = {
	software: 'hover:bg-muted/10',
	embedded: 'hover:bg-primary/10',
	networks: 'hover:bg-accent/10',
	battlebot: 'hover:bg-accent/10',
};

export function isProjectCategory(value: string): value is ProjectCategory {
	return Object.hasOwn(PROJECT_CATEGORIES, value);
}

export const PROJECT_CATEGORY_MAP = Object.entries(PROJECT_CATEGORIES).reduce(
	(acc, [key, value]) => ({
		...acc,
		[key]: {
			text: value,
			href: `/projects/category/${toLowerCase(key)}`,
			category: key,
		},
	}),
	{} as {
		[key in ProjectCategory]: {
			text: (typeof PROJECT_CATEGORIES)[key];
			href: `/projects/category/${Lowercase<key>}`;
			category: key;
		};
	}
);

export type ProjectCategoryMapValue = (typeof PROJECT_CATEGORY_MAP)[keyof typeof PROJECT_CATEGORY_MAP];

export const PROJECT_CATEGORY_LIST = Object.values(PROJECT_CATEGORY_MAP);

export const PROJECT_REGISTRATION_FORM_URL = 'https://forms.gle/PjaNKUqpYcuFXLHu6';
