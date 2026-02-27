import { NextRequest, NextResponse } from 'next/server';

// Admin email - configure this in environment variables
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@newtonslab.com';

async function sendConsultationEmails(data: {
  consultationId: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  const { consultationId, name, email, phone, message } = data;

  // Email to User
  const userEmailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #2563eb 0%, #14b8a6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .info-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb; }
        .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
        .button { display: inline-block; background: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏥 Newton's Lab</h1>
          <h2>Consultation Request Received</h2>
        </div>
        <div class="content">
          <p>Dear ${name},</p>
          <p>Thank you for booking an online consultation with Newton's Lab. We have received your request and our medical team will review it shortly.</p>
          
          <div class="info-box">
            <h3>📋 Consultation Details</h3>
            <p><strong>Consultation ID:</strong> ${consultationId}</p>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Health Concern:</strong></p>
            <p>${message}</p>
          </div>

          <h3>⏱️ What's Next?</h3>
          <ul>
            <li>Our medical team will review your request within 24 hours</li>
            <li>You'll receive a call/email to schedule your consultation</li>
            <li>A meeting link will be sent before your appointment</li>
          </ul>

          <p>If you have any urgent concerns, please call us at <strong>1800-XXX-XXXX</strong></p>
          
          <div class="footer">
            <p>This is an automated confirmation email from Newton's Lab</p>
            <p>© ${new Date().getFullYear()} Newton's Lab. All rights reserved.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  // Email to Admin
  const adminEmailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #dc2626 0%, #ea580c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .info-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626; }
        .urgent { background: #fef2f2; border: 2px solid #dc2626; padding: 15px; border-radius: 8px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚨 New Consultation Request</h1>
          <p>Action Required</p>
        </div>
        <div class="content">
          <div class="urgent">
            <strong>⚠️ New patient consultation request received</strong>
          </div>
          
          <div class="info-box">
            <h3>📋 Patient Details</h3>
            <p><strong>Consultation ID:</strong> ${consultationId}</p>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          </div>

          <div class="info-box">
            <h3>💬 Health Concern / Message</h3>
            <p>${message}</p>
          </div>

          <h3>✅ Next Steps:</h3>
          <ul>
            <li>Review the patient's health concern</li>
            <li>Assign a suitable doctor</li>
            <li>Contact the patient within 24 hours</li>
            <li>Schedule the consultation and send meeting link</li>
          </ul>
        </div>
      </div>
    </body>
    </html>
  `;

  // Send emails (in development, these will be logged to console)
  try {
    // Send to user
    await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/email/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: email,
        subject: `Consultation Request Confirmed - ${consultationId}`,
        html: userEmailHtml,
      }),
    });

    // Send to admin
    await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/email/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: ADMIN_EMAIL,
        subject: `🚨 New Consultation Request - ${consultationId}`,
        html: adminEmailHtml,
      }),
    });
  } catch (error) {
    console.error('Failed to send emails:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, message } = body;

    if (!name || !phone || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    const consultationId = `CONS${Date.now()}`;

    console.log('Doctor consultation booking:', { consultationId, name, phone, email, message });

    // Send emails to both user and admin
    await sendConsultationEmails({
      consultationId,
      name,
      email,
      phone,
      message,
    });

    return NextResponse.json({
      success: true,
      message: 'Consultation booked successfully. Confirmation emails sent.',
      data: {
        consultationId,
        name,
        phone,
        email,
        message,
        status: 'confirmed',
        bookedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Consultation booking error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to book consultation' },
      { status: 500 }
    );
  }
}
