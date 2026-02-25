# Newton's Lab - API Documentation

## Overview

All API endpoints are now functional and connected to the frontend. Each button action makes a real API call to the backend.

---

## Base URL

```
Development: http://localhost:3000/api
Production: https://yourdomain.com/api
```

---

## API Endpoints

### 1. Cart Management

#### Add Item to Cart
```
POST /api/cart/add
```

**Request Body:**
```json
{
  "id": "1",
  "name": "Complete Blood Count",
  "price": 299,
  "type": "test"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Item added to cart successfully",
  "data": {
    "id": "1",
    "name": "Complete Blood Count",
    "price": 299,
    "type": "test",
    "addedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### 2. Booking APIs

#### Book Home Visit
```
POST /api/booking/home-visit
```

**Request Body:**
```json
{
  "name": "John Doe",
  "phone": "9876543210",
  "address": "123 Main Street, Chennai",
  "date": "2024-01-20",
  "time": "10:00"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Home visit booked successfully",
  "data": {
    "bookingId": "HV1705312200000",
    "name": "John Doe",
    "phone": "9876543210",
    "address": "123 Main Street, Chennai",
    "date": "2024-01-20",
    "time": "10:00",
    "status": "confirmed",
    "estimatedArrival": "30-60 minutes",
    "bookedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### Book Doctor Consultation
```
POST /api/booking/consultation
```

**Request Body:**
```json
{
  "name": "John Doe",
  "phone": "9876543210",
  "email": "john@example.com",
  "date": "2024-01-20",
  "time": "15:00",
  "concern": "Diabetes consultation"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Consultation booked successfully",
  "data": {
    "consultationId": "CONS1705312200000",
    "name": "John Doe",
    "phone": "9876543210",
    "email": "john@example.com",
    "date": "2024-01-20",
    "time": "15:00",
    "concern": "Diabetes consultation",
    "doctor": "Dr. Assigned Soon",
    "meetingLink": "Will be sent via SMS/Email",
    "status": "confirmed",
    "bookedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### 3. Support APIs

#### Request Callback
```
POST /api/support/callback
```

**Request Body:**
```json
{
  "phone": "9876543210",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Callback request received",
  "data": {
    "ticketId": "CB1705312200000",
    "phone": "9876543210",
    "name": "John Doe",
    "status": "pending",
    "estimatedCallTime": "15-30 minutes",
    "queuePosition": 3,
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### 4. Prescription Upload

#### Upload Prescription
```
POST /api/prescription/upload
```

**Request:** Multipart form data
- Field name: `prescription`
- Accepted types: JPG, PNG, PDF
- Max size: 5MB

**Response:**
```json
{
  "success": true,
  "message": "Prescription uploaded successfully",
  "data": {
    "prescriptionId": "RX1705312200000",
    "fileName": "prescription.pdf",
    "fileSize": 1024000,
    "uploadedAt": "2024-01-15T10:30:00.000Z",
    "status": "processing",
    "estimatedProcessingTime": "10-15 minutes",
    "message": "Our team will review and contact you shortly"
  }
}
```

---

### 5. Location APIs

#### Find Nearby Labs
```
GET /api/locations/nearby?pincode=600000
```

**Response:**
```json
{
  "success": true,
  "message": "Locations found",
  "data": {
    "pincode": "600000",
    "count": 3,
    "locations": [
      {
        "id": "loc1",
        "name": "Newton's Lab - Main Branch",
        "address": "123 MG Road, Chennai",
        "pincode": "600000",
        "phone": "1800-123-4567",
        "distance": "0.5 km",
        "timings": "7:00 AM - 9:00 PM",
        "services": ["Blood Tests", "Radiology", "Home Collection"]
      }
    ]
  }
}
```

---

## Frontend Integration

### All Buttons Now Connected to APIs:

1. **Header - Support Button**: Calls `/api/support/callback`
2. **Header - Home Visit Button**: Opens modal → Calls `/api/booking/home-visit`
3. **Hero - Book Home Visit**: Opens modal → Calls `/api/booking/home-visit`
4. **Hero - Upload Prescription**: File picker → Calls `/api/prescription/upload`
5. **Test Cards - Book Now**: Calls `/api/cart/add`
6. **Package Cards - Book Package**: Calls `/api/cart/add`
7. **Doctor Consultation Button**: Prompts → Calls `/api/booking/consultation`
8. **Mobile Nav - Locations**: Prompts → Calls `/api/locations/nearby`

---

## Error Handling

All APIs return consistent error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

**HTTP Status Codes:**
- `200`: Success
- `400`: Bad Request (validation error)
- `500`: Internal Server Error

---

## Next Steps for Production

### 1. Database Integration
Replace console.log with actual database operations:
- MongoDB / PostgreSQL / MySQL
- Prisma ORM recommended

### 2. Authentication
Add user authentication:
- JWT tokens
- Session management
- Protected routes

### 3. Payment Gateway
Integrate payment processing:
- Razorpay / Stripe
- Order management
- Invoice generation

### 4. Notifications
Implement real notifications:
- SMS via Twilio / MSG91
- Email via SendGrid / AWS SES
- Push notifications

### 5. File Storage
Upload files to cloud:
- AWS S3
- Cloudinary
- Google Cloud Storage

### 6. Analytics
Track user actions:
- Google Analytics
- Mixpanel
- Custom analytics

---

## Testing APIs

### Using cURL:

```bash
# Add to cart
curl -X POST http://localhost:3000/api/cart/add \
  -H "Content-Type: application/json" \
  -d '{"id":"1","name":"CBC","price":299,"type":"test"}'

# Book home visit
curl -X POST http://localhost:3000/api/booking/home-visit \
  -H "Content-Type: application/json" \
  -d '{"name":"John","phone":"9876543210","address":"Chennai"}'

# Find locations
curl http://localhost:3000/api/locations/nearby?pincode=600000
```

### Using Postman:
Import the endpoints and test with the request/response examples above.

---

## API Client Usage

The frontend uses the API client from `lib/api/client.ts`:

```typescript
import { bookingApi, cartApi, supportApi } from '@/lib/api/client';

// Book home visit
const result = await bookingApi.bookHomeVisit({
  name: 'John Doe',
  phone: '9876543210',
  address: 'Chennai',
  date: '2024-01-20'
});

// Add to cart
await cartApi.addItem({
  id: '1',
  name: 'CBC Test',
  price: 299,
  type: 'test'
});

// Request callback
await supportApi.callback('9876543210');
```

---

## Logs

All API calls are logged to console for debugging:
- Request parameters
- Response data
- Error messages

Check the terminal running `npm run dev` to see API logs.

---

## Security Notes

Current implementation is for development. For production:
- Add rate limiting
- Implement CORS properly
- Validate all inputs
- Sanitize user data
- Use HTTPS only
- Add API authentication
- Implement CSRF protection
