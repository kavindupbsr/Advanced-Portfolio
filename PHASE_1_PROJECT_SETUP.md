# Phase 1: Project Setup & Hosting

**Duration:** 2-3 days (May 6-8, 2026)  
**Goal:** Initialize Next.js scaffold, configure environment, set up git + Vercel, add CI/CD pipeline  
**Output:** Working Next.js dev environment with all Phase 0 decisions locked into code

---

## Overview

Phase 1 takes all the decisions from Phase 0 and bootstraps a live Next.js project. By end of Phase 1:
- Next.js 5.1 runs locally with hot reload
- Design tokens are defined in CSS variables
- TypeScript strict mode enforces type safety
- Environment variables are templated
- Git repo is initialized with branch protection
- Vercel deployment is configured
- CI/CD pipeline runs linting, building, and performance checks
- Folder structure matches Phase 0 specification

---

## Phase 1 Tasks

### Task 1: Initialize Next.js Scaffold (App Router)

**Why this first?**  
Everything depends on the Next.js foundation. Better to get the structure right now than refactor later.

**Deliverable 1.1: Next.js Project with Core Dependencies**

Using Phase 0 decisions (5.1 App Router, TypeScript strict, Tailwind, ESLint):

```bash
npx create-next-app@latest portfolio \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias '@/*' \
  --no-git
```

**Verify:**
```bash
cd portfolio
npm run build
npm run dev
# Visit http://localhost:3000 (should show Next.js welcome page)
```

**Then create folder structure matching Phase 0 (Task 8):**
```
portfolio/
├── src/
│   ├── app/                    # App Router (replaces pages/)
│   │   ├── (marketing)/        # Layout group for public pages
│   │   │   ├── page.tsx        # Home /
│   │   │   ├── about/
│   │   │   │   └── page.tsx    # /about
│   │   │   ├── contact/
│   │   │   │   ├── page.tsx    # /contact
│   │   │   │   └── success/
│   │   │   │       └── page.tsx # /contact/success
│   │   │   ├── projects/
│   │   │   │   ├── page.tsx    # /projects
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx # /projects/[slug]
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx    # /blog
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx # /blog/[slug]
│   │   │   ├── case-studies/
│   │   │   │   ├── page.tsx    # /case-studies
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx # /case-studies/[slug]
│   │   │   ├── privacy/
│   │   │   │   └── page.tsx    # /privacy
│   │   │   └── layout.tsx      # Shared layout for marketing pages
│   │   ├── api/                # API routes
│   │   │   ├── contact/        # Form submission endpoint (Phase 2)
│   │   │   │   └── route.ts
│   │   │   ├── chat-resume/    # LLM endpoint (Phase 8+ experiment)
│   │   │   │   └── route.ts
│   │   │   └── health/
│   │   │       └── route.ts    # Health check for monitoring
│   │   ├── layout.tsx          # Root layout (meta, fonts, scripts)
│   │   └── not-found.tsx       # 404 page (from error-handling strategy)
│   ├── components/
│   │   ├── ui/                 # Atomic UI primitives
│   │   │   ├── Button.tsx
│   │   │   ├── Heading.tsx
│   │   │   ├── Text.tsx
│   │   │   ├── Link.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Image.tsx
│   │   ├── layout/             # Layout components
│   │   │   ├── Navigation.tsx  # Main nav + mobile menu
│   │   │   ├── Footer.tsx      # Footer with links + social
│   │   │   └── SectionContainer.tsx
│   │   └── modules/            # Page-level modules
│   │       ├── HeroSection.tsx
│   │       ├── ProjectCard.tsx
│   │       ├── BlogPostCard.tsx
│   │       ├── ContactForm.tsx
│   │       ├── LoadingSkeleton.tsx
│   │       └── ErrorBoundary.tsx
│   ├── content/                # Static markdown/MDX content
│   │   ├── blog/               # Blog posts (local or CMS in Phase 3)
│   │   ├── case-studies/       # Technical case studies + diagrams
│   │   └── about.md            # About page content
│   ├── lib/                    # Utilities & helpers
│   │   ├── api.ts              # Fetch helpers (with ISR/revalidation)
│   │   ├── analytics.ts        # Plausible event tracking
│   │   ├── form-validation.ts  # Lead capture validation (Phase 0 Task 1)
│   │   └── constants.ts        # App constants (env vars, URLs)
│   ├── styles/                 # Global styles
│   │   ├── tokens.css          # Design tokens from Phase 0 Task 2
│   │   ├── animations.css      # Motion tokens
│   │   ├── accessibility.css   # A11y styles (focus rings, contrast)
│   │   └── globals.css         # Tailwind directives
│   └── types/                  # TypeScript definitions
│       ├── index.ts            # Main types
│       ├── content.ts          # Content model types (from Phase 0 Task 1)
│       └── api.ts              # API response types
├── public/                     # Static assets
│   ├── images/
│   │   ├── og-home.jpg         # OG image for home
│   │   └── case-studies/       # Architecture diagrams, code screenshots
│   ├── fonts/                  # Font files (Inter, Poppins, Fira Code)
│   └── robots.txt
├── .env.example                # (Task 2: create from Phase 0)
├── .env.local                  # (Task 2: git-ignored)
├── .gitignore
├── next.config.js              # (Task 3: configure ISR, image optimization)
├── tsconfig.json               # (Task 4: strict mode enabled)
├── tailwind.config.ts          # (Task 5: tokens + custom config)
├── eslint.config.js            # (Task 6: code quality)
├── .prettierrc                 # (Task 6: formatting)
├── package.json
└── README.md
```

