# Security & Dependency Management Notes

**Created:** May 6, 2026  
**Status:** Reference Document  
**Scope:** Portfolio Project (Next.js 16+ setup)  
**Last Updated:** May 6, 2026

---

## Overview

This document guides you through handling security vulnerabilities and package updates safely as your project progresses. It covers:

- **Right Now (Phase 1):** Why to ignore the PostCSS warning and proceed
- **Phase 2:** How to safely update packages with tests
- **Phase 3+:** Automating security updates with Dependabot

**TL;DR:**
- Phase 1: Ignore npm audit warnings, move forward
- Phase 2: Enable tests, use Dependabot, update safely
- Phase 3+: Let Dependabot automate everything

---

## Problem: PostCSS XSS Vulnerability (GHSA-qx2v-qp2m-jg93)

### What the Vulnerability Is

**Affected Package:** PostCSS < 8.5.10  
**Severity:** Moderate  
**Issue:** PostCSS has an XSS vulnerability via unescaped `</style>` tags in CSS Stringify output.

**Real-world impact:** Very low for your portfolio:
- Only affects if you're processing **untrusted CSS from user input**
- Your portfolio doesn't accept user-generated CSS
- Design tokens are hardcoded in your codebase
- No dynamic CSS processing from external sources

**Reference:** https://github.com/advisories/GHSA-qx2v-qp2m-jg93

---

## Why You Can Ignore This (For Now)

### The "Fix" is Worse Than the Vulnerability

When you run `npm audit fix --force`, it attempts to resolve the issue by:

```
✗ Requires downgrading: next@16.3.0 → next@9.3.3 (breaking change)
✗ Next.js 9.3.3 is from 2020 (6+ years old)
✗ You need Next.js 15+ for App Router (from Phase 0 decisions)
✗ Downgrade would break your entire scaffold
```

**The cascade of breakage:**
- Next.js 9 doesn't support App Router (removed in v13)
- Tailwind CSS compatibility breaks
- TypeScript strict mode setup breaks
- All Phase 0 architectural decisions become impossible

---

## Why It's Safe to Proceed

### 1. You're Using Modern Next.js (16+)
- Next.js bundles an internally-managed, updated PostCSS
- Not pulling PostCSS from npm directly
- Next.js maintains security patches internally

### 2. Your Use Case is Safe
- No untrusted CSS sources
- No user input processed as CSS
- Design tokens are static, version-controlled code

### 3. This is a Known Issue
- The PostCSS vulnerability exists in Next.js scaffolds globally
- Not specific to your project
- Will be resolved upstream in a future Next.js release

---

## Strategy: Deferred Security Updates (Safe Approach)

### Phase 1 (Now): Ignore and Proceed
✅ Continue with Phase 1 setup  
✅ Move forward with env files, tokens, layout, components  
✅ Don't run `npm audit fix --force`  
✅ Don't manually downgrade packages  

**Timeline:** May 6-7, 2026

### Phase 2 (After Phase 1 Complete): Safe Updates
**Prerequisites:** Working CI/CD + test suite in place

1. **Run `npm outdated`** to see what can be updated
   ```bash
   npm outdated
   ```
   Shows all packages with updates available (major, minor, patch)

2. **Update packages individually with test validation**
   ```bash
   npm install package-name@latest
   npm run build      # Verify build succeeds
   npm run test       # Verify tests pass
   npm run lint       # Verify linting passes
   ```

3. **Commit safe updates**
   ```bash
   git add package.json package-lock.json
   git commit -m "chore(deps): update [package-name] to latest"
   ```

4. **If update fails → rollback**
   ```bash
   git reset --hard HEAD~1
   npm ci
   ```

**Timeline:** May 8-10, 2026 (after Phase 1 tests are wired)

### Phase 2+ (Ongoing): Enable Dependabot
**Prerequisites:** Repository on GitHub

**Setup (one-time):**
1. Go to GitHub repository → Settings
2. Navigate to "Code security & analysis"
3. Enable "Dependabot alerts"
4. Enable "Dependabot security updates"
5. (Optional) Create `dependabot.yml` for custom rules

