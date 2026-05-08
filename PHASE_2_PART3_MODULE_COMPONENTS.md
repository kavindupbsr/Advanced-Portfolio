# Phase 2 — Part 3: Module Components

**Goal:** Build the page-section components that compose your UI primitives into real content sections.

---

## Task 4: Module Components

### 4.1 — `src/components/modules/HeroSection.tsx` (replace)

```tsx
import { Button } from '@/components/ui/Button';

export function HeroSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-4xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary animate-fade-in">
          Product Designer & Engineer
        </p>
        <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl animate-slide-in-up">
          I design and build{' '}
          <span className="text-primary">fast, accessible</span>{' '}
          digital products.
        </h1>
        <p className="mb-10 max-w-2xl text-lg text-text-muted animate-slide-in-up">
          Blending design systems, frontend engineering, and content strategy to create
          experiences that work for every audience — recruiters, clients, and technical peers.
        </p>
        <div className="flex flex-wrap gap-4 animate-fade-in">
          <Button href="/projects" size="lg" variant="primary">
            See my work
          </Button>
          <Button href="/blog" size="lg" variant="secondary">
            Read my blog
          </Button>
          <Button href="/contact" size="lg" variant="ghost">
            Let&apos;s talk →
          </Button>
        </div>
      </div>
    </section>
  );
}
```

### 4.2 — `src/components/modules/ProjectCard.tsx` (replace)

```tsx
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import type { ProjectCard as ProjectCardType } from '@/types';

interface ProjectCardProps {
  project: ProjectCardType & { slug: string };
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card hover className="flex flex-col overflow-hidden p-0">
      <Link href={`/projects/${project.slug}`} className="group block">
        <div className="relative aspect-video overflow-hidden bg-surface">
          <Image
            src={project.image}
            alt={`${project.title} project screenshot`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-6">
          <h3 className="mb-2 font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="mb-4 text-sm text-text-muted leading-relaxed">{project.description}</p>
          <div className="mb-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
          {project.impact && (
            <p className="text-sm font-semibold text-primary">{project.impact}</p>
          )}
        </div>
      </Link>
      {(project.githubUrl || project.demoUrl) && (
        <div className="flex gap-3 border-t border-border px-6 py-4">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              className="text-xs font-medium text-text-muted hover:text-foreground transition-colors">
              GitHub →
            </a>
          )}
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
              className="text-xs font-medium text-text-muted hover:text-foreground transition-colors">
              Live Demo →
            </a>
          )}
        </div>
      )}
    </Card>
  );
}
```

### 4.3 — `src/components/modules/BlogPostCard.tsx` (replace)

```tsx
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { formatDate } from '@/lib/utils';
import type { BlogPost } from '@/types';

interface BlogPostCardProps {
  post: BlogPost & { slug: string };
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Card hover className="flex flex-col overflow-hidden p-0">
      <Link href={`/blog/${post.slug}`} className="group block">
        {post.image && (
          <div className="relative aspect-video overflow-hidden bg-surface">
            <Image
              src={post.image}
              alt={`Cover image for ${post.title}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <div className="p-6">
          <div className="mb-3 flex items-center gap-3">
            <Badge tone="muted">{post.category}</Badge>
            <span className="text-xs text-text-muted">{formatDate(post.publishedAt)}</span>
          </div>
          <h3 className="mb-2 font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
            {post.title}
          </h3>
          <p className="text-sm text-text-muted leading-relaxed">{post.excerpt}</p>
        </div>
      </Link>
    </Card>
  );
}
```

### 4.4 — `src/components/modules/FeaturedProjects.tsx` (NEW)

```tsx
import { getFeaturedProjects } from '@/content/projects';
import { ProjectCard } from './ProjectCard';
import { Button } from '@/components/ui/Button';

