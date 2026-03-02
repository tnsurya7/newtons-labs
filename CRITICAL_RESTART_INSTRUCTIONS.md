# 🚨 CRITICAL: RESTART YOUR SERVER NOW

## The .env.local file has been updated with your real Supabase credentials!

## STEP 1: STOP THE SERVER
In your terminal where `npm run dev` is running:
- Press `Ctrl + C` to stop the server
- Wait for it to fully stop

## STEP 2: START THE SERVER AGAIN
```bash
npm run dev
```

## STEP 3: CHECK THE TERMINAL OUTPUT
After starting, you should see:
```
Supabase Config Check:
- URL valid: true
- Anon Key valid: true  
- Service Key valid: true
```

If you see `false` for any of these, the environment variables didn't load.

## STEP 4: TEST ADMIN LOGIN
1. Go to http://localhost:3000/admin/login
2. Email: admin@new10lab.com
3. Password: admin123
4. Click "Sign In"

## If It Still Shows "Database not configured"

This means the server didn't restart properly. Try:

1. **Kill all Node processes:**
   ```bash
   taskkill /F /IM node.exe
   ```

2. **Start fresh:**
   ```bash
   npm run dev
   ```

3. **Check the .env.local file manually:**
   - Open `newtons-lab/.env.local` in your editor
   - Verify it shows: `NEXT_PUBLIC_SUPABASE_URL=https://tulbixyhwpcqwhmpjune.supabase.co`
   - If it still shows `your_supabase_project_url_here`, the file didn't save properly

## Alternative: Manual Edit

If the automated fix didn't work, manually edit `.env.local`:

1. Open `newtons-lab/.env.local`
2. Replace the first 3 lines with:
```
NEXT_PUBLIC_SUPABASE_URL=https://tulbixyhwpcqwhmpjune.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1bGJpeHlod3BjcXdobXBqdW5lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzNDgyMDIsImV4cCI6MjA4NzkyNDIwMn0.8ATSJd9hZtt6RZnDW9-bUi7eLBwEmdqzO1JMqYXhlUY
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1bGJpeHlod3BjcXdobXBqdW5lIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjM0ODIwMiwiZXhwIjoyMDg3OTI0MjAyfQ.Hh0s0UtTV0bu7bFLgXa2zRa5sRFJasusohFI2AgKUUo
```
3. Save the file
4. Restart the server

## What Should Happen After Restart

✅ No more "Database not configured" error
✅ Admin login should work
✅ Dashboard should load with stats
✅ Tests and Packages management should work