**How it works:**
- Dependabot automatically scans for security updates
- Creates PRs for each vulnerable dependency
- CI/CD runs automatically before merge
- You review, approve, and merge with confidence
- Zero manual vulnerability checking needed

**Example PR from Dependabot:**
```
Title: chore(deps): bump postcss from 8.5.9 to 8.5.10

This PR updates postcss to a patched version that fixes GHSA-qx2v-qp2m-jg93.

CI: ✅ All checks passed
Tests: ✅ 42 tests passed
Build: ✅ Build successful
```

---

## npm Audit Output (Reference)

```
# npm audit report

postcss  <8.5.10
Severity: moderate
PostCSS has XSS via Unescaped </style> in its CSS Stringify Output
fix available via `npm audit fix --force`
Will install next@9.3.3, which is a breaking change

2 moderate severity vulnerabilities
```

**Action:** ⚠️ **DO NOT RUN `npm audit fix --force`**

---

## npm Version Update (Separate Issue)

**Current:** npm 11.5.1  
**Latest:** npm 11.13.0

**Should you update?**
- ✅ **Safe to update whenever convenient**
- ✅ Improves caching, install speed
- ✅ Minor bug fixes included
- ❌ Not urgent for development

**When:** Any time after Phase 1 (Phase 2+)

```bash
npm install -g npm@11.13.0
```

---

## Command Flow Strategy: By Phase

### Phase-by-Phase Action Plan

| Phase | Action | Reason | Status |
|-------|--------|--------|--------|
| **Phase 1 (Now)** | ❌ Don't run `npm audit fix --force` | No tests yet; risky + would downgrade Next.js | CRITICAL |
| **Phase 1 (End)** | ✅ Run `npm audit` (read-only) | Know what exists; take inventory | SAFE |
| **Phase 2 (Start)** | ✅ Run `npm run test` before updating | Tests catch regressions early | SAFE |
| **Phase 2 (Mid)** | ✅ `npm audit fix` (with tests) | Safer now; CI validates changes | SAFE |
| **Phase 3+** | ✅ Regular updates + CI validation | Automated safety net via Dependabot | AUTOMATED |

---

## Command Flow Details

### Phase 1 (Right Now): Scaffold & Assessment

**What to do:**
```bash
# ✅ Safe: Check what vulnerabilities exist (read-only)
npm audit

# ✅ Safe: Proceed with Phase 1 setup
npm run build
npm run dev
# (Visit http://localhost:3000 to verify it works)
```

**What NOT to do:**
```bash
# ❌ DANGEROUS: Do not run this!
npm audit fix --force
# This would downgrade Next.js 16 → 9.3.3 (breaking change)
```

**Why read-only audit is OK:**
- You're just looking at the report
- Understanding the vulnerability landscape
- Not making any changes to dependencies
- Safe to run anytime

**Expected output:**
```
# npm audit report
postcss  <8.5.10
Severity: moderate
...
2 moderate severity vulnerabilities
```

**Action:** Document the vulnerabilities and move forward. This is expected and safe.

---

### Phase 1 (End): Pre-Phase-2 Inventory

**What to do before moving to Phase 2:**
```bash
# Check which packages have updates available
npm outdated

# Example output:
# Package        Current  Wanted  Latest
# next            16.3.0  16.3.0  16.3.0
# react            19.0.0  19.0.0  19.0.0
# tailwindcss      3.4.1   3.4.1   3.4.1
# postcss          8.4.31  8.4.31  8.5.10  (can be updated!)
```

**Why:**
- Identifies which packages are outdated
- Shows safe updates (patch versions like 8.4.31 → 8.5.10)
- Shows risky updates (major version changes)
- Informs Phase 2 update strategy

---

### Phase 2 (Start): Test Suite Validation

**Prerequisites:**
- Phase 1 complete
- `npm run test` command works
- `npm run build` passes
- CI/CD pipeline exists (Task 7)

**Safe update workflow:**

**Step 1: Update one package at a time**
```bash
cd portfolio

# Example: Update postcss (safe patch version)
npm install postcss@latest

# Or update to specific version
npm install postcss@8.5.10
```

