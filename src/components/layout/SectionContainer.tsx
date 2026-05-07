import type { HTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

interface SectionContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function SectionContainer({ children, className, ...props }: SectionContainerProps) {
  return (
    <div className={twMerge(clsx('mx-auto w-full max-w-content px-6', className))} {...props}>
      {children}
    </div>
  );
}
