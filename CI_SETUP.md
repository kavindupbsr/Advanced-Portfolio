# CI/CD Pipeline Setup — Complete Beginner's Guide

## What is CI/CD? (Plain English Explanation)

**CI = Continuous Integration**  
Automatically test your code every time you push changes. Catches bugs early.

**CD = Continuous Deployment**  
Automatically deploy your app to production when tests pass.

**For your portfolio, CI means:**
- Every time you push code to GitHub, automated checks run (format, lint, type-check, tests, build)
- If any check fails, you know about it immediately
- If all checks pass, you can safely deploy

**Real-world analogy:**
- Without CI: You manually test everything before deploying (tedious, error-prone)
- With CI: Your computer tests everything for you automatically (fast, reliable)

---

## How It Works (Visual Workflow)

```
You push code to GitHub
        ↓
GitHub Actions starts CI workflow
        ↓
Run format check → Lint → Type check → Unit tests → E2E tests → Build
        ↓
All passed? → Green checkmark ✅ (safe to deploy)
        ↓
Any failed?  → Red X mark ❌ (fix and push again)
```

---

## Overview
A GitHub Actions CI workflow has been created at `.github/workflows/ci.yml` that automatically validates your code on every push and pull request.

## What Is GitHub Actions?

GitHub Actions is GitHub's built-in automation system. It lets you run tasks automatically when something happens in your repository.

Common things it can do:
- Run tests when you push code
- Check formatting and TypeScript errors
- Build your app before deployment
- Deploy to hosting platforms after a successful check

In this project, GitHub Actions is used as the automated checker that protects your code before it reaches production.

## Why the Workflow File Must Be in `.github/workflows/`

GitHub only looks for workflow files in this exact folder at the root of the repository:

```text
.github/workflows/*.yml
```

Why this matters:
- If the file is inside another folder, GitHub will not detect it
- If the folder is not at the repo root, the workflow will not appear in the Actions tab
- The file name can be anything like `ci.yml`, but the folder path must be exact

Correct example:
```text
your-repo/
   .github/
      workflows/
         ci.yml
```

## Do You Need a VS Code Extension For This?

No, a VS Code extension is **not required** for GitHub Actions to work.

Why people install one anyway:
- Better YAML highlighting and autocomplete
- Easier to spot indentation mistakes
- Faster validation while editing workflow files

Useful optional extensions:
- **GitHub Actions** — helps with workflow syntax and action references
- **YAML** — improves YAML editing and error detection

So the extension is only a helper. The real workflow still runs on GitHub, not in VS Code.

## How to Handle CI/CD in Practice

Use this simple flow:
1. Make your code change locally
2. Run the validation command
3. Push to GitHub
4. Open the Actions tab and check the workflow result
5. Fix any failing step locally
6. Push again until it is green

If you enable branch protection later, GitHub will require these checks to pass before merging.

## What the CI Pipeline Does

The workflow runs on:
- **Triggers:** `push` and `pull_request` to `main` and `develop` branches
- **Node versions:** Tests against Node 20.x and 24.x (ensures compatibility)
- **Timeout:** 30 minutes per run

### Pipeline Steps (in order)

1. **Checkout code** — Clone your repository
2. **Setup Node.js** — Install the specified Node version and cache dependencies
3. **Install dependencies** — Run `npm ci` (clean install, preferred in CI)
4. **Format check** — `npm run format:check` (Prettier) — fails if code isn't formatted
5. **Lint** — `npm run lint` (ESLint) — checks code quality
6. **Type check** — `npm run type-check` (TypeScript) — ensures no type errors
7. **Unit tests** — `npm run test -- --run` (Vitest) — validates individual components
8. **Install Playwright browsers** — Downloads Chromium for E2E tests
9. **E2E tests** — `npm run test:e2e` (Playwright) — validates full user flows
10. **Build** — `npm run build` (Next.js) — ensures production build succeeds

### Artifacts Uploaded
- **Playwright report** — Test results for debugging failed E2E tests
- **Build output** — The `.next/` folder (kept for 1 day)

## How to Use

### Step 1: Push Your Code to GitHub (First Time Setup)

**If you haven't pushed yet:**