**Step 2: Validate the update**
```bash
# Run full test suite
npm run test

# Run build
npm run build

# Run linting
npm run lint

# Run type check
npm run type-check
```

**Step 3: If all pass → commit**
```bash
git add package.json package-lock.json
git commit -m "chore(deps): update postcss to 8.5.10"
git push origin main
# CI runs automatically; all checks pass ✅
```

**Step 4: If something fails → rollback**
```bash
# Revert the change
git reset --hard HEAD~1

# Reinstall previous versions
npm ci

# Document why the update failed
# Update SECURITY_AND_DEPENDENCY_NOTES.md with blockers
```

---

### Phase 2 (Mid): Batch Updates with Tests

**Full update example (multiple packages):**

```bash
# Check what's available
npm outdated

# Update all patch versions (safe)
npm update

# Run full validation
npm run test
npm run build
npm run lint
npm run type-check

# If all pass: commit
git add package.json package-lock.json
git commit -m "chore(deps): update patch versions"
```

**Important notes:**
- `npm update` only updates patch versions (e.g., 3.4.1 → 3.4.2)
- Won't update major versions (e.g., 3.4.1 → 4.0.0)
- Much safer than `npm audit fix --force`

---

### Phase 2 (Late): Manual Audit Fix (with Tests)

**After you have confidence in your test suite:**

```bash
# Only now is audit fix safer
npm audit fix

# Validate comprehensively
npm run test          # Unit & integration tests
npm run test:e2e      # End-to-end tests
npm run build         # Build for production
npm run lint          # Code quality
npm run type-check    # TypeScript

# If all pass: safe to commit
git add package.json package-lock.json
git commit -m "chore(deps): resolve audit vulnerabilities with tests"
```

**Why it's safer in Phase 2:**
- Tests validate functionality
- Build ensures no breaking changes
- CI/CD gates the changes
- You can see errors before production

---

### Phase 3+: Automated via Dependabot

**Setup (one-time, in Phase 1 Task 6 when on GitHub):**
```
GitHub → Repository Settings
  → Code security & analysis
    → Enable Dependabot alerts
    → Enable Dependabot security updates
```

**Example Dependabot PR:**
```
Title: chore(deps): bump postcss from 8.4.31 to 8.5.10

Automated security update from Dependabot.

Changes:
- postcss: 8.4.31 → 8.5.10 (fixes GHSA-qx2v-qp2m-jg93)

CI Status: ✅ All checks passed
- npm run test: ✅ 42 tests passed
- npm run build: ✅ Build successful
- npm run lint: ✅ No issues
- Lighthouse: ✅ Performance score 85

You can safely merge this PR.
```

**What you do:**
```bash
# GitHub UI: Click "Merge" on the PR
# Dependabot automatically:
# 1. Runs your CI/CD
# 2. Validates the change
# 3. Updates your main branch
# 4. Closes the PR

# Locally: Pull the updates
git pull origin main
```

**Timeline:** Dependabot creates PRs continuously; you just approve/merge.

---

## Reference Timeline (Expanded)

| Phase | What | Dependencies | Security Action | Commands |
|-------|------|--------------|-----------------|----------|
| Phase 1 | Scaffold setup | Next.js 16+, Tailwind | Ignore vulnerabilities | `npm audit` (read-only) |
| Phase 1 End | Inventory check | Working build + tests | Know what exists | `npm outdated` |
| Phase 2 | Home page + tests | CI/CD, test suite | Enable Dependabot | `npm run test` before updates |
| Phase 2 Late | Package updates | Tests passing | `npm audit fix` (safe) | `npm audit fix` + `npm run test` |
| Phase 3+ | Ongoing | CI + Dependabot | Auto-monitor | Dependabot PRs → Merge |

---

## General Explanations: npm Commands & Concepts

### Common npm Commands

**`npm audit` (Read-Only Assessment)**
```bash
npm audit
```
- **What:** Scans your `package.json` and `package-lock.json` against known vulnerability database
- **Output:** Lists all vulnerabilities with severity (low, moderate, high, critical)
- **Risk:** None — it doesn't change anything
- **When to run:** Anytime you want to check status
- **When NOT to run:** Never with `--force` until Phase 2+

---

