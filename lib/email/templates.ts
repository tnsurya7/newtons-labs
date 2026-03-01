import { BookingWithItems } from '@/lib/supabase/types';

export function generateBookingConfirmationEmail(booking: BookingWithItems): string {
  const itemsHtml = booking.items.map(item => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
        <strong>${item.service_name}</strong><br/>
        <span style="color: #6b7280; font-size: 14px;">${item.service_type}</span>
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">
        ${item.quantity}
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">
        ₹${item.price.toFixed(2)}
      </td>
    </tr>
  `).join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Confirmation - New10Labs</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #2563eb 0%, #14b8a6 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Booking Confirmed! ✓</h1>
              <p style="color: #e0f2fe; margin: 10px 0 0 0; font-size: 16px;">Thank you for choosing New10Labs</p>
            </td>
          </tr>

          <!-- Booking ID -->
          <tr>
            <td style="padding: 30px; background-color: #eff6ff; text-align: center;">
              <p style="margin: 0; color: #1e40af; font-size: 14px; font-weight: 600;">BOOKING ID</p>
              <p style="margin: 5px 0 0 0; color: #1e3a8a; font-size: 24px; font-weight: bold;">${booking.booking_id}</p>
            </td>
          </tr>

          <!-- Customer Details -->
          <tr>
            <td style="padding: 30px;">
              <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 20px;">Customer Details</h2>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Name:</td>
                  <td style="padding: 8px 0; color: #1f2937; font-weight: 600; text-align: right;">${booking.user_name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Email:</td>
                  <td style="padding: 8px 0; color: #1f2937; font-weight: 600; text-align: right;">${booking.user_email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Phone:</td>
                  <td style="padding: 8px 0; color: #1f2937; font-weight: 600; text-align: right;">${booking.user_phone}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px; vertical-align: top;">Address:</td>
                  <td style="padding: 8px 0; color: #1f2937; font-weight: 600; text-align: right;">${booking.user_address}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Services Booked -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 20px;">Services Booked</h2>
              <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                <thead>
                  <tr style="background-color: #f9fafb;">
                    <th style="padding: 12px; text-align: left; color: #6b7280; font-size: 14px; font-weight: 600;">Service</th>
                    <th style="padding: 12px; text-align: center; color: #6b7280; font-size: 14px; font-weight: 600;">Qty</th>
                    <th style="padding: 12px; text-align: right; color: #6b7280; font-size: 14px; font-weight: 600;">Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>
            </td>
          </tr>

          <!-- Payment Summary -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 8px; padding: 20px;">
                <tr>
                  <td style="padding: 8px 0; color: #6b7280;">Subtotal:</td>
                  <td style="padding: 8px 0; color: #1f2937; font-weight: 600; text-align: right;">₹${booking.subtotal.toFixed(2)}</td>
                </tr>
                ${booking.discount_amount > 0 ? `
                <tr>
                  <td style="padding: 8px 0; color: #059669;">Discount:</td>
                  <td style="padding: 8px 0; color: #059669; font-weight: 600; text-align: right;">-₹${booking.discount_amount.toFixed(2)}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 8px 0; color: #6b7280;">Tax:</td>
                  <td style="padding: 8px 0; color: #1f2937; font-weight: 600; text-align: right;">₹${booking.tax_amount.toFixed(2)}</td>
                </tr>
                <tr style="border-top: 2px solid #e5e7eb;">
                  <td style="padding: 12px 0 0 0; color: #1f2937; font-size: 18px; font-weight: bold;">Total Amount:</td>
                  <td style="padding: 12px 0 0 0; color: #2563eb; font-size: 20px; font-weight: bold; text-align: right;">₹${booking.total_amount.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colspan="2" style="padding: 8px 0 0 0;">
                    <span style="display: inline-block; background-color: #10b981; color: white; padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: 600;">PAID</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- What's Next -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 8px; padding: 20px;">
                <h3 style="color: #1e40af; margin: 0 0 15px 0; font-size: 18px;">What Happens Next?</h3>
                <ul style="margin: 0; padding-left: 20px; color: #1f2937;">
                  <li style="margin-bottom: 10px;">Our team will call you within 2 hours to confirm the appointment</li>
                  <li style="margin-bottom: 10px;">A trained phlebotomist will visit your address for sample collection</li>
                  <li style="margin-bottom: 10px;">Reports will be available within 24-48 hours</li>
                  <li style="margin-bottom: 0;">You'll receive an email notification when reports are ready</li>
                </ul>
              </div>
            </td>
          </tr>

          <!-- Contact Info -->
          <tr>
            <td style="padding: 0 30px 30px 30px; text-align: center;">
              <p style="color: #6b7280; margin: 0 0 10px 0; font-size: 14px;">Need help? Contact us:</p>
              <p style="margin: 0;">
                <a href="tel:9003130800" style="color: #2563eb; text-decoration: none; font-weight: 600;">📞 9003130800</a>
                <span style="color: #d1d5db; margin: 0 10px;">|</span>
                <a href="mailto:support@new10lab.com" style="color: #2563eb; text-decoration: none; font-weight: 600;">✉️ support@new10lab.com</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 20px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px 0; color: #1f2937; font-weight: 600;">New10Labs Diagnostic Centre</p>
              <p style="margin: 0; color: #6b7280; font-size: 14px;">152/3, 6th Avenue, Anna Nagar East, Chennai - 600 102</p>
              <p style="margin: 10px 0 0 0; color: #9ca3af; font-size: 12px;">NABL Certified | Trusted Diagnostics</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export function generateAdminNotificationEmail(booking: BookingWithItems): string {
  const itemsHtml = booking.items.map(item => `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${item.service_name}</td>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${item.service_type}</td>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: right;">₹${item.price.toFixed(2)}</td>
    </tr>
  `).join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Booking Alert - New10Labs</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
          
          <tr>
            <td style="background-color: #dc2626; padding: 20px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">🔔 New Booking Alert</h1>
            </td>
          </tr>

          <tr>
            <td style="padding: 30px;">
              <p style="margin: 0 0 20px 0; color: #1f2937; font-size: 16px;">
                A new booking has been placed. Please review and confirm.
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                <tr>
                  <td style="padding: 8px 0; color: #6b7280;">Booking ID:</td>
                  <td style="padding: 8px 0; color: #1f2937; font-weight: bold; text-align: right;">${booking.booking_id}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280;">Date:</td>
                  <td style="padding: 8px 0; color: #1f2937; font-weight: 600; text-align: right;">${new Date(booking.created_at).toLocaleString()}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280;">Amount:</td>
                  <td style="padding: 8px 0; color: #059669; font-weight: bold; font-size: 18px; text-align: right;">₹${booking.total_amount.toFixed(2)}</td>
                </tr>
              </table>

              <h3 style="color: #1f2937; margin: 20px 0 10px 0;">Customer Information</h3>
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 8px; padding: 15px;">
                <tr>
                  <td style="padding: 5px 0; color: #6b7280;">Name:</td>
                  <td style="padding: 5px 0; color: #1f2937; font-weight: 600; text-align: right;">${booking.user_name}</td>
                </tr>
                <tr>
                  <td style="padding: 5px 0; color: #6b7280;">Email:</td>
                  <td style="padding: 5px 0; color: #1f2937; font-weight: 600; text-align: right;">${booking.user_email}</td>
                </tr>
                <tr>
                  <td style="padding: 5px 0; color: #6b7280;">Phone:</td>
                  <td style="padding: 5px 0; color: #1f2937; font-weight: 600; text-align: right;">${booking.user_phone}</td>
                </tr>
                <tr>
                  <td style="padding: 5px 0; color: #6b7280; vertical-align: top;">Address:</td>
                  <td style="padding: 5px 0; color: #1f2937; font-weight: 600; text-align: right;">${booking.user_address}</td>
                </tr>
              </table>

              <h3 style="color: #1f2937; margin: 20px 0 10px 0;">Services Booked</h3>
              <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                <thead>
                  <tr style="background-color: #f9fafb;">
                    <th style="padding: 8px; text-align: left; color: #6b7280; font-size: 14px;">Service</th>
                    <th style="padding: 8px; text-align: left; color: #6b7280; font-size: 14px;">Type</th>
                    <th style="padding: 8px; text-align: center; color: #6b7280; font-size: 14px;">Qty</th>
                    <th style="padding: 8px; text-align: right; color: #6b7280; font-size: 14px;">Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>

              <div style="margin-top: 30px; text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin/bookings/${booking.id}" 
                   style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 600;">
                  View in Admin Panel
                </a>
              </div>
            </td>
          </tr>

          <tr>
            <td style="background-color: #f9fafb; padding: 15px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #6b7280; font-size: 12px;">This is an automated notification from New10Labs Admin System</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
