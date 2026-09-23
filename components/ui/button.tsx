import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] select-none',
  {
    variants: {
      variant: {
        primary:
          'bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] shadow-xs rounded-md border border-[var(--primary-hover)]',
        brass:
          'bg-[var(--surface-brass)] text-[var(--ink)] hover:bg-[#ded1b5] border border-[var(--line-strong)] rounded-md font-semibold',
        outline:
          'border border-[var(--line-strong)] bg-[var(--surface)] text-[var(--ink)] hover:bg-[var(--surface-raised)] rounded-md',
        ghost:
          'hover:bg-[var(--surface-raised)] text-[var(--ink-soft)] hover:text-[var(--ink)] rounded-md',
        dock:
          'bg-[var(--surface)] border border-[var(--line-strong)] text-[var(--ink)] hover:border-[var(--primary)] shadow-xs rounded-md min-h-[44px]',
      },
      size: {
        default: 'h-10 px-4 py-2 min-h-[40px]',
        sm: 'h-9 px-3 text-xs min-h-[36px]',
        lg: 'h-12 px-6 text-base min-h-[44px]',
        icon: 'h-10 w-10 min-h-[40px] min-w-[40px] p-0',
        dockItem: 'h-11 px-3 py-2 text-xs min-h-[44px] flex-1',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