**`npm outdated` (Version Inventory)**
```bash
npm outdated
```
- **What:** Shows which packages have newer versions available
- **Output:** Lists current version, wanted version (patch/minor), and latest version
- **Risk:** None — read-only, doesn't install anything
- **When to run:** End of Phase 1, before Phase 2 updates
- **Tells you:** Which packages can be safely updated

**Example output:**
```
Package      Current  Wanted  Latest  Location
next         16.3.0   16.3.0  16.3.0  portfolio
postcss      8.4.31   8.4.31  8.5.10  portfolio
tailwindcss  3.4.1    3.4.1   3.4.1   portfolio
```

---

**`npm update` (Safe Auto-Update)**
```bash
npm update
```
- **What:** Updates packages to the highest version allowed by `package.json` constraints
- **Behavior:** Only updates patch versions (e.g., 3.4.1 → 3.4.5)
- **Won't touch:** Major versions (e.g., won't jump from v3 → v4)
- **Risk:** Very low — respects semantic versioning rules
- **When to use:** Phase 2+, regularly as part of maintenance

---

**`npm install package@latest` (Targeted Update)**
```bash
npm install postcss@latest
npm install next@16.3.0
```
- **What:** Updates or installs specific package to specific version
- **Risk:** Depends on what version you specify
- **When to use:** Phase 2+, when you want precise control
- **Best practice:** Always run tests after

---

**`npm audit fix` (Automatic Vulnerability Fix)**
```bash
npm audit fix
npm audit fix --force
```
- **Default:** Tries to fix vulnerabilities without major version changes
- **With `--force`:** Will make breaking changes to fix vulnerabilities
- **Risk:** **VERY HIGH without tests** (Phase 1), Low with tests (Phase 2+)
- **When NOT to use:** Phase 1 (no tests yet)
- **When safe to use:** Phase 2+ (after tests exist)

---

**`npm ci` (Clean Install)**
```bash
npm ci
```
- **What:** Installs exact versions from `package-lock.json`
- **Use case:** Reproducing exact environment (CI/CD, rollbacks, team sync)
- **When to use:** After `git reset` to restore previous state
- **Speed:** Faster than `npm install` (no re-resolving dependencies)

---

### npm Versioning Explained

**Semantic Versioning: MAJOR.MINOR.PATCH**
```
8.5.10
│ │ └─ PATCH (security fixes, bug fixes) → Safe to update automatically
│ └─── MINOR (new features, backward compatible) → Usually safe
└───── MAJOR (breaking changes, removed features) → Risky without testing
```

**Examples:**
- `8.4.31 → 8.4.32` (PATCH) = **Safe ✅** — just fixes
- `8.4.31 → 8.5.0` (MINOR) = **Probably safe ✅** — new features, backward compat
- `8.4.31 → 9.0.0` (MAJOR) = **Risky ⚠️** — breaking changes possible

**package.json Constraints:**
```json
{
  "dependencies": {
    "postcss": "^8.4.31"      // ← "^" means: >=8.4.31, <9.0.0 (allow minor/patch)
    "tailwindcss": "~3.4.1"   // ← "~" means: >=3.4.1, <3.5.0 (allow patch only)
    "next": "16.3.0"          // ← No prefix means: exact version 16.3.0
  }
}
```

---

### Why Tests Matter

**Without tests (Phase 1):**
```bash
npm audit fix --force
# ❌ Next.js downgraded to 9.3.3
# ❌ App Router breaks
# ❌ Tailwind breaks
# ❌ TypeScript breaks
# ❌ Entire project is broken
# Result: Hours of troubleshooting
```

**With tests (Phase 2+):**
```bash
npm install some-package@latest
npm run test        # ✅ Tests pass
npm run build       # ✅ Build succeeds
npm run lint        # ✅ No lint errors
git commit          # ✅ Safe to commit
# Result: Confident, validated update
```

---

### Dependency Graph Example

**Your project depends on:**
```
next@16.3.0
  ├── react@19.0.0
  ├── react-dom@19.0.0
  └── postcss@8.4.31  ← Has vulnerability in <8.5.10
      └── (internal dependencies)
```

