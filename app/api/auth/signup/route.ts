import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import {
  validateEmail,
  validatePhone,
  validatePassword,
  sanitizeInput,
} from '@/lib/auth/security';
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
    const { name, email, phone, password } = body;

    // Validate input
    if (!name || !email || !phone || !password) {
      return NextResponse.json(
        {
          success: false,
          message: 'All fields are required',
        },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPhone = sanitizeInput(phone);

    // Validate email
    if (!validateEmail(sanitizedEmail)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid email format',
        },
        { status: 400 }
      );
    }

    // Validate phone
    if (!validatePhone(sanitizedPhone)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid phone number. Must be a 10-digit Indian mobile number',
        },
        { status: 400 }
      );
    }

    // Validate password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        {
          success: false,
          message: 'Password does not meet requirements',
          errors: passwordValidation.errors,
        },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await queryOne(
      'SELECT email, phone FROM users WHERE email = $1 OR phone = $2 LIMIT 1',
      [sanitizedEmail, sanitizedPhone]
    );

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: 'User with this email or phone already exists',
        },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user in database
    const newUser = await queryOne<{
      id: string;
      name: string;
      email: string;
      phone: string;
      role: string;
      created_at: string;
    }>(
      `INSERT INTO users (name, email, phone, password_hash, role, status)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, name, email, phone, role, created_at`,
      [sanitizedName, sanitizedEmail, sanitizedPhone, passwordHash, 'user', 'active']
    );

    if (!newUser) {
      console.error('Failed to create user');
      return NextResponse.json(
        { success: false, message: 'Failed to create account' },
        { status: 500 }
      );
    }

    // Log activity
    await query(
      `INSERT INTO activity_logs (user_id, action, description)
       VALUES ($1, $2, $3)`,
      [newUser.id, 'user_signup', `New user registered: ${sanitizedEmail}`]
    );

    // Generate JWT token
    const token = Buffer.from(
      JSON.stringify({
        userId: newUser.id,
        email: newUser.email,
        exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
      })
    ).toString('base64');

    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
      data: {
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
          role: newUser.role,
          createdAt: newUser.created_at,
        },
        token,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred during signup',
      },
      { status: 500 }
    );
  }
}
