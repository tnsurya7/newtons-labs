# Email Service Setup Guide

This guide will help you integrate a real email service for sending consultation confirmation emails.

## Quick Start (Recommended: Resend)

Resend is the easiest and most developer-friendly option with a generous free tier.

### Step 1: Sign up for Resend
1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

### Step 2: Get API Key
1. Go to API Keys section
2. Create a new API key
3. Copy the key (starts with `re_`)

### Step 3: Install Resend
```bash
npm install resend
```

### Step 4: Update Environment Variables
Add to `.env.local`:
```env
RESEND_API_KEY=re_your_actual_api_key_here
ADMIN_EMAIL=your-admin@email.com
```

### Step 5: Update Email API
Replace the content in `app/api/email/send/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailData {
  to: string;
  subject: string;
  html: string;
}

async function sendEmail(data: EmailData) {
  try {
    const result = await resend.emails.send({
      from: 'Newton\'s Lab <onboarding@resend.dev>', // Use your verified domain
      to: data.to,
      subject: data.subject,
      html: data.html,
    });
    return { success: true, data: result };
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, subject, html } = body;

    if (!to || !subject || !html) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await sendEmail({ to, subject, html });

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      data: result,
    });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send email' },
      { status: 500 }
    );
  }
}
```

### Step 6: Test
1. Restart your dev server: `npm run dev`
2. Go to `/consultation`
3. Fill the form with a real email
4. Check your inbox for confirmation email

### Step 7: Add Custom Domain (Optional)
1. In Resend dashboard, go to Domains
2. Add your domain (e.g., newtonslab.com)
3. Add DNS records as instructed
4. Update the `from` field to use your domain:
   ```typescript
   from: 'Newton\'s Lab <noreply@newtonslab.com>'
   ```

## Alternative: Gmail SMTP (Free)

### Step 1: Enable 2-Factor Authentication
1. Go to Google Account settings
2. Enable 2-Factor Authentication

### Step 2: Generate App Password
1. Go to Security → App passwords
2. Generate password for "Mail"
3. Copy the 16-character password

### Step 3: Install Nodemailer
```bash
npm install nodemailer
npm install --save-dev @types/nodemailer
```

### Step 4: Update Environment Variables
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-char-app-password
ADMIN_EMAIL=admin@newtonslab.com
```

### Step 5: Update Email API
```typescript
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendEmail(data: { to: string; subject: string; html: string }) {
  await transporter.sendMail({
    from: `"Newton's Lab" <${process.env.SMTP_USER}>`,
    to: data.to,
    subject: data.subject,
    html: data.html,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, subject, html } = body;

    if (!to || !subject || !html) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    await sendEmail({ to, subject, html });

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
    });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send email' },
      { status: 500 }
    );
  }
}
```

## Alternative: SendGrid

### Step 1: Sign Up
1. Go to [sendgrid.com](https://sendgrid.com)
2. Sign up for free account (100 emails/day free)

### Step 2: Create API Key
1. Go to Settings → API Keys
2. Create API Key with "Mail Send" permissions
3. Copy the key

### Step 3: Install SendGrid
```bash
npm install @sendgrid/mail
```

### Step 4: Update Environment Variables
```env
SENDGRID_API_KEY=SG.your_actual_api_key
ADMIN_EMAIL=admin@newtonslab.com
```

### Step 5: Update Email API
```typescript
import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

async function sendEmail(data: { to: string; subject: string; html: string }) {
  await sgMail.send({
    from: 'noreply@newtonslab.com', // Must be verified in SendGrid
    to: data.to,
    subject: data.subject,
    html: data.html,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, subject, html } = body;

    if (!to || !subject || !html) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    await sendEmail({ to, subject, html });

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
    });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send email' },
      { status: 500 }
    );
  }
}
```

## Comparison

| Service | Free Tier | Pros | Cons |
|---------|-----------|------|------|
| **Resend** | 3,000/month | Easy setup, great DX, modern | Newer service |
| **Gmail SMTP** | 500/day | Free, reliable | Requires Google account, daily limit |
| **SendGrid** | 100/day | Established, reliable | Lower free tier, more complex |
| **AWS SES** | 62,000/month | Generous free tier | Requires AWS account, more setup |

## Recommendation

For this project, I recommend **Resend** because:
- ✅ Easiest to set up (5 minutes)
- ✅ Best developer experience
- ✅ Generous free tier (3,000 emails/month)
- ✅ Modern API
- ✅ Great documentation
- ✅ No credit card required for free tier

## Testing Emails

### Test in Development
```bash
# Use a service like Mailtrap for testing
# https://mailtrap.io
```

### Test Email Content
Use these tools to preview emails:
- [Litmus](https://litmus.com)
- [Email on Acid](https://www.emailonacid.com)
- [Mailtrap](https://mailtrap.io)

## Troubleshooting

### Emails going to spam
- Verify your domain with the email service
- Add SPF and DKIM records
- Use a professional "from" address
- Avoid spam trigger words

### Rate limiting
- Implement queue system for high volume
- Use background jobs (Bull, BullMQ)
- Consider upgrading to paid tier

### Delivery failures
- Check API key is correct
- Verify sender email is authorized
- Check recipient email is valid
- Review service logs/dashboard

## Production Checklist

- [ ] Email service configured and tested
- [ ] Environment variables set in production
- [ ] Custom domain verified (if using)
- [ ] SPF/DKIM records added
- [ ] Rate limiting implemented
- [ ] Error handling and logging in place
- [ ] Email templates tested across clients
- [ ] Unsubscribe link added (if required)
- [ ] Privacy policy updated
- [ ] Monitoring and alerts configured
