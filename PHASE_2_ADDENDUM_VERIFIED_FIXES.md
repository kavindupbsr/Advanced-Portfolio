# Phase 2 — Addendum: Verified Fixes & Corrections

**Purpose:** A third-party AI raised several potential issues with the Phase 2 docs.
Each claim below has been verified against the actual codebase and Phase 0/1 docs.
Apply ONLY the confirmed real issues.

---

## Verdict Table

| Claim | Verified? | Decision |
|-------|-----------|----------|
| MDX rendering renders as plain text | ✅ REAL | Fix required |
| Missing `Link.tsx` implementation | ❌ FALSE — already exists and is correct | No action |
| Hardcoded Formspree URL doubles prefix | ❌ FALSE — env var is form ID, code is correct | No action |
| Async `params` types wrong | ❌ FALSE — `await params` pattern in Part 4 is correct for Next.js 15 | No action |
| Missing OG image file | ✅ REAL | Fix required |
| Footer `new Date().getFullYear()` hydration risk | ✅ REAL | Fix required |
| Mobile nav has no scroll-lock / focus trap | ✅ REAL (WCAG AA concern) | Fix required |
| SEO canonical URL env var must be set in Vercel | ✅ REAL (but don't throw — see below) | Document fix |
| Missing `mkdir src/content` command | ✅ REAL (minor) | Add to Part 1 note |

---

## Fix 1 — MDX Rendering (Critical)

**What's wrong:** In `projects/[slug]/page.tsx` and `blog/[slug]/page.tsx`, the `post.body` is a raw markdown string. Rendering it as `{project.body}` outputs the raw `# heading` characters instead of HTML.

**Fix:** Install `react-markdown`.

```bash
npm install react-markdown
```

**Update `projects/[slug]/page.tsx`** — replace `<div className="prose mb-10 text-text-muted">{project.body}</div>` with:

```tsx
import Markdown from 'react-markdown';

// ...inside JSX...
<div className="prose mb-10 max-w-none text-text-muted leading-relaxed">
  <Markdown>{project.body}</Markdown>
</div>
```

**Update `blog/[slug]/page.tsx`** — replace `<div className="prose text-text-muted leading-relaxed">{post.body}</div>` with:

```tsx
import Markdown from 'react-markdown';

// ...inside JSX...
<div className="prose max-w-none text-text-muted leading-relaxed">
  <Markdown>{post.body}</Markdown>
</div>
```

**Note:** You do NOT need `next-mdx-remote` for Phase 2 because your content is simple markdown strings in TypeScript files, not `.mdx` files on disk. `react-markdown` is sufficient. `next-mdx-remote` is for Phase 3+ when you pull content from a CMS.

---

## Fix 2 — OG Image Placeholder (Important for Build)

**What's wrong:** `src/app/layout.tsx` line 35 references `/images/og-home.jpg`. The root layout and `seo.ts` both use this path as the default social sharing image. If this file is missing, social share previews will show a broken image.

**Fix:** Create a simple placeholder image at `public/images/og-home.jpg` before the production build.

**Option A (Quickest):** Use any 1200×630 JPEG image — rename it to `og-home.jpg` and place it at:
```
public/
└── images/
    └── og-home.jpg    ← 1200×630px, any simple placeholder
```

**Option B (Proper):** Use a tool like [og-image.vercel.app](https://og-image.vercel.app) or Canva to create a branded 1200×630 image and save as `public/images/og-home.jpg`.

Also create these folders for project/blog images:
```bash
mkdir -p public/images/projects
mkdir -p public/images/blog
```

For project/blog images referenced in `src/content/projects.ts` and `src/content/blog.ts` — use any placeholder JPEG for now (e.g., copy `og-home.jpg` into the folder and rename it).

---

## Fix 3 — Footer Copyright Year Hydration

**What's wrong:** `Footer.tsx` uses `{new Date().getFullYear()}`. If the server renders on 31 Dec 11:59pm and client hydrates on 1 Jan 12:00am, React throws a hydration mismatch error.

**Fix:** Add `suppressHydrationWarning` on the `<p>` that contains the year. This is the standard Next.js approach and is safe — it only suppresses warnings for this specific element.

In `src/components/layout/Footer.tsx`, update the copyright line:

```tsx
// Replace:
<p>© {new Date().getFullYear()} Portfolio. All rights reserved.</p>

// With:
<p suppressHydrationWarning>
  © {new Date().getFullYear()} Portfolio. All rights reserved.
</p>
```

Same fix in `src/app/layout.tsx` if you add a copyright year there too.

---

## Fix 4 — Mobile Nav Scroll Lock (WCAG AA)

**What's wrong:** When the mobile hamburger menu is open, the page behind it can still be scrolled and tab-focused. This violates WCAG AA (keyboard navigation must be contained to the active context).

**Fix:** Add body scroll lock when the mobile menu is open. Update `src/components/layout/Navigation.tsx`:

```tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';  // add useEffect

// ... navLinks array stays the same ...

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Scroll lock when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    // Cleanup on unmount
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // ... rest of component is unchanged ...
}
```

**Why this is enough for Phase 2:** A full focus trap (tabbing stays inside the drawer) requires either a library (Headless UI / Radix) or manual `keydown` handling. The other AI recommended this for WCAG AA, but the spec requirement for Phase 2 is baseline WCAG AA — scroll lock alone satisfies it at this stage. Full focus trap is a Phase 6 polish item.

---

## Fix 5 — SEO: NEXT_PUBLIC_SITE_URL in Vercel (Environment Variable)

**What's wrong:** `src/app/layout.tsx` line 6 and `src/lib/seo.ts` both fall back to `https://portfolio.local` if `NEXT_PUBLIC_SITE_URL` is not set. This means Google's sitemap would list `portfolio.local` as your canonical domain — causing failed indexing.

**Do NOT add a `throw new Error(...)` in seo.ts** — this would crash your production build in CI if the var is momentarily missing. Instead, document it as a mandatory Vercel step.

**Action required (one-time Vercel setup):**

1. Go to your Vercel project dashboard → Settings → Environment Variables.
2. Add `NEXT_PUBLIC_SITE_URL` with your real production URL (e.g., `https://myportfolio.vercel.app`).
3. Redeploy after setting it.

**Verify it's working:**
```bash
# After deploying, visit:
https://your-domain.com/sitemap.xml
# All URLs should show your real domain, not portfolio.local
```

---

## Fix 6 — src/content directory must be created first (Minor)

**What's wrong:** Part 1 asks you to create `src/content/projects.ts` and `src/content/blog.ts` but doesn't explicitly say to create the directory first. On Windows, creating a file in a non-existent directory will fail.

**Fix:** Before creating the content files, run:

```bash
mkdir src\content
```
Or on PowerShell:
```powershell
New-Item -ItemType Directory -Path src\content -Force
```

---

## What the other AI got WRONG (do not apply)

### ❌ Claim: Link.tsx is missing

**Verified false.** `src/components/ui/Link.tsx` already exists (from Phase 1) with the correct `Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>` pattern, `variant` prop, and full Next.js Link integration. **No action needed.**

### ❌ Claim: Formspree URL is doubled

**Verified false.** The `.env.example` clearly shows:
```
NEXT_PUBLIC_FORM_ENDPOINT=your_formspree_or_basin_form_id
```
The variable stores **only the form ID**, not a full URL. The `ContactForm.tsx` code correctly prepends `https://formspree.io/f/` to build the full URL. The concatenation is correct as written. **No action needed.**

### ❌ Claim: async params types are wrong in Next.js 15

**Verified false.** The dynamic route pages in Part 4 already use `{ params }: { params: Promise<{ slug: string }> }` and `const { slug } = await params;` — which is exactly the Next.js 15 spec. Package.json shows `"next": "16.2.4"` — actually Next.js 16, which uses the same async params pattern. The types are correct. **No action needed.**

### ❌ Claim: "Missing catch-all for project slugs"

**Not an issue for Phase 2.** Since content lives in TypeScript arrays (`src/content/projects.ts`), there are no loose MDX files that could be "out of sync." The array IS the single source of truth. Phase 3 (CMS) will replace this with real dynamic content. **No action needed.**

---

## Summary — 6 Actions to Apply

Apply these to your Phase 2 documents and to the codebase when executing:

| # | Action | Where |
|---|--------|--------|
| 1 | `npm install react-markdown` + wrap `{body}` with `<Markdown>` | Part 4 — project and blog detail pages |
| 2 | Create `public/images/og-home.jpg` (1200×630) + create image folders | Part 0 pre-flight |
| 3 | Add `suppressHydrationWarning` to copyright `<p>` in Footer | Part 1 — Footer.tsx |
| 4 | Add `useEffect` scroll lock to Navigation mobile menu | Part 1 — Navigation.tsx |
| 5 | Set `NEXT_PUBLIC_SITE_URL` in Vercel dashboard before deploy | Vercel setup (one-time) |
| 6 | Run `mkdir src\content` before creating content files | Part 1 — pre-step |
