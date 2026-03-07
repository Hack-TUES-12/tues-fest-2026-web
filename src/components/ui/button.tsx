import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
	"cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
	{
		variants: {
			variant: {
				default: 'bg-gradient-to-br from-primary to-primary-end text-primary-foreground shadow-xs hover:opacity-90',
				secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
				muted: 'bg-gradient-to-br from-muted to-muted-end text-background shadow-xs hover:opacity-90',
				accent: 'bg-accent text-accent-foreground shadow-xs hover:bg-accent/80',
				destructive:
					'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
				outline:
					'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
				ghost: 'hover:bg-foreground/30 hover:text-foreground',
				link: 'text-primary underline-offset-4 hover:underline',
				'default-secondary': 'bg-gradient-to-br from-primary/30 to-primary-end/30 border border-primary text-primary shadow-xs hover:opacity-90',
				'muted-secondary': 'bg-gradient-to-br from-muted/30 to-muted-end/30 border border-muted text-muted shadow-xs hover:opacity-90',
				'secondary-secondary': 'bg-gradient-to-br from-secondary/30 to-secondary-end/30 border border-secondary text-secondary shadow-xs hover:opacity-90',
				'accent-secondary': 'bg-gradient-to-br from-accent/30 to-accent/30 border border-accent text-accent shadow-xs hover:opacity-90',
			},
			size: {
				default: 'h-9 px-4 py-2 has-[>svg]:px-3',
				sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
				lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
				xl: 'h-12 rounded-md px-8 has-[>svg]:px-6',
				icon: 'size-9',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
);

function Button({
	className,
	variant,
	size,
	asChild = false,
	...props
}: React.ComponentProps<'button'> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	}) {
	const Comp = asChild ? Slot : 'button';

	return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
