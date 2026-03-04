# Component Update Guide - JSON to Database Migration

## Files That Need Updates

### 1. `components/Hero.tsx`
**Current**: Imports `all-tests.json` and `packages.json`
**Update**: Use `useTests()` and `usePackages()` hooks

**Changes:**
```typescript
// Remove these imports
// import allTestsData from '@/lib/data/all-tests.json';
// import packagesData from '@/lib/data/packages.json';

// Add these imports
import { useTests } from '@/lib/hooks/useTests';
import { usePackages } from '@/lib/hooks/usePackages';

// In component
const { tests } = useTests({ limit: 100 });
const { packages } = usePackages();

// Update search logic to use `tests` and `packages` from hooks
```

---

### 2. `components/HealthConcerns.tsx`
**Current**: Imports `tests.json`
**Update**: Fetch from `/api/health-concerns`

**Changes:**
```typescript
// Remove this import
// import testsData from '@/lib/data/tests.json';

// Add state and effect
const [healthConcerns, setHealthConcerns] = useState([]);

useEffect(() => {
  fetch('/api/health-concerns')
    .then(res => res.json())
    .then(data => setHealthConcerns(data.healthConcerns))
    .catch(err => console.error(err));
}, []);

// Use healthConcerns instead of testsData.healthConcerns
```

---

### 3. `app/tests/page.tsx`
**Current**: Imports `all-tests.json`
**Update**: Use `useTests()` hook

**Changes:**
```typescript
// Remove this import
// import allTestsData from '@/lib/data/all-tests.json';

// Add this import
import { useTests } from '@/lib/hooks/useTests';

// In component
const { tests, loading } = useTests();

// Use `tests` instead of `allTestsData.allTests`
// Add loading state handling
```

---

### 4. `app/page.tsx`
**Current**: Imports `tests.json`
**Update**: Use `useTests()` and `usePackages()` hooks

**Changes:**
```typescript
// Remove this import
// import testsData from '@/lib/data/tests.json';

// Add these imports
import { useTests } from '@/lib/hooks/useTests';
import { usePackages } from '@/lib/hooks/usePackages';

// In component
const { tests } = useTests({ limit: 10 });
const { packages } = usePackages();

// Update to use tests and packages from hooks
```

---

### 5. `app/health-concerns/[id]/page.tsx`
**Current**: Imports `tests.json` and `all-tests.json`
**Update**: Use `useTests()` hook with category filter

**Changes:**
```typescript
// Remove these imports
// import testsData from '@/lib/data/tests.json';
// import allTestsData from '@/lib/data/all-tests.json';

// Add this import
import { useTests } from '@/lib/hooks/useTests';

// In component
const { tests, loading } = useTests({ category: params.id.toUpperCase() });

// Use `tests` instead of filtering allTestsData
```

---

## Step-by-Step Migration Process

### Step 1: Backup Current Files
```bash
# Create backup directory
mkdir -p newtons-lab/backup

# Copy files to backup
cp newtons-lab/components/Hero.tsx newtons-lab/backup/
cp newtons-lab/components/HealthConcerns.tsx newtons-lab/backup/
cp newtons-lab/app/tests/page.tsx newtons-lab/backup/
cp newtons-lab/app/page.tsx newtons-lab/backup/
cp newtons-lab/app/health-concerns/[id]/page.tsx newtons-lab/backup/
```

### Step 2: Update Each Component
Follow the changes outlined above for each file.

### Step 3: Test Each Component
1. Start dev server: `npm run dev`
2. Test homepage - check if tests and packages load
3. Test search - verify search works
4. Test health concerns - check categories
5. Test tests page - verify all tests display
6. Test category pages - check filtering works

### Step 4: Remove JSON Imports
Once all components are updated and tested, you can safely remove the JSON file imports.

### Step 5: Verify Everything Works
- [ ] Homepage loads correctly
- [ ] Search returns results
- [ ] Health concerns show correct counts
- [ ] Tests page displays all tests
- [ ] Category filtering works
- [ ] Pagination works
- [ ] Cart functionality works
- [ ] Booking flow works

---

## Common Issues & Solutions

### Issue 1: "Cannot read property of undefined"
**Cause**: Data not loaded yet
**Solution**: Add loading state and conditional rendering
```typescript
if (loading) return <div>Loading...</div>;
if (!tests.length) return <div>No tests found</div>;
```

### Issue 2: "Hydration mismatch"
**Cause**: Server and client render different content
**Solution**: Use `useState` with `useEffect` or add `'use client'` directive

### Issue 3: "API returns 500 error"
**Cause**: Database connection issue
**Solution**: Check Supabase credentials in `.env.local`

### Issue 4: "Tests not displaying"
**Cause**: Data structure mismatch
**Solution**: Check API response format matches component expectations

---

## Testing Checklist

After migration:

### Homepage
- [ ] Featured tests display
- [ ] Health packages display
- [ ] Search bar works
- [ ] Search results show tests and packages
- [ ] Click on test/package navigates correctly

### Tests Page
- [ ] All tests load
- [ ] Search filters tests
- [ ] Category filter works
- [ ] Pagination works
- [ ] Test cards display correctly

### Health Concerns
- [ ] All categories display
- [ ] Test counts are correct
- [ ] Click navigates to category page
- [ ] Category page shows filtered tests

### Search
- [ ] Search returns relevant results
- [ ] Results include both tests and packages
- [ ] Click on result navigates correctly
- [ ] Empty search shows no results

---

## Performance Considerations

### Before (JSON Files)
- **Load Time**: ~50ms
- **Bundle Size**: +500KB (all test data)
- **Memory**: All data loaded at once

### After (Database API)
- **Load Time**: ~100-200ms (first load)
- **Bundle Size**: -500KB (no JSON in bundle)
- **Memory**: Only loaded data in memory
- **Caching**: Browser caches API responses

### Optimization Tips
1. Use React Query or SWR for caching
2. Implement pagination for large lists
3. Add loading skeletons for better UX
4. Use debounce for search inputs

---

## Rollback Instructions

If you need to rollback:

1. Restore backup files:
```bash
cp newtons-lab/backup/* newtons-lab/components/
cp newtons-lab/backup/* newtons-lab/app/
```

2. Restart dev server:
```bash
npm run dev
```

3. Everything will work with JSON files again

---

## Next Steps After Migration

1. **Remove JSON Files** (optional)
   - Keep as backup or remove to reduce bundle size
   - Files: `lib/data/tests.json`, `lib/data/all-tests.json`, `lib/data/packages.json`

2. **Add Caching**
   - Install SWR: `npm install swr`
   - Wrap API calls with SWR for automatic caching

3. **Add Loading States**
   - Create skeleton components
   - Show loading indicators

4. **Error Handling**
   - Add error boundaries
   - Show user-friendly error messages

5. **Performance Monitoring**
   - Track API response times
   - Monitor database query performance

---

**Status**: Hooks created ✅
**Next**: Update components one by one
**Priority**: Start with Homepage → Tests Page → Health Concerns
