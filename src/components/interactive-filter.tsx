'use client';

import React from 'react';
import { useQueryState } from 'nuqs';
import invariant from 'tiny-invariant';

import { CategoryLinkText, FilterLinkList } from '@/components/filter-section';
import { SearchInput } from '@/components/ui/search-input';
import { Button } from './ui/button';
import { Card } from './ui/card';

export function InteractiveFilterLinkList({ current }: { current: CategoryLinkText | null }) {
	const [search] = useQueryState('search');

	return <FilterLinkList current={current} search={search} />;
}

export function InteractiveSearchInput() {
	const [search, setSearch] = useQueryState('search');

	return (
		<SearchInput
			value={search ?? ''}
			onChange={(e) => setSearch(e.target.value || null)}
			onBlur={(e) => setSearch(e.target.value.trim() || null)}
		/>
	);
}

/** Plain object so RSC → client serialization works; avoids importing the multi‑MB `adapter` chunk for search. */
export function InteractiveFilteredProjects({
	children,
	ordererdProjectIds,
	titlesByProjectId,
}: {
	children: React.ReactNode;
	ordererdProjectIds: number[];
	titlesByProjectId: Readonly<Record<string, string>>;
}) {
	const [search, setSearch] = useQueryState('search');

	if (!search) return children;

	const childrenCount = React.Children.count(children);
	invariant(
		childrenCount === ordererdProjectIds.length,
		`[InteractiveProjectList] Number of children must match number of ordered project ids passed. Expected ${childrenCount}, got ${ordererdProjectIds.length}`
	);

	const q = search.toLowerCase();

	const filteredChildren = React.Children.toArray(children)
		.map((child, index) => {
			const id = ordererdProjectIds[index]!;
			const title = titlesByProjectId[String(id)];
			invariant(title !== undefined, `[InteractiveProjectList] Project with id ${id} has no title in titlesByProjectId`);
			return { child, id, title };
		})
		.sort((a, b) => a.id - b.id)
		.filter(({ title }) => title.toLowerCase().includes(q))
		.map(({ child }) => child);

	if (filteredChildren.length === 0) {
		return (
			<Card className="p-10 h-full text-center md:col-span-2 lg:col-span-3">
				<h3 className="text-2xl font-bold">Няма намерени проекти</h3>
				<p className="text-muted-foreground text-lg">
					Не успяхме да намерим проекти, съответстващи на вашето търсене.
				</p>
				{search && (
					<Button onClick={() => setSearch(null)} variant="outline" className="mx-auto w-fit">
						Изчисти търсенето
					</Button>
				)}
			</Card>
		);
	}

	return filteredChildren;
}
