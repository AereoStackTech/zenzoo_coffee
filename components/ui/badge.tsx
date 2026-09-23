import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--focus)] focus:ring-offset-1',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--surface-raised)] text-[var(--ink)] border border-[var(--line-strong)] rounded-md',
        primary:
          'bg-[var(--primary)] text-white border border-[var(--primary-hover)] rounded-md shadow-xs',
        live:
          'bg-[var(--live-bg)] text-[var(--live-green)] border border-[var(--live-green)]/30 rounded-md',
        brass:
          'bg-[var(--surface-brass)]/40 text-[var(--primary)] border border-[var(--surface-brass)] rounded-md',
        outline:
          'border border-[var(--line)] text-[var(--ink-muted)] bg-transparent rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
