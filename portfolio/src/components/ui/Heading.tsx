import type { HTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
}

export function Heading({ level = 2, className, children, ...props }: HeadingProps) {
  const baseStyles = 'font-display font-bold tracking-tight text-foreground';
  const mergedClassName = twMerge(clsx(baseStyles, className));

  switch (level) {
    case 1:
      return (
        <h1 className={mergedClassName} {...props}>
          {children}
        </h1>
      );
    case 2:
      return (
        <h2 className={mergedClassName} {...props}>
          {children}
        </h2>
      );
    case 3:
      return (
        <h3 className={mergedClassName} {...props}>
          {children}
        </h3>
      );
    case 4:
      return (
        <h4 className={mergedClassName} {...props}>
          {children}
        </h4>
      );
    case 5:
      return (
        <h5 className={mergedClassName} {...props}>
          {children}
        </h5>
      );
    default:
      return (
        <h6 className={mergedClassName} {...props}>
          {children}
        </h6>
      );
  }
}
