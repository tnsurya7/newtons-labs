# Admin Panel & Enhanced Features Specification

## Overview
Complete admin panel with service management, user tracking, email notifications, and booking confirmations.

---

## 1. Enhanced Search Feature

### Requirements
- Search across ALL services:
  - Tests (frequentlyBookedTests)
  - Packages (healthPackages)
  - Health Concerns
  - Consultations
  - Home Visit Services
- Real-time search with dropdown results
- Category filters
- Search by: name, description, price range, parameters

### Implementation
- Update Header.tsx search functionality
- Add comprehensive search API endpoint
- Include service type badges in results
- Click to navigate to service detail or add to cart

---

## 2. Admin Panel

### 2.1 Admin Authentication
**Route:** `/admin/login`

**Features:**
- Secure admin login (separate from user login)
- Admin credentials stored in environment variables
- Session management with JWT tokens
- Protected admin routes

**Default Admin:**
```
Email: admin@new10lab.com
Password: (set in .env.local)
```

### 2.2 Admin Dashboard
**Route:** `/admin/dashboard`

**Sections:**
1. **Overview Cards**
   - Total Users
   - Total Bookings (Today/Week/Month)
   - Total Revenue
   - Active Services

2. **Recent Activity**
   - Latest bookings
   - New user registrations
   - Recent service additions

3. **Quick Actions**
   - Add New Test
   - Add New Package
   - View All Bookings
   - Manage Users

### 2.3 Service Management

#### Tests Management
**Route:** `/admin/services/tests`

**Features:**
- View all tests in table format
- Add new test
- Edit existing test
- Delete test
- Bulk actions (delete multiple, export)
- Search and filter tests

**Test Form Fields:**
- Name
- Price
- Original Price
- Discount (auto-calculated)
- Parameters
- Report Time
- Fasting Required (Yes/No)
- Description
- Category/Health Concern

#### Packages Management
**Route:** `/admin/services/packages`

**Features:**
- View all packages
- Add new package
- Edit existing package
- Delete package
- Manage included tests

**Package Form Fields:**
- Name
- Price
- Original Price
- Discount
- Number of Tests
- Popular (Yes/No)
- Features (list)
- Description
- Included Tests (multi-select)

### 2.4 User Management
**Route:** `/admin/users`

**Features:**
- View all registered users
- User details (name, email, phone, registration date)
- User activity log
- Booking history per user
- Search users
- Export user data
- Block/Unblock users

**User Table Columns:**
- ID
- Name
- Email
- Phone
- Registration Date
- Total Bookings
- Total Spent
- Status (Active/Blocked)
- Actions (View, Edit, Block)

### 2.5 Bookings Management
**Route:** `/admin/bookings`

**Features:**
- View all bookings
- Filter by: date, status, service type, user
- Booking details
- Update booking status
- Cancel bookings
- Export bookings

**Booking Statuses:**
- Pending
- Confirmed
- Sample Collected
- Processing
- Completed
- Cancelled

**Booking Table Columns:**
- Booking ID
- User Name
- Service Name
- Service Type
- Date & Time
- Amount
- Status
- Actions

### 2.6 Analytics & Reports
**Route:** `/admin/analytics`

**Features:**
- Revenue charts (daily, weekly, monthly)
- Popular services
- User growth chart
- Booking trends
- Export reports (PDF, Excel)

---

## 3. Email Notifications

### 3.1 Booking Confirmation Email (User)

**Trigger:** When user completes checkout

**Content:**
- Booking confirmation message
- Booking ID
- Service details (name, type, price)
- User details (name, phone, address)
- Appointment date & time
- Payment summary
- What happens next
- Contact information
- Professional HTML template

### 3.2 Booking Notification Email (Admin)

**Trigger:** When user completes checkout

**Content:**
- New booking alert
- Booking ID
- User details
- Service details
- Amount paid
- Address for sample collection
- Quick action links (view booking, contact user)

### 3.3 Email Templates

