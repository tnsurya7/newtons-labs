# Vercel Build Error Fix

## Error
```
Error: Missing API key. Pass it to the constructor `new Resend("re_123")`
Error: Failed to collect page data for /api/email/send
```

## Cause
There's an `/api/email/send` route in your repository that requires a Resend API key but it's not configured.

## Solution Options

### Option 1: Remove the Email Route (Recommended if not needed)

If you don't need email functionality, delete the email route:

```bash
# Remove the email API route
rm -rf app/api/email

# Commit the change
git add .
git commit -m "fix: Remove unused email API route"
git push
```

### Option 2: Add Resend API Key (If you need email functionality)

1. **Get Resend API Key:**
   - Go to https://resend.com
   - Sign up or login
   - Get your API key from https://resend.com/api-keys

2. **Add to Vercel Environment Variables:**
   - Go to your Vercel project dashboard
   - Navigate to Settings → Environment Variables
   - Add new variable:
     - Name: `RESEND_API_KEY`
     - Value: Your Resend API key (starts with `re_`)
     - Environment: Production, Preview, Development

3. **Redeploy:**
   - Vercel will automatically redeploy with the new environment variable

### Option 3: Make Email Route Optional

Update the email route to handle missing API key gracefully:

```typescript
// app/api/email/send/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Check if API key is configured
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      {
        success: false,
        message: 'Email service not configured',
      },
      { status: 503 }
    );
  }

  // Your existing email logic here
  // ...
}
```

## Quick Fix Command

Run this in your terminal to remove the email route:

```bash
cd newtons-lab
rm -rf app/api/email
git add .
git commit -m "fix: Remove email API route causing build error"
git push
```

## Verification

After applying the fix:
1. Push changes to GitHub
2. Vercel will automatically redeploy
3. Build should succeed

## Environment Variables Setup

For future reference, here's how to set up environment variables:

### Local Development (.env.local)
```env
RESEND_API_KEY=re_your_api_key_here
```

### Vercel (Production)
1. Go to Vercel Dashboard
2. Select your project
3. Settings → Environment Variables
4. Add each variable with appropriate scope

## Prevention

To prevent this in the future:
1. Always add `.env.example` with dummy values
2. Document required environment variables in README
3. Make external services optional or fail gracefully
4. Test builds locally before pushing

---

**Status**: Action Required
**Priority**: High (Blocking deployment)
**Estimated Fix Time**: 2 minutes
