'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { TbMapPin, TbMenu2, TbSchool } from 'react-icons/tb';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { TF_LOCATION, TF_LOCATION_SHORT } from '@/constants/event';
import { useTFFeatureIsOn } from '@/lib/growthbook/react/hooks';
import { cn } from '@/lib/utils';
import { TFLogo } from '../home/TFLogo';

const LINKS = [
	// { href: '/', title: 'Начало' },
	{ href: '/projects', title: 'Проекти' },
	{ href: '/leaderboard', title: 'Класация' },
	{ href: '/schedule', title: 'Програма' },
	{ href: '/regulation', title: 'Регламент' },
	{ href: '/partners', title: 'Спонсори && Партньори' },
	// { href: '/projects', title: 'Гласуване' },
];

const SCHOOL_LINKS = [
	{ href: '/about', title: 'Училището' },
	{ href: '/apply', title: 'Кандидатстване' },
	{ href: '/tuestalks', title: 'TUES Talks' },
];

/** Desktop nav link — PT Mono, transitions to primary (pink) on hover. */
function NavLink({
	href,
	children,
	onClick,
}: {
	href: string;
	children: React.ReactNode;
	onClick?: () => void;
}) {
	return (
		<Link
			href={href}
			onClick={onClick}
			className="font-title text-sm tracking-widest text-white/60 transition-colors duration-200 hover:text-primary focus:outline-none focus-visible:text-primary rounded px-3 py-1.5"
		>
			{children}
		</Link>
	);
}

/** Mobile drawer link — larger, same typography. */
function DrawerLink({
	href,
	children,
	target,
	onClick,
}: {
	href: string;
	children: React.ReactNode;
	target?: string;
	onClick?: () => void;
}) {
	return (
		<Link
			href={href}
			target={target}
			onClick={onClick}
			className="block font-title text-base tracking-widest text-white/70 transition-colors duration-200 hover:text-primary py-2"
		>
			{children}
		</Link>
	);
}

/** Small eyebrow label used as section divider in the mobile drawer. */
function DrawerSectionLabel({ children }: { children: React.ReactNode }) {
	return (
		<p className="mt-6 mb-1 font-title text-xs tracking-[0.2em] text-muted uppercase">
			{children}
		</p>
	);
}

export function Navigation() {
	const [isScrolled, setIsScrolled] = useState(false);

	const isScheduleEnabled = useTFFeatureIsOn('tf-schedule');
	const isProjectsEnabled = useTFFeatureIsOn('tf-show-projects');
	const isPartnersEnabled = useTFFeatureIsOn('tf-show-partners');
	const isTUESTalksEnabled = useTFFeatureIsOn('tf-show-tuestalks');
	const isApplyEnabled = useTFFeatureIsOn('tf-show-apply');
	const isLeaderboardEnabled = useTFFeatureIsOn('tf-show-leaderboard')

	const visibleLinks = LINKS.filter(
		(link) =>
			(isScheduleEnabled || link.href !== '/schedule') &&
			(isProjectsEnabled || link.href !== '/projects') &&
			(isPartnersEnabled || link.href !== '/partners') &&
			(isLeaderboardEnabled || link.href !== '/leaderboard'),
	);

	const visibleSchoolLinks = SCHOOL_LINKS.filter(
		(link) =>
			(isTUESTalksEnabled || link.href !== '/tuestalks') &&
			(isApplyEnabled || link.href !== '/apply'),
	);

	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 50);
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<header
			className={cn(
				'sticky top-0 z-50 w-full border-b border-white/10 backdrop-blur-xl transition-all duration-300',
				isScrolled ? 'bg-background/90' : 'bg-background/60',
			)}
		>
			<div className="mx-auto flex h-(--header-height) max-w-screen-2xl items-center justify-between px-6">
				{/* Logo + desktop nav */}
				<div className="flex items-center gap-8">
					<Link href="/" aria-label="Начало">
						<TFLogo />
					</Link>

					<nav className="hidden items-center gap-1 lg:flex">
						{visibleLinks.map((link) => (
							<NavLink key={link.href} href={link.href}>
								{link.title}
							</NavLink>
						))}
					</nav>
				</div>

				{/* Desktop actions */}
				<div className="hidden items-center gap-3 lg:flex">
					<Button
						variant="ghost"
						size="sm"
						className="gap-2 font-title text-xs tracking-widest text-white/60 hover:text-primary"
						asChild
					>
						<Link href="/location">
							<TbMapPin className="h-4 w-4" />
							{TF_LOCATION_SHORT}
						</Link>
					</Button>

					<DropdownMenu modal={false}>
						<DropdownMenuTrigger asChild>
							<Button variant="default-secondary" size="sm" className="gap-2 font-title tracking-widest text-xs">
								<TbSchool className="h-4 w-4" />
								За ТУЕС
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align="end"
							sideOffset={8}
							className="min-w-[200px] rounded-xl border border-white/10 bg-background/90 p-2 shadow-xl shadow-black/50 backdrop-blur-xl"
						>
							{visibleSchoolLinks.map((link) => (
								<DropdownMenuItem
									asChild
									key={link.href}
									className="cursor-pointer rounded-lg px-3 py-2.5 focus:bg-white/5 focus:text-primary"
								>
									<Link
										href={link.href}
										className="font-title text-sm tracking-widest text-white/60 transition-colors hover:text-primary"
									>
										{link.title}
									</Link>
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				{/* Mobile hamburger */}
				<Sheet>
					<SheetTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							className="inline-flex lg:hidden text-white/60 hover:text-primary"
							aria-label="Отвори меню"
						>
							<TbMenu2 className="h-5 w-5" />
						</Button>
					</SheetTrigger>

					<SheetContent side="right" className="w-72 border-l border-white/10 bg-background/95 backdrop-blur-xl px-6 py-6">
						<SheetHeader className="mb-4">
							<SheetTitle asChild>
								<Link href="/" className="block">
									<TFLogo className="text-2xl" />
								</Link>
							</SheetTitle>
							<SheetDescription className="sr-only">
								Навигационно меню
							</SheetDescription>
						</SheetHeader>

						<div className="flex flex-col">
							{visibleLinks.length > 0 && (
								<>
									<DrawerSectionLabel>Събитие</DrawerSectionLabel>
									<div className="border-b border-white/10 pb-4">
										{visibleLinks.map((link) => (
											<DrawerLink key={link.href} href={link.href}>
												{link.title}
											</DrawerLink>
										))}
									</div>
								</>
							)}

							{visibleSchoolLinks.length > 0 && (
								<>
									<DrawerSectionLabel>За ТУЕС</DrawerSectionLabel>
									<div className="border-b border-white/10 pb-4">
										{visibleSchoolLinks.map((link) => (
											<DrawerLink key={link.href} href={link.href}>
												{link.title}
											</DrawerLink>
										))}
									</div>
								</>
							)}

							<DrawerSectionLabel>Локация</DrawerSectionLabel>
							<DrawerLink href="/location">
								{TF_LOCATION}
							</DrawerLink>
						</div>
					</SheetContent>
				</Sheet>
			</div>
		</header>
	);
}
