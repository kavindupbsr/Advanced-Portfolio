# Portfolio Website Requirements and Architecture Decision Tree

Date: 2026-05-04
Purpose: Central decision document for architecture choices, dependency ripple effects, and ongoing Q&A.

## How to Use This Document
- Select one option per level using the numbering scheme.
- Record your chosen path in the `Selected Path` section.
- Use the `Q&A Log` section for ongoing questions and answers.
- Each decision includes strategic reasoning and branching consequences.

## Selected Path (LOCKED)
Use this format:
`1.x, 2.x, 3.x, 4.x, 5.x, 6.x, 7.x, 8.x, 9.x, 10.x, 11.x, 12.x, 13.x, 14.x`

Current selection (Creative Portfolio, Mixed Audience):
- **1.4, 2.4, 3.4, 4.2, 5.1, 6.4, 7.3, 8.1, 9.2, 10.1, 11.3, 12.1, 13.2, 14.2**

This path prioritizes:
- Hybrid brand + leads + interactive demo with mixed audience
- Stable core + flexible CMS storytelling  
- React meta-framework (Next.js) with native ISR freshness and client flexibility
- Design system discipline with motion-rich creative identity
- Technical SEO + case study hub authority
- Edge hosting for global latency + ISR performance

---

## Level 1: Product Strategy

### 1.1 Personal Brand Showcase (story + credibility)
- Strategic reasoning: Best when the primary goal is trust, positioning, and long-term personal brand.
- Branching consequences:
  - Requires stronger narrative structure, visual identity, and deep About/Case Study content.
  - Pushes toward editorial content workflows.
  - Ripple effect: Makes SEO/content architecture later more important than app-style interactivity.

### 1.2 Lead Generation (clients/recruiters inbound)
- Strategic reasoning: Best if the site is meant to convert visitors into calls/messages/opportunities.
- Branching consequences:
  - Requires CTA strategy, form flows, analytics events, and conversion tracking.
  - Prioritizes clarity, trust signals, and speed.
  - Ripple effect: Forces backend/contact pipeline and anti-spam decisions.

### 1.3 Interactive Product Demo (show engineering depth)
- Strategic reasoning: Best for proving technical capability through interactivity.
- Branching consequences:
  - Requires richer front-end architecture and performance planning.
  - Increases testing scope and complexity.
  - Ripple effect: Narrows low-complexity static/CMS options.

### 1.4 Hybrid (Brand + Leads + Demo)
- Strategic reasoning: Covers multiple goals in one product.
- Branching consequences:
  - Requires stricter information architecture and phased delivery.
  - Demands modular component/system design early.
  - Ripple effect: Increases dependency management across content, UX, and analytics.

---

## Level 2: Audience Priority

### 2.1 Recruiters / Hiring Managers
- Strategic reasoning: They scan quickly and value clarity + measurable outcomes.
- Branching consequences:
  - Requires concise summaries, role clarity, and impact metrics.
  - Limits overly complex interactions.
  - Ripple effect: Reinforces accessibility and structure.

### 2.2 Startup/Agency Clients
- Strategic reasoning: Clients need trust, outcomes, and easy contact.
- Branching consequences:
  - Requires testimonials, service framing, process explanation.
  - Needs lead capture and follow-up flow.
  - Ripple effect: Introduces privacy/compliance and funnel analytics requirements.

### 2.3 Technical Peers / OSS Community
- Strategic reasoning: They value depth and architecture transparency.
- Branching consequences:
  - Requires technical writeups and code references.
  - Needs stronger content taxonomy.
  - Ripple effect: Encourages markdown/CMS and developer-focused SEO.

### 2.4 Mixed Audience
- Strategic reasoning: Maximizes versatility and reach.
- Branching consequences:
  - Requires layered messaging (summary first, depth on demand).
  - Requires stronger navigation and content architecture.
  - Ripple effect: Increases IA and template complexity.

---

## Level 3: Content Operating Model

### 3.1 Static Hardcoded Content
- Strategic reasoning: Fastest to ship and lowest complexity.
- Branching consequences:
  - Changes require code edits.
  - Non-technical editing is difficult.
  - Ripple effect: Limits scale of content operations.

### 3.2 Git-based Content (Markdown/MDX)
- Strategic reasoning: Good balance of control and maintainability.
- Branching consequences:
  - Requires frontmatter/schema conventions.
  - Supports strong technical content workflows.
  - Ripple effect: Pairs naturally with static/ISR builds.

### 3.3 Headless CMS
- Strategic reasoning: Best for frequent updates and non-dev editors.
- Branching consequences:
  - Requires schema modeling, APIs, preview, webhook revalidation.
  - Adds vendor and runtime dependencies.
  - Ripple effect: Increases complexity of rendering/cache strategy.

### 3.4 Hybrid (Core static + CMS content)
- Strategic reasoning: Stable core pages + flexible publishing.
- Branching consequences:
  - Requires dual content pipeline governance.
  - Requires stronger caching/invalidation design.
  - Ripple effect: More moving parts in deployment and QA.

---

## Level 4: Rendering Architecture

