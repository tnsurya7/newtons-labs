import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';

// GET - List all packages
export async function GET() {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Database not configured', packages: [] },
        { status: 200 }
      );
    }

    const { data: packages, error } = await supabaseAdmin
      .from('packages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching packages:', error);
      return NextResponse.json(
        { error: 'Failed to fetch packages', packages: [] },
        { status: 200 }
      );
    }

    return NextResponse.json({ packages: packages || [] });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', packages: [] },
      { status: 200 }
    );
  }
}

// POST - Create new package
export async function POST(request: NextRequest) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();

    // Generate ID
    const { data: existingPackages } = await supabaseAdmin
      .from('packages')
      .select('id')
      .order('id', { ascending: false })
      .limit(1);

    let nextId = 'p5';
    if (existingPackages && existingPackages.length > 0) {
      const lastId = existingPackages[0].id;
      const numPart = parseInt(lastId.replace('p', ''));
      nextId = `p${numPart + 1}`;
    }

    const packageData = {
      id: nextId,
      ...body,
    };

    const { data, error } = await supabaseAdmin
      .from('packages')
      .insert(packageData)
      .select()
      .single();

    if (error) {
      console.error('Error creating package:', error);
      return NextResponse.json(
        { error: 'Failed to create package', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ package: data });
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
