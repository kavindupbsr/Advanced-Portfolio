import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

interface LinkProps extends NextLinkProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  children: ReactNode;
  variant?: 'default' | 'muted';
}

export function Link({ children, variant = 'default', className, ...props }: LinkProps) {
  const variantStyles = {
    default: 'text-primary hover:text-primary-strong',
    muted: 'text-text-muted hover:text-foreground',
  };

  return (
    <NextLink
      className={twMerge(clsx('transition-colors', variantStyles[variant], className))}
      {...props}
    >
      {children}
    </NextLink>
  );
}