### 4.1 SSG
- Strategic reasoning: Fast, secure, cost-effective.
- Branching consequences:
  - Excellent performance and SEO.
  - Less dynamic personalization by default.
  - Ripple effect: Works best with static/Git content models.

### 4.2 ISR / Revalidation
- Strategic reasoning: Preserves speed while keeping content fresh.
- Branching consequences:
  - Requires cache invalidation and revalidation rules.
  - Improves compatibility with CMS workflows.
  - Ripple effect: Adds operational complexity around consistency.

### 4.3 SSR
- Strategic reasoning: Suitable for highly dynamic user-specific pages.
- Branching consequences:
  - Higher infra and performance overhead.
  - Stronger observability needed.
  - Ripple effect: Usually unnecessary for simple portfolios.

### 4.4 SPA + API backend
- Strategic reasoning: Maximum interaction flexibility.
- Branching consequences:
  - SEO requires explicit strategy.
  - Larger JS/perf risks.
  - Ripple effect: Demands stronger performance and testing discipline.

---

## Level 5: Framework and Stack

### 5.1 Next.js
- Strategic reasoning: Flexible rendering, mature ecosystem.
- Branching consequences:
  - Good support for SEO and route-level strategy.
  - Easy scaling path.
  - Ripple effect: Strong fit with ISR and managed hosting.

### 5.2 Astro
- Strategic reasoning: Content-first and performance-first.
- Branching consequences:
  - Ships less client JS by default.
  - Great for editorial portfolios.
  - Ripple effect: Heavier app-like interactivity needs island planning.

### 5.3 SvelteKit
- Strategic reasoning: Clean DX + strong performance.
- Branching consequences:
  - Smaller ecosystem than React.
  - Great for custom interaction experiences.
  - Ripple effect: Library/template choice is narrower.

### 5.4 Vanilla/Vite custom
- Strategic reasoning: Maximum control and minimal framework lock-in.
- Branching consequences:
  - More architectural setup required.
  - You own many decisions frameworks pre-solve.
  - Ripple effect: Slower initial delivery unless requirements are narrow.

---

## Level 6: Styling and Design System

### 6.1 Tailwind (utility-first)
- Strategic reasoning: Fast iteration with consistency constraints.
- Branching consequences:
  - Requires token discipline.
  - Easy component scaling.
  - Ripple effect: Fast MVP, manageable long-term if conventions are enforced.

### 6.2 CSS Modules
- Strategic reasoning: Scoped styles with straightforward mental model.
- Branching consequences:
  - Strong isolation.
  - Can become repetitive without shared tokens.
  - Ripple effect: Design consistency needs explicit token layer.

### 6.3 CSS-in-JS
- Strategic reasoning: Co-locates style and logic.
- Branching consequences:
  - Potential runtime or SSR complexity depending on library.
  - Good for dynamic theming.
  - Ripple effect: Impacts performance tuning path.

### 6.4 Design system first (tokens + primitives)
- Strategic reasoning: Highest long-term consistency and scalability.
- Branching consequences:
  - Higher upfront design/dev cost.
  - Easier multi-page growth and iteration.
  - Ripple effect: Reduces future redesign cost.

---

## Level 7: Information Architecture

### 7.1 Single-page
- Strategic reasoning: Fastest launch.
- Branching consequences:
  - Limited SEO depth and content segmentation.
  - Simpler maintenance.
  - Ripple effect: Harder to target diverse intent.

### 7.2 Core multi-page (Home/About/Projects/Contact)
- Strategic reasoning: Best default balance for most portfolios.
- Branching consequences:
  - Better route-specific messaging and SEO.
  - Requires nav and metadata planning.
  - Ripple effect: Better analytics granularity.

### 7.3 Content hub (+ blog/case studies)
- Strategic reasoning: Builds authority and discoverability.
- Branching consequences:
  - Requires editorial cadence and taxonomy.
  - Adds sitemap and internal linking strategy.
  - Ripple effect: Strong dependence on content model quality.

### 7.4 Productized service pages
- Strategic reasoning: Optimized for client conversion.
- Branching consequences:
  - Needs clear offer framing and qualification flow.
  - Adds legal/trust copy needs.
  - Ripple effect: Strong coupling to analytics and lead routing.

---

## Level 8: Data, Integrations, Backend

### 8.1 No backend (third-party forms)
- Strategic reasoning: Lowest complexity.
- Branching consequences:
  - Quick launch with fewer security responsibilities.
  - Less customization for automation.
  - Ripple effect: Attribution and advanced workflows are limited.

### 8.2 Serverless endpoints
- Strategic reasoning: Balanced custom logic without full backend burden.
- Branching consequences:
  - Needs validation, anti-abuse, and secret handling.
  - Enables custom events and lead workflows.
  - Ripple effect: Requires baseline backend discipline.

### 8.3 Full backend service
- Strategic reasoning: Needed for advanced features/accounts/workflows.
- Branching consequences:
  - Highest operational and security complexity.
  - Longer build timeline.
  - Ripple effect: Expands DevOps, monitoring, and compliance scope.