export function FeaturedProjects() {
  const projects = getFeaturedProjects();
  return (
    <section className="py-16">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="mb-1 text-sm font-semibold uppercase tracking-widest text-primary">
            Work
          </p>
          <h2 className="font-display text-3xl font-bold text-foreground">Recent Projects</h2>
        </div>
        <Button href="/projects" variant="ghost" size="sm">
          View all →
        </Button>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
```

### 4.5 — `src/components/modules/LatestBlogPosts.tsx` (NEW)

```tsx
import { getFeaturedPosts } from '@/content/blog';
import { BlogPostCard } from './BlogPostCard';
import { Button } from '@/components/ui/Button';

export function LatestBlogPosts() {
  const posts = getFeaturedPosts();
  return (
    <section className="py-16">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="mb-1 text-sm font-semibold uppercase tracking-widest text-primary">
            Writing
          </p>
          <h2 className="font-display text-3xl font-bold text-foreground">Latest Articles</h2>
        </div>
        <Button href="/blog" variant="ghost" size="sm">
          All posts →
        </Button>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
```

### 4.6 — `src/components/modules/ServicesSection.tsx` (NEW)

```tsx
const services = [
  {
    icon: '🎨',
    title: 'Product Design',
    description:
      'From user research to high-fidelity prototypes — I design digital products that are intuitive, accessible, and visually polished.',
  },
  {
    icon: '⚙️',
    title: 'Frontend Engineering',
    description:
      'Performant, accessible React/Next.js applications built with design-system discipline and test coverage from day one.',
  },
  {
    icon: '🔗',
    title: 'Full-Stack Development',
    description:
      'End-to-end solutions: API design, database modeling, cloud deployment, and everything in between.',
  },
];

export function ServicesSection() {
  return (
    <section className="py-16 border-y border-border bg-surface/50">
      <div className="mx-auto max-w-content px-6">
        <div className="mb-10 text-center">
          <p className="mb-1 text-sm font-semibold uppercase tracking-widest text-primary">
            Services
          </p>
          <h2 className="font-display text-3xl font-bold text-foreground">How I can help</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="text-center">
              <div className="mb-4 text-4xl">{s.icon}</div>
              <h3 className="mb-3 font-display text-xl font-bold text-foreground">{s.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### 4.7 — `src/components/modules/ContactForm.tsx` (replace)

```tsx
'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { trackEvent } from '@/lib/analytics';

interface FormData {
  name: string;
  email: string;
  message: string;
  projectType: string;
}

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

function validate(data: FormData): Errors {
  const errors: Errors = {};
  if (!data.name.trim()) errors.name = 'Name is required.';
  if (!data.email.trim()) errors.email = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = 'Enter a valid email address.';
  if (!data.message.trim()) errors.message = 'Message is required.';
  else if (data.message.trim().length < 20)
    errors.message = 'Message must be at least 20 characters.';
  return errors;
}

export function ContactForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>({
    name: '', email: '', message: '', projectType: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

  function handleChange(field: keyof FormData) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    if (!endpoint) { setServerError('Form endpoint not configured.'); return; }

    setLoading(true);
    setServerError('');
    trackEvent('contact_form_submit', { projectType: form.projectType || 'not_specified' });

    try {
      const res = await fetch(`https://formspree.io/f/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        router.push('/contact/success');
      } else {
        setServerError('Something went wrong. Please try again.');
      }
    } catch {
      setServerError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <Input id="name" label="Name" required placeholder="Your name"
        value={form.name} onChange={handleChange('name')} error={errors.name} />
      <Input id="email" label="Email" type="email" required placeholder="you@email.com"
        value={form.email} onChange={handleChange('email')} error={errors.email} />
      <div className="flex flex-col gap-1.5">
        <label htmlFor="projectType" className="text-sm font-medium text-foreground">
          Project type <span className="text-text-muted">(optional)</span>
        </label>
        <select id="projectType" value={form.projectType} onChange={handleChange('projectType')}
          className="w-full rounded-md border border-border bg-surface px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20">
          <option value="">Select a type</option>
          <option value="design">Design</option>
          <option value="development">Development</option>
          <option value="both">Design + Development</option>
          <option value="consulting">Consulting</option>
        </select>
      </div>
      <Textarea id="message" label="Message" required placeholder="Tell me about your project..."
        value={form.message} onChange={handleChange('message')} error={errors.message} />
      {serverError && (
        <p className="rounded-md bg-danger/10 px-4 py-3 text-sm text-danger" role="alert">
          {serverError}
        </p>
      )}
      <Button type="submit" size="lg" loading={loading} className="w-full sm:w-auto">
        Send message
      </Button>
    </form>
  );
}
```

### 4.8 — `src/components/modules/LoadingSkeleton.tsx` (replace)

```tsx
import { cn } from '@/lib/utils';

interface SkeletonProps { className?: string; }

function Skeleton({ className }: SkeletonProps) {
  return <div className={cn('animate-pulse rounded-md bg-border', className)} />;
}

export function ProjectCardSkeleton() {
  return (
    <div className="rounded-lg border border-border bg-surface overflow-hidden">
      <Skeleton className="aspect-video w-full" />
      <div className="p-6 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function BlogPostCardSkeleton() {
  return (
    <div className="rounded-lg border border-border bg-surface overflow-hidden">
      <Skeleton className="aspect-video w-full" />
      <div className="p-6 space-y-3">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );
}

// Generic inline skeleton
export function LoadingSkeleton({ className }: SkeletonProps) {
  return <Skeleton className={className} />;
}
```

---

## Verification after Part 3

```bash
npm run type-check   # Must pass
npm run dev          # All components importable, no runtime errors
```

**Checklist:**
- [ ] `HeroSection` — 3 CTAs, headline, animated fade-in
- [ ] `ProjectCard` — image, badges, GitHub/demo links
- [ ] `BlogPostCard` — image, category badge, date
- [ ] `FeaturedProjects` — imports from content/projects.ts, grid layout
- [ ] `LatestBlogPosts` — imports from content/blog.ts, grid layout
- [ ] `ServicesSection` — 3 service pillars
- [ ] `ContactForm` — full validation, Formspree submit, redirects to /contact/success
- [ ] `LoadingSkeleton` — ProjectCardSkeleton and BlogPostCardSkeleton exported
- [ ] `npm run type-check` passes

---

**Next:** Part 4 covers all core pages (Home, About, Contact, Projects, Blog, Privacy, 404).
