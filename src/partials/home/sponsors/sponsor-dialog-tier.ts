export const SPONSOR_DIALOG_TIER_LABELS = {
	omega: 'Омега спонсор на TUES Fest 2026',
	alpha: 'Алфа спонсор на TUES Fest 2026',
	beta: 'Бета спонсор на TUES Fest 2026',
	gamma: 'Гама спонсор на TUES Fest 2026',
	partner: 'Партньор на TUES Fest 2026',
	media: 'Медиен партньор на TUES Fest 2026',
} as const;

export type SponsorDialogTier = keyof typeof SPONSOR_DIALOG_TIER_LABELS;

/** Matches each tier’s `Card` variant / section palette (primary = gamma & media, etc.). */
export type SponsorSectionAccent = 'primary' | 'secondary' | 'muted';

export const SPONSOR_DIALOG_TIER_ACCENT: Record<SponsorDialogTier, SponsorSectionAccent> = {
	omega: 'secondary',
	alpha: 'secondary',
	beta: 'muted',
	gamma: 'primary',
	partner: 'muted',
	media: 'primary',
};
