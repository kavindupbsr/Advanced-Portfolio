# Phase 2 — Part 1: Pre-flight Fixes & Design System Helpers

**Duration:** ~1-2 hours  
**Goal:** Fix wiring gaps left from Phase 1, then create shared utility files used by all components and pages.

---

## Where you are now

- All page routes exist but show placeholder text.
- Component stubs exist but most are incomplete.
- `src/lib/` and `src/content/` directories do NOT exist yet.
- The marketing layout has nav/footer inlined instead of using the component files.

## Execution order for all of Phase 2

```
Part 1: Pre-flight + lib/ utilities
Part 2: UI components build-out
Part 3: Module components
Part 4: Content data layer
Part 5: Core pages
Part 6: SEO, sitemap, robots
Part 7: Test updates
```

---

## Task 0: Pre-flight — Wire Navigation & Footer

### 0.1 — Update `src/components/layout/Navigation.tsx`

Replace the entire file:

```tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react'; // useEffect needed for scroll lock

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // WCAG AA: lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close menu automatically on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-content items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-lg font-bold tracking-tight text-foreground">
          Portfolio
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden items-center gap-6 text-sm md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? 'page' : undefined}
              className={`transition-colors hover:text-foreground ${
                pathname === link.href
                  ? 'font-semibold text-foreground'
                  : 'text-text-muted'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-strong"
          >
            Hire me
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="flex flex-col gap-1.5 p-2 md:hidden"
        >
          <span className={`block h-0.5 w-6 bg-foreground transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-0.5 w-6 bg-foreground transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-foreground transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav aria-label="Mobile navigation" className="border-t border-border px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block text-base font-medium text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
```

### 0.2 — Update `src/components/layout/Footer.tsx`

Replace the entire file:

```tsx
import Link from 'next/link';

const quickLinks = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

const socialLinks = [
  { href: 'https://github.com/yourusername', label: 'GitHub' },
  { href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
  { href: 'mailto:you@email.com', label: 'Email' },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface px-6 py-12">
      <div className="mx-auto max-w-content">
        <div className="mb-8 grid gap-8 sm:grid-cols-3">
          <div>
            <p className="mb-2 font-display text-lg font-bold text-foreground">Portfolio</p>
            <p className="text-sm text-text-muted">
              Designer & engineer building fast, accessible digital products.
            </p>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-text-muted">
              Links
            </p>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-text-muted hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-text-muted">
              Connect
            </p>
            <ul className="flex flex-col gap-2">
              {socialLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target={l.href.startsWith('http') ? '_blank' : undefined}
                    rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-sm text-text-muted hover:text-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 text-sm text-text-muted">
          {/* suppressHydrationWarning prevents React hydration mismatch on year boundary */}
          <p suppressHydrationWarning>© {new Date().getFullYear()} Portfolio. All rights reserved.</p>
          <Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
```

### 0.3 — Update `src/app/(marketing)/layout.tsx`

Replace the entire file to use the components:

```tsx
import type { ReactNode } from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navigation />
      <main className="mx-auto w-full max-w-content flex-1 px-6 py-12">{children}</main>
      <Footer />
    </>
  );
}
```

**Verify:** Run `npm run dev` — nav and footer should appear on all pages.

---

## Task 1: Create `src/lib/` utilities

Create the directory `src/lib/` with these 3 files.

### 1.1 — `src/lib/utils.ts`

```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function readingTime(body: string): string {
  const words = body.trim().split(/\s+/).length;
  const mins = Math.ceil(words / 200);
  return `${mins} min read`;
}
```

### 1.2 — `src/lib/seo.ts`

```ts
import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio.local';
const SITE_NAME = 'Portfolio';
const SITE_DESCRIPTION =
  'Designer & engineer building fast, accessible digital products.';

interface PageSEO {
  title: string;
  description?: string;
  path?: string;
  image?: string;
}

export function buildMetadata({ title, description, path, image }: PageSEO): Metadata {
  const url = path ? `${SITE_URL}${path}` : SITE_URL;
  const desc = description ?? SITE_DESCRIPTION;
  const ogImage = image ?? `${SITE_URL}/images/og-home.jpg`;

  return {
    title,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description: desc,
      url,
      siteName: SITE_NAME,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_NAME}`,
      description: desc,
    },
  };
}

export function buildArticleMetadata({
  title,
  description,
  path,
  image,
  publishedAt,
}: PageSEO & { publishedAt: string }): Metadata {
  const base = buildMetadata({ title, description, path, image });
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: 'article',
      publishedTime: publishedAt,
    },
  };
}
```

### 1.3 — `src/lib/analytics.ts`

```ts
// Plausible event tracking helper
// Usage: trackEvent('cta_click', { cta_text: 'See my work' })

type PlausibleFn = (event: string, options?: { props?: Record<string, string | number> }) => void;

declare global {
  interface Window {
    plausible?: PlausibleFn;
  }
}

export function trackEvent(event: string, props?: Record<string, string | number>) {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible(event, { props });
  }
}
```

---

## Task 2: Create `src/content/` data layer

> **Windows users:** create the directory first, then the files. Running `New-Item` on a path that doesn't exist will error.

```powershell
# PowerShell — run from the project root
New-Item -ItemType Directory -Path src\content -Force
```
```bash
# Or bash/WSL
mkdir -p src/content
```

### 2.1 — `src/content/projects.ts`

```ts
import type { ProjectCard } from '@/types';

