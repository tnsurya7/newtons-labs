# Component Guide - Newton's Lab

## Component Breakdown

### 1. Header Component (`components/Header.tsx`)

**Purpose**: Sticky navigation header with search, cart, and theme toggle

**Features**:
- Logo with gradient
- Location selector (Chennai 600000)
- Search bar for tests & packages
- Action icons: Theme toggle, Support, Home Visit, User, Cart
- Mobile menu with hamburger icon
- Cart badge showing item count

**Props**: None (uses Zustand stores)

**Usage**:
```tsx
<Header />
```

---

### 2. Hero Component (`components/Hero.tsx`)

**Purpose**: Main banner section with CTA buttons

**Features**:
- Animated gradient background
- Headline with gradient text
- Three CTA buttons: Book Home Visit, Upload Prescription, Download Reports
- Stats display (250+ Cities, 10M+ Tests, NABL Certified)
- Floating cards with animations
- Responsive image placeholder

**Props**: None

**Usage**:
```tsx
<Hero />
```

---

### 3. TestCard Component (`components/TestCard.tsx`)

**Purpose**: Display individual diagnostic test with booking option

**Props**:
```typescript
interface TestCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  parameters: number;
  reportTime: string;
  fasting: boolean;
}
```

**Features**:
- Discount badge
- Test details (parameters, report time)
- Fasting indicator
- Price with strikethrough original price
- Add to cart functionality
- Hover animations

**Usage**:
```tsx
<TestCard
  id="1"
  name="Complete Blood Count"
  price={299}
  originalPrice={499}
  discount={40}
  parameters={28}
  reportTime="6 hours"
  fasting={false}
/>
```

---

### 4. PackageCard Component (`components/PackageCard.tsx`)

**Purpose**: Display health package with multiple tests

**Props**:
```typescript
interface PackageCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  tests: number;
  popular: boolean;
  features: string[];
}
```

**Features**:
- Popular badge for featured packages
- Feature list with checkmarks
- Gradient pricing
- Different styling for popular packages
- Add to cart functionality

**Usage**:
```tsx
<PackageCard
  id="p1"
  name="Aarogyam Basic"
  price={999}
  originalPrice={2499}
  discount={60}
  tests={62}
  popular={true}
  features={["CBC", "Lipid Profile", "Liver Function"]}
/>
```

---

### 5. HealthConcerns Component (`components/HealthConcerns.tsx`)

**Purpose**: Grid of health concern categories

**Features**:
- Animated grid cards
- Gradient backgrounds per category
- Icon + name + test count
- Hover scale effect
- Responsive grid (2 cols mobile, 4 cols desktop)

**Props**: None (uses data from tests.json)

**Usage**:
```tsx
<HealthConcerns />
```

---

### 6. Radiology Component (`components/Radiology.tsx`)

**Purpose**: Display radiology services (X-Ray, MRI, etc.)

**Features**:
- Service cards with icons
- Price and report time
- "Coming Soon" badges for unavailable services
- Gradient theme (purple to pink)

**Props**: None (uses data from tests.json)

**Usage**:
```tsx
<Radiology />
```

---

### 7. TrustSection Component (`components/TrustSection.tsx`)

**Purpose**: Display trust metrics and certifications

**Features**:
- Gradient background with pattern
- Animated metric cards
- Icon + value + label
- Certification badges (NABL, ISO, CAP)
- Responsive grid

**Props**: None

**Usage**:
```tsx
<TrustSection />
```

---

### 8. Footer Component (`components/Footer.tsx`)

**Purpose**: Site footer with links and contact info

**Features**:
- Company info with logo
- Social media links
- Quick links section
- Services section
- Contact information
- Bottom bar with policies

**Props**: None

**Usage**:
```tsx
<Footer />
```

---

### 9. MobileNav Component (`components/MobileNav.tsx`)

**Purpose**: Bottom navigation for mobile devices

**Features**:
- Fixed bottom position
- 4 navigation items: Home, Tests, Locations, Profile
- Icons with labels
- Glassmorphism effect
- Hidden on desktop (lg breakpoint)

**Props**: None

**Usage**:
```tsx
<MobileNav />
```

---

## UI Components

### Button (`components/ui/Button.tsx`)

**Variants**: `primary`, `secondary`, `outline`, `ghost`
**Sizes**: `sm`, `md`, `lg`

**Usage**:
```tsx
<Button variant="primary" size="lg">
  Click Me
</Button>
```

---

### Card (`components/ui/Card.tsx`)

**Props**:
- `glass`: boolean - Enable glassmorphism effect

**Usage**:
```tsx
<Card glass>
  <p>Content here</p>
</Card>
```

---

### Badge (`components/ui/Badge.tsx`)

**Variants**: `success`, `warning`, `error`, `info`

**Usage**:
```tsx
<Badge variant="success">60% OFF</Badge>
```

---

## State Management

### Theme Store (`store/theme.ts`)

```typescript
const { isDark, toggleTheme } = useThemeStore();
```

### Cart Store (`store/cart.ts`)

```typescript
const { items, totalItems, addItem, removeItem, clearCart } = useCartStore();
```

---

## Data Structure

### Test Object
```json
{
  "id": "1",
  "name": "Complete Blood Count (CBC)",
  "price": 299,
  "originalPrice": 499,
  "discount": 40,
  "parameters": 28,
  "reportTime": "6 hours",
  "fasting": false
}
```

### Package Object
```json
{
  "id": "p1",
  "name": "Aarogyam Basic",
  "price": 999,
  "originalPrice": 2499,
  "discount": 60,
  "tests": 62,
  "popular": true,
  "features": ["CBC", "Lipid Profile"]
}
```

### Health Concern Object
```json
{
  "id": "c1",
  "name": "Fever",
  "icon": "🌡️",
  "tests": 12,
  "color": "from-red-400 to-orange-400"
}
```

---

## Styling Guidelines

### Gradients
- Primary: `from-blue-600 to-teal-600`
- Secondary: `from-purple-600 to-pink-600`
- Success: `from-green-400 to-teal-400`

### Rounded Corners
- Cards: `rounded-2xl`
- Buttons: `rounded-2xl`
- Badges: `rounded-full`

### Shadows
- Default: `shadow-lg`
- Hover: `hover:shadow-2xl`

### Transitions
- All: `transition-all duration-300`
- Colors: `transition-colors`

---

## Animation Patterns

### Framer Motion - Fade In
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
>
  Content
</motion.div>
```

### Hover Scale
```tsx
<motion.div whileHover={{ scale: 1.05 }}>
  Content
</motion.div>
```

### Floating Animation
```tsx
<motion.div
  animate={{ y: [0, -10, 0] }}
  transition={{ duration: 3, repeat: Infinity }}
>
  Content
</motion.div>
```
