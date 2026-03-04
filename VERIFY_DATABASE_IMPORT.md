# How to Verify Database Import

## Method 1: Using Supabase Dashboard (Easiest)

### Step 1: Open Supabase Dashboard
1. Go to https://supabase.com/dashboard
2. Sign in to your account
3. Select your project: **tulbixyhwpcqwhmpjune**

### Step 2: Go to Table Editor
1. Click **"Table Editor"** in the left sidebar
2. Select **"tests"** table from the dropdown

### Step 3: Check Test Count
Look at the bottom of the table - it should show:
```
Showing 1-50 of 508 rows
```

### Step 4: Browse Tests
- Scroll through the table to see all tests
- Check if test names and prices look correct
- Verify categories are assigned

### Step 5: Check Packages
1. Switch to **"packages"** table
2. Should show 8 packages
3. Verify package names and prices

---

## Method 2: Using SQL Editor (Most Accurate)

### Step 1: Open SQL Editor
1. In Supabase Dashboard, click **"SQL Editor"**
2. Click **"New Query"**

### Step 2: Run Verification Queries

Copy and paste these queries one by one:

#### Query 1: Count Total Tests
```sql
SELECT COUNT(*) as total_tests FROM tests;
```
**Expected Result**: `total_tests: 508`

#### Query 2: Count Total Packages
```sql
SELECT COUNT(*) as total_packages FROM packages;
```
**Expected Result**: `total_packages: 8`

#### Query 3: Count Tests by Category
```sql
SELECT category, COUNT(*) as count 
FROM tests 
GROUP BY category 
ORDER BY count DESC;
```
**Expected Results**:
- CLINICAL BIOCHEMISTRY: 221
- IMMUNOLOGY: 163
- PATHOLOGY: 44
- CLINICAL MICROBIOLOGY: 38
- CLINICAL PATHOLOGY: 17
- MOLECULAR BIOLOGY: 15
- PACKAGES: 10

#### Query 4: Check for Duplicates
```sql
SELECT name, COUNT(*) as count 
FROM tests 
GROUP BY name 
HAVING COUNT(*) > 1;
```
**Expected Result**: No rows (no duplicates)

#### Query 5: Sample Tests
```sql
SELECT id, name, price, category 
FROM tests 
ORDER BY id::integer 
LIMIT 10;
```
**Expected**: First 10 tests with correct names and prices

#### Query 6: Check Price Range
```sql
SELECT 
  MIN(price) as min_price,
  MAX(price) as max_price,
  AVG(price)::numeric(10,2) as avg_price
FROM tests;
```
**Expected**: 
- min_price: 40 (Glucose tests)
- max_price: 65000 (Molecular Genetic test)
- avg_price: ~1500-2000

#### Query 7: Check All Packages
```sql
SELECT id, name, price, original_price, tests_count, popular 
FROM packages 
ORDER BY price;
```
**Expected**: All 8 packages listed

#### Query 8: Verify Specific Tests
```sql
SELECT id, name, price, category 
FROM tests 
WHERE name IN (
  'Dual Marker With Graph',
  'Complete Blood Count (CBC)',
  'Thyroid Profile-I',
  'Vitamin - B12',
  'Liver Function Profile'
)
ORDER BY name;
```
**Expected**: 5 tests with correct prices

#### Query 9: Check Active Status
```sql
SELECT status, COUNT(*) as count 
FROM tests 
GROUP BY status;
```
**Expected**: All 508 tests should be 'active'

#### Query 10: Find Most Expensive Tests
```sql
SELECT id, name, price, category 
FROM tests 
ORDER BY price DESC 
LIMIT 10;
```
**Expected**: Top 10 most expensive tests

---

## Method 3: Using Node.js Verification Script

I'll create a script that checks everything automatically.

### Step 1: Run Verification Script
```bash
node verify-database-import.js
```

This will check:
- ✅ Total test count (should be 508)
- ✅ Total package count (should be 8)
- ✅ No duplicate test names
- ✅ All tests have prices
- ✅ All tests have categories
- ✅ Category distribution matches expected
- ✅ Sample tests exist with correct prices

