'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { Duration } from 'effect';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { Check, ChevronRight, Mail, PartyPopper, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { PROJECT_CATEGORIES } from '@/constants/projects';
import {
	PROJECT_VOTE_LIMIT,
	VOTE_VERIFICATION_CODE_LENGTH,
	VOTE_VERIFICATION_EMAIL_COOLDOWN_DURATION,
} from '@/constants/voting';
import { useTRPC } from '@/lib/trpc/react';
import { cn } from '@/lib/utils';
import { useDeselectProject, useVotedProjects } from '@/stores/vote';
import { Alert, AlertDescription, AlertTitle } from './alert';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './dialog';
import { Skeleton } from './skeleton';

const registerFormSchema = z.object({
	name: z.string().min(2, {
		message: 'Името трябва да е поне 2 символа.',
	}),
	email: z.string().email({
		message: 'Моля, въведете валиден имейл адрес.',
	}),
});

const verificationEmailFormSchema = z.object({
	email: z.string().email({
		message: 'Моля, въведете валиден имейл адрес.',
	}),
});

const verificationCodeFormSchema = z.object({
	code: z
		.string()
		.length(VOTE_VERIFICATION_CODE_LENGTH, {
			message: `Кодът трябва да е точно ${VOTE_VERIFICATION_CODE_LENGTH} цифри.`,
		})
		.regex(/^\d+$/, {
			message: 'Кодът трябва да съдържа само цифри.',
		}),
});

// ── Shared shell (matches project cards / Links panels: border, card tint, font-title) ──

const voteShell = {
	header: 'border-b border-border/50 bg-card/40 px-6 py-5 backdrop-blur-sm',
	title: 'font-title text-xl tracking-tight',
	description: 'text-foreground text-sm leading-relaxed',
	eyebrow: 'text-primary text-xs font-semibold uppercase tracking-widest',
	footer: 'mt-auto shrink-0 border-t border-border/50 bg-muted/5 px-6 py-4',
} as const;

// ── Shared step layout helpers ─────────────────────────────────────────────

function StepContent({ children, className }: { children: React.ReactNode; className?: string }) {
	return <div className={cn('px-6 py-5', className)}>{children}</div>;
}

function StepFooter({ children }: { children: React.ReactNode }) {
	return <div className={cn(voteShell.footer)}>{children}</div>;
}

// ── FloatingVoteOverlay ────────────────────────────────────────────────────

