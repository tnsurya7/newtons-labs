# Your Exact Values for Vercel

Copy these exact values to Vercel Environment Variables:

---

## Variable 1: NEXT_PUBLIC_SUPABASE_URL

**Key (type exactly):**
```
NEXT_PUBLIC_SUPABASE_URL
```

**Value (copy this):**
```
https://tulbixyhwpcqwhmpjune.supabase.co
```

**Environments:** ✅ Production ✅ Preview ✅ Development

---

## Variable 2: SUPABASE_SERVICE_ROLE_KEY

**Key (type exactly):**
```
SUPABASE_SERVICE_ROLE_KEY
```

**Value (copy this):**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1bGJpeHlod3BjcXdobXBqdW5lIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjM0ODIwMiwiZXhwIjoyMDg3OTI0MjAyfQ.Hh0s0UtTV0bu7bFLgXa2zRa5sRFJasusohFI2AgKUUo
```

**Environments:** ✅ Production ✅ Preview ✅ Development

---

## Quick Steps:

1. Go to https://vercel.com
2. Click on your **newtons-labs** project
3. Click **Settings** tab
4. Click **Environment Variables** in sidebar
5. Add Variable 1 (copy key and value from above)
6. Click Save
7. Add Variable 2 (copy key and value from above)
8. Click Save
9. Go to **Deployments** tab
10. Click the three dots (...) on latest deployment
11. Click **Redeploy**
12. Wait 2-3 minutes for build to complete
13. Done! ✅

---

## Important Notes:

- Copy the values EXACTLY as shown (no extra spaces)
- Select all three environments for each variable
- Click Save after each variable
- Must redeploy after adding variables

---

## Optional: Email Support (RESEND_API_KEY)

If you want booking confirmation emails to work:

1. Sign up at https://resend.com
2. Get your API key from https://resend.com/api-keys
3. Add it to Vercel as:
   - Key: `RESEND_API_KEY`
   - Value: `re_your_actual_key_here`
   - Environments: All three

---

## Verification:

After redeployment, check:
- Build shows ✅ green checkmark
- No "supabaseUrl is required" error
- Website loads at your Vercel URL
- Login/signup works on production site
