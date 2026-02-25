# Authentication System Documentation

## Overview
Newton's Lab includes a complete authentication system with login, signup, and logout functionality. The system uses JWT tokens for session management and includes comprehensive security features.

## Features

### Security Features
- Password hashing using SHA-256 (upgrade to bcrypt in production)
- Email validation with regex
- Phone validation for Indian mobile numbers (10 digits, starting with 6-9)
- Password strength validation:
  - Minimum 8 characters
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number
  - At least one special character (!@#$%^&*)
- Input sanitization to prevent XSS attacks
- JWT token-based authentication
- Persistent authentication state using Zustand + localStorage

### Pages

#### Login Page (`/login`)
- Email and password fields
- Show/hide password toggle
- Email validation
- Error handling with user-friendly messages
- "Forgot Password" link (UI only, functionality pending)
- Link to signup page
- Gradient design matching site theme
- Fully responsive

#### Signup Page (`/signup`)
- Full name, email, phone, password, and confirm password fields
- Real-time password strength indicator
- Show/hide password toggles for both password fields
- Comprehensive validation:
  - Email format validation
  - Phone number validation (Indian format)
  - Password strength requirements
  - Password confirmation match
- Error handling with specific error messages
- Link to login page
- Gradient design matching site theme
- Fully responsive

### API Routes

#### POST `/api/auth/login`
Authenticates a user and returns a JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "Password123!"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "1",
      "name": "Test User",
      "email": "test@example.com",
      "phone": "9876543210",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "base64_encoded_jwt_token"
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

#### POST `/api/auth/signup`
Creates a new user account and returns a JWT token.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "Password123!"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Account created successfully",
  "data": {
    "user": {
      "id": "2",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "9876543210",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "base64_encoded_jwt_token"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Password does not meet requirements",
  "errors": [
    "Password must be at least 8 characters",
    "Password must contain at least one uppercase letter"
  ]
}
```

**Error Response (409):**
```json
{
  "success": false,
  "message": "User with this email or phone already exists"
}
```

#### POST `/api/auth/logout`
Logs out the current user.

**Success Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### State Management

#### Auth Store (`store/auth.ts`)
Uses Zustand with localStorage persistence.

**State:**
```typescript
{
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}
```

**Actions:**
- `login(user, token)` - Sets user and token, marks as authenticated
- `logout()` - Clears user and token, marks as not authenticated
- `updateUser(userData)` - Updates user information

**Usage:**
```typescript
import { useAuthStore } from '@/store/auth';

// In component
const { user, isAuthenticated, login, logout } = useAuthStore();
```

### Security Utilities (`lib/auth/security.ts`)

#### Functions:
- `hashPassword(password: string): Promise<string>` - Hashes password using SHA-256
- `validateEmail(email: string): boolean` - Validates email format
- `validatePhone(phone: string): boolean` - Validates Indian phone number
- `validatePassword(password: string)` - Returns validation result with errors
- `generateOTP(): string` - Generates 6-digit OTP
- `sanitizeInput(input: string): string` - Removes dangerous characters

### UI Integration

#### Header Component
- Shows user avatar and name when logged in
- Dropdown menu with user info and logout button
- Shows "Login" button when not authenticated
- Clicking user avatar opens dropdown with:
  - User name, email, and phone
  - Logout button

#### Mobile Navigation
- Profile icon navigates to login page when not authenticated
- Navigates to profile page when authenticated (pending implementation)

## Test Credentials

For testing, use these credentials:
- **Email:** test@example.com
- **Password:** Password123!

## Production Considerations

### Security Improvements Needed:
1. Replace SHA-256 with bcrypt for password hashing
2. Implement proper JWT library (e.g., jsonwebtoken)
3. Add JWT token expiration and refresh tokens
4. Implement token blacklist for logout
5. Add rate limiting to prevent brute force attacks
6. Implement CSRF protection
7. Add email verification flow
8. Add password reset functionality
9. Use HTTPS in production
10. Store tokens in httpOnly cookies instead of localStorage

### Database Integration:
Currently using mock in-memory database. In production:
1. Connect to real database (PostgreSQL, MongoDB, etc.)
2. Store hashed passwords securely
3. Implement proper user management
4. Add user roles and permissions
5. Implement audit logging

### Additional Features to Implement:
- Email verification after signup
- Password reset via email
- Two-factor authentication (2FA)
- Social login (Google, Facebook)
- User profile page with edit functionality
- Order history and report viewing
- Appointment management
- Health records access

## File Structure

```
newtons-lab/
├── app/
│   ├── login/
│   │   └── page.tsx              # Login page
│   ├── signup/
│   │   └── page.tsx              # Signup page
│   └── api/
│       └── auth/
│           ├── login/
│           │   └── route.ts      # Login API
│           ├── signup/
│           │   └── route.ts      # Signup API
│           └── logout/
│               └── route.ts      # Logout API
├── store/
│   └── auth.ts                   # Auth state management
├── lib/
│   └── auth/
│       └── security.ts           # Security utilities
└── components/
    ├── Header.tsx                # Updated with auth
    └── MobileNav.tsx             # Updated with auth
```

## Usage Examples

### Login Flow
```typescript
// In login page
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  
  const result = await response.json();
  
  if (result.success) {
    login(result.data.user, result.data.token);
    router.push('/');
  }
};
```

### Logout Flow
```typescript
// In header component
const handleLogout = async () => {
  await fetch('/api/auth/logout', { method: 'POST' });
  logout();
  router.push('/');
};
```

### Protected Routes (To Implement)
```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  
  if (!token && request.nextUrl.pathname.startsWith('/profile')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
```

## Support
For issues or questions about authentication, please contact the development team.
