# Quick Start Guide - Newton's Lab

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
cd newtons-lab
npm install
```

### Step 2: Run Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📋 Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

---

## 🎨 Customization Quick Guide

### 1. Update Test Data
Edit `lib/data/tests.json`:

```json
{
  "frequentlyBookedTests": [
    {
      "id": "1",
      "name": "Your Test Name",
      "price": 299,
      "originalPrice": 499,
      "discount": 40,
      "parameters": 28,
      "reportTime": "6 hours",
      "fasting": false
    }
  ]
}
```

### 2. Change Colors
Update gradient classes in components:

```tsx
// Primary gradient
className="bg-gradient-to-r from-blue-600 to-teal-600"

// Secondary gradient
className="bg-gradient-to-r from-purple-600 to-pink-600"
```

### 3. Modify Logo
Replace logo in `components/Header.tsx`:

```tsx
<div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl">
  {/* Add your logo image here */}
</div>
```

### 4. Update Contact Info
Edit `components/Footer.tsx`:

```tsx
<p>1800-123-4567</p>  // Change phone number
<p>support@newtonslab.com</p>  // Change email
```

### 5. Add New Section
Create component in `components/`:

```tsx
// components/NewSection.tsx
export default function NewSection() {
  return (
    <section className="py-16">
      {/* Your content */}
    </section>
  );
}
```

Import in `app/page.tsx`:

```tsx
import NewSection from '@/components/NewSection';

// Add in Home component
<NewSection />
```

---

## 🎯 Key Features to Test

### 1. Theme Toggle
- Click moon/sun icon in header
- Theme persists on page reload

### 2. Shopping Cart
- Click "Book Now" on any test
- Cart count updates in header
- Items stored in Zustand

### 3. Mobile Navigation
- Resize browser to mobile view
- Bottom navigation appears
- Hamburger menu in header

### 4. Animations
- Scroll down page
- Elements fade in on viewport entry
- Hover over cards for effects

### 5. Responsive Design
- Test on mobile (< 768px)
- Test on tablet (768px - 1024px)
- Test on desktop (> 1024px)

---

## 🔧 Common Tasks

### Add a New Test
1. Open `lib/data/tests.json`
2. Add to `frequentlyBookedTests` array:
```json
{
  "id": "7",
  "name": "New Test Name",
  "price": 399,
  "originalPrice": 699,
  "discount": 43,
  "parameters": 10,
  "reportTime": "12 hours",
  "fasting": true
}
```
3. Save file - changes appear immediately in dev mode

### Add a New Health Package
1. Open `lib/data/tests.json`
2. Add to `healthPackages` array:
```json
{
  "id": "p5",
  "name": "Custom Package",
  "price": 1499,
  "originalPrice": 3999,
  "discount": 63,
  "tests": 75,
  "popular": false,
  "features": ["Feature 1", "Feature 2", "Feature 3"]
}
```

### Change Hero Text
Edit `components/Hero.tsx`:

```tsx
<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
  Your Custom Headline
</h1>

<p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
  Your custom description text
</p>
```

### Update SEO Metadata
Edit `app/layout.tsx`:

```tsx
export const metadata: Metadata = {
  title: "Your Custom Title",
  description: "Your custom description",
  keywords: "your, custom, keywords",
};
```

---

## 🐛 Troubleshooting

### Issue: Port 3000 already in use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

### Issue: Module not found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: TypeScript errors
```bash
# Check for errors
npm run build

# Fix common issues
npm install --save-dev @types/node @types/react @types/react-dom
```

### Issue: Tailwind styles not working
1. Check `globals.css` has Tailwind directives
2. Restart dev server
3. Clear browser cache

### Issue: Dark mode not working
1. Check browser localStorage
2. Clear localStorage: `localStorage.clear()`
3. Refresh page

---

## 📦 Production Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Manual Build
```bash
# Build production bundle
npm run build

# Test production build locally
npm start

# Output in .next folder
```

### Environment Variables
Create `.env.local`:
```
NEXT_PUBLIC_API_URL=https://api.example.com
```

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Zustand](https://github.com/pmndrs/zustand)

---

## 🎓 Component Examples

### Using Button Component
```tsx
import Button from '@/components/ui/Button';

<Button variant="primary" size="lg">
  Click Me
</Button>

<Button variant="outline" size="md">
  Secondary Action
</Button>
```

### Using Card Component
```tsx
import Card from '@/components/ui/Card';

<Card glass>
  <h3>Card Title</h3>
  <p>Card content</p>
</Card>
```

### Using Badge Component
```tsx
import Badge from '@/components/ui/Badge';

<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="error">Inactive</Badge>
```

### Accessing Cart Store
```tsx
import { useCartStore } from '@/store/cart';

function MyComponent() {
  const { items, totalItems, addItem } = useCartStore();
  
  const handleAdd = () => {
    addItem({
      id: '1',
      name: 'Test Name',
      price: 299,
      type: 'test'
    });
  };
  
  return <button onClick={handleAdd}>Add to Cart ({totalItems})</button>;
}
```

### Accessing Theme Store
```tsx
import { useThemeStore } from '@/store/theme';

function MyComponent() {
  const { isDark, toggleTheme } = useThemeStore();
  
  return (
    <button onClick={toggleTheme}>
      {isDark ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}
```

---

## ✅ Checklist Before Launch

- [ ] Update all placeholder text
- [ ] Replace dummy phone numbers and emails
- [ ] Add real logo and images
- [ ] Update test prices and data
- [ ] Configure SEO metadata
- [ ] Test on multiple devices
- [ ] Test all interactive features
- [ ] Set up analytics (Google Analytics, etc.)
- [ ] Configure domain and hosting
- [ ] Set up SSL certificate
- [ ] Test page load speed
- [ ] Verify accessibility (ARIA labels)

---

## 🎉 You're Ready!

Your Newton's Lab application is now set up and ready for customization. Start by updating the test data and customizing the colors to match your brand.

For detailed component documentation, see `COMPONENT_GUIDE.md`.
