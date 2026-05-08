# Phase 2 — Part 5: SEO, Sitemap, Robots & Tests

**Goal:** Add sitemap generation, robots.txt, JSON-LD structured data, and update tests.

---

## Task 6: SEO Files

### 6.1 — `src/app/sitemap.ts` (NEW file)

Next.js App Router generates `/sitemap.xml` automatically from this file:

```ts
import type { MetadataRoute } from 'next';
import { getAllProjectSlugs } from '@/content/projects';
import { getAllPostSlugs } from '@/content/blog';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio.local';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/projects`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = getAllProjectSlugs().map(({ slug }) => ({
    url: `${SITE_URL}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = getAllPostSlugs().map(({ slug }) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
```

### 6.2 — `src/app/robots.ts` (NEW file)

Generates `/robots.txt`:

```ts
import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio.local';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
```

### 6.3 — JSON-LD Schema in Root Layout

Open `src/app/layout.tsx` and add a JSON-LD script **inside** `<body>` before `{children}`:

```tsx
// Add this INSIDE the <body> tag, before {children}
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Your Name',
      url: SITE_URL,
      jobTitle: 'Product Designer & Engineer',
      description: 'Building fast, accessible digital products.',
      sameAs: [
        'https://github.com/yourusername',
        'https://linkedin.com/in/yourusername',
      ],
    }),
  }}
/>
```

**Verify sitemap and robots work:**
```bash
npm run build
npm run start
# Visit: http://localhost:3000/sitemap.xml
# Visit: http://localhost:3000/robots.txt
```

---

## Task 7: Update Tests

### 7.1 — Install missing test dependency (if needed)

Check if `@vitejs/plugin-react` is in devDependencies:

```bash
# Only run this if vitest tests fail with "React is not defined"
npm install -D @vitejs/plugin-react
```

Then update `vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    coverage: { provider: 'v8', reporter: ['text', 'lcov'] },
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
});
```

Create `tests/setup.ts` if it doesn't exist:

```ts
import '@testing-library/jest-dom';
```

### 7.2 — Unit test for HeroSection: `tests/unit/HeroSection.test.tsx`

```tsx
import { render, screen } from '@testing-library/react';
import { HeroSection } from '@/components/modules/HeroSection';
import { describe, it, expect } from 'vitest';

describe('HeroSection', () => {
  it('renders a single h1 heading', () => {
    render(<HeroSection />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it('renders 3 CTA links', () => {
    render(<HeroSection />);
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThanOrEqual(3);
  });
});
```

### 7.3 — Unit test for ContactForm validation: `tests/unit/ContactForm.test.tsx`

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ContactForm } from '@/components/modules/ContactForm';
import { describe, it, expect } from 'vitest';

// Mock next/navigation
vi.mock('next/navigation', () => ({ useRouter: () => ({ push: vi.fn() }) }));

describe('ContactForm', () => {
  it('shows error when name is empty on submit', async () => {
    render(<ContactForm />);
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
  });

  it('shows error for invalid email', async () => {
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'notanemail' } });
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    expect(await screen.findByText(/valid email/i)).toBeInTheDocument();
  });
});
```

### 7.4 — Update E2E test: `tests/e2e/smoke.spec.ts`

```ts
import { test, expect } from '@playwright/test';

test('homepage loads all key sections', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByText('Recent Projects')).toBeVisible();
  await expect(page.getByText('How I can help')).toBeVisible();
  await expect(page.getByText('Latest Articles')).toBeVisible();
});

test('navigation links work', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Projects' }).click();
  await expect(page).toHaveURL('/projects');
  await expect(page.getByRole('heading', { level: 1, name: 'Projects' })).toBeVisible();
});

test('contact form shows validation errors', async ({ page }) => {
  await page.goto('/contact');
  await page.getByRole('button', { name: /send message/i }).click();
  await expect(page.getByText(/name is required/i)).toBeVisible();
});

test('404 page works', async ({ page }) => {
  await page.goto('/this-page-does-not-exist');
  await expect(page.getByRole('heading', { name: /not found/i })).toBeVisible();
});

test('blog page lists posts', async ({ page }) => {
  await page.goto('/blog');
  await expect(page.getByRole('heading', { level: 1, name: 'Blog' })).toBeVisible();
});
```

---

## Task 8: Add OG Image & Asset Placeholders (Required before build)

The root `layout.tsx` references `/images/og-home.jpg` for social sharing. If this file is missing, the build still succeeds but social previews will break on every social platform.

**Step 1 — Create the folder structure:**
```powershell
# PowerShell
New-Item -ItemType Directory -Path public\images\projects -Force
New-Item -ItemType Directory -Path public\images\blog -Force
```

**Step 2 — Add placeholder images:**
- Place any 1200×630 JPEG at `public/images/og-home.jpg`
- Place any JPEG at `public/images/projects/portfolio-hero.jpg`
- Place any JPEG at `public/images/projects/ecommerce-hero.jpg`
- Place any JPEG at `public/images/projects/tasks-hero.jpg`
- Place any JPEG at `public/images/blog/design-systems-cover.jpg`
- Place any JPEG at `public/images/blog/performance-cover.jpg`
- Place any JPEG at `public/images/blog/ux-strategy-cover.jpg`

> You can copy a single placeholder JPEG and rename it for all of the above. Real images come in Phase 7.

**Step 3 — Set `NEXT_PUBLIC_SITE_URL` in Vercel (Critical for SEO):**

Both `sitemap.ts` and `seo.ts` fall back to `https://portfolio.local` if this variable is unset. Google will refuse to index a site whose sitemap lists `portfolio.local` as the canonical domain.

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add: `NEXT_PUBLIC_SITE_URL` = `https://your-real-domain.vercel.app` (Production environment)
3. Redeploy after saving

