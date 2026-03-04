import { NextRequest, NextResponse } from 'next/server';
import { generateBookingConfirmationEmail } from '@/lib/email/templates';

function generateBookingId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `BK-${timestamp}-${random}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user, items, address, phone } = body;

    if (!user || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Calculate totals
    const subtotal = items.reduce((sum: number, item: any) => sum + (item.originalPrice || item.price), 0);
    const totalAmount = items.reduce((sum: number, item: any) => sum + item.price, 0);
    const discountAmount = subtotal - totalAmount;

    const bookingId = generateBookingId();
    const bookingDate = new Date().toISOString();

    // Create booking object
    const booking: any = {
      id: bookingId,
      booking_id: bookingId,
      user_name: user.name,
      user_email: user.email,
      user_phone: phone || user.phone,
      user_address: address,
      user_age: user.age,
      user_designation: user.designation,
      patient_id: user.patientId,
      referral: user.referral || '',
      items: items.map((item: any) => ({
        service_type: item.type || 'test',
        service_id: item.id,
        service_name: item.name,
        quantity: 1,
        price: item.price,
        original_price: item.originalPrice || item.price,
        discount: item.discount || 0,
        category: item.category || '',
        parameters: item.parameters || 1,
        reportTime: item.reportTime || '24 Hours',
      })),
      subtotal,
      discount_amount: discountAmount,
      tax_amount: 0,
      total_amount: totalAmount,
      status: 'confirmed',
      payment_status: 'pending',
      payment_method: 'pay_on_service',
      booking_date: bookingDate,
      collection_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Next day
      created_at: bookingDate,
    };

    console.log('Booking created successfully:', bookingId);

    // Send confirmation email to customer
    try {
      const emailHtml = generateBookingConfirmationEmail(booking);
      
      const emailResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/email/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: user.email,
          subject: `Booking Confirmation - ${bookingId} | New10Labs`,
          html: emailHtml,
        }),
      });

      const emailResult = await emailResponse.json();
      
      if (emailResult.success) {
        console.log('✅ Confirmation email sent to:', user.email);
      } else {
        console.error('❌ Failed to send confirmation email:', emailResult);
      }
    } catch (emailError) {
      console.error('❌ Email sending error:', emailError);
      // Don't fail the booking if email fails
    }

    return NextResponse.json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error('Booking creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
