# Quick Database Setup - 5 Minutes

## Step 1: Create Supabase Project (2 minutes)

1. Go to https://supabase.com and sign up
2. Click "New Project"
3. Fill in:
   - Name: `new10labs`
   - Database Password: `YourSecurePassword123!` (save this!)
   - Region: Choose closest to you
4. Click "Create new project" and wait 2-3 minutes

## Step 2: Run Database Migration (1 minute)

1. In your Supabase project, click "SQL Editor" in the left sidebar
2. Click "New Query"
3. Copy ALL content from `supabase/schema.sql`
4. Paste into the SQL editor
5. Click "Run" button
6. You should see "Success. No rows returned"

## Step 3: Get API Keys (1 minute)

1. Click "Project Settings" (gear icon) in left sidebar
2. Click "API" tab
3. Copy these values:

```
Project URL: https://xxxxx.supabase.co
anon/public key: eyJhbGc...
service_role key: eyJhbGc... (keep secret!)
```

## Step 4: Update Environment Variables (1 minute)

Create `.env.local` file in `newtons-lab` folder:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your_anon_key
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...your_service_role_key

# Email (Resend)
RESEND_API_KEY=re_...your_resend_key

# Admin Credentials
ADMIN_EMAIL=admin@new10lab.com
ADMIN_PASSWORD=admin123
```

## Step 5: Restart Development Server

```bash
# Stop current server (Ctrl+C)
npm run dev
```

## Verify Setup

1. Go to Supabase > Table Editor
2. You should see these tables:
   - users (with 1 admin user)
   - tests (with 6 tests)
   - packages (with 4 packages)
   - bookings (empty)
   - booking_items (empty)
   - activity_logs (empty)

## Default Admin Login

```
Email: admin@new10lab.com
Password: admin123
```

**IMPORTANT:** Change this password after first login!

## Troubleshooting

**Error: "relation already exists"**
- Tables already created, you're good!

**Error: "permission denied"**
- Make sure you're using the correct API keys
- Check .env.local file is in the right location

**Can't see tables in Table Editor**
- Refresh the page
- Check SQL query ran successfully

## Next Steps

Once setup is complete, I'll implement:
1. ✅ Enhanced Search
2. ✅ Email Notifications
3. ✅ Invoice Generation
4. ✅ Admin Panel

All features will use this real-time database!
