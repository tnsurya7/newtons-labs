import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';

// PUT - Update test
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { id } = params;

    console.log('Updating test:', id, body);

    const { data, error } = await supabaseAdmin
      .from('tests')
      .update(body)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating test:', error);
      return NextResponse.json(
        { error: 'Failed to update test', details: error.message },
        { status: 500 }
      );
    }

    console.log('Test updated successfully:', data);
    return NextResponse.json({ test: data });
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete test
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    const { id } = params;

    console.log('Deleting test:', id);

    const { error } = await supabaseAdmin
      .from('tests')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting test:', error);
      return NextResponse.json(
        { error: 'Failed to delete test', details: error.message },
        { status: 500 }
      );
    }

    console.log('Test deleted successfully');
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