export const projects: (ProjectCard & { slug: string; body: string })[] = [
  {
    slug: 'portfolio-website',
    title: 'Portfolio Website',
    description: 'Motion-rich personal portfolio built with Next.js, Tailwind CSS, and a custom design system.',
    image: '/images/projects/portfolio-hero.jpg',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    link: '/projects/portfolio-website',
    githubUrl: 'https://github.com/yourusername/portfolio',
    demoUrl: 'https://yourportfolio.vercel.app',
    featured: true,
    date: '2026',
    techStackDepth: 'fullstack',
    body: 'Built this portfolio using Next.js 15 App Router with a token-based design system...',
  },
  {
    slug: 'ecommerce-dashboard',
    title: 'E-Commerce Dashboard',
    description: 'Admin dashboard for managing products, orders and analytics with real-time updates.',
    image: '/images/projects/ecommerce-hero.jpg',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Chart.js'],
    link: '/projects/ecommerce-dashboard',
    githubUrl: 'https://github.com/yourusername/ecommerce-dashboard',
    featured: true,
    date: '2025',
    techStackDepth: 'fullstack',
    body: 'Designed and built a full-stack admin dashboard...',
  },
  {
    slug: 'task-management-app',
    title: 'Task Management App',
    description: 'Collaborative task manager with drag-and-drop boards, team workspaces, and deadline tracking.',
    image: '/images/projects/tasks-hero.jpg',
    tags: ['React', 'Firebase', 'Framer Motion'],
    link: '/projects/task-management-app',
    githubUrl: 'https://github.com/yourusername/task-app',
    demoUrl: 'https://task-app-demo.vercel.app',
    featured: true,
    date: '2025',
    techStackDepth: 'frontend',
    body: 'Built a Kanban-style task manager with smooth drag-and-drop...',
  },
];

export function getFeaturedProjects() {
  return projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs() {
  return projects.map((p) => ({ slug: p.slug }));
}
```

### 2.2 — `src/content/blog.ts`

```ts
import type { BlogPost } from '@/types';

export const blogPosts: (BlogPost & { slug: string })[] = [
  {
    slug: 'building-design-systems-nextjs',
    title: 'Building a Token-Based Design System with Next.js and Tailwind',
    excerpt: 'How I structured design tokens, CSS variables, and Tailwind config to create a consistent, maintainable design system.',
    body: '# Building a Token-Based Design System...\n\nStart with your color palette...',
    publishedAt: '2026-05-04',
    category: 'engineering',
    tags: ['nextjs', 'design-system', 'tailwind'],
    featured: true,
    image: '/images/blog/design-systems-cover.jpg',
  },
  {
    slug: 'performance-budget-portfolio',
    title: 'Enforcing a Performance Budget on a Portfolio Site',
    excerpt: 'Keeping the main JS bundle under 50KB while shipping a motion-rich portfolio — tools, decisions, and tradeoffs.',
    body: '# Enforcing a Performance Budget...\n\nPerformance is a feature...',
    publishedAt: '2026-04-28',
    category: 'engineering',
    tags: ['performance', 'lighthouse', 'nextjs'],
    featured: true,
    image: '/images/blog/performance-cover.jpg',
  },
  {
    slug: 'mixed-audience-ux-strategy',
    title: 'Designing for Mixed Audiences: Recruiters, Clients & Peers',
    excerpt: 'How layered messaging and audience-specific CTAs make a portfolio work for everyone without confusing anyone.',
    body: '# Designing for Mixed Audiences...\n\nA portfolio has three audiences...',
    publishedAt: '2026-04-20',
    category: 'design',
    tags: ['ux', 'strategy', 'portfolio'],
    featured: false,
    image: '/images/blog/ux-strategy-cover.jpg',
  },
];

export function getFeaturedPosts() {
  return blogPosts.filter((p) => p.featured).slice(0, 3);
}

export function getPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllPostSlugs() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}
```

---

## Verification after Part 1

```bash
npm run type-check   # Should pass — new lib files are typed
npm run lint         # Should pass — no new violations
npm run dev          # Nav and footer now appear on all pages
```

**Checklist:**
- [ ] `src/content/` directory created before adding files
- [ ] `Navigation.tsx` updated — shows About, Projects, Blog, Contact + Hire me button
- [ ] Navigation has `useEffect` scroll lock (body overflow hidden when menu open)
- [ ] Navigation closes automatically on route change
- [ ] Mobile hamburger toggle works (test at < 768px wide)
- [ ] `Footer.tsx` updated — shows quick links, social links, privacy link
- [ ] Footer copyright `<p>` has `suppressHydrationWarning`
- [ ] `MarketingLayout` uses components (no duplicate inline nav/footer)
- [ ] `src/lib/utils.ts` created
- [ ] `src/lib/seo.ts` created
- [ ] `src/lib/analytics.ts` created
- [ ] `src/content/projects.ts` created with 3 projects
- [ ] `src/content/blog.ts` created with 3 posts
- [ ] `npm run type-check` passes
- [ ] `npm run dev` — no console errors

> **Reminder — before running `npm run build` in Part 5:** You need a real 1200×630 JPEG at `public/images/og-home.jpg`. The root `layout.tsx` references this path for social sharing. Use any placeholder image renamed to `og-home.jpg` for now. Also create `public/images/projects/` and `public/images/blog/` folders with placeholder images matching the filenames in `src/content/projects.ts` and `src/content/blog.ts`.

---

**Next:** Part 2 covers UI component upgrades (Button, Badge, Card, Input, Heading, Text).
