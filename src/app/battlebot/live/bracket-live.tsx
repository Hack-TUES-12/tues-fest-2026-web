'use client';

import { useQuery } from '@tanstack/react-query';
import { motion, useReducedMotion } from 'motion/react';
import { TbTrophy } from 'react-icons/tb';

import { useTRPC } from '@/lib/trpc/react';
import { type RouterOutputs } from '@/lib/trpc/react';
import { cn } from '@/lib/utils';

type Round = RouterOutputs['battleBots']['getTournament'][number];
type Match = Round['matches'][number];

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

// ─── Participant row ──────────────────────────────────────────────────────────

function ParticipantRow({
	participant,
	isWinner,
	isLoser,
}: {
	participant: Match['player1'];
	isWinner: boolean;
	isLoser: boolean;
}) {
	const name = participant?.name ?? 'TBD';
	const seed = participant?.seed;
	const hasColors = !!participant?.primaryColor && !!participant?.textColor;

	return (
		<div
			className={cn(
				'flex items-center gap-2.5 px-3 py-2.5 transition-all duration-200',
				isLoser && 'opacity-55',
				isWinner && !hasColors && 'bg-primary/10',
			)}
			style={isWinner && hasColors ? { backgroundColor: participant!.primaryColor! + '22' } : {}}
		>
			<span className="w-4 shrink-0 text-center font-mono text-[11px] font-semibold text-foreground/50 tabular-nums">
				{seed ?? '—'}
			</span>
			<span
				className={cn(
					'flex-1 truncate text-sm',
					isWinner ? 'font-semibold text-white' : 'font-normal text-foreground/80',
				)}
			>
				{name}
			</span>
		</div>
	);
}

// ─── Match card ───────────────────────────────────────────────────────────────

function MatchCard({ match, isFinal }: { match: Match; isFinal?: boolean }) {
	const hasWinner = match.winnerId !== null;
	const p1Wins = hasWinner && match.winnerId === match.player1?.id;
	const p2Wins = hasWinner && match.winnerId === match.player2?.id;
	const winner = p1Wins ? match.player1 : p2Wins ? match.player2 : null;
	const isOpen = match.state === 'open';

	return (
		<div
			className={cn(
				'w-[228px] overflow-hidden rounded-2xl border bg-card/60 shadow-sm backdrop-blur-md transition-all duration-300',
				isFinal && hasWinner ? 'border-white/15 shadow-md' : 'border-white/5',
			)}
			style={
				isFinal && hasWinner && winner?.primaryColor
					? { borderColor: winner.primaryColor + '55', boxShadow: `0 4px 24px ${winner.primaryColor}18` }
					: {}
			}
		>
			{/* Finals winner banner */}
			{isFinal && hasWinner && winner && (
				<div
					className="flex items-center gap-2 px-3 py-1.5 border-b border-white/5"
					style={winner.primaryColor ? { backgroundColor: winner.primaryColor + '18' } : {}}
				>
					<TbTrophy
						size={11}
						className={cn(!winner.primaryColor && 'text-yellow-400')}
						style={winner.primaryColor ? { color: winner.primaryColor } : {}}
					/>
					<span
						className={cn('text-xs font-semibold tracking-wide', !winner.primaryColor && 'text-yellow-400')}
						style={winner.primaryColor ? { color: winner.primaryColor } : {}}
					>
						Победител
					</span>
				</div>
			)}

			{/* In-progress indicator */}
			{isOpen && !hasWinner && (
				<div className="flex items-center gap-1.5 px-3 py-1 border-b border-white/5 bg-white/3">
					<span className="size-1.5 animate-pulse rounded-full bg-green-400" />
					<span className="text-[10px] font-medium text-green-400/80 tracking-wider">В ход</span>
				</div>
			)}

			<ParticipantRow
				participant={match.player1}
				isWinner={p1Wins}
				isLoser={hasWinner && !p1Wins && match.player1 !== null}
			/>
			<div className="mx-3 h-px bg-white/5" />
			<ParticipantRow
				participant={match.player2}
				isWinner={p2Wins}
				isLoser={hasWinner && !p2Wins && match.player2 !== null}
			/>
		</div>
	);
}

