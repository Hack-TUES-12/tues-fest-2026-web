import {
	ALPHA_SPONSORS,
	BETA_SPONSORS,
	GAMMA_SPONSORS,
	MEDIA_PARTNERS,
	PARTNERS,
	Podkrepqsht,
} from '@/constants/home/sponsors';
import PodkrepqAutoDisplay from './sponsors/PodkrepqAutoDisplay';

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

export default async function Sponsors() {
	const [alphaStartIndex, betaStartIndex, gammaStartIndex, partnersStartIndex, mediaPartnersStartIndex] =
		await Promise.all([
			randomStartIndex(ALPHA_SPONSORS),
			randomStartIndex(BETA_SPONSORS),
			randomStartIndex(GAMMA_SPONSORS),
			randomStartIndex(PARTNERS),
			randomStartIndex(MEDIA_PARTNERS),
		]);

	return (
		<div className="grid grid-cols-1 place-items-center">
			<div className="mb-52 relative w-full">
				<SectionTitle>Alfa Sponsors</SectionTitle>
				<PodkrepqAutoDisplay
					podkrepqshti={ALPHA_SPONSORS}
					imagePriority
					startIndex={alphaStartIndex}
				/>
			</div>

			<div className="mb-52 relative w-full">
				<SectionTitle>Beta Sponsors</SectionTitle>
				<PodkrepqAutoDisplay
					podkrepqshti={BETA_SPONSORS}
					startIndex={betaStartIndex}
				/>
			</div>

			<div className="mb-52 relative w-full">
				<SectionTitle>Gamma Sponsors</SectionTitle>
				<PodkrepqAutoDisplay
					podkrepqshti={GAMMA_SPONSORS}
					startIndex={gammaStartIndex}
				/>
			</div>

			<div className="mb-52 relative w-full">
				<SectionTitle>Partners</SectionTitle>
				<PodkrepqAutoDisplay
					podkrepqshti={PARTNERS}
					startIndex={partnersStartIndex}
				/>
			</div>

			<div className="mb-20 place-self-center w-full">
				<SectionTitle>Media Partners</SectionTitle>
				<PodkrepqAutoDisplay
					podkrepqshti={MEDIA_PARTNERS}
					startIndex={mediaPartnersStartIndex}
				/>
			</div>
		</div>
	);
}