export function FloatingVoteOverlay() {
	const trpc = useTRPC();
	const { data: currentVoter } = useQuery(trpc.voting.getCurrentVoter.queryOptions());
	const votedProjects = useVotedProjects();
	const deselectProject = useDeselectProject();
	const selectedCount = votedProjects.length;

	const progress = (selectedCount / PROJECT_VOTE_LIMIT) * 100;
	const isMaxSelected = selectedCount === PROJECT_VOTE_LIMIT;

	const hasVoted = currentVoter && currentVoter.isVerified && currentVoter.votedProjectIds.length > 0;
	const hasUnsavedChanges = useMemo(() => {
		const savedIdSet = new Set(currentVoter?.votedProjectIds ?? []);
		const localIdSet = new Set(votedProjects.map((project) => project.id));
		if (savedIdSet.size !== localIdSet.size) return true;
		return [...savedIdSet].some((id) => !localIdSet.has(id));
	}, [currentVoter, votedProjects]);

	return (
		<div className="fixed inset-x-0 bottom-0 z-50">
			<div
				className={cn(
					'flex justify-center border-t border-border/60 py-3 shadow-lg backdrop-blur-xl transition-all duration-300',
					isMaxSelected || (hasVoted && hasUnsavedChanges)
						? 'bg-card/70 ring-1 ring-inset ring-primary/25'
						: 'bg-card/60',
					!hasVoted && selectedCount === 0 && 'hidden'
				)}
			>
				<Sheet>
					<SheetTrigger asChild>
						<Button
							variant={isMaxSelected ? 'default' : 'ghost'}
							className="relative h-12 gap-2 px-6"
						>
							<div className="flex items-center gap-3">
								<div className="flex items-center gap-2">
									<div className="relative flex h-6 w-6 items-center justify-center">
										{isMaxSelected ? (
											<Check className="text-primary-foreground size-4" />
										) : (
											<>
												<div className="absolute inset-0">
													<Progress value={progress} className="h-6 w-6 rounded-full" />
												</div>
												<span
													className={cn(
														'relative text-sm font-medium',
														isMaxSelected ? 'text-primary-foreground' : 'text-foreground'
													)}
												>
													{selectedCount}
												</span>
											</>
										)}
									</div>
									<span
										className={cn(
											'text-sm font-medium',
											isMaxSelected ? 'text-primary-foreground' : 'text-foreground'
										)}
									>
										{hasVoted
											? hasUnsavedChanges
												? 'Запазете променения глас'
												: `Гласувахте за ${selectedCount} ${selectedCount === 1 ? 'проект' : 'проекта'}`
											: isMaxSelected
												? 'Запишете своя глас'
												: `Избрахте ${selectedCount} ${selectedCount === 1 ? 'проект' : 'проекта'}`}
									</span>
								</div>
								<ChevronRight
									className={cn(
										'size-4 transition-transform',
										isMaxSelected ? 'text-primary-foreground' : 'text-muted-foreground'
									)}
								/>
							</div>
						</Button>
					</SheetTrigger>

					<SheetContent className="flex flex-col gap-0 overflow-hidden border-l border-border/60 bg-background p-0 sm:max-w-md">
						{/* Sheet header */}
						<SheetHeader className={cn('shrink-0 space-y-1.5', voteShell.header)}>
							<p className={voteShell.eyebrow}>Гласуване</p>
							<SheetTitle className={voteShell.title}>Вашият глас</SheetTitle>
							<SheetDescription className={voteShell.description}>
								{selectedCount === PROJECT_VOTE_LIMIT
									? !hasVoted || hasUnsavedChanges
										? 'Готови сте да запишете своя глас'
										: `Избрахте ${selectedCount} проекта`
									: `Може да изберете още ${PROJECT_VOTE_LIMIT - selectedCount} ${PROJECT_VOTE_LIMIT - selectedCount === 1 ? 'проект' : 'проекта'}`}
							</SheetDescription>
						</SheetHeader>

						{/* Project list */}
						{votedProjects.length > 0 ? (
							<ScrollArea className="min-h-0 flex-1">
								<div className="space-y-3 p-4">
									{votedProjects.map((project) => (
										<div
											key={project.id}
											className="group relative flex gap-3 rounded-2xl border border-border/50 bg-card/50 p-3 backdrop-blur-sm transition-colors hover:border-border hover:bg-card/70"
										>
											<SheetClose
												asChild
												className="relative aspect-video w-28 shrink-0 overflow-hidden rounded-lg"
											>
												<Link href={`/projects/${project.id}`}>
													<Image
														src={project.thumbnail}
														alt={`Снимка на ${project.title}`}
														className="object-cover"
														fill
														sizes="112px"
													/>
												</Link>
											</SheetClose>
											<div className="flex min-w-0 flex-1 flex-col justify-between gap-1">
												<div>
													<h3 className="line-clamp-1 text-sm font-medium text-foreground">
														<SheetClose asChild>
															<Link href={`/projects/${project.id}`}>{project.title}</Link>
														</SheetClose>
													</h3>
													<p className="text-muted-foreground mt-0.5 line-clamp-1 text-xs">
														{PROJECT_CATEGORIES[project.category]}
													</p>
												</div>
											</div>
											<button
												className="ring-offset-background focus:ring-ring absolute right-3 top-3 rounded-sm opacity-40 transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none"
												onClick={() => deselectProject(project.id)}
											>
												<X className="size-3.5" />
												<span className="sr-only">Премахни проект</span>
											</button>
										</div>
									))}
								</div>
							</ScrollArea>
						) : (
							<div className="text-muted-foreground flex flex-1 flex-col items-center justify-center gap-2 p-6">
								<p className="text-sm">Нямате избрани проекти</p>
							</div>
						)}

						{/* Sheet footer */}
						<SheetFooter
							className={cn(
								voteShell.footer,
								'flex flex-col gap-3 sm:flex-col sm:space-x-0'
							)}
						>
							{hasVoted && !hasUnsavedChanges && (
								<div className="space-y-0.5 pb-1">
									<p className="text-sm font-medium text-foreground">Вашият глас е запазен</p>
									<p className="text-muted-foreground text-xs leading-relaxed">
										Все още можете да добавяте и премахвате проекти до затварянето на гласуването.
									</p>
								</div>
							)}
							{!hasVoted ? (
								<Suspense fallback={<Skeleton className="h-10 w-full" />}>
									<RegisterVoterButton />
								</Suspense>
							) : hasUnsavedChanges ? (
								<SaveVotesButton />
							) : (
								<SheetClose asChild>
									<Button className="w-full" size="lg" variant="primary-outline" asChild>
										<Link href="/projects">Промени глас</Link>
									</Button>
								</SheetClose>
							)}
						</SheetFooter>
					</SheetContent>
				</Sheet>
			</div>
		</div>
	);
}