**Notes:**
- `(marketing)` is a layout group; routes inside don't have `/marketing/` prefix (clean URLs)
- `api/` endpoints use convention-based routing (folder structure = route path)
- Component organization: ui/ → layout/ → modules/ (atomic → composite)
- Design tokens live in CSS variables (`src/styles/tokens.css`), imported in `globals.css`

**Timeline:** 30 minutes (creation + folder scaffold)

---

### Task 2: Configure Environment Variables

**Why this?**  
Phase 0 Task 11 defined the schema; Phase 1 implements `.env.local` and `.env.example`.

**Deliverable 2.1: `.env.example` (Safe Reference)**

Create `c:\Users\ASUS TUF\Desktop\Portfolio\.env.example`:

```env
# Public variables (exposed in browser via NEXT_PUBLIC_ prefix)
NEXT_PUBLIC_ANALYTICS_ID=your_plausible_analytics_id
NEXT_PUBLIC_FORM_ENDPOINT=your_formspree_or_basin_form_id
NEXT_PUBLIC_CMS_PROJECT_ID=your_sanity_project_id_or_tbd
NEXT_PUBLIC_CMS_DATASET=development

# Private variables (server-side only, never exposed to browser)
CMS_API_TOKEN=your_cms_read_token_here

# Phase 3+ (CMS integration)
# CMS_API_URL=https://api.sanity.io/v1/data/query/...

# Phase 5+ (email automation)
# SENDGRID_API_KEY=sg_...
# SENDGRID_FROM_EMAIL=noreply@yoursite.com

# Phase 8+ (LLM experiment)
# ANTHROPIC_API_KEY=sk-ant-...
# MAX_LLM_QUERIES_PER_SESSION=5
```

**Deliverable 2.2: `.env.local` (Development, Git-Ignored)**

Create `c:\Users\ASUS TUF\Desktop\Portfolio\.env.local` (add to `.gitignore`):

```env
# Local development values
NEXT_PUBLIC_ANALYTICS_ID=dev_placeholder_123
NEXT_PUBLIC_FORM_ENDPOINT=dev_form_id
NEXT_PUBLIC_CMS_PROJECT_ID=dev_project
NEXT_PUBLIC_CMS_DATASET=development

# Leave empty for now; fill in when needed
CMS_API_TOKEN=
```

