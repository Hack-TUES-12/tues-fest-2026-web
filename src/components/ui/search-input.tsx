'use client';

import { useEffect, useRef } from 'react';
import { Search } from 'lucide-react';

import { Input } from './input';

// TODO: maybe support passing ref?
export function SearchInput(props: Exclude<React.ComponentProps<typeof Input>, 'ref'>) {
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const controller = new AbortController();

		document.addEventListener(
			'keydown',
			(e: KeyboardEvent) => {
				const isCtrlF = (e.ctrlKey || e.metaKey) && e.key === 'f';
				const isSlash = e.key === '/';

				if ((isCtrlF || isSlash) && document.activeElement !== inputRef.current && !props.disabled) {
					e.preventDefault();
					inputRef.current?.focus();
				}
			},
			{ signal: controller.signal }
		);

		return () => controller.abort();
	}, []);

	return (
		<div className="grow-1 relative flex items-center lg:max-w-lg">
			<Input
				{...props}
				ref={inputRef}
				className="h-10 rounded-full border-white/10 bg-white/5 pl-9 tracking-wide placeholder:text-white/30 focus-visible:border-white/25 focus-visible:ring-0"
				placeholder="Търси сред проектите..."
			/>
			<Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 select-none opacity-40" />
		</div>
	);
}
