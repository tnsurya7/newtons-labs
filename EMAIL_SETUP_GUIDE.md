# Email Setup Guide for New10Labs

## Current Status
✅ Email functionality has been integrated into the booking system
✅ Email templates are ready (booking confirmation)
✅ Email API endpoint is configured
⚠️ Resend API key needs to be configured for production

## What's Been Fixed

1. **Booking API Updated**: Now automatically sends confirmation emails after successful bookings
2. **Email Integration**: Calls the `/api/email/send` endpoint with booking details
3. **Error Handling**: Booking succeeds even if email fails (logged to console)

## How Emails Work Now

When a user completes a booking:
1. Booking is created with ID (e.g., BK-ABC123-XYZ)
2. System generates HTML email using the booking confirmation template
3. Email is sent to the user's email address
4. Confirmation shows on screen

## Email Service Setup (Resend)

### Step 1: Get Resend API Key

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email
4. Go to API Keys section
5. Create a new API key
6. Copy the API key (starts with `re_`)

### Step 2: Update Environment Variables

Update `.env.local` file:

```env
RESEND_API_KEY=re_your_actual_api_key_here
```

### Step 3: Verify Domain (Optional but Recommended)

For production, verify your domain:
1. Go to Resend Dashboard → Domains
2. Add your domain (e.g., new10lab.com)
3. Add DNS records as instructed
4. Update the "from" email in `/app/api/email/send/route.ts`:

```typescript
from: 'New10Labs <noreply@new10lab.com>',
```

## Testing Email Functionality

### Development Mode (No API Key)
- Emails are logged to console
- Check terminal/console for email content
- Booking still works normally

### Production Mode (With API Key)
1. Complete a test booking
2. Check the email inbox
3. Verify email content and formatting
4. Check console logs for confirmation

## Email Templates

Located in `/lib/email/templates.ts`:

1. **Booking Confirmation Email**
   - Sent to customer
   - Includes booking ID, items, total, customer details
   - Professional HTML design

2. **Admin Notification Email** (Ready but not implemented)
   - Can be sent to admin when new booking arrives
   - Includes all booking details

## Troubleshooting

### Email Not Received

1. **Check API Key**: Ensure RESEND_API_KEY is set correctly
2. **Check Logs**: Look for email sending errors in console
3. **Check Spam**: Email might be in spam folder
4. **Verify Email**: Ensure user email is valid
5. **Check Resend Dashboard**: View email logs and delivery status

### Common Issues

**Issue**: "Email logged to console (development mode)"
- **Solution**: Add valid RESEND_API_KEY to .env.local

**Issue**: Email sent but not received
- **Solution**: Check spam folder, verify domain, check Resend dashboard

**Issue**: "Failed to send email"
- **Solution**: Check API key, check Resend account status, check logs

## Free Tier Limits (Resend)

- 100 emails/day for free
- 3,000 emails/month for free
- Upgrade for higher limits

## Next Steps

1. ✅ Get Resend API key
2. ✅ Update .env.local
3. ✅ Test booking flow
4. ✅ Verify email delivery
5. ⏳ (Optional) Verify custom domain
6. ⏳ (Optional) Add admin notification emails

## Support

If you need help:
- Resend Documentation: https://resend.com/docs
- Resend Support: support@resend.com
- Check console logs for detailed error messages

---

**Note**: The booking system works perfectly even without email configuration. Emails are a nice-to-have feature that enhances user experience.
