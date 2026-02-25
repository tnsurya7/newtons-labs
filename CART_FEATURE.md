# Shopping Cart Feature - Newton's Lab

## Overview

A complete shopping cart system has been implemented with a dedicated cart page, persistent storage, and checkout functionality.

---

## Features

### 1. Cart Page (`/cart`)
- **Dedicated Route**: Accessible at `/cart`
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Real-time Updates**: Cart updates instantly when items are added/removed
- **Persistent Storage**: Cart items saved to localStorage (survives page refresh)

### 2. Cart Functionality

#### Add to Cart
- Click "Book Now" on any test or package
- Item is added to cart
- API call to `/api/cart/add`
- Cart badge updates with item count
- Success message with booking details

#### View Cart
- Click cart icon in header (shows item count badge)
- Navigate to `/cart` page
- See all items with details
- Mobile: Cart button in bottom navigation

#### Remove Items
- Individual remove button on each item
- "Clear All" button to empty cart
- Confirmation before clearing

#### Checkout
- Prompts for user details (name, phone, address)
- API call to `/api/booking/home-visit`
- Success animation
- Cart cleared after successful checkout
- Redirect to home page

---

## Cart Page Sections

### 1. Header
- Back button to continue shopping
- "Shopping Cart" title
- Sticky on scroll

### 2. Empty State
- Shows when cart has no items
- Large cart icon
- "Browse Tests & Packages" button
- Friendly message

### 3. Cart Items (when not empty)
- **Left Column (2/3 width)**:
  - List of all cart items
  - Each item shows:
    - Icon (🧪 for tests, 📦 for packages)
    - Name
    - Type (Diagnostic Test / Health Package)
    - Price
    - Remove button
  - "Clear All" button at top

- **Right Column (1/3 width - Sticky)**:
  - Order Summary card
  - Subtotal calculation
  - 10% discount applied
  - Free home collection
  - Total amount
  - "Proceed to Checkout" button
  - Benefits list (checkmarks)
  - Promo code input

### 4. Success Modal
- Shows after successful checkout
- Green checkmark animation
- Success message
- Auto-redirect to home

---

## Technical Implementation

### Cart Store (`store/cart.ts`)
```typescript
interface CartItem {
  id: string;
  name: string;
  price: number;
  type: 'test' | 'package';
}

// Functions:
- addItem(item)      // Add item to cart
- removeItem(id)     // Remove specific item
- clearCart()        // Remove all items
- totalItems         // Get item count
```

### Persistent Storage
- Uses Zustand with persist middleware
- Stored in localStorage as 'cart-storage'
- Survives page refresh and browser restart
- Automatically syncs across tabs

### Navigation
- Header cart icon → `/cart`
- Mobile nav cart button → `/cart`
- Cart page back button → `/`
- After checkout → `/` (auto-redirect)

---

## User Flow

### Adding Items
1. User browses tests/packages on home page
2. Clicks "Book Now" button
3. API call adds item to backend
4. Item added to local cart store
5. Cart badge updates with count
6. Success alert shows booking details

### Viewing Cart
1. User clicks cart icon (header or mobile nav)
2. Navigates to `/cart` page
3. Sees all added items
4. Can remove individual items
5. Can clear entire cart
6. Sees order summary with pricing

### Checkout
1. User clicks "Proceed to Checkout"
2. Prompted for:
   - Full name
   - Phone number
   - Complete address
3. API call to book home visit
4. Success modal appears
5. Cart is cleared
6. Redirected to home after 3 seconds

---

## Cart Badge

### Header
- Shows on cart icon
- Red circle with white text
- Displays item count
- Animated pulse effect
- Updates in real-time

### Mobile Navigation
- Cart button with badge
- Same styling as header
- Always visible on mobile
- Quick access to cart

---

## Pricing Calculation

```javascript
Subtotal = Sum of all item prices
Discount = 10% of subtotal
Home Collection = FREE
Total = Subtotal - Discount
```

