# Phase 2 — Part 2: UI Component Build-Out

**Goal:** Upgrade existing component stubs to production-quality versions using design tokens only.  
**Note:** Most UI components already exist as stubs. This part replaces them with full implementations.

---

## Task 3: Upgrade UI Components

### 3.1 — `src/components/ui/Button.tsx` (replace)

Adds `ghost` variant, `loading` state, `href` prop for link-buttons:

```tsx
'use client';

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  href?: string;
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, href, children, className, disabled, ...props }, ref) => {
    const base = cn(
      'inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-all',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      {
        'bg-primary text-white hover:bg-primary-strong active:scale-[0.98]': variant === 'primary',
        'bg-surface text-foreground border border-border hover:bg-accent-soft': variant === 'secondary',
        'bg-transparent text-primary hover:bg-accent-soft': variant === 'ghost',
        'border border-primary text-primary hover:bg-accent-soft': variant === 'outline',
        'px-3 py-2 text-sm': size === 'sm',
        'px-5 py-2.5 text-base': size === 'md',
        'px-7 py-3.5 text-lg': size === 'lg',
      },
      className
    );

    if (href) {
      return (
        <Link href={href} className={base}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={base} disabled={disabled || loading} {...props}>
        {loading && (
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
```

### 3.2 — `src/components/ui/Badge.tsx` (replace)

```tsx
import { cn } from '@/lib/utils';
import type { HTMLAttributes, ReactNode } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  tone?: 'default' | 'accent' | 'success' | 'muted';
}

export function Badge({ children, tone = 'default', className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        {
          'bg-accent-soft text-foreground': tone === 'default',
          'bg-primary text-white': tone === 'accent',
          'bg-success/10 text-success': tone === 'success',
          'bg-surface text-text-muted': tone === 'muted',
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
```

### 3.3 — `src/components/ui/Card.tsx` (replace)

Adds hover lift effect and keyboard focus-within ring:

```tsx
import { cn } from '@/lib/utils';
import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
}

export function Card({ children, hover = false, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-border bg-surface p-6 shadow-soft',
        hover && 'transition-all duration-200 hover:-translate-y-1 hover:shadow-medium focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
```

### 3.4 — `src/components/ui/Input.tsx` (replace)

Adds label, error state, textarea support:

```tsx
import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  id: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-foreground">
            {label}
            {props.required && <span className="ml-1 text-danger">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            'w-full rounded-md border bg-surface px-4 py-3 text-foreground outline-none transition',
            'focus:border-primary focus:ring-2 focus:ring-primary/20',
            error ? 'border-danger focus:ring-danger/20' : 'border-border',
            className
          )}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${id}-error`} className="text-xs text-danger" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';
```

### 3.5 — `src/components/ui/Textarea.tsx` (NEW file)

```tsx
import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  id: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, id, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-foreground">
            {label}
            {props.required && <span className="ml-1 text-danger">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          className={cn(
            'w-full rounded-md border bg-surface px-4 py-3 text-foreground outline-none transition',
            'focus:border-primary focus:ring-2 focus:ring-primary/20 resize-y min-h-[120px]',
            error ? 'border-danger' : 'border-border',
            className
          )}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${id}-error`} className="text-xs text-danger" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';
```

### 3.6 — `src/components/ui/Heading.tsx` — already good, minor touch

The existing Heading is fine. Add `as` prop alias to match design system spec:

```tsx
import type { HTMLAttributes, ReactNode, ElementType } from 'react';
import { cn } from '@/lib/utils';

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4;
  as?: ElementType;
  children: ReactNode;
}

export function Heading({ level = 2, as, className, children, ...props }: HeadingProps) {
  const Tag = (as ?? `h${level}`) as ElementType;
  return (
    <Tag
      className={cn('font-display font-bold tracking-tight text-foreground', className)}
      {...props}
    >
      {children}
    </Tag>
  );
}
```

### 3.7 — `src/components/ui/Text.tsx` — already good, no change needed

The existing `Text` component is sufficient. Move on.

### 3.8 — `src/components/layout/SectionContainer.tsx` — add `as` prop

```tsx
import type { HTMLAttributes, ReactNode, ElementType } from 'react';
import { cn } from '@/lib/utils';

interface SectionContainerProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: ElementType;
}

export function SectionContainer({ children, as: Tag = 'section', className, ...props }: SectionContainerProps) {
  return (
    <Tag className={cn('py-16', className)} {...props}>
      <div className="mx-auto w-full max-w-content px-6">{children}</div>
    </Tag>
  );
}
```

---

## Verification after Part 2

```bash
npm run type-check   # Must pass
npm run test         # Existing 10 unit tests must still pass
npm run lint         # Must pass
```

**Checklist:**
- [ ] `Button` — has primary/secondary/ghost/outline variants, loading state, href prop
- [ ] `Badge` — has default/accent/success/muted tones  
- [ ] `Card` — has `hover` prop with lift animation
- [ ] `Input` — has label, error state, aria attributes
- [ ] `Textarea` — new file created
- [ ] `Heading` — has `as` prop alias
- [ ] `SectionContainer` — has `as` prop and vertical padding
- [ ] All type-check and tests pass

---

**Next:** Part 3 covers module components (HeroSection, ProjectCard, BlogPostCard, ContactForm, and 3 new home sections).
