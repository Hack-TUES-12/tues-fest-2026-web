import { Contributor } from '@/app/projects/[projectId]/page';

const Contributors = ({ contributors }: { contributors: readonly Contributor[] }) => (
	<div className="rounded-2xl border border-white/10 bg-card/50 p-6 backdrop-blur-sm md:p-8">
		<p className="mb-4 text-xs font-medium uppercase tracking-widest text-white/40">
			{contributors.length > 1 ? 'Автори' : 'Автор'}
		</p>
		<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
			{contributors.map((creator) => (
				<div
					key={creator?.name}
					className="flex flex-col gap-0.5 rounded-xl border border-white/10 bg-white/5 px-5 py-4 transition-colors duration-200 hover:bg-white/10"
				>
					<span className="font-semibold text-white">{creator?.name}</span>
					<span className="text-sm text-white/50">от {creator?.class} клас</span>
				</div>
			))}
		</div>
	</div>
);

export default Contributors;
