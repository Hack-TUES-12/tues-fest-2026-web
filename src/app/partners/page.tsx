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
		<section className="relative flex flex-col items-center gap-14 overflow-x-visible px-8 pb-14 pt-14">
            <div className='max-w-3xl gap-4 flex flex-col text-center'>
			    <h1 className="font-title text-5xl">Нашите спонсори и партньори</h1>
                <p className='text-lg'>Благодарим безкрайно на всички компании, които ни подкрепиха. Без вас събитията нямаше да бъдат възможни!</p>
            </div>
			<div className="mx-auto grid w-full max-w-screen-2xl grid-cols-1 place-items-center">
				<OmegaSponsor />
				<div className="relative z-20 w-full">
					<Sponsors />
				</div>
			</div>
		</section>
	);
}
