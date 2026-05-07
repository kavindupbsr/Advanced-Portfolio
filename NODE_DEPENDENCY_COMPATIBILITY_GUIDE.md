# Node and Dependency Compatibility Guide

This note explains why a project can pass or fail depending on the Node version, how package compatibility works, how to spot dependency problems, and which tools help track them.

It is written for beginners, so the focus is on practical signs, simple checks, and safe habits.

## 1. What Node.js Is Doing in This Project

Node.js is the runtime that runs your JavaScript tools outside the browser. In this repository, Node is used to run:
- `npm ci`
- `npm run build`
- `npm run lint`
- `npm run type-check`
- `npm run test`
- `npm run test:e2e`

That means the Node version is not just a background detail. It affects the whole toolchain.

## 2. Why Node Version Matters

Different Node versions can behave differently because of:
- new language features
- changed runtime APIs
- package engine requirements
- native dependencies
- ecosystem support for LTS vs newest releases

A package may work on one Node version and fail on another even if your code did not change.

### Simple example
If your CI uses a Node version that your packages do not fully support, you might see:
- install failures
- build failures
- browser test failures
- runtime crashes
- strange warnings that do not appear locally

## 3. Why a Workflow Can Pass After a Node Change

If the workflow started passing after changing the Node version, the likely reason is that the new version better matched the package ecosystem.

Common reasons:
- the new Node version is closer to what the packages expect
- one package behaves better on an LTS version
- a dependency has an `engines` requirement
- the local machine and GitHub Actions were using different runtime assumptions

So the fix is usually not “the app changed.” It is more like:

```text
runtime compatibility improved
```

## 4. The Main Signals of Compatibility Problems

Watch for these clues:
- the failure happens during `npm ci` or `npm install`
- a step passes locally but fails in GitHub Actions
- the error mentions `engines`, `unsupported`, or `requires Node`
- Playwright, Next.js, Vitest, or TypeScript behaves differently across Node versions
- a new package version suddenly causes a build or test failure
- the output includes peer dependency warnings

## 5. How to Check the Current Versions

Run these commands first:

```bash
node --version
npm --version
npx next --version
npx playwright --version
npx vitest --version
```

These tell you what environment you are really using.

## 6. How Dependency Versions Work

A dependency is a package your project uses. In this repo, examples include:
- `next`
- `react`
- `react-dom`
- `typescript`
- `vitest`
- `@playwright/test`
- `eslint`

Some are runtime dependencies and some are development dependencies, but both can break the project if they are incompatible.

### Why versions matter
A new version can:
- fix bugs
- add features
- remove old behavior
- change peer dependency expectations
- require a newer Node version
- introduce a breaking change

## 7. Semver in Beginner Language

Many npm packages use semantic versioning, also called semver.

Format:

```text
major.minor.patch
```

Meaning:
- **major** = may include breaking changes
- **minor** = new features, usually backward compatible
- **patch** = bug fixes, usually the safest updates

### Example
`4.1.5` means:
- `4` = major version
- `1` = minor version
- `5` = patch version

## 8. What `^` Means in `package.json`

When you see a version like this:

```json
"vitest": "^4.1.5"
```

it usually means:
- allow compatible updates inside the same major version
- do not jump to the next major version automatically

That is useful, but it still allows small version changes that may affect behavior.

## 9. Why the Lockfile Matters

`package-lock.json` stores the exact versions that were installed.

Why this helps:
- installs become reproducible
- CI and local machines can use the same dependency tree
- “works on my machine” problems become less likely

### Simple idea
- `package.json` = what is allowed
- `package-lock.json` = what was actually installed

## 10. Peer Dependencies

Some packages expect other packages to already be installed. Those expectations are called peer dependencies.

Examples of this idea:
- a React testing library may expect React 18 or 19
- an ESLint plugin may expect a specific ESLint major version
- a framework plugin may expect a specific Next.js version

If peer dependencies do not match, you may see warnings or install errors.

## 11. Common Warning Words to Look For

These messages often mean compatibility issues:
- `peer dependency`
- `unsupported engine`
- `requires Node >= ...`
- `EBADENGINE`
- `found incompatible module`
- `npm WARN`
- `requires a peer of`

Do not ignore these too quickly. They are often the first clue.

## 12. How to Track Dependency Problems

### Built-in tools
These are the easiest tools to use first:

- **GitHub Actions** - shows whether the project passes in the actual CI environment
- **npm outdated** - shows packages that have newer versions available
- **npm ls** - shows the installed dependency tree
- **npm explain <package>** - shows why a package exists in the tree
- **npm audit** - checks for known security issues
- **TypeScript / ESLint / build output** - often show problems early

### Useful commands

```bash
npm outdated
npm ls
npm explain <package-name>
npm audit
```

## 13. Third-Party Tools That Help

These tools can make dependency tracking easier:

- **Dependabot** - opens pull requests when packages have updates
- **Renovate** - more advanced update automation than Dependabot
- **Snyk** - security and dependency risk scanning
- **Socket** - package health and risk signals
- **npm-check-updates (ncu)** - quickly shows what can be upgraded

### What they are useful for
- **Dependabot / Renovate**: staying up to date automatically
- **Snyk / Socket**: noticing risky or unhealthy packages early
- **npm-check-updates**: seeing upgrade opportunities fast

## 14. Easy Workflow for Safe Updates

If you want to update Node or dependencies without breaking the project, use this order.

