import { api } from '@/lib/trpc/server';

export const dynamic = 'force-dynamic';

type Participant = {
	id: number;
	name: string;
	seed: number;
	score: number | null;
} | null;

function MatchRow({ participant, isWinner }: { participant: Participant; isWinner: boolean }) {
	const name = participant?.name ?? 'TBD';
	const seed = participant?.seed;
	const score = participant?.score ?? '–';

	return (
		<div style={{ fontWeight: isWinner ? 'bold' : 'normal', padding: '4px 0' }}>
			{seed !== undefined && <span style={{ marginRight: 8, opacity: 0.6 }}>{seed}</span>}
			<span style={{ marginRight: 16 }}>{name}</span>
			<span>{score}</span>
		</div>
	);
}

export default async function BattlebotLivePage() {
	const rounds = await api.tournament.getBracket();

	return (
		<main style={{ padding: '2rem', fontFamily: 'monospace' }}>
			<h1>Battle Bots — На живо</h1>
			<div style={{ display: 'flex', gap: '3rem', overflowX: 'auto', marginTop: '2rem' }}>
				{rounds.map((round) => (
					<div key={round.label} style={{ minWidth: 220 }}>
						<h2 style={{ marginBottom: '1rem' }}>{round.label}</h2>
						{round.matches.map((match) => (
							<div
								key={match.id}
								style={{
									border: '1px solid #ccc',
									borderRadius: 4,
									padding: '0.5rem 0.75rem',
									marginBottom: '1rem',
								}}
							>
								<MatchRow
									participant={match.player1}
									isWinner={match.winnerId !== null && match.winnerId === match.player1?.id}
								/>
								<hr style={{ margin: '4px 0', opacity: 0.3 }} />
								<MatchRow
									participant={match.player2}
									isWinner={match.winnerId !== null && match.winnerId === match.player2?.id}
								/>
							</div>
						))}
					</div>
				))}
			</div>
		</main>
	);
}
