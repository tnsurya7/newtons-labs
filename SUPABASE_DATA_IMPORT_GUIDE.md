# Supabase Data Import Guide

## Overview
This guide will help you import all 516 tests and 8 packages into your Supabase database.

## Data Summary
- **Tests**: 516 diagnostic tests with pricing, categories, and details
- **Packages**: 8 health packages with test counts and features

## Method 1: SQL Import (Recommended - Fast & Reliable)

### Step 1: Open Supabase Dashboard
1. Go to https://supabase.com/dashboard
2. Sign in to your account
3. Select your project: **tulbixyhwpcqwhmpjune**

### Step 2: Open SQL Editor
1. Click on **SQL Editor** in the left sidebar
2. Click **New Query** button (top right)

### Step 3: Copy SQL File
1. Open the file: `supabase-data-import.sql` (in your project root)
2. Select all content (Ctrl+A / Cmd+A)
3. Copy (Ctrl+C / Cmd+C)

### Step 4: Execute SQL
1. Paste the SQL into the Supabase SQL Editor
2. Click **Run** button (or press Ctrl+Enter)
3. Wait for execution to complete (should take 5-10 seconds)

### Step 5: Verify Import
The SQL file includes verification queries at the end. You should see:
- Total tests: 516
- Total packages: 8
- Sample data from both tables
- Tests grouped by category

## Method 2: Using Import Script (Alternative)

If you prefer to use the Node.js script:

### Prerequisites
```bash
npm install @supabase/supabase-js
```

### Run Import Script
```bash
node import-data-to-supabase.js
```

**Note**: This method may fail due to network timeouts. Use Method 1 (SQL) if you encounter issues.

## What Gets Imported

### Tests Table
Each test includes:
- **id**: Unique identifier (1-516)
- **name**: Test name (e.g., "Complete Blood Count")
- **price**: Selling price (MRP from spreadsheet)
- **original_price**: MRP value
- **discount**: Discount percentage (17%)
- **parameters**: Number of parameters tested
- **report_time**: Time to get results (e.g., "24 Hours")
- **fasting_required**: Whether fasting is needed (true/false)
- **category**: Test category (e.g., "CLINICAL BIOCHEMISTRY")
- **status**: Active/Inactive

### Packages Table
Each package includes:
- **id**: Unique identifier (p1-p8)
- **name**: Package name (e.g., "New 69")
- **price**: B2B price
- **original_price**: MRP value
- **discount**: Discount percentage
- **tests_count**: Number of tests included
- **popular**: Whether it's a popular package
- **features**: Array of included tests/features (JSONB)
- **description**: Package description
- **status**: Active/Inactive

## Package Details

### 1. New 69 (₹899)
- 69 tests included
- Popular package
- Includes: Fasting Blood Sugar, Lipid Profile, Liver Function, Iron Profile, Complete Urine Analysis, HbA1c, Calcium & Phosphorus, Thyroid Profile-II, CBC + ESR, Kidney Basic Screen

### 2. New 79 (₹1,199)
- 79 tests included
- Popular package
- Adds: Folate, Vitamin B12, Vitamin D

### 3. New 89 (₹2,199)
- 89 tests included
- Popular package
- Premium package with additional markers

### 4. New 99 Male (₹2,999)
- 99 tests included
- Male-specific tests
- Includes PSA, Testosterone

### 5. New 99 Female (₹2,999)
- 99 tests included
- Female-specific tests
- Includes CA 125

### 6. Anaemia Basic Screen (₹1,000)
- 7 tests for anemia screening
- Iron, Ferritin, TIBC, Transferrin, Vitamin B12, CBC

### 7. Thyroid Screening (₹1,999)
- 9 comprehensive thyroid tests
- Anti TPO, Anti Thyroglobulin, Calcitonin, Thyroglobulin, TT3, TT4, FT3, FT4, TSH

### 8. Fever Basic Screen (₹899)
- 5 tests for fever diagnosis
- ESR, Malarial Parasite, Widal Test, CRP, CBC

## Test Categories Distribution

