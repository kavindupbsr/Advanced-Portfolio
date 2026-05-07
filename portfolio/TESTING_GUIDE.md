# Testing Guide: Unit Tests vs E2E Tests

## Overview

This project uses two complementary testing frameworks:
- **Vitest** (Unit Tests) — test individual components and functions in isolation
- **Playwright** (E2E Tests) — test the full app as a real user would

Both are essential for different reasons and catch different types of bugs.

---

## Unit Tests (Vitest)

### What They Are
Unit tests verify **individual components or functions** work correctly **in isolation**. They run fast and focus on logic, props, rendering, and state.

### Key Characteristics
- **Environment:** jsdom (simulated DOM, no real browser)
- **Speed:** Fast (milliseconds per test)
- **Scope:** Single component or function
- **Dependencies:** Mocked or stubbed
- **Run Command:** `npm run test`

### Vitest Config in This Project

```typescript
// vitest.config.ts
import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",      // Simulated DOM for testing
    globals: true,              // Use global test/expect (no imports needed)
    include: ["tests/unit/**/*.test.{ts,tsx}"],  // Only run unit tests
    exclude: ["tests/e2e/**"],  // Exclude E2E specs
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
    },
  },
});
```

### Example Unit Test

```typescript
// tests/unit/button.test.tsx
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/Button";

test("Button renders with correct text", () => {
  render(<Button>Click Me</Button>);
  
  // Assert the button is in the DOM with the correct text
  expect(screen.getByRole("button", { name: /Click Me/i })).toBeInTheDocument();
});

test("Button calls onClick handler when clicked", () => {
  const handleClick = vi.fn();
  render(<Button onClick={handleClick}>Click Me</Button>);
  
  // Simulate a click
  screen.getByRole("button").click();
  
  // Assert the handler was called once
  expect(handleClick).toHaveBeenCalledOnce();
});

test("Button is disabled when disabled prop is true", () => {
  render(<Button disabled>Click Me</Button>);
  
  // Assert the button has the disabled attribute
  expect(screen.getByRole("button")).toBeDisabled();
});
```

### What Unit Tests Catch
✅ Component rendering errors  
✅ Props handling  
✅ State updates  
✅ Event handlers  
✅ Conditional logic  
✅ Utility function bugs  

### What Unit Tests Miss
❌ Real browser behavior (CSS, layout)  
❌ Integration between components  
❌ API calls and network behavior  
❌ Real user interactions (click, type, scroll)  
❌ Cross-browser compatibility  

---

## E2E Tests (Playwright)

### What They Are
End-to-End (E2E) tests verify the **entire app works** from a user's perspective using a **real browser**. They simulate actual user behavior like clicking, typing, and navigating.

### Key Characteristics
- **Environment:** Real browser (Chromium, Firefox, WebKit)
- **Speed:** Slower (seconds per test, full app startup)
- **Scope:** Multiple pages, flows, integrations
- **Dependencies:** Real API calls, real database
- **Run Command:** `npm run test:e2e`

### Playwright Config in This Project

```typescript
// playwright.config.ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests/e2e",                    // Look for tests here
  use: {
    baseURL: "http://localhost:3000",      // Resolve relative URLs
  },
  webServer: {
    command: "npm run dev",                 // Start the dev server
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,  // Reuse server in local dev
    timeout: 120000,
  },
});
```

### Example E2E Test

```typescript
// tests/e2e/smoke.spec.ts
import { test, expect } from "@playwright/test";

test("home page loads", async ({ page }) => {
  // Navigate to the home page
  await page.goto("/");
  
  // Assert the main heading is visible (simulating a user viewing the page)
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("user can navigate to about page", async ({ page }) => {
  await page.goto("/");
  
  // Click the "About" link (simulating user interaction)
  await page.getByRole("link", { name: /about/i }).click();
  
  // Assert the URL changed and content loaded
  await expect(page).toHaveURL("/about");
  await expect(page.getByRole("heading", { name: /about/i })).toBeVisible();
});

test("health endpoint returns ok", async ({ request }) => {
  // Make an API request (simulating real network calls)
  const response = await request.get("/api/health");
  
  // Assert the response is successful
  expect(response.ok()).toBeTruthy();
  
  // Assert the response body contains expected data
  const json = await response.json();
  expect(json.status).toBe("ok");
});

test("contact form submission works", async ({ page }) => {
  await page.goto("/contact");
  
  // Fill out a form (simulating user typing)
  await page.fill('input[name="email"]', "test@example.com");
  await page.fill('textarea[name="message"]', "Hello!");
  
  // Submit the form (simulating user click)
  await page.click('button[type="submit"]');
  
  // Assert success page appears
  await expect(page).toHaveURL("/contact/success");
  await expect(page.getByText(/thank you/i)).toBeVisible();
});
```

### What E2E Tests Catch
✅ Full user workflows (click → navigate → submit)  
✅ Page integration (layout, navigation, routing)  
✅ Real API behavior  
✅ CSS and layout rendering  
✅ Cross-page state management  
✅ Real browser features (localStorage, cookies, etc.)  

