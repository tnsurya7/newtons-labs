# Logo Setup Guide

## Current Status

✅ Logo integrated in Header and Footer
✅ Using: `/public/New10labs-logo.jpeg`
✅ CSS filters applied to handle background

## How It Works Now

The logo is displayed with CSS techniques to minimize background visibility:

### Header (Light Background):
- `mix-blend-multiply` - Blends logo with light background
- `brightness(1.1) contrast(1.1)` - Enhances logo visibility

### Footer (Dark Background):
- `mix-blend-screen` - Blends logo with dark background  
- `brightness(2) contrast(1.2)` - Makes logo bright on dark background

## For Best Results: Convert to PNG with Transparency

### Option 1: Online Tools (Easiest)
1. Go to: https://www.remove.bg
2. Upload `New10labs-logo.jpeg`
3. Download the PNG with transparent background
4. Rename to `New10labs-logo.png`
5. Replace the file in `public/` folder

### Option 2: Photoshop
1. Open `New10labs-logo.jpeg` in Photoshop
2. Select → Color Range → Click white background
3. Delete the background
4. File → Export → Export As → PNG
5. Save as `New10labs-logo.png`

### Option 3: GIMP (Free)
1. Open `New10labs-logo.jpeg` in GIMP
2. Layer → Transparency → Add Alpha Channel
3. Select → By Color → Click white background
4. Edit → Clear (or press Delete)
5. File → Export As → `New10labs-logo.png`

### Option 4: PowerPoint (Quick & Easy)
1. Insert the logo in PowerPoint
2. Select the image
3. Picture Format → Remove Background
4. Right-click → Save as Picture → PNG
5. Save as `New10labs-logo.png`

## After Converting to PNG

Update the code to use PNG:

### In `components/Header.tsx`:
```tsx
<img 
  src="/New10labs-logo.png" 
  alt="New10Labs Logo" 
  className="h-12 w-auto object-contain"
/>
```

### In `components/Footer.tsx`:
```tsx
<img 
  src="/New10labs-logo.png" 
  alt="New10Labs Logo" 
  className="h-12 w-auto object-contain"
/>
```

Remove the `mix-blend` and `filter` styles - they won't be needed with transparent PNG!

## Current File Structure

```
newtons-lab/
├── public/
│   └── New10labs-logo.jpeg  ← Your current logo
│   └── New10labs-logo.png   ← Add this (transparent version)
├── components/
│   ├── Header.tsx           ← Updated to use logo
│   └── Footer.tsx           ← Updated to use logo
```

## Logo Specifications

For best quality, ensure your logo:
- Format: PNG with transparency
- Dimensions: At least 200px height (maintains quality)
- File size: Under 100KB (for fast loading)
- Background: Transparent
- Color mode: RGB

## Testing

After adding the logo, test on:
1. Light mode (header should look good)
2. Dark mode (footer should look good)
3. Mobile devices (should scale properly)
4. Different screen sizes

## Current Display

The logo appears in:
- ✅ Header (top left, clickable to home)
- ✅ Footer (company info section)
- ✅ Responsive on all devices
- ✅ Works in light and dark mode

## Need Help?

If the logo doesn't look right:
1. Check file name matches exactly: `New10labs-logo.jpeg`
2. Ensure file is in `public/` folder
3. Clear browser cache (Ctrl+Shift+R)
4. Restart dev server

For transparent PNG conversion help, contact your designer or use remove.bg (free for basic use).
