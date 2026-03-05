# Vercel Environment Variables - Simple Step by Step

## 🎯 Goal
Add 2 environment variables to Vercel so your website can connect to the database.

---

## 📋 What You Need Ready

Open `YOUR_VERCEL_VALUES.md` file - it has your exact values to copy.

---

## 🚀 Steps (5 minutes)

### STEP 1: Open Vercel
1. Go to: **https://vercel.com**
2. Log in with your account
3. You'll see your dashboard with projects

### STEP 2: Open Your Project
1. Find your project: **newtons-labs** (or similar name)
2. Click on it
3. You're now inside your project

### STEP 3: Go to Settings
1. Look at the top tabs: Overview | Deployments | Analytics | **Settings**
2. Click **Settings**
3. You'll see a sidebar on the left

### STEP 4: Open Environment Variables
1. In the left sidebar, find and click: **Environment Variables**
2. You'll see a page with a form to add variables

### STEP 5: Add First Variable
1. You'll see three boxes:
   - **Key** (empty box)
   - **Value** (empty box)
   - **Environments** (checkboxes)

2. In the **Key** box, type:
   ```
   NEXT_PUBLIC_SUPABASE_URL
   ```

3. In the **Value** box, paste:
   ```
   https://tulbixyhwpcqwhmpjune.supabase.co
   ```

4. Check ALL THREE boxes:
   - ☑️ Production
   - ☑️ Preview
   - ☑️ Development

5. Click the **Save** button (or **Add** button)

### STEP 6: Add Second Variable
1. The form is now empty again
2. In the **Key** box, type:
   ```
   SUPABASE_SERVICE_ROLE_KEY
   ```

3. In the **Value** box, paste:
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1bGJpeHlod3BjcXdobXBqdW5lIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjM0ODIwMiwiZXhwIjoyMDg3OTI0MjAyfQ.Hh0s0UtTV0bu7bFLgXa2zRa5sRFJasusohFI2AgKUUo
   ```

4. Check ALL THREE boxes:
   - ☑️ Production
   - ☑️ Preview
   - ☑️ Development

5. Click the **Save** button (or **Add** button)

### STEP 7: Verify Variables Are Saved
1. Scroll down on the same page
2. You should see both variables listed:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. Each should show "Production, Preview, Development"

### STEP 8: Redeploy
1. Click on the **Deployments** tab at the top
2. You'll see a list of deployments
3. Find the most recent one (at the top)
4. Click the **three dots (...)** on the right side
5. Click **Redeploy**
6. A popup appears - click **Redeploy** again to confirm

### STEP 9: Wait for Build
1. You'll see "Building..." with a spinner
2. Wait 2-3 minutes
3. Watch for these steps to complete:
   - ✅ Building
   - ✅ Running TypeScript
   - ✅ Collecting page data
   - ✅ Deployment Ready

### STEP 10: Success!
1. When you see **"Ready"** with a green checkmark ✅
2. Click on the deployment URL (looks like: `newtons-labs.vercel.app`)
3. Your website should load!
4. Try logging in or signing up to test the database connection

---

## ✅ Checklist

Before you start:
- [ ] I'm logged into Vercel
- [ ] I have the `YOUR_VERCEL_VALUES.md` file open
- [ ] I'm ready to copy/paste

After Step 6:
- [ ] I added NEXT_PUBLIC_SUPABASE_URL
- [ ] I added SUPABASE_SERVICE_ROLE_KEY
- [ ] Both variables show all 3 environments
- [ ] I clicked Save for each one

After Step 10:
- [ ] Build completed successfully
- [ ] Website loads without errors
- [ ] No "supabaseUrl is required" error

---

## 🆘 Common Issues

**Problem: Can't find Settings tab**
- Make sure you clicked on your project first
- You should see: Overview | Deployments | Analytics | Settings

**Problem: Don't see Environment Variables in sidebar**
- Make sure you're in Settings tab
- Scroll down the left sidebar

**Problem: Build still fails**
- Make sure you clicked Save after each variable
- Make sure you selected all 3 environments
- Try redeploying again

**Problem: Copied wrong value**
- Go back to Environment Variables
- Find the variable in the list
- Click the three dots (...) next to it
- Click Edit
- Fix the value and Save

---

## 🎉 You're Done!

Once the build is successful and your website loads, you've completed the setup!

Your website will now:
- ✅ Connect to Supabase database
- ✅ Allow users to sign up
- ✅ Allow users to log in
- ✅ Store all data in the database
- ✅ Work in production on Vercel

---

## 📞 Need More Help?

If you're stuck:
1. Check the Vercel deployment logs for error messages
2. Make sure the variable names are spelled exactly right
3. Make sure there are no extra spaces in the values
4. Try redeploying one more time
