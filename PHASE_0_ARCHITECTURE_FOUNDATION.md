# Phase 0: Architecture Foundation (Week 1)
## Detailed Planning & Execution Guide

**Current Status:** Pre-build (planning stage)  
**You are here:** About to start Phase 0  
**Duration:** 1 week (days 1-5 ideal)  
**Extends from:** PORTFOLIO_PROJECT_REQUIREMENTS.md Roadmap (Phase 0 section)

---

## Overview

Before writing any Next.js code, you must define:
1. **Content Model** - What data structure do your projects, blog posts, case studies live in?
2. **Design System** - What colors, fonts, spacing, animations will be reused everywhere?
3. **Information Architecture** - How do visitors navigate? What pages exist? How do audiences find different content?

This phase is **100% planning/documentation**. No code, no builds yet. Getting it wrong here = weeks of rework later.

---

## Task 1: Define Content Model & Schema

### Why this first?
Your 3.4 (Hybrid) decision means:
- **Static content** (Home, About, Contact) lives in code/markdown
- **Dynamic content** (Blog, Case Studies) live in CMS or MDX files

You need to know the structure of each before building templates.

### Deliverable 1.1: Content Taxonomy

Define the schema for all content types that will live in your site (both static and CMS-driven):

```markdown
# Content Taxonomy

## Content Types

### 1. Project Card
Used on: Home page, Projects listing  
Fields:
- `title` (required): Project name (50 chars max)
- `description` (required): 1-2 sentence summary (100 chars max)
- `image` (required): Hero image (1200x600px recommended)
- `tags` (required): Array of tech stack (e.g., ["React", "Next.js", "Tailwind"])
- `link` (required): URL to full project or GitHub
- `featured` (optional): Boolean (appears on home hero?)
- `date` (optional): Year or launch date
- `githubUrl` (optional, for 2.3 Technical Peers): Direct GitHub repo link (e.g., https://github.com/yourname/project)
- `demoUrl` (optional, for 2.3 Technical Peers): Live demo or deployed URL
- `techStackDepth` (optional): "frontend" | "backend" | "fullstack" (clarity for technical audience)

Example:
{
  "title": "Portfolio Site v2",
  "description": "Creative portfolio with Astro, CMS integration, motion effects",
  "image": "/images/portfolio-v2.jpg",
  "tags": ["Next.js", "Tailwind", "Vercel"],
  "link": "https://github.com/yourname/portfolio",
  "featured": true,
  "date": "2026"
}

### 2. Blog Post
Used on: /blog index, /blog/[slug]  
Fields:
- `title` (required): Blog post title
- `slug` (required): URL slug (auto-generated from title)
- `excerpt` (required): 150-char summary for preview cards
- `body` (required): Markdown/MDX content
- `author` (optional): Author name
- `publishedAt` (required): ISO date (2026-05-04)
- `updatedAt` (optional): ISO date if edited
- `category` (required): One of ["design", "engineering", "business", "case-study"]
- `tags` (optional): Array of keywords
- `featured` (optional): Boolean (appears on home blog preview?)
- `image` (optional): Cover image (1200x630px for social)

Example:
{
  "title": "Building a Motion-Rich Portfolio with Next.js",
  "slug": "motion-rich-portfolio-nextjs",
  "excerpt": "How I balanced creative motion with performance constraints...",
  "body": "# Building...",
  "publishedAt": "2026-05-04",
  "category": "engineering",
  "tags": ["nextjs", "performance", "motion"],
  "featured": true
}

### 3. Case Study
Used on: /case-studies index, /case-studies/[slug]  
Fields:
- `title` (required): Case study title
- `slug` (required): URL slug
- `headline` (required): 1-line value proposition
- `body` (required): Long-form markdown/MDX (sections: challenge, solution, results, learnings)
- `image` (required): Hero image (1600x900px)
- `client` (optional): Client name (or "Personal Project")
- `role` (required): Your role (e.g., "Full-Stack Designer")
- `timeline` (required): "3 months" or date range
- `impact` (optional): Key metric (e.g., "40% faster load time")
- `tools` (required): Array of tools used
- `featured` (optional): Boolean (appears on home hero?)
- `publishedAt` (required): ISO date

Example:
{
  "title": "Redesigning E-commerce Checkout Flow",
  "slug": "ecommerce-checkout-redesign",
  "headline": "Reduced cart abandonment by 25% through UX research and iterative design",
  "client": "TechStore Inc",
  "role": "Product Designer + Front-end Engineer",
  "timeline": "4 months",
  "impact": "25% reduction in cart abandonment",
  "tools": ["Figma", "React", "Stripe API"],
  "publishedAt": "2026-01-15"
}

### 4. Technical Case Study (3.4 Hybrid + 2.3 Technical Peers)
Used on: /case-studies/[slug] (for academic/technical deep-dives like SENG 31353 or SENG 31242)  
Fields:
- `title` (required): Project title (e.g., "Game Development Engine with Physics Simulation")
- `slug` (required): URL slug
- `headline` (required): 1-line technical value prop
- `body` (required): Long-form markdown/MDX with embedded code + diagrams (sections: problem, approach, architecture, key learnings)
- `image` (required): Project hero/screenshot (1600x900px)
- `role` (required): Your role (e.g., "Lead Engine Developer", "System Designer")
- `timeline` (required): Duration or semester
- `course` (optional): Course code if academic (e.g., "SENG 31353")
- `tools` (required): Technologies and languages (e.g., ["C++", "DirectX", "Git", "Visual Studio"])
- `codeRepositoryUrl` (required): Link to GitHub repo or code archive
- `architectureDiagrams` (optional): Array of {title, image} for system diagrams (png/svg, embedded or linked)
- `codeSnippets` (optional): Array of {title, language, code} for highlighted examples (stored as frontmatter or MDX components)
- `metrics` (optional): Performance/quality metrics (e.g., "60 FPS maintained", "Code coverage: 85%")
- `publishedAt` (required): ISO date

**Example:**
```json
{
  "title": "3D Game Development Engine with Physics Simulation",
  "slug": "game-dev-engine-seng31353",
  "headline": "Built a C++-based 3D game engine with real-time physics and rendering pipeline",
  "course": "SENG 31353",
  "role": "Lead Engine Developer",
  "timeline": "4 months (Winter 2025)",
  "tools": ["C++", "DirectX", "OpenGL", "Git"],
  "codeRepositoryUrl": "https://github.com/yourname/game-engine",
  "architectureDiagrams": [
    {"title": "Engine Architecture", "image": "/images/case-studies/engine-architecture.png"},
    {"title": "Physics Pipeline", "image": "/images/case-studies/physics-pipeline.svg"}
  ],
  "metrics": "60 FPS rendering, <5ms physics step",
  "publishedAt": "2026-05-06"
}
```

**Implementation note (Phase 1):** Use MDX for body content to embed `<CodeSnippet>` and `<ArchitectureDiagram>` components inline. Store diagrams in `/public/images/case-studies/` and code snippets in frontmatter or a JSON metadata file.

### 5. About Content (Static)
Used on: /about page  
Fields:
- `headline` (required): "About me" section title
- `bio` (required): Long-form markdown (career story, philosophy)
- `services` (optional): If 2.2 audience, list what you offer
- `skills` (optional): Array of skill categories with items
- `testimonials` (optional if 2.2): Array of testimonial blocks

### 6. Lead Capture Form (3.4 Hybrid + 1.2 Lead Gen + 8.1 Third-party Forms)
Used on: /contact page, home CTA section  
Fields to capture:
- `name` (required): Full name (used for personalization in follow-up)
- `email` (required): Email address (primary contact method)
- `message` (required): Project inquiry or message (min 20 chars)
- `projectType` (optional): Category from ["design", "development", "both", "consulting"]
- `budget` (optional): Budget range ["$5k-$25k", "$25k-$50k", "$50k+", "other"]
- `timeline` (optional): When they need it ["asap", "1-3 months", "3-6 months", "no deadline"]
- `website` (optional): Their website or company URL

**Qualification Logic (for Phase 5 analytics):**
- Qualified lead: name + email + message + (projectType OR budget)
- Unqualified: incomplete form or spam indicators

**Example:**
```json
{
  "name": "Client Name",
  "email": "client@company.com",
  "message": "Looking for a portfolio redesign with motion effects",
  "projectType": "design",
  "budget": "$25k-$50k",
  "timeline": "3-6 months",
  "website": "https://company.com"
}
```

**Third-party form service (8.1):** Formspree, Basin, or Getform can capture this schema directly.

### 7. Navigation & Metadata
- `meta.title`: Page title (< 60 chars)
- `meta.description`: Page meta description (< 160 chars)
- `meta.image`: OG image for social (1200x630px)
- `meta.canonical`: Canonical URL (for duplicate prevention in 9.2)

---

## Task 2: Define Design Tokens (6.4 Design System First)

### Why this?
Your 6.4 decision means you're building a **design system from the start**, not adding consistency later. Every color, font, spacing decision should be token-based, reusable, and centralized.

**This task also locks in:**
- Accessibility standards (12.1 WCAG AA) via focus/contrast tokens
- Performance budget as hard constraints (11.2/11.3)

### Deliverable 2.1: Design Tokens

Define all design tokens that will drive consistency across the site. These map directly to Tailwind config and CSS variables in Phase 1.

**Color Palette:**

```yaml
Colors:
  Primary:
    50: "#f0f5ff"    # Very light
    100: "#dde9ff"
    500: "#4a7aff"   # Main brand color
    600: "#3961e6"
    900: "#1a2966"   # Very dark
  
  Neutral (Gray):
    50: "#f9fafb"
    100: "#f3f4f6"
    500: "#6b7280"   # Mid-gray text
    900: "#111827"   # Almost black
  
  Semantic:
    success: "#10b981"
    warning: "#f59e0b"
    error: "#ef4444"
    info: "#3b82f6"
  
  Background:
    light: "#ffffff"
    dark: "#0f172a"

Typography:
  FontFamily:
    base: "Inter, system-ui, sans-serif"
    heading: "Poppins, sans-serif"
    mono: "Fira Code, monospace"
  
  FontSize:
    xs: "12px / 0.75rem"
    sm: "14px / 0.875rem"
    base: "16px / 1rem"
    lg: "18px / 1.125rem"
    xl: "20px / 1.25rem"
    2xl: "24px / 1.5rem"
    3xl: "30px / 1.875rem"
    4xl: "36px / 2.25rem"
  
  FontWeight:
    light: 300
    regular: 400
    medium: 500
    semibold: 600
    bold: 700
  
  LineHeight:
    tight: 1.2
    normal: 1.5
    relaxed: 1.75

