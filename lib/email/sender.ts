import { Resend } from 'resend';
import { BookingWithItems } from '@/lib/supabase/types';
import { generateBookingConfirmationEmail, generateAdminNotificationEmail } from './templates';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

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
