# Phase 2 — Part 4: Core Pages

**Goal:** Replace all placeholder pages with real content, proper metadata, and SEO structure.

> **Install before starting this part:**
> ```bash
> npm install react-markdown
> ```
> This is required for rendering the markdown `body` strings in project and blog detail pages. Without it, content like `# Heading` renders as raw characters.

---

## Task 5: Core Pages

### 5.1 — Home Page: `src/app/(marketing)/page.tsx`

```tsx
import type { Metadata } from 'next';
import { HeroSection } from '@/components/modules/HeroSection';
import { FeaturedProjects } from '@/components/modules/FeaturedProjects';
import { ServicesSection } from '@/components/modules/ServicesSection';
import { LatestBlogPosts } from '@/components/modules/LatestBlogPosts';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Designer & engineer building fast, accessible digital products. See my work, read my writing, and get in touch.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProjects />
      <ServicesSection />
      <LatestBlogPosts />

      {/* Final CTA Section */}
      <section className="py-20 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
          Let&apos;s work together
        </p>
        <h2 className="mb-4 font-display text-3xl font-bold text-foreground">
          Ready to build something great?
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-text-muted">
          I&apos;m available for freelance projects, full-time roles, and consulting. 
          Drop me a message and let&apos;s talk.
        </p>
        <Button href="/contact" size="lg">
          Get in touch →
        </Button>
      </section>
    </>
  );
}
```

### 5.2 — About Page: `src/app/(marketing)/about/page.tsx`

```tsx
import type { Metadata } from 'next';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'About',
  description: 'Learn more about my background, skills, values, and approach to building digital products.',
  path: '/about',
});

const skills = {
  Design: ['Figma', 'Design Systems', 'User Research', 'Prototyping', 'Accessibility'],
  Frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  Backend: ['Node.js', 'PostgreSQL', 'REST APIs', 'GraphQL', 'Vercel / AWS'],
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl">
      {/* Page header */}
      <div className="mb-12">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
          About me
        </p>
        <h1 className="mb-4 font-display text-4xl font-bold text-foreground">
          I build things people actually enjoy using.
        </h1>
        <p className="text-lg text-text-muted leading-relaxed">
          I&apos;m a product designer and frontend engineer with a passion for creating 
          experiences that are fast, accessible, and beautifully crafted. I care about 
          the intersection of design and engineering — where a great idea meets a 
          solid implementation.
        </p>
      </div>

      {/* Story */}
      <section className="mb-12 space-y-4 text-text-muted leading-relaxed">
        <h2 className="font-display text-2xl font-bold text-foreground">My story</h2>
        <p>
          I started in design — sketching interfaces, thinking about user flows, 
          and learning how people interact with software. Then I discovered that 
          actually building what I designed was just as creative. That led me down 
          the path of frontend engineering, and eventually full-stack development.
        </p>
        <p>
          Today I work at the intersection of both worlds. I can take a project from 
          concept to deployed product — designing systems that scale, engineering 
          components that are accessible by default, and shipping experiences that 
          hold up under real-world conditions.
        </p>
        <p>
          I care deeply about performance (fast sites are respectful sites), 
          accessibility (the web is for everyone), and maintainability 
          (future-you will thank present-you for writing good code).
        </p>
      </section>

      {/* Skills */}
      <section className="mb-12">
        <h2 className="mb-6 font-display text-2xl font-bold text-foreground">Skills</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category}>
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
                {category}
              </p>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-xl border border-border bg-surface p-8">
        <h2 className="mb-2 font-display text-2xl font-bold text-foreground">
          Want to work together?
        </h2>
        <p className="mb-6 text-text-muted">
          I&apos;m open to freelance projects, full-time roles, and interesting collaborations.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button href="/contact">Get in touch</Button>
          <Button href="/projects" variant="secondary">See my work</Button>
        </div>
      </section>
    </div>
  );
}
```

### 5.3 — Contact Page: `src/app/(marketing)/contact/page.tsx`

