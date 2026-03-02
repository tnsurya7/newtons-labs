# Supabase Connection Troubleshooting Guide

## Connection Timeout Error Fix

If you're seeing "500 Internal Server Error" or "Connect Timeout Error" when adding tests/packages in the admin panel, follow these steps:

### 1. Check Supabase Project Status

**MOST COMMON ISSUE**: Supabase free tier projects pause after 7 days of inactivity.

1. Go to https://supabase.com/dashboard
2. Login to your account
3. Find your project: `tulbixyhwpcqwhmpjune`
4. Check if it shows "Paused" or "Inactive"
5. If paused, click "Resume Project" or "Restore Project"
6. Wait 2-3 minutes for the project to fully activate

### 2. Verify Database Connection

After resuming the project, test the connection:

1. Run the development server: `npm run dev`
2. Visit: http://localhost:3000/test-connection
3. You should see "Connected successfully" with your database stats
4. If still failing, proceed to step 3

### 3. Check Environment Variables

Verify your `.env.local` file has the correct credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tulbixyhwpcqwhmpjune.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Important**: After changing `.env.local`, you MUST restart the dev server:
- Stop the server (Ctrl+C)
- Start again: `npm run dev`

### 4. Check Network/Firewall

If the project is active but still timing out:

1. Check your internet connection
2. Try disabling VPN if you're using one
3. Check if your firewall is blocking `*.supabase.co` domains
4. Try accessing https://tulbixyhwpcqwhmpjune.supabase.co in your browser

### 5. Verify Database Tables Exist

1. Go to Supabase Dashboard → Table Editor
2. Verify these tables exist:
   - `tests`
   - `packages`
   - `users`
   - `bookings`
   - `booking_items`
   - `activity_logs`

If tables are missing, run the schema:
1. Go to SQL Editor in Supabase Dashboard
2. Copy contents from `supabase/schema.sql`
3. Run the SQL script

### 6. Check RLS Policies

Row Level Security (RLS) shouldn't affect service role, but verify:

1. Go to Supabase Dashboard → Authentication → Policies
2. For `tests` and `packages` tables, ensure policies allow INSERT/UPDATE/DELETE
3. Or temporarily disable RLS for testing (not recommended for production)

### 7. Test with Supabase API Directly

Test if Supabase is responding:

```bash
curl https://tulbixyhwpcqwhmpjune.supabase.co/rest/v1/tests \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

If this fails, the issue is with Supabase itself, not your code.

## Error Messages Explained

### "Database not configured"
- `.env.local` file is missing or has placeholder values
- Solution: Check step 3 above

### "Connect Timeout Error"
- Supabase project is paused/inactive
- Network connectivity issue
- Solution: Check steps 1 and 4 above

### "Database connection error"
- Supabase is responding but query failed
- Could be table doesn't exist or RLS blocking
- Solution: Check steps 5 and 6 above

## Quick Fix Checklist

✅ Supabase project is active (not paused)
✅ `.env.local` has real credentials (not placeholders)
✅ Dev server restarted after changing `.env.local`
✅ Database tables exist (run schema.sql if needed)
✅ Internet connection is working
✅ No VPN/firewall blocking Supabase

## Still Not Working?

1. Check Supabase Status Page: https://status.supabase.com/
2. Check server logs for detailed error messages
3. Try creating a new Supabase project and updating credentials
4. Contact Supabase support if their service is down

## Admin Panel Testing

Once connection is working:

1. Login to admin panel: http://localhost:3000/admin/login
   - Email: admin@new10lab.com
   - Password: admin123

2. Test adding a new test:
   - Go to Services → Tests
   - Click "Add New Test"
   - Fill in the form
   - Submit

3. If you see "Test saved successfully!" - everything is working!

## Production Deployment

For Vercel deployment:

1. Add environment variables in Vercel Dashboard:
   - Settings → Environment Variables
   - Add all variables from `.env.local`
   - Redeploy the project

2. Ensure Supabase project is on a paid plan or won't pause