**When you run `npm audit fix --force`:**
- It tries to fix postcss by updating it
- But to update postcss, it changes next's dependencies
- Which requires downgrading next itself
- Creating a cascade of incompatibilities

**When you run `npm audit` (read-only):**
- You see the vulnerability exists
- You understand it's low risk for your use case
- You plan to fix it properly in Phase 2

---

## Best Practices Summary

### ✅ DO

- ✅ Run `npm audit` regularly (read-only)
- ✅ Run `npm outdated` to know what's available
- ✅ Update packages **one at a time** during Phase 2
- ✅ Run full test suite before committing updates
- ✅ Use Dependabot in Phase 2+ for automation
- ✅ Test changes in a branch before merging
- ✅ Document why an update was skipped (if needed)
- ✅ Keep `package-lock.json` in version control

### ❌ DON'T

- ❌ Run `npm audit fix --force` before Phase 2
- ❌ Update multiple packages at once (makes debugging hard)
- ❌ Commit package changes without testing
- ❌ Ignore CI/CD failures after updates
- ❌ Downgrade packages without a reason
- ❌ Use `npm install` in production (use `npm ci` instead)
- ❌ Delete `package-lock.json` (use it for reproducibility)



❌ **Do NOT run:**
```bash
npm audit fix --force
```
This would downgrade Next.js to 9.3.3 and break everything.

❌ **Do NOT manually:**
- Downgrade next
- Downgrade tailwindcss
- Downgrade typescript

❌ **Do NOT:**
- Ignore Dependabot PRs in Phase 2+
- Skip CI/CD testing before merging updates
- Run updates in production without testing

---

## Checklist: What TO Do

✅ **In Phase 1:**
```bash
cd portfolio
# Proceed normally — ignore audit warnings
npm run build
npm run dev
```

✅ **In Phase 2 (post-Phase-1):**
```bash
npm outdated              # See what can be updated
npm run test              # Ensure tests pass before updates
npm run build             # Ensure build works
```

✅ **After GitHub setup:**
- Enable Dependabot in Settings
- Review & merge Dependabot PRs as they arrive
- Let CI/CD validate before merging

---

## Quick Start: What to Do Right Now

### Today (Phase 1: May 6-7, 2026)

**You have two options:**

**Option A: Ignore and Move Forward (Recommended)**
```bash
cd portfolio
npm run build
npm run dev
# Start wiring Phase 1 config files
# Security is not a blocker right now
```

**Option B: Know What You're Dealing With**
```bash
cd portfolio
npm audit
# You'll see the PostCSS vulnerability
# It's noted in SECURITY_AND_DEPENDENCY_NOTES.md
# It won't block Phase 1
npm run build
npm run dev
```

### After Phase 1 (Phase 2: May 8-10, 2026)

**Step 1: Enable Dependabot**
- Push repo to GitHub (Phase 1 Task 6)
- Settings → Code security & analysis → Enable Dependabot alerts
- Enable Dependabot security updates
- Now Dependabot will automatically create PRs

**Step 2: Safe Updates with Tests**
```bash
npm outdated          # See what's available
npm run test          # Make sure tests pass (prerequisite)
npm update            # Update patch versions safely
npm run test          # Run tests again
npm run build         # Verify build works
git commit            # Commit if all pass
```

**Step 3: Let Dependabot Handle It**
- Review Dependabot PRs as they arrive
- Click "Merge" if CI/CD passes
- Dependabot handles the rest automatically

---

## Troubleshooting: "I ran `npm audit fix --force` — What do I do?"

**If you accidentally ran it:**

**Step 1: Check what changed**
```bash
npm list next
# Shows the version of next installed

git status
# Shows package.json and package-lock.json changed
```

**Step 2: Revert immediately**
```bash
# If you already committed:
git reset --hard HEAD~1

# Or if you haven't committed yet:
git checkout package.json package-lock.json

# Then reinstall
npm ci
```

**Step 3: Verify everything still works**
```bash
npm run build
npm run dev
```

**Step 4: Don't do it again until Phase 2!**

---

## Decision Tree: Should I Update This Package?