Spacing:
  0: "0"
  1: "0.25rem / 4px"
  2: "0.5rem / 8px"
  3: "0.75rem / 12px"
  4: "1rem / 16px"
  6: "1.5rem / 24px"
  8: "2rem / 32px"
  12: "3rem / 48px"
  16: "4rem / 64px"

Borders:
  radius:
    none: "0"
    sm: "0.125rem"
    base: "0.375rem"
    lg: "0.5rem"
    full: "9999px"
  
  width:
    light: "1px"
    base: "2px"

Accessibility (12.1 WCAG AA Standards):
  FocusStates:
    ring: "2px solid #4a7aff"  # High-contrast focus ring
    offset: "2px"              # Space between element and ring
    outlineWidth: "2px"        # Min thickness for visibility
  
  ColorContrast:
    text_on_light: "#111827"   # Neutral-900 on white = 18:1 (AAA)
    text_on_dark: "#f9fafb"    # Neutral-50 on dark = 17:1 (AAA)
    link_color: "#4a7aff"      # Primary-500 meets WCAG AA (4.5:1) on white
    disabled_opacity: "0.5"     # Disabled state (not color alone)
  
  MinimumTouchTarget: "44px"   # Mobile accessibility (width x height)
  MinimumLineHeight: "1.5"     # For readability (tight text fails a11y)
  MinimumFontSize: "16px"      # Prevent zoom on mobile inputs

Motion (Animations):
  Duration:
    fast: "150ms"
    normal: "300ms"
    slow: "500ms"
  
  Easing:
    in: "cubic-bezier(0.4, 0, 1, 1)"
    out: "cubic-bezier(0, 0, 0.2, 1)"
    inout: "cubic-bezier(0.4, 0, 0.2, 1)"
  
  Animations:
    fadeIn: "fade 300ms ease-out"
    slideUp: "slideUp 300ms ease-out"
    scaleIn: "scaleIn 300ms ease-out"

Performance Budget (Hard Constraints, enforced in Phase 1+):
  MainBundle:
    maxJS: "50KB"          # gzipped (RSC-first baseline; keep client islands minimal)
    maxCSS: "20KB"         # gzipped
    target: "< 40KB"       # ideal for fast LCP

  BudgetNote:
    ifMotionBecomesClientHeavy: "Re-baseline to 80KB-100KB and explicitly scope Framer Motion usage"
    rationale: "The current 50KB target assumes React Server Components do most of the work and client-side interactivity stays small"
  
  Images:
    maxImageSize: "200KB"  # per image (1200x600px hero)
    maxHeroImage: "150KB"  # homepage hero (optimized AVIF/WebP)
    target: "< 100KB"      # ideal
  
  CoreWebVitals:
    lcp: "< 2.5s"          # Largest Contentful Paint
    cls: "< 0.1"           # Cumulative Layout Shift (no jank from motion)
    fid: "< 100ms"         # First Input Delay (not used in 2024+, replaced by INP)
  
  LighthouseScore:
    minimum: "> 80"        # All categories (performance, a11y, SEO, best practices)
    target: "> 90"
  
  ThirdPartyScripts:
    maxCount: "3"          # Analytics + maybe 1 more (no tracking bloat)
    maxSize: "30KB"        # combined gzipped
  
  Note: Phase 4 will enforce these limits in CI/CD. If budget exceeded, build fails.
```

### Deliverable 2.1b: Fluid Typography Strategy (Responsive Scaling)

Your 11.3 (Motion-rich) and 2.4 (Mixed audience) goals require seamless scaling across all screen sizes.

**Decision: Use CSS `clamp()` for typography** (fluid scaling instead of breakpoint-based)

```css
/* CSS Variables in globals.css or tokens.css */

/* Fluid Typography: scales smoothly from mobile to ultra-wide */
/* Formula: clamp(min-size, preferred-size, max-size) */

--font-size-h1: clamp(1.875rem, 5vw, 3.75rem);    /* 30px → 60px */
--font-size-h2: clamp(1.5rem, 4vw, 3rem);         /* 24px → 48px */
--font-size-h3: clamp(1.25rem, 3vw, 2rem);        /* 20px → 32px */
--font-size-h4: clamp(1.125rem, 2.5vw, 1.75rem);  /* 18px → 28px */
--font-size-body: clamp(1rem, 1.5vw, 1.125rem);   /* 16px → 18px */
--font-size-sm: clamp(0.875rem, 1.25vw, 1rem);    /* 14px → 16px */
```

**Why `clamp()` instead of breakpoints?**
- ✅ **No layout shift** on window resize (smooth UX for 11.3 motion-rich)
- ✅ **Fewer CSS rules** (no media queries for typography)
- ✅ **Better a11y** (12.1 accessibility): scales naturally from 16px+ on mobile to readable size on 4K
- ✅ **Responsive by design**: works on any screen size, not just predefined breakpoints

**Breakpoints still used for layout (grid, spacing):**
```yaml
Breakpoints:
  sm: "640px"   # Mobile
  md: "768px"   # Tablet
  lg: "1024px"  # Desktop
  xl: "1280px"  # Wide desktop
  2xl: "1536px" # Ultra-wide
```
Use breakpoints for grid columns, container padding, layout adjustments—not typography.

### Deliverable 2.2: Motion/Animation Principles

Since you chose 11.3 (Motion-rich), define when and how to use motion:

```markdown
# Motion Principles (11.3 Governance)

## When to animate
- **Page transitions:** Use slide/fade to maintain context
- **CTA buttons:** Subtle scale/color on hover (no spinning)
- **Scroll reveals:** Projects fade in as user scrolls
- **Form interactions:** Input focus glow, success checkmark
- **Micro-interactions:** Hover effects on project cards

## When NOT to animate
- **Every element:** Motion fatigue for users with reduced-motion preferences
- **Text heavy sections:** Don't distract from reading
- **Performance critical:** Skip on low-end devices or slow networks
- **Accessibility:** No auto-play animations, no flashing > 3 times per second

## Reduced-motion strategy
All animations respect CSS `prefers-reduced-motion`:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Library choice (Next.js + 11.3 constraint)
- **Framer Motion**: Use only for hero + case study animations (lazy-load with next/dynamic)
- **CSS/Tailwind**: Prefer for micro-interactions (button hover, focus states)
- **Goal:** Main bundle < 50KB (enforced in Phase 4)


---

## Task 3: Define Information Architecture & Navigation

### Why this?
Your 7.3 (Content hub + blog/case studies) and 2.4 (Mixed audience) require a strong IA so different visitors find what they need:
- **Recruiters:** Want projects + resume download
- **Clients:** Want case studies + services + contact
- **Technical peers:** Want blog + open-source links

### Deliverable 3.1: Page Tree & Navigation Map

Define all pages and routes that will exist on the site:

## URL Structure

### Root Pages
- `/` - Home (hero + featured projects + blog highlights + mixed audience entry points)
- `/about` - About page (bio + values + services if relevant)
- `/contact` - Contact page (form + social links)
- `/contact/success` - **Success page after form submission (1.2 Lead Gen)** → CTA to next steps (blog, projects)
- `/projects` - All projects listing (filterable by tech tag?)
- `/blog` - Blog index (posts by category, newest first)
- `/case-studies` - Case study index (if multiple projects become case studies)
- `/privacy` - Privacy policy + consent disclosure (10.1 analytics)
- `/404` - Not found page
- `/sitemap.xml` - Auto-generated

### Dynamic Pages (CMS/Markdown)
- `/projects/[slug]` - Individual project detail page
- `/blog/[slug]` - Individual blog post
- `/blog/[category]` - Category archive (e.g., /blog/engineering)
- `/case-studies/[slug]` - Individual case study

### Navigation Structure

**Main Nav (Desktop):**
```
Logo / Home  |  About  |  Projects  |  Blog  |  Contact
```

**Mobile Nav:**
```
Hamburger menu with same items
```

**Audience-specific entry points (Home page):**
```
[Hero with 3 CTAs]
  1. "View my work" → /projects (for clients/recruiters)
  2. "Read my thoughts" → /blog (for technical peers)
  3. "Let's collaborate" → /contact (for all)

[Featured Projects Section] → /projects full listing
[Latest Blog Posts] → /blog full listing
```

**Footer:**
```
- Quick Links: /about, /projects, /blog, /contact
- Social: LinkedIn, GitHub, Twitter, Email
- Legal: /privacy
```

---

## Task 3.2: Lead Success & Post-Submission Strategy

### Why this?
You have a contact form (Task 1) and conversion tracking plan (10.1 analytics), but no dedicated success experience. A success page is crucial for:
- **1.2 Lead Gen**: Clear conversion tracking (page view = definite conversion)
- **Re-engagement**: CTAs to blog/projects keep leads warm while they wait
- **Analytics**: Easier to measure contact_form_submit → contact_success_page_view funnel

### Deliverable 3.2: Lead Success Strategy

Define the post-submission flow and success experience:

# Lead Success & Post-Submission Flow

## Step 1: Form Submission
User submits contact form with name, email, message, projectType (optional), budget (optional).

**Event tracked (10.1):** `contact_form_submit` with properties:
- form_completion_time (seconds)
- projectType (if provided)
- budget (if provided)
- qualified: true/false (if both projectType + budget provided)

## Step 2: Server-Side Processing
1. Validate: email format, message length > 20 chars
2. Submit to Formspree/Basin (8.1 third-party form service)
3. Create contact record (for CRM in Phase 5+)
4. Send confirmation email to user
5. Redirect to `/contact/success`

## Step 3: Success Page Route (`/app/(marketing)/contact/success/page.tsx`)

**Content:**
- Headline: "Thanks for reaching out!"
- Subheadline: "I'll review your message and get back to you within 48 hours."
- Personalization (optional): Display their first name
- Next-step CTAs:
  - "Check out my latest writing" → /blog (engagement)
  - "See my recent work" → /projects (credibility building)
  - "Go back home" → / (exit option)

**Analytics Events:**
- `contact_success_page_view` (conversion confirmed)
- `post_conversion_cta_click` (track engagement after conversion)

**Design:**
- Positive visual: Checkmark icon, green accent color
- Motion: Subtle fade-in (respects 12.1 reduced-motion)
- Mobile: Full-width, simple layout (no distraction)