```tsx
import type { Metadata } from 'next';
import { ContactForm } from '@/components/modules/ContactForm';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Contact',
  description: 'Get in touch to discuss projects, roles, or collaborations.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-10">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
          Contact
        </p>
        <h1 className="mb-3 font-display text-4xl font-bold text-foreground">
          Let&apos;s build something together.
        </h1>
        <p className="text-lg text-text-muted">
          Fill out the form and I&apos;ll get back to you within 48 hours.
        </p>
      </div>
      <div className="grid gap-12 md:grid-cols-[2fr_1fr]">
        <ContactForm />
        <aside className="space-y-6">
          <div>
            <p className="mb-1 text-sm font-semibold text-foreground">Email</p>
            <a href="mailto:you@email.com" className="text-sm text-text-muted hover:text-foreground">
              you@email.com
            </a>
          </div>
          <div>
            <p className="mb-1 text-sm font-semibold text-foreground">GitHub</p>
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer"
              className="text-sm text-text-muted hover:text-foreground">
              github.com/yourusername
            </a>
          </div>
          <div>
            <p className="mb-1 text-sm font-semibold text-foreground">LinkedIn</p>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer"
              className="text-sm text-text-muted hover:text-foreground">
              linkedin.com/in/yourusername
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
```

### 5.4 — Contact Success Page: `src/app/(marketing)/contact/success/page.tsx`

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Message Sent',
  description: 'Thanks for reaching out. I will be in touch within 48 hours.',
};

export default function ContactSuccessPage() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-6 py-20">
      <div className="mx-auto max-w-xl text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-3xl">
          ✓
        </div>
        <h1 className="mb-3 font-display text-3xl font-bold text-foreground">
          Thanks for reaching out!
        </h1>
        <p className="mb-8 text-lg text-text-muted">
          I&apos;ll review your message and get back to you within 48 hours.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/blog"
            className="rounded-md bg-primary px-5 py-2.5 font-semibold text-white transition hover:bg-primary-strong">
            Read my latest writing
          </Link>
          <Link href="/projects"
            className="rounded-md border border-border px-5 py-2.5 font-semibold text-foreground transition hover:bg-surface">
            See my recent work
          </Link>
          <Link href="/"
            className="px-5 py-2.5 text-sm text-text-muted transition hover:text-foreground">
            Go back home
          </Link>
        </div>
      </div>
    </main>
  );
}
```

### 5.5 — Projects Listing: `src/app/(marketing)/projects/page.tsx`

```tsx
import type { Metadata } from 'next';
import { projects } from '@/content/projects';
import { ProjectCard } from '@/components/modules/ProjectCard';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Projects',
  description: 'Browse my recent product design and engineering projects.',
  path: '/projects',
});

export default function ProjectsPage() {
  return (
    <div>
      <div className="mb-12">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
          Work
        </p>
        <h1 className="mb-3 font-display text-4xl font-bold text-foreground">Projects</h1>
        <p className="max-w-xl text-lg text-text-muted">
          A selection of things I&apos;ve designed and built.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
```

### 5.6 — Project Detail: `src/app/(marketing)/projects/[slug]/page.tsx`

```tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProjectBySlug, getAllProjectSlugs } from '@/content/projects';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export async function generateStaticParams() {
  return getAllProjectSlugs();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    openGraph: { images: [project.image] },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-3xl">
      <Link href="/projects" className="mb-8 inline-block text-sm text-text-muted hover:text-foreground">
        ← Back to projects
      </Link>
      <div className="relative mb-8 aspect-video overflow-hidden rounded-xl">
        <Image src={project.image} alt={project.title} fill className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px" priority />
      </div>
      <div className="mb-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
      </div>
      <h1 className="mb-3 font-display text-4xl font-bold text-foreground">{project.title}</h1>
      <p className="mb-8 text-lg text-text-muted">{project.description}</p>
import Markdown from 'react-markdown';

// ...inside the component JSX, replace the raw body div...
      <div className="prose mb-10 max-w-none text-text-muted leading-relaxed">
        <Markdown>{project.body}</Markdown>
      </div>
      <div className="flex gap-3">
        {project.githubUrl && <Button href={project.githubUrl} variant="secondary">GitHub →</Button>}
        {project.demoUrl && <Button href={project.demoUrl}>Live Demo →</Button>}
      </div>
    </article>
  );
}
```

### 5.7 — Blog Listing: `src/app/(marketing)/blog/page.tsx`

```tsx
import type { Metadata } from 'next';
import { blogPosts } from '@/content/blog';
import { BlogPostCard } from '@/components/modules/BlogPostCard';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Blog',
  description: 'Articles on product design, frontend engineering, and UX.',
  path: '/blog',
});

