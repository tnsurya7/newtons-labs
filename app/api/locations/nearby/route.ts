import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const pincode = searchParams.get('pincode');

    if (!pincode) {
      return NextResponse.json(
        { success: false, message: 'Pincode is required' },
        { status: 400 }
      );
    }

    // Validate pincode (Indian format)
    if (!/^\d{6}$/.test(pincode)) {
      return NextResponse.json(
        { success: false, message: 'Invalid pincode format' },
        { status: 400 }
      );
    }

    console.log('Finding locations near:', pincode);

    // Mock data - in production, query from database
    const locations = [
      {
        id: 'loc1',
        name: 'Newton Labs - Main Branch',
        address: '123 MG Road, Chennai',
        pincode: pincode,
        phone: '1800-123-4567',
        distance: '0.5 km',
        timings: '7:00 AM - 9:00 PM',
        services: ['Blood Tests', 'Radiology', 'Home Collection'],
      },
      {
        id: 'loc2',
        name: 'Newton Labs - Anna Nagar',
        address: '456 Anna Nagar, Chennai',
        pincode: pincode,
        phone: '1800-123-4568',
        distance: '2.3 km',
        timings: '8:00 AM - 8:00 PM',
        services: ['Blood Tests', 'Home Collection'],
      },
      {
        id: 'loc3',
        name: 'Newton Labs - T Nagar',
        address: '789 T Nagar, Chennai',
        pincode: pincode,
        phone: '1800-123-4569',
        distance: '3.1 km',
        timings: '7:00 AM - 10:00 PM',
        services: ['Blood Tests', 'Radiology', 'X-Ray', 'Home Collection'],
      },
    ];

    return NextResponse.json({
      success: true,
      message: 'Locations found',
      data: {
        pincode,
        count: locations.length,
        locations,
      },
    });
  } catch (error) {
    console.error('Location search error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to find locations' },
      { status: 500 }
    );
  }
}