---

## Level 9: SEO and Discoverability

### 9.1 Basic SEO
- Strategic reasoning: Mandatory baseline for indexing and sharing.
- Branching consequences:
  - Titles/meta/OG/sitemap/robots.
  - Minimal overhead.
  - Ripple effect: Limited competitive SEO edge.

### 9.2 Advanced technical SEO
- Strategic reasoning: Better search competitiveness and rich results.
- Branching consequences:
  - Structured data, canonical rules, CWV discipline.
  - Requires route/content consistency.
  - Ripple effect: Influences media/component architecture.

### 9.3 Programmatic SEO
- Strategic reasoning: For scaled content strategy.
- Branching consequences:
  - Template and taxonomy governance required.
  - Duplicate/thin-content risk management needed.
  - Ripple effect: High dependence on robust content pipeline.

---

## Level 10: Analytics and Experimentation

### 10.1 Basic analytics
- Strategic reasoning: Simple visibility with low setup overhead.
- Branching consequences:
  - Traffic/referral insights only.
  - Minimal privacy complexity.
  - Ripple effect: Limited conversion optimization potential.

### 10.2 Event-based funnel analytics
- Strategic reasoning: Essential for lead optimization.
- Branching consequences:
  - Requires event taxonomy and implementation discipline.
  - Better CTA and form optimization.
  - Ripple effect: Tight coupling with consent and component instrumentation.

### 10.3 A/B testing readiness
- Strategic reasoning: Continuous optimization model.
- Branching consequences:
  - Needs experimentation tooling and analysis rigor.
  - Added complexity in release processes.
  - Ripple effect: Requires stable metrics and QA reliability.

---

## Level 11: Performance and Media

### 11.1 Standard optimization
- Strategic reasoning: Meets most portfolio needs.
- Branching consequences:
  - Responsive images, lazy loading, minification.
  - Moderate implementation cost.
  - Ripple effect: Good balance for launch speed.

### 11.2 Strict performance budget
- Strategic reasoning: High UX/SEO quality target.
- Branching consequences:
  - CI budget enforcement for JS/CSS/media.
  - Limits third-party script usage.
  - Ripple effect: Constrains design/motion choices.

### 11.3 Motion-rich experience
- Strategic reasoning: Distinctive visual identity.
- Branching consequences:
  - Needs motion governance and reduced-motion fallback.
  - Higher tuning effort.
  - Ripple effect: Requires stronger accessibility/performance controls.

---

## Level 12: Accessibility and Compliance

### 12.1 WCAG AA baseline
- Strategic reasoning: Professional default and broad usability.
- Branching consequences:
  - Semantic structure, keyboard support, focus states, contrast.
  - Requires accessibility QA process.
  - Ripple effect: Impacts component patterns and testing.

### 12.2 AAA-leaning on key flows
- Strategic reasoning: Higher inclusivity standard.
- Branching consequences:
  - Tighter visual/content constraints.
  - More QA rigor.
  - Ripple effect: Restricts some stylistic decisions.

### 12.3 Privacy/cookie legal readiness
- Strategic reasoning: Needed when tracking and forms are significant.
- Branching consequences:
  - Consent model and policy pages required.
  - Analytics initialization depends on consent.
  - Ripple effect: Influences event architecture and scripts.

---

## Level 13: Testing and Quality Gates

### 13.1 Manual QA only
- Strategic reasoning: Minimal initial overhead.
- Branching consequences:
  - Faster start, higher regression risk.
  - Harder to scale iteration safely.
  - Ripple effect: Slows future changes.

### 13.2 Automated essentials
- Strategic reasoning: Strong value-for-effort baseline.
- Branching consequences:
  - Lint + core tests + performance checks in CI.
  - Better confidence on updates.
  - Ripple effect: Enables faster controlled iteration.

### 13.3 Full suite (unit + integration + e2e + visual)
- Strategic reasoning: Best for complex interactive systems.
- Branching consequences:
  - Highest setup and maintenance cost.
  - Strong release confidence.
  - Ripple effect: Supports rapid evolution with lower breakage risk.

---

## Level 14: DevOps, Hosting, Operations

### 14.1 Managed static hosting
- Strategic reasoning: Easiest operations path.
- Branching consequences:
  - Simple CI/CD.
  - Limited runtime flexibility.
  - Ripple effect: Best with static-first architectures.

### 14.2 Edge-capable managed platform
- Strategic reasoning: Good middle ground for dynamic + low ops.
- Branching consequences:
  - Better global latency and hybrid rendering options.
  - Some platform coupling.
  - Ripple effect: Better fit for ISR/SSR scenarios.

### 14.3 Self-managed cloud
- Strategic reasoning: Maximum control and customization.
- Branching consequences:
  - Highest operational complexity.
  - Requires mature infra/security ownership.
  - Ripple effect: Larger long-term maintenance burden.

---

## Cross-Branch Dependency Map (High-Impact Ripples)

### 15.1 If 1.2 (Lead Gen), strongly prefer
- 7.2 or 7.4, 8.2+, 10.2+, 12.3.
- Why: Conversion architecture needs forms, event taxonomy, and consent-aware tracking.

