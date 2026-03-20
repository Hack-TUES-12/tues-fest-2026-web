import Link from 'next/link';
import { TbArrowLeft, TbHome, TbMoodSad } from 'react-icons/tb';

import { Button } from '@/components/ui/button';

export default function NotFound() {
	return (
		<div className="relative flex min-h-[calc(100vh-var(--header-height))] w-full flex-col items-center justify-center overflow-hidden px-4 text-center">
			{/* Background decorations */}
			<img
				src="/decorations/purple-circle.svg"
				alt=""
				aria-hidden="true"
				className="pointer-events-none absolute left-1/2 top-1/2 w-[70vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 select-none opacity-40"
				style={{ zIndex: -1 }}
			/>

			{/* 404 number */}
			<p className="font-mighty select-none text-[clamp(8rem,22vw,18rem)] leading-none text-white/7">
				404
			</p>

			{/* Content — overlaid on the big number */}
			<div className="absolute flex flex-col items-center gap-5">
				<div className="flex size-14 items-center justify-center rounded-2xl border border-white/10 bg-card/60 backdrop-blur-sm">
					<TbMoodSad size={28} className="text-primary" />
				</div>

				<div className="space-y-2">
					<h1 className="font-title text-4xl text-white md:text-5xl">
						Страницата не е намерена
					</h1>
					<p className="max-w-sm text-base text-white/50 mx-auto">
						Изглежда сте се загубили. Страницата, която търсите, не съществува или е преместена.
					</p>
				</div>

				<div className="flex flex-wrap items-center justify-center gap-3">
					<Button asChild variant="default" size="lg" className="font-bold">
						<Link href="/">
							<TbHome size={18} />
							Начало
						</Link>
					</Button>
					<Button asChild variant="outline" size="lg">
						<Link href="/projects">
							<TbArrowLeft size={18} />
							Към проектите
						</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
