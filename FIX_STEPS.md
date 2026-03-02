# 🔧 How to Fix the Connection Error - Step by Step

## What's Happening?

Your `.env.local` file still has placeholder text instead of real Supabase credentials. The application can't connect to the database because it's trying to use fake values like "your_supabase_project_url_here".

## Quick Fix (5 Minutes)

### Step 1: Get Your Supabase Credentials

1. Open https://supabase.com in your browser
2. Login to your account
3. Click on your "new10labs" project (or create one if you haven't)
4. Click "Settings" (⚙️ icon) in the left sidebar
5. Click "API" under Settings

You'll see a page with your credentials. Keep this page open!

### Step 2: Copy Your Project URL

On the Supabase API page, find "Project URL":
- It looks like: `https://abcdefghijklmnop.supabase.co`
- Click the copy button next to it

### Step 3: Copy Your Anon Key

On the same page, find "Project API keys":
- Look for the key labeled `anon` or `public`
- Click the copy button
- It's VERY LONG (300+ characters)
- Starts with: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### Step 4: Copy Your Service Role Key

On the same page:
- Look for the key labeled `service_role`
- Click the copy button
- Also VERY LONG (300+ characters)
- ⚠️ Keep this secret!

### Step 5: Update Your .env.local File

1. Open the file `newtons-lab/.env.local` in your editor
2. Replace the placeholder values with your REAL values:

**BEFORE (wrong):**
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

**AFTER (correct):**
```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMjc0ODAwMCwiZXhwIjoxOTQ4MzI0MDAwfQ.abcdefghijklmnopqrstuvwxyz1234567890
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjMyNzQ4MDAwLCJleHAiOjE5NDgzMjQwMDB9.abcdefghijklmnopqrstuvwxyz1234567890
```

3. Save the file

### Step 6: Run the Database Schema

1. Go back to Supabase dashboard
2. Click "SQL Editor" in the left sidebar
3. Click "New query"
4. Open the file `newtons-lab/supabase/schema.sql` in your editor
5. Copy ALL the SQL code
6. Paste it into the Supabase SQL Editor
7. Click "Run" button
8. Wait for "Success" message

### Step 7: Restart Your Dev Server

1. Go to your terminal where the dev server is running
2. Press `Ctrl+C` to stop it
3. Run: `npm run dev`
4. Wait for it to start

### Step 8: Test the Connection

1. Open your browser
2. Go to: http://localhost:3000/test-connection
3. You should see GREEN checkmarks ✅

If you see green checkmarks, you're done! 🎉

## What I Fixed

I updated the code to:
1. Detect placeholder values in `.env.local` and treat them as missing
2. Return mock bookings when database is not configured (so checkout won't crash)
3. Show clear error messages on the test connection page

## Still Getting Errors?

### Error: "Environment variables not set"
- You didn't update `.env.local` with real values
- Or you didn't restart the dev server after updating

### Error: "Connection failed"
- Check that you copied the FULL keys (they're very long!)
- Make sure you ran the SQL schema in Supabase
- Check for typos in the URL or keys

### Error: "Tables not accessible"
- You didn't run the SQL schema yet
- Or there was an error when running it
- Check the Supabase SQL Editor for error messages

## Need More Help?

1. Take a screenshot of the test connection page
2. Take a screenshot of your Supabase Settings → API page (blur the keys!)
3. Share the error message from the terminal
4. I'll help you debug!

## After It's Working

Once you see green checkmarks:
1. Test the search functionality
2. Try booking a service
3. Check if emails are sent (if you configured Resend)
4. Then we can commit to git!