### 15.2 If 3.3 (Headless CMS), strongly require
- 4.2 (or equivalent revalidation strategy), webhook security, schema governance.
- Why: Content freshness and cache consistency become architectural requirements.

### 15.3 If 4.3/4.4 (SSR or SPA-heavy), strongly require
- 11.2 and 13.2+.
- Why: Runtime and bundle complexity increase performance/regression risk.

### 15.4 If 11.3 (Motion-rich), strongly require
- 12.1+, reduced-motion support, performance budgets.
- Why: Rich motion can degrade accessibility/performance without guardrails.

### 15.5 If 2.4 (Mixed audience), strongly require
- 7.2+ and layered content strategy from Level 3.
- Why: Different intent groups need differentiated depth and navigation.

---

## Preset Paths (Optional)

### 16.1 Fast Professional Launch
- 1.2 -> 2.1 -> 3.2 -> 4.1 -> 5.1 -> 6.1 -> 7.2 -> 8.2 -> 9.1 -> 10.2 -> 11.1 -> 12.1 -> 13.2 -> 14.1
- Tradeoff: Quick launch with practical quality, moderate extensibility.

### 16.2 Design-Forward Brand Portfolio
- 1.1 -> 2.4 -> 3.4 -> 4.2 -> 5.2 -> 6.4 -> 7.3 -> 8.1 -> 9.2 -> 10.1 -> 11.3 -> 12.2 -> 13.2 -> 14.2
- Tradeoff: Premium craft with higher planning burden.

### 16.3 Engineering Showcase
- 1.3 -> 2.3 -> 3.2 -> 4.2 -> 5.1 -> 6.2 -> 7.3 -> 8.2 -> 9.2 -> 10.2 -> 11.2 -> 12.1 -> 13.3 -> 14.2
- Tradeoff: Strong technical signal with larger testing/perf scope.

---

## Development Roadmap (Phases, Milestones, Decision Mapping)

### Phase 0: Architecture Foundation (Week 1)
**Mapped to:** Levels 3, 6, 7 (Content Model, Design System, IA)

**Why first:** Before any code, you need schema clarity (3.4 hybrid) and design tokens (6.4) so all builders follow the same patterns.

**Deliverables:**
- [ ] `PHASE_0_ARCHITECTURE_FOUNDATION.md` (single source of truth with all 11 tasks):
  - Content taxonomy (projects, blog, case studies, lead forms, success strategy)
  - Design token system (colors, typography, spacing, motion, a11y, performance budgets, fluid type)
  - Page tree / navigation wireframe with /contact/success route
  - Content model schema (frontmatter + CMS structure for 3.4)
  - Audience messaging strategy (mixed-audience layering)
  - Event tracking taxonomy (conversion events, lead qualification, analytics consent)
  - SEO metadata templates and structured data examples
  - Next.js folder structure and component organization
  - Code standards and conventions (naming, git workflow, a11y patterns, image naming)
  - Error handling and loading state strategy
  - Environment variable schema (.env.local / .env.example templates)
  - Lead success flow and post-submission strategy
  - Copy drafts for Phase 7 (value proposition, About Me narrative)

**Gating criteria:**
- PHASE_0_ARCHITECTURE_FOUNDATION.md reviewed and signed off
- Content model supports mixed-audience messaging (Task 4)
- Design tokens defined in code-ready format (colors, spacing, fluid typography)
- Performance budgets documented (50KB main JS, 20KB CSS, <150KB hero image)
- IA includes /contact/success route and next-step CTAs for lead gen funnel
- All Tasks 1-11 completed and cross-checked for consistency

**Decision Dependencies:**
- **3.4 (Hybrid):** Requires dual-pipeline governance → document static pages vs. CMS pages in content model
- **6.4 (Design system first):** Requires token definitions → all colors, spacing, typography, motion in one place
- **7.3 (Content hub):** Requires taxonomy → case study structure, blog categories, depth levels documented
- **1.2 (Lead gen):** Requires success flow → /contact/success route with next-step CTAs designed
- **12.1 (WCAG AA):** Requires a11y tokens → focus ring, color contrast, min font size documented
- **11.2 (Performance budget):** Requires hard constraints → perf budgets locked in as non-negotiable

**Risk if skipped:**
- Rework later when content doesn't fit framework (high cost)
- Inconsistent design tokens across pages (visual debt)
- No clear lead gen funnel (conversion tracking confused)

---

### Phase 1: Project Setup & Hosting (Week 1-2)
**Mapped to:** Levels 5, 14 (Framework, DevOps)

**Why here:** Lock infrastructure early so you don't refactor hosting/build config later.

**Deliverables:**
- [ ] Initialize Next.js project (5.1) with TypeScript and App Router
- [ ] Install core dependencies: React, Next.js Image, Tailwind (or CSS-in-JS for 6.4)
- [ ] Configure Vercel deployment (14.2) with environment variables
- [ ] Set up Git repo with branch protection rules
- [ ] Configure CI/CD pipeline (lint, test, build, Lighthouse checks for 13.2)
- [ ] Set up performance budget enforcement (`next/bundle-analyzer`)
- [ ] Configure ISR revalidation (4.2) routes and timing
- [ ] Create `.env.local` for development secrets

