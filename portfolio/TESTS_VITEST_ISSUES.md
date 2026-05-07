**Vitest Run Failures — What Happened & How I Fixed It**

Summary
- **What happened:** Running the test suite initially failed. Vitest reported missing runtime modules and some tests were run in the wrong runner, causing ERR_MODULE_NOT_FOUND and import resolution errors.

Root causes
- **Missing jsdom runtime:** The test environment requires `jsdom` (Vitest's `environment: "jsdom"`) but `jsdom` was not installed as a dev dependency, producing `ERR_MODULE_NOT_FOUND`.
- **Test scoping + alias resolution:** Vitest attempted to run e2e tests and unit tests together, and imports using the `@` path alias (e.g. `@/components/...`) were not resolved by Vitest until an alias mapping was added.

Fixes applied
1) Install `jsdom` as a dev dependency (provides the DOM environment for unit tests):

```bash
npm install -D jsdom
```

2) Scope Vitest to only the unit tests (exclude e2e) so unit runner doesn't try to execute Playwright specs:

Before (problematic):

```ts
// vitest.config.ts (initial)
test: {
  environment: "jsdom",
  globals: true,
  include: ["tests/unit/**/*.test.{ts,tsx}"],
  exclude: [],
}
```

After (scoped to unit tests, excluded e2e):

```ts
// vitest.config.ts (updated)
test: {
  environment: "jsdom",
  globals: true,
  include: ["tests/unit/**/*.test.{ts,tsx}"],
  exclude: ["tests/e2e/**"],
}
```

3) Add path alias resolution to Vitest so imports like `@/...` resolve to `./src`.

Before (no alias mapping):

```ts
// vitest.config.ts (initial)
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: { /* ... */ },
});
```

After (alias mapping added):

```ts
// vitest.config.ts (updated)
import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    include: ["tests/unit/**/*.test.{ts,tsx}"],
    exclude: ["tests/e2e/**"],
  },
});
```

Validation steps performed
- `npm run format` — formatting pass (no issues).
- `npm run type-check` — TypeScript checks passed.
- `npm run test` (Vitest) — unit tests run under jsdom and passed after fixes.
- `npm run test:e2e -- --list` — Playwright e2e tests listed (kept separate from Vitest).

Notes / Why this is safe
- Installing `jsdom` is expected for unit tests that use a DOM-like environment.
- Keeping e2e tests out of the unit test runner avoids environment conflicts — Playwright/Node e2e tests should run in the Playwright runner.
- Alias mapping in `vitest.config.ts` mirrors the project's runtime resolution so tests import modules the same way the app does.

Files changed (examples)
- `vitest.config.ts` — added `resolve.alias` and scoping in `test.include`/`test.exclude`.
- package.json — `jsdom` added as a devDependency (via `npm install -D jsdom`).

If you want, I can also:
- Run the full Playwright E2E suite now.
- Add a CI workflow that runs `format:check`, `type-check`, `vitest` (unit), and Playwright e2e on PRs.