```
                        Should I update this package?
                                    |
                    ┌───────────────┴───────────────┐
                    ↓                               ↓
            Am I in Phase 1?                   Am I in Phase 2+?
                    |                               |
           YES ────┴──→ NO ──┐         YES ──┬──→ NO
            |                 |           |        |
            ↓                 ↓           ↓        ↓
         WAIT          Do I have    Do I have   SKIP
         (Don't         tests? →     tests?     (Maybe
          update)        NO          YES        later)
                          |           |
                         ↓           ↓
                       WAIT      CAN UPDATE
                     (Wait for  (Run tests
                      Phase 2)   first)
```

---

## Reference: What Each File Does

| File | Purpose | When Created | When Updated |
|------|---------|--------------|--------------|
| `package.json` | Dependencies list | Phase 1 Task 1 | Phase 2+ (updates) |
| `package-lock.json` | Locked versions | Phase 1 Task 1 | `npm install` / `npm update` |
| `.npmrc` | npm config | (Optional) | Never unless you change rules |
| `npm-audit.log` | Audit report | `npm audit` command | Each time you audit |
| `SECURITY_AND_DEPENDENCY_NOTES.md` | This doc | May 6, 2026 | Phase 2+ (update strategy) |

---

## Common Scenarios & Solutions

### Scenario 1: "I see 2 moderate vulnerabilities"

**What to do:**
1. Read this document
2. Understand it's PostCSS XSS (low risk for you)
3. Move forward with Phase 1
4. Enable Dependabot in Phase 2
5. Let Dependabot handle future updates

**Timeline:** Not urgent. Handle in Phase 2 properly.

---

### Scenario 2: "npm run build fails after an update"

**What to do:**
```bash
# Immediately revert
git reset --hard HEAD~1
npm ci

# Verify it works again
npm run build

# Document why the update failed
# Example:
# "package@X.0.0 breaks feature Y; skip until fix available"
```

**Prevention:** Always test after updates before committing.

---

### Scenario 3: "npm install is slow"

**What to do:**
```bash
# Use npm ci instead (faster)
npm ci

# Or clear npm cache
npm cache clean --force
npm install
```

**Why:** `npm ci` uses exact versions from `package-lock.json`; faster than resolving deps.

---

### Scenario 4: "I want to update Next.js to latest"

**Do NOT do this in Phase 1.**

**In Phase 2:**
```bash
# First: check what the latest is
npm outdated

# Then: try updating
npm install next@latest

# Then: validate extensively
npm run test
npm run build
npm run lint
npm run type-check

# If all pass: commit
# If any fail: revert (git reset --hard HEAD~1)
```

---

## Monitoring Strategy

### Phase 1
- Run `npm audit` occasionally (read-only, safe)
- Document findings in this file

### Phase 2
- Enable Dependabot (automatic)
- Review Dependabot PRs weekly
- Merge if CI/CD passes

### Phase 3+
- Dependabot runs continuously
- You just review and merge
- No manual dependency management needed



## FAQ

### Q: Should I be worried about the PostCSS vulnerability?
**A:** No. It only affects untrusted CSS input, which you don't have. Proceed with Phase 1.

---

### Q: What if a user mentions this audit warning?
**A:** "This is a known issue in Next.js scaffolds. It's being addressed upstream and doesn't affect our specific use case (no user-generated CSS). We're using Dependabot in Phase 2+ for automated security monitoring."

---

### Q: When should I upgrade packages?
**A:** After Phase 1 is complete and you have tests in place (Phase 2). Never upgrade without tests validating the change.

---

### Q: Is Dependabot free?
**A:** Yes, it's built into GitHub for free. No additional cost.

---

### Q: Can I enable Dependabot now?
**A:** Only after your repo is on GitHub. Currently at local filesystem. Set up in Phase 1 Task 6 when initializing Git.

---

### Q: What if an update breaks things?
**A:** You can see the failure in CI before merging. Rollback with `git reset --hard HEAD~1` and investigate. That's the whole point of Dependabot + CI.

---

### Q: How do I know if a package is safe to update?
**A:** Check the version jump:
- **Patch version** (8.4.31 → 8.4.32): ✅ Very safe
- **Minor version** (8.4.31 → 8.5.0): ✅ Usually safe (new features)
- **Major version** (8.4.31 → 9.0.0): ⚠️ Risky (breaking changes)