**Gating criteria:**
- Next.js build succeeds locally (`npm run build`)
- Vercel deployment preview working with ISR revalidation configured
- CI/CD pipeline runs green on dummy commit
- Performance budget baseline established (JS < 50KB gzipped for main bundle)

**Decision Dependencies:**
- **5.1 (Next.js):** Requires `next.config.js`, App Router setup, Image optimization → configure in this phase
- **14.2 (Edge-capable platform):** Vercel integration with environment secrets → set up GitHub Actions + Vercel preview deployments
- **4.2 (ISR):** Configure revalidate times for static routes → use `revalidate: 3600` (1 hour) for blog/case studies
- **11.3 (Motion-rich):** Set up bundle analyzer to track JS growth as you add animations → monitor in CI

**Risk if delayed:**
- Late DevOps changes break build pipeline (dev velocity hits)
- Vercel costs spike if ISR not configured properly
- Performance regressions after adding React code (catch early)

---

### Phase 2: Core Pages & Design System Build (Week 2-3)
**Mapped to:** Levels 6, 7, 9 (Design System, IA, SEO)

**Why here:** Static core pages are stable; build them with design system to unblock later CMS pages.

**Deliverables:**
- [ ] Layout component library (header, footer, nav with layered audience UX)
- [ ] Home page (hero + mixed-audience entry points)
- [ ] About page (narrative + brief credibility layer)
- [ ] Contact page (third-party form for 8.1, or simple contact email)
- [ ] 404 page
- [ ] Implement design tokens in Next.js/Tailwind
- [ ] SEO metadata component (title, meta, OG tags for 9.2)
- [ ] Sitemap generation

**Gating criteria:**
- All pages render without errors
- Design system is being reused (no duplicate styles)
- SEO metadata present on every page
- Lighthouse performance > 80 on all pages
- WCAG AA automated checks passing (12.1)

**Decision Dependencies:**
- **6.4 (Design system first):** Ensure every page uses token-based colors/spacing → code review enforces this
- **7.3 (Content hub):** Design blog/case-study card templates → reuse across index and detail pages
- **9.2 (Advanced SEO):** Implement structured data (JSON-LD) for portfolio items → use schema.org markup
- **12.1 (WCAG AA):** Semantic HTML, focus states, color contrast → lighthouse check enforces

**Risk if skipped:**
- Design inconsistency later (hard to fix across many pages)
- SEO structure missing (rankings suffer)

---

### Phase 3: Content Modeling & CMS Integration (Week 3-4)
**Mapped to:** Levels 3, 4, 5 (Content Model, Rendering, Framework)

**Why here:** After core pages prove the design system, integrate CMS for dynamic content (blog, case studies).

**Deliverables:**
- [ ] Choose CMS vendor (Sanity, Contentful, or local file-based option)
- [ ] Schema design in CMS (blog posts, case studies, projects, metadata)
- [ ] Next.js `getStaticProps` + `getStaticPaths` for CMS data (5.1 with 3.4 hybrid)
- [ ] Revalidation webhook handlers + Next.js ISR config (4.2)
- [ ] Blog index page + blog post detail template (using dynamic routes)
- [ ] Case study templates (with richer layout options for 11.3 motion)
- [ ] Draft/preview mode for non-dev editors (Next.js Preview Mode)
- [ ] Markdown/MDX content parsing (if using local files for core content)

**Gating criteria:**
- CMS data successfully fetches during build (`getStaticProps`)
- Blog posts render with metadata and next/image optimization
- Case studies display with design system consistency (React components)
- Preview mode works (content editor can see drafts before publish)
- Revalidation webhook triggers on CMS publish (ISR 4.2 works end-to-end)
- Dynamic route generation working (`getStaticPaths`)

**Decision Dependencies:**
- **3.4 (Hybrid):** Core pages stay in the Next.js App Router, dynamic content comes from CMS/server components → separate content sources
- **4.2 (ISR):** Configure `revalidate` in `getStaticProps` for blog/case studies (e.g., `revalidate: 3600`)
- **5.1 (Next.js):** Use App Router conventions, React Server Components for CMS fetching
- **7.3 (Content hub):** Build dynamic archive/filtering for blog using dynamic routes → `[slug].tsx` patterns
- **6.4 (Design system):** Ensure CMS layout data maps to React component props cleanly