After import, you'll have tests in these categories:
- **CLINICAL BIOCHEMISTRY**: 152 tests
- **INFECTIONS**: 113 tests
- **PATHOLOGY**: 40 tests
- **CLINICAL PATHOLOGY**: 37 tests
- **IMMUNOLOGY**: 34 tests
- **ALLERGY**: 31 tests
- **MOLECULAR BIOLOGY**: 19 tests
- **CLINICAL MICROBIOLOGY**: 17 tests
- **CYTOGENETICS**: 14 tests
- **HISTOPATHOLOGY**: 12 tests
- **PACKAGES**: 6 tests
- **CYTOLOGY**: 5 tests

## Verification Steps

After import, verify the data:

### 1. Check Test Count
```sql
SELECT COUNT(*) as total_tests FROM tests;
-- Expected: 516
```

### 2. Check Package Count
```sql
SELECT COUNT(*) as total_packages FROM packages;
-- Expected: 8
```

### 3. View Sample Tests
```sql
SELECT id, name, price, category 
FROM tests 
ORDER BY id::integer 
LIMIT 10;
```

### 4. View All Packages
```sql
SELECT id, name, price, original_price, tests_count, popular 
FROM packages 
ORDER BY price;
```

### 5. Check Categories
```sql
SELECT category, COUNT(*) as count 
FROM tests 
GROUP BY category 
ORDER BY count DESC;
```

## Troubleshooting

### Issue: "relation does not exist"
**Solution**: Run the schema.sql first to create tables
```bash
# In Supabase SQL Editor, run:
supabase/schema.sql
```

### Issue: "duplicate key value"
**Solution**: The SQL file includes DELETE statements. If you still get errors:
```sql
DELETE FROM tests;
DELETE FROM packages;
-- Then run the import again
```

### Issue: Import script timeout
**Solution**: Use Method 1 (SQL Import) instead of the Node.js script

### Issue: Data not showing in app
**Solution**: 
1. Check if data is in database (run verification queries)
2. Restart your Next.js dev server
3. Clear browser cache
4. Check API routes are fetching from database

## After Import

### Update API Routes
Make sure your API routes fetch from Supabase instead of JSON files:

```typescript
// Example: app/api/tests/route.ts
import { supabase } from '@/lib/supabase/client';

export async function GET() {
  const { data, error } = await supabase
    .from('tests')
    .select('*')
    .eq('status', 'active')
    .order('name');
    
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json({ tests: data });
}
```

### Update Frontend Components
Update components to fetch from API instead of importing JSON:

```typescript
// Before
import testsData from '@/lib/data/all-tests.json';

// After
const response = await fetch('/api/tests');
const { tests } = await response.json();
```

## Files Generated

1. **supabase-data-import.sql** - Complete SQL import file (ready to use)
2. **import-data-to-supabase.js** - Node.js import script (alternative method)
3. **generate-sql-inserts.js** - Script that generated the SQL file

## Important Notes

⚠️ **Data Deletion**: The import SQL includes `DELETE FROM tests;` and `DELETE FROM packages;` to ensure clean import. Any existing data will be removed.

✅ **Idempotent**: You can run the import multiple times safely. It will delete and re-insert all data.

🔒 **Permissions**: Make sure your Supabase service role key has permission to insert data.

📊 **Performance**: SQL import is much faster than API-based import (5-10 seconds vs 2-3 minutes).

## Success Indicators

After successful import, you should see:
- ✅ 516 tests in the tests table
- ✅ 8 packages in the packages table
- ✅ All tests have valid prices and categories
- ✅ All packages have features array
- ✅ No duplicate IDs
- ✅ All records have status = 'active'

## Next Steps

1. ✅ Import data using Method 1 (SQL)
2. ✅ Verify data using verification queries
3. ✅ Update API routes to fetch from database
4. ✅ Update frontend components
5. ✅ Test the application
6. ✅ Deploy to production

---

**Need Help?**
- Check Supabase logs for detailed error messages
- Verify your database credentials in .env.local
- Ensure tables exist (run schema.sql first)
- Contact support if issues persist
