import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';
import fs from 'fs';
import path from 'path';

// Fallback to JSON file when Supabase is unavailable
const getTestsFromFile = () => {
  try {
    const filePath = path.join(process.cwd(), 'lib/data/tests.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContent);
    return data.tests || [];
  } catch (error) {
    console.error('Error reading tests.json:', error);
    return [];
  }
};

const saveTestsToFile = (tests: any[]) => {
  try {
    const filePath = path.join(process.cwd(), 'lib/data/tests.json');
    const data = { tests };
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing tests.json:', error);
    return false;
  }
};

// GET - List all tests
export async function GET() {
  try {
    if (!supabaseAdmin) {
      console.log('supabaseAdmin is null - using JSON fallback');
      const tests = getTestsFromFile();
      return NextResponse.json({ tests, source: 'json' });
    }

    try {
      const { data: tests, error } = await supabaseAdmin
        .from('tests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error, falling back to JSON:', error);
        const fallbackTests = getTestsFromFile();
        return NextResponse.json({ tests: fallbackTests, source: 'json-fallback' });
      }

      return NextResponse.json({ tests: tests || [], source: 'supabase' });
    } catch (dbError: any) {
      console.error('Database connection failed, using JSON fallback:', dbError.message);
      const fallbackTests = getTestsFromFile();
      return NextResponse.json({ tests: fallbackTests, source: 'json-fallback' });
    }
  } catch (error: any) {
    console.error('Error:', error);
    const fallbackTests = getTestsFromFile();
    return NextResponse.json({ tests: fallbackTests, source: 'json-fallback' });
  }
}

// POST - Create new test
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Creating test with data:', body);

    // Try Supabase first, fallback to JSON if it fails
    if (!supabaseAdmin) {
      console.log('Using JSON file storage (Supabase not configured)');
      const tests = getTestsFromFile();
      const nextId = tests.length > 0 
        ? (Math.max(...tests.map((t: any) => parseInt(t.id))) + 1).toString()
        : '7';
      
      const testData = {
        id: nextId,
        ...body,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      tests.push(testData);
      saveTestsToFile(tests);
      
      return NextResponse.json({ 
        test: testData, 
        source: 'json',
        message: 'Test saved to JSON file (Supabase unavailable)'
      });
    }

    try {
      // Try Supabase
      const { data: existingTests, error: fetchError } = await supabaseAdmin
        .from('tests')
        .select('id')
        .order('id', { ascending: false })
        .limit(1);

      if (fetchError) throw fetchError;

      const nextId = existingTests && existingTests.length > 0
        ? (parseInt(existingTests[0].id) + 1).toString()
        : '7';

      const testData = {
        id: nextId,
        ...body,
      };

      const { data, error } = await supabaseAdmin
        .from('tests')
        .insert(testData)
        .select()
        .single();

      if (error) throw error;

      console.log('Test created in Supabase successfully');
      return NextResponse.json({ test: data, source: 'supabase' });
      
    } catch (dbError: any) {
      console.error('Supabase failed, using JSON fallback:', dbError.message);
      
      // Fallback to JSON
      const tests = getTestsFromFile();
      const nextId = tests.length > 0 
        ? (Math.max(...tests.map((t: any) => parseInt(t.id))) + 1).toString()
        : '7';
      
      const testData = {
        id: nextId,
        ...body,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      tests.push(testData);
      const saved = saveTestsToFile(tests);
      
      if (saved) {
        return NextResponse.json({ 
          test: testData, 
          source: 'json-fallback',
          message: 'Test saved to JSON file (Supabase connection failed)'
        });
      } else {
        return NextResponse.json(
          { error: 'Failed to save test to both Supabase and JSON file' },
          { status: 500 }
        );
      }
    }
  } catch (error: any) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