**Code Template:**
\`\`\`tsx
// app/(marketing)/contact/success/page.tsx
export default function ContactSuccess() {
  return (
    <main className="flex items-center justify-center min-h-screen px-4">
      <div className="text-center max-w-2xl">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
          <CheckIcon className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Thanks for reaching out!</h1>
        <p className="text-lg text-gray-600 mb-8">
          I'll review your message and get back to you within 48 hours.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button href="/blog" variant="primary">Check out my latest writing</Button>
          <Button href="/projects" variant="secondary">See my recent work</Button>
          <Button href="/" variant="ghost">Go back home</Button>
        </div>
      </div>
    </main>
  );
}
\`\`\`

## Step 4: Confirmation Email (Phase 5+)
Automated email sent to user:
- Subject: "I got your message"
- Body: Thank you message + timeline expectation + link to latest blog post
- Encourages: Review portfolio, read blog, visit case studies (re-engagement)
\`\`\`

---

## Task 4: Mixed-Audience Messaging Strategy (2.4)

### Why this?
You chose 2.4 (Mixed audience), so home page and nav must speak to multiple people:
- **Recruiters** scan for: skills, impact, projects
- **Clients** scan for: services, case studies, trust signals
- **Peers** scan for: technical depth, blog, open-source

### Deliverable 4.1: Messaging Matrix

```markdown
# Audience Messaging Strategy (2.4)

## Home Page Sections (Layered)

### Hero Section (First impression, all audiences)
**Headline:** "Designer & Engineer building creative digital products"
**Subheadline:** "I turn ideas into fast, accessible, beautiful experiences"
**CTAs (below fold):**
- Primary: "See my work" → /projects
- Secondary: "Read my blog" → /blog
- Tertiary: "Let's talk" → /contact

**Why:** Headline covers all audiences (design + engineering), CTAs let each self-select their path.

---

### Section 2: Featured Work (Recruiters + Clients)
**Title:** "Recent Projects"
**Content:** 3-4 featured projects (mix of personal + client work)
**For each project card:**
- Project image
- Title + brief description
- Tech stack tags
- Link to full project/case study
- Impact metric if available

**Why:** Recruiters see technical chops, clients see design quality.

---

### Section 3: Services/About Intro (Clients)
**Title:** "How I can help"
**Content:** 3 pillars (e.g., "Product Design", "Frontend Engineering", "Full-stack")
**CTA:** "Learn more" → /about

**Why:** Clients need to know what you offer; recruiters skip or scan.

---

### Section 4: Latest Writing (Peers)
**Title:** "Latest Articles"
**Content:** 3 most recent blog posts (title + excerpt + date + read time)
**CTA:** "Read all posts" → /blog

**Why:** Technical peers want to see depth of thinking; clients/recruiters may skip.

---

### Section 5: Social Proof (All audiences)
**Title:** "Recommended by:"
**Content:** Testimonials or logos (if you have them)
**OR** GitHub stars, speaking invites, or press mentions

**Why:** Trust signal for all audiences.

---

### Section 6: CTA Section (All audiences)
**Content:** "Ready to work together?" + contact form or email link
**Why:** Final conversion point.

---

## Task 5: Event Tracking & Conversion Events (10.1 Basic Analytics + Lead Gen)

### Why this?
Your 10.1 (Basic Analytics) choice means you need to know upfront what events matter. Phase 5 will implement tracking, but Phase 0 defines what to measure.

### Deliverable 5.0: Event Taxonomy

Define all conversion events and analytics tracking:

# Conversion Events (10.1 Basic Analytics)

## Lead Generation Events (1.2 Lead Gen goal)
- `contact_form_view`: User scrolls to contact form on home or /contact page
  - Properties: page_path, referrer
  - Goal: Know what brings people to inquiry

- `contact_form_start`: User clicks in first input field of contact form
  - Properties: form_id, page_path
  - Goal: Measure intent to engage

- `contact_form_submit`: User successfully submits contact form
  - Properties: projectType, budget, timeline (if captured)
  - Goal: Count qualified leads
  - **Lead qualification:** If projectType + budget provided = qualified

## Engagement Events (2.4 Mixed Audience)
- `cta_click`: User clicks any CTA button ("See my work", "Read blog", "Let's talk")
  - Properties: cta_text, button_location (hero, projects section, footer)
  - Goal: Understand audience self-selection paths

- `project_view`: User views individual project detail page
  - Properties: project_slug, referrer
  - Goal: Know which projects attract interest

- `blog_post_view`: User views individual blog post
  - Properties: post_slug, category, reading_time_estimate
  - Goal: Understand blog audience

- `case_study_view`: User views case study (if applicable)
  - Properties: case_study_slug, impact (metric from case study)
  - Goal: Track value-heavy content engagement

## Content Discovery Events (9.2 SEO + 7.3 Content Hub)
- `blog_category_filter`: User filters blog posts by category
  - Properties: category_selected ("design", "engineering", etc.)
  - Goal: Understand which topics resonate

- `search_internal`: User uses internal search (if added later)
  - Properties: search_query, results_found
  - Goal: Identify content gaps

## Social & Sharing Events
- `social_link_click`: User clicks LinkedIn/GitHub/Twitter/Email link
  - Properties: social_platform, page_path
  - Goal: Which platforms drive traffic

## Exit Events
- `page_exit`: User leaves site from a CTA or external link
  - Properties: exit_url, time_on_page
  - Goal: Identify drop-off points

---

## Implementation Details

**Analytics tool (Phase 5):** Google Analytics 4 or Plausible (privacy-friendly)

**No event tracking on:** Internal navigation (handled by GA page views)

**Privacy:** No PII in events (user's name/email only sent on successful form submit to CRM, not to GA)

---

## Deliverable 5.1: Analytics Consent & Privacy Strategy

Your 10.1 (Basic analytics) + 11.2 (Strict performance budget) require a careful choice: **Cookieless vs. Consent Banner**.

### Option A: Cookieless (Recommended for Phase 0)

**Tool:** Plausible Analytics or Fathom (GDPR-compliant by default)

**Setup:**
```tsx
// app/layout.tsx
<script defer data-domain="yoursite.com" src="https://plausible.io/js/script.js"></script>
```

**Pros:**
- ✅ No cookies, no consent needed (GDPR compliant)
- ✅ Minimal script weight: < 10KB (fits in 11.2 perf budget)
- ✅ Simple setup, no consent banner code
- ✅ Privacy-friendly for users

**Cons:**
- ⚠️ Less granular data than GA4 (basic page views + events only)
- ⚠️ Limited audience segmentation

**Performance Impact:** < 10KB (well within budget)

### Option B: GA4 + Consent Banner

**Tools:** Google Analytics 4 + Cookiebot/OneTrust

**Setup:**
```tsx
// Load GA4 only after user accepts consent
if (typeof window !== 'undefined' && window.cookieConsent === 'accepted') {
  <script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_ID');
  </script>
}
```

**Pros:**
- ✅ Advanced funnel analytics (GA4 Intelligence)
- ✅ Better audience segmentation
- ✅ Ecommerce tracking (if scaling later)

**Cons:**
- ⚠️ GA4 (~30KB) + consent banner (~20KB) = 50KB total = **eats entire 11.2 JS budget**
- ⚠️ Requires privacy policy + consent disclosure
- ⚠️ More complexity (banner management, cookie handling)

**Performance Impact:** 50KB (tight fit, reduces room for other scripts)

### Decision Matrix

| Criteria | Cookieless (Plausible) | GA4 + Consent |
|---|---|---|
| 11.2 Performance Budget | ✅ Fits (< 10KB) | ⚠️ Consumes (50KB) |
| 12.3 Privacy/Legal | ✅ GDPR-ready | ⚠️ Needs banner + policy |
| 10.1 Analytics Power | ⚠️ Basic insights | ✅ Advanced analytics |
| Setup Complexity | ⭐ Simple | ⭐⭐⭐ Complex |
| Cost | ~$10-15/mo | Free (GA4) + ~$200/mo (banner) |

### **Recommendation for Phase 0-8:**

Use **Plausible Analytics** (Option A):
- Respects performance constraints
- Privacy-friendly (GDPR compliant)
- Simple setup (no band-aids needed)
- Can upgrade to GA4 in Phase 9 if you need advanced analytics

### Privacy Policy Addition (`/privacy` route)

Add to your privacy page:
```markdown
## Analytics & Tracking

This website uses [Plausible Analytics](https://plausible.io) for privacy-friendly analytics.

**What we track:**
- Page views
- User engagement (time on page, scroll depth)
- Events (form submissions, CTA clicks)

**What we don't track:**
- Personal identifiable information (PII)
- Cookies
- Cross-site tracking

**Why Plausible?**
We chose Plausible because it respects your privacy. No cookies are set, and your data is not sold to third parties.

For more info: [Plausible Privacy Policy](https://plausible.io/privacy)
```

---

## Task 6: SEO Metadata Strategy (9.2 Advanced SEO)

### Why this?
Your 9.2 choice means structured data + keyword optimization from day 1. Don't leave it to the end.

### Deliverable 6.1: SEO Metadata Strategy

Define metadata, structured data, and keyword strategy for all pages:

## Page-Level Metadata

### Home Page
- **Title:** "Jane Doe | Product Designer & Engineer" (60 chars)
- **Meta Description:** "I design and build fast, accessible digital products. See my work, read my writing, and let's collaborate." (160 chars)
- **OG Image:** /images/og-home.jpg (1200x630px)
- **Canonical:** https://janedoe.com

### /projects
- **Title:** "Projects | Jane Doe Design" (60 chars)
- **Meta Description:** "Browse my recent product design and engineering projects. See case studies, impact metrics, and tech stack." (160 chars)
- **Canonical:** https://janedoe.com/projects

### /blog
- **Title:** "Blog | Jane Doe" (60 chars)
- **Meta Description:** "Articles on product design, engineering, and UX. Latest writing on..." (160 chars)
- **Canonical:** https://janedoe.com/blog

### /blog/[slug] (dynamic)
- **Title:** "{Post Title} | Jane Doe Blog" (< 60 chars)
- **Meta Description:** "{Post excerpt}" (< 160 chars)
- **OG Image:** {Post cover image}
- **Canonical:** https://janedoe.com/blog/{slug}
- **Published Date:** `<meta property="article:published_time" content="{ISO date}" />`
- **Author:** `<meta property="article:author" content="{Author name}" />`

---

## Structured Data (JSON-LD)

### Personal Website Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Jane Doe",
  "title": "Product Designer & Engineer",
  "url": "https://janedoe.com",
  "image": "https://janedoe.com/images/jane.jpg",
  "description": "Building fast, accessible digital products",
  "sameAs": [
    "https://linkedin.com/in/janedoe",
    "https://github.com/janedoe",
    "https://twitter.com/janedoe"
  ],
  "contact": {
    "@type": "ContactPoint",
    "contactType": "General",
    "email": "jane@example.com"
  }
}
```

### Project/Portfolio Item Schema
```json
{
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "Project Title",
  "description": "Project description",
  "image": "https://janedoe.com/images/project.jpg",
  "creator": {
    "@type": "Person",
    "name": "Jane Doe"
  },
  "dateCreated": "2026-01-15",
  "url": "https://janedoe.com/projects/project-slug"
}
```

### Blog Post Schema
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Article Title",
  "description": "Article excerpt",
  "image": "https://janedoe.com/images/article.jpg",
  "datePublished": "2026-05-04",
  "author": {
    "@type": "Person",
    "name": "Jane Doe"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://janedoe.com/blog/article-slug"
  }
}
```

