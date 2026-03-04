import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import {
  validateEmail,
  validatePhone,
  validatePassword,
  sanitizeInput,
} from '@/lib/auth/security';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
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
    const { data: existingUser } = await supabase
      .from('users')
      .select('email, phone')
      .or(`email.eq.${sanitizedEmail},phone.eq.${sanitizedPhone}`)
      .single();

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
    const { data: newUser, error } = await supabase
      .from('users')
      .insert([
        {
          name: sanitizedName,
          email: sanitizedEmail,
          phone: sanitizedPhone,
          password_hash: passwordHash,
          role: 'user',
          status: 'active',
        },
      ])
      .select('id, name, email, phone, role, created_at')
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to create account' },
        { status: 500 }
      );
    }

    // Log activity
    await supabase.from('activity_logs').insert([
      {
        user_id: newUser.id,
        action: 'user_signup',
        description: `New user registered: ${sanitizedEmail}`,
      },
    ]);

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