**Example:**
```
Test 1: ₹299
Test 2: ₹399
Package 1: ₹999
---
Subtotal: ₹1,697
Discount (10%): -₹169
Home Collection: FREE
---
Total: ₹1,528
```

---

## API Integration

### Add to Cart
```
POST /api/cart/add
Body: { id, name, price, type }
Response: { success, message, data }
```

### Checkout
```
POST /api/booking/home-visit
Body: { name, phone, address, items, total }
Response: { success, message, data: { bookingId, ... } }
```

---

## Responsive Design

### Desktop (> 1024px)
- 2-column layout
- Cart items on left (2/3)
- Order summary on right (1/3)
- Sticky summary card
- Header cart icon

### Tablet (768px - 1024px)
- Same as desktop
- Adjusted spacing
- Responsive grid

### Mobile (< 768px)
- Single column layout
- Cart items stack vertically
- Order summary below items
- Bottom navigation with cart button
- Touch-friendly buttons

---

## Animations

### Page Load
- Fade in with slide up
- Staggered item appearance
- Smooth transitions

### Item Removal
- Fade out animation
- Smooth height collapse
- Instant count update

### Checkout Success
- Scale and fade in modal
- Green checkmark animation
- Auto-close with countdown

---

## Empty Cart State

When cart is empty:
- Large cart icon (gray)
- "Your Cart is Empty" heading
- Helpful message
- "Browse Tests & Packages" button
- Clean, centered layout

---

## Benefits Displayed

✓ Free home sample collection
✓ NABL certified labs
✓ Reports within 24-48 hours
✓ 100% safe & hygienic

---

## Future Enhancements

### Planned Features:
1. **Quantity Selection**: Allow multiple quantities of same test
2. **Save for Later**: Move items to wishlist
3. **Promo Codes**: Working discount code system
4. **Payment Gateway**: Razorpay/Stripe integration
5. **Order History**: View past orders
6. **Scheduled Booking**: Choose specific date/time
7. **Multiple Addresses**: Save and select addresses
8. **Guest Checkout**: Checkout without login
9. **Email Confirmation**: Send order confirmation
10. **SMS Updates**: Booking status via SMS

---

## Testing the Cart

### Test Scenarios:

1. **Add Items**:
   - Add multiple tests
   - Add multiple packages
   - Mix tests and packages
   - Check cart count updates

2. **View Cart**:
   - Click cart icon
   - Verify all items shown
   - Check pricing calculations
   - Test on mobile

3. **Remove Items**:
   - Remove individual items
   - Use "Clear All"
   - Verify count updates

4. **Checkout**:
   - Fill in details
   - Submit booking
   - Check success modal
   - Verify cart cleared

5. **Persistence**:
   - Add items
   - Refresh page
   - Check items still there
   - Close and reopen browser

---

## Troubleshooting

### Cart not updating?
- Check browser console for errors
- Verify localStorage is enabled
- Clear browser cache

### Items disappearing?
- Check if localStorage is full
- Verify persist middleware is working
- Check for JavaScript errors

### Checkout failing?
- Verify API endpoint is running
- Check network tab for errors
- Ensure all fields are filled

---

## File Structure

```
newtons-lab/
├── app/
│   └── cart/
│       └── page.tsx          # Cart page component
├── store/
│   └── cart.ts               # Cart state management
├── components/
│   ├── Header.tsx            # Updated with cart navigation
│   └── MobileNav.tsx         # Updated with cart button
└── app/api/
    └── cart/
        └── add/
            └── route.ts      # Cart API endpoint
```

---

## Summary

The shopping cart is now a fully functional feature with:
- ✅ Dedicated cart page
- ✅ Persistent storage
- ✅ Real-time updates
- ✅ API integration
- ✅ Checkout flow
- ✅ Mobile support
- ✅ Responsive design
- ✅ Success animations

Users can now add items, view their cart, and complete checkout with a smooth, professional experience!
