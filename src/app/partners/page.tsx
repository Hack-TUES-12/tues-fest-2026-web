import { TF_YEAR } from '@/constants/event';
import Sponsors from '@/partials/home/Sponsors';

export const metadata = {
	title: 'Спонсори и Партньори',
	description: `Спонсорите и партньорите на TUES Fest ${TF_YEAR}`,
};

export const revalidate = 0;

export default function PartnersPage() {
	return (
		<div className="mx-auto w-full max-w-screen-2xl">
			<Sponsors />
		</div>
	);
}