// ── Step components ────────────────────────────────────────────────────────

function RegisterVoterStep(props: { onVerificationEmailSent: () => void }) {
	const form = useForm<z.infer<typeof registerFormSchema>>({
		resolver: zodResolver(registerFormSchema),
		defaultValues: { name: '', email: '' },
	});

	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const registerVoter = useMutation(
		trpc.voting.registerVoter.mutationOptions({
			onSuccess: (_data, variables) => {
				props.onVerificationEmailSent();
				const previousVoter = queryClient.getQueryData(trpc.voting.getCurrentVoter.queryKey());
				if (!previousVoter) {
					queryClient.setQueryData(trpc.voting.getCurrentVoter.queryKey(), {
						isVerified: false,
						email: variables.email,
						votedProjectIds: [],
					});
				}
			},
			onSettled: () => {
				void queryClient.invalidateQueries(trpc.voting.getCurrentVoter.queryOptions());
			},
			trpc: { context: { disableStreaming: true } },
		})
	);

	const name = form.watch('name');
	const email = form.watch('email');
	const isComplete = name.length >= 2 && email.length > 0;

	const handleSubmit = form.handleSubmit(async (data) => {
		await registerVoter.mutateAsync(data);
	});

	return (
		<Form {...form}>
			<form id="register-form" onSubmit={handleSubmit} className="flex min-h-0 flex-col">
				<StepContent className="flex-1 space-y-4">
					{registerVoter.isError && (
						<Alert variant="destructive">
							<AlertTitle>Възникна грешка</AlertTitle>
							<AlertDescription>{registerVoter.error.message}</AlertDescription>
						</Alert>
					)}
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Вашето име</FormLabel>
								<FormControl>
									<Input placeholder="Иван Иванов" {...field} />
								</FormControl>
								<FormDescription>
									Ще бъде използвано за идентификация на гласа ви.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Имейл адрес</FormLabel>
								<FormControl>
									<Input type="email" placeholder="ivan@example.com" {...field} />
								</FormControl>
								<FormDescription>На този адрес ще получите код за потвърждение.</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				</StepContent>
				<StepFooter>
					<Button
						type="submit"
						className="w-full"
						size="lg"
						disabled={!isComplete || registerVoter.isPending}
					>
						{registerVoter.isPending ? 'Изпращане...' : 'Изпрати код за потвърждение'}
					</Button>
				</StepFooter>
			</form>
		</Form>
	);
}

