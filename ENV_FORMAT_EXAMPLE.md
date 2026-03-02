# .env.local Format Example

## ⚠️ IMPORTANT: Replace ALL placeholder values!

Your `.env.local` file should look like this (with YOUR actual values):

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMjc0ODAwMCwiZXhwIjoxOTQ4MzI0MDAwfQ.abcdefghijklmnopqrstuvwxyz1234567890
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjMyNzQ4MDAwLCJleHAiOjE5NDgzMjQwMDB9.abcdefghijklmnopqrstuvwxyz1234567890

# Email Service (Optional)
RESEND_API_KEY=re_123456789abcdefghijklmnop

# Admin Credentials
ADMIN_EMAIL=admin@new10lab.com
ADMIN_PASSWORD=admin123
```

## 🔍 How to Get Your Values:

### 1. Supabase URL
- Go to https://supabase.com
- Open your project
- Go to Settings → API
- Copy "Project URL"
- Should look like: `https://xxxxx.supabase.co`

### 2. Supabase Anon Key
- Same page (Settings → API)
- Under "Project API keys"
- Copy the `anon` `public` key
- Starts with: `eyJhbGc...`
- Very long (300+ characters)

### 3. Supabase Service Role Key
- Same page (Settings → API)
- Under "Project API keys"
- Copy the `service_role` key
- Starts with: `eyJhbGc...`
- Very long (300+ characters)
- ⚠️ Keep this secret!

### 4. Resend API Key (Optional)
- Go to https://resend.com
- Sign up / Login
- Go to API Keys
- Create new key
- Starts with: `re_`

## ✅ Checklist:

Before saving `.env.local`:

- [ ] URL starts with `https://` and ends with `.supabase.co`
- [ ] Anon key starts with `eyJhbGc` and is 300+ characters
- [ ] Service role key starts with `eyJhbGc` and is 300+ characters
- [ ] No quotes around values
- [ ] No spaces before or after `=`
- [ ] No placeholder text like "your_xxx_here"

## 🚫 Common Mistakes:

**WRONG:**
```env
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"  ❌ No quotes!
NEXT_PUBLIC_SUPABASE_URL = https://xxx.supabase.co  ❌ No spaces!
NEXT_PUBLIC_SUPABASE_URL=your_url_here              ❌ Not actual URL!
```

**CORRECT:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co    ✅
```

## 🔄 After Updating:

1. Save the `.env.local` file
2. Restart dev server (Ctrl+C, then `npm run dev`)
3. Go to http://localhost:3000/test-connection
4. Should see green checkmarks!

## 💡 Still Not Working?

Check your terminal for errors when starting the dev server. The error message will tell you what's wrong.
