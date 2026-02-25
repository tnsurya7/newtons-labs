# Newton's Lab - Complete Folder Structure

```
newtons-lab/
│
├── 📁 app/                          # Next.js 14 App Router
│   ├── layout.tsx                   # Root layout with SEO metadata
│   ├── page.tsx                     # Home page (main entry)
│   ├── globals.css                  # Global styles & Tailwind
│   └── favicon.ico                  # Site favicon
│
├── 📁 components/                   # React Components
│   │
│   ├── Header.tsx                   # Sticky header with search & cart
│   ├── Hero.tsx                     # Hero section with CTA buttons
│   ├── TestCard.tsx                 # Individual test card component
│   ├── PackageCard.tsx              # Health package card component
│   ├── HealthConcerns.tsx           # Health concerns grid section
│   ├── Radiology.tsx                # Radiology services section
│   ├── TrustSection.tsx             # Trust metrics & certifications
│   ├── Footer.tsx                   # Footer with links & contact
│   ├── MobileNav.tsx                # Mobile bottom navigation
│   │
│   └── 📁 ui/                       # Reusable UI Components
│       ├── Button.tsx               # Button with variants & sizes
│       ├── Card.tsx                 # Card with glass effect option
│       └── Badge.tsx                # Badge with color variants
│
├── 📁 lib/                          # Utilities & Data
│   ├── utils.ts                     # Helper functions (cn, formatPrice)
│   │
│   └── 📁 data/                     # JSON Data Files
│       └── tests.json               # Tests, packages, concerns data
│
├── 📁 store/                        # Zustand State Management
│   ├── theme.ts                     # Dark/Light theme store
│   └── cart.ts                      # Shopping cart store
│
├── 📁 public/                       # Static Assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── 📁 node_modules/                 # Dependencies (auto-generated)
│
├── 📄 package.json                  # Project dependencies & scripts
├── 📄 package-lock.json             # Locked dependency versions
├── 📄 tsconfig.json                 # TypeScript configuration
├── 📄 next.config.ts                # Next.js configuration
├── 📄 next-env.d.ts                 # Next.js TypeScript declarations
├── 📄 postcss.config.mjs            # PostCSS configuration
├── 📄 eslint.config.mjs             # ESLint configuration
├── 📄 .gitignore                    # Git ignore rules
│
├── 📄 README.md                     # Project documentation
├── 📄 COMPONENT_GUIDE.md            # Component usage guide
└── 📄 FOLDER_STRUCTURE.md           # This file
```

## 📂 Detailed Breakdown

### `/app` - Next.js App Router
The core application directory using Next.js 14 App Router pattern.

**Files:**
- `layout.tsx`: Root layout wrapper with SEO metadata, fonts, and HTML structure
- `page.tsx`: Home page component with all sections
- `globals.css`: Global CSS with Tailwind directives and custom styles
- `favicon.ico`: Browser tab icon

### `/components` - React Components
All React components organized by functionality.

**Main Components:**
- `Header.tsx`: Navigation header with logo, search, location, cart, theme toggle
- `Hero.tsx`: Hero banner with animated background, CTA buttons, stats
- `TestCard.tsx`: Displays individual diagnostic test with price, discount, booking
- `PackageCard.tsx`: Displays health package with features, pricing, popular badge
- `HealthConcerns.tsx`: Grid of health concern categories (Fever, Diabetes, etc.)
- `Radiology.tsx`: Radiology services (X-Ray, MRI, Ultrasound, CT Scan)
- `TrustSection.tsx`: Trust metrics (250+ cities, 10M tests, certifications)
- `Footer.tsx`: Site footer with links, contact info, social media
- `MobileNav.tsx`: Bottom navigation bar for mobile devices

**UI Components (`/components/ui`):**
- `Button.tsx`: Reusable button with 4 variants (primary, secondary, outline, ghost) and 3 sizes
- `Card.tsx`: Reusable card container with optional glassmorphism effect
- `Badge.tsx`: Reusable badge with 4 color variants (success, warning, error, info)

### `/lib` - Utilities & Data
Helper functions and data files.

**Files:**
- `utils.ts`: Utility functions
  - `cn()`: Merge Tailwind classes with clsx and tailwind-merge
  - `formatPrice()`: Format numbers as Indian Rupees (₹)

**Data (`/lib/data`):**
- `tests.json`: Contains all dummy data
  - `frequentlyBookedTests`: Array of 6 popular tests
  - `healthPackages`: Array of 4 health packages
  - `healthConcerns`: Array of 8 health concern categories
  - `radiologyServices`: Array of 4 radiology services

### `/store` - State Management
Zustand stores for global state.