function SendVerificationEmailStep(props: { onVerificationEmailSent: () => void }) {
	const trpc = useTRPC();
	const { data: currentVoter } = useSuspenseQuery(trpc.voting.getCurrentVoter.queryOptions());
	const queryClient = useQueryClient();
	const resendVerificationCode = useMutation(
		trpc.voting.resendVerificationCode.mutationOptions({
			onSuccess: () => {
				props.onVerificationEmailSent();
			},
			onSettled: () => {
				void queryClient.invalidateQueries(trpc.voting.getCurrentVoter.queryOptions());
			},
		})
	);

	const form = useForm<z.infer<typeof verificationEmailFormSchema>>({
		resolver: zodResolver(verificationEmailFormSchema),
		defaultValues: { email: currentVoter?.email ?? '' },
	});

	const email = form.watch('email');
	const isComplete = email.length > 0;

	const handleSubmit = form.handleSubmit(async (data) => {
		await resendVerificationCode.mutateAsync(data);
	});

	return (
		<Form {...form}>
			<form id="send-email-form" onSubmit={handleSubmit} className="flex min-h-0 flex-col">
				<StepContent className="flex-1 space-y-4">
					<div className="flex items-start gap-2 rounded-xl border border-border/50 bg-card/40 px-4 py-3 backdrop-blur-sm">
						<Mail className="text-muted-foreground size-4 shrink-0 pt-1" />
						<p className="text-sm text-foreground/90">
							Кодът ще бъде изпратен на{' '}
							<span className="font-medium text-primary">{currentVoter?.email}</span>
						</p>
					</div>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Имейл адрес</FormLabel>
								<FormControl>
									<Input type="email" placeholder="ivan@example.com" {...field} />
								</FormControl>
								<FormDescription>Можете да промените имейл адреса си, ако желаете.</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				</StepContent>
				<StepFooter>
					<Button
						type="submit"
						size="lg"
						className="w-full"
						disabled={!isComplete || resendVerificationCode.isPending}
					>
						{resendVerificationCode.isPending ? 'Изпращане...' : 'Изпрати нов код за потвърждение'}
					</Button>
				</StepFooter>
			</form>
		</Form>
	);
}

function EnterVerificationCodeStep(props: { onBackToEmailStep: () => void }) {
	const form = useForm<z.infer<typeof verificationCodeFormSchema>>({
		resolver: zodResolver(verificationCodeFormSchema),
		defaultValues: { code: '' },
	});

	const code = form.watch('code');
	const isComplete = code.length === VOTE_VERIFICATION_CODE_LENGTH;

	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const votedProjects = useVotedProjects();
	const [showEmailTroubleshooting, setShowEmailTroubleshooting] = useState(false);

	const resendVerificationCode = useMutation(
		trpc.voting.resendVerificationCode.mutationOptions({
			onSuccess: () => {
				setShowEmailTroubleshooting(false);
			},
		})
	);

	const verifyVoter = useMutation(
		trpc.voting.verifyVoter.mutationOptions({
			onSuccess: (data) => {
				if (data.matches) {
					queryClient.setQueryData(trpc.voting.getCurrentVoter.queryKey(), (voter) => ({
						email: voter?.email ?? '',
						...voter,
						isVerified: true,
						votedProjectIds: votedProjects.map((p) => p.id),
					}));
					void queryClient.invalidateQueries(trpc.voting.getCurrentVoter.queryOptions());
				} else {
					form.setError('code', { message: 'Грешен код за потвърждение' });
				}
			},
			onError: (error) => {
				toast.error('Възникна грешка при потвърждаването на гласа ви.', {
					description: error.message,
				});
			},
		})
	);

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowEmailTroubleshooting(true);
		}, Duration.toMillis(VOTE_VERIFICATION_EMAIL_COOLDOWN_DURATION));
		return () => clearTimeout(timer);
	}, []);

	const handleSubmit = form.handleSubmit(async (data) => {
		await verifyVoter.mutateAsync({
			verificationCode: data.code,
			selectedProjectIds: new Set(votedProjects.map((p) => p.id)),
		});
	});

	return (
		<Form {...form}>
			<form id="verify-form" onSubmit={handleSubmit} className="flex min-h-0 flex-col">
				<StepContent className="flex-1 space-y-6">
					<FormField
						control={form.control}
						name="code"
						render={({ field }) => (
							<FormItem className="space-y-4">
								<FormLabel className="sr-only">Код за потвърждение</FormLabel>
								<FormControl>
									<div className="flex flex-col items-center gap-3">
										<InputOTP
											maxLength={VOTE_VERIFICATION_CODE_LENGTH}
											pattern={REGEXP_ONLY_DIGITS}
											{...field}
										>
											<InputOTPGroup>
												{Array.from({ length: Math.ceil(VOTE_VERIFICATION_CODE_LENGTH / 2) }).map(
													(_, i) => (
														<InputOTPSlot key={i} index={i} className="h-12 w-10 text-lg" />
													)
												)}
											</InputOTPGroup>
											<InputOTPGroup>
												{Array.from({
													length: Math.floor(VOTE_VERIFICATION_CODE_LENGTH / 2),
												}).map((_, i) => (
													<InputOTPSlot
														key={i + Math.ceil(VOTE_VERIFICATION_CODE_LENGTH / 2)}
														index={i + Math.ceil(VOTE_VERIFICATION_CODE_LENGTH / 2)}
														className="h-12 w-10 text-lg"
													/>
												))}
											</InputOTPGroup>
										</InputOTP>
									</div>
								</FormControl>
								<FormDescription className="text-center">
									Въведете {VOTE_VERIFICATION_CODE_LENGTH}-цифрения код от имейла си.
								</FormDescription>
								<FormMessage className="text-center" />
							</FormItem>
						)}
					/>

					{showEmailTroubleshooting && (
						<div className="space-y-3 rounded-xl border border-border/50 bg-card/40 px-4 py-3 backdrop-blur-sm">
							<p className="text-primary text-center text-sm">Не получавате имейла?</p>
							{resendVerificationCode.isSuccess ? (
								<p className="text-muted-foreground text-center text-xs">
									Изпратихме нов код. Проверете и папката със спам.
								</p>
							) : (
								<div className="flex w-fit mx-auto gap-1">
									<Button
										type="button"
										variant="default-secondary"
										size="sm"
										className="text-xs"
										disabled={resendVerificationCode.isPending}
										onClick={() => resendVerificationCode.mutate({})}
									>
										{resendVerificationCode.isPending ? 'Изпращане...' : 'Изпрати нов код'}
									</Button>
									<Button
										type="button"
										variant="default"
										size="sm"
										className="text-xs"
										onClick={props.onBackToEmailStep}
									>
										Опитай с друг имейл
									</Button>
								</div>
							)}
						</div>
					)}
				</StepContent>
				<StepFooter>
					<Button
						type="submit"
						className="w-full"
						size="lg"
						disabled={!isComplete || verifyVoter.isPending}
					>
						{verifyVoter.isPending ? 'Потвърждаване...' : 'Потвърди код'}
					</Button>
				</StepFooter>
			</form>
		</Form>
	);
}

