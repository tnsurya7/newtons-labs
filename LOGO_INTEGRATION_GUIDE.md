# Logo Integration Guide

## Steps to Add Your New10Labs Logo

### 1. Prepare the Logo Image

You need to save your logo with a **transparent background** as a PNG file.

**Requirements:**
- Format: PNG (with transparency)
- Recommended size: 400px width (height will auto-adjust)
- File name: `new10labs-logo.png`
- Background: Transparent (no white background)

### 2. Remove Background from Logo

If your logo has a white background, you can remove it using:

**Online Tools (Free):**
- https://www.remove.bg - Automatic background removal
- https://www.canva.com - Background remover tool
- https://pixlr.com - Online photo editor

**Steps:**
1. Upload your logo image
2. Use the background removal tool
3. Download as PNG with transparency
4. Rename to `new10labs-logo.png`

### 3. Add Logo to Project

**Location:** `newtons-lab/public/new10labs-logo.png`

Copy your prepared logo file to the `public` folder in your project:

```
newtons-lab/
  └── public/
      ├── new10labs-logo.png  ← Add your logo here
      ├── file.svg
      ├── globe.svg
      └── ...
```

### 4. Verify Integration

The code has already been updated to use your logo in:
- ✅ Header component (top navigation)
- ✅ Footer component (bottom section)

Once you add the logo file, it will automatically appear on your website!

### 5. Logo Specifications

The logo will be displayed with these settings:

**Header:**
- Height: 48px (3rem)
- Width: Auto (maintains aspect ratio)
- Clickable: Yes (navigates to home page)

**Footer:**
- Height: 48px (3rem)
- Width: Auto (maintains aspect ratio)

### 6. Alternative: Use Next.js Image Component (Optional)

For better performance, you can optionally convert to use Next.js Image component later:

```tsx
import Image from 'next/image';

<Image 
  src="/new10labs-logo.png" 
  alt="New10Labs Logo" 
  width={200}
  height={48}
  className="object-contain"
/>
```

### 7. Testing

After adding the logo:

1. **Local Development:**
   ```bash
   npm run dev
   ```
   Visit http://localhost:3000 to see the logo

2. **Production:**
   - Commit and push changes
   - Vercel will automatically deploy
   - Logo will appear on live site

### 8. Troubleshooting

**Logo not showing?**
- Check file name is exactly: `new10labs-logo.png`
- Check file is in `public` folder (not in a subfolder)
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Check browser console for errors

**Logo too large/small?**
- Edit the `h-12` class in Header.tsx and Footer.tsx
- Options: `h-8` (small), `h-10` (medium), `h-12` (current), `h-16` (large)

**Logo has white background?**
- Use remove.bg or similar tool to remove background
- Save as PNG (not JPG)
- Ensure transparency is preserved

---

## Quick Command to Add Logo

If you have the logo file ready, run this from your project root:

**Windows (PowerShell):**
```powershell
Copy-Item "C:\path\to\your\logo.png" "newtons-lab\public\new10labs-logo.png"
```

**Mac/Linux:**
```bash
cp /path/to/your/logo.png newtons-lab/public/new10labs-logo.png
```

---

## Current Status

✅ Code updated to use logo in Header
✅ Code updated to use logo in Footer
⏳ Waiting for logo file to be added to `public/new10labs-logo.png`

Once you add the logo file, commit and push:

```bash
cd newtons-lab
git add public/new10labs-logo.png
git commit -m "feat: Add New10Labs logo with transparent background"
git push origin main
```

The logo will then appear on your live website!