Always run tests after updating.

---

### Q: What's the difference between `npm install` and `npm ci`?
**A:**
- **`npm install`**: Resolves dependencies, may update to newer versions
- **`npm ci`**: Uses exact versions from `package-lock.json`, faster, reproducible

Use `npm ci` when you want consistency (Phase 2+ CI/CD). Use `npm install` when you want to add/update packages.

---

### Q: Should I delete `package-lock.json`?
**A:** **No, never!** It locks exact versions. Commit it to git. It ensures everyone has the same dependencies.

---

### Q: What's the safest way to update Next.js?
**A:** In Phase 2, with tests passing:
```bash
npm run test              # Baseline: tests pass
npm install next@latest  # Update
npm run test              # Verify tests still pass
npm run build             # Verify build works
git commit                # Commit if all pass
```

---

### Q: Can I update multiple packages at once?
**A:** Not recommended. Update one package at a time (Phase 2+) so you know which one caused problems if something breaks.

---

### Q: What if `npm audit fix` is really necessary?
**A:** Only run in Phase 2+ when:
1. All tests are passing
2. CI/CD is set up
3. You can revert quickly if needed

Even then, test carefully before committing.

---

### Q: How often should I run `npm outdated`?
**A:** 
- Phase 1: Once (end of phase)
- Phase 2+: Once per week or when Dependabot sends PRs
- Let Dependabot handle daily monitoring

---

### Q: What if Dependabot can't automatically fix something?
**A:** Dependabot creates a PR showing the conflict. You manually resolve it:
```bash
# Pull the PR branch
git fetch origin pull/123/head:fix-deps
git checkout fix-deps

# Manually update the problematic package
npm install package-name@version

# Run tests
npm run test
npm run build

# Commit and push
git add package.json package-lock.json
git commit -m "resolve dependency conflict"
git push origin fix-deps

# GitHub: Create pull request and merge
```

---

### Q: Is it OK to ignore security warnings from npm?
**A:** Context-dependent:
- **Low risk** (like PostCSS XSS without untrusted CSS): Can defer to Phase 2
- **Critical** (RCE, authentication bypass): Fix immediately if possible
- **Always document why** you're deferring in this file

---

### Q: Will Dependabot slow down my development?
**A:** No. It creates PRs, but doesn't force merging. You control when/if to merge them. Most of the time, merge immediately (CI validates).

---

### Q: What if I want to skip a Dependabot PR?
**A:** You can close it. Dependabot will recreate it next cycle. Or add a comment:
```
@dependabot close

// Later, when ready:
@dependabot reopen
```

---

### Q: Why does `npm audit fix --force` break things?
**A:** The `--force` flag tells npm to make breaking changes (major version downgrades) to fix vulnerabilities. In your case:
- Tries to downgrade Next.js to fix PostCSS
- Next.js 9.3.3 doesn't support App Router
- Everything breaks

The "cure" is worse than the "disease."

---

### Q: How should I document security decisions?
**A:** Update this file with:
1. The vulnerability (name, CVE, severity)
2. Why you're deferring (low risk, not applicable, etc.)
3. When you'll fix it (Phase 2, after feature X, etc.)

Example:
```markdown
### Deferred: PostCSS XSS (GHSA-qx2v-qp2m-jg93)
- **Reason:** No untrusted CSS input; low risk for this project
- **Deferred to:** Phase 2 (with test suite in place)
- **Status:** Tracked, will enable Dependabot for automation
- **Updated:** May 6, 2026
```

---

## Related Phase Docs

- [PHASE_1_PROJECT_SETUP.md](PHASE_1_PROJECT_SETUP.md) — Task 6: Git initialization  
- [PHASE_1_PROJECT_SETUP.md](PHASE_1_PROJECT_SETUP.md) — Task 7: CI/CD Pipeline  
- [PHASE_0_ARCHITECTURE_FOUNDATION.md](PHASE_0_ARCHITECTURE_FOUNDATION.md) — Task 9: Code standards

---

## Summary & Action Plan

