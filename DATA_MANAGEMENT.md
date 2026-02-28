# Data Management Guide

This guide explains where all the data is stored in the application and how to edit it.

## 📁 Data Storage Locations

### 1. Tests, Packages & Health Concerns Data
**Location:** `lib/data/tests.json`

This file contains all the static data for:
- Frequently Booked Tests
- Health Packages
- Health Concerns
- Radiology Services

#### How to Edit:

```json
{
  "frequentlyBookedTests": [
    {
      "id": "1",                    // Unique identifier
      "name": "Test Name",          // Display name
      "price": 299,                 // Current price
      "originalPrice": 499,         // Original price (for discount calculation)
      "discount": 40,               // Discount percentage
      "parameters": 28,             // Number of parameters tested
      "reportTime": "6 hours",      // Report delivery time
      "fasting": false              // Whether fasting is required
    }
  ],
  "healthPackages": [
    {
      "id": "p1",
      "name": "Package Name",
      "price": 999,
      "originalPrice": 2499,
      "discount": 60,
      "tests": 62,                  // Number of tests included
      "popular": true,              // Show "POPULAR" badge
      "features": [                 // List of included features
        "CBC",
        "Lipid Profile"
      ]
    }
  ],
  "healthConcerns": [
    {
      "id": "c1",
      "name": "Fever",
      "icon": "Thermometer",        // Icon name (see icon mapping below)
      "tests": 12,
      "color": "from-red-400 to-orange-400"  // Gradient color
    }
  ]
}
```

**Available Icons for Health Concerns:**
- `Thermometer` - For fever/temperature
- `Droplet` - For blood/diabetes
- `Filter` - For kidney
- `Heart` - For heart/liver
- `Zap` - For thyroid/energy
- `Sun` - For vitamins
- `AlertCircle` - For allergies

**Available Gradient Colors:**
- `from-red-400 to-orange-400`
- `from-blue-400 to-cyan-400`
- `from-purple-400 to-pink-400`
- `from-green-400 to-teal-400`
- `from-indigo-400 to-purple-400`
- `from-rose-400 to-red-400`
- `from-yellow-400 to-orange-400`
- `from-pink-400 to-rose-400`

---

### 2. User Authentication Data
**Location:** `store/auth.ts` (Zustand Store)

This is stored in browser's localStorage and memory. Data includes:
- User information (name, email, phone)
- Authentication status
- Login/logout state

#### Structure:
```typescript
{
  user: {
    name: string,
    email: string,
    phone: string
  },
  isAuthenticated: boolean
}
```

**Note:** This is temporary storage. For production, you should integrate with a real backend database.

---

### 3. Shopping Cart Data
**Location:** `store/cart.ts` (Zustand Store)

Stored in browser's localStorage and memory.

#### Structure:
```typescript
{
  items: [
    {
      id: string,
      name: string,
      price: number,
      type: 'test' | 'package'
    }
  ]
}
```

---

### 4. Theme & Location Data
**Locations:**
- `store/theme.ts` - Dark/Light mode preference
- `store/location.ts` - User's selected city and pincode

Both stored in localStorage.

---

## 🔧 How to Add/Edit Data

### Adding a New Test

1. Open `lib/data/tests.json`
2. Add to the `frequentlyBookedTests` array:

```json
{
  "id": "7",
  "name": "Blood Sugar Fasting",
  "price": 199,
  "originalPrice": 399,
  "discount": 50,
  "parameters": 1,
  "reportTime": "6 hours",
  "fasting": true
}
```

3. Save the file
4. The test will automatically appear on the homepage

### Adding a New Health Package

1. Open `lib/data/tests.json`
2. Add to the `healthPackages` array:

```json
{
  "id": "p5",
  "name": "Women's Health Package",
  "price": 1499,
  "originalPrice": 3999,
  "discount": 62,
  "tests": 85,
  "popular": false,
  "features": [
    "Thyroid Profile",
    "Vitamin D",
    "Iron Studies",
    "Hormone Panel"
  ]
}
```