---

## Keyword Strategy

### Target Keywords (by intent)
- **Brand awareness:** "Jane Doe designer", "Jane Doe engineer"
- **Portfolio visibility:** "design portfolio", "product design portfolio", "engineering portfolio"
- **Blog visibility:** "design thinking", "frontend performance", "UX research"
- **Service search** (if relevant): "product design services", "frontend development"

### Internal Linking Strategy
- Every blog post should link to 2-3 relevant projects
- Every project should link to 1-2 related blog posts
- Category pages (/blog/engineering) link to all posts in that category
- Goal: Keep users on site longer, spread link equity

---

## Sitemap & Robots
- Auto-generate sitemap.xml in Next.js (Phase 1)
- robots.txt should allow all + point to sitemap
- Submit to Google Search Console + Bing Webmaster Tools (Phase 8)
```

---

## Task 8: Define Next.js Folder Structure (5.1 App Router + 6.4 Design System)

### Why this?
Your 5.1 (Next.js App Router) + 6.4 (Design System First) decisions require a folder structure that:
- Makes design system reuse effortless (components organized by role)
- Separates concerns (pages, components, content, styles)
- Supports 3.4 (hybrid) and 4.2 (ISR) patterns cleanly
- Prepares for Phase 1 scaffolding

### Deliverable 8.1: Next.js Folder Structure

Define the folder layout and component organization that will be used in Phase 1:

## High-Level Overview
\`\`\`
portfolio/
├── src/
│   ├── app/              # App Router routes (replaces pages/)
│   ├── components/       # React components (atoms → molecules)
│   ├── content/          # Static markdown/MDX files (3.4 hybrid static content)
│   ├── lib/              # Utilities, helpers, data fetching
│   ├── styles/           # Global CSS, Tailwind config, design tokens
│   ├── types/            # TypeScript types (shared across project)
│   └── hooks/            # Custom React hooks
├── public/               # Static assets (images, fonts, favicons)
├── docs/                 # Phase 0 deliverables (CONTENT_TAXONOMY.md, DESIGN_TOKENS.md, etc.)
├── .github/workflows/    # CI/CD (GitHub Actions for linting, testing, Lighthouse)
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.js
└── README.md
\`\`\`

---

## Detailed Folder Breakdown

### src/app/ (Routes)
\`\`\`
src/app/
├── layout.tsx                   # Root layout (nav, footer)
├── page.tsx                     # Home page
├── (marketing)/
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   └── privacy/page.tsx
├── (projects)/
│   ├── projects/page.tsx        # Projects listing
│   ├── projects/[slug]/
│   │   └── page.tsx             # Individual project detail
│   └── case-studies/
│       ├── page.tsx             # Case studies listing
│       └── [slug]/page.tsx      # Individual case study
├── (blog)/
│   ├── blog/page.tsx            # Blog index
│   ├── blog/[slug]/page.tsx     # Individual blog post
│   └── blog/[category]/page.tsx # Category archive (optional)
└── not-found.tsx                # Custom 404 page
\`\`\`

**Route Groups** (parentheses) organize routes logically without affecting URLs:
- `(marketing)`: Static pages (About, Contact, Privacy)
- `(projects)`: Project content (3.4 hybrid + dynamic routes from CMS/MDX)
- `(blog)`: Blog content (7.3 content hub)

---

### src/components/ (Design System Primitives)
\`\`\`
src/components/
├── ui/                           # Base design system components (from tokens)
│   ├── Button/
│   │   ├── Button.tsx            # Primary component
│   │   ├── Button.module.css     # Scoped styles (or tailwind classes)
│   │   ├── Button.types.ts       # Props interface
│   │   └── Button.test.tsx       # Unit tests (Phase 13)
│   ├── Heading/
│   ├── Text/
│   ├── Link/
│   ├── Input/
│   ├── TextArea/
│   ├── Tag/
│   ├── Badge/
│   └── ... (all primitive components)
│
├── layout/                       # Layout components (reusable across pages)
│   ├── Navigation/
│   ├── Footer/
│   ├── SectionContainer/
│   └── Grid/
│
└── modules/                      # Composed sections (molecules + layout)
    ├── HeroSection/              # Home hero (11.3 motion-rich)
    ├── ProjectCard/              # Project preview (2.4 mixed audience data)
    ├── BlogPostCard/             # Blog preview
    ├── CaseStudyShowcase/
    ├── ContactForm/              # Form (8.1 third-party integration)
    ├── FeaturedProjects/         # Home section (composed of ProjectCard + Grid)
    ├── LatestBlogPosts/          # Home section
    └── SocialProof/              # Home section
\`\`\`

**Organization principle (6.4 Design System):**
- `ui/`: Reusable primitives (Button, Text, Input) → 100% token-driven
- `layout/`: Structural containers (Nav, Footer) → compose ui/ components
- `modules/`: Page sections (Hero, ProjectCard) → compose ui/ + layout/

This creates a clear **hierarchy of reusability**.

---

### src/content/ (Static Markdown/MDX)
\`\`\`
src/content/
├── projects/                  # Static projects (if not all in CMS)
│   ├── project-1.mdx
│   ├── project-2.mdx
│   └── ...
├── blog/                      # Blog posts (Git-based, 3.4 hybrid)
│   ├── 2026-05-04-first-post.mdx
│   ├── 2026-05-05-second-post.mdx
│   └── ...
└── config.ts                  # Content metadata (frontmatter schema)
\`\`\`

**3.4 Hybrid pattern:** Static content (markdown) for blogs, projects. Dynamic CMS content added in Phase 3.

---

### src/styles/ (Design Tokens)
\`\`\`
src/styles/
├── globals.css               # Global resets, tailwind @layer directives
├── tokens.css                # Design tokens as CSS variables
│                             # (maps DESIGN_TOKENS.md to :root variables)
├── animations.css            # Motion definitions (11.3 governance)
├── accessibility.css         # Accessibility-specific styles (12.1)
│                             # (focus states, reduced-motion, etc.)
└── tailwind.config.js        # Tailwind extends with token colors/spacing
\`\`\`

**Design tokens live here** as CSS variables so components access them consistently.

Example (\`tokens.css\`):
\`\`\`css
:root {
  /* Colors (from DESIGN_TOKENS.md) */
  --color-primary-500: #4a7aff;
  --color-neutral-900: #111827;
  
  /* Spacing */
  --spacing-1: 0.25rem;
  --spacing-4: 1rem;
  
  /* Focus (12.1 a11y) */
  --focus-ring: 2px solid var(--color-primary-500);
  --focus-offset: 2px;
  
  /* Motion */
  --duration-normal: 300ms;
  --easing-out: cubic-bezier(0, 0, 0.2, 1);
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --duration-normal: 0.01ms;
  }
}
\`\`\`

---

### src/lib/ (Utilities & Data Fetching)
\`\`\`
src/lib/
├── content.ts              # Fetch logic for blog/projects (3.4 hybrid + 4.2 ISR)
├── seo.ts                  # SEO metadata helpers (9.2)
├── analytics.ts            # Event tracking setup (10.1)
├── api/                    # CMS API clients (Phase 3)
│   └── sanity.ts           # Example: Sanity CMS client
└── utils/
    ├── cn.ts               # Classname helper (Tailwind merge)
    └── slugify.ts          # URL slug generation
\`\`\`

---

### src/types/ (TypeScript Definitions)
\`\`\`
src/types/
├── content.ts              # Maps to CONTENT_TAXONOMY.md
│                           # (Project, BlogPost, CaseStudy interfaces)
├── seo.ts                  # Meta/OG types (9.2)
└── events.ts               # Analytics event types (10.1)
\`\`\`

---

### public/ (Static Assets)
\`\`\`
public/
├── images/
│   ├── og/                 # OG images (1200x630px)
│   ├── projects/           # Project hero images
│   └── blog/               # Blog post covers
├── fonts/                  # Custom fonts (Poppins, Fira Code)
└── favicon.ico
\`\`\`

---

## Why This Structure?

| Decision | How Structure Supports It |
|---|---|
| 6.4 Design System First | `ui/` → `layout/` → `modules/` hierarchy ensures token reuse |
| 3.4 Hybrid (static + CMS) | `src/content/` for markdown; Phase 3 CMS data fetches via `src/lib/` |
| 4.2 ISR + Dynamic routes | `[slug]` patterns in `app/` enable `getStaticProps` + `revalidate` |
| 5.1 Next.js App Router | Route groups `(marketing)`, `(projects)`, `(blog)` organize without URL impact |
| 12.1 WCAG AA | Accessibility tokens in `styles/accessibility.css` + Focus components in `ui/` |
| 11.3 Motion-rich | Motion definitions in `styles/animations.css`, tested in `modules/` |
| 13.2 Automated essentials | `.test.tsx` files colocated with components for easy test discovery |

\`\`\`

---

## Task 9: Base Component List & Code Standards (6.4 + 13.2)

### Why this?
Before Phase 1 scaffolding, lock in:
- What components you'll build (the "LEGO bricks")
- How to name/organize them (consistency for 13.2 automated testing)
- How to structure code for maintainability

### Deliverable 9.1: Base Component Inventory

List all UI primitives, layout components, and page-level modules that will be built:

## UI Primitives (src/components/ui/)
Built directly from DESIGN_TOKENS.md. All token-driven.

### Layout Primitives
- [ ] **Container**: Max-width wrapper with padding
- [ ] **Stack**: Flex column with spacing (replaces margin hell)
- [ ] **Grid**: CSS Grid for layouts (projects, blog index)
- [ ] **Spacer**: Vertical/horizontal spacing component

### Typography
- [ ] **Heading** (H1-H4): Maps to font-size tokens
  - Variants: h1, h2, h3, h4
  - Props: as (override tag), className
- [ ] **Text**: Body text
  - Variants: base, sm, lg
  - Props: color (from tokens), weight, line-height
- [ ] **Link**: Anchor with token colors + focus ring (12.1 a11y)

### Forms
- [ ] **Input**: Text/email/number input
  - Props: placeholder, required, disabled, focus (12.1)
  - States: default, focused, error, disabled
- [ ] **TextArea**: Multi-line input
- [ ] **Label**: Associated with form fields (a11y)
- [ ] **Button**: Primary action
  - Variants: primary, secondary, ghost
  - Sizes: sm, md, lg (from spacing tokens)
  - States: default, hover, focus (12.1), active, disabled
  - Props: disabled, loading (skeleton for 4.2 ISR loading states)

### Data Display
- [ ] **Badge**: Small label (tech tags, status)
- [ ] **Tag**: Filterable tag (blog categories, tech stack)
  - Props: onClick for filter (10.1 event tracking)
- [ ] **Card**: Container for content blocks
- [ ] **Image**: Next.js Image component wrapper
  - Props: src, alt (a11y), width, height (required for optimization)

---

## Layout Components (src/components/layout/)
Compose UI primitives into page structures.

- [ ] **Navigation**: Header + nav menu
  - States: mobile (hamburger), desktop
  - A11y: aria-current for active link (12.1)
  - Motion: Smooth transitions (11.3) + reduced-motion (12.1)
- [ ] **Footer**: Links, social, legal
- [ ] **SectionContainer**: Max-width + padding wrapper for page sections
- [ ] **PageHeader**: Section title + description (reuse across /projects, /blog, /about)

---

## Module Components (src/components/modules/)
Composed sections from UI + Layout. These are **page-level sections**.

### Home Page
- [ ] **HeroSection**: Hero with headline, subheadline, CTAs
  - Motion: Fade-in + optional entrance animation (11.3, respects 12.1)
  - Audience: 3 CTAs for mixed audience (2.4) → track cta_click (10.1)
- [ ] **FeaturedProjects**: Grid of 3-4 featured projects
  - Composed of: Grid + ProjectCard
- [ ] **LatestBlogPosts**: 3 recent blog posts
  - Composed of: Grid + BlogPostCard
- [ ] **ServicesSection**: "How I can help" (for 2.2 client audience)
- [ ] **SocialProofSection**: Testimonials or social metrics

### Reusable Cards
- [ ] **ProjectCard**: Project preview (links to /projects/[slug])
  - Shows: image, title, description, tech tags, impact metric
  - Motion: Hover scale (11.3) + focus ring (12.1 keyboard nav)
  - Data: Maps to Project schema (CONTENT_TAXONOMY.md)
  - Metadata: githubUrl, demoUrl for 2.3 technical peers
- [ ] **BlogPostCard**: Blog preview
  - Shows: cover image, title, excerpt, category, date, read time
  - Data: Maps to BlogPost schema
- [ ] **CaseStudyCard**: Case study preview
  - Shows: hero image, title, headline, client, impact

### Specialized
- [ ] **ContactForm**: Lead capture form (8.1 + 1.2 lead gen)
  - Fields: name, email, message, projectType, budget, timeline
  - Validation: Email format, min message length
  - Success state: Confirmation message + cta (10.1 conversion tracking)
  - Integration: Submit to Formspree/Basin (Phase 5)
- [ ] **LoadingSkeleton**: Placeholder during data fetch (4.2 ISR loading)
  - Used in: /projects/[slug], /blog/[slug] dynamic routes
- [ ] **ErrorBoundary**: Graceful error display
  - CTA: "Go back home" + link to / (recovery path)

---

## Component Status Tracking

| Component | Phase Built | Tested | Exported |
|---|---|---|---|
| Button | 2 | 6 | ✓ |
| Heading | 2 | 6 | ✓ |
| Navigation | 2 | 6 | ✓ |
| ProjectCard | 2 | 6 | ✓ |
| HeroSection | 2 | 6 | ✓ |
| ... | ... | ... | ... |

\`\`\`

---

### Deliverable 9.2: Code Standards & File Naming

Define naming conventions, git workflow, and development patterns:

## File Naming

### Components
- **PascalCase** for component files: \`Button.tsx\`, \`ProjectCard.tsx\`
- **Folder per component** (colocation pattern):
  \`\`\`
  src/components/ui/Button/
  ├── Button.tsx              # Component
  ├── Button.types.ts         # Props interface
  ├── Button.module.css       # Scoped styles (optional if using tailwind)
  ├── Button.test.tsx         # Unit tests
  └── index.ts                # Export
  \`\`\`
- **index.ts** in each folder for clean imports:
  \`\`\`tsx
  // In src/components/ui/Button/index.ts
  export { Button } from './Button';
  export type { ButtonProps } from './Button.types';
  \`\`\`

### Pages & Routes
- **kebab-case** for route folders: \`/projects\`, \`/blog\`, \`/case-studies\`
- **page.tsx** for route components (Next.js convention)
- **layout.tsx** for shared layouts

### Content
- **kebab-case** for markdown files: \`2026-05-04-first-post.mdx\`, \`project-name.mdx\`

### Utilities
- **camelCase** for utility functions: \`cn.ts\`, \`slugify.ts\`, \`fetchContent.ts\`

---

## Component Props Interface Pattern

\`\`\`tsx
// Button.types.ts
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  asChild?: boolean;
}

// Button.tsx
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', ...props }, ref) => {
    return <button ref={ref} {...props} />;
  }
);
Button.displayName = 'Button';
\`\`\`

---

## Git Workflow & Commit Conventions

### Branch Naming
- **feat/**: New features → \`feat/contact-form\`, \`feat/blog-section\`
- **fix/**: Bug fixes → \`fix/lighthouse-score\`
- **docs/**: Documentation → \`docs/component-patterns\`
- **refactor/**: Code cleanup → \`refactor/button-component\`
- **test/**: Adding tests → \`test/button-unit-tests\`
- **perf/**: Performance → \`perf/image-optimization\`

### Commit Messages
\`\`\`
feat(components): add Button component with focus ring (a11y)

- Implement Button.tsx with primary/secondary/ghost variants
- Add focus ring token for WCAG AA compliance
- Add unit tests for all variants

Closes #123
\`\`\`

**Format:** \`<type>(<scope>): <message>\`

Types:
- \`feat\`: New feature
- \`fix\`: Bug fix
- \`docs\`: Documentation
- \`refactor\`: Code refactoring
- \`test\`: Test additions
- \`perf\`: Performance improvements
- \`style\`: Code style (formatting, etc.)

---

## Image Asset Naming & Optimization (9.2 SEO + 11.2 Performance)

### Naming Convention: SEO-Friendly Descriptive Names

**Format:** \`{page}-{section}-{description}-{width}.{format}\`

**Examples:**
- \`home-hero-portrait-1200.webp\` (hero image on home page)
- \`projects-card-nextjs-dashboard-600.webp\` (project card thumbnail)
- \`blog-post-architecture-pattern-800.webp\` (blog post featured image)
- \`about-team-jane-doe-400.webp\` (about page team photo)

**Why?**
- ✅ **SEO ranking**: Google gives ranking boost for descriptive filenames (9.2)
- ✅ **Maintainability**: Clear naming = easy to find in \`/public/images/\` folder
- ✅ **Accessibility**: Descriptive names help with alt text generation
- ✅ **Collaboration**: Team members understand image purpose at a glance

### Directory Structure

\`\`\`
public/
├── images/
│   ├── home/
│   │   ├── hero-portrait-1200.webp
│   │   ├── featured-projects-hero-800.webp
│   ├── projects/
│   │   ├── project-1-thumbnail-600.webp
│   │   ├── project-1-hero-1200.webp
│   │   └── project-2-thumbnail-600.webp
│   ├── blog/
│   │   ├── post-1-featured-800.webp
│   │   ├── post-1-diagram-600.webp
│   ├── about/
│   │   ├── profile-photo-400.webp
│   └── og/
│       ├── home-og-1200x630.webp
│       ├── blog-post-og-1200x630.webp
\`\`\`

### Multiple Width Export Strategy

Export each image in 3 widths for Next.js responsive \`srcset\`:
- **600w**: Mobile + tablet (small displays)
- **800w**: Tablet + desktop (medium displays)
- **1200w**: Desktop + ultra-wide (large displays)

**Why:** Reduces image download size on mobile (improves LCP for 11.2 perf budget).

\`\`\`tsx
// Usage with Next.js Image component
<Image
  src="/images/projects/project-1-thumbnail"
  alt="Project thumbnail"
  width={1200}
  height={800}
  sizes="(max-width: 600px) 100vw,
         (max-width: 1200px) 50vw,
         1200px"
  priority={false}
/>

// Next.js automatically generates srcset with .webp:
// <img 
//   src="/_next/image?url=%2Fimages%2F...&w=600&q=75"
//   srcset="/_next/image?...&w=600... 600w,
//           /_next/image?...&w=1200... 1200w"
// />
\`\`\`

### File Formats

- **Primary:** \`.webp\` (modern browsers, smaller file size)
- **Fallback:** \`.jpg\` (older browser compatibility)
- **Next.js Image** handles format detection and serves optimal format

### Performance Constraints (11.2 Hard Budget)

- Max per image: **200KB**
- Max hero image: **150KB** (aggressive compression)
- All images must be < 150KB (measured in Lighthouse audit)

**Tools for compression:**
- \`ImageOptim\` (Mac) or \`FileOptimizer\` (Windows)
- \`TinyPNG\` / \`TinyJPG\` (online)
- Vercel Image Optimization (auto-handles via Next.js)

---

## TypeScript Conventions

- Use **strict mode** (\`strict: true\` in tsconfig.json)
- Export types alongside components:
  \`\`\`tsx
  export { Button } from './Button';
  export type { ButtonProps } from './Button.types';
  \`\`\`
- Use **\`interface\`** for component props, **\`type\`** for utility types

---

## Accessibility & Motion (12.1 + 11.3)

### Keyboard Navigation
- All interactive elements must be focusable (buttons, links, inputs)
- Focus ring must be visible (2px solid token color from DESIGN_TOKENS.md)
- Tab order must be logical (test with screen reader in Phase 6)

### Motion Implementation
\`\`\`tsx
// Respect prefers-reduced-motion
@media (prefers-reduced-motion: reduce) {
  .animate-in {
    animation: none;
    transition: none;
  }
}
\`\`\`

### Semantic HTML
- Use \`<button>\` for actions (not \`<div onclick>\`)
- Use \`<a>\` for navigation
- Use \`<label>\` with form inputs
- Use heading hierarchy (h1 → h2 → h3)

---

## Testing Conventions (13.2 Automated Essentials)

### File Placement
- Tests live next to components: \`Button.test.tsx\`
- Use **Vitest** or **Jest** for unit tests
- Use **Playwright** or **Cypress** for e2e tests (Phase 6+)

### Test Naming
\`\`\`tsx
describe('Button', () => {
  it('should render with primary variant', () => {
    // Test
  });

  it('should be keyboard accessible (12.1)', () => {
    // Test focus ring + keyboard nav
  });

  it('should respect prefers-reduced-motion (11.3)', () => {
    // Test that animations disable
  });
});
\`\`\`

\`\`\`

---

## Task 10: Fallback & Error Handling Strategy (4.2 ISR + 11.3 Motion)

### Why this?
ISR (4.2) dynamic routes fail occasionally. You need graceful fallbacks so users don't see broken pages.

### Deliverable 10.1: Error & Loading States

Define error pages, loading states, and ISR fallback strategy:

# Error & Loading States (4.2 ISR + 11.3 UX)

## Loading States (During ISR Revalidation)

### Dynamic Routes: /projects/[slug], /blog/[slug]

**When:** Data fetching during ISR revalidation

**UI:** Skeleton loaders (avoid jarring layout shift from 11.3 motion)
\`\`\`tsx
// src/components/ProjectCardSkeleton.tsx
export const ProjectCardSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-80 bg-neutral-200 rounded-lg" />
    <div className="h-6 bg-neutral-200 mt-4" />
    <div className="h-4 bg-neutral-200 mt-2" />
  </div>
);
\`\`\`

**Motion:** Skeleton pulse animation respects \`prefers-reduced-motion\` (12.1)

---

## Error States (Failed Data Fetch)

### 404 - Not Found (Page Doesn't Exist)

**Route:** \`app/not-found.tsx\`

**UI:**
- Headline: "Page not found"
- Subheadline: "The page you're looking for doesn't exist."
- CTA: 3 audience-specific buttons
  - "View my work" → /projects (for clients/recruiters)
  - "Read my blog" → /blog (for technical peers)
  - "Get in touch" → /contact (for all)
- Optional: Suggest related content based on referrer

**Code:**
\`\`\`tsx
export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <div className="flex gap-4 justify-center mt-8">
        <Button href="/projects">View My Work</Button>
        <Button href="/blog" variant="secondary">Read My Blog</Button>
        <Button href="/contact" variant="ghost">Get In Touch</Button>
      </div>
    </div>
  );
}
\`\`\`

---

### 500 - Server Error (ISR Revalidation Failed)

**Route:** \`app/error.tsx\` (Next.js error boundary)

**UI:**
- Headline: "Something went wrong"
- Subheadline: "We're working on fixing this. Try refreshing the page."
- CTA: "Go Home" button
- Optional: Email link to report error

**Code:**
\`\`\`tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="text-center py-20">
      <h1>Something Went Wrong</h1>
      <p>{error.message || 'An unexpected error occurred.'}</p>
      <div className="flex gap-4 justify-center mt-8">
        <Button onClick={() => reset()}>Try Again</Button>
        <Button href="/" variant="secondary">Go Home</Button>
      </div>
    </div>
  );
}
\`\`\`

---

## Dynamic Route Strategies (4.2 ISR)

### Blog Post Not Found: /blog/[slug]
- User clicks old/broken link
- Catches 404 in CMS query (no data returned)
- **Fallback:** Render not-found.tsx with recovery CTAs (audience-specific)
- **Event:** Log 404_blog_post event for analytics (10.1)

### Project Not Found: /projects/[slug]
- Same pattern as blog
- **Event:** Log 404_project event

---

## Revalidation Failure (ISR Stale Content)

**Scenario:** CMS webhook fails, page doesn't revalidate, shows stale content

**Mitigation (Phase 1):**
- Set ISR \`revalidate\` timeout to 3600 (1 hour)
- Fallback: Always show cached version (user sees stale but site stays up)
- Phase 5: Add monitoring to detect revalidation failures

**Code:**
\`\`\`tsx
export const revalidate = 3600; // Revalidate every 1 hour

export default async function BlogPost({ params }: { params: { slug: string } }) {
  try {
    const post = await fetchPost(params.slug);
    return <BlogPostDetail post={post} />;
  } catch (error) {
    // ISR failed, but cached version should exist
    return notFound();
  }
}
\`\`\`

---

## Testing Error States (13.2 Testing)

| Error Type | Test | Tool |
|---|---|---|
| 404 page rendering | Verify not-found.tsx loads | Vitest |
| Error boundary | Trigger error, verify recovery | Vitest |
| Skeleton animation | Verify reduced-motion respected | Vitest |
| Event tracking | Log 404/error event | Analytics test (Phase 5) |

\`\`\`

---

## Task 11: Environment Variables & Secrets Management

### Why this?
Phase 1 scaffolding requires API keys, form endpoints, and CMS credentials. Document them now to prevent setup delays.

### Deliverable 11.1: Environment Variable Schema

Define all environment variables and secrets configuration:

# Environment Variables & Secrets Schema

## Overview

Environment variables are separated into:
- **Public** (prefixed \`NEXT_PUBLIC_\`): Safe to expose in browser
- **Private** (no prefix): Server-side only, never exposed to browser

## Setup Instructions

### Local Development

1. Create \`.env.local\` in project root (git-ignored):
   \`\`\`bash
   # .env.local (NEVER commit this file)
   NEXT_PUBLIC_ANALYTICS_ID=your-plausible-domain
   NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/YOUR_ID
   NEXT_PUBLIC_CMS_PROJECT_ID=your_sanity_project_id
   CMS_API_TOKEN=your_api_token_here
   \`\`\`

2. Create \`.env.example\` in project root (safe to commit):
   \`\`\`bash
   # .env.example (template for team/docs)
   NEXT_PUBLIC_ANALYTICS_ID=your-domain
   NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/FORM_ID
   NEXT_PUBLIC_CMS_PROJECT_ID=PROJECT_ID
   CMS_API_TOKEN=API_TOKEN_HERE
   \`\`\`

### Vercel Deployment

Add in **Project Settings → Environment Variables**:
- Different values for each deployment environment (Production, Preview, Development)
- Never commit secrets to git

## Required Variables

### Analytics (10.1 Basic Analytics)

\`NEXT_PUBLIC_ANALYTICS_ID\`
- **Type:** Public (exposed in browser)
- **Used in:** \`src/lib/analytics.ts\`
- **Example:** \`my-domain.com\` (for Plausible) or \`G-XXXX\` (for GA4)
- **Tool:** Plausible Analytics (recommended) or Google Analytics 4
- **Description:** Tracking ID for analytics service

### Contact Form (8.1 Third-party Forms)

\`NEXT_PUBLIC_FORM_ENDPOINT\`
- **Type:** Public
- **Used in:** \`src/components/modules/ContactForm/ContactForm.tsx\`
- **Example:** \`https://formspree.io/f/xyzabc123\` or \`https://api.basin.io/v1/basins/xyz\`
- **Tool:** Formspree or Basin
- **Description:** API endpoint for form submissions

### CMS (Phase 3 - Pre-plan now)

\`NEXT_PUBLIC_CMS_PROJECT_ID\`
- **Type:** Public
- **Used in:** \`src/lib/api/sanity.ts\`
- **Example:** \`abc1234\` (Sanity project ID)
- **Description:** CMS project identifier

\`NEXT_PUBLIC_CMS_DATASET\`
- **Type:** Public
- **Used in:** \`src/lib/api/sanity.ts\`
- **Default:** \`production\`
- **Options:** \`development\`, \`staging\`, \`production\`
- **Description:** CMS dataset to query

\`CMS_API_TOKEN\`
- **Type:** Private (server-side only)
- **Used in:** \`src/lib/api/sanity.ts\` (preview mode)
- **Description:** CMS API token for authenticated requests

### Email/SMTP (Phase 5+ - Pre-plan now)

\`SMTP_HOST\`
- **Example:** \`smtp.sendgrid.net\`

\`SMTP_PORT\`
- **Example:** \`587\`

\`SMTP_USER\`
- **Example:** \`apikey\`

\`SMTP_PASS\`
- **Type:** Private
- **Example:** \`SG.xxxxx...\` (SendGrid API key)

## Environment-Specific Values

| Variable | Development | Preview | Production |
|---|---|---|---|
| NEXT_PUBLIC_ANALYTICS_ID | localhost | staging.plausible.io | mydomain.com |
| NEXT_PUBLIC_FORM_ENDPOINT | test_form_id | staging_form_id | prod_form_id |
| NEXT_PUBLIC_CMS_PROJECT_ID | dev_project | staging_project | prod_project |
| NEXT_PUBLIC_CMS_DATASET | development | staging | production |
| CMS_API_TOKEN | dev_token | staging_token | prod_token |

## Security Best Practices

1. ✅ **Never commit \`.env.local\`** (add to \`.gitignore\`)
2. ✅ **Use \`.env.example\`** for team reference
3. ✅ **Rotate API keys** quarterly
4. ✅ **Use Vercel secrets** for production (not local .env files)
5. ✅ **Different tokens per environment** (dev vs staging vs production)
6. ✅ **Scope permissions** (CMS token read-only for public API, write for preview)
7. ✅ **Monitor key usage** (SendGrid, Sanity dashboards)

## .gitignore

Add to \`.gitignore\`:
\`\`\`
.env.local
.env.*.local
.DS_Store
node_modules/
\`\`\`

---

## Task 12: Draft Copy for Phase 7 Launch (Value Proposition & About Me)

### Why this now?
Phase 7 (Content Refinement) blocks on writing work. Draft the core copy in Phase 0 so you don't scramble for copy when you're building. This also ensures messaging is consistent with the mixed-audience strategy (2.4) and lead gen funnel (1.2).

### Deliverable 12.1: Value Proposition Draft

**Working Headline Options:**
1. "Building thoughtful digital experiences that balance clarity, motion, and performance."
2. "I design and build portfolio experiences that turn visitors into conversations."
3. "I create fast, accessible portfolio sites that showcase work and generate leads."

**Supporting Subheadline Options:**
1. "Focused on mixed audiences: recruiters, clients, and technical peers."
2. "Designed with a design-system-first workflow, privacy-aware analytics, and conversion intent."
3. "Built to scale from static content to CMS-driven publishing without rework."

**Short Bio Snippet:**
I build portfolio sites that are visually deliberate, technically disciplined, and easy to maintain. My work balances strong storytelling, accessibility, and performance so the site can support both credibility and lead generation.

---

### Deliverable 12.2: About Me Narrative Draft

**Structure:**
1. What I do (opening hook)
2. Why I do it (philosophy/values)
3. What makes my work different (competitive angle)
4. What kind of projects I want to take on (CTA framing)

**Draft Paragraph:**
I build digital experiences with a focus on clarity, craft, and measurable outcomes. My approach blends design systems, front-end engineering, and content strategy so the final product feels polished without sacrificing performance or accessibility. I care about sites that communicate well to multiple audiences, load quickly, and make it easy for the right people to get in touch.

**Talking Points:**
- I value maintainable architecture over one-off visual tricks.
- I prefer systems that support future content growth without rework.
- I care about responsiveness, accessibility, and intentional motion (respects prefers-reduced-motion).
- I want the site to serve both reputation and conversion goals (mixed audience 2.4).
- Performance is non-negotiable: fast sites are respectful sites (11.2 budget).

---

### Deliverable 12.3: Phase 7 Content Checklist

**Core Copy** (home + about pages)
- [ ] Finalize home hero headline (pick from working options above)
- [ ] Finalize home hero subheadline
- [ ] Finalize short bio snippet (use or refine the draft)
- [ ] Finalize About page opening paragraph
- [ ] Finalize About page closing CTA (link to contact or projects)

**Case Studies** (3 required by Phase 7)
- [ ] Draft 3 case study outlines
- [ ] Define challenge / solution / impact sections for each
- [ ] List required visuals or diagrams for each case study
- [ ] Identify metrics or outcomes for each case study

**Blog Posts** (3 required by Phase 7)
- [ ] Draft 3 blog post titles
- [ ] Draft 3 blog post summaries (150-char excerpts)
- [ ] Decide which post is best for launch timing
- [ ] Map each post to one audience segment (recruiters, clients, or peers)

**Conversion Copy** (forms + success pages)
- [ ] Draft contact page CTA copy and form instructions
- [ ] Draft success page headline + subheadline + next-step CTAs
- [ ] Draft email confirmation message (Phase 5+)
- [ ] Review tone for mixed-audience clarity (2.4)

**Final Review** (polish)
- [ ] Check copy against value proposition (is it consistent?)
- [ ] Check copy against mixed-audience messaging (does each section serve all audiences?)
- [ ] Check copy against SEO keyword targets (9.2)
- [ ] Proofread for tone, grammar, and voice consistency

---

### Messaging Alignment

Ensure Phase 7 copy aligns with Phase 0 decisions:
- **Hero section** addresses all 3 audiences with layered CTAs
- **About page** reinforces value prop from multiple angles (credibility + technical depth + conversion readiness)
- **Case studies** show concrete outcomes (measurable impact for clients, technical depth for peers)
- **Blog posts** demonstrate thought leadership and SEO authority
- **Contact form & success page** complete the lead gen funnel with clear next steps

---

## Implementation Timeline

- **Phase 1:** Initialize .env.local + .env.example, add Plausible analytics ID
- **Phase 2:** Add form endpoint (when ContactForm is built)
- **Phase 3:** Add CMS credentials (when CMS integration starts)
- **Phase 5:** Add SMTP credentials (when email automation is added)
\`\`\`

---

## Task 7: Create Phase 0 Completion Checklist

### Deliverable 7.1: Phase 0 Completion Checklist

Track completion of all Phase 0 deliverables and validation tasks:

\`\`\`markdown
# Phase 0 Completion Checklist

## Content Model ✓
- [ ] Blog post schema defined (fields: title, slug, body, category, tags, date, image)
- [ ] Project card schema defined (fields: title, description, image, tags, link, featured, **githubUrl, demoUrl, techStackDepth**)
- [ ] Case study schema defined (fields: title, headline, impact, tools, timeline)
- [ ] **Technical case study schema defined** (fields: title, code snippets, architecture diagrams, repository URL, for academic/deep-dive projects)
- [ ] About content structure defined
- [ ] Contact form schema defined (fields: name, email, message, projectType, budget, timeline, website)
- [ ] Lead qualification logic documented (what makes a "qualified" lead?)
- [ ] Navigation & metadata structure documented

## Design System ✓
- [ ] Color palette finalized (primary, neutral, semantic, background)
- [ ] Typography defined (fonts, sizes, weights, line heights)
- [ ] Spacing system documented (rem-based scale: 0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4+)
- [ ] Border radius scale defined
- [ ] **Accessibility tokens documented** (focus ring style, color contrast ratios, min touch target, min font size)
- [ ] **Color contrast verified:** Text on light/dark meets WCAG AA (min 4.5:1 for normal text, 3:1 for large text)
- [ ] **Focus states defined** (2px solid ring with 2px offset)
- [ ] Motion principles documented (when to animate, how, reduced-motion strategy)
- [ ] Animation library decision made (Framer Motion vs CSS + governance)
- [ ] **Fluid typography strategy decided** (CSS clamp() for responsive scaling vs. breakpoint-based)
- [ ] **Performance budget defined as hard constraints:**
  - [ ] Max main JS bundle: 50KB gzipped
  - [ ] Max CSS: 20KB gzipped
  - [ ] Max image size: 200KB per image
  - [ ] Lighthouse score minimum: > 80 (all categories)
  - [ ] Core Web Vitals targets: LCP < 2.5s, CLS < 0.1
- [ ] Third-party script limit: max 3 scripts, max 30KB combined

## Information Architecture ✓
- [ ] URL structure finalized (/projects, /blog, /case-studies, dynamic routes)
- [ ] **Success page route added** (/contact/success for lead gen conversions)
- [ ] Page tree documented (root pages + dynamic templates)
- [ ] Navigation structure defined (desktop + mobile + footer)
- [ ] Audience-specific entry points mapped (hero CTAs for recruiters/clients/peers)

## Project Structure ✓
- [ ] Next.js App Router folder structure defined (src/app, src/components, src/content)
- [ ] Components organized by role: ui/ (primitives) → layout/ → modules/ (sections)
- [ ] Route groups established ((marketing), (projects), (blog))
- [ ] Static content path defined (src/content/ for markdown/MDX)
- [ ] Design tokens path established (src/styles/tokens.css)
- [ ] Draft copy workspace created for value proposition and About Me narrative

## Component Inventory ✓
- [ ] Base UI primitives identified (Button, Heading, Text, Input, Link, etc.)
- [ ] Layout components defined (Navigation, Footer, SectionContainer)
- [ ] Module components (sections) listed (HeroSection, ProjectCard, ContactForm, etc.)
- [ ] Component colocation pattern documented (component + types + tests in same folder)

## Code Standards ✓
- [ ] File naming conventions set (PascalCase for components, kebab-case for routes, camelCase for utils)
- [ ] **Image naming convention defined** ({page}-{section}-{description}-{width}.webp, with multiple widths for next/image)
- [ ] **Browser support policy defined** (modern evergreen browsers only; no IE11 or pre-2020 legacy support)
- [ ] Git workflow defined (branch prefixes: feat/, fix/, docs/, etc.)
- [ ] Commit message format established
- [ ] TypeScript conventions locked (strict mode, interface for props, type for utilities)
- [ ] Accessibility requirements in code (focus ring styles, semantic HTML, a11y testing)

## Error & Loading Handling ✓
- [ ] Loading skeleton strategy defined for 4.2 ISR dynamic routes
- [ ] Custom 404 page plan (not-found.tsx with audience-specific CTAs)
- [ ] Error boundary strategy (error.tsx for 500 errors)
- [ ] ISR revalidation failure mitigation planned (fallback to cached version)
- [ ] Error event tracking plan (10.1 analytics for 404/error pages)

## Messaging & Audience ✓
- [ ] Home page sections outlined (hero, projects, services, blog, social proof, CTA)
- [ ] **Lead success page flow documented** (/contact/success route, next-step CTAs)
- [ ] Messaging matrix created (what each audience sees + how they navigate)
- [ ] Value proposition defined in headline
- [ ] CTAs for each audience documented

## Analytics & Events ✓
- [ ] Event taxonomy defined (contact_form_submit, cta_click, project_view, blog_post_view, etc.)
- [ ] Lead qualification logic documented (what makes a "qualified" lead for conversion tracking)
- [ ] **Analytics tool and consent strategy decided** (Cookieless: Plausible vs. GA4 + Consent Banner)
- [ ] **Consent/privacy approach locked in** (GDPR compliance, cookie policy)
- [ ] Privacy policy page plan documented (/privacy route)

## Environment Variables ✓
- [ ] Environment variable schema documented (public vs. private)
- [ ] .env.local template created (secrets, git-ignored)
- [ ] .env.example created (safe reference, committed to repo)
- [ ] Vercel environment setup planned (different values per deployment)
- [ ] API key rotation plan noted (quarterly security)

## SEO Strategy ✓
- [ ] Meta titles/descriptions created for each page type
- [ ] OG images defined (dimensions: 1200x630px)
- [ ] Structured data (JSON-LD) schema drafted (Person, CreativeWork, BlogPosting)
- [ ] Keyword strategy documented
- [ ] Internal linking strategy defined
- [ ] Sitemap structure planned

## Copy & Messaging ✓ (Task 12)
- [ ] Value proposition headline drafted (pick from 3 working options)
- [ ] Value proposition subheadline drafted (supporting message)
- [ ] Short bio snippet drafted (for social cards and preview)
- [ ] About page narrative drafted (structure + opening paragraph)
- [ ] Core copy aligned with mixed-audience strategy (2.4)
- [ ] Core copy aligned with lead gen funnel (1.2)
- [ ] Case study outline structure decided (challenge, solution, impact, learnings)
- [ ] Blog post outline and category structure decided
- [ ] Contact page CTA copy drafted
- [ ] Success page CTA copy drafted (/contact/success next steps)
- [ ] Copy review checklist created (value prop alignment, tone, SEO keywords, proofreading)

## Ready for Phase 1? ✓
- [ ] All 12 tasks completed and validated
- [ ] No conflicting decisions across any layer
- [ ] Content model is DRY + includes lead capture + success strategy
- [ ] Design tokens are reusable + include a11y + perf budgets + fluid typography
- [ ] Accessibility standards (WCAG AA) locked in via focus/contrast tokens + fluid scaling
- [ ] Performance budget constraints documented and agreed (50KB JS, 20KB CSS, <150KB images)
- [ ] Browser support policy documented (modern evergreen only)
- [ ] Event taxonomy defined + consent strategy decided (Phase 5 implementation planned)
- [ ] Next.js App Router folder structure is clear (no ambiguity in file placement)
- [ ] Component inventory is complete (all UI/layout/module components identified)
- [ ] Code standards are firm (naming, git workflow, TS conventions, a11y patterns, image naming)
- [ ] Error handling & loading states planned (404, error boundary, ISR fallbacks)
- [ ] Environment variables schema documented (.env.local + .env.example)
- [ ] Lead generation funnel complete (success page, next-step CTAs, follow-up planned)
- [ ] Copy drafts completed (value proposition, About Me narrative, Phase 7 checklist)
- [ ] Team/stakeholder feedback collected and incorporated (if applicable)

## Sign-Off
- [ ] Product Owner approval: ___________
- [ ] Designer approval: ___________
- [ ] Date: ___________

---

Next: Phase 1 (Project Setup & Hosting)
```

