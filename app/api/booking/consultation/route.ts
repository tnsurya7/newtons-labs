import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, date, time, concern } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, message: 'Name and phone are required' },
        { status: 400 }
      );
    }

    const consultationId = `CONS${Date.now()}`;
    
    console.log('Doctor consultation booking:', { consultationId, name, phone, concern });

    return NextResponse.json({
      success: true,
      message: 'Consultation booked successfully',
      data: {
        consultationId,
        name,
        phone,
        email,
        date: date || 'Will be scheduled',
        time: time || 'Will be scheduled',
        concern: concern || 'General consultation',
        doctor: 'Dr. Assigned Soon',
        meetingLink: 'Will be sent via SMS/Email',
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
