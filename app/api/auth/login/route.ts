import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { validateEmail } from '@/lib/auth/security';
import { query, queryOne, isDatabaseConfigured } from '@/lib/db/neon';

export async function POST(request: NextRequest) {
  try {
    // Check if database is configured
    if (!isDatabaseConfigured()) {
      return NextResponse.json(
        {
          success: false,
          message: 'Database not configured. Please contact administrator.',
        },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email and password are required',
        },
        { status: 400 }
      );
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid email format',
        },
        { status: 400 }
      );
    }

    // Find user in database
    const user = await queryOne<{
      id: string;
      name: string;
      email: string;
      phone: string;
      password_hash: string;
      role: string;
      status: string;
      created_at: string;
    }>(
      'SELECT id, name, email, phone, password_hash, role, status, created_at FROM users WHERE email = $1',
      [email.toLowerCase()]
    );

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid email or password',
        },
        { status: 401 }
      );
    }

    // Check if user is blocked
    if (user.status === 'blocked') {
      return NextResponse.json(
        {
          success: false,
          message: 'Your account has been blocked. Please contact support.',
        },
        { status: 403 }
      );
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid email or password',
        },
        { status: 401 }
      );
    }

    // Log activity
    await query(
      'INSERT INTO activity_logs (user_id, action, description) VALUES ($1, $2, $3)',
      [user.id, 'user_login', `User logged in: ${email}`]
    );

    // Generate JWT token
    const token = Buffer.from(
      JSON.stringify({
        userId: user.id,
        email: user.email,
        role: user.role,
        exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
      })
    ).toString('base64');

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          createdAt: user.created_at,
        },
        token,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred during login',
      },
      { status: 500 }
    );
  }
}