1. **Create a GitHub repository:**
   - Go to [github.com/new](https://github.com/new)
   - Name it `portfolio` (or your preferred name)
   - **Do NOT** initialize with README (you already have code locally)
   - Click "Create repository"

2. **Connect your local code to GitHub:**
   ```bash
   cd c:\Users\ASUS TUF\Desktop\Portfolio\portfolio
   git init
   git add .
   git commit -m "Initial commit: Phase 1 setup"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git push -u origin main
   ```
   
   (Replace `YOUR_USERNAME` with your actual GitHub username)

3. **Verify it worked:**
   - Go to `https://github.com/YOUR_USERNAME/portfolio`
   - You should see your files there

---

### Step 2: Watch CI Run (After First Push)

1. Go to your repository on GitHub
2. Click the **Actions** tab
3. You'll see your first CI workflow running
4. Click it to see each step (format → lint → type-check → tests → build)
5. If all steps are green ✅ — success! Your code is production-ready
6. If any step is red ❌ — click it to see the error and fix locally

---

### Step 3: Protect Your Main Branch (Prevent Bad Code)

**What this does:** Forces all code to pass CI checks before merging.

1. Go to your GitHub repository
2. Click **Settings** (top right)
3. Click **Branches** (left sidebar)
4. Under "Branch protection rules" click **Add rule**
5. In "Branch name pattern" type: `main`
6. **Check these boxes:**
   - ✅ "Require a pull request before merging" (forces code review)
   - ✅ "Require status checks to pass" (requires CI to be green)
   - ✅ "Require branches to be up to date before merging"
7. Click **Create**

**What happens now:**
- You can't push directly to `main` anymore
- You must create a **Pull Request (PR)**
- CI must pass and a reviewer must approve
- Only then can you merge

---

### On Your Local Machine

Before pushing, run these to avoid CI failures:

```bash
# Format code
npm run format

# Check formatting
npm run format:check

# Lint
npm run lint

# Type check
npm run type-check

# Run unit tests
npm run test

# Run E2E tests (requires running `npm run dev` in another terminal)
npm run test:e2e

# Build
npm run build
```

**Or run all at once (recommended):**
```bash
npm run format && npm run lint && npm run type-check && npm run test -- --run && npm run build
```

If this command passes locally, it will **always** pass in CI. Push with confidence.

---

### On GitHub (After Branch Protection)

**Creating a Pull Request (PR):**

1. Create a new branch locally:
   ```bash
   git checkout -b feature/my-feature
   ```

2. Make your changes and commit:
   ```bash
   git add .
   git commit -m "Add my feature"
   ```

3. Push to GitHub:
   ```bash
   git push origin feature/my-feature
   ```

4. Go to GitHub repo → click **Pull requests** → **New pull request**

5. GitHub will:
   - Run CI automatically
   - Show you a green ✅ or red ❌
   - Let you merge once CI passes and reviewer approves

**Why this matters:**
- Main branch **always** stays safe and deployable
- Bad code never sneaks in
- You can't accidentally push broken code

---

### Viewing CI Results

**On GitHub:**
1. Go to **Actions** tab
2. Click the workflow run name
3. See each step with ✅ or ❌
4. Click a failed step to see the error message

**Downloading Test Reports:**
- If E2E tests fail, download the Playwright report
- It shows which test failed and why
- Debug locally with: `npm run test:e2e -- --ui`

---

### On Your Local Machine

## Matrix Strategy

The workflow tests against **two Node versions** (20.x and 24.x) to ensure compatibility. This means each push/PR runs the full pipeline twice.

Example output:
```
✓ Node 20.x — all checks passed
✓ Node 24.x — all checks passed
```

## Failing CI? Detailed Fixes

| Issue | What It Means | How to Fix |
|-------|---------------|-----------|
| **Format check fails** | Your code has inconsistent spacing/indentation | `npm run format` locally, commit, push |
| **Lint fails** | Your code has quality issues (unused variables, bad patterns) | Read the error message, fix the code, commit, push |
| **Type check fails** | TypeScript found a type error (passing wrong data type) | Fix the TypeScript error (IDE should show red squiggles), commit, push |
| **Unit tests fail** | A component isn't behaving as expected | Run `npm run test` locally, read the error, fix the code, commit, push |
| **E2E tests fail** | A real user flow broke (navigation, form, etc.) | Run `npm run test:e2e -- --ui` to debug interactively, fix, commit, push |
| **Build fails** | The production build doesn't compile | Check console output, likely a syntax error or missing file |

### Real Example: Fixing a Failed Format Check

**What you see on GitHub:**
```
❌ Format check failed
```

**What to do:**
```bash
npm run format
git add .
git commit -m "Format code"
git push
```

**Then:** Go back to your PR on GitHub — CI reruns automatically and should now pass ✅

---

## Beginner FAQ

### Q1: I don't have a GitHub account. What do I do?

**A:** Go to [github.com/signup](https://github.com/signup) and create a free account. Takes 5 minutes.

---

### Q2: What's a "Pull Request" (PR)?

**A:** A way to propose changes to your code. Before merging into `main`, a PR:
1. Triggers CI (all tests run)
2. Allows for code review
3. Documents the changes

---

### Q3: Do I have to use branch protection?

**A:** No, but **strongly recommended**. It prevents you from accidentally pushing broken code to production.

Without it: you can push directly to `main` (risky)  
With it: you must create a PR, pass CI, and get approval (safe)

---

### Q4: Why does CI test against Node 20 AND 24?

**A:** To ensure your code works on different supported Node versions. This catches compatibility issues early.

---

### Q5: What if I need to skip a CI check?

**A:** Don't. Each check catches different bugs:
- Format: Makes code readable
- Lint: Catches bugs (unused variables, logic errors)
- Type check: Prevents runtime crashes
- Unit tests: Ensures components work
- E2E tests: Ensures user flows work
- Build: Ensures production deployment works

All are important.

---

### Q6: How long does CI take?

**A:** ~3-5 minutes per run. It's testing against Node 20 and 24, so 2 parallel runs.

---

### Q7: Can I run CI locally instead of pushing to GitHub?

**A:** Yes! Run this before every push:
```bash
npm run format && npm run lint && npm run type-check && npm run test -- --run && npm run build
```

If this passes locally, it will **always** pass on GitHub.

---

### Q8: What if the build fails?

**A:** The build step checks if your code can be deployed to production. Failures usually mean:
- Syntax error in your code
- Missing import/export
- Configuration issue

**To debug:**
```bash
npm run build
```

Read the error message carefully — it usually tells you exactly what's wrong.

---

### Q9: Do I need to understand GitHub Actions YAML?

**A:** No. The `.github/workflows/ci.yml` file is already set up and works. You only need to understand **what** it does (validate code), not **how** it does it.

---

### Q10: What's "main" vs "develop"?

**A:** 
- **main** = production code (always safe, always tested)
- **develop** = working branch (next release, tested but not live yet)

Usually you work on feature branches, then PR into `develop`, then `develop` into `main`.

For this portfolio, keep it simple: just use `main`.

---

## Failing CI? Common Fixes

## Next Steps (In Order)

### 1. Push Your Code to GitHub (Required)
```bash
# One-time setup (connect to GitHub)
git init
git add .
git commit -m "Initial commit: Phase 1"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

Then go to `https://github.com/YOUR_USERNAME/portfolio` and watch CI run in the **Actions** tab.

### 2. Set Up Branch Protection (Recommended)
1. Go to GitHub repo → **Settings** → **Branches**
2. Add a rule for `main` branch
3. Check: "Require PR", "Require status checks", "Require up-to-date branches"

Now all code must pass CI before merging.

### 3. Run the Full Local Check Before Every Push
```bash
npm run format && npm run lint && npm run type-check && npm run test -- --run && npm run build
```

**If this passes locally, it will always pass on GitHub.**

### 4. Add More Tests (Optional, Improves Confidence)
Consider adding:
- 2-3 unit tests for critical UI components (Button, Link, Card)
- 2 E2E flows (contact form submission, project page navigation)
- Reference: [TESTING_GUIDE.md](TESTING_GUIDE.md)

### 5. Add Lighthouse CI (Optional, Measures Performance)
Update `.github/workflows/ci.yml` to include Lighthouse performance checks.
(Config already exists at `lighthouserc.json`)

---

## Understanding Your CI Status

### ✅ Green Check (All Good)
- All checks passed
- Your PR is ready to merge
- Code is production-safe

### ❌ Red X (Something Failed)
- One or more checks failed
- Read the error message
- Fix locally with `npm run format`, `npm run test`, etc.
- Push the fix (PR automatically reruns CI)

### 🟡 Orange/Yellow (In Progress)
- CI is still running
- Wait for it to finish (usually 3-5 minutes)

---

## Customizing the Workflow

To modify the workflow:
1. Edit `.github/workflows/ci.yml`
2. Examples:
   - Change `node-version: [20.x, 24.x]` to test different Node versions
   - Add `environment: production` to deploy after successful CI
   - Add a new step to run custom scripts

## Next Steps (Optional)

Consider adding:
- **Auto-formatting on push** — GitHub Action to format code automatically
- **Dependency updates** — Dependabot or Renovate to auto-update packages
- **Coverage reports** — Upload code coverage to Codecov
- **Deployment step** — Deploy to Vercel/Netlify after CI passes
- **Lighthouse CI** — Performance testing (config already exists at `lighthouserc.json`)

---

**Your CI is now live!** 🚀 All future pushes and PRs will be automatically validated.
