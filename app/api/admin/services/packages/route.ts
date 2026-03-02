import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';
import fs from 'fs';
import path from 'path';

// Fallback to JSON file when Supabase is unavailable
const getPackagesFromFile = () => {
  try {
    const filePath = path.join(process.cwd(), 'lib/data/packages.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContent);
    return data.packages || [];
  } catch (error) {
    console.error('Error reading packages.json:', error);
    return [];
  }
};

const savePackagesToFile = (packages: any[]) => {
  try {
    const filePath = path.join(process.cwd(), 'lib/data/packages.json');
    const data = { packages };
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing packages.json:', error);
    return false;
  }
};

// GET - List all packages
export async function GET() {
  try {
    if (!supabaseAdmin) {
      console.log('supabaseAdmin is null - using JSON fallback');
      const packages = getPackagesFromFile();
      return NextResponse.json({ packages, source: 'json' });
    }

    try {
      const { data: packages, error } = await supabaseAdmin
        .from('packages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error, falling back to JSON:', error);
        const fallbackPackages = getPackagesFromFile();
        return NextResponse.json({ packages: fallbackPackages, source: 'json-fallback' });
      }

      return NextResponse.json({ packages: packages || [], source: 'supabase' });
    } catch (dbError: any) {
      console.error('Database connection failed, using JSON fallback:', dbError.message);
      const fallbackPackages = getPackagesFromFile();
      return NextResponse.json({ packages: fallbackPackages, source: 'json-fallback' });
    }
  } catch (error: any) {
    console.error('Error:', error);
    const fallbackPackages = getPackagesFromFile();
    return NextResponse.json({ packages: fallbackPackages, source: 'json-fallback' });
  }
}

// POST - Create new package
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Creating package with data:', body);

    // Try Supabase first, fallback to JSON if it fails
    if (!supabaseAdmin) {
      console.log('Using JSON file storage (Supabase not configured)');
      const packages = getPackagesFromFile();
      const lastId = packages.length > 0 
        ? packages[packages.length - 1].id 
        : 'p4';
      const numPart = parseInt(lastId.replace('p', ''));
      const nextId = `p${numPart + 1}`;
      
      const packageData = {
        id: nextId,
        ...body,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      packages.push(packageData);
      savePackagesToFile(packages);
      
      return NextResponse.json({ 
        package: packageData, 
        source: 'json',
        message: 'Package saved to JSON file (Supabase unavailable)'
      });
    }

    try {
      // Try Supabase
      const { data: existingPackages, error: fetchError } = await supabaseAdmin
        .from('packages')
        .select('id')
        .order('id', { ascending: false })
        .limit(1);

      if (fetchError) throw fetchError;

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

      if (error) throw error;

      console.log('Package created in Supabase successfully');
      return NextResponse.json({ package: data, source: 'supabase' });
      
    } catch (dbError: any) {
      console.error('Supabase failed, using JSON fallback:', dbError.message);
      
      // Fallback to JSON
      const packages = getPackagesFromFile();
      const lastId = packages.length > 0 
        ? packages[packages.length - 1].id 
        : 'p4';
      const numPart = parseInt(lastId.replace('p', ''));
      const nextId = `p${numPart + 1}`;
      
      const packageData = {
        id: nextId,
        ...body,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      packages.push(packageData);
      const saved = savePackagesToFile(packages);
      
      if (saved) {
        return NextResponse.json({ 
          package: packageData, 
          source: 'json-fallback',
          message: 'Package saved to JSON file (Supabase connection failed)'
        });
      } else {
        return NextResponse.json(
          { error: 'Failed to save package to both Supabase and JSON file' },
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
