'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { TbFileTypePdf } from 'react-icons/tb';

import { Button } from '@/components/ui/button';
import { TF_LOCATION, TF_SLOGAN, TF_YEAR } from '@/constants/event';
import { sectionFadeIn, sectionFadeUp } from '@/lib/motion/section-in-view';

import { RegulationAccordionSection } from './regulation-accordion-section';
import { RegulationClause } from './regulation-clause';
import type { RegulationAccent } from './regulation-accent';
import { RegulationToc } from './regulation-toc';
import { useRegulationActiveSection } from './use-regulation-active-section';

/** Per-section accent for accordion title (open) and clause numbers — cycles through the four theme colors. */
const SECTION_ACCENTS: [
	RegulationAccent,
	RegulationAccent,
	RegulationAccent,
	RegulationAccent,
	RegulationAccent,
	RegulationAccent,
	RegulationAccent,
	RegulationAccent,
	RegulationAccent,
	RegulationAccent,
] = [
	'primary',
	'secondary',
	'accent',
	'muted',
	'primary',
	'secondary',
	'accent',
	'muted',
	'primary',
	'secondary',
];

const LAST_UPDATED = '10 април 2026 г.';

/** Place the exported PDF at `public/documents/<this filename>`. */
const REGULATION_PDF_PATH = `/documents/tues-fest-${TF_YEAR}-reglament.pdf`;
const REGULATION_PDF_FILENAME = `TUES-Fest-${TF_YEAR}-Reglament.pdf`;

const EVENT_META = {
	date: '26 април 2026 г.',
	time: '09:00 ч.',
	location: TF_LOCATION,
	theme: TF_SLOGAN,
} as const;

const TOC = [
	{ id: 'section-1', label: 'Общи положения' },
	{ id: 'section-2', label: 'Участници' },
	{ id: 'section-3', label: 'Проекти и категории' },
	{ id: 'section-4', label: 'Изисквания към съдържанието на проектите' },
	{ id: 'section-5', label: 'Регистрация' },
	{ id: 'section-6', label: 'Провеждане на събитието' },
	{ id: 'section-7', label: 'Гласуване и награждаване' },
	{ id: 'section-8', label: 'Дисквалификация' },
	{ id: 'section-9', label: 'Авторски права и публичност' },
	{ id: 'section-10', label: 'Посетители' },
] as const;

