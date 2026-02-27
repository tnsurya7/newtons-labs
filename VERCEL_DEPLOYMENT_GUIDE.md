# Vercel Deployment Guide

## ✅ Build Error Fixed!

The TypeScript error has been fixed. The project is now ready to deploy to Vercel.

## 🚀 Deploy to Vercel

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Fixed email functionality and deployment issues"
git push origin main
```

### Step 2: Configure Environment Variables in Vercel

Go to your Vercel project settings and add these environment variables:

#### Required:
```
ADMIN_EMAIL=admin@newtonslab.com
NEXT_PUBLIC_API_URL=https://your-domain.vercel.app
```

#### For Email Functionality (Choose One):

**Option A: Resend (Recommended)**
```
RESEND_API_KEY=re_your_actual_api_key_here
```

**Option B: Gmail SMTP**
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-char-app-password
```

### Step 3: Deploy

1. Go to Vercel Dashboard
2. Click "Deploy" or push to GitHub (auto-deploys)
3. Wait for build to complete
4. Your site will be live!

## 📧 Email Setup for Production

### Option 1: Resend (Easiest)

1. Sign up at [resend.com](https://resend.com)
2. Get your API key
3. Add to Vercel environment variables:
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   ```
4. Redeploy

### Option 2: Gmail SMTP

1. Enable 2FA on Google account
2. Generate App Password
3. Add to Vercel environment variables:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   ```
4. Update consultation API to use `/api/email/send-gmail`

## 🔧 What Was Fixed

### Build Error:
- ❌ `createTransporter` (wrong method name)
- ✅ `createTransport` (correct method name)

### Files Updated:
- `app/api/email/send-gmail/route.ts` - Fixed typo
- `app/api/email/send/route.ts` - Added Resend integration
- `app/api/booking/consultation/route.ts` - Email sending logic

## ✅ Production Checklist

Before going live, make sure:

- [ ] Environment variables set in Vercel
- [ ] Email service configured (Resend or Gmail)
- [ ] Test consultation form after deployment
- [ ] Verify emails are being sent
- [ ] Check admin email receives notifications
- [ ] Test on mobile devices
- [ ] Verify dark/light theme works
- [ ] Test location functionality

## 🧪 Testing After Deployment

1. Go to your deployed URL
2. Navigate to `/consultation`
3. Fill out the form with a real email
4. Submit
5. Check your email inbox
6. Verify admin receives notification

## 🆘 Troubleshooting

### Build Fails
- Check Vercel build logs
- Ensure all dependencies are in package.json
- Verify TypeScript has no errors

### Emails Not Sending
- Check environment variables are set
- Verify API key is correct
- Check Vercel function logs
- Test email service credentials

### 404 Errors
- Ensure all pages are in `app/` directory
- Check file naming conventions
- Verify routes are correct

## 📊 Monitoring

After deployment:
- Monitor Vercel Analytics
- Check function logs for errors
- Monitor email delivery rates
- Track user submissions

## 🎯 Next Steps

1. Deploy to Vercel
2. Set up email service
3. Test all functionality
4. Monitor for issues
5. Iterate and improve

---

**Status**: Ready to deploy! 🚀