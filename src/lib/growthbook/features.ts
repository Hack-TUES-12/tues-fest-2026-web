export type TFFeatures = {
	'project-voting': boolean;
	'tf-expectations-section': boolean;
	'tf-schedule': boolean;
	'tf-landing-cta': {
		label: string;
		link: string;
	};
};

export type TFFeature = keyof TFFeatures;
