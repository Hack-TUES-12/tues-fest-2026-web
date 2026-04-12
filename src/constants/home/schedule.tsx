import type { ReactNode } from 'react';
import { TbPlus } from 'react-icons/tb';

import { cn } from '@/lib/utils';

import { TF_PROJECT_COUNT, TF_YEAR } from '../event';

/** Shared live stream CTA — attach per schedule entry via `liveStream`. */
export const SCHEDULE_LIVE_STREAM = {
	label: 'Гледай на живо',
	href: 'https://www.youtube.com/@TUES/live',
} as const;

export type ScheduleItem = {
	start: string;
	end: string;
	title: string;
	description: ReactNode;
	icon: string;
	pos: string;
	/** YouTube live — omit for segments without a stream (e.g. TUES E&A Pitch). */
	liveStream?: typeof SCHEDULE_LIVE_STREAM;
};

/** Matches project page authors list (`Contributors`) — plus icon uses this schedule block’s hue. */
const EXHIBITION_PLUS_CLASS = 'text-primary';

export const SCHEDULE: ScheduleItem[] = [
	{
		start: '09:00',
		end: '10:00',
		title: 'Откриваща церемония',
		description: 'Започваме с вдъхновяващо откриване, в което ще участват специални гости от технологичния и образователния сектор. Ще чуете мотивиращи думи, които ще ви потопят в атмосферата на денят на постиженията в ТУЕС и ще дадат старт на ден, изпълнен с иновации и креативност.',
		icon: '',
		pos: 'left',
		liveStream: SCHEDULE_LIVE_STREAM,
	},
	{
		start: '10:00',
		end: '15:00',
		title: 'Изложение на ученически проекти',
		description: (
			<div className="font-mono text-sm md:text-base">
				<p className="text-white/70">Всеки посетител ще има възможността:</p>
				<ul className="mt-2 flex flex-col gap-3 px-2">
					<li className="flex items-start gap-2">
						<TbPlus
							className={cn('size-7 shrink-0 stroke-[3.5]', EXHIBITION_PLUS_CLASS)}
							aria-hidden
						/>
						<span>
							Да разгледа <b className="font-semibold text-white">{TF_PROJECT_COUNT} ученически проекта</b> и да поговори с техните създатели
						</span>
					</li>
					<li className="flex items-start gap-2">
						<TbPlus
							className={cn('size-7 shrink-0 stroke-[3.5]', EXHIBITION_PLUS_CLASS)}
							aria-hidden
						/>
						<span>
							Да се запознае с <b className="font-semibold text-white">преподавателския екип</b> от ТУЕС
						</span>
					</li>
					<li className="flex items-start gap-2">
						<TbPlus
							className={cn('size-7 shrink-0 stroke-[3.5]', EXHIBITION_PLUS_CLASS)}
							aria-hidden
						/>
						<span>Да гласува за любимия си ученически проект</span>
					</li>
					<li className="flex items-start gap-2">
						<TbPlus
							className={cn('size-7 shrink-0 stroke-[3.5]', EXHIBITION_PLUS_CLASS)}
							aria-hidden
						/>
						<span>
							Да тръгне по <b className="font-semibold text-white">пътеката на ТУЕС-ара</b> и да разбере през какво минава един ученик на ТУЕС
						</span>
					</li>
					<li className="flex items-start gap-2">
						<TbPlus
							className={cn('size-7 shrink-0 stroke-[3.5]', EXHIBITION_PLUS_CLASS)}
							aria-hidden
						/>
						<span>
							Да говори с членове на извънкласни клубове в ТУЕС и с други ученици от училището
						</span>
					</li>
					<li className="flex items-start gap-2">
						<TbPlus
							className={cn('size-7 shrink-0 stroke-[3.5]', EXHIBITION_PLUS_CLASS)}
							aria-hidden
						/>
						<span>Да се запознае със спонсорите на събитието</span>
					</li>
				</ul>
			</div>
		),
		icon: '',
		pos: 'right'
	},
	{
		start: '11:00',
		end: '12:00',
		title: 'TUES E&A Pitch',
		description: `10 избрани отбора ще представят идеята си пред бизнес ориентарино жури, а проектът с най-добра бизнес идея и потенциал за превръщане в реален продукт ще получи специална награда. Посетителите могат да гледат презентациите на място в София Тех Парк.`,
		icon: '',
		pos: 'left',
	},
	{
		start: '15:30',
		end: '17:00',
		title: 'TUES Battle Bots',
		description: `Моментът от TUES Fest когато всеки зарязва това, което прави и излиза да наблюдава арената. Всеки от вас ще има възможност да гледа ожесточените битки между роботите на участниците, а от арената ще излезе само един победител.`,
		icon: '',
		pos: 'left',
		liveStream: SCHEDULE_LIVE_STREAM,
	},
	{
		start: '17:30',
		end: '19:30',
		title: 'Закриваща церемония',
		description: `Време е за награждаване на победителите в различните категории на TUES Fest ${TF_YEAR}. Започва се с наградите на нашите спонсори и партньори и след това с почетните първи три места във всяка категория.`,
		icon: '',
		pos: 'left',
		liveStream: SCHEDULE_LIVE_STREAM,
	},
];