**Deliverable 2.3: Vercel Environment Setup**

In Vercel dashboard (Phase 1 Task 3.2), set secrets per environment:

| Variable | Development | Staging | Production |
|----------|-------------|---------|------------|
| NEXT_PUBLIC_ANALYTICS_ID | dev_123 | staging_456 | prod_789 |
| NEXT_PUBLIC_FORM_ENDPOINT | dev_form | staging_form | prod_form |
| CMS_API_TOKEN | (dev_token) | (staging_token) | (prod_token) |

**Timeline:** 15 minutes

---

### Task 3: Configure Next.js & TypeScript

**Why this?**  
Lock in performance budgets, strict type checking, ISR revalidation strategy.

**Deliverable 3.1: `tsconfig.json` (Strict Mode)**

Update/verify `tsconfig.json` enables strict type checking (from Phase 0 Task 9):

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "dom", "dom.iterable"],
    "jsx": "preserve",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowJs": true,
    "strict": true,                    // ← REQUIRED: Catch type errors early
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]               // ← Path alias from create-next-app
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

**Deliverable 3.2: `next.config.js` (ISR + Image Optimization)**

Create/update `next.config.js` with Phase 0 decisions (4.2 ISR, 11.3 image optimization):

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ISR revalidation strategy (4.2 Phase 0)
  // Default revalidate time: 3600 seconds (1 hour)
  // Override per-page with: revalidate: 60 in getStaticProps
  
  // Image optimization (11.3 Phase 0)
  images: {
    // Enforce responsive images; prevents oversized images blocking Core Web Vitals
    remotePatterns: [
      // Add external image sources here if using CMS (Phase 3)
      // { protocol: 'https', hostname: 'cdn.example.com' }
    ],
    // Supported formats: WebP, AVIF, JPEG, PNG
    formats: ['image/avif', 'image/webp'],
    // Image sizes for srcset (from Phase 0 Task 9)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Webpack config for performance monitoring (Phase 4)
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Client-side bundle analysis (optional; add bundle-analyzer in Phase 4)
    }
    return config;
  },

  // Experimental: Optimized package imports (if using Tailwind + lodash, etc.)
  // optimizePackageImports: ['@mui/material', 'lodash'],

  // CORS headers for API routes (if needed for Phase 2+ form endpoints)
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'POST, GET, OPTIONS' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

**Deliverable 3.3: `.eslintrc.json` (Code Quality)**

Update/verify ESLint config (from Phase 0 Task 9):

```json
{
  "extends": [
    "next/core-web-vitals",
    "next/typescript"
  ],
  "rules": {
    "react/no-unescaped-entities": "off",
    "@next/next/no-html-link-for-pages": "off",
    // Add project-specific rules as needed (Phase 4)
  }
}
```

**Deliverable 3.4: `.prettierrc` (Code Formatting)**