**Templates to create:**
1. Booking Confirmation (User)
2. Booking Notification (Admin)
3. Booking Status Update (User)
4. Welcome Email (New User)
5. Password Reset
6. Report Ready Notification

---

## 4. Booking Confirmation/Bill Generation

### 4.1 Invoice/Bill Component

**Features:**
- Professional invoice design
- Company logo and details
- Invoice number (auto-generated)
- Invoice date
- User details (Bill To)
- Service details table
- Subtotal, discount, tax, total
- Payment status
- Terms & conditions
- Download as PDF button
- Print button

**Invoice Format:**
```
┌─────────────────────────────────────────┐
│  [LOGO]  New10Labs Diagnostic Centre   │
│  152/3, 6th Avenue, Anna Nagar East     │
│  Chennai - 600 102                      │
│  Phone: 9003130800                      │
├─────────────────────────────────────────┤
│  INVOICE                                │
│  Invoice #: INV-2024-00001              │
│  Date: March 1, 2024                    │
│  Booking ID: BK-123456                  │
├─────────────────────────────────────────┤
│  BILL TO:                               │
│  [User Name]                            │
│  [Phone]                                │
│  [Address]                              │
├─────────────────────────────────────────┤
│  SERVICES                               │
│  ┌────────────────────────────────────┐ │
│  │ Service      Qty  Price   Amount   │ │
│  │ CBC Test      1   ₹299    ₹299    │ │
│  │ Lipid Profile 1   ₹449    ₹449    │ │
│  └────────────────────────────────────┘ │
│                                         │
│  Subtotal:              ₹748           │
│  Discount (40%):       -₹299           │
│  Tax (0%):              ₹0             │
│  ─────────────────────────────────     │
│  TOTAL:                 ₹449           │
├─────────────────────────────────────────┤
│  Payment Status: PAID                   │
│  Payment Method: Online                 │
├─────────────────────────────────────────┤
│  TERMS & CONDITIONS                     │
│  • Sample collection within 24 hours    │
│  • Reports within specified time        │
│  • Fasting required for certain tests   │
└─────────────────────────────────────────┘
```

### 4.2 Booking Confirmation Page

**Route:** `/booking/confirmation/[bookingId]`

**Features:**
- Success message with animation
- Booking summary
- Invoice display
- Download invoice button
- Email confirmation sent message
- What happens next section
- Track booking button
- Book more tests button

---

## 5. Database Schema (for future implementation)

### Tables Needed:

#### users
- id (primary key)
- name
- email (unique)
- phone
- password (hashed)
- role (user/admin)
- status (active/blocked)
- created_at
- updated_at

#### tests
- id (primary key)
- name
- price
- original_price
- discount
- parameters
- report_time
- fasting_required
- description
- category
- status (active/inactive)
- created_at
- updated_at

#### packages
- id (primary key)
- name
- price
- original_price
- discount
- tests_count
- popular
- features (JSON)
- description
- status (active/inactive)
- created_at
- updated_at

#### bookings
- id (primary key)
- booking_id (unique, e.g., BK-123456)
- user_id (foreign key)
- service_type (test/package/consultation/home-visit)
- service_id
- service_name
- amount
- discount_amount
- total_amount
- status (pending/confirmed/completed/cancelled)
- appointment_date
- appointment_time
- address
- phone
- notes
- created_at
- updated_at

#### booking_items
- id (primary key)
- booking_id (foreign key)
- service_type
- service_id
- service_name
- quantity
- price
- created_at

#### activity_logs
- id (primary key)
- user_id (foreign key)
- action (login/logout/booking/profile_update)
- description
- ip_address
- user_agent
- created_at

---

## 6. Technology Stack

### Frontend
- Next.js 14 (App Router)
- React
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- React Icons
- Recharts (for analytics)

### Backend
- Next.js API Routes
- Node.js

### Database (Recommended)
- PostgreSQL with Prisma ORM
- OR Supabase (PostgreSQL + Auth + Storage)
- OR MongoDB with Mongoose

### Email Service
- Resend (already configured)
- OR SendGrid
- OR AWS SES

