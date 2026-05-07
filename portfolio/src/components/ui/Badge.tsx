import type { HTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  tone?: 'default' | 'accent' | 'muted';
}

export function Badge({ children, tone = 'default', className, ...props }: BadgeProps) {
  const tones = {
    default: 'bg-accent-soft text-foreground',
    accent: 'bg-primary text-white',
    muted: 'bg-surface text-text-muted',
  };

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium',
          tones[tone],
          className
        )
      )}
      {...props}
    >
      {children}
    </span>
  );
}