---

## Summary: What You Have After Phase 0

This single document now contains all 12 tasks and deliverables:

✅ **Content Model** (Task 1): Projects, blog posts, case studies, lead capture forms, success strategy  
✅ **Design System Tokens** (Task 2): Colors, typography, spacing, motion, a11y, performance budgets, fluid typography  
✅ **Information Architecture** (Task 3): Page tree, navigation, URLs, `/contact/success` success route, lead success flow  
✅ **Audience Messaging** (Task 4): Mixed-audience layering, CTAs, entry points  
✅ **Event Tracking** (Task 5): Conversion events, lead qualification, analytics consent strategy  
✅ **SEO Metadata** (Task 6): Meta templates, structured data, image naming  
✅ **Phase 0 Checklist** (Task 7): Completion checklist for all tasks and deliverables  
✅ **Project Folder Structure** (Task 8): Next.js App Router layout, component organization  
✅ **Component Inventory** (Task 9): UI primitives, layout components, module sections, code standards, naming conventions  
✅ **Error & Loading Handling** (Task 10): 404 pages, error boundaries, ISR fallbacks, skeletons  
✅ **Environment Variables** (Task 11): `.env.local` and `.env.example` templates, secrets schema  
✅ **Copy Drafts** (Task 12): Value proposition, About Me narrative, Phase 7 content checklist  