**Verify after deploy:**
```
https://your-domain.vercel.app/sitemap.xml
# All URLs must show your real domain, not portfolio.local
```

---

## Final Phase 2 Verification

Run all checks in order:

```bash
# 1. Type safety
npm run type-check

# 2. Code quality
npm run lint
npm run format:check

# 3. Unit tests
npm run test

# 4. Production build (most important)
npm run build

# 5. E2E tests (start dev server first in separate terminal)
npm run dev
# In another terminal:
npm run test:e2e
```

### Lighthouse check (Phase 2 gating criteria)

After `npm run build && npm run start`:
1. Open Chrome → DevTools → Lighthouse tab
2. Run audit on `http://localhost:3000`
3. All categories must score **> 80**

---

## Phase 2 Final Checklist

### Pre-flight
- [ ] Navigation has About, Projects, Blog, Contact, Hire me CTA
- [ ] Navigation `useEffect` scroll locks body when mobile menu is open
- [ ] Navigation closes on route change
- [ ] Mobile hamburger opens/closes
- [ ] Footer has quick links, social links, privacy link
- [ ] Footer copyright `<p>` has `suppressHydrationWarning`
- [ ] Marketing layout uses Navigation/Footer components (not inline)

### Design System Helpers
- [ ] `src/lib/utils.ts` — cn(), formatDate(), readingTime()
- [ ] `src/lib/seo.ts` — buildMetadata(), buildArticleMetadata()
- [ ] `src/lib/analytics.ts` — trackEvent()

### Content Data
- [ ] `src/content/projects.ts` — 3 projects with slugs
- [ ] `src/content/blog.ts` — 3 posts with slugs

### UI Components
- [ ] Button — primary/secondary/ghost/outline, loading, href
- [ ] Badge — 4 tones
- [ ] Card — hover lift animation
- [ ] Input — label + error state
- [ ] Textarea — NEW file
- [ ] Heading — as prop
- [ ] SectionContainer — as prop + padding

### Module Components
- [ ] HeroSection — headline, subheadline, 3 CTAs
- [ ] ProjectCard — image, badges, GitHub/demo links
- [ ] BlogPostCard — image, category, date
- [ ] FeaturedProjects — NEW
- [ ] LatestBlogPosts — NEW
- [ ] ServicesSection — NEW
- [ ] ContactForm — validation, Formspree, redirect
- [ ] LoadingSkeleton — ProjectCardSkeleton + BlogPostCardSkeleton

### Pages
- [ ] `/` — all 4 sections + CTA
- [ ] `/about` — bio, skills, CTA
- [ ] `/contact` — form + sidebar
- [ ] `/contact/success` — checkmark + 3 CTAs
- [ ] `/projects` — grid listing
- [ ] `/projects/[slug]` — detail page
- [ ] `/blog` — grid listing
- [ ] `/blog/[slug]` — post detail
- [ ] `/privacy` — privacy content
- [ ] `not-found.tsx` — already done in Phase 1 ✅

### SEO
- [ ] `src/app/sitemap.ts` — auto-generates /sitemap.xml
- [ ] `src/app/robots.ts` — auto-generates /robots.txt
- [ ] JSON-LD Person schema in root layout
- [ ] Every page has unique title + description via generateMetadata/metadata

### Tests
- [ ] HeroSection unit test
- [ ] ContactForm validation unit test
- [ ] E2E smoke tests updated
- [ ] `npm run test` — all pass
- [ ] `npm run test:e2e` — all pass
- [ ] `npm run build` — succeeds

### Quality Gate (Phase 2 gating criteria)
- [ ] `public/images/og-home.jpg` exists (1200×630)
- [ ] All project and blog placeholder images exist in `public/images/`
- [ ] `NEXT_PUBLIC_SITE_URL` set in Vercel dashboard before final deploy
- [ ] `/sitemap.xml` shows real domain (not portfolio.local) after deploy
- [ ] `react-markdown` installed and body renders as HTML not raw text
- [ ] Lighthouse Performance > 80
- [ ] Lighthouse Accessibility > 80
- [ ] Lighthouse SEO > 80
- [ ] Lighthouse Best Practices > 80
- [ ] No console errors in production build

---

## Placeholder content reminder

All content in `src/content/` uses placeholder text. In **Phase 7** you will:
- Replace project titles/descriptions with your real projects
- Replace blog posts with real articles
- Update Footer social links with your real GitHub/LinkedIn/email
- Replace "Your Name" in JSON-LD with your actual name
- Add real images to `public/images/`

For now the structure is correct and build passes — content comes in Phase 7.

---

## Commit message for Phase 2

```bash
git add .
git commit -m "feat(phase2): build core pages, design system, and component library"
```

**Phase 2 complete → Next is Phase 3: CMS Integration**
