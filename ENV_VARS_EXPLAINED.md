# Environment Variables: Complete Technical Explanation

**Created:** May 6, 2026  
**Status:** Learning Document  
**Purpose:** Understand why env vars are needed, how they work, and how code manipulates them

---

## Table of Contents

1. [Why Environment Variables Are Needed](#why-environment-variables-are-needed)
2. [How Environment Variables Work](#how-environment-variables-work)
3. [Why This Happens (The Root Cause)](#why-this-happens-the-root-cause)
4. [How Code Manipulates Env Vars](#how-code-manipulates-env-vars)
5. [Real-World Flow](#real-world-flow)
6. [Security Implications](#security-implications)

---

## Why Environment Variables Are Needed

### Problem 1: Hardcoding Values is Bad

**❌ WITHOUT env vars - Hardcoded values:**

```typescript
// src/app/layout.tsx - WRONG APPROACH
export const metadata: Metadata = {
  metadataBase: new URL("https://janedoe.com"), // ← Hardcoded!
};

// src/lib/analytics.ts - WRONG APPROACH
export const ANALYTICS_ID = "janedoe.com"; // ← Hardcoded!

// src/lib/forms.ts - WRONG APPROACH
export const FORM_ENDPOINT = "https://formspree.io/f/xyz123"; // ← Hardcoded!
```

**Problems with hardcoding:**
1. **Different environments need different values**
   - Local: `http://localhost:3000`
   - Staging: `https://staging.janedoe.com`
   - Production: `https://janedoe.com`
   - Currently hardcoded to production only (fails locally!)

2. **Secrets exposed in source code**
   - CMS_API_TOKEN visible in git history
   - Anyone with access to repo has your API keys
   - Can't safely share code on GitHub

3. **Change requires code change + redeploy**
   - Want to change analytics? Edit code, commit, push, rebuild, deploy
   - Takes 5+ minutes instead of instant

4. **Environment-specific logic scattered everywhere**
   ```typescript
   if (process.env.NODE_ENV === 'production') {
     // production-specific code
   } else {
     // development code
   }
   ```
   Messy, hard to maintain, error-prone.

---

### Problem 2: Different Services Need Different URLs

Your portfolio uses multiple services:

```
Local Development (npm run dev)
├─ Site: http://localhost:3000
├─ Analytics: tracking on localhost (test data)
├─ CMS: dev/sandbox instance
├─ Forms: test endpoint
└─ Email: disabled (don't send real emails)

Staging (on staging.janedoe.com)
├─ Site: https://staging.janedoe.com
├─ Analytics: tracking staging domain
├─ CMS: staging instance
├─ Forms: staging endpoint
└─ Email: test recipient

Production (on janedoe.com)
├─ Site: https://janedoe.com
├─ Analytics: tracking production domain
├─ CMS: production instance
├─ Forms: production endpoint
└─ Email: real recipients
```

**Without env vars:** You'd need 3 different code versions (unmaintainable).
**With env vars:** Same code, different configuration.

---

### Solution: Environment Variables

**✅ WITH env vars - Configurable values:**

```typescript
// src/app/layout.tsx - CORRECT APPROACH
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL), // ← Reads from .env
};

// src/lib/analytics.ts - CORRECT APPROACH
export const ANALYTICS_ID = process.env.NEXT_PUBLIC_ANALYTICS_ID; // ← From .env

// src/lib/forms.ts - CORRECT APPROACH
export const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT; // ← From .env

// src/lib/cms.ts - CORRECT APPROACH (server-side)
export const CMS_TOKEN = process.env.CMS_API_TOKEN; // ← From .env, never in browser
```

**Benefits:**
1. ✅ One codebase, infinite configurations
2. ✅ Secrets never in source code
3. ✅ Instant configuration changes (no rebuild needed, usually)
4. ✅ Each environment (local/staging/prod) uses own values
5. ✅ Safe to share code on GitHub

---

## How Environment Variables Work

### The Flow: From File to Code

```
Step 1: File System
┌──────────────────────────────────┐
│  .env.local (file on disk)       │
│  ─────────────────────────────── │
│  NEXT_PUBLIC_SITE_URL=localhost  │
│  NEXT_PUBLIC_ANALYTICS_ID=dev    │
│  CMS_API_TOKEN=secret123         │
└──────────────────────────────────┘
                │
                ↓ npm run dev (startup)
                
Step 2: Process Environment
┌──────────────────────────────────┐
│  process.env (Node.js object)    │
│  ─────────────────────────────── │
│  {                               │
│    NEXT_PUBLIC_SITE_URL: 'local' │
│    NEXT_PUBLIC_ANALYTICS_ID: 'dev'
│    CMS_API_TOKEN: 'secret123'    │
│  }                               │
└──────────────────────────────────┘
                │
                ├─ NEXT_PUBLIC_* copied to browser bundle
                │
                └─ Other vars stay on server
                
Step 3: Code Access
┌──────────────────────────────────┐
│  Your Code                       │
│  ─────────────────────────────── │
│  const url = process.env.        │
│    NEXT_PUBLIC_SITE_URL;         │
│                                  │
│  Returns: 'localhost'            │
└──────────────────────────────────┘
```

---

### Detailed Mechanics

#### **Stage 1: File Reading (When you run `npm run dev`)**

```javascript
// This happens inside Next.js (you don't write it)

const fs = require('fs');
const dotenv = require('dotenv');

// 1. Read .env.local file from disk
const envFileContent = fs.readFileSync('.env.local', 'utf-8');
/*
Result:
"NEXT_PUBLIC_SITE_URL=http://localhost:3000\n"
"NEXT_PUBLIC_ANALYTICS_ID=localhost\n"
"CMS_API_TOKEN=secret123"
*/

// 2. Parse into JavaScript object
const envVars = dotenv.parse(envFileContent);
/*
Result:
{
  NEXT_PUBLIC_SITE_URL: 'http://localhost:3000',
  NEXT_PUBLIC_ANALYTICS_ID: 'localhost',
  CMS_API_TOKEN: 'secret123'
}
*/

// 3. Load into process.env
Object.assign(process.env, envVars);
/*
Now process.env contains all your variables:
process.env.NEXT_PUBLIC_SITE_URL === 'http://localhost:3000'
process.env.NEXT_PUBLIC_ANALYTICS_ID === 'localhost'
process.env.CMS_API_TOKEN === 'secret123'
*/
```

---

#### **Stage 2: Build Time (Webpack/Bundling)**

Next.js has special handling for `NEXT_PUBLIC_*` vars during build:

```javascript
// This happens during npm run build

// 1. Find all NEXT_PUBLIC_* variables in code
// 2. Extract their values from process.env
// 3. Replace references with actual values in the bundle

// BEFORE (source code):
const url = process.env.NEXT_PUBLIC_SITE_URL;
// ↓ Build replaces it ↓
// AFTER (compiled code sent to browser):
const url = 'http://localhost:3000'; // ← Hardcoded by build
```

**Why?** Browser can't access `process.env` (doesn't exist in browser). So Next.js replaces references with actual values during build.

---

#### **Stage 3: Runtime (Browser)**

```javascript
// Browser code (after build)

// ✅ This works (was hardcoded during build):
const url = 'http://localhost:3000';
console.log(url); // Outputs: http://localhost:3000

// ❌ This would fail (not available in browser):
// const token = process.env.CMS_API_TOKEN;
// ReferenceError: process is not defined
```

---

### Timeline Visualization

```
Local Development Timeline:
═══════════════════════════════════════════════════════════

T=0:00 → User runs: npm run dev

T=0:05 → Next.js reads .env.local from disk
        NEXT_PUBLIC_SITE_URL=http://localhost:3000
        CMS_API_TOKEN=secret123

T=0:10 → Loads into process.env (Node.js running on server)
        process.env.NEXT_PUBLIC_SITE_URL = 'http://localhost:3000'
        process.env.CMS_API_TOKEN = 'secret123'

T=0:15 → Code can access values:
        // In server code:
        const token = process.env.CMS_API_TOKEN; // ✅ Works
        
        // In component code:
        const url = process.env.NEXT_PUBLIC_SITE_URL; // ✅ Works

T=0:20 → Webpack compilation phase:
        // Finds: process.env.NEXT_PUBLIC_SITE_URL
        // Replaces with: 'http://localhost:3000'
        // Creates browser bundle with hardcoded value

T=0:30 → Dev server ready (http://localhost:3000)
        Browser receives bundle with hardcoded values

T=0:35 → User visits browser
        JavaScript loads with values already set
        // NEXT_PUBLIC_SITE_URL = 'http://localhost:3000' (hardcoded in JS)
        // CMS_API_TOKEN = NOT PRESENT (server-only, not sent to browser)
```

---

## Why This Happens (The Root Cause)

### Fundamental Issue: Environment-Dependent Configuration

Your code needs to know:
1. **Where is the app running?** (URL)
2. **Which services to connect to?** (CMS instance, analytics)
3. **What credentials to use?** (API tokens)
4. **What mode is it in?** (dev/staging/prod)

**The problem:** This information changes based on WHERE the code runs, not WHAT the code is.

**Examples of Why:**

```
Scenario 1: Local Testing
├─ Your laptop runs npm run dev
├─ App should use: http://localhost:3000
├─ Should talk to: Sanity dev instance (not prod!)
└─ Should NOT send: real emails, track real users

Scenario 2: Staging Deployment
├─ Vercel runs the build for staging.janedoe.com
├─ App should use: https://staging.janedoe.com
├─ Should talk to: Sanity staging instance
└─ Should send: test emails, track staging users

Scenario 3: Production Deployment
├─ Vercel runs the build for janedoe.com
├─ App should use: https://janedoe.com
├─ Should talk to: Sanity production instance
└─ Should send: real emails, track real users

SAME CODE → Different behavior based on env vars
```

### Why Not Just Use Hardcoding + If-Statements?

**❌ Bad approach:**

```typescript
let SITE_URL;
let ANALYTICS_ID;
let CMS_TOKEN;

if (process.env.NODE_ENV === 'production') {
  SITE_URL = 'https://janedoe.com';
  ANALYTICS_ID = 'janedoe.com';
  CMS_TOKEN = 'prod-token-xyz'; // ← Secret in code!
} else if (process.env.NODE_ENV === 'staging') {
  SITE_URL = 'https://staging.janedoe.com';
  ANALYTICS_ID = 'staging.janedoe.com';
  CMS_TOKEN = 'staging-token-abc'; // ← Secret in code!
} else {
  SITE_URL = 'http://localhost:3000';
  ANALYTICS_ID = 'localhost';
  CMS_TOKEN = 'dev-token-123'; // ← Secret in code!
}
```

**Problems:**
1. Secrets are hardcoded in source (security risk)
2. Hard to add new environment (modify code + redeploy)
3. Tokens visible to anyone with git access
4. Can't use same code in different environments safely

**✅ Good approach (env vars):**

```typescript
// .env.local
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_ANALYTICS_ID=localhost
CMS_API_TOKEN=dev-token-123

// .env.production (on Vercel)
NEXT_PUBLIC_SITE_URL=https://janedoe.com
NEXT_PUBLIC_ANALYTICS_ID=janedoe.com
CMS_API_TOKEN=prod-token-xyz

// Code (same in both):
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
const ANALYTICS_ID = process.env.NEXT_PUBLIC_ANALYTICS_ID;
const CMS_TOKEN = process.env.CMS_API_TOKEN;
```

---

## How Code Manipulates Env Vars

### Method 1: Direct Access (Server-Side)

**Where:** API routes, server components, server-side logic

```typescript
// src/app/api/cms/route.ts (server-side)

export async function GET() {
  // Directly access env var
  const token = process.env.CMS_API_TOKEN;
  
  // Make API call to CMS with token
  const response = await fetch('https://api.sanity.io/...', {
    headers: {
      Authorization: `Bearer ${token}`, // ← Secret sent to server only
    },
  });
  
  // Parse response
  const data = await response.json();
  
  // Return to browser (data only, not the token)
  return Response.json({ data });
}
```

**Flow:**
```
1. Browser requests: /api/cms
2. Server (Node.js) receives request
3. Server reads: process.env.CMS_API_TOKEN
4. Server calls: Sanity API with token
5. Server gets back: data
6. Server sends back: data to browser
7. Browser never sees: CMS_API_TOKEN
```

---

### Method 2: Browser-Safe Access (Client Components)

**Where:** React components, client-side code, browser JavaScript

```typescript
// src/app/layout.tsx (root layout - can run on both)

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL), // ← Runs on server
  openGraph: {
    images: [
      {
        url: `${SITE_URL}/images/og-home.jpg`, // Uses SITE_URL
      },
    ],
  },
};

// In a client component:
'use client';

export function AnalyticsTracker() {
  const domain = process.env.NEXT_PUBLIC_ANALYTICS_ID; // ← OK to use
  
  useEffect(() => {
    // Send pageview to Plausible with domain
    fetch('https://plausible.io/api/event', {
      body: JSON.stringify({
        domain: domain, // Public data, OK to send
        name: 'pageview',
      }),
    });
  }, [domain]);
  
  return null;
}
```

**Why `NEXT_PUBLIC_*` is safe:**
- Value is NOT secret (everyone can see your domain)
- Intentionally meant to be public
- No security risk if exposed

**Why other vars are NOT safe:**
```typescript
// ❌ WRONG - Dangerous!
const token = process.env.CMS_API_TOKEN; // Server-side code

// In component:
<img src={`https://api.sanity.io/files/${token}`} /> // ← Token exposed!
```

---

### Method 3: Build-Time Replacement (Next.js Magic)

Next.js automatically replaces `NEXT_PUBLIC_*` vars during build:

**Source Code:**
```typescript
// src/components/Analytics.tsx
export function Analytics() {
  const analyticsId = process.env.NEXT_PUBLIC_ANALYTICS_ID;
  
  return (
    <script
      async
      src={`https://plausible.io/js/script.js`}
      data-domain={analyticsId}
    />
  );
}
```

**After Build (what browser receives):**
```javascript
// The build process replaced the variable
function Analytics() {
  const analyticsId = 'localhost'; // ← Hardcoded by build
  
  return (
    <script
      async
      src={`https://plausible.io/js/script.js`}
      data-domain={'localhost'}
    />
  );
}
```

**How Next.js Does It:**

```javascript
// Simplified version of Next.js build process:

// 1. Find all process.env.NEXT_PUBLIC_* in code
const code = `const id = process.env.NEXT_PUBLIC_ANALYTICS_ID;`;
const regex = /process\.env\.NEXT_PUBLIC_(\w+)/g;

// 2. Get value from environment
const match = code.match(regex)[0]; // process.env.NEXT_PUBLIC_ANALYTICS_ID
const value = process.env.NEXT_PUBLIC_ANALYTICS_ID; // "localhost"

// 3. Replace in code
const newCode = code.replace(
  /process\.env\.NEXT_PUBLIC_ANALYTICS_ID/,
  JSON.stringify(value) // "localhost"
);
// Result: const id = "localhost";

// 4. Send to browser
// Browser receives: const id = "localhost";
```

---

### Method 4: Conditional Configuration (Deployment Time)

**In Vercel Dashboard:**

```
Project Settings → Environment Variables

Name                          Value
NEXT_PUBLIC_SITE_URL         https://janedoe.com
NEXT_PUBLIC_ANALYTICS_ID     janedoe.com
NEXT_PUBLIC_CMS_PROJECT_ID   prod-project
CMS_API_TOKEN                sk-xyz123...
```

**When you deploy:**

```
1. You push code to GitHub
2. Vercel detects push
3. Vercel reads env vars from dashboard
4. Vercel runs: npm run build
   - Reads: process.env.NEXT_PUBLIC_SITE_URL = "https://janedoe.com"
   - Replaces: process.env.NEXT_PUBLIC_SITE_URL → "https://janedoe.com"
5. Vercel bundles production-configured code
6. Vercel deploys bundle
7. Users get site with production URLs
```

---

## Real-World Flow

### Complete Example: Contact Form Submission

**Setup:**
```
.env.local:
NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/test123
FORM_SECRET_KEY=secret-dev-key

Vercel Production:
NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/prod456
FORM_SECRET_KEY=secret-prod-key
```

**Code:**
```typescript
// src/components/ContactForm.tsx (client component)
'use client';

import { useState } from 'react';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  
  // This var is available in browser (public)
  const formEndpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Send to form endpoint (public knowledge)
    const response = await fetch(formEndpoint, {
      method: 'POST',
      body: formData,
    });
    
    if (response.ok) {
      setSubmitted(true);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Your name" required />
      <input type="email" name="email" placeholder="Your email" required />
      <button type="submit">Send</button>
      {submitted && <p>Thank you!</p>}
    </form>
  );
}

// src/app/api/form/validate/route.ts (server route)
export async function POST(request: Request) {
  const data = await request.json();
  
  // This var is available ONLY on server
  const secretKey = process.env.FORM_SECRET_KEY;
  
  // Validate using secret
  const isValid = await validateWithSecret(data, secretKey);
  
  if (!isValid) {
    return Response.json(
      { error: 'Spam detected' },
      { status: 400 }
    );
  }
  
  return Response.json({ success: true });
}
```

**Local Dev Flow:**
```
1. npm run dev starts
2. Reads .env.local:
   - NEXT_PUBLIC_FORM_ENDPOINT=formspree.io/f/test123
   - FORM_SECRET_KEY=secret-dev-key
3. User fills form on http://localhost:3000
4. Form submits to formspree.io/f/test123 (test endpoint)
5. Server validates with secret-dev-key
6. Test data goes to test form (not production)
```

**Production Flow:**
```
1. Vercel builds for production
2. Reads env vars from Vercel dashboard:
   - NEXT_PUBLIC_FORM_ENDPOINT=formspree.io/f/prod456
   - FORM_SECRET_KEY=secret-prod-key
3. Build replaces formspree.io/f/test123 → formspree.io/f/prod456
4. User fills form on janedoe.com
5. Form submits to formspree.io/f/prod456 (production endpoint)
6. Server validates with secret-prod-key
7. Real data goes to production form
```

**Result:** Same code, different behavior based on environment vars.

---

## Security Implications

### 1. Separation of Concerns

```
Browser (Unsafe Zone)
├─ Sees: NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_ANALYTICS_ID
├─ Cannot see: CMS_API_TOKEN, SENDGRID_KEY
└─ Why: These are secrets

Server (Safe Zone)
├─ Sees: ALL env vars
├─ Uses secrets internally: CMS_API_TOKEN, SENDGRID_KEY
└─ Returns only results: "Blog posts loaded", "Email sent"
```

### 2. Token Rotation

**Without env vars (hardcoded):**
```
CMS_API_TOKEN hardcoded in code → Token exposed → Attacker uses it →
You'd need to: Edit code → Commit → Deploy → New version live
= Hours of work
```

**With env vars:**
```
CMS_API_TOKEN in .env.local → Token exposed → Attacker uses it →
You'd need to: Rotate token in Vercel dashboard → Instant redeploy
= Seconds of work
```

### 3. Safe Sharing

**Without env vars:**
```
✗ Can't share code on GitHub (secrets exposed)
✗ Can't collaborate (others see your API keys)
✗ Can't hire contractors (they'd see production tokens)
```

**With env vars:**
```
✅ Push code to public GitHub (no secrets)
✅ Multiple developers (each has own .env.local)
✅ Easy onboarding (contractor gets .env.example template)
✅ Different prod/staging/dev configs (Vercel manages secrets)
```

---

## Summary

| Aspect | Why | How | Result |
|--------|-----|-----|--------|
| **Separation** | Secrets need to stay secret | Env vars never sent to browser | Browser can't access tokens |
| **Configuration** | Different envs need different values | .env.local, .env.production, Vercel env | One code, many configurations |
| **Security** | API keys shouldn't be in git | Secrets in .env, .gitignore prevents commits | Safe to share code |
| **Flexibility** | Change config without redeploying | Update Vercel dashboard, redeploy auto | Instant config changes |
| **Debugging** | Know which environment you're in | process.env.NODE_ENV + custom vars | Easy to troubleshoot |

---

## Next Steps

- **Now (Phase 1):** You created `.env.example` and `.env.local`
- **Later (Phase 2):** Set env vars in Vercel dashboard for production
- **Ongoing:** Update env vars as you add services (CMS, email, etc.)

When you see `process.env.SOMETHING` in code, remember: it's reading from a `.env` file, and env vars control which environment you're connected to.

---

**Created:** May 6, 2026  
**Next Review:** When you deploy to Vercel (Phase 2)
