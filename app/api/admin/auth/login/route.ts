import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    // Check if tables exist by trying to query users table
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('role', 'admin')
      .eq('status', 'active')
      .single();

    // If table doesn't exist or user not found, use environment variable fallback
    if (error || !user) {
      console.log('Database query error or user not found:', error?.message);
      
      // Fallback to environment variables for initial setup
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@new10lab.com';
      const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
      
      if (email === adminEmail && password === adminPassword) {
        // Generate token
        const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');
        
        return NextResponse.json({
          success: true,
          token,
          admin: {
            id: 'temp-admin-id',
            email: adminEmail,
            name: 'Admin User',
            role: 'admin',
          },
        });
      }
      
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // User found in database - verify password
    // For now, simple password check (in production, use bcrypt)
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    
    if (password !== adminPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate token
    const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');

    return NextResponse.json({
      success: true,
      token,
      admin: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