**Risk if delayed:**
- Content bottleneck (can't launch with rich stories)
- ISR bugs discovered in production (stale cache misses)
- Preview mode missing (non-devs can't review before publish)

---

### Phase 4: Creative Features & Motion (Week 4-5)
**Mapped to:** Levels 11, 12 (Performance, Motion, Accessibility)

**Why here:** After core functionality, add motion and polish with guardrails (11.3 + 12.1).

**Deliverables:**
- [ ] Install motion library (Framer Motion OR CSS animations for lighter bundle)
- [ ] Create animated components: hero entrance, scroll effects, case study transitions
- [ ] Implement `next/dynamic` lazy loading for motion-heavy components (keep main bundle small)
- [ ] Add `prefers-reduced-motion` support (CSS media query + React state)
- [ ] Image optimization with `next/image` (automatic AVIF, responsive srcsets for 11.3)
- [ ] Set up bundle size monitoring in CI (`next/bundle-analyzer`)
- [ ] Performance budget enforcement: Main JS < 50KB, CSS < 20KB after gzip

**Gating criteria:**
- All animations respect `prefers-reduced-motion`
- Performance budgets enforced in CI (fail build if exceeded)
- Next.js bundle analysis shows breakdown (avoid large libraries)
- Lighthouse performance still > 80 with animations
- WCAG AA motion guidelines followed (no seizure-risk flashing)
- Core Web Vitals: LCP < 2.5s, CLS < 0.1, FID < 100ms

**Decision Dependencies:**
- **11.3 (Motion-rich):** Use Framer Motion with `dynamic` import, or pure CSS (lighter). Document when to use which → animation design system
- **12.1 (WCAG AA):** Ensure motion doesn't break keyboard nav. React components must support `aria-*` attributes and focus management
- **5.1 (Next.js):** Use `next/dynamic` for code splitting animation libraries → keep initial bundle under 50KB
- **9.2 (Advanced SEO):** `next/image` improves LCP (ranked factor) → optimize all hero/case study images

**Risk if overengineered:**
- Motion becomes jank on slower devices (hurts CWV scores)
- JS bundle bloats (defeats ISR performance win from 4.2)
- Accessibility regressions (motion confuses screen readers)

**Optimization check:**
- If bundle creeps > 60KB, remove lowest-ROI animations or split further with `dynamic`

---

### Phase 5: Analytics & Conversion Flow (Week 5-6)
**Mapped to:** Levels 10, 8 (Analytics, Backend)

**Why here:** After content is live, instrument tracking for optimization.

**Deliverables:**
- [ ] Basic analytics provider setup (Google Analytics or Plausible for 10.1)
- [ ] CTA tracking events (button clicks, form views for 8.1)
- [ ] Page view events with URL/referrer
- [ ] Event taxonomy documentation
- [ ] Contact form integration (third-party or serverless for 8.1)
- [ ] Form submission confirmation page
- [ ] Email notification to you on contact submission

**Gating criteria:**
- Analytics dashboard shows traffic/referrers
- CTA clicks are tracked and attributed to source
- Contact form submissions logged with email notification
- No third-party scripts break performance budget
- Privacy policy updated (if using cookies)

**Decision Dependencies:**
- **10.1 (Basic analytics):** Simple GA setup with page views → no event taxonomy initially
- **8.1 (No backend):** Use Formspree, Basin, or similar for form handling → no custom backend needed
- **9.2 (Advanced SEO):** Track conversion paths (traffic source → landing page → contact) for reporting

**Risk if delayed:**
- No feedback on what's working; can't optimize
- Lead loss if contact form isn't working

---

### Phase 6: Testing & QA Gates (Week 6-7)
**Mapped to:** Level 13 (Testing)

**Why here:** Before public launch, lock in quality standards.

**Deliverables:**
- [ ] Lighthouse CI checks (performance, accessibility, SEO, best practices)
- [ ] Link checker (all internal/external links valid)
- [ ] Spell/grammar check on content
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile responsiveness check (all breakpoints)
- [ ] Manual accessibility audit (keyboard nav, screen reader)
- [ ] Form submission e2e test
- [ ] Content preview mode test

**Gating criteria:**
- All Lighthouse checks pass (> 80 on all audits)
- No broken links
- Mobile layout works on all common devices
- WCAG AA manual audit complete with no Critical/High issues
- All forms tested and working

**Decision Dependencies:**
- **13.2 (Automated essentials):** Lighthouse CI in GitHub Actions → run on every PR
- **12.1 (WCAG AA):** Manual accessibility audit needed → document findings and fixes
- **5.1 (Next.js):** Next.js build is deterministic → test in CI environment

**Risk if skipped:**
- Launch with broken links or poor mobile UX (bad first impression)
- SEO hurt by performance or accessibility issues
- Conversion path broken

---

### Phase 7: Content Loading & Soft Launch (Week 7-8)
**Mapped to:** Levels 3, 7 (Content Model, IA)

**Why here:** All systems ready; now populate with real content.

**Deliverables:**
- [ ] Write/gather portfolio project descriptions
- [ ] Create 3-5 case studies (or detailed project write-ups)
- [ ] Write About page narrative (brand story + credibility, start from `COPY_DRAFTS.md`)
- [ ] Publish 2-3 blog posts (build SEO authority for 9.2)
- [ ] Optimize images and assets
- [ ] Proofread all content (spelling, tone, links)
- [ ] Internal stakeholder review (if applicable)

**Gating criteria:**
- All portfolio projects have descriptions + images
- At least 1 case study published
- About page complete and tone-consistent
- No typos or broken references
- Feedback from internal review incorporated

**Decision Dependencies:**
- **3.4 (Hybrid):** Static projects in repo, blog posts in CMS → separate workflows for each
- **7.3 (Content hub):** Blog/case studies indexed and filterable → content must be tagged properly
- **9.2 (Advanced SEO):** Each piece has metadata optimized (keyword in title/meta, internal links) → content checklist

**Risk if delayed:**
- Launches with placeholder content (credibility hit)
- SEO ramp-up stalled (no content)

---

### Phase 8: Final Polish & Public Launch (Week 8)
**Mapped to:** All Levels (Final Integration)

**Why here:** Last checks before going live.

**Deliverables:**
- [ ] Final performance optimization (bundle, images, caching headers)
- [ ] robots.txt + sitemap.xml finalized
- [ ] Meta refresh redirects for old URLs (if migrating)
- [ ] Analytics event tracking verified live
- [ ] Contact form tested in production
- [ ] DNS/domain configuration finalized
- [ ] Monitoring/alerting set up (errors, performance)
- [ ] Launch announcement (LinkedIn, Twitter, email)

**Gating criteria:**
- All lighthouse checks pass in production build
- Analytics are collecting correctly
- Contact form works end-to-end
- No console errors or warnings
- Core Web Vitals measured in production

**Decision Dependencies:**
- **14.2 (Edge hosting):** Vercel deployment is live and stable
- **4.2 (ISR):** Revalidation working; content updates reflect within expected timeframe
- **9.2 (Advanced SEO):** Sitemap submitted to Google/Bing Search Console

**Risk if rushed:**
- Performance degradation in production (differs from local)
- Analytics/tracking bugs discovered with real traffic
- User feedback reveals critical UX issues

---

### Phase 9: Post-Launch Iteration (Week 9+)
**Mapped to:** Levels 10, 11 (Analytics, Performance Monitoring)

**Why ongoing:** Launch is the beginning, not the end.

**Ongoing Tasks:**
- [ ] Monitor analytics weekly (traffic sources, top pages, referrers)
- [ ] Measure Core Web Vitals from real users (RUM)
- [ ] Track contact form submissions and conversion rate
- [ ] Publish blog posts monthly (SEO growth)
- [ ] Update portfolio with new projects (quarterly or as needed)
- [ ] Analyze user feedback (form submissions, comments)
- [ ] A/B test CTAs and layouts based on analytics (optional, for future)

**Optimization Opportunities:**
- If bounce rate is high on home page → revisit hero messaging (2.4 mixed audience)
- If contact form conversions low → simplify form or improve CTA placement (8.1)
- If blog traffic is low → improve SEO metadata and internal linking (9.2)
- If performance degrades → audit new scripts/assets against budget (11.3)

**Decision Dependencies:**
- **10.1 (Basic analytics):** Dashboards show traffic trends → use to prioritize content
- **7.3 (Content hub):** Blog publishing cadence → plan topics based on search intent
- **11.3 (Motion-rich):** Performance monitoring detects jank → refine animations or remove if needed

---

## Phase Dependencies & Critical Path

```
Phase 0 (Schema) → Phase 1 (Hosting/Build) → Phase 2 (Core Pages)
                                           ↓
                                      Phase 3 (CMS)
                                           ↓
                                      Phase 4 (Motion)
                                           ↓
                                      Phase 5 (Analytics)
                                           ↓
                                      Phase 6 (Testing)
                                           ↓
                                      Phase 7 (Content)
                                           ↓
                                      Phase 8 (Launch)
                                           ↓
                                      Phase 9 (Iteration)
```

**Critical Path (longest dependency chain):** Phase 0 → 1 → 2 → 3 → 4 → 6 → 7 → 8  
**Parallel opportunities:** Phase 5 & 6 can overlap with Phase 4 (analytics setup while building motion)

---

## Risk Register (Mapped to Decision Tree)

| Risk | Decision Link | Severity | Mitigation |
|------|---------------|----------|-----------|
| Content model doesn't support mixed-audience layering | 3.4, 2.4, 7.3 | High | Validate schema in Phase 0 with sample content before building templates |
| CMS revalidation misses updates (stale content) | 4.2, 3.4 | High | Implement webhook monitoring, manual revalidation trigger in CI |
| Motion animations cause performance regressions | 11.3, 12.1 | Medium | Budget enforcement in CI, extensive reduced-motion testing in Phase 4 |
| Lighthouse scores drop after adding analytics scripts | 10.1, 11.3 | Medium | Audit script impact before launch, consider async loading or self-hosted GA |
| Accessibility bugs discovered post-launch (WCAG AA) | 12.1, 13.2 | Medium | Automated + manual audit in Phase 6, form/button usability testing |
| Vercel ISR revalidation costs spike | 14.2, 4.2 | Low-Medium | Monitor revalidation frequency, batch updates where possible |
| CMS vendor lock-in limits future flexibility | 3.4 | Low | Use vendor-agnostic schema, plan export/migration path |
| Blog doesn't grow traffic (7.3 content hub underperforms) | 7.3, 9.2 | Low | Monitor analytics monthly, adjust content strategy based on search intent |

---

## Acceptance Criteria by Phase

| Phase | Feature Complete | Quality Gate | Risk Closed |
|-------|------------------|--------------|------------|
| 0 | Schema + tokens + IA | Schema reviewed, tokens code-ready | — |
| 1 | Next.js + Vercel | Build green, preview deploys | Hosting locked |
| 2 | Core pages + design system | Lighthouse > 80, WCAG AA pass | Design consistency locked |
| 3 | CMS + blog/case studies | Data fetches, revalidation works | Content scalability unlocked |
| 4 | Motion + a11y | Perf budget enforced, reduced-motion works | Visual identity proven |
| 5 | Analytics + contact | Events tracked, form works | Lead funnel operational |
| 6 | QA gates | All lighthouse checks, no broken links | Launch-ready |
| 7 | Content population | Projects + case studies + blog live | Credibility established |
| 8 | Public launch | Live, zero errors, all tracking live | Revenue-generating |
| 9 | Post-launch ops | Weekly analytics review, monthly posts | Continuous growth |

---

## Q&A Log (Use This Section for Ongoing Decisions)

### Q1
- Question: I selected `1.4` and `2.4` and want a more creative portfolio. What should be next?
- Related decisions: 1.4, 2.4, 3.x, 4.x, 5.x, 6.x, 7.x, 11.x
- Answer: For a creative-first hybrid portfolio with mixed audience, the strongest next path is `3.4 -> 4.2 -> 5.2 -> 6.4 -> 7.3 -> 8.1 -> 9.2 -> 10.1 -> 11.3 -> 12.1 -> 13.2 -> 14.2`.
  - Why this fits:
    - `3.4` keeps core pages stable while allowing rich CMS-driven storytelling.
    - `4.2` enables freshness for creative content without losing speed.
    - `5.2` (Astro) supports content-first performance and expressive layouts.
    - `6.4` ensures visual coherence through tokens/primitives before page-level styling.
    - `7.3` enables case-study depth and layered content for mixed audience intent.
    - `11.3` allows motion-rich identity, balanced by `12.1` accessibility guardrails.
  - Ripple effects to account for immediately:
    - Need content model + taxonomy early (because `3.4` + `7.3`).
    - Need revalidation/caching rules (because `4.2`).
    - Need motion governance + reduced-motion variants (because `11.3` + `12.1`).
    - Need edge-capable hosting constraints planned up front (because `14.2`).
- Action taken: Locked initial selections and added recommended creative path for Levels 3-14.
- Date: 2026-05-04

### Q2
- Question: I want to switch from Astro (5.2) to Next.js (5.1) for more React flexibility. What changes?
- Related decisions: 5.1, 6.4, 11.3, 4.2, 3.4, 13.2
- Answer: Next.js is a strong fit for your path. Key changes and ripple effects:
  - **Wins:** Native ISR support (4.2 is first-class), React ecosystem for client interactivity, excellent Image component for 11.3 optimization, mature Vercel integration (14.2).
  - **Tradeoff:** Larger JS footprint than Astro → stricter 11.3 motion budget enforcement needed. Must use dynamic imports, aggressive code splitting, and limit client-side libraries.
  - **Design system shift:** Switch from Astro components to React component library. 6.4 tokens still work via CSS/Tailwind, but now you're building reusable React components, not just HTML templates.
  - **CMS integration (3.4):** Use `getStaticProps` + `revalidate` for ISR instead of Astro's build-time fetch. Allows more dynamic patterns.
  - **Performance discipline:** 11.3 requires stricter attention to bundle size. Use Next.js `next/dynamic` for lazy loading, `next/image` for optimization, and enforce budgets in 13.2 CI checks.
  - **Accessibility (12.1):** React requires more manual a11y work (no semantic defaults like Astro); compensate with `jsx-a11y` ESLint rules and manual testing.
- Action taken: Locked architecture path to `5.1`, updated Phase 1 roadmap to reflect Next.js setup, noted performance/bundle constraints for Phase 4.
- Date: 2026-05-04

### Q3 (Pending)
- Question:
- Related decisions:
- Answer:
- Action taken:
- Date:

## Decision Change Log
- 2026-05-04: Initial requirements document created.
- 2026-05-04: Selected path updated to `1.4, 2.4`; Q1 added with creative-first recommended continuation.
- 2026-05-04: Full architecture path LOCKED: `1.4 -> 2.4 -> 3.4 -> 4.2 -> 5.2 -> 6.4 -> 7.3 -> 8.1 -> 9.2 -> 10.1 -> 11.3 -> 12.1 -> 13.2 -> 14.2`
- 2026-05-04: Framework changed from 5.2 (Astro) to 5.1 (Next.js). Rationale: Better React flexibility for client interactivity + native ISR support. Tradeoff: Stricter bundle size discipline needed for 11.3 motion. Updated Phase 1 (Next.js setup), Phase 3 (getStaticProps + ISR), Phase 4 (next/dynamic for motion libraries).
