# Newton's Lab - Premium Diagnostic Laboratory

A modern, responsive web application for a premium diagnostic laboratory built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Premium Healthcare UI/UX**: Soft medical gradients (blue → teal → purple) with glassmorphism effects
- **Authentication System**: Complete login/signup with JWT tokens and security features
- **Fully Responsive**: Optimized for mobile, tablet, and desktop devices
- **Dark/Light Mode**: Theme toggle with persistent storage
- **SEO Optimized**: Complete metadata and Open Graph tags
- **Smooth Animations**: Framer Motion for micro-interactions
- **Shopping Cart**: Full cart page with checkout functionality
- **API Integration**: Complete API routes for all features
- **Component Library**: Reusable UI components (Button, Card, Badge)
- **Mobile Navigation**: Bottom navigation bar for mobile devices

## 📁 Project Structure

```
newtons-lab/
├── app/
│   ├── layout.tsx          # Root layout with SEO metadata
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles
│   ├── login/
│   │   └── page.tsx        # Login page
│   ├── signup/
│   │   └── page.tsx        # Signup page
│   ├── cart/
│   │   └── page.tsx        # Shopping cart page
│   ├── health-concerns/
│   │   └── [id]/
│   │       └── page.tsx    # Dynamic health concern pages
│   └── api/
│       ├── auth/           # Authentication APIs
│       ├── booking/        # Booking APIs
│       ├── cart/           # Cart APIs
│       ├── locations/      # Location APIs
│       ├── prescription/   # Prescription APIs
│       └── support/        # Support APIs
├── components/
│   ├── Header.tsx          # Sticky header with auth integration
│   ├── Hero.tsx            # Hero section with CTA
│   ├── TestCard.tsx        # Individual test card
│   ├── PackageCard.tsx     # Health package card
│   ├── HealthConcerns.tsx  # Health concerns grid
│   ├── Radiology.tsx       # Radiology services
│   ├── TrustSection.tsx    # Trust metrics
│   ├── Footer.tsx          # Footer with links
│   ├── MobileNav.tsx       # Mobile bottom navigation
│   ├── modals/
│   │   └── BookingModal.tsx # Reusable booking modal
│   └── ui/
│       ├── Button.tsx      # Reusable button component
│       ├── Card.tsx        # Reusable card component
│       └── Badge.tsx       # Reusable badge component
├── lib/
│   ├── utils.ts            # Utility functions
│   ├── api/
│   │   └── client.ts       # API client library
│   ├── auth/
│   │   └── security.ts     # Security utilities
│   ├── hooks/
│   │   └── useBooking.ts   # Booking hook
│   └── data/
│       └── tests.json      # Dummy data for tests & packages
└── store/
    ├── theme.ts            # Theme state management
    ├── cart.ts             # Cart state management
    └── auth.ts             # Auth state management
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **State Management**: Zustand
- **Utilities**: clsx, tailwind-merge

## 🎨 Design Features

### Color Palette
- Primary: Blue (#0EA5E9) → Teal (#14B8A6)
- Secondary: Purple (#9333EA) → Pink (#EC4899)
- Gradients: Soft medical gradients throughout

### UI Components
- Glassmorphism cards with backdrop blur
- Rounded 2xl components
- Smooth shadows and hover effects
- Micro animations on interactions

### Sections
1. **Header**: Logo, location, search, cart, theme toggle, user profile
2. **Hero**: Banner with CTA buttons
3. **Frequently Booked Tests**: Grid of test cards with booking
4. **Popular Health Packages**: Premium package cards with discounts
5. **Health Concerns**: Category grid (Fever, Diabetes, etc.) with dedicated pages
6. **Radiology Services**: X-Ray, MRI, Ultrasound, CT Scan
7. **Trust Section**: Metrics (250+ cities, 10M tests, NABL certified)
8. **Doctor Consultation**: CTA section
9. **Footer**: Links, contact, social media

## 🔐 Authentication System

Complete authentication with login, signup, and logout functionality.

### Test Credentials
To test the authentication system:
1. First, create an account using the signup page at `/signup`
2. Use your created credentials to login at `/login`

Note: The application uses a mock in-memory database. Users created during signup will be available for login during the same session.

### Features
- JWT token authentication
- Password hashing (SHA-256)
- Email validation
- Phone validation (Indian format: 10 digits starting with 6-9)
- Password strength validation
- Real-time password strength indicator
- Persistent sessions with localStorage
- User profile display in header
- Logout functionality

### Password Requirements
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character (!@#$%^&*)

### Documentation
- See `AUTHENTICATION.md` for full documentation
- See `AUTH_QUICK_START.md` for quick testing guide

## 🛒 Shopping Cart

Full-featured shopping cart with:
- Add tests and packages to cart
- Dedicated cart page at `/cart`
- Order summary with total calculation
- Checkout flow with user details
- Success modal with auto-redirect
- Persistent cart state with localStorage
- Cart badge with item count in header

## 📡 API Integration

Complete API routes for all features:
- **Authentication**: `/api/auth/login`, `/api/auth/signup`, `/api/auth/logout`
- **Cart**: `/api/cart/add`
- **Booking**: `/api/booking/home-visit`, `/api/booking/consultation`
- **Support**: `/api/support/callback`
- **Prescription**: `/api/prescription/upload`
- **Locations**: `/api/locations/nearby`

See `API_DOCUMENTATION.md` for detailed API documentation.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd newtons-lab
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 📱 Responsive Design

- **Mobile**: < 768px - Single column layout, bottom navigation
- **Tablet**: 768px - 1024px - 2 column grid
- **Desktop**: > 1024px - Full layout with 3-4 column grids

## 🎯 Key Features Implementation

### Shopping Cart
- Add tests/packages to cart
- Cart count badge in header
- Zustand for state management

### Theme Toggle
- Dark/Light mode switch
- Persistent storage with localStorage
- Smooth transitions

### SEO Optimization
- Complete metadata in layout.tsx
- Open Graph tags
- Twitter card support
- Semantic HTML structure

### Performance
- Lazy loading images
- Optimized animations
- Code splitting with Next.js
- Fast page transitions

## 🔧 Customization

### Update Test Data
Edit `lib/data/tests.json` to modify:
- Frequently booked tests
- Health packages
- Health concerns
- Radiology services

### Modify Colors
Update Tailwind config or use gradient classes:
- `from-blue-600 to-teal-600`
- `from-purple-600 to-pink-600`

### Add New Sections
Create components in `components/` and import in `app/page.tsx`

## 📦 Reusable Components

### Button
```tsx
<Button variant="primary" size="lg">
  Book Now
</Button>
```

### Card
```tsx
<Card glass>
  Content here
</Card>
```

### Badge
```tsx
<Badge variant="success">
  60% OFF
</Badge>
```

## 🌐 API Ready Structure

The application is structured to easily integrate with backend APIs:
- Data models in JSON format
- Separate data layer (`lib/data/`)
- State management ready (Zustand)
- API route structure prepared

## 📄 License

This project is created for Newton's Lab.

## 🤝 Contributing

For contributions, please create a pull request with detailed description of changes.

## 📞 Support

For support, email support@newtonslab.com or call 1800-123-4567
