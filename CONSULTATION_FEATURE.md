# Online Consultation Feature

## Overview
The online consultation feature allows patients to book medical consultations through a dedicated form. When submitted, the system sends confirmation emails to both the patient and the admin team.

## Features

### 1. Consultation Booking Page (`/consultation`)
- Clean, professional form interface
- Required fields:
  - Full Name
  - Email Address
  - Phone Number
  - Message/Health Concern
- Form validation
- Success confirmation with auto-redirect
- Responsive design with dark mode support

### 2. Email Notifications
When a consultation is booked, two emails are sent:

#### Patient Email
- Confirmation of booking
- Consultation ID
- Summary of submitted information
- Next steps and timeline
- Contact information for urgent concerns

#### Admin Email
- Alert notification for new consultation
- Complete patient details
- Health concern/message
- Action items checklist
- Timestamp of submission

## File Structure

```
app/
├── consultation/
│   └── page.tsx                          # Consultation booking form page
├── api/
    ├── booking/
    │   └── consultation/
    │       └── route.ts                  # Consultation booking API with email
    └── email/
        └── send/
            └── route.ts                  # Email sending API endpoint
```

## Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Admin email to receive consultation requests
ADMIN_EMAIL=admin@newtonslab.com

# Application URL
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Email Service Integration (Production)

For development, emails are logged to the console. For production, integrate with an email service:

#### Option 1: Resend (Recommended)
```bash
npm install resend
```

Update `app/api/email/send/route.ts`:
```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail(data: EmailData) {
  await resend.emails.send({
    from: 'Newton\'s Lab <noreply@newtonslab.com>',
    to: data.to,
    subject: data.subject,
    html: data.html,
  });
}
```

Add to `.env.local`:
```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

#### Option 2: Nodemailer (SMTP)
```bash
npm install nodemailer
```

```typescript
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

async function sendEmail(data: EmailData) {
  await transporter.sendMail({
    from: '"Newton\'s Lab" <noreply@newtonslab.com>',
    to: data.to,
    subject: data.subject,
    html: data.html,
  });
}
```

#### Option 3: SendGrid
```bash
npm install @sendgrid/mail
```

```typescript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

async function sendEmail(data: EmailData) {
  await sgMail.send({
    from: 'noreply@newtonslab.com',
    to: data.to,
    subject: data.subject,
    html: data.html,
  });
}
```

## Usage

### For Users
1. Click "Book Online Consultation" button on the homepage
2. Fill in the consultation form with:
   - Name
   - Email
   - Phone number
   - Health concern/message
3. Submit the form
4. Receive confirmation email
5. Wait for the medical team to contact you

### For Admins
1. Receive email notification for each new consultation
2. Review patient details and health concern
3. Assign appropriate doctor
4. Contact patient within 24 hours
5. Schedule consultation and send meeting link

## API Endpoints

### POST `/api/booking/consultation`
Books a new consultation and sends emails.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 98765 43210",
  "message": "I have been experiencing headaches for the past week..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Consultation booked successfully. Confirmation emails sent.",
  "data": {
    "consultationId": "CONS1234567890",
    "name": "John Doe",
    "phone": "+91 98765 43210",
    "email": "john@example.com",
    "message": "I have been experiencing headaches...",
    "status": "confirmed",
    "bookedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### POST `/api/email/send`
Internal API for sending emails.

**Request Body:**
```json
{
  "to": "user@example.com",
  "subject": "Email Subject",
  "html": "<html>Email content</html>"
}
```

## Testing

### Development Testing
1. Start the development server: `npm run dev`
2. Navigate to `http://localhost:3000/consultation`
3. Fill and submit the form
4. Check the console logs for email content
5. Verify success message and redirect

### Production Testing
1. Configure email service (Resend, SendGrid, etc.)
2. Set environment variables
3. Test with real email addresses
4. Verify both user and admin receive emails
5. Check email formatting and content

## Security Considerations

1. **Input Validation**: All fields are validated on both client and server
2. **Email Validation**: Regex pattern ensures valid email format
3. **Rate Limiting**: Consider adding rate limiting to prevent spam
4. **CAPTCHA**: Consider adding reCAPTCHA for production
5. **Environment Variables**: Never commit sensitive keys to version control

## Future Enhancements

- [ ] Add date/time picker for preferred consultation slot
- [ ] Integrate with calendar system (Google Calendar, etc.)
- [ ] Add SMS notifications
- [ ] Implement consultation history for logged-in users
- [ ] Add file upload for medical documents
- [ ] Integrate video consultation platform
- [ ] Add payment gateway for paid consultations
- [ ] Implement doctor availability checking
- [ ] Add automated reminder emails
- [ ] Create admin dashboard for managing consultations

## Troubleshooting

### Emails not sending in development
- This is expected behavior. Check console logs for email content.
- To test actual sending, configure an email service.

### Form submission fails
- Check browser console for errors
- Verify all required fields are filled
- Check network tab for API response
- Verify API endpoint is accessible

### Email formatting issues
- Test HTML email in different email clients
- Use email testing tools like Litmus or Email on Acid
- Ensure inline CSS for better compatibility

## Support

For issues or questions:
- Check console logs for detailed error messages
- Review API responses in network tab
- Verify environment variables are set correctly
- Contact development team for assistance
