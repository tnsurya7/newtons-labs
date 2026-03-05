import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import {
  validateEmail,
  validatePhone,
  validatePassword,
  sanitizeInput,
} from '@/lib/auth/security';
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
    const existingUser = await sql`
      SELECT email, phone FROM users 
      WHERE email = ${sanitizedEmail} OR phone = ${sanitizedPhone}
      LIMIT 1
    `;

    if (existingUser && existingUser.length > 0) {
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
    const newUser = await sql`
      INSERT INTO users (name, email, phone, password_hash, role, status)
      VALUES (${sanitizedName}, ${sanitizedEmail}, ${sanitizedPhone}, ${passwordHash}, 'user', 'active')
      RETURNING id, name, email, phone, role, created_at
    `;

    if (!newUser || newUser.length === 0) {
      console.error('Failed to create user');
      return NextResponse.json(
        { success: false, message: 'Failed to create account' },
        { status: 500 }
      );
    }

    // Log activity
    await sql`
      INSERT INTO activity_logs (user_id, action, description)
      VALUES (${newUser[0].id}, 'user_signup', ${`New user registered: ${sanitizedEmail}`})
    `;

    // Generate JWT token
    const token = Buffer.from(
      JSON.stringify({
        userId: newUser[0].id,
        email: newUser[0].email,
        exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
      })
    ).toString('base64');

    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
      data: {
        user: {
          id: newUser[0].id,
          name: newUser[0].name,
          email: newUser[0].email,
          phone: newUser[0].phone,
          role: newUser[0].role,
          createdAt: newUser[0].created_at,
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
