import { BookingWithItems } from '@/lib/supabase/types';
import { generateBookingConfirmationEmail, generateAdminNotificationEmail } from './templates';

// Dynamically import Resend only if available
let Resend: any = null;
let resend: any = null;

try {
  const ResendModule = require('resend');
  Resend = ResendModule.Resend;
  if (process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
} catch (error) {
  console.warn('Resend package not available. Email functionality disabled.');
}

export async function sendBookingConfirmationEmail(booking: BookingWithItems) {
  if (!resend) {
    console.warn('Resend API key not configured. Email not sent.');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const html = generateBookingConfirmationEmail(booking);
    
    const { data, error } = await resend.emails.send({
      from: 'New10Labs <bookings@new10lab.com>',
      to: [booking.user_email],
      subject: `Booking Confirmed - ${booking.booking_id}`,
      html,
    });

    if (error) {
      console.error('Error sending booking confirmation:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error: any) {
    console.error('Error sending booking confirmation:', error);
    return { success: false, error: error.message };
  }
}

export async function sendAdminNotificationEmail(booking: BookingWithItems) {
  if (!resend) {
    console.warn('Resend API key not configured. Admin notification not sent.');
    return { success: false, error: 'Email service not configured' };
  }

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@new10lab.com';

  try {
    const html = generateAdminNotificationEmail(booking);
    
    const { data, error } = await resend.emails.send({
      from: 'New10Labs System <system@new10lab.com>',
      to: [adminEmail],
      subject: `🔔 New Booking Alert - ${booking.booking_id}`,
      html,
    });

    if (error) {
      console.error('Error sending admin notification:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error: any) {
    console.error('Error sending admin notification:', error);
    return { success: false, error: error.message };
  }
}

export async function sendBothBookingEmails(booking: BookingWithItems) {
  const [userResult, adminResult] = await Promise.all([
    sendBookingConfirmationEmail(booking),
    sendAdminNotificationEmail(booking),
  ]);

  return {
    userEmail: userResult,
    adminEmail: adminResult,
    success: userResult.success || adminResult.success,
  };
}