### Adding a New Health Concern

1. Open `lib/data/tests.json`
2. Add to the `healthConcerns` array:

```json
{
  "id": "c9",
  "name": "Bone Health",
  "icon": "Activity",
  "tests": 8,
  "color": "from-orange-400 to-yellow-400"
}
```

3. If using a new icon, update `components/HealthConcerns.tsx`:

```typescript
const iconMap: { [key: string]: React.ReactNode } = {
  // ... existing icons
  'Activity': <FiActivity size={40} />,  // Add new icon
};
```

---

## 📝 Editing Contact Information

### Company Details
**Location:** `components/Footer.tsx` and `components/modals/SupportModal.tsx`

Update these values:
```typescript
Phone: "9003130800"
Email: "support@new10lab.com", "info@new10lab.com"
Address: "152/3, 6th Avenue, Anna Nagar East, Chennai - 600 102"
```

### Header Promotional Banner
**Location:** `components/Header.tsx`

```typescript
<span className="flex items-center gap-2">
  <FiGift size={16} /> 
  Get 60% OFF on Health Packages | Free Home Sample Collection
</span>
```

---

## 🎨 Customizing Branding

### Company Name
**Locations to update:**
- `components/Header.tsx` - Logo and name
- `components/Footer.tsx` - Footer branding
- `components/Hero.tsx` - Hero section
- All modal components

Current: "New10Lab"

### Logo
**Location:** `components/Header.tsx`

```typescript
<div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
  N  {/* Change this letter */}
</div>
```

---

## 🗄️ Database Integration (Future)

Currently, the app uses:
- **JSON files** for static data (tests, packages)
- **localStorage** for user sessions and cart
- **Mock APIs** for bookings

### To integrate a real database:

1. **Replace JSON data** with API calls:
   ```typescript
   // Instead of:
   import testsData from '@/lib/data/tests.json';
   
   // Use:
   const { data: testsData } = await fetch('/api/tests');
   ```

2. **Update API routes** in `app/api/`:
   - `/api/tests` - Fetch tests from database
   - `/api/packages` - Fetch packages from database
   - `/api/bookings` - Store bookings in database
   - `/api/users` - User management

3. **Recommended databases:**
   - **PostgreSQL** with Prisma ORM
   - **MongoDB** with Mongoose
   - **Supabase** (PostgreSQL + Auth)
   - **Firebase** (NoSQL + Auth)

---

## 📊 Data Flow

```
User Action
    ↓
Component (React)
    ↓
Store (Zustand) ← → localStorage
    ↓
API Route (/api/*)
    ↓
[Future: Database]
```

---

## 🔐 Environment Variables

**Location:** `.env.local` (create this file)

```env
# Email Service
RESEND_API_KEY=your_resend_api_key
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587

# Database (when you add one)
DATABASE_URL=your_database_connection_string

# Authentication (when you add it)
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
```

---

## 🚀 Quick Edit Checklist

To customize the app for your lab:

- [ ] Update company name in all components
- [ ] Change contact information (phone, email, address)
- [ ] Edit tests in `lib/data/tests.json`
- [ ] Edit packages in `lib/data/tests.json`
- [ ] Update health concerns if needed
- [ ] Change promotional banner text
- [ ] Update logo letter/image
- [ ] Customize colors in `tailwind.config.js`
- [ ] Add your email service credentials
- [ ] Test all forms and bookings

---

## 📞 Need Help?

If you need to make changes and aren't sure how:

1. **Tests & Packages:** Edit `lib/data/tests.json`
2. **Contact Info:** Edit `components/Footer.tsx` and `components/modals/SupportModal.tsx`
3. **Branding:** Search for "New10Lab" across all files and replace
4. **Colors:** Edit `tailwind.config.js` for theme colors

All changes require rebuilding the app:
```bash
npm run build
```

For development with live reload:
```bash
npm run dev
```
