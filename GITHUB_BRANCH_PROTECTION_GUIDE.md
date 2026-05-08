# GitHub Branch Protection Step-by-Step Guide

This guide protects your `main` branch so code can only merge after passing CI tests and Vercel preview deploys.

---

## Prerequisites

- ✅ Your GitHub repository is public or private (doesn't matter)
- ✅ GitHub Actions CI workflow is set up (`.github/workflows/ci.yml`)
- ✅ Vercel is connected to your GitHub repo
- ✅ You are the owner or have admin access to the repository

---

## Step 1: Go to Repository Settings

### What to Do:
1. Open your GitHub repository in a browser (e.g., `https://github.com/your-username/Portfolio`)
2. Click the **"Settings"** tab (you'll see it in the top menu)
3. Look for the left sidebar menu
4. Click **"Branches"** (under "Code and automation" section)

### ⚠️ What to Watch For:
- You need **Admin** access to see the Settings tab
- If you don't see "Settings", you don't have permission — ask the repo owner

### ✅ Success Looks Like:
You see a page titled "Branches" with a section called "Branch protection rules"

---

## Step 2: Create a Branch Protection Rule

### What to Do:
1. On the "Branches" page, click **"Add rule"** button
2. In the **"Branch name pattern"** field, type: `main`
3. Now you'll see checkboxes for protection rules

### ⚠️ What to Watch For:
- Type exactly `main` (lowercase, no spaces)
- Don't hit Enter yet — you need to configure the rules first

### ✅ Success Looks Like:
You see checkboxes appearing for rules like "Require status checks to pass", "Require pull request reviews", etc.

---

## Step 3: Enable Required Status Checks

### What to Do:
1. **Check the box** for **"Require status checks to pass before merging"**
2. You'll see a section appear: "Search for status checks in the last week for this repository"
3. In the search box, type: `ci`
4. You should see your GitHub Actions workflow appear (it says something like `ci` or `.github/workflows/ci.yml`)
5. **Click on it to select it** — it will turn blue with a checkmark

### ⚠️ What to Watch For:
- Wait 2-3 seconds for the search to show results
- You should see checkmarks for Node versions (e.g., `ci (20.x)` and `ci (24.x)`)
- **Select both** if they appear — this ensures your code passes on both Node versions

### ✅ Success Looks Like:
The workflow name is now shown in a blue box/tag below the search field

---

## Step 4: (Optional) Require Vercel Preview Deploy

### What to Do:
1. In the same search box, type: `vercel`
2. You should see a status check appear: something like `vercel/your-project`
3. Click it to select it

### ⚠️ What to Watch For:
- If Vercel doesn't show up, your Vercel account might not be properly linked to GitHub
- This is optional but recommended — it ensures every PR gets a live preview deploy

### ✅ Success Looks Like:
Vercel status check appears as a blue tag

---

## Step 5: (Optional) Require Pull Request Reviews

### What to Do:
1. **Check the box** for **"Require pull request reviews before merging"**
2. Set **"Number of required reviewers"** to `1`
3. You can check **"Dismiss stale pull request approvals when new commits are pushed"** (good practice)
4. You can check **"Require review from Code Owners"** if you have a CODEOWNERS file (skip for now)

### ⚠️ What to Watch For:
- This requires someone else to review your code before merging
- For a personal project, you can skip this step for now (uncheck if not needed)
- If you do this, you'll need to use a separate account or ask a friend to review PRs

### ✅ Success Looks Like:
At least 1 reviewer is required (if you checked the box)

---

## Step 6: Save the Branch Protection Rule

### What to Do:
1. Scroll to the bottom of the page
2. Click **"Create"** button (or "Save" if editing an existing rule)
3. You should see a green checkmark and a confirmation message

### ⚠️ What to Watch For:
- If you see a red error, check that `main` is spelled correctly
- If CI checks don't appear, go back to Step 3 and try searching again

### ✅ Success Looks Like:
You see a green message: "Branch protection rule has been created"

You're back on the "Branches" page and see your rule listed under "Branch protection rules"

---

## Step 7: Test the Branch Protection

### What to Do:
1. Create a test branch locally:
   ```bash
   git checkout -b test-branch
   ```

2. Make a small change (e.g., add a comment to README.md):
   ```bash
   # Add a comment or small text change
   git add README.md
   git commit -m "test: branch protection"
   git push origin test-branch
   ```

3. Go to GitHub and open a Pull Request (PR) from `test-branch` to `main`
4. **Watch what happens:**
   - GitHub should show "Status checks" running (yellow spinner)
   - After 1-2 minutes, you should see ✅ green checkmarks for CI
   - You should NOT be able to click "Merge" until checks pass
   - Once checks pass, "Merge" button becomes clickable (but only if you approve)

### ⚠️ What to Watch For:
- **If Merge button is grayed out**, checks are still running — wait
- **If you see red ❌**, a test failed — fix it locally and push again
- **If you can't merge even with green checks**, you might have another rule (like requiring reviews)

### ✅ Success Looks Like:
- ✅ All status checks are green
- 🔴 Merge button is red/disabled until checks pass
- After checks pass, Merge button is active and clickable

---

## Step 8: Clean Up Test Branch (Optional)

### What to Do:
Once you've confirmed branch protection works:
1. Click **"Dismiss Review"** (if you required reviews)
2. Click **"Merge pull request"** button (or you can close the PR without merging)
3. Click **"Delete branch"** (to clean up)

Or just close the PR without merging (since it was only a test).

### ✅ Success Looks Like:
Test branch is deleted and `main` branch is clean

---

## What You've Just Set Up

✅ **Code can only merge to `main` if:**
- All GitHub Actions CI tests pass (Node 20.x and 24.x)
- Vercel preview deploy succeeds (if you enabled it)
- Code review approved (if you enabled it)

✅ **This prevents:**
- Broken code reaching production
- Tests failing in production
- Accidental direct pushes to `main`

✅ **Your workflow is now:**
1. Create feature branch
2. Make changes
3. Push and open a PR
4. Wait for CI to pass ✓
5. Get code review ✓
6. Merge to `main` (auto-deploys to Vercel production)

---

## Troubleshooting

### "Merge button is still grayed out after checks pass"

**Cause:** You might have required reviews enabled

**Fix:** 
- If you enabled "Require pull request reviews", you need to approve the PR yourself (from a different account) or add reviewers
- For now, you can uncheck this option in settings if you're working alone

### "I can't see GitHub Actions in the status checks"

**Cause:** Workflow hasn't run yet on this repo

**Fix:**
1. Make sure you pushed a commit to your repo
2. Go to "Actions" tab on GitHub
3. Verify your CI workflow ran and passed
4. Go back to branch protection settings and search for `ci` again

### "Status checks won't show up in the dropdown"

**Cause:** The workflow hasn't completed a full run yet

**Fix:**
1. Go to Actions tab
2. Wait for the workflow to complete
3. Come back to branch protection settings
4. Search again — it should appear

---

## You're Done!

Your `main` branch is now protected. Every code change requires:
- ✅ CI tests passing
- ✅ Vercel preview deploy succeeding
- (Optional) Code review approval

This is **Phase 1 External Setup Complete** ✓

### Next: Phase 2

Now that your dev environment is solid and deployment is automated, you can focus on building features. Every new feature follows the same pattern:
1. Create a branch
2. Build feature
3. Tests pass locally
4. Push → PR → CI passes → Vercel preview → Merge → Production auto-updates
