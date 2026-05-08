# Vercel Deployment Step-by-Step Guide for Beginners

This guide walks you through deploying your Next.js portfolio to Vercel with exact clicks and what to expect at each stage.

---

## Prerequisites: Make Sure You Have These

Before starting, verify:

- ✅ **GitHub account** — already created and logged in
- ✅ **Repository pushed to GitHub** — your code is on `origin/main` (run `git status` to verify)
- ✅ **CI passing on GitHub Actions** — green checkmark on your latest commit
- ✅ **Vercel account** — you'll create this in Step 1 (free tier is fine)

**Quick check:** Go to your GitHub repo in a browser. Do you see a green checkmark ✅ next to your latest commit? If yes, proceed. If no, run `npm run build` locally first and push again.

---

## Step 1: Create or Log Into Your Vercel Account

### What to Do:
1. Open a web browser and go to **https://vercel.com**
2. Click **"Sign Up"** button (top right)
3. Choose **"Continue with GitHub"** (this links your GitHub account)
4. You'll see a GitHub login screen — log in with your GitHub username/password
5. GitHub will ask "Authorize Vercel to access your account?" — click **"Authorize Vercel"**
6. You're now logged into Vercel

### ⚠️ What to Watch For:
- **After authorization**, you should see your name/email in the top right of vercel.com
- **If you already have a Vercel account**, just log in normally — no need to sign up again
- **You should NOT see any error messages** at this stage

### ✅ Success Looks Like:
You see your Vercel dashboard with a "Create Team" section and an "Import Project" button.

---

## Step 2: Import Your GitHub Repository to Vercel

### What to Do:
1. On the Vercel dashboard, click **"Import Project"** button (or look for "New Project")
2. You'll see a page asking "Where's your code?"
3. Click **"Import Git Repository"** (this should show GitHub as the option)
4. A list of your GitHub repositories will appear
5. Find your **Portfolio** repository and click on it
6. You'll see "Configure Project" — this is normal, leave defaults for now and click **"Deploy"**

### ⚠️ What to Watch For:
- **Vercel auto-detects Next.js** — you should see "Next.js" listed as the framework (good sign)
- **Root directory should be `.`** (dot = current directory) — don't change this
- **Build command should auto-fill as `next build`** — this is correct, don't change it
- **Output directory should auto-fill as `.next`** — this is correct, don't change it

### ✅ Success Looks Like:
- You see "Importing repository..." and then a deployment log starts scrolling
- Build log shows steps like:
  - "Installing dependencies..."
  - "Building application..."
  - "Ready to deploy..."

---

## Step 3: Wait for Initial Deployment (Takes 2-5 Minutes)

### What to Do:
Just wait. The deployment log will scroll by itself. You don't need to do anything.

### 📊 What You'll See in the Log:
```
Cloning git repository...
Running npm install...
Running next build...
Generated static pages...
✓ Build completed successfully
```

### ⚠️ What to Watch For:
- **If you see RED ERROR text**, stop here and check the **Troubleshooting** section below
- **If the log stops scrolling for more than 1 minute**, it might be stuck — refresh the page
- **Build usually takes 30-60 seconds** for a fresh project

### ✅ Success Looks Like:
- Log ends with a section that shows:
  ```
  Deployment completed
  Production URL: https://[your-project-name].vercel.app
  ```
- You see a **live URL link** in green text (clickable)

---

## Step 4: Verify Your Deployment is Live

### What to Do:
1. After deployment completes, you'll see a green **"Visit"** button — click it
2. This opens your live portfolio in a new browser tab
3. The page should load and look exactly like your local `npm run dev` version
4. Try clicking around — buttons should work

### ⚠️ What to Watch For:
- **Wait 5-10 seconds for the page to load** (first visit is always slower)
- **If you see a "404" error or blank page**, something went wrong — check **Troubleshooting**
- **If styling looks wrong** (no colors, layout broken), it's a CSS issue — check **Troubleshooting**
- **If you see "Application Error"**, check the deployment log for TypeScript/syntax errors

### ✅ Success Looks Like:
- Homepage loads with correct layout and colors
- Navigation links work
- You can see your name/portfolio content

---

## Step 5: Test Your API Endpoint (Health Check)

### What to Do:
1. Take your deployed URL from Step 4 (e.g., `https://my-portfolio.vercel.app`)
2. Add `/api/health` to the end → `https://my-portfolio.vercel.app/api/health`
3. Paste into your browser address bar and press Enter
4. You should see plain text that says: `{"status":"ok"}`

### ⚠️ What to Watch For:
- **If you see `{"status":"ok"}`** — perfect, API is working ✓
- **If you see a blank page or 404**, your API route didn't deploy correctly
- **If you see an error**, check that your `/app/api/health/route.ts` file exists locally

### ✅ Success Looks Like:
Browser shows:
```
{"status":"ok"}
```

