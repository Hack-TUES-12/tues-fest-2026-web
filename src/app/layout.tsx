import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';

import Footer from '@/partials/layout/Footer';
import { Navigation } from '@/partials/layout/Navigation';

import './animation.css';
import './globals.css';

import { Metadata, Viewport } from 'next';
import { PT_Mono, PT_Sans } from 'next/font/google';
import localFont from 'next/font/local';

import { Toaster } from '@/components/ui/sonner';
import { TF_YEAR } from '@/constants/event';
import { FIRST_ARCHIVE_YEAR, KEYWORDS, OG_METADATA, TF_DESCRIPTION, TWITTER_METADATA } from '@/constants/seo';
import { GrowthBookServerProvider } from '@/lib/growthbook/react/server';
import { TRPCReactProvider } from '@/lib/trpc/react';
import { cn } from '@/lib/utils';

export const viewport: Viewport = {
	themeColor: '#141420',
	width: 'device-width',
	initialScale: 1,
};

export const metadata: Metadata = {
	metadataBase: new URL('https://tuesfest.bg'),
	title: {
		default: `TUES Fest ${TF_YEAR}`,
		template: `%s | TUES Fest ${TF_YEAR}`,
	},
	description: TF_DESCRIPTION,
	keywords: KEYWORDS,
	icons: {
		icon: [
			{
				url: '/favicon-light-theme.webp',
				type: 'image/webp',
				media: '(prefers-color-scheme: light)',
			},
			{
				url: '/favicon-dark-theme.webp',
				type: 'image/webp',
				media: '(prefers-color-scheme: dark)',
			},
		],
		apple: '/favicon.png',
	},
	twitter: TWITTER_METADATA,
	archives: Array.from({ length: TF_YEAR - FIRST_ARCHIVE_YEAR }, (_, i) => `https://${TF_YEAR - i - 1}.tuesfest.bg`),
	assets: ['https://tuesfest.bg/favicon.png', 'https://tuesfest.bg/assets', 'https://tuesfest.bg/_next/static'],
	openGraph: OG_METADATA,
};

const ptSans = PT_Sans({
	subsets: ['latin', 'cyrillic'],
	weight: ['400', '700'],
	variable: '--font-pt-sans',
});

const ptMono = PT_Mono({
	subsets: ['latin', 'cyrillic'],
	weight: '400',
	variable: '--font-pt-mono',
});

const mighty = localFont({
	src: '../assets/fonts/mightySouly.ttf',
	variable: '--font-mighty',
});

/** Runs before paint; sets `data-tf-webkit-cheap-backdrop` on `<html>` for CSS that strips `backdrop-filter` (Safari / iOS WebKit). */
const webkitBackdropProfileScript = `(function(){try{var ua=navigator.userAgent;var iOS=/iPad|iPhone|iPod/.test(ua)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1);var safariDesktop=/Safari/i.test(ua)&&!/Chrome|Chromium|Edg|OPR|Opera|Brave/i.test(ua);if(iOS||safariDesktop)document.documentElement.dataset.tfWebkitCheapBackdrop="";}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang="bg"
			className="scroll-pt-(--header-height) dark overflow-x-clip [--footer-height:calc(theme(spacing.24))] [--header-height:calc(theme(spacing.20))]"
		>
			<head>
				<Script src="https://www.googletagmanager.com/gtag/js?id=G-1H1H1CR559" strategy="afterInteractive" />
			</head>
			<body
				className={cn(
					ptSans.variable,
					// warzone.variable,
					ptMono.variable,
					mighty.variable,
					// origin.variable,
					'font-sans',
					'dark min-h-0 w-full min-w-0 overflow-x-clip'
				)}
			>
				<Script id="tf-webkit-backdrop-profile" strategy="beforeInteractive">
					{webkitBackdropProfileScript}
				</Script>
				<GrowthBookServerProvider>
					<TRPCReactProvider>
						<Navigation />

						<main className="mx-auto min-h-[calc(100vh-var(--header-height)-var(--footer-height))] max-w-screen-2xl">
							{children}
						</main>

						<Toaster />
						<Footer />
						<Analytics />
					</TRPCReactProvider>
				</GrowthBookServerProvider>
			</body>
		</html>
	);
}