export function RegulationPageClient() {
	const reducedMotion = useReducedMotion();
	const sectionIds = useMemo(() => TOC.map((item) => item.id), []);
	const { isSectionActive, currentSectionId } = useRegulationActiveSection(sectionIds);

	function scrollToSection(sectionId: string) {
		const section = document.getElementById(sectionId);
		if (!section) return;
		const nav = document.querySelector('header');
		const headerOffset = nav instanceof HTMLElement ? nav.offsetHeight : 80;
		const y = section.getBoundingClientRect().top + window.scrollY - headerOffset;
		window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
	}

	return (
		<section className="relative overflow-x-hidden px-4 pb-16 pt-10 md:px-8 md:pt-14">
			<motion.img
				src="/decorations/purple-circle.svg"
				alt=""
				aria-hidden="true"
				className="pointer-events-none absolute left-0 top-0 w-[50vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 select-none"
				style={{ zIndex: -1 }}
				{...sectionFadeIn(reducedMotion, 0)}
			/>
			<motion.img
				src="/decorations/blue-circle.svg"
				alt=""
				aria-hidden="true"
				className="pointer-events-none absolute bottom-1/4 right-0 w-[40vw] max-w-xl translate-x-1/3 select-none"
				style={{ zIndex: -1 }}
				{...sectionFadeIn(reducedMotion, 0.08)}
			/>

			<div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
				<motion.div
					className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
					{...sectionFadeUp(reducedMotion, 0)}
				>
					<p className="text-sm text-foreground/60">
						<span className="font-medium text-foreground/80">Последна актуализация:</span>{' '}
						<time dateTime="2026-04-10">{LAST_UPDATED}</time>
					</p>
					<Button
						asChild
						variant="outline"
						size="sm"
						className="shrink-0 border-white/20 font-title text-xs tracking-widest"
					>
						<a href={REGULATION_PDF_PATH} download={REGULATION_PDF_FILENAME}>
							<TbFileTypePdf className="size-4" aria-hidden />
							Изтегли като PDF
						</a>
					</Button>
				</motion.div>

				<header className="text-center sm:text-left">
					<motion.p
						className="mb-2 text-primary tracking-widest"
						{...sectionFadeUp(reducedMotion, 0.07)}
					>
						Документ
					</motion.p>
					<motion.h1
						className="font-title text-4xl text-white md:text-5xl"
						{...sectionFadeUp(reducedMotion, 0.14)}
					>
						Регламент на TUES Fest 2026
					</motion.h1>
					<motion.p
						className="mt-4 text-lg italic leading-relaxed text-foreground/75"
						{...sectionFadeUp(reducedMotion, 0.21)}
					>
						Ден на отворените врати на{' '}
						<Link
							href="/about"
							className="font-medium not-italic text-primary underline decoration-primary/70 underline-offset-[3px] transition-colors hover:decoration-primary hover:opacity-90 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
						>
							Технологично училище „Електронни системи“ към ТУ – София
						</Link>
					</motion.p>
					<motion.div
						className="mt-3 space-y-2 text-base leading-relaxed text-foreground/80"
						{...sectionFadeUp(reducedMotion, 0.28)}
					>
						<p>
							<span className="font-semibold text-white">Дата:</span> {EVENT_META.date}
						</p>
						<p>
							<span className="font-semibold text-white">Час:</span> {EVENT_META.time}
						</p>
						<p>
							<span className="font-semibold text-white">Локация:</span>{' '}
							<Link
								href="/location"
								className="font-medium text-primary underline decoration-primary/70 underline-offset-[3px] transition-colors hover:decoration-primary hover:opacity-90 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
							>
								{EVENT_META.location}
							</Link>
						</p>
						<p>
							<span className="font-semibold text-white">Тема:</span>{' '}
							<span className="text-white/90">{EVENT_META.theme}</span>
						</p>
					</motion.div>
				</header>

				<motion.div {...sectionFadeUp(reducedMotion, 0.32)}>
					<RegulationToc
						items={TOC}
						sectionAccents={SECTION_ACCENTS}
						isSectionActive={isSectionActive}
						currentSectionId={currentSectionId}
						onNavigate={scrollToSection}
					/>
				</motion.div>

				<div className="flex flex-col gap-4">
					<motion.div {...sectionFadeUp(reducedMotion, 0)}>
					<RegulationAccordionSection
						sectionId="section-1"
						title="1. Общи положения"
						accent={SECTION_ACCENTS[0]}
						isActive={isSectionActive('section-1')}
						isFirst
					>
						<RegulationClause id="clause-1-1" n="1.1.">
							TUES Fest 2026 е публично изложение на ученически проекти, организирано от ученици за ученици под
							менторството на АЗТУЕС и ръководството на ТУЕС към ТУ – София.
						</RegulationClause>
						<RegulationClause id="clause-1-2" n="1.2.">
							Събитието се провежда веднъж годишно и е отворено за посещение от родители, кандидат-гимназисти,
							завършили ТУЕС-ари, преподаватели и представители на ИТ компании.
						</RegulationClause>
						<RegulationClause id="clause-1-3" n="1.3.">
							Настоящият регламент урежда условията за участие на ученически проекти, реда на провеждане на събитието и
							правилата за гласуване.
						</RegulationClause>
						<RegulationClause id="clause-1-4" n="1.4.">
							Организаторският екип си запазва правото да актуализира регламента. При промяна участниците ще бъдат
							уведомени своевременно по официален канал.
						</RegulationClause>
					</RegulationAccordionSection>
					</motion.div>
					<motion.div {...sectionFadeUp(reducedMotion, 0)}>
					<RegulationAccordionSection
						sectionId="section-2"
						title="2. Участници"
						accent={SECTION_ACCENTS[1]}
						isActive={isSectionActive('section-2')}
					>
						<RegulationClause id="clause-2-1" n="2.1.">
							Право на участие с проект имат всички текущи ученици на ТУЕС към ТУ – София от 8-ми до 12-ти клас.
						</RegulationClause>
						<RegulationClause id="clause-2-2" n="2.2.">
							Проектите могат да бъдат индивидуални или изпълнени в екип. Броят на членовете в екип е от 1 до 5 души.
						</RegulationClause>
						<RegulationClause id="clause-2-3" n="2.3.">
							Ако един ученик участва в повече от един проект, той може да е регистриран в различни екипи, но трябва
							предварително да уговори с всеки екип присъствието си по време на събитието.
						</RegulationClause>
						<RegulationClause id="clause-2-4" n="2.4.">
							Всички регистрирани проекти преминават предварителен подбор от преподавателите жури на АЗТУЕС и ТУЕС. До
							участие в TUES Fest се допускат единствено проектите, одобрени в този подбор.
						</RegulationClause>
					</RegulationAccordionSection>
					</motion.div>
					<motion.div {...sectionFadeUp(reducedMotion, 0)}>
					<RegulationAccordionSection
						sectionId="section-3"
						title="3. Проекти и категории"
						accent={SECTION_ACCENTS[2]}
						isActive={isSectionActive('section-3')}
					>
						<RegulationClause id="clause-3-1" n="3.1.">
							Проектите се представят в три категории:
						</RegulationClause>
						<ul className="mb-4 mt-2 list-disc space-y-2 pl-6 text-foreground/85">
							<li>
								<strong className="text-white">Софтуер</strong> — уеб, мобилни, desktop приложения, игри, AI/ML проекти
							</li>
							<li>
								<strong className="text-white">Компютърни мрежи</strong> — мрежова архитектура, сигурност,
								телекомуникации
							</li>
							<li>
								<strong className="text-white">Вградени системи и роботика</strong> — хардуерни проекти, IoT, роботика,
								вградени микрокомпютри
							</li>
						</ul>
						<RegulationClause id="clause-3-2" n="3.2.">
							Всеки проект трябва да бъде регистриран в точно една от трите категории. При неяснота относно категорията
							организаторите помагат при класифицирането.
						</RegulationClause>
						<RegulationClause id="clause-3-3" n="3.3.">
							Проектите трябва да са оригинални разработки на участниците. Използването на open-source библиотеки и
							инструменти е позволено, но трябва да бъде посочено в описанието на проекта.
						</RegulationClause>
						<RegulationClause id="clause-3-4" n="3.4.">
							Проектите могат да бъдат курсови работи, дипломни работи или самостоятелни извънучилищни разработки.
						</RegulationClause>
						<RegulationClause id="clause-3-5" n="3.5.">
							Проектът трябва да бъде в достатъчна степен на завършеност, за да може да бъде демонстриран пред посетители
							по време на събитието.
						</RegulationClause>
					</RegulationAccordionSection>
					</motion.div>
					<motion.div {...sectionFadeUp(reducedMotion, 0)}>
					<RegulationAccordionSection
						sectionId="section-4"
						title="4. Изисквания към съдържанието на проектите"
						accent={SECTION_ACCENTS[3]}
						isActive={isSectionActive('section-4')}
						triggerClassName="text-left"
					>
						<RegulationClause id="clause-4-1" n="4.1.">
							TUES Fest е публично събитие, посещавано от лица на всички възрасти, включително непълнолетни. Всички
							представени проекти трябва да са подходящи за широка аудитория.
						</RegulationClause>
						<RegulationClause id="clause-4-2" n="4.2.">
							Забранено е участието на проекти, които съдържат или реализират:
						</RegulationClause>
						<ul className="mb-4 mt-2 list-disc space-y-2 pl-6 text-foreground/85">
							<li>непристойно, вулгарно или сексуално съдържание</li>
							<li>хазартни механики (залози, казино игри, спортни залагания и подобни)</li>
							<li>
								съдържание, свързано с алкохол, тютюн, наркотици или други вещества, забранени за лица под 18 години
							</li>
							<li>насилие, езикова омраза, дискриминация или тормоз</li>
							<li>зловреден софтуер, инструменти за хакване или незаконно наблюдение</li>
							<li>съдържание, нарушаващо авторски права или лични данни на трети лица</li>
						</ul>
						<RegulationClause id="clause-4-3" n="4.3.">
							При съмнение дали даден проект отговаря на изискванията по т. 4.2, участниците трябва да се консултират с
							организаторите преди регистрацията.
						</RegulationClause>
						<RegulationClause id="clause-4-4" n="4.4.">
							Организаторите си запазват правото да не допуснат до участие или да отстранят проект, който нарушава
							горепосочените изисквания, дори и след първоначално одобрение.
						</RegulationClause>
					</RegulationAccordionSection>
					</motion.div>
					<motion.div {...sectionFadeUp(reducedMotion, 0)}>
					<RegulationAccordionSection
						sectionId="section-5"
						title="5. Регистрация"
						accent={SECTION_ACCENTS[4]}
						isActive={isSectionActive('section-5')}
					>
						<RegulationClause id="clause-5-1" n="5.1.">
							Регистрацията се извършва чрез официалната форма на сайта на TUES Fest или по друг обявен от организаторите
							начин.
						</RegulationClause>
						<RegulationClause id="clause-5-2" n="5.2.">
							При регистрацията участниците предоставят: имена на всички членове на екипа, клас, наименование на проекта,
							категория и кратко описание.
						</RegulationClause>
						<RegulationClause id="clause-5-3" n="5.3.">
							Крайният срок за регистрация и предаване на описание на проекта е приблизително 14 дни преди датата на
							събитието. Точният срок се обявява официално от организаторите.
						</RegulationClause>
						<RegulationClause id="clause-5-4" n="5.4.">
							При предоставяне на непълни или неверни данни организаторският екип има правото да не допусне проекта до
							участие.
						</RegulationClause>
						<RegulationClause id="clause-5-5" n="5.5.">
							Участниците, чиито проекти са одобрени, получават допълнителни инструкции за подготовка и присъствие.
						</RegulationClause>
					</RegulationAccordionSection>
					</motion.div>
					<motion.div {...sectionFadeUp(reducedMotion, 0)}>
					<RegulationAccordionSection
						sectionId="section-6"
						title="6. Провеждане на събитието"
						accent={SECTION_ACCENTS[5]}
						isActive={isSectionActive('section-6')}
					>
						<RegulationClause id="clause-6-1" n="6.1.">
							Всеки одобрен отбор получава определено място (щанд) в изложбеното пространство на форум „Джон Атанасов“,
							за да представи своя проект.
						</RegulationClause>
						<RegulationClause id="clause-6-2" n="6.2.">
							Участниците трябва да присъстват на своя щанд в рамките на работното време на събитието, за да представят
							проекта пред посетители, жури и спонсори.
						</RegulationClause>
						<RegulationClause id="clause-6-3" n="6.3.">
							Участниците сами осигуряват необходимото оборудване за демонстрация на проекта (лаптоп, прототип, печатни
							материали и др.).
						</RegulationClause>
						<RegulationClause id="clause-6-4" n="6.4.">
							Всички участници са длъжни да спазват правилата на обекта и указанията на организаторите и охраната на
							Sofia Tech Park.
						</RegulationClause>
						<RegulationClause id="clause-6-5" n="6.5.">
							Забранено е поведение, което нарушава реда или пречи на другите участници и посетители.
						</RegulationClause>
					</RegulationAccordionSection>
					</motion.div>
					<motion.div {...sectionFadeUp(reducedMotion, 0)}>
					<RegulationAccordionSection
						sectionId="section-7"
						title="7. Гласуване и награждаване"
						accent={SECTION_ACCENTS[6]}
						isActive={isSectionActive('section-7')}
					>
						<RegulationClause id="clause-7-1" n="7.1.">
							Посетителите на събитието могат да гласуват за своя проект-фаворит в три категории: Софтуер, Компютърни
							мрежи и Вградени системи и роботика.
						</RegulationClause>
						<RegulationClause id="clause-7-2" n="7.2.">
							Гласуването е отворено за всички посетители на събитието, включително ИТ специалисти, завършили ТУЕС-ари,
							родители и кандидат-гимназисти.
						</RegulationClause>
						<RegulationClause id="clause-7-3" n="7.3.">
							Всеки посетител може да гласува по един път за проект в рамките на всяка категория. Начинът на гласуване
							(физически или дигитален) се обявява от организаторите преди събитието.
						</RegulationClause>
						<RegulationClause id="clause-7-4" n="7.4.">
							В края на деня се обявява проектът-победител от всяка категория въз основа на събраните гласове.
							Организаторите си запазват правото да включат и оценка от комисия от предварително журиране.
						</RegulationClause>
						<RegulationClause id="clause-7-5" n="7.5.">
							Спонсорите на събитието могат да присъждат допълнителни специални награди по свои критерии, независимо от
							основното класиране по категории.
						</RegulationClause>
					</RegulationAccordionSection>
					</motion.div>
					<motion.div {...sectionFadeUp(reducedMotion, 0)}>
					<RegulationAccordionSection
						sectionId="section-8"
						title="8. Дисквалификация"
						accent={SECTION_ACCENTS[7]}
						isActive={isSectionActive('section-8')}
					>
						<RegulationClause id="clause-8-1" n="8.1.">
							Организаторите имат право да дисквалифицират участник, чието поведение е непристойно, агресивно или пречи
							на провеждането на събитието.
						</RegulationClause>
						<RegulationClause id="clause-8-2" n="8.2.">
							Организаторите си запазват правото да дисквалифицират проект, ако той нарушава изискванията по раздел 4,
							съдържа неморално съдържание, нарушава авторски права или има зловредна цел.
						</RegulationClause>
						<RegulationClause id="clause-8-3" n="8.3.">
							Отбор, който не изпълнява инструкциите на организаторите или системно нарушава правилата на събитието,
							може да бъде отстранен.
						</RegulationClause>
						<RegulationClause id="clause-8-4" n="8.4.">
							Решението за дисквалификация се взима от организаторския екип и е окончателно.
						</RegulationClause>
					</RegulationAccordionSection>
					</motion.div>
					<motion.div {...sectionFadeUp(reducedMotion, 0)}>
					<RegulationAccordionSection
						sectionId="section-9"
						title="9. Авторски права и публичност"
						accent={SECTION_ACCENTS[8]}
						isActive={isSectionActive('section-9')}
					>
						<RegulationClause id="clause-9-1" n="9.1.">
							Всички интелектуални права върху представените проекти остават собственост на техните автори.
						</RegulationClause>
						<RegulationClause id="clause-9-2" n="9.2.">
							С участието си в TUES Fest участниците дават съгласие организаторите да използват снимки, видеа и описания
							на проектите им за промоционални цели на събитието и на ТУЕС.
						</RegulationClause>
						<RegulationClause id="clause-9-3" n="9.3.">
							Участниците нямат претенции към организаторите за публикувани материали от събитието, стига те да не ги
							представят в невярна светлина.
						</RegulationClause>
					</RegulationAccordionSection>
					</motion.div>
					<motion.div {...sectionFadeUp(reducedMotion, 0)}>
					<RegulationAccordionSection
						sectionId="section-10"
						title="10. Посетители"
						accent={SECTION_ACCENTS[9]}
						isActive={isSectionActive('section-10')}
						isLast
					>
						<RegulationClause id="clause-10-1" n="10.1.">
							Входът за посетители е свободен. Не се изисква предварителна регистрация за посещение.
						</RegulationClause>
						<RegulationClause id="clause-10-2" n="10.2.">
							Посетителите са длъжни да спазват реда в залата и да се отнасят с уважение към участниците и техните
							проекти.
						</RegulationClause>
						<RegulationClause id="clause-10-3" n="10.3.">
							Организаторите си запазват правото да откажат достъп или да помолят посетител да напусне при неподходящо
							поведение.
						</RegulationClause>
					</RegulationAccordionSection>
					</motion.div>
				</div>

				<motion.p
					className="border-t border-white/10 pt-8 text-center text-sm italic text-foreground/55"
					{...sectionFadeUp(reducedMotion, 0.44)}
				>
					TUES Fest 2026 · 26 април 2026
				</motion.p>
			</div>
		</section>
	);
}