Create `.prettierrc`:

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "arrowParens": "always"
}
```

**Timeline:** 20 minutes

---

### Task 4: Design Tokens & Tailwind Configuration

**Why this?**  
Phase 0 Task 2 defined tokens; Phase 1 implements them as CSS variables + Tailwind config.

**Deliverable 4.1: `src/styles/tokens.css` (Design System)**

Create `src/styles/tokens.css` from Phase 0 DESIGN_TOKENS section:

```css
/* Phase 0 Design Tokens → CSS Variables */
:root {
  /* Color Palette (2.1 Brand + 2.2 Client + 2.3 Technical) */
  --color-primary-50: #f0f9ff;
  --color-primary-100: #e0f2fe;
  --color-primary-500: #0ea5e9;  /* Brand blue */
  --color-primary-600: #0284c7;
  --color-primary-900: #082f49;

  --color-neutral-50: #fafafa;
  --color-neutral-100: #f5f5f5;
  --color-neutral-600: #525252;
  --color-neutral-900: #171717;

  --color-semantic-success: #10b981;
  --color-semantic-warning: #f59e0b;
  --color-semantic-error: #ef4444;
  --color-semantic-info: #3b82f6;

  --color-bg-light: #ffffff;
  --color-bg-dark: #0f172a;

  /* Typography (Fluid scales from Phase 0) */
  --font-base: 'Inter', system-ui, sans-serif;
  --font-heading: 'Poppins', sans-serif;
  --font-mono: 'Fira Code', monospace;

  --text-xs: clamp(0.75rem, 2vw, 0.875rem);
  --text-sm: clamp(0.875rem, 2.5vw, 1rem);
  --text-base: clamp(1rem, 3vw, 1.125rem);
  --text-lg: clamp(1.125rem, 3.5vw, 1.25rem);
  --text-xl: clamp(1.25rem, 4vw, 1.5rem);
  --text-2xl: clamp(1.5rem, 4.5vw, 1.875rem);
  --text-3xl: clamp(1.875rem, 5vw, 2.25rem);
  --text-4xl: clamp(2.25rem, 5.5vw, 3rem);

  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  --line-height-tight: 1.2;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;

  /* Spacing (rem-based from Phase 0) */
  --space-0: 0;
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;

  /* Borders */
  --radius-none: 0;
  --radius-sm: 0.125rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-full: 9999px;

  /* Accessibility (12.1 WCAG AA) */
  --focus-ring-width: 2px;
  --focus-ring-offset: 2px;
  --focus-ring-color: var(--color-primary-500);
  --min-touch-target: 44px;
  --min-font-size: 16px;

  /* Motion (11.3 UX) */
  --transition-fast: 150ms;
  --transition-base: 250ms;
  --transition-slow: 350ms;
  --easing-ease-in: cubic-bezier(0.4, 0, 1, 1);
  --easing-ease-out: cubic-bezier(0, 0, 0.2, 1);
  --easing-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

  /* Performance Budget Markers (Phase 4 CI validation) */
  --max-js-bundle: 50kb; /* Note: re-baseline to 80-100kb if Framer Motion needed */
  --max-css-bundle: 20kb;
  --max-image-size: 200kb;
  --lighthouse-target: 80;
}

/* Respect user motion preference (12.1 a11y) */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Deliverable 4.2: `src/styles/globals.css` (Tailwind + Global Styles)**

Update `src/styles/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Import token variables */
@import './tokens.css';
@import './animations.css';
@import './accessibility.css';

/* Base styles */
html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-base);
  font-size: var(--text-base);
  line-height: var(--line-height-normal);
  color: var(--color-neutral-900);
  background-color: var(--color-bg-light);
}

/* Ensure min font size on mobile (12.1 a11y) */
@supports (-webkit-appearance: none) {
  input,
  textarea,
  select {
    font-size: 16px; /* Prevent iOS zoom-on-focus */
  }
}
```

**Deliverable 4.3: `tailwind.config.ts` (Custom Tokens)**