function SuccessStep() {
	return (
		<div className="flex flex-col">
			<StepContent className="flex flex-col items-center gap-6 py-8 text-center">
				<div className="flex h-16 w-16 items-center justify-center rounded-full border border-border/60 bg-muted/10">
					<PartyPopper className="text-primary/90 size-7" />
				</div>
				<div className="space-y-2">
					<p className="font-title text-lg tracking-tight text-foreground">
						Гласът ви е записан!
					</p>
					<p className="text-muted-foreground text-sm leading-relaxed">
						Вашият глас е успешно потвърден и ще бъде отчетен при крайното класиране.
					</p>
				</div>
				<p className="text-muted-foreground max-w-[22rem] text-xs leading-relaxed">
					До края на гласуването можете да добавяте или премахвате проекти. Използвайте{' '}
					<span className="text-foreground/70 font-medium">„Промени глас"</span>, за да запазите
					промените.
				</p>
			</StepContent>
			<StepFooter>
				<SheetClose asChild>
					<DialogClose asChild>
						<Button asChild className="w-full" size="lg">
							<Link href="/projects">Разгледай още проекти</Link>
						</Button>
					</DialogClose>
				</SheetClose>
			</StepFooter>
		</div>
	);
}

// ── RegisterVoterButton ────────────────────────────────────────────────────

const STEP_COPY = {
	register: {
		label: 'TUES Fest · Гласуване',
		title: 'Потвърдете имейла си',
		description: 'За да гласувате е необходимо да потвърдите вашия имейл адрес.',
	},
	'send-verification-email': {
		label: 'TUES Fest · Гласуване',
		title: 'Изпратете код',
		description: 'Въведете имейл адреса, на който да получите код за потвърждение.',
	},
	'enter-verification-code': {
		label: 'TUES Fest · Гласуване',
		title: 'Въведете кода',
		description: 'Проверете имейла си и въведете получения 6-цифрен код.',
	},
	success: {
		label: 'TUES Fest · Гласуване',
		title: 'Успешно гласуване',
		description: 'Вашият глас е успешно потвърден и записан.',
	},
} as const;