### Step 1: Check what changed
- Look at `package.json`
- Look at `package-lock.json`
- Look at CI workflow files
- Read the package release notes

### Step 2: Update one thing at a time
Do not update many packages and Node at the same time if you are debugging a failure.

### Step 3: Test locally before pushing
Run:

```bash
npm ci
npm run format:check
npm run lint
npm run type-check
npm run test -- --run
npm run test:e2e
npm run build
```

### Step 4: Compare local and CI
If local passes but CI fails, compare:
- Node version
- operating system
- install method
- environment variables

### Step 5: Fix the real source
Possible fixes:
- pin Node to a stable LTS version
- update the dependency
- downgrade the dependency if the new version is not ready
- update the peer dependency that it expects

## 15. How to Identify the Real Culprit

When something breaks, do not blame the first package you see in the error.

Ask these questions:
- What changed most recently?
- Did the problem start after a Node update?
- Did it start after a package update?
- Does the error happen in install, test, or build?
- Does the same command pass locally?
- Is the error about engines, peer dependencies, or a missing module?

The package named in the error is not always the package that caused the problem.

## 16. Safe Habits That Prevent Surprise Breakage

- Prefer one Node LTS version for both local work and CI
- Keep the lockfile committed
- Update gradually instead of all at once
- Read warnings instead of skipping them
- Use GitHub Actions as the final compatibility check
- Do not trust one lucky passing run if the version matrix still changes

## 17. Simple Mental Model

```text
package.json = allowed versions
package-lock.json = exact installed versions
Node version = runtime environment
CI = real compatibility test
```

If any one of these changes, the behavior can change too.

## 18. Beginner Rule of Thumb

If you want the least surprise:
- use a Node LTS version
- keep CI and local development on the same version
- update packages gradually
- run the full local check before pushing
- let GitHub Actions be the last consistency check

## 19. Short Summary

A dependency problem usually shows up in install, test, or build steps. The fastest way to diagnose it is to compare local and CI Node versions, read the first real error carefully, and use tools like `npm outdated`, `npm ls`, Dependabot, or Renovate to manage package updates.

If you keep the lockfile, use an LTS Node version, and test after each update, dependency issues become much easier to track and fix.

## 20. Node Release Channels (LTS vs Current)

Node versions are published in different channels. The two you will hear most are:
- **LTS (Long Term Support)**: stability-focused, best default for most projects
- **Current**: newest features, higher chance of ecosystem lag

For beginner and production workflows, LTS is usually the safest choice.

Why:
- tools and libraries test against LTS first
- CI reliability is usually better on LTS
- fewer surprise incompatibilities in package ecosystems

## 21. `npm ci` vs `npm install` (and why CI prefers `npm ci`)

These two commands are related but not the same.

- `npm install`
  - resolves dependencies and may update `package-lock.json`
  - useful during development when adding/updating packages

- `npm ci`
  - uses lockfile exactly as-is
  - fails if lockfile and `package.json` are out of sync
  - faster and more reproducible in CI

That is why workflows normally use `npm ci`: it enforces consistency.

## 22. Lockfile Drift and How It Breaks Builds

Lockfile drift happens when:
- `package.json` changes
- but `package-lock.json` is not updated or not committed

Typical symptoms:
- local install works but CI fails
- `npm ci` fails with lockfile mismatch messages
- different dependency trees between teammates

How to avoid drift:
- after dependency changes, run install locally
- commit both `package.json` and `package-lock.json`
- prefer `npm ci` in CI and `npm ci` locally when verifying

## 23. Why OS Differences Matter (Windows vs Ubuntu CI)

Your local machine may be Windows while GitHub Actions often runs Ubuntu. This can expose differences in:
- shell command behavior
- executable wrappers (`.cmd` on Windows)
- path separators and path casing
- native module binaries
- browser/system dependencies for Playwright

If local passes but CI fails, OS differences are a serious suspect.

Practical checks:
- read the failing CI step carefully
- compare exact command and environment
- avoid shell assumptions that only work on one OS

## 24. CI Cache Behavior (When Cache Helps and When It Hurts)

Caching dependencies can speed up CI, but stale cache can sometimes hide or delay incompatibility signals.

Useful mental model:
- cache speeds up installs
- lockfile controls correctness
- if cache and lockfile disagree, strange behavior can happen

If failures are inconsistent between runs:
- check if dependency cache changed
- rerun with clean install behavior
- ensure lockfile is committed and current

## 25. Fast Troubleshooting Decision Tree

Use this when CI fails unexpectedly:

1. **Identify the first failing step**
	- install, lint, test, or build

2. **Read the first real error**
	- ignore secondary cascade errors first

3. **Check environment parity**
	- compare local Node vs CI Node
	- compare OS assumptions

4. **Check dependency consistency**
	- run `npm ci`
	- verify lockfile is committed

5. **Check version compatibility hints**
	- `engines`, peer dependency warnings, unsupported runtime messages

6. **Minimize moving parts**
	- revert to one Node LTS in CI if matrix is noisy
	- update one package at a time

7. **Re-run targeted checks**
	- do not rerun everything blindly first
	- rerun the exact failing command

This method helps you isolate cause quickly instead of random trial-and-error.

## 26. Recommended Baseline for This Project

For this repository, a practical baseline is:
- use one LTS Node version as the default locally
- keep CI matrix only if you truly support multiple Node majors
- keep `package-lock.json` committed and current
- run local checks before each push
- treat CI as the final source of truth for compatibility

This baseline reduces flaky failures and makes debugging faster.