Update `tailwind.config.ts` to map tokens to Tailwind utilities:

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'var(--color-primary-50)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          900: 'var(--color-primary-900)',
        },
        neutral: {
          50: 'var(--color-neutral-50)',
          600: 'var(--color-neutral-600)',
          900: 'var(--color-neutral-900)',
        },
        semantic: {
          success: 'var(--color-semantic-success)',
          warning: 'var(--color-semantic-warning)',
          error: 'var(--color-semantic-error)',
          info: 'var(--color-semantic-info)',
        },
      },
      fontFamily: {
        base: 'var(--font-base)',
        heading: 'var(--font-heading)',
        mono: 'var(--font-mono)',
      },
      fontSize: {
        xs: 'var(--text-xs)',
        sm: 'var(--text-sm)',
        base: 'var(--text-base)',
        lg: 'var(--text-lg)',
        xl: 'var(--text-xl)',
        '2xl': 'var(--text-2xl)',
        '3xl': 'var(--text-3xl)',
        '4xl': 'var(--text-4xl)',
      },
      spacing: {
        1: 'var(--space-1)',
        2: 'var(--space-2)',
        3: 'var(--space-3)',
        4: 'var(--space-4)',
        6: 'var(--space-6)',
        8: 'var(--space-8)',
        12: 'var(--space-12)',
        16: 'var(--space-16)',
      },
      borderRadius: {
        none: 'var(--radius-none)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        full: 'var(--radius-full)',
      },
      transitionDuration: {
        fast: 'var(--transition-fast)',
        base: 'var(--transition-base)',
        slow: 'var(--transition-slow)',
      },
    },
  },
  plugins: [
    // Add accessibility plugin for focus ring helpers (Phase 2)
    // require('@tailwindcss/forms'), // If form styling needed
  ],
};

export default config;
```

**Timeline:** 25 minutes

---

### Task 5: Accessibility & Animation Styles

**Why this?**  
Phase 0 Task 2 defined a11y tokens + motion strategy; Phase 1 implements them.

**Deliverable 5.1: `src/styles/accessibility.css`**

Create `src/styles/accessibility.css`:

```css
/* Focus ring styles (12.1 WCAG AA, from Phase 0) */
:focus-visible {
  outline: var(--focus-ring-width) solid var(--focus-ring-color);
  outline-offset: var(--focus-ring-offset);
}

/* Skip-to-content link (a11y best practice) */
.skip-to-content {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-primary-500);
  color: white;
  padding: 8px;
  text-decoration: none;
  z-index: 100;
}

.skip-to-content:focus {
  top: 0;
}

/* Screen reader only text */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* High contrast mode support */
@media (prefers-contrast: more) {
  :root {
    --color-primary-500: #0066cc;  /* Higher contrast blue */
    --color-neutral-900: #000000;  /* Pure black */
  }
}