---

## Step 6: Configure Preview Deployments (Optional but Recommended)

### What to Do:
1. Go back to Vercel (your dashboard)
2. Click on your project name
3. Click **"Settings"** tab (top menu)
4. Scroll down to **"Git"** section
5. Under "Deploy on Push", make sure **"main branch"** is selected
6. Under "Preview Deployments", make sure it says **"All"** (to get preview links on pull requests)
7. Click **"Save"**

### ⚠️ What to Watch For:
- You should see checkboxes for these options — all should be enabled by default
- This setting lets you get a live preview link every time you push code to a branch

### ✅ Success Looks Like:
Settings show:
- Production: main
- Preview: All branches

---

## Step 7: Set Up Custom Domain (Optional — Only If You Have One)

### What to Do:
If you have a custom domain (e.g., `myname.com`):
1. In Vercel project settings, click **"Domains"** tab
2. Click **"Add Domain"**
3. Type your domain name
4. Vercel will show you DNS records to add to your domain registrar (GoDaddy, Namecheap, etc.)
5. Add those DNS records and wait 24 hours for them to propagate

### ⚠️ What to Watch For:
- This is **optional** — your deployment works fine with the `.vercel.app` URL
- DNS propagation takes 5 minutes to 24 hours
- You'll need access to your domain registrar's DNS settings

### ✅ Success Looks Like:
After 24 hours, your custom domain redirects to your portfolio.

---

## What to Watch For at Each Stage: Troubleshooting

### 🔴 Deployment Failed / Red Error in Build Log

**Most Common Causes:**

#### 1. **TypeScript Error**
- **Error message contains:** `error TS` or `Cannot find module`
- **Fix:** Run `npm run type-check` locally to see the error, fix it, and push again

#### 2. **Missing Environment Variable**
- **Error message contains:** `process.env.SOMETHING is undefined`
- **Fix:** Go to Vercel → Project Settings → "Environment Variables" → Add the variable
- **Then:** Go back to "Deployments" → Click latest failed deploy → Click "Redeploy"

#### 3. **Node Version Mismatch**
- **Error message contains:** `unsupported node version` or module not found
- **Fix:** In Vercel project settings, under "Environment", set Node version to 20 or 24

#### 4. **Build Times Out**
- **Error message contains:** `Build timed out`
- **Fix:** This is rare, but if it happens, contact Vercel support or optimize your build locally first

### 🟡 Page Loads but Styling is Broken / No Colors

**Most Common Cause:** Tailwind CSS didn't compile

- **Fix:** 
  1. Go to Vercel → Project settings → "Environment Variables"
  2. Add a new variable: 
     - Key: `NEXT_PUBLIC_SKIP_ENV_VALIDATION`
     - Value: `true`
  3. Redeploy (click "Redeploy" on latest deployment)

### 🟡 Page Shows "Application Error"

**Cause:** Runtime error on the page

- **Fix:**
  1. Click the Vercel deployment to open the logs
  2. Look for the red error message
  3. Note the file name and line number
  4. Fix locally and push again

### 🟡 API Endpoint Returns 404

**Cause:** Route file not deployed

- **Fix:**
  1. Verify `/app/api/health/route.ts` exists locally
  2. Run `npm run build` locally to test the build
  3. Push the code again
  4. Redeploy in Vercel

### 🟡 Static Optimization Failed

- **Error message contains:** `Static optimization failed`
- **Fix:** Usually temporary — just click "Redeploy" and try again

---

## After Deployment: Next Steps for Phase 1

Once your deployment is live:

### ✅ Immediate Next Step:
**Enable GitHub branch protection** (this is the final Phase 1 external task)

This prevents accidental merges to `main` without:
- Passing CI tests (GitHub Actions)
- Passing code review
- Passing Vercel preview deploy

Once this is set up, every code change goes through a full review and test cycle before it touches production.

### Then:
- Monitor your Vercel analytics
- Set up error logging (optional, but recommended)
- Plan Phase 2: more features, API integration, database

---

## Quick Reference: Vercel URLs

Once deployed, you'll have these URLs:

- **Production:** `https://[your-project-name].vercel.app`
- **API Health Check:** `https://[your-project-name].vercel.app/api/health`
- **Preview Deploys:** When you open a pull request, Vercel creates a preview URL automatically
- **Vercel Dashboard:** `https://vercel.com` → your project

---

## Need Help?

If something goes wrong:
1. **Check the Troubleshooting section above first**
2. **Look at your deployment log** (click the failed deploy in Vercel)
3. **Run the same build locally** (`npm run build`) to see if it's a local problem
4. **Check GitHub Actions** to make sure CI passed before deployment
5. **Post the error message** if none of the above help

---

**You're done!** Your portfolio is now live on Vercel. Share the URL: `https://[your-project-name].vercel.app`
