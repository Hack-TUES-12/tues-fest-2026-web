export function ProjectContainer({ children }: { children: React.ReactNode }) {
	return (
		<div className="container mx-auto space-y-5 px-3 pb-5 pt-10">
			<img
				src="/decorations/purple-circle.svg"
				alt=""
				aria-hidden="true"
				className="pointer-events-none fixed left-0 top-0 min-w-lg w-[60vw] -translate-x-1/2 -translate-y-1/2 select-none"
				style={{ zIndex: -1 }}
			/>
				<img
				src="/decorations/purple-circle.svg"
				alt=""
				aria-hidden="true"
				className="pointer-events-none fixed bottom-0 right-0 min-w-sm w-[45vw] translate-x-1/2 translate-y-1/2 select-none"
				style={{ zIndex: -1 }}
			/>
			{children}
		</div>
	);
}
