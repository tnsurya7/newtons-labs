# Home Visit Booking Feature

## Overview
Dedicated page for booking home sample collection with a comprehensive form and success confirmation.

## Page Location
`/home-visit` - Accessible from:
- Header "Home Visit" button
- Hero section "Book Home Visit" button
- Direct URL navigation

## Features

### Comprehensive Booking Form
The home visit page includes a detailed form with the following sections:

#### 1. Personal Information
- Full Name (required)
- Phone Number (required, validated for Indian format)
- Email Address (optional)

#### 2. Address Details
- Complete Address (required, textarea)
- Pincode (required, 6 digits)
- City (required)
- State (required)

#### 3. Appointment Details
- Preferred Date (required, date picker with min date = today)
- Preferred Time (required, time picker)
- Test Type (required, dropdown with options):
  - Blood Test
  - Urine Test
  - Health Package
  - Diabetes Screening
  - Thyroid Profile
  - Lipid Profile
  - Liver Function Test
  - Kidney Function Test
  - Complete Blood Count (CBC)
  - Other
- Special Instructions (optional, textarea)

### Validation
- Phone number: 10 digits starting with 6-9
- Pincode: Exactly 6 digits
- All required fields must be filled
- Date must be today or future date

### Success Screen
After successful booking, displays:
- ✅ Confirmation icon
- Booking ID
- Scheduled date and time
- Estimated arrival time
- Contact number
- Confirmation message
- Auto-redirect to home after 5 seconds
- Manual "Back to Home" button

### Design Features
- Gradient background matching site theme
- Responsive layout (mobile, tablet, desktop)
- Section headers with icons
- Trust badges at bottom
- Important information box
- Error handling with user-friendly messages
- Loading states during submission
- Smooth animations with Framer Motion

### Trust Elements
- Free Home Visit badge
- NABL Certified badge
- Same Day Reports badge
- Important information section with:
  - Phlebotomist arrival confirmation
  - Prescription requirement reminder
  - Fasting requirements communication
  - Report availability timeline

## API Integration

### Endpoint
`POST /api/booking/home-visit`

### Request Body
```json
{
  "name": "John Doe",
  "phone": "9876543210",
  "email": "john@example.com",
  "address": "123 Main Street, Landmark",
  "pincode": "600001",
  "city": "Chennai",
  "state": "Tamil Nadu",
  "date": "2024-02-25",
  "time": "10:00",
  "testType": "Blood Test",
  "specialInstructions": "Please call before arriving"
}
```

### Success Response
```json
{
  "success": true,
  "message": "Home visit booked successfully",
  "data": {
    "bookingId": "HV-20240225-001",
    "estimatedArrival": "Within 2 hours of scheduled time",
    "status": "confirmed"
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Booking failed. Please try again."
}
```

## User Flow

1. User clicks "Book Home Visit" from Header or Hero
2. Navigates to `/home-visit` page
3. Fills out comprehensive form with all details
4. Clicks "Confirm Booking" button
5. Form validates all inputs
6. API call is made to book the visit
7. Success screen shows booking confirmation
8. User is auto-redirected to home after 5 seconds
9. Or user can click "Back to Home" immediately

## Mobile Experience
- Fully responsive design
- Touch-friendly form inputs
- Optimized for small screens
- Easy navigation with back button
- Clear section separation

## Accessibility
- Proper form labels
- Required field indicators (*)
- Error messages for validation
- Clear visual hierarchy
- Keyboard navigation support
- Screen reader friendly

## Security
- Phone number validation
- Pincode validation
- Input sanitization
- API error handling
- Secure data transmission

## Future Enhancements
- [ ] Save address for logged-in users
- [ ] Multiple address management
- [ ] Preferred time slots based on availability
- [ ] Real-time phlebotomist tracking
- [ ] SMS/Email confirmation
- [ ] Calendar integration
- [ ] Rescheduling functionality
- [ ] Cancel booking option
- [ ] Payment integration
- [ ] Insurance details collection

## Files

### Page Component
- `app/home-visit/page.tsx` - Main home visit booking page

### Updated Components
- `components/Header.tsx` - Updated to navigate to home visit page
- `components/Hero.tsx` - Updated to navigate to home visit page

### API Route
- `app/api/booking/home-visit/route.ts` - Existing API endpoint

### Utilities
- `lib/auth/security.ts` - Phone and validation utilities

## Testing

### Test Scenarios
1. ✅ Fill all required fields and submit
2. ✅ Try submitting with invalid phone number
3. ✅ Try submitting with invalid pincode
4. ✅ Try submitting without required fields
5. ✅ Select past date (should be blocked)
6. ✅ View success screen after booking
7. ✅ Test auto-redirect after 5 seconds
8. ✅ Test manual back button
9. ✅ Test on mobile devices
10. ✅ Test with different test types

### Sample Test Data
```
Name: John Doe
Phone: 9876543210
Email: john@example.com
Address: 123 Main Street, Near City Hospital
Pincode: 600001
City: Chennai
State: Tamil Nadu
Date: [Today's date]
Time: 10:00
Test Type: Blood Test
Special Instructions: Please call 30 minutes before arrival
```

## Benefits

### For Users
- Convenient home sample collection
- Comprehensive form with all necessary details
- Clear confirmation and tracking
- No need to visit lab
- Flexible scheduling

### For Business
- Increased bookings
- Better customer data collection
- Improved scheduling
- Reduced phone inquiries
- Better service planning

## Support
For issues or questions about home visit booking:
- Check form validation messages
- Ensure all required fields are filled
- Verify phone number format (10 digits, starts with 6-9)
- Verify pincode format (6 digits)
- Contact support: 1800-123-4567

---

**Status**: ✅ COMPLETE AND FUNCTIONAL

**Last Updated**: February 25, 2026

**Version**: 1.0.0