// ─── Connector column ─────────────────────────────────────────────────────────

function ConnectorColumn({ numPairs }: { numPairs: number }) {
	return (
		<div className="flex w-10 flex-1 flex-col gap-4">
			{Array.from({ length: numPairs }).map((_, i) => (
				<div key={i} className="flex flex-1 flex-col">
					<div className="flex-1 rounded-tr-sm border-t border-r border-white/10" />
					<div className="flex-1 rounded-br-sm border-r border-b border-white/10" />
				</div>
			))}
		</div>
	);
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function BracketSkeleton() {
	const LABEL_H = 'h-8';
	const LABEL_MB = 'mb-5';
	return (
		<div className="flex items-stretch gap-0">
			{[4, 2, 1].map((count, colIdx) => (
				<div key={colIdx} className="flex items-stretch">
					<div className="flex flex-col">
						<div className={cn(LABEL_H, LABEL_MB)} />
						<div className={cn('flex flex-col gap-4', colIdx > 0 && 'flex-1 justify-around')}>
							{Array.from({ length: count }).map((_, i) => (
								<div key={i} className="h-[76px] w-[228px] animate-pulse rounded-2xl bg-card/40" />
							))}
						</div>
					</div>
					{colIdx < 2 && (
						<div className="flex flex-col">
							<div className={cn(LABEL_H, LABEL_MB)} />
							<ConnectorColumn numPairs={count / 2} />
						</div>
					)}
				</div>
			))}
		</div>
	);
}

// ─── Main component ───────────────────────────────────────────────────────────

export function BracketLive() {
	const trpc = useTRPC();
	const reducedMotion = useReducedMotion();

	const { data: rounds, isLoading } = useQuery({
		...trpc.battleBots.getTournament.queryOptions(),
		refetchInterval: 5000,
	});

	return (
		<motion.section
			className="w-full"
			initial={reducedMotion ? false : { opacity: 0, y: 24 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.55, delay: 0.2, ease: EASE_OUT }}
		>
			<div className="w-full overflow-x-auto pb-4">
				<div className="mx-auto min-w-max">
					{isLoading || !rounds ? (
						<BracketSkeleton />
					) : rounds.length === 0 ? (
						<p className="text-center text-sm text-foreground/50">
							Турнирът все още не е започнал.
						</p>
					) : (
						<div className="flex justify-center items-stretch gap-0">
							{rounds.map((round, i) => {
								const isFirst = i === 0;
								const isFinal = i === rounds.length - 1;
								const numPairs = Math.ceil(round.matches.length / 2);

								return (
									<div key={round.label} className="flex items-stretch">
										{/* Round column — label on top, matches below */}
										<div className="flex flex-col">
											<div className="mb-5 flex h-8 items-center justify-center">
												<span className="text-xs font-semibold tracking-widest text-secondary uppercase">
													{round.label}
												</span>
											</div>
											<div
												className={cn(
													'flex flex-col gap-4',
													!isFirst && 'flex-1 justify-around',
												)}
											>
												{round.matches.map((match) => (
													<div
														key={match.id}
														className={cn('flex items-center', !isFirst && 'gap-0')}
													>
														{!isFirst && (
															<div className="h-px w-2 shrink-0 bg-white/10" />
														)}
														<MatchCard match={match} isFinal={isFinal} />
													</div>
												))}
											</div>
										</div>

										{/* Connector column — empty header spacer + lines */}
										{!isFinal && (
											<div className="flex flex-col">
												<div className="mb-5 h-8" />
												<ConnectorColumn numPairs={numPairs} />
											</div>
										)}
									</div>
								);
							})}
						</div>
					)}
				</div>
			</div>
		</motion.section>
	);
}
