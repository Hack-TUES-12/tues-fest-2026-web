import {
	ALPHA_SPONSORS,
	BETA_SPONSORS,
	GAMMA_SPONSORS,
	MEDIA_PARTNERS,
	PARTNERS,
	Podkrepqsht,
} from '@/constants/home/sponsors';
import PodkrepqAutoDisplay from './sponsors/PodkrepqAutoDisplay';
import { SponsorSectionFade } from './sponsors/SponsorSectionFade';

async function randomStartIndex(podkrepqshti: Podkrepqsht[]) {
	return Math.floor(Math.random() * podkrepqshti.length);
}

function SectionTitle({ children }: { children: React.ReactNode }) {
	return (
		<h2 className="font-mighty scroll-m-20 mb-6 text-center text-4xl first:mt-0 md:text-5xl">
			{children}
		</h2>
	);
}

type SponsorsProps = {
	/** Added to each tier fade index when another block (e.g. Omega) uses lower indices above */
	fadeIndexOffset?: number;
};

export default async function Sponsors({ fadeIndexOffset = 0 }: SponsorsProps = {}) {
	const [alphaStartIndex, betaStartIndex, gammaStartIndex, partnersStartIndex, mediaPartnersStartIndex] =
		await Promise.all([
			randomStartIndex(ALPHA_SPONSORS),
			randomStartIndex(BETA_SPONSORS),
			randomStartIndex(GAMMA_SPONSORS),
			randomStartIndex(PARTNERS),
			randomStartIndex(MEDIA_PARTNERS),
		]);

	const i = (n: number) => fadeIndexOffset + n;

	return (
		<div className="grid grid-cols-1 place-items-center">
			<SponsorSectionFade className="relative mb-24 sm:mb-48 w-full" index={i(0)}>
				<SectionTitle>Alfa Sponsors</SectionTitle>
				<PodkrepqAutoDisplay
					podkrepqshti={ALPHA_SPONSORS}
					imagePriority
					startIndex={alphaStartIndex}
					cardVariant="secondary"
				/>
			</SponsorSectionFade>

			<SponsorSectionFade className="relative mb-24 sm:mb-48 w-full" index={i(1)}>
				<SectionTitle>Beta Sponsors</SectionTitle>
				<PodkrepqAutoDisplay
					podkrepqshti={BETA_SPONSORS}
					startIndex={betaStartIndex}
					showGreenCircles
					cardVariant="muted"
				/>
			</SponsorSectionFade>

			<SponsorSectionFade className="relative mb-24 sm:mb-48 w-full" index={i(2)}>
				<SectionTitle>Gamma Sponsors</SectionTitle>
				<PodkrepqAutoDisplay
					podkrepqshti={GAMMA_SPONSORS}
					startIndex={gammaStartIndex}
					showPurpleCircle
					cardVariant="primary"
				/>
			</SponsorSectionFade>

			<SponsorSectionFade className="relative mb-24 sm:mb-48 w-full" index={i(3)}>
				<SectionTitle>Partners</SectionTitle>
				<PodkrepqAutoDisplay
					podkrepqshti={PARTNERS}
					startIndex={partnersStartIndex}
					showGreenCircles
					cardVariant="muted"
				/>
			</SponsorSectionFade>

			<SponsorSectionFade className="relative mb-20 w-full place-self-center" index={i(4)}>
				<SectionTitle>Media Partners</SectionTitle>
				<PodkrepqAutoDisplay
					podkrepqshti={MEDIA_PARTNERS}
					startIndex={mediaPartnersStartIndex}
					showPurpleCircle
					cardVariant="primary"
				/>
			</SponsorSectionFade>
		</div>
	);
}
