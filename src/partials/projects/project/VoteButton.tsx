'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowRightLeft, Check } from 'lucide-react';
import { toast } from 'sonner';

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PROJECT_CATEGORIES } from '@/constants/projects';
import { PROJECT_VOTE_LIMIT } from '@/constants/voting';
import { cn } from '@/lib/utils';
import {
	LocalVotedProject,
	useDeselectProject,
	useProjectVoteStatus,
	useReplaceProject,
	useSelectProject,
	useVotedProjects,
} from '@/stores/vote';

const SECONDARY_VARIANT_MAP: Partial<
	Record<NonNullable<React.ComponentProps<typeof Button>['variant']>, React.ComponentProps<typeof Button>['variant']>
> = {
	default: 'default-secondary',
	muted: 'muted-secondary',
	secondary: 'secondary-secondary',
	accent: 'accent-secondary',
};

/** Matches voting sheet / dialog chrome in `floating-vote-overlay` */
const voteAlert = {
	shell: 'gap-0 overflow-hidden rounded-2xl border-border/80 bg-background p-0',
	header: 'space-y-1.5 border-b border-border/50 bg-card/40 px-6 py-5 text-left backdrop-blur-sm',
	eyebrow: 'text-muted-foreground text-xs font-semibold uppercase tracking-widest',
	title: 'font-title text-xl tracking-tight text-foreground',
	description: 'text-muted-foreground text-sm leading-relaxed',
	footer: 'gap-2 border-t border-border/50 bg-muted/5 p-4 sm:flex-row sm:justify-end',
} as const;

export function VoteSelectProjectButton({
	project,
	className,
	size = 'lg',
	variant = 'default',
	...props
}: {
	project: LocalVotedProject;
	className?: string;
	size?: React.ComponentProps<typeof Button>['size'];
	variant?: React.ComponentProps<typeof Button>['variant'];
}) {
	const { isSelected, hasReachedVoteLimit } = useProjectVoteStatus(project.id);
	const selectProject = useSelectProject();
	const deselectProject = useDeselectProject();
	const replaceProject = useReplaceProject();
	const votedProjects = useVotedProjects();
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [selectedReplaceId, setSelectedReplaceId] = useState<number | null>(null);

	function handleClick() {
		if (isSelected) {
			setIsDialogOpen(true);
		} else if (!hasReachedVoteLimit) {
			selectProject(project);
		} else {
			setIsDialogOpen(true);
		}
	}

	function handleConfirmDeselect() {
		deselectProject(project.id);
		setIsDialogOpen(false);
	}

	function handleConfirmReplace() {
		if (selectedReplaceId !== null) {
			const replacedProject = replaceProject(selectedReplaceId, project);
			setIsDialogOpen(false);
			setSelectedReplaceId(null);
			if (replacedProject) {
				toast.success('Проектът е заменен успешно', {
					action: {
						label: 'Отмени',
						onClick: () => {
							replaceProject(project.id, replacedProject);
						},
					},
				});
			}
		}
	}

	return (
		<AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<Button
				variant={isSelected ? (SECONDARY_VARIANT_MAP[variant ?? 'default'] ?? 'secondary') : variant}
				className={cn(className, 'cursor-pointer')}
				size={size}
				onClick={handleClick}
				{...props}
			>
				{isSelected ? (
					<>
						<Check className="size-4" />
						Премахни глас
					</>
				) : (
					'Избери за гласуване'
				)}
			</Button>

			{isSelected ? (
				<AlertDialogContent className={cn(voteAlert.shell, 'sm:max-w-md')}>
					<AlertDialogHeader className={voteAlert.header}>
						<p className={voteAlert.eyebrow}>Гласуване</p>
						<AlertDialogTitle className={voteAlert.title}>Премахни глас</AlertDialogTitle>
						<AlertDialogDescription className={voteAlert.description}>
							Сигурни ли сте, че искате да премахнете гласа си за <ProjectTitle title={project.title} />?
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter className={voteAlert.footer}>
						<AlertDialogCancel>Откажи</AlertDialogCancel>
						<AlertDialogAction onClick={handleConfirmDeselect}>Премахни глас</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			) : hasReachedVoteLimit ? (
				<AlertDialogContent
					className={cn(
						voteAlert.shell,
						'flex max-h-[min(95vh,42rem)] flex-col sm:max-w-2xl'
					)}
				>
					<AlertDialogHeader className={cn(voteAlert.header, 'shrink-0')}>
						<p className={voteAlert.eyebrow}>Гласуване</p>
						<AlertDialogTitle className={voteAlert.title}>
							Достигнахте максималния брой гласове
						</AlertDialogTitle>
						<AlertDialogDescription className={voteAlert.description}>
							Можете да гласувате за най-много {PROJECT_VOTE_LIMIT} проекта. За да добавите{' '}
							<ProjectTitle title={project.title} /> към гласовете си, изберете кой проект искате да
							замените:
						</AlertDialogDescription>
					</AlertDialogHeader>

					<div className="min-h-0 flex-1 overflow-y-auto px-4 pb-2 pt-1">
						<div
							className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3"
							role="radiogroup"
							aria-label="Изберете проект за замяна"
						>
							{votedProjects.map((votedProject) => (
								<Card
									key={votedProject.id}
									className={cn(
										'group relative cursor-pointer overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300',
										selectedReplaceId === votedProject.id &&
											'border-primary/45 ring-2 ring-primary/25'
									)}
									onClick={() => setSelectedReplaceId(votedProject.id)}
									onKeyDown={(e) => {
										if (e.key === 'Enter' || e.key === ' ') {
											e.preventDefault();
											setSelectedReplaceId(votedProject.id);
										}
									}}
									role="radio"
									aria-checked={selectedReplaceId === votedProject.id}
									tabIndex={0}
								>
									<div className="relative aspect-video">
										<Image
											src={votedProject.thumbnail}
											alt={`Снимка на проект ${votedProject.title}`}
											className="object-cover"
											fill
											sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
										/>
										<div
											className={cn(
												'absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 transition-opacity duration-300',
												selectedReplaceId === votedProject.id && 'opacity-100',
												'group-hover:opacity-100'
											)}
											aria-hidden="true"
										>
											<ArrowRightLeft
												className={cn(
													'size-8 text-white opacity-0 transition-opacity duration-300',
													selectedReplaceId === votedProject.id && 'opacity-100',
													'group-hover:opacity-100'
												)}
											/>
										</div>
									</div>
									<div className="p-3">
										<h3 className="line-clamp-2 text-sm font-medium text-foreground">{votedProject.title}</h3>
										<p className="text-muted-foreground mt-1 text-xs">
											{PROJECT_CATEGORIES[votedProject.category]}
										</p>
									</div>
								</Card>
							))}
						</div>
					</div>

					<AlertDialogFooter className={cn(voteAlert.footer, 'shrink-0')}>
						<AlertDialogCancel onClick={() => setSelectedReplaceId(null)}>Откажи</AlertDialogCancel>
						<AlertDialogAction onClick={handleConfirmReplace} disabled={selectedReplaceId === null}>
							Замени
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			) : null}
		</AlertDialog>
	);
}

function ProjectTitle({ title }: { title: string }) {
	if (title.length > 20) {
		return 'този проект';
	}
	return <strong className="font-semibold text-foreground">{title}</strong>;
}
