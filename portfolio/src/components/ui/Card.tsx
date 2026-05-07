import type { HTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={twMerge(
        clsx('rounded-lg border border-border bg-surface p-6 shadow-soft', className)
      )}
      {...props}
    >
      {children}
    </div>
  );
}
