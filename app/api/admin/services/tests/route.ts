import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';

// GET - List all tests
export async function GET() {
  try {
    if (!supabaseAdmin) {
      console.log('supabaseAdmin is null - database not configured');
      return NextResponse.json(
        { error: 'Database not configured', tests: [] },
        { status: 200 }
      );
    }

    const { data: tests, error } = await supabaseAdmin
      .from('tests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching tests:', error);
      return NextResponse.json(
        { error: 'Failed to fetch tests', tests: [], details: error.message },
        { status: 200 }
      );
    }

    return NextResponse.json({ tests: tests || [] });
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', tests: [], details: error.message },
      { status: 200 }
    );
  }
}

// POST - Create new test
export async function POST(request: NextRequest) {
  try {
    if (!supabaseAdmin) {
      console.log('supabaseAdmin is null - database not configured');
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();
    console.log('Creating test with data:', body);

    // Generate ID
    const { data: existingTests, error: fetchError } = await supabaseAdmin
      .from('tests')
      .select('id')
      .order('id', { ascending: false })
      .limit(1);

    if (fetchError) {
      console.error('Error fetching existing tests:', fetchError);
    }

    const nextId = existingTests && existingTests.length > 0
      ? (parseInt(existingTests[0].id) + 1).toString()
      : '7';

    console.log('Generated ID:', nextId);

    const testData = {
      id: nextId,
      ...body,
    };

    const { data, error } = await supabaseAdmin
      .from('tests')
      .insert(testData)
      .select()
      .single();

    if (error) {
      console.error('Error creating test:', error);
      return NextResponse.json(
        { error: 'Failed to create test', details: error.message },
        { status: 500 }
      );
    }

    console.log('Test created successfully:', data);
    return NextResponse.json({ test: data });
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
