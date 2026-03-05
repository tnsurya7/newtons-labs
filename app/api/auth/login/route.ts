import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { validateEmail } from '@/lib/auth/security';
import { sql, isDatabaseConfigured } from '@/lib/db/neon';

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
    const user = await sql`
      SELECT id, name, email, phone, password_hash, role, status, created_at 
      FROM users 
      WHERE email = ${email.toLowerCase()}
    `;

    if (!user || user.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid email or password',
        },
        { status: 401 }
      );
    }

    // Check if user is blocked
    if (user[0].status === 'blocked') {
      return NextResponse.json(
        {
          success: false,
          message: 'Your account has been blocked. Please contact support.',
        },
        { status: 403 }
      );
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user[0].password_hash);

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
    await sql`
      INSERT INTO activity_logs (user_id, action, description) 
      VALUES (${user[0].id}, 'user_login', ${`User logged in: ${email}`})
    `;

    // Generate JWT token
    const token = Buffer.from(
      JSON.stringify({
        userId: user[0].id,
        email: user[0].email,
        role: user[0].role,
        exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
      })
    ).toString('base64');

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user[0].id,
          name: user[0].name,
          email: user[0].email,
          phone: user[0].phone,
          role: user[0].role,
          createdAt: user[0].created_at,
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
