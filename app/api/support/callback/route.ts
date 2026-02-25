import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone, name } = body;

    if (!phone) {
      return NextResponse.json(
        { success: false, message: 'Phone number is required' },
        { status: 400 }
      );
    }

    const ticketId = `CB${Date.now()}`;
    
    console.log('Callback request:', { ticketId, phone, name });

    // Here you would:
    // 1. Add to callback queue
    // 2. Notify support team
    // 3. Send SMS confirmation

    return NextResponse.json({
      success: true,
      message: 'Callback request received',
      data: {
        ticketId,
        phone,
        name: name || 'Customer',
        status: 'pending',
        estimatedCallTime: '15-30 minutes',
        queuePosition: Math.floor(Math.random() * 5) + 1,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Callback request error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create callback request' },
      { status: 500 }
    );
  }
}
