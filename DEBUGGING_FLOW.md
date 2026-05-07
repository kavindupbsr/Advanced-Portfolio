# Debugging Flow and What I Watch

This guide explains how I find issues in the app, how I reason through them, what signals I look at, and how I access those signals in this workspace.

## 1. My Debugging Flow

When something looks wrong, I usually follow this order:

1. **Start with the symptom**
   - What is broken?
   - Is it a page crash, wrong UI, failed test, warning, or build error?

2. **Check the most local signal first**
   - If it is a browser problem, I inspect the browser page snapshot and visible output.
   - If it is a runtime/server problem, I inspect the dev server terminal.
   - If it is a test failure, I inspect the test runner output.

3. **Identify the smallest failing surface**
   - One page
   - One component
   - One API route
   - One config file

4. **Form one hypothesis**
   - Example: "The page loads, but the route is missing content."
   - Example: "The dev server is warning about the wrong workspace root."
   - Example: "The test failed because the browser binary was missing."

5. **Check the cheapest proof**
   - Open the page directly.
   - Read the terminal output.
   - Look at the test result.
   - Inspect the file that owns the behavior.

6. **Fix the root cause, then re-check**
   - Make the smallest code change that addresses the issue.
   - Re-run the relevant check.
   - Confirm the symptom is gone.

## 2. Example From This Project

When I checked the app, I followed this path:

- Opened the homepage in the browser
- Verified the title and main heading rendered
- Navigated to `/projects` and `/contact`
- Checked `/api/health`
- Watched the dev server output for warnings

That let me confirm:
- The app rendered correctly
- The API endpoint returned JSON
- There was one warning about Next.js workspace root detection

That warning did not break the app, but it was a useful signal because it could cause confusion later.

## 3. Signals I Watch

### Browser page output
What it tells me:
- Whether the page renders
- Whether the right text appears
- Whether navigation works
- Whether there are visible UI failures

Examples:
- Missing heading
- Blank page
- Broken link
- Wrong content on a route

### Browser console output
What it tells me:
- Client-side warnings
- JavaScript errors
- Failed network requests
- React/runtime issues

Examples:
- A warning about ignored events
- A runtime error from a component
- A failed fetch request

### Dev server terminal output
What it tells me:
- Whether Next.js started correctly
- Whether the server is running
- Whether there are config warnings
- Whether a page crashes on request

Examples:
- Next.js build or compile errors
- Workspace root warning
- Missing environment variables

### Test runner output
What it tells me:
- Which test failed
- What assertion failed
- Whether the failure is in unit tests or E2E tests

Examples:
- Vitest cannot find `jsdom`
- Playwright browser binary missing
- A page assertion does not match

### API response output
What it tells me:
- Whether the backend route works
- Whether JSON is valid
- Whether the status code is correct

Examples:
- `/api/health` returns `{ "status": "ok" }`
- A route returns 404 or 500

### TypeScript and lint output
What it tells me:
- Whether the code is valid by type rules
- Whether there are style or correctness issues

Examples:
- Type mismatch
- Missing import
- Unsafe props usage

### Git status and diff
What it tells me:
- What changed
- Whether files are staged
- Whether there are unexpected edits

Examples:
- Untracked workflow file
- Modified config file
- Deleted route that should not be deleted

## 4. How I Access These Signals

I do not guess. I use the available tools to inspect each signal directly.

### Terminal access
I use the terminal to run commands and read output.

Useful tools:
- `run_in_terminal`
- `get_terminal_output`
- `send_to_terminal`
- `terminal_last_command`

What I use it for:
- Start the dev server
- Run tests
- Run build/type-check/lint
- Install dependencies
- Check command failures

### Browser access
I use the browser tools to inspect the live app.

Useful tools:
- `open_browser_page`
- `navigate_page`
- `read_page`
- `screenshot_page`
- `click_element`
- `type_in_page`

What I use it for:
- Open the app in a real browser
- Inspect page text and structure
- Click links and buttons
- Check routes like `/projects` or `/contact`
- Confirm the app behaves as expected

### File access
I use file tools to inspect the source of truth.

Useful tools:
- `read_file`
- `file_search`
- `grep_search`
- `semantic_search`

What I use it for:
- Read the component or config that controls the bug
- Search for where a string or symbol is used
- Compare the current implementation with expected behavior

### Git and workspace status
I use git tools to understand what changed and whether the repo is clean.

Useful tools:
- `mcp_gitkraken_git_status`
- `mcp_gitkraken_git_log_or_diff`
- `mcp_gitkraken_git_add_or_commit`
- `mcp_gitkraken_git_branch`

What I use it for:
- Check staged and unstaged changes
- Review diffs
- Organize commits
- Confirm the repo is ready to push

### Code errors and type checks
I use error-reporting tools to see compiler and diagnostics output.

Useful tools:
- `get_errors`
- `vscode_listCodeUsages`
- `vscode_renameSymbol`

What I use it for:
- Find TypeScript errors
- See where symbols are used
- Rename safely across the workspace

## 5. How I Reason Through a Problem

My reasoning pattern is usually:

- **What is failing?**
- **Where is the failure visible?**
- **What is the smallest file or route that controls it?**
- **What is the cheapest check that can confirm or disprove my guess?**
- **What is the smallest safe fix?**
- **Did the fix change the actual symptom?**

That keeps me from wandering around the repo.

## 6. Practical Checklist

When debugging, I typically check these in order:

1. Browser page visible content
2. Browser console warnings or errors
3. Dev server terminal output
4. Test runner output
5. File contents for the route or component
6. Git status if the issue may be from recent edits
7. Type/lint/build output if the problem is code correctness

## 7. Common Examples and What They Mean

### Example: Page loads but content is wrong
Likely causes:
- Wrong route file
- Missing component prop
- Conditional render issue

Best checks:
- Read the page snapshot
- Read the route file
- Search for the heading or text

### Example: Server starts but warns about workspace root
Likely causes:
- Duplicate lockfiles
- Nested repo folder
- Wrong workspace root detection

Best checks:
- Read terminal warning
- Check folder layout
- Confirm where `package.json` and lockfiles are located

### Example: E2E test fails before the page opens
Likely causes:
- Browser binaries missing
- Wrong Playwright config
- Web server not starting

Best checks:
- Read Playwright output
- Check `playwright.config.ts`
- Confirm the browser install step

### Example: Vitest fails with module not found
Likely causes:
- Missing dependency
- Wrong alias config
- Test file picked up by the wrong runner

Best checks:
- Read the test output carefully
- Check `vitest.config.ts`
- Compare unit test folder vs e2e folder

## 8. What I Try Not To Do

- I do not assume the first error is the real cause.
- I do not edit random files until I know the owning file.
- I do not widen the search too early.
- I do not trust the browser alone when the terminal already has a clearer answer.
- I do not trust the terminal alone when the browser can show the visible symptom.

## 9. Short Version

The workflow is:

**symptom -> signal -> smallest owner file -> hypothesis -> cheap proof -> fix -> re-check**

That is the basic reasoning flow I use to debug this app.
