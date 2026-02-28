import { TF_YEAR } from '@/constants/event';
import OmegaSponsor from '@/partials/home/sponsors/OmegaSponsor';
import Sponsors from '@/partials/home/Sponsors';

export const metadata = {
	title: 'Спонсори и Партньори',
	description: `Спонсорите и партньорите на TUES Fest ${TF_YEAR}`,
};

export const revalidate = 0;

export default function PartnersPage() {
	return (
		<section className="relative flex flex-col gap-14 overflow-x-visible px-8 pb-14 pt-14">
			<h1 className="font-title text-center text-5xl">Нашите спонсори и партньори</h1>
			<div className="mx-auto grid w-full max-w-screen-2xl grid-cols-1 place-items-center">
				<OmegaSponsor />
				<Sponsors />
			</div>
		</section>
	);
}
