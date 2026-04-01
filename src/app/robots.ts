import { type MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: ['/api', '/admin', '/iskren', '/auth'],
		},
		sitemap: 'https://tuesfest.bg/sitemap.xml',
	};
}
