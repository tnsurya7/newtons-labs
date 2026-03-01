import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { sendBothBookingEmails } from '@/lib/email/sender';

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

    // Check if Supabase is configured
    if (!supabase) {
      console.warn('Supabase not configured. Returning mock booking.');
      const mockBookingId = `BK-MOCK-${Date.now()}`;
      return NextResponse.json({
        success: true,
        booking: {
          id: mockBookingId,
          booking_id: mockBookingId,
          total_amount: items.reduce((sum: number, item: any) => sum + item.price, 0),
        },
        message: 'Database not configured. This is a mock booking for testing.',
      });
    }

    // Calculate totals
    const subtotal = items.reduce((sum: number, item: any) => sum + item.price, 0);
    const discountAmount = items.reduce((sum: number, item: any) => {
      const discount = item.originalPrice ? item.originalPrice - item.price : 0;
      return sum + discount;
    }, 0);
    const taxAmount = 0; // No tax for now
    const totalAmount = subtotal;

    const bookingId = generateBookingId();

    // Create booking in database
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .insert({
        booking_id: bookingId,
        user_id: user.id || null,
        user_name: user.name,
        user_email: user.email,
        user_phone: phone || user.phone,
        user_address: address,
        subtotal,
        discount_amount: discountAmount,
        tax_amount: taxAmount,
        total_amount: totalAmount,
        status: 'pending',
        payment_status: 'paid',
        payment_method: 'online',
      })
      .select()
      .single();

    if (bookingError) {
      console.error('Error creating booking:', bookingError);
      return NextResponse.json(
        { error: 'Failed to create booking' },
        { status: 500 }
      );
    }

    // Create booking items
    const bookingItems = items.map((item: any) => ({
      booking_id: booking.id,
      service_type: item.type,
      service_id: item.id,
      service_name: item.name,
      quantity: 1,
      price: item.price,
      original_price: item.originalPrice || item.price,
      discount: item.discount || 0,
    }));

    const { error: itemsError } = await supabase
      .from('booking_items')
      .insert(bookingItems);

    if (itemsError) {
      console.error('Error creating booking items:', itemsError);
      // Continue anyway, booking is created
    }

    // Fetch complete booking with items for email
    const { data: completeBooking } = await supabase
      .from('bookings')
      .select(`
        *,
        items:booking_items(*)
      `)
      .eq('id', booking.id)
      .single();

    // Send emails (don't wait for completion)
    if (completeBooking) {
      sendBothBookingEmails(completeBooking as any).catch(error => {
        console.error('Error sending emails:', error);
      });
    }

    // Log activity
    await supabase.from('activity_logs').insert({
      user_id: user.id || null,
      action: 'booking_created',
      description: `Booking ${bookingId} created`,
      metadata: { booking_id: bookingId, total_amount: totalAmount },
    });

    return NextResponse.json({
      success: true,
      booking: {
        id: booking.id,
        booking_id: bookingId,
        total_amount: totalAmount,
      },
    });
  } catch (error) {
    console.error('Booking creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