### What E2E Tests Miss
❌ Internal component logic details  
❌ Small unit-level bugs (caught by unit tests)  
❌ Performance bottlenecks  
❌ Edge cases in utility functions  

---

## Side-by-Side Comparison

| Aspect | Unit Tests (Vitest) | E2E Tests (Playwright) |
|--------|---------------------|------------------------|
| **What** | Single component/function | Entire user flow |
| **Browser** | Simulated (jsdom) | Real (Chrome, Firefox) |
| **Speed** | Fast (ms) | Slow (seconds) |
| **Setup** | Simple, no server needed | Server must be running |
| **Mocking** | Easy to mock APIs | Real API calls |
| **Cost** | Cheap to run | Expensive to run |
| **Where** | `tests/unit/` | `tests/e2e/` |
| **Run** | `npm run test` | `npm run test:e2e` |
| **Best For** | Logic, rendering, props | User flows, integration |

---

## How They Work Together

```
┌─────────────────────────────────────────────────┐
│         Your Component (Button.tsx)             │
└─────────────────────────────────────────────────┘
                        ▲
                        │
        ┌───────────────┴───────────────┐
        │                               │
   ┌────────────────┐          ┌────────────────┐
   │ Unit Test      │          │ E2E Test       │
   │ (Vitest)       │          │ (Playwright)   │
   ├────────────────┤          ├────────────────┤
   │✓ Renders prop  │          │✓ User clicks   │
   │✓ Calls onClick │          │✓ Page updates  │
   │✓ State changes │          │✓ CSS applies   │
   │✓ Logic works   │          │✓ API responds  │
   │                │          │✓ Flow completes│
   └────────────────┘          └────────────────┘
      (Fast, isolated)           (Slow, integrated)
```

### Best Practice
1. **Write many unit tests** — they run fast and give confidence in individual pieces
2. **Write key E2E tests** — they validate the critical user workflows work end-to-end
3. **Use E2E sparingly** — only test important user flows, not every possible interaction

---

## In This Project

### Unit Test Setup
```bash
npm run test              # Run all unit tests once
npm run test -- --watch  # Run unit tests in watch mode (auto-rerun on file change)
```

**Location:** `tests/unit/button.test.tsx`  
**What it tests:** Button component renders and handles clicks

### E2E Test Setup
```bash
npm run test:e2e           # Run E2E tests
npm run test:e2e -- --ui   # Run with interactive UI
npm run test:e2e -- --list # List all E2E tests (no execution)
```

**Location:** `tests/e2e/smoke.spec.ts`  
**What it tests:**
- Home page loads and displays heading
- Health API endpoint responds with ok status

---

## Common Test Patterns

### Pattern 1: Render & Assert (Unit)
```typescript
test("Card displays title correctly", () => {
  render(<Card title="My Card" />);
  expect(screen.getByText("My Card")).toBeInTheDocument();
});
```

### Pattern 2: Mock Props (Unit)
```typescript
test("Link component accepts href", () => {
  render(<Link href="/about">About</Link>);
  expect(screen.getByRole("link")).toHaveAttribute("href", "/about");
});
```

### Pattern 3: User Interaction (Unit)
```typescript
test("Input value updates on type", async () => {
  const { getByRole } = render(<Input />);
  const input = getByRole("textbox");
  
  await userEvent.type(input, "hello");
  expect(input).toHaveValue("hello");
});
```

### Pattern 4: Navigate & Assert (E2E)
```typescript
test("user can navigate using links", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /blog/i }).click();
  await expect(page).toHaveURL("/blog");
});
```

### Pattern 5: Form Submission (E2E)
```typescript
test("form submission works", async ({ page }) => {
  await page.goto("/contact");
  await page.fill('input[type="email"]', "user@example.com");
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL("/contact/success");
});
```

---

## Debugging Tests

### Debug Unit Tests
```bash
# Run a single test file
npm run test -- tests/unit/button.test.tsx

# Run tests matching a pattern
npm run test -- --grep "Button"

# Run with verbose output
npm run test -- --reporter=verbose
```

### Debug E2E Tests
```bash
# Run tests with Playwright Inspector (pause & inspect)
npx playwright test --debug

# Run with UI mode (watch tests interactively)
npm run test:e2e -- --ui

# Generate test trace for debugging failures
npm run test:e2e -- --trace on
```

---

## Key Takeaways

1. **Unit tests** = Fast feedback on individual pieces  
2. **E2E tests** = Confidence that the whole app works  
3. **Both together** = Bulletproof coverage  
4. **Location matters:** Unit tests in `tests/unit/`, E2E in `tests/e2e/`  
5. **Environment matters:** Vitest uses jsdom, Playwright uses real browser  
6. **Speed trade-off:** Unit fast, E2E slow—write many unit, few E2E  

---

## References

- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Library Best Practices](https://testing-library.com/docs/queries/about/)
- [Playwright Locators Guide](https://playwright.dev/docs/locators)