### The Core Principle
**"Security through discipline, not panic."**

Security updates should be:
- ✅ **Planned** (not reactive)
- ✅ **Tested** (before committing)
- ✅ **Automated** (with Dependabot in Phase 2+)
- ✅ **Documented** (why you made the decision)

### Right Now (May 6, 2026)

**You have a choice:**

**Option 1: Just Move Forward**
```bash
cd portfolio
npm run build
npm run dev
# Start wiring Phase 1 files
# Don't worry about the audit warning
```

**Option 2: Be Informed**
```bash
npm audit  # See what exists
# Document it
# Then proceed as Option 1
```

**Either way:** Phase 1 is not blocked. Move forward confidently.

---

### Phase 1 Completion (May 7, 2026)

Before moving to Phase 2:
1. ✅ Scaffold is working
2. ✅ All Phase 1 files are wired
3. ✅ Build passes (`npm run build`)
4. ✅ Dev server works (`npm run dev`)
5. ✅ Tests exist and pass (`npm run test`)
6. ✅ CI/CD pipeline is set up

---

### Phase 2 Start (May 8, 2026)

**Day 1: Enable Dependabot**
1. Push repo to GitHub
2. Settings → Code security & analysis
3. Enable Dependabot alerts + security updates
4. Done — Dependabot now monitors continuously

**Day 2: Safe Updates (if needed)**
```bash
npm outdated                    # Inventory
npm run test                    # Baseline
npm update                      # Update patch versions
npm run test && npm run build   # Validate
git commit                      # Commit if all pass
```

**Day 3+: Let Dependabot Work**
- Review Dependabot PRs as they arrive
- Click "Merge" if CI/CD passes
- Dependabot handles the rest

---

### Phase 3+ (May 10+, Ongoing)

**You don't think about security updates anymore.**

Dependabot creates PRs → CI validates → You merge. That's it.

---

## One-Page Cheat Sheet

```
PHASE 1 (NOW)
├── Run: npm audit (read-only, informational)
├── Run: npm run build && npm run dev (verify scaffold)
├── DON'T: npm audit fix --force
└── Result: Proceed with Phase 1 wiring

PHASE 2 (AFTER PHASE 1)
├── Enable Dependabot in GitHub (Settings → Code security)
├── Run: npm run test (ensure tests pass first)
├── Run: npm update (update patch versions safely)
├── Run: npm run build && npm run test (validate)
├── Optional: npm audit fix (only with tests passing)
└── Result: Dependabot monitoring + safe updates

PHASE 3+ (ONGOING)
├── Dependabot creates PRs automatically
├── CI/CD validates each PR
├── You review and merge
└── Result: No manual security work needed
```

---

## Files Related to This Process

| Document | Purpose | When to Read |
|----------|---------|--------------|
| [SECURITY_AND_DEPENDENCY_NOTES.md](SECURITY_AND_DEPENDENCY_NOTES.md) | This doc | Whenever you see npm warnings |
| [PHASE_1_PROJECT_SETUP.md](PHASE_1_PROJECT_SETUP.md) Task 6 | Git initialization | May 7 (end of Phase 1) |
| [PHASE_1_PROJECT_SETUP.md](PHASE_1_PROJECT_SETUP.md) Task 7 | CI/CD setup | May 7 (end of Phase 1) |
| [PHASE_0_ARCHITECTURE_FOUNDATION.md](PHASE_0_ARCHITECTURE_FOUNDATION.md) Task 9 | Code standards | Understanding project decisions |

---

## Key Takeaways

1. **The PostCSS vulnerability is real but low-risk** for your use case
2. **`npm audit fix --force` would break everything** — don't run it in Phase 1
3. **Tests are your safety net** — update confidently once Phase 2 tests exist
4. **Dependabot automates this** — enable it in Phase 2 and forget about it
5. **Document your decisions** — update this file when deferring security fixes

---

**Current Status:** ✅ Informed, Ready to Proceed  
**Blocker:** None  
**Next Action:** Wire Phase 1 config files  
**Security Review:** After Phase 2 tests are in place

**Last Updated:** May 6, 2026  
**Next Review:** After Phase 1 completion (May 7, 2026)