function RegisterVoterButton(props: React.ComponentPropsWithoutRef<typeof Button>) {
	const trpc = useTRPC();
	const { data: currentVoter } = useSuspenseQuery(trpc.voting.getCurrentVoter.queryOptions());
	const votedProjects = useVotedProjects();
	const selectedCount = votedProjects.length;
	const router = useRouter();
	const searchParams = useSearchParams();

	const voteParam = searchParams.get('vote');
	const isOpen = voteParam !== null;
	const wasVerificationEmailSent = voteParam === 'verify';

	const setVoteParam = (value: string | null) => {
		const params = new URLSearchParams(searchParams.toString());
		if (value === null) {
			params.delete('vote');
		} else {
			params.set('vote', value);
		}
		const query = params.toString();
		router.replace(query ? `?${query}` : window.location.pathname, { scroll: false });
	};

	const step = !currentVoter
		? ('register' as const)
		: currentVoter.isVerified
			? ('success' as const)
			: !wasVerificationEmailSent
				? ('send-verification-email' as const)
				: ('enter-verification-code' as const);

	const copy = STEP_COPY[step];

	return (
		<Dialog open={isOpen} onOpenChange={(open) => setVoteParam(open ? 'open' : null)}>
			<DialogTrigger asChild>
				<Button
					className="w-full"
					size="lg"
					disabled={selectedCount === 0}
					{...props}
					onClick={() => setVoteParam('open')}
				>
					{selectedCount === 0
						? 'Изберете поне един проект'
						: `Гласувайте за ${selectedCount} ${selectedCount === 1 ? 'проект' : 'проекта'}`}
				</Button>
			</DialogTrigger>

			<DialogContent className="gap-0 overflow-hidden rounded-2xl border border-border/80 bg-background p-0 sm:max-w-md">
				<DialogHeader className={cn('shrink-0', voteShell.header)}>
					<p className={voteShell.eyebrow}>{copy.label}</p>
					<DialogTitle className={voteShell.title}>{copy.title}</DialogTitle>
					<DialogDescription className={voteShell.description}>{copy.description}</DialogDescription>
				</DialogHeader>

				{/* Step content */}
				{step === 'register' && (
					<RegisterVoterStep onVerificationEmailSent={() => setVoteParam('verify')} />
				)}
				{step === 'send-verification-email' && (
					<SendVerificationEmailStep onVerificationEmailSent={() => setVoteParam('verify')} />
				)}
				{step === 'enter-verification-code' && (
					<EnterVerificationCodeStep onBackToEmailStep={() => setVoteParam('open')} />
				)}
				{step === 'success' && <SuccessStep />}
			</DialogContent>
		</Dialog>
	);
}

// ── SaveVotesButton ────────────────────────────────────────────────────────

function SaveVotesButton(props: React.ComponentProps<typeof Button>) {
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const votedProjects = useVotedProjects();
	const selectedCount = votedProjects.length;

	const updateVotes = useMutation(
		trpc.voting.updateVotes.mutationOptions({
			onSuccess: (_data, variables) => {
				queryClient.setQueryData(trpc.voting.getCurrentVoter.queryKey(), (voter) => {
					if (!voter) return voter;
					return {
						...voter,
						votedProjectIds: Array.from(variables.selectedProjectIds),
					};
				});
			},
			onSettled: () => {
				void queryClient.invalidateQueries(trpc.voting.getCurrentVoter.queryOptions());
			},
		})
	);

	const handleClick = async () => {
		await updateVotes.mutateAsync({
			selectedProjectIds: new Set(votedProjects.map((p) => p.id)),
		});
	};

	return (
		<Button
			className="w-full"
			size="lg"
			disabled={selectedCount === 0 || updateVotes.isPending}
			onClick={handleClick}
			{...props}
		>
			{updateVotes.isPending ? 'Запазване...' : 'Промени глас'}
		</Button>
	);
}