---

## Method 4: Check from Your Application

### Step 1: Create Test API Route
Create a file: `app/api/verify-data/route.ts`

```typescript
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function GET() {
  try {
    // Count tests
    const { count: testsCount, error: testsError } = await supabase
      .from('tests')
      .select('*', { count: 'exact', head: true });

    // Count packages
    const { count: packagesCount, error: packagesError } = await supabase
      .from('packages')
      .select('*', { count: 'exact', head: true });

    // Get category distribution
    const { data: categories, error: catError } = await supabase
      .from('tests')
      .select('category')
      .order('category');

    const categoryCount: Record<string, number> = {};
    categories?.forEach(item => {
      categoryCount[item.category] = (categoryCount[item.category] || 0) + 1;
    });

    return NextResponse.json({
      success: true,
      tests: testsCount,
      packages: packagesCount,
      categories: categoryCount,
      expected: {
        tests: 508,
        packages: 8,
        categories: {
          'CLINICAL BIOCHEMISTRY': 221,
          'IMMUNOLOGY': 163,
          'PATHOLOGY': 44,
          'CLINICAL MICROBIOLOGY': 38,
          'CLINICAL PATHOLOGY': 17,
          'MOLECULAR BIOLOGY': 15,
          'PACKAGES': 10
        }
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to verify data' },
      { status: 500 }
    );
  }
}
```

### Step 2: Visit Verification URL
Open in browser: `http://localhost:3000/api/verify-data`

You'll see a JSON response showing:
- Actual counts vs expected counts
- Category distribution
- Success/failure status

---

## Expected Results Summary

After successful import, you should see:

### Tests Table
- **Total Rows**: 508
- **Columns**: id, name, price, original_price, discount, parameters, report_time, fasting_required, category, status, created_at, updated_at
- **Categories**: 7 different categories
- **Price Range**: ₹40 to ₹65,000
- **Status**: All 'active'
- **No Duplicates**: Each test name appears only once

### Packages Table
- **Total Rows**: 8
- **Packages**: New 69, New 79, New 89, New 99 Male, New 99 Female, Anaemia Basic Screen, Thyroid Screening, Fever Basic Screen
- **Price Range**: ₹300 to ₹1,400
- **All have features**: JSONB array with test names

---

## Common Issues and Solutions

### Issue 1: Count is 0
**Problem**: No data imported
**Solution**: 
1. Check if you ran the SQL import
2. Verify no errors in SQL Editor
3. Re-run the import SQL

### Issue 2: Count is less than 508
**Problem**: Import was interrupted
**Solution**:
1. Delete existing data: `DELETE FROM tests;`
2. Re-run the full import SQL

### Issue 3: Duplicate test names found
**Problem**: Import ran multiple times without DELETE
**Solution**:
1. Run: `DELETE FROM tests;`
2. Re-run import SQL (it includes DELETE at the start)

### Issue 4: Categories are NULL
**Problem**: Category assignment failed
**Solution**:
1. Re-generate SQL using `generate-final-sql.js`
2. Re-import

### Issue 5: Prices are 0 or NULL
**Problem**: Price data not imported correctly
**Solution**:
1. Check source data in `supabase-data-import.sql`
2. Verify prices are present
3. Re-import

---

## Quick Verification Checklist

After import, verify these:

- [ ] Total tests = 508
- [ ] Total packages = 8
- [ ] No duplicate test names
- [ ] All tests have prices > 0
- [ ] All tests have categories assigned
- [ ] All tests have status = 'active'
- [ ] CLINICAL BIOCHEMISTRY has 221 tests
- [ ] IMMUNOLOGY has 163 tests
- [ ] All 8 packages are present
- [ ] Package features are JSONB arrays
- [ ] Sample tests have correct prices

---

## Need Help?

If verification fails:
1. Check Supabase logs for errors
2. Verify database credentials in .env.local
3. Ensure tables exist (run schema.sql first)
4. Re-run import SQL
5. Contact support if issues persist

---

**Pro Tip**: The SQL import file includes verification queries at the end. After running the import, scroll down in the SQL Editor results to see the verification output automatically!
