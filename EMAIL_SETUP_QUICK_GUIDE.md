# Quick Email Setup Guide

## 🚀 Get Real Emails Working in 5 Minutes

### Step 1: Sign up for Resend (FREE)
1. Go to [resend.com](https://resend.com)
2. Click "Sign Up" 
3. Use your email to create account
4. Verify your email address

### Step 2: Get API Key
1. After login, go to "API Keys" section
2. Click "Create API Key"
3. Name it "Newton Labs Dev"
4. Copy the key (starts with `re_`)

### Step 3: Add API Key to Project
1. Open your `.env.local` file
2. Add this line:
   ```
   RESEND_API_KEY=re_your_actual_api_key_here
   ```
3. Replace `re_your_actual_api_key_here` with your actual key
4. Save the file

### Step 4: Restart Development Server
1. Stop the current server (Ctrl+C)
2. Run `npm run dev` again
3. Server will restart with email functionality

### Step 5: Test Email
1. Go to http://localhost:3000/consultation
2. Fill out the form with a REAL email address
3. Submit the form
4. Check your email inbox!

## ✅ What You Get FREE with Resend:
- 3,000 emails per month
- No credit card required
- Professional email templates
- Delivery tracking
- Easy setup

## 🔧 Alternative: Use Gmail SMTP (Also Free)

If you prefer Gmail:

1. Enable 2-Factor Authentication on your Google account
2. Generate an App Password:
   - Google Account → Security → App passwords
   - Generate password for "Mail"
3. Add to `.env.local`:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-16-char-app-password
   ```

Then I'll update the code to use Gmail SMTP instead.

## 🎯 Recommended: Use Resend
Resend is easier and more reliable for this project.

## Need Help?
If you get stuck, let me know and I'll help you set it up!