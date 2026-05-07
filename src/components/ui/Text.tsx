import type { HTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  as?: 'p' | 'span';
  children: ReactNode;
}

export function Text({ as = 'p', className, children, ...props }: TextProps) {
  const Tag = as;

  return (
    <Tag className={twMerge(clsx('text-text-muted leading-relaxed', className))} {...props}>
      {children}
    </Tag>
  );
}
