# Neon Database - Quick Setup (5 Minutes)

## Step 1: Create Neon Account & Project (2 minutes)

1. Go to: **https://neon.tech**
2. Click "Sign Up" (use GitHub or email)
3. After login, click "Create a project"
4. Project name: `newtons-lab`
5. Region: Choose closest to you
6. Click "Create Project"

## Step 2: Get Connection String (30 seconds)

1. After project creation, you'll see a connection string
2. It looks like:
   ```
   postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```
3. Click "Copy" button
4. Save it somewhere safe

## Step 3: Import Database Schema (1 minute)

1. In Neon dashboard, click "SQL Editor" (left sidebar)
2. Open your local file: `newtons-lab/supabase/schema.sql`
3. Copy ALL the content
4. Paste into Neon SQL Editor
5. Click "Run" button
6. Wait for "Success" message

## Step 4: Update Local Environment (30 seconds)

1. Open `newtons-lab/.env.local`
2. Replace everything with:
   ```env
   DATABASE_URL=YOUR_NEON_CONNECTION_STRING_HERE
   RESEND_API_KEY=your_resend_api_key_here
   ADMIN_EMAIL=admin@new10lab.com
   ADMIN_PASSWORD=admin123
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```
3. Replace `YOUR_NEON_CONNECTION_STRING_HERE` with your actual connection string
4. Save the file

## Step 5: Test Locally (1 minute)

1. Open terminal in `newtons-lab` folder
2. Run:
   ```bash
   npm run dev
   ```
3. Open browser: http://localhost:3000
4. Try to sign up a new user
5. If it works, you're done! ✅

## Step 6: Update Vercel (1 minute)

1. Go to: **https://vercel.com**
2. Click your **newtons-labs** project
3. Click **Settings** → **Environment Variables**
4. Delete these old variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
5. Add new variable:
   - Key: `DATABASE_URL`
   - Value: Your Neon connection string
   - Check: ✅ Production ✅ Preview ✅ Development
6. Click "Save"

## Step 7: Deploy (30 seconds)

1. In terminal:
   ```bash
   git add .
   git commit -m "Switch to Neon database"
   git push origin main
   ```
2. Vercel will auto-deploy
3. Wait 2-3 minutes
4. Done! ✅

---

## ⚠️ Important Notes

### Your Database is Empty!
After setup, your Neon database only has the schema (tables), but NO data yet.

You need to either:
1. **Start fresh** - Let users sign up and create new data
2. **Migrate data** - Export from Supabase and import to Neon (see NEON_MIGRATION_GUIDE.md)

### If You Want to Migrate Existing Data:

**Quick Export from Supabase:**
1. Go to Supabase dashboard
2. Click "Table Editor"
3. For each table, click "..." → "Export as CSV"
4. Save the files

**Quick Import to Neon:**
1. In Neon SQL Editor, manually create INSERT statements
2. Or use the migration script in NEON_MIGRATION_GUIDE.md

---

## ✅ Verification

After setup, test these:
- [ ] Sign up new user works
- [ ] Login works
- [ ] Tests page loads (might be empty if no data)
- [ ] Packages page loads (might be empty if no data)
- [ ] No console errors
- [ ] Vercel deployment successful

---

## 🆘 Common Issues

**Error: "DATABASE_URL is not set"**
- Make sure you updated `.env.local`
- Restart the dev server (`npm run dev`)

**Error: "relation does not exist"**
- You didn't import the schema
- Go back to Step 3

**No data showing**
- Your database is empty
- Either start fresh or migrate data from Supabase

**Vercel build fails**
- Make sure you added `DATABASE_URL` to Vercel
- Make sure you selected all 3 environments
- Try redeploying

---

## 🎉 You're Done!

Your app is now using Neon database instead of Supabase!

Benefits:
- ✅ Faster queries
- ✅ Better for serverless
- ✅ No connection limits
- ✅ Auto-scaling
- ✅ Cost-effective