export default function BlogPage() {
  return (
    <div>
      <div className="mb-12">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
          Writing
        </p>
        <h1 className="mb-3 font-display text-4xl font-bold text-foreground">Blog</h1>
        <p className="max-w-xl text-lg text-text-muted">
          Thoughts on design, engineering, and building things that matter.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
```

### 5.8 — Blog Post Detail: `src/app/(marketing)/blog/[slug]/page.tsx`

```tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getAllPostSlugs } from '@/content/blog';
import { Badge } from '@/components/ui/Badge';
import { formatDate, readingTime } from '@/lib/utils';
import { buildArticleMetadata } from '@/lib/seo';

export async function generateStaticParams() {
  return getAllPostSlugs();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return buildArticleMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
    image: post.image,
    publishedAt: post.publishedAt,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-2xl">
      <Link href="/blog" className="mb-8 inline-block text-sm text-text-muted hover:text-foreground">
        ← Back to blog
      </Link>
      <div className="mb-4 flex items-center gap-3">
        <Badge tone="muted">{post.category}</Badge>
        <span className="text-xs text-text-muted">{formatDate(post.publishedAt)}</span>
        <span className="text-xs text-text-muted">{readingTime(post.body)}</span>
      </div>
      <h1 className="mb-4 font-display text-4xl font-bold text-foreground leading-tight">
        {post.title}
      </h1>
      <p className="mb-10 text-lg text-text-muted">{post.excerpt}</p>
import Markdown from 'react-markdown';

// ...inside the component JSX...
      <div className="prose max-w-none text-text-muted leading-relaxed">
        <Markdown>{post.body}</Markdown>
      </div>
    </article>
  );
}
```

### 5.9 — Privacy Page: `src/app/(marketing)/privacy/page.tsx`

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy and analytics disclosure for this portfolio site.',
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl prose text-text-muted">
      <h1 className="text-foreground">Privacy Policy</h1>
      <p>Last updated: May 2026</p>

      <h2 className="text-foreground">Analytics</h2>
      <p>
        This site uses <a href="https://plausible.io" target="_blank" rel="noopener noreferrer">
        Plausible Analytics</a> — a privacy-first analytics tool. No cookies are set. 
        No personal data is collected or sold. It is fully GDPR compliant.
      </p>
      <p>What is tracked: page views, traffic sources, and anonymised event interactions (button clicks, form views).</p>
      <p>What is NOT tracked: names, emails, IP addresses, cross-site behaviour.</p>

      <h2 className="text-foreground">Contact Form</h2>
      <p>
        When you submit the contact form, your name, email, and message are sent to 
        Formspree for delivery. Data is not shared with third parties beyond message delivery.
      </p>

      <h2 className="text-foreground">Contact</h2>
      <p>Questions? Email: <a href="mailto:you@email.com">you@email.com</a></p>
    </div>
  );
}
```

---

## Verification after Part 4

```bash
npm run build    # All 12+ routes must prerender without error
npm run type-check
npm run dev
```

**Manual checks:**
- [ ] `npm install react-markdown` has been run
- [ ] `/` — hero, projects grid, services, blog posts, CTA section all visible
- [ ] `/about` — bio, skills, CTA section visible
- [ ] `/contact` — form visible, sidebar with social links
- [ ] `/contact/success` — checkmark, 3 CTAs
- [ ] `/projects` — grid of all projects
- [ ] `/projects/portfolio-website` — detail page loads, body renders as formatted HTML (not raw `#` symbols)
- [ ] `/blog` — grid of all posts
- [ ] `/blog/building-design-systems-nextjs` — post page loads, body renders as formatted HTML
- [ ] `/privacy` — content visible
- [ ] All nav links work in desktop and mobile
- [ ] `npm run build` succeeds

---

**Next:** Part 5 covers SEO (sitemap, robots.txt, JSON-LD) and test updates.
