# Vercel Environment Variables Setup Guide

## Step-by-Step Instructions

### Step 1: Get Your Supabase Credentials

First, you need to get your Supabase project URL and service role key:

1. Go to [https://supabase.com](https://supabase.com)
2. Sign in to your account
3. Click on your project (the one you're using for Newton's Lab)
4. Click on the **Settings** icon (gear icon) in the left sidebar
5. Click on **API** in the settings menu
6. You'll see two important values:
   - **Project URL** - Copy this (looks like: `https://xxxxxxxxxxxxx.supabase.co`)
   - **service_role key** - Click "Reveal" and copy this long key (starts with `eyJ...`)

⚠️ **IMPORTANT**: Keep the service_role key secret! Never share it publicly.

---

### Step 2: Go to Your Vercel Project

1. Open your browser and go to [https://vercel.com](https://vercel.com)
2. Sign in to your Vercel account
3. You'll see your dashboard with all your projects
4. Find and click on your **newtons-labs** project (or whatever you named it)

---

### Step 3: Navigate to Environment Variables Settings

1. Once you're in your project, look at the top navigation tabs
2. Click on **Settings** tab
3. In the left sidebar, click on **Environment Variables**
4. You'll see a page where you can add environment variables

---

### Step 4: Add NEXT_PUBLIC_SUPABASE_URL

1. You'll see three input fields:
   - **Key** (the variable name)
   - **Value** (the actual value)
   - **Environment** (where to use it)

2. In the **Key** field, type exactly:
   ```
   NEXT_PUBLIC_SUPABASE_URL
   ```

3. In the **Value** field, paste your Supabase Project URL:
   ```
   https://xxxxxxxxxxxxx.supabase.co
   ```
   (Replace with your actual URL from Step 1)

4. For **Environment**, select all three options:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

5. Click the **Save** button

---

### Step 5: Add SUPABASE_SERVICE_ROLE_KEY

1. Now add the second variable
2. In the **Key** field, type exactly:
   ```
   SUPABASE_SERVICE_ROLE_KEY
   ```

3. In the **Value** field, paste your Supabase service_role key:
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS...
   ```
   (Replace with your actual service role key from Step 1)

4. For **Environment**, select all three options:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

5. Click the **Save** button

---

### Step 6: Add RESEND_API_KEY (Optional - for Email)

If you want email confirmations to work, add this variable:

1. Get your Resend API key from [https://resend.com/api-keys](https://resend.com/api-keys)
2. In the **Key** field, type:
   ```
   RESEND_API_KEY
   ```

3. In the **Value** field, paste your Resend API key:
   ```
   re_xxxxxxxxxxxxxxxxxxxxx
   ```

4. Select all environments and click **Save**

---

### Step 7: Redeploy Your Project

After adding the environment variables, you need to trigger a new deployment:

**Option A: Automatic (Recommended)**
1. Go to the **Deployments** tab in your Vercel project
2. Find the latest deployment
3. Click the three dots (...) on the right
4. Click **Redeploy**
5. Confirm by clicking **Redeploy** again

**Option B: Push a New Commit**
1. Make any small change to your code (or just push again)
2. Vercel will automatically deploy with the new environment variables

---

### Step 8: Verify the Build

1. Go to the **Deployments** tab
2. Watch the build progress (it takes 1-3 minutes)
3. Look for these success indicators:
   - ✅ Building
   - ✅ Running TypeScript
   - ✅ Collecting page data
   - ✅ Deployment Ready

4. If you see "Ready" with a green checkmark, you're done!

---

## Visual Reference

Here's what the Environment Variables page looks like:

```
┌─────────────────────────────────────────────────────────┐
│ Environment Variables                                    │
├─────────────────────────────────────────────────────────┤
│                                                          │
│ Key                                                      │
│ ┌────────────────────────────────────────────────────┐ │
│ │ NEXT_PUBLIC_SUPABASE_URL                           │ │
│ └────────────────────────────────────────────────────┘ │
│                                                          │
│ Value                                                    │
│ ┌────────────────────────────────────────────────────┐ │
│ │ https://xxxxxxxxxxxxx.supabase.co                  │ │
│ └────────────────────────────────────────────────────┘ │
│                                                          │
│ Environments                                             │
│ ☑ Production  ☑ Preview  ☑ Development                 │
│                                                          │
│                                    [Save]                │
└─────────────────────────────────────────────────────────┘
```

---

## Troubleshooting

### Problem: Build still fails with "supabaseUrl is required"
**Solution**: Make sure you clicked "Save" after adding each variable and then redeployed.

### Problem: Can't find the Settings tab
**Solution**: Make sure you're inside your project (not on the main dashboard). Click on your project name first.

### Problem: Don't know my Supabase URL
**Solution**: 
1. Go to supabase.com
2. Click your project
3. Settings → API
4. Copy the "Project URL"

### Problem: Can't find service_role key
**Solution**: 
1. In Supabase, go to Settings → API
2. Scroll down to "Project API keys"
3. Find "service_role" and click "Reveal"
4. Copy the entire key

---

## Quick Checklist

Before you finish, verify:

- [ ] Added NEXT_PUBLIC_SUPABASE_URL to Vercel
- [ ] Added SUPABASE_SERVICE_ROLE_KEY to Vercel
- [ ] Selected all three environments (Production, Preview, Development)
- [ ] Clicked Save for each variable
- [ ] Redeployed the project
- [ ] Build completed successfully (green checkmark)
- [ ] Website is accessible at your Vercel URL

---

## What These Variables Do

- **NEXT_PUBLIC_SUPABASE_URL**: Tells your app where your Supabase database is located
- **SUPABASE_SERVICE_ROLE_KEY**: Gives your backend API permission to read/write to the database
- **RESEND_API_KEY**: Allows sending email confirmations (optional)

---

## Need Help?

If you're still having issues:
1. Double-check that the variable names are spelled exactly as shown (case-sensitive)
2. Make sure there are no extra spaces in the values
3. Verify your Supabase project is active and accessible
4. Check the Vercel deployment logs for specific error messages
