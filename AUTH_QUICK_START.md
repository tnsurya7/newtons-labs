# Authentication Quick Start Guide

## Test the Authentication System

### 1. Test Login
1. Navigate to `http://localhost:3000/signup`
2. Create a new account with:
   - Full Name: Your name
   - Email: Your email
   - Phone: 10-digit number (e.g., 9876543210)
   - Password: Must meet requirements (e.g., `SecurePass123!`)
3. After signup, you'll be automatically logged in
4. Check the header - you should see your profile avatar with name

### 2. Test Login with Existing Account
1. Navigate to `http://localhost:3000/login`
2. Use the credentials you created during signup
3. Click "Login"
4. You'll be redirected to home page
5. Check the header - you should see your profile avatar
1. Navigate to `http://localhost:3000/signup`
2. Fill in the form:
   - Full Name: Your name
   - Email: A valid email
   - Phone: 10-digit number starting with 6-9 (e.g., 9876543210)
   - Password: Must meet requirements (shown in real-time)
   - Confirm Password: Same as password
3. Click "Sign Up"
4. You'll be redirected to home page
5. Check the header - you should see your profile

### 3. Test Logout
1. Click on your profile avatar in the header
2. A dropdown will appear with your details
3. Click "Logout"
4. You'll be logged out and the header will show "Login" button

## Password Requirements
Your password must have:
- ✅ At least 8 characters
- ✅ At least one uppercase letter (A-Z)
- ✅ At least one lowercase letter (a-z)
- ✅ At least one number (0-9)
- ✅ At least one special character (!@#$%^&*)

Example valid passwords:
- `Password123!`
- `MySecure@Pass1`
- `Test#1234Abc`

## Phone Number Format
- Must be exactly 10 digits
- Must start with 6, 7, 8, or 9
- Examples: `9876543210`, `8765432109`, `7654321098`

## Features

### Login Page (`/login`)
- Email and password authentication
- Show/hide password toggle
- "Forgot Password" link (UI only)
- Link to signup page
- Error messages for invalid credentials

### Signup Page (`/signup`)
- Full registration form
- Real-time password strength indicator
- Comprehensive validation
- Automatic login after signup
- Link to login page

### Header Integration
- Shows user avatar when logged in
- Displays first name next to avatar
- Dropdown menu with:
  - Full name
  - Email
  - Phone number
  - Logout button
- Shows "Login" button when not authenticated

### Mobile Navigation
- Profile icon navigates to login when not authenticated
- Will navigate to profile page when authenticated (pending)

## API Endpoints

### POST `/api/auth/login`
```bash
# First create an account via signup, then use those credentials
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"your@email.com","password":"YourPassword123!"}'
```

### POST `/api/auth/signup`
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name":"John Doe",
    "email":"john@example.com",
    "phone":"9876543210",
    "password":"Password123!"
  }'
```

### POST `/api/auth/logout`
```bash
curl -X POST http://localhost:3000/api/auth/logout
```

## State Management
Authentication state is persisted in localStorage using Zustand:
- User data (name, email, phone)
- JWT token
- Authentication status

State persists across page refreshes and browser sessions.

## Security Features
- ✅ Password hashing (SHA-256)
- ✅ Email validation
- ✅ Phone validation (Indian format)
- ✅ Password strength validation
- ✅ Input sanitization
- ✅ JWT token authentication
- ✅ Persistent sessions

## Next Steps for Production
1. Replace SHA-256 with bcrypt for password hashing
2. Implement proper JWT library
3. Add email verification
4. Add password reset functionality
5. Implement refresh tokens
6. Add rate limiting
7. Connect to real database
8. Add CSRF protection
9. Use httpOnly cookies for tokens
10. Implement 2FA (optional)

## Troubleshooting

### "Invalid email or password"
- Check that you're using the correct test credentials
- Ensure password meets all requirements
- Verify email format is correct

### "User already exists"
- Try a different email address
- Or use the login page instead

### Password strength errors
- Check the real-time feedback on signup page
- Ensure all 5 requirements are met
- Use the examples above as reference

### Phone validation errors
- Must be exactly 10 digits
- Must start with 6, 7, 8, or 9
- Remove any spaces or special characters

## Files Modified/Created

### New Files:
- `app/api/auth/login/route.ts` - Login API
- `app/api/auth/signup/route.ts` - Signup API
- `app/api/auth/logout/route.ts` - Logout API
- `app/login/page.tsx` - Login page
- `app/signup/page.tsx` - Signup page
- `store/auth.ts` - Auth state management
- `lib/auth/security.ts` - Security utilities
- `AUTHENTICATION.md` - Full documentation
- `AUTH_QUICK_START.md` - This file

### Updated Files:
- `components/Header.tsx` - Added auth integration
- `components/MobileNav.tsx` - Added auth integration

## Support
For detailed documentation, see `AUTHENTICATION.md`
