export type TFFeatures = {
	'project-voting': boolean;
	'tf-show-projects': boolean;
	'tf-show-partners': boolean;
	'tf-show-media-partners': boolean;
	'tf-show-tuestalks': boolean;
	'tf-show-apply': boolean;
	'tf-expectations-section': boolean;
	'tf-schedule': boolean;
	'tf-landing-cta': {
		label: string;
		link: string;
	};
	'tf-show-leaderboard': boolean;
	'tf-battle-bots-stream': {
		youtubeId: string;
	};
	'tf-battle-bots-results': boolean;
};

export type TFFeature = keyof TFFeatures;