### PDF Generation
- react-pdf/renderer
- OR jsPDF
- OR Puppeteer

### Authentication
- NextAuth.js (for admin)
- JWT tokens
- bcrypt (password hashing)

---

## 7. Implementation Phases

### Phase 1: Enhanced Search (1-2 days)
- Update search functionality
- Add comprehensive search API
- Improve search UI/UX

### Phase 2: Admin Authentication (1 day)
- Admin login page
- Admin authentication API
- Protected routes middleware

### Phase 3: Admin Dashboard (2-3 days)
- Dashboard layout
- Overview cards
- Recent activity
- Quick actions

### Phase 4: Service Management (3-4 days)
- Tests CRUD operations
- Packages CRUD operations
- Forms and validation
- API endpoints

### Phase 5: User Management (2 days)
- User list view
- User details
- Activity logs
- User actions

### Phase 6: Bookings Management (2-3 days)
- Bookings list
- Booking details
- Status updates
- Filters and search

### Phase 7: Email Notifications (2 days)
- Email templates
- Booking confirmation emails
- Admin notification emails
- Email service integration

### Phase 8: Invoice/Bill Generation (2-3 days)
- Invoice component
- PDF generation
- Booking confirmation page
- Download functionality

### Phase 9: Analytics (2-3 days)
- Charts and graphs
- Reports
- Export functionality

### Phase 10: Testing & Polish (2-3 days)
- Bug fixes
- UI/UX improvements
- Performance optimization
- Documentation

**Total Estimated Time: 20-30 days**

---

## 8. Environment Variables Required

```env
# Admin Credentials
ADMIN_EMAIL=admin@new10lab.com
ADMIN_PASSWORD_HASH=<bcrypt_hash>

# JWT Secret
JWT_SECRET=<random_secret_key>

# Email Service (Resend)
RESEND_API_KEY=<your_resend_api_key>
ADMIN_EMAIL_RECIPIENT=admin@new10lab.com

# Database (when implemented)
DATABASE_URL=<your_database_url>

# NextAuth (for admin)
NEXTAUTH_SECRET=<random_secret>
NEXTAUTH_URL=http://localhost:3000
```

---

## 9. File Structure

```
newtons-lab/
├── app/
│   ├── admin/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── services/
│   │   │   ├── tests/
│   │   │   │   └── page.tsx
│   │   │   └── packages/
│   │   │       └── page.tsx
│   │   ├── users/
│   │   │   └── page.tsx
│   │   ├── bookings/
│   │   │   └── page.tsx
│   │   └── analytics/
│   │       └── page.tsx
│   ├── booking/
│   │   └── confirmation/
│   │       └── [bookingId]/
│   │           └── page.tsx
│   └── api/
│       ├── admin/
│       │   ├── auth/
│       │   ├── services/
│       │   ├── users/
│       │   └── bookings/
│       └── search/
│           └── route.ts
├── components/
│   ├── admin/
│   │   ├── AdminLayout.tsx
│   │   ├── AdminSidebar.tsx
│   │   ├── AdminHeader.tsx
│   │   ├── ServiceForm.tsx
│   │   ├── UserTable.tsx
│   │   ├── BookingTable.tsx
│   │   └── AnalyticsCharts.tsx
│   ├── invoice/
│   │   └── Invoice.tsx
│   └── email/
│       ├── BookingConfirmation.tsx
│       └── AdminNotification.tsx
├── lib/
│   ├── admin/
│   │   ├── auth.ts
│   │   └── permissions.ts
│   ├── email/
│   │   └── templates.ts
│   └── pdf/
│       └── generator.ts
└── store/
    └── admin.ts
```

---

## 10. Next Steps

Would you like me to:

1. **Start with Phase 1** (Enhanced Search) - Quick win, improves user experience
2. **Start with Phase 2-4** (Admin Panel Core) - Build foundation for admin features
3. **Create a detailed technical design document** first
4. **Set up database schema** before starting implementation

Please let me know which approach you prefer, and I'll begin implementation!
