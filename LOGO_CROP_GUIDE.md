# Logo Crop Guide

## Current Solution

I've updated the code to use `object-cover` which will crop the white space automatically and show only the logo content.

**Changes:**
- `object-cover` - Crops to fill the space
- `object-position: center` - Centers the logo
- `maxWidth: 200px` - Limits maximum width
- Height: 64px (mobile), 80px (desktop)

## If You Want to Manually Crop the Image

If the automatic cropping doesn't work well, you can manually crop the PNG file:

### Option 1: Online Tool (Easiest)
1. Go to: https://www.iloveimg.com/crop-image
2. Upload `New10labs-logo.png`
3. Drag the crop box to remove top and bottom white space
4. Keep only the logo visible
5. Download and replace the file

### Option 2: Windows Photos App
1. Right-click `New10labs-logo.png`
2. Open with → Photos
3. Click "Edit & Create" → "Edit"
4. Click "Crop"
5. Drag corners to remove white space
6. Click "Save a copy"
7. Replace original file

### Option 3: Paint (Windows)
1. Open `New10labs-logo.png` in Paint
2. Click "Select" → "Rectangular selection"
3. Draw around just the logo (no white space)
4. Click "Crop"
5. File → Save As → PNG
6. Replace original file

### Option 4: Photoshop
1. Open `New10labs-logo.png`
2. Select Crop Tool (C)
3. Drag to select only logo area
4. Press Enter
5. File → Export → Export As → PNG
6. Replace original file

### Option 5: GIMP (Free)
1. Open `New10labs-logo.png`
2. Image → Autocrop Image (removes all white space automatically!)
3. File → Export As → PNG
4. Replace original file

## Recommended Crop

Remove white space from:
- ✂️ Top edge
- ✂️ Bottom edge
- ✂️ Left edge (if any)
- ✂️ Right edge (if any)

Keep only the actual logo graphics visible.

## After Cropping

Once you have a properly cropped PNG:

1. Replace the file in `public/New10labs-logo.png`
2. The code will automatically use the new version
3. Hard refresh browser: `Ctrl + Shift + R`

## Alternative: Use CSS Clip

If you know the exact pixels to crop, you can use CSS:

```tsx
<img 
  src="/New10labs-logo.png" 
  alt="New10Labs Logo" 
  className="h-20 w-auto"
  style={{ 
    clipPath: 'inset(20px 0 20px 0)' // top right bottom left
  }}
/>
```

Adjust the `inset` values:
- First value: crop from top (in pixels)
- Second value: crop from right
- Third value: crop from bottom
- Fourth value: crop from left

## Current Display Settings

**Header:**
- Mobile: 64px height
- Desktop: 80px height
- Max width: 200px
- Cropping: Automatic (object-cover)

**Footer:**
- All devices: 64px height
- Max width: 200px
- Cropping: Automatic (object-cover)

## Testing

After making changes:
1. Check header on desktop
2. Check header on mobile
3. Check footer
4. Verify logo is clearly visible
5. Ensure no white space shows

## Need Help?

If the logo still has too much white space:
1. Use GIMP's "Autocrop Image" feature (easiest)
2. Or manually crop using any of the tools above
3. Make sure to save as PNG with transparency
4. Replace the file and hard refresh browser
