export type TFFeatures = {
	'project-voting': boolean;
	'tf-show-projects': boolean;
	'tf-show-partners': boolean;
	'tf-show-tuestalks': boolean;
	'tf-expectations-section': boolean;
	'tf-schedule': boolean;
	'tf-landing-cta': {
		label: string;
		link: string;
	};
};

export type TFFeature = keyof TFFeatures;
