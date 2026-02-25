import { NextRequest, NextResponse } from 'next/server';
import {
  validateEmail,
  validatePhone,
  validatePassword,
  hashPassword,
  sanitizeInput,
} from '@/lib/auth/security';

// Mock user database (in production, use a real database)
const mockUsers: any[] = [];

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
    const existingUser = mockUsers.find(
      (u) => u.email === sanitizedEmail || u.phone === sanitizedPhone
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
    const hashedPassword = await hashPassword(password);

    // Create new user
    const newUser = {
      id: (mockUsers.length + 1).toString(),
      name: sanitizedName,
      email: sanitizedEmail,
      phone: sanitizedPhone,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    };

    mockUsers.push(newUser);

    // Generate JWT token (in production, use proper JWT library)
    const token = Buffer.from(
      JSON.stringify({
        userId: newUser.id,
        email: newUser.email,
        exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
      })
    ).toString('base64');

    // Return user data without password
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
      data: {
        user: userWithoutPassword,
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
