# Environment Variables Setup Guide

## 📝 Overview

The `.env.local` file has been created for you. You need to fill in the actual values.

## 🔑 Step-by-Step Instructions

### 1. Supabase Setup (5 minutes)

#### A. Create Supabase Project
1. Go to https://supabase.com
2. Click "Sign Up" (use GitHub for faster signup)
3. Click "New Project"
4. Fill in:
   - **Name**: `new10labs`
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to you (e.g., Southeast Asia)
5. Click "Create new project"
6. Wait 2-3 minutes for setup to complete

#### B. Get Supabase API Keys
1. In your Supabase project dashboard
2. Click **"Settings"** (gear icon) in the left sidebar
3. Click **"API"** tab
4. You'll see:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **Project API keys**:
     - `anon` `public` key (starts with `eyJhbGc...`)
     - `service_role` key (starts with `eyJhbGc...`)

#### C. Copy to .env.local
Open `.env.local` and replace:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...paste_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...paste_service_role_key_here
```

#### D. Run Database Migration
1. In Supabase, click **"SQL Editor"** in left sidebar
2. Click **"New Query"**
3. Open file: `newtons-lab/supabase/schema.sql`
4. Copy ALL content (Ctrl+A, Ctrl+C)
5. Paste into Supabase SQL Editor
6. Click **"Run"** button (or press Ctrl+Enter)
7. You should see: "Success. No rows returned"

#### E. Verify Tables Created
1. Click **"Table Editor"** in left sidebar
2. You should see these tables:
   - ✅ users (1 row - admin user)
   - ✅ tests (6 rows)
   - ✅ packages (4 rows)
   - ✅ bookings (0 rows)
   - ✅ booking_items (0 rows)
   - ✅ activity_logs (0 rows)

---

### 2. Email Service Setup (Optional - 2 minutes)

You have two options:

#### Option A: Resend (Recommended - Easier)
1. Go to https://resend.com
2. Sign up with email
3. Verify your email
4. Go to **API Keys** section
5. Click **"Create API Key"**
6. Copy the key (starts with `re_`)
7. Paste in `.env.local`:
   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   ```

#### Option B: Gmail SMTP (Alternative)
1. Enable 2-factor authentication on your Gmail
2. Generate App Password:
   - Go to Google Account > Security
   - 2-Step Verification > App passwords
   - Generate password for "Mail"
3. Update `.env.local`:
   ```env
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_16_char_app_password
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   ```

---

### 3. Admin Credentials (Already Set)

Default admin login:
```env
ADMIN_EMAIL=admin@new10lab.com
ADMIN_PASSWORD=admin123
```

**⚠️ IMPORTANT**: Change this password after first login!

---

## ✅ Verification Checklist

Before starting the dev server, verify:

- [ ] `.env.local` file exists in `newtons-lab` folder
- [ ] Supabase URL is filled in (starts with `https://`)
- [ ] Supabase anon key is filled in (starts with `eyJhbGc`)
- [ ] Supabase service role key is filled in (starts with `eyJhbGc`)
- [ ] Email service configured (Resend OR SMTP)
- [ ] Database migration ran successfully in Supabase
- [ ] Tables visible in Supabase Table Editor

---

## 🚀 Start Development Server

Once all values are filled in:

```bash
cd newtons-lab
npm run dev
```

Visit: http://localhost:3000

---

## 🧪 Test the Setup

### Test 1: Enhanced Search
1. Go to homepage
2. Click search bar in header
3. Type "blood" or "thyroid"
4. You should see results from database

### Test 2: View Tests
1. Scroll to "Frequently Booked Tests" section
2. You should see 6 tests loaded from database

### Test 3: Admin Login (Coming Soon)
1. Go to `/admin/login`
2. Login with admin credentials
3. Access admin dashboard

---

## 🐛 Troubleshooting

### Error: "Failed to fetch"
- Check Supabase URL is correct
- Check API keys are correct
- Verify project is active in Supabase

### Error: "Invalid API key"
- Make sure you copied the full key
- Check for extra spaces
- Verify you're using anon key (not service role) for NEXT_PUBLIC_SUPABASE_ANON_KEY

### Error: "relation does not exist"
- Database migration didn't run
- Go back to Step 1D and run schema.sql

### Search not working
- Check browser console for errors
- Verify .env.local has correct values
- Restart dev server (Ctrl+C, then `npm run dev`)

---

## 📁 File Locations

- Environment variables: `newtons-lab/.env.local`
- Database schema: `newtons-lab/supabase/schema.sql`
- Example env: `newtons-lab/.env.example`

---

## 🔒 Security Notes

1. **Never commit `.env.local`** to Git (already in .gitignore)
2. **Keep service role key secret** - it has admin access
3. **Change admin password** after first login
4. **Use strong passwords** for production

---

## ✨ What's Next?

Once setup is complete, you'll have:
- ✅ Real-time database with Supabase
- ✅ Enhanced search across all services
- ✅ Ready for email notifications
- ✅ Ready for invoice generation
- ✅ Ready for admin panel

Continue with Phase 1 implementation! 🚀