/* Large text users */
@media (prefers-reduced-transparency: reduce) {
  body {
    background-color: var(--color-bg-light); /* Remove any transparency */
  }
}
```

**Deliverable 5.2: `src/styles/animations.css`**

Create `src/styles/animations.css`:

```css
/* Motion tokens from Phase 0 (11.3 motion-rich + 12.1 prefers-reduced-motion) */

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideInUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideInDown {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideInLeft {
  from {
    transform: translateX(-20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideInRight {
  from {
    transform: translateX(20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Utility animations */
.animate-fade-in {
  animation: fadeIn var(--transition-base) var(--easing-ease-out);
}

.animate-slide-in-up {
  animation: slideInUp var(--transition-base) var(--easing-ease-out);
}

.animate-slide-in-down {
  animation: slideInDown var(--transition-base) var(--easing-ease-out);
}

.animate-slide-in-left {
  animation: slideInLeft var(--transition-base) var(--easing-ease-out);
}

.animate-slide-in-right {
  animation: slideInRight var(--transition-base) var(--easing-ease-out);
}

.animate-pulse {
  animation: pulse var(--transition-slow) var(--easing-ease-in-out) infinite;
}

/* Respect prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  [class*='animate-'] {
    animation: none !important;
    transition: none !important;
  }
}
```

**Timeline:** 15 minutes

---

### Task 6: Git & Branch Protection

**Why this?**  
Lock main branch, enforce PR reviews, prevent accidental pushes.

**Deliverable 6.1: Initialize Git Repository**

```bash
cd portfolio
git init
git add .
git commit -m "chore(phase1): initialize Next.js scaffold with Phase 0 architecture decisions"
git branch -M main
# git remote add origin https://github.com/yourname/portfolio.git (Phase 1 Task 6.2)
```

**Deliverable 6.2: `.gitignore` (Git-Safe Defaults)**

Ensure `.gitignore` includes (created by `create-next-app`):

```
# Environment variables (Phase 1 Task 2)
.env.local
.env.*.local

# Next.js build output
.next/
out/

# Dependencies
node_modules/
package-lock.json
yarn.lock

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Testing
coverage/

# Bundle analysis (Phase 4)
.bundle-analyzer/

# Vercel
.vercel/
```

**Deliverable 6.3: Vercel Deployment Setup (Phase 1 Task 6.3)**

Link repo to Vercel (in Vercel dashboard or via CLI):

```bash
npm install -g vercel
vercel link
# Follow prompts to connect to GitHub + Vercel
```

Configure per-environment secrets in Vercel:
- Production: NEXT_PUBLIC_ANALYTICS_ID, NEXT_PUBLIC_FORM_ENDPOINT, CMS_API_TOKEN
- Preview: staging versions
- Development: `.env.local` (local machine only)

**Timeline:** 20 minutes

---

### Task 7: CI/CD Pipeline (GitHub Actions)

**Why this?**  
Automate linting, building, Lighthouse audits, bundle size checks.

**Deliverable 7.1: GitHub Actions Workflow**

Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      # Lint (Phase 0 Task 9 code standards)
      - name: Run ESLint
        run: npm run lint

      # Format check (Phase 0 Task 9)
      - name: Check Prettier formatting
        run: npm run format:check

      # Type check (Phase 0 Task 4 TypeScript strict)
      - name: TypeScript type check
        run: npm run type-check

      # Build (Phase 0 decision: no build errors allowed)
      - name: Build Next.js
        run: npm run build

      # Lighthouse audit (Phase 0 Task 2: performance budget >80)
      - name: Run Lighthouse audit
        uses: treosh/lighthouse-ci-action@v10
        with:
          configPath: './lighthouserc.json'
          uploadArtifacts: true
          temporaryPublicStorage: true

      # Bundle size check (Phase 0 Task 2: JS <50KB, CSS <20KB)
      - name: Check bundle size
        run: npm run bundle-analyze
        continue-on-error: true

      # Deploy to Vercel (only on push to main)
      - name: Deploy to Vercel
        if: github.ref == 'refs/heads/main'
        uses: vercel/action@v5
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

**Deliverable 7.2: Lighthouse Config**

Create `lighthouserc.json` (performance budget enforcement):

```json
{
  "ci": {
    "collect": {
      "url": [
        "http://localhost:3000/"
      ],
      "numberOfRuns": 3,
      "settings": {
        "chromePath": "/usr/bin/google-chrome"
      }
    },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.80 }],
        "categories:accessibility": ["error", { "minScore": 0.80 }],
        "categories:best-practices": ["error", { "minScore": 0.80 }],
        "categories:seo": ["error", { "minScore": 0.80 }],
        "cumulativeLayoutShift": ["error", { "maxNumericValue": 0.1 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

**Add npm scripts to `package.json`:**

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint src --max-warnings 0",
    "lint:fix": "eslint src --fix",
    "format": "prettier --write src",
    "format:check": "prettier --check src",
    "type-check": "tsc --noEmit",
    "bundle-analyze": "ANALYZE=true npm run build",
    "test": "jest",
    "test:e2e": "playwright test"
  }
}
```

**Timeline:** 30 minutes

---

### Task 8: Base Components & Types

**Why this?**  
Phase 0 Task 9 defined component inventory; Phase 1 creates TypeScript definitions + stub files.

**Deliverable 8.1: Type Definitions (`src/types/index.ts`)**

Create `src/types/index.ts` from Phase 0 Task 1 content model:

```typescript
// Content model types (from Phase 0 Task 1)

export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  author?: string;
  publishedAt: string;
  updatedAt?: string;
  category: 'design' | 'engineering' | 'business' | 'case-study';
  tags?: string[];
  featured?: boolean;
  image?: string;
}

export interface ProjectCard {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  featured?: boolean;
  date?: string;
  githubUrl?: string;
  demoUrl?: string;
  techStackDepth?: 'frontend' | 'backend' | 'fullstack';
}

export interface CaseStudy {
  title: string;
  slug: string;
  headline: string;
  body: string;
  image: string;
  client?: string;
  role: string;
  timeline: string;
  impact?: string;
  tools: string[];
  featured?: boolean;
  publishedAt: string;
}

export interface TechnicalCaseStudy extends CaseStudy {
  course?: string;
  codeRepositoryUrl: string;
  architectureDiagrams?: Array<{ title: string; image: string }>;
  codeSnippets?: Array<{ title: string; language: string; code: string }>;
  metrics?: string;
}

export interface LeadCaptureForm {
  name: string;
  email: string;
  message: string;
  projectType?: 'design' | 'development' | 'both' | 'consulting';
  budget?: '$5k-$25k' | '$25k-$50k' | '$50k+' | 'other';
  timeline?: 'asap' | '1-3 months' | '3-6 months' | 'no deadline';
  website?: string;
}

export interface QualifiedLead extends LeadCaptureForm {
  id: string;
  createdAt: string;
  qualified: boolean; // name + email + message + (projectType OR budget)
}
```

**Deliverable 8.2: Component Stubs (From Phase 0 Task 9)**

Create placeholder files for component inventory:

**UI Primitives:**
```typescript
// src/components/ui/Button.tsx
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', size = 'md', children, ...props }: ButtonProps) {
  const baseStyles = 'font-semibold rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2';
  const variantStyles = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600',
    secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200',
    outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-50',
  };
  const sizeStyles = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`} {...props}>
      {children}
    </button>
  );
}
```

Create stubs for:
- `src/components/ui/Heading.tsx`
- `src/components/ui/Text.tsx`
- `src/components/ui/Link.tsx`
- `src/components/ui/Input.tsx`
- `src/components/ui/Badge.tsx`
- `src/components/ui/Card.tsx`
- `src/components/ui/Image.tsx`

**Layout Components:**
- `src/components/layout/Navigation.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/layout/SectionContainer.tsx`

**Module Components:**
- `src/components/modules/HeroSection.tsx`
- `src/components/modules/ProjectCard.tsx`
- `src/components/modules/BlogPostCard.tsx`
- `src/components/modules/ContactForm.tsx`
- `src/components/modules/LoadingSkeleton.tsx`
- `src/components/modules/ErrorBoundary.tsx`

**Timeline:** 45 minutes

---

### Task 9: Root Layout & 404 Page

**Why this?**  
Establish meta tags, fonts, providers for entire app.

**Deliverable 9.1: `src/app/layout.tsx` (Root Layout)**

Create root layout with meta tags + fonts (Phase 0 Task 6 SEO):

```typescript
import type { Metadata } from 'next';
import './globals.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio.local';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Jane Doe | Product Designer & Engineer',
    template: '%s | Jane Doe',
  },
  description: 'I design and build fast, accessible digital products. See my work, read my writing, and let\'s collaborate.',
  generator: 'Next.js',
  applicationName: 'Portfolio',
  referrer: 'strict-origin-when-cross-origin',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Jane Doe',
    images: [
      {
        url: `${SITE_URL}/images/og-home.jpg`,
        width: 1200,
        height: 630,
        alt: 'Jane Doe Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@yourhandle',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@600;700&family=Fira+Code:wght@400;500&display=swap"
          rel="stylesheet"
        />

        {/* Plausible Analytics (Phase 0 Task 5 event tracking) */}
        {process.env.NEXT_PUBLIC_ANALYTICS_ID && (
          <script
            defer
            data-domain={process.env.NEXT_PUBLIC_SITE_DOMAIN || 'portfolio.local'}
            src="https://plausible.io/js/script.js"
          />
        )}

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
```

**Deliverable 9.2: `src/app/not-found.tsx` (404 Page)**

Create 404 page (Phase 0 Task 10 error handling):

```typescript
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-50">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-primary-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-2">Page Not Found</h2>
        <p className="text-neutral-600 mb-8">
          The page you're looking for doesn't exist. Let's get you back on track.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
          <Link href="/blog">
            <Button variant="outline">Read Blog</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
```

**Timeline:** 20 minutes

---

### Task 10: Create Initial Page Structure

**Why this?**  
Establish routing, layout groups, placeholder pages.

**Deliverable 10.1: Marketing Layout Group**

Create `src/app/(marketing)/layout.tsx`:

```typescript
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  );
}
```

**Deliverable 10.2: Home Page**

Create `src/app/(marketing)/page.tsx`:

```typescript
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { HeroSection } from '@/components/modules/HeroSection';

export default function Home() {
  return (
    <div className="space-y-16">
      <HeroSection />
      {/* Featured projects, blog preview, CTAs — to be filled in Phase 2 */}
      <section className="text-center py-12">
        <Heading level={2}>Phase 1 Scaffold Complete</Heading>
        <Text>Next steps: Phase 2 (Home page build), Phase 3 (CMS setup)</Text>
      </section>
    </div>
  );
}
```

**Create placeholder pages:**
- `src/app/(marketing)/about/page.tsx`
- `src/app/(marketing)/contact/page.tsx`
- `src/app/(marketing)/contact/success/page.tsx`
- `src/app/(marketing)/projects/page.tsx`
- `src/app/(marketing)/blog/page.tsx`
- `src/app/(marketing)/case-studies/page.tsx`
- `src/app/(marketing)/privacy/page.tsx`

**Deliverable 10.3: API Route Stubs**

Create `src/app/api/health/route.ts` (basic health check):

```typescript
export async function GET() {
  return Response.json({ status: 'ok', timestamp: new Date().toISOString() });
}
```

**Timeline:** 25 minutes

---

## Phase 1 Timeline & Checkpoint

| Task | Duration | Dependencies |
|------|----------|---|
| 1. Next.js Scaffold | 30 min | — |
| 2. Env Variables | 15 min | Task 1 |
| 3. Next.js Config | 20 min | Task 1 |
| 4. Design Tokens | 25 min | Task 1 |
| 5. A11y + Animations | 15 min | Task 4 |
| 6. Git + Vercel | 20 min | Task 1 |
| 7. CI/CD Pipeline | 30 min | Task 6 |
| 8. Components + Types | 45 min | Task 1 |
| 9. Root Layout | 20 min | Task 1 |
| 10. Pages | 25 min | Task 9 |
| **Total** | **~4.5 hours** | Spread over 1 day |

---

## Phase 1 Completion Checklist

Once complete, you should have:

- ✅ Next.js 5.1 running locally (`npm run dev` works)
- ✅ TypeScript strict mode enabled + no build errors
- ✅ Design tokens implemented as CSS variables + Tailwind config
- ✅ `.env.local` and `.env.example` created + Vercel secrets configured
- ✅ Git repo initialized + connected to GitHub + Vercel
- ✅ CI/CD pipeline ready (lint, build, Lighthouse, bundle checks)
- ✅ Folder structure matches Phase 0 specification
- ✅ Component stubs created (ready for Phase 2 implementation)
- ✅ Root layout + 404 page in place
- ✅ All pages routable + layout groups working

---

## Phase 1 → Phase 2 Handoff

Once Phase 1 complete, **Phase 2 focus:**
- Build Home page (HeroSection + featured projects + blog preview)
- Create Navigation component (responsive + mobile menu)
- Implement ContactForm (with client-side validation from Phase 0)
- Set up form submission endpoint (Phase 0 Task 1 + 8.1 Formspree/Basin)
- Verify Lighthouse > 80 before hero animation experiments

---

**Phase 1 Owner:** You  
**Start Date:** May 6, 2026  
**Expected Completion:** May 7, 2026  
**Status:** Not started
