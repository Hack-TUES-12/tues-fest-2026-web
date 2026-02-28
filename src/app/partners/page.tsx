import { TF_YEAR } from '@/constants/event';
import Sponsors from '@/partials/home/Sponsors';

export const metadata = {
	title: 'Спонсори и Партньори',
	description: `Спонсорите и партньорите на TUES Fest ${TF_YEAR}`,
};

export const revalidate = 0;

export default function PartnersPage() {
	return (
		<section className="relative flex flex-col gap-14 overflow-x-visible px-8 pb-14 pt-14">
			<h1 className="font-title text-center text-5xl font-black">Спонсори и партньори</h1>
			<div className="mx-auto w-full max-w-screen-2xl">
				<Sponsors />
			</div>
		</section>
	);
}
