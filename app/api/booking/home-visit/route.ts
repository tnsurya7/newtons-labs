import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, address, date, time } = body;

    // Validate input
    if (!name || !phone || !address) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate phone number (Indian format)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone.replace(/\D/g, '').slice(-10))) {
      return NextResponse.json(
        { success: false, message: 'Invalid phone number' },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Save booking to database
    // 2. Send SMS confirmation
    // 3. Send email confirmation
    // 4. Notify collection team
    // 5. Create calendar event

    const bookingId = `HV${Date.now()}`;
    
    console.log('Home visit booking:', { bookingId, name, phone, address, date, time });

    // Simulate sending SMS
    console.log(`SMS sent to ${phone}: Your home visit is scheduled for ${date || 'soon'}`);

    return NextResponse.json({
      success: true,
      message: 'Home visit booked successfully',
      data: {
        bookingId,
        name,
        phone,
        address,
        date: date || 'Will be confirmed',
        time: time || 'Will be confirmed',
        status: 'confirmed',
        estimatedArrival: '30-60 minutes',
        bookedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Home visit booking error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to book home visit' },
      { status: 500 }
    );
  }
}
