import { TF_YEAR } from '@/constants/event';
import OmegaSponsor from '@/partials/home/sponsors/OmegaSponsor';
import { SponsorSectionFade } from '@/partials/home/sponsors/SponsorSectionFade';
import Sponsors from '@/partials/home/Sponsors';
import { PartnersPageShell } from '@/partials/partners/PartnersPageShell';

export const metadata = {
	title: 'Спонсори и Партньори',
	description: `Спонсорите и партньорите на TUES Fest ${TF_YEAR}`,
};

export const revalidate = 0;

export default function PartnersPage() {
	return (
		<PartnersPageShell>
			<div className="mx-auto grid w-full max-w-screen-2xl grid-cols-1 place-items-center">
				<SponsorSectionFade className="mb-72 w-full max-w-3xl place-self-center" index={0}>
					<OmegaSponsor />
				</SponsorSectionFade>
				<div className="relative z-20 w-full">
					<Sponsors fadeIndexOffset={1} />
				</div>
			</div>
		</PartnersPageShell>
	);
}