**Single Source of Truth:** All content is in this document. No separate docs or files needed.

**Next phase:** Phase 1 (Project Setup) uses all these definitions to initialize Next.js and configure Vercel hosting.

---

## Timeline

**Day 1:** Tasks 1-2 (Content model + design tokens) = ~2-3 hours  
**Day 2:** Tasks 3-4 (IA + messaging) = ~2 hours  
**Day 3:** Tasks 5-6 (Event tracking + SEO) = ~1.5 hours  
**Day 4:** Task 7 (Checklist validation) + Tasks 8-10 (Folder structure, components, error handling) = ~2.5 hours  
**Day 5:** Task 11 (Environment variables) + Task 12 (Copy drafts) = ~1.5 hours  
**Day 6:** Final review, cross-checks, team feedback, sign-off = ~1-2 hours  

**Total:** ~11-14 hours of focused planning & documentation (spread over 1-2 weeks).

---

**Why This Timeline Matters:**
- 11-14 hours now = saves 50+ hours of rework during Phases 1-4
- Each task depends on previous ones (can't do components without folder structure)
- Day 6 buffer for refinement (Phase 1 will move faster if Phase 0 is solid)
- Task 11 (env vars) prevents setup delays in Phase 1 scaffolding

---

## Risk Mitigation

**Risk:** "This feels slow. Can we skip to code?"  
**Mitigation:** Getting this wrong forces 2-3 weeks of rework later. 8 hours now saves 40+ hours then.

**Risk:** "Design tokens feel abstract. How do I know if they're good?"  
**Mitigation:** Phase 1 will immediately use these tokens in CSS/Tailwind. If they don't map cleanly, refine before coding starts.

**Risk:** "Mixed audience messaging is complex. How do we A/B test?"  
**Mitigation:** 2.4 + 10.1 (basic analytics) means you'll measure bounce rate per section. Phase 9 can optimize based on data.

---

## Task Interdependencies (Why Order Matters)

```
Task 1 (Content) ────┐
                      ├─→ Task 3 (IA) ──────────┐
Task 2 (Tokens) ──────┤                         ├─→ Task 4 (Messaging)
                      ├─→ Task 5 (Events) ──────┤
                      │                         └─→ Task 7 (Checklist)
Task 6 (SEO) ─────────┘

Task 1 (Content) ─────┬─→ Task 8 (Folder) ─┬─→ Task 9 (Components) ──┐
                      │                    │                        ├─→ Phase 1
Task 2 (Tokens) ──────┤                    └─→ Task 10 (Error) ─────┤
                      │                                              │
Task 3 (IA) ──────────┘                                              │
                                                                     ↓
                                            All artifacts ready for scaffolding
```

**Key insights:**
- Tasks 1-3 are foundational (block 4, 5, 6)
- Tasks 8-10 depend on earlier tasks but can be done in parallel in Day 4
- Task 7 (Checklist) is final verification

---

## Notes & Questions

Use this section to track decisions made during Phase 0:

### Q1: Which CMS for 3.4 hybrid content?
- **Options:** Sanity, Contentful, Strapi, local MDX files
- **Decision:** TBD (will decide in Phase 3)
- **Note:** Keep content model CMS-agnostic so you can switch later

### Q2: Should About page include testimonials?
- **Context:** 2.2 audience (clients) benefits; 2.1 audience (recruiters) doesn't need
- **Decision:** TBD (decide based on Phase 7 content availability)

### Q3: How many featured projects on home?
- **Context:** Too many = slow load (11.3 perf constraint); too few = no credibility
- **Decision:** 3-4 featured projects (Phase 2 will verify Lighthouse still > 80)

### Q4: Will you use Framer Motion or CSS-only for animations?
- **Context:** 11.3 motion-rich + 50KB bundle constraint
- **Decision:** TBD (Phase 4 will test bundle impact; CSS-first, add Framer Motion only if needed)

### Q5: Testing framework for Phase 13?
- **Context:** 13.2 automated essentials need unit + e2e tests
- **Options:** Vitest + Playwright, Jest + Cypress
- **Decision:** TBD (recommend Vitest + Playwright for modern DX)

### Q6: Fluid vs. Breakpoint typography?
- **Context:** 11.3 motion-rich + responsive UX need smooth scaling
- **Options:** CSS clamp() (fluid) vs. media queries (breakpoint-based)
- **Decision:** Use fluid (clamp()) for typography, breakpoints for layout grids
- **Why:** Prevents layout jump on resize; simpler CSS; better a11y (12.1)

### Q7: Plausible or GA4 for analytics?
- **Context:** 10.1 basic analytics + 11.2 performance budget
- **Options:** Cookieless (Plausible, < 10KB) vs. GA4 + consent (50KB)
- **Decision:** Start with Plausible (Phase 0-8), upgrade to GA4 in Phase 9 if needed
- **Why:** Keeps main bundle under 50KB, GDPR-ready, simple setup

### Q8: Lead generation success page strategy?
- **Context:** 1.2 lead gen needs clear conversion tracking + re-engagement
- **Decision:** Dedicated /contact/success route with next-step CTAs (blog, projects)
- **Why:** Clearer analytics tracking than modal/toast; keeps leads engaged while waiting

### Q9: Level 8.2 Experiment — "Chat with my Resume" LLM feature?
- **Context:** You have Google One AI Pro subscription; 1.3 Engineering Showcase + 2.3 Technical Peers audience wants depth
- **Proposal:** Serverless function (Vercel Edge/AWS Lambda) calls Claude API to answer questions about your resume/projects
- **Scope (Phase 8+):** Add `/api/chat-resume` endpoint that accepts user query, retrieves context from your project data, calls LLM, returns response
- **Expected outcome:** Differentiator for technical peers; shows LLM integration + serverless infrastructure knowledge
- **Risk:** LLM API costs (~$0.01-$0.05 per query); rate-limit aggressively (max 5 queries per session)
- **Decision:** TBD — deprioritized for Phase 1-7, but Phase 8 can experiment if budget/interest allow
- **Alternative:** Blog post series about "Building LLM Features on Vercel" instead of live feature

---

**Phase 0 Owner:** You  
**Start Date:** May 5, 2026  
**End Date:** [Date TBD - target May 12, 2026]  
**Status:** Not started → In Progress → Complete

---

## Phase 0 Completion Summary

Once you complete all 11 tasks:

✅ **You have a bulletproof blueprint** that maps every architecture decision to concrete decisions  
✅ **Zero ambiguity** for Phase 1 scaffolding (folder structure, component roles, naming)  
✅ **Performance locked in** (budgets are tokens, fluid typography, cookieless analytics)  
✅ **Accessibility baked in** (focus states, color contrast, motion governance, fluid responsive type)  
✅ **Analytics from day 1** (events tracked, lead qualification clear, consent strategy defined)  
✅ **Lead gen funnel complete** (success page, next-step CTAs, follow-up automation planned)  
✅ **Error handling planned** (graceful degradation for ISR failures, 404 recovery paths)  
✅ **Environment ready** (secrets schema, .env templates, Vercel setup planned)  
✅ **Image strategy optimized** (naming for SEO, responsive srcsets, performance-tuned)  

**You are now 100% ready to start Phase 1 scaffolding with ZERO friction.**

---

## What These 5 Final Additions Prevent

| Addition | Prevents | Enables |
|---|---|---|
| **Lead Success Strategy** | "What happens after form submit?" confusion → re-engagement lost | Clear conversion funnel + analytics + follow-up automation |
| **Env Vars Schema** | Phase 1 delays while hunting down API keys → wasted setup time | Smooth .env setup, Vercel config, team onboarding |
| **Fluid Typography** | Layout shift on resize (breaks 11.3 motion UX) → poor accessibility | Smooth responsive scaling, no media query bloat, 12.1 compliant |
| **Image Naming** | Unnamed images hurt SEO (9.2) + confuse team → maintainability debt | Clear asset organization, SEO ranking boost, easy collaboration |
| **Consent Strategy** | Analytics setup mid-project (Phase 5) → rework | Early decision (Plausible vs GA4), budget-aware choice |

---

**Ready to start Phase 0 tasks, or want to review the refined document first?**