**Files:**
- `theme.ts`: Theme store
  - `isDark`: boolean - Current theme state
  - `toggleTheme()`: Function to switch themes
  - Persisted to localStorage

- `cart.ts`: Shopping cart store
  - `items`: Array of cart items
  - `totalItems`: Number of items in cart
  - `addItem()`: Add test/package to cart
  - `removeItem()`: Remove item from cart
  - `clearCart()`: Clear all items

### `/public` - Static Assets
Static files served directly by Next.js.

**Current Files:**
- SVG icons from Next.js template
- Ready for custom images, logos, banners

**Recommended Additions:**
- `/public/logo.svg` - Newton's Lab logo
- `/public/images/` - Product images, banners
- `/public/icons/` - Custom icons

## 🎯 Component Hierarchy

```
App (layout.tsx)
└── Home (page.tsx)
    ├── Header
    │   ├── Logo
    │   ├── Location Selector
    │   ├── Search Bar
    │   └── Action Icons (Theme, Cart, User)
    │
    ├── Hero
    │   ├── Headline
    │   ├── CTA Buttons
    │   └── Stats
    │
    ├── Frequently Booked Tests Section
    │   └── TestCard (x6)
    │       ├── Badge (discount)
    │       ├── Test Details
    │       └── Button (Book Now)
    │
    ├── Popular Health Packages Section
    │   └── PackageCard (x4)
    │       ├── Badge (popular/discount)
    │       ├── Feature List
    │       └── Button (Book Package)
    │
    ├── HealthConcerns
    │   └── Concern Cards (x8)
    │
    ├── Radiology
    │   └── Service Cards (x4)
    │       ├── Icon
    │       ├── Price
    │       └── Button/Badge
    │
    ├── TrustSection
    │   ├── Metric Cards (x5)
    │   └── Certification Badges
    │
    ├── Doctor Consultation CTA
    │
    ├── Footer
    │   ├── Company Info
    │   ├── Quick Links
    │   ├── Services
    │   ├── Contact
    │   └── Social Media
    │
    └── MobileNav (mobile only)
```

## 🔄 Data Flow

```
tests.json (Data Source)
    ↓
page.tsx (Imports data)
    ↓
TestCard / PackageCard (Receives props)
    ↓
User clicks "Book Now"
    ↓
useCartStore (Zustand)
    ↓
Cart count updates in Header
```

## 🎨 Styling Architecture

```
globals.css
├── Tailwind Base
├── Tailwind Components
├── Tailwind Utilities
├── Custom Scrollbar
├── Animations
└── Utility Classes

Components
├── Inline Tailwind Classes
├── Conditional Classes (cn utility)
└── Framer Motion Animations
```

## 📦 Dependencies Structure

```
dependencies/
├── next (Framework)
├── react & react-dom (UI Library)
├── framer-motion (Animations)
├── react-icons (Icons)
├── zustand (State Management)
├── clsx & tailwind-merge (Utilities)
└── typescript (Type Safety)

devDependencies/
├── @types/* (TypeScript types)
├── tailwindcss (Styling)
├── eslint (Linting)
└── postcss (CSS Processing)
```

## 🚀 Build Output Structure

After running `npm run build`:

```
.next/
├── cache/              # Build cache
├── server/             # Server-side code
├── static/             # Static assets
└── standalone/         # Standalone build (if configured)
```

## 📝 Configuration Files

- `package.json`: Dependencies, scripts, project metadata
- `tsconfig.json`: TypeScript compiler options
- `next.config.ts`: Next.js configuration (images, redirects, etc.)
- `postcss.config.mjs`: PostCSS plugins (Tailwind)
- `eslint.config.mjs`: ESLint rules
- `.gitignore`: Files to exclude from Git

## 🔐 Environment Variables (Future)

Create `.env.local` for:
```
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_STRIPE_KEY=
DATABASE_URL=
```

## 📱 Responsive Breakpoints

Tailwind CSS breakpoints used:
- `sm`: 640px (Small tablets)
- `md`: 768px (Tablets)
- `lg`: 1024px (Laptops)
- `xl`: 1280px (Desktops)
- `2xl`: 1536px (Large screens)

## 🎯 Future Expansion

Recommended folders for scaling:
```
├── 📁 app/
│   ├── tests/[id]/page.tsx      # Individual test pages
│   ├── packages/[id]/page.tsx   # Individual package pages
│   ├── cart/page.tsx            # Cart page
│   └── api/                     # API routes
│
├── 📁 hooks/                    # Custom React hooks
├── 📁 types/                    # TypeScript type definitions
├── 📁 services/                 # API service functions
└── 📁 constants/                # App constants
```
