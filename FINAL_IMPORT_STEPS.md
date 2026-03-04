# Final Test Data Import to Supabase

## Quick Import Instructions

You have the final test list with all details. Here's how to import it into Supabase:

### Method 1: CSV Import via Supabase Dashboard (Easiest)

1. **Prepare Your Data**
   - Copy all test data from your source
   - Open Excel/Google Sheets
   - Create columns: `name`, `price`, `sample_type`, `report_time`, `category`
   - Paste your data into these columns

2. **Calculate Additional Fields**
   Add these formulas in Excel/Sheets:
   - `original_price`: `=ROUND(price/0.3, 0)` (for 70% discount)
   - `discount`: `70` (or your preferred discount)
   - `parameters`: `1` (single test) or higher for packages
   - `fasting`: `FALSE` (update specific tests to TRUE later)
   - `status`: `active`

3. **Export as CSV**
   - Save the file as `tests_import.csv`

4. **Import to Supabase**
   - Go to your Supabase project dashboard
   - Navigate to: Table Editor → `tests` table
   - Click "Insert" → "Import data from CSV"
   - Upload your CSV file
   - Map the columns correctly
   - Click "Import"

### Method 2: Direct SQL Import (Faster for Large Data)

1. **Go to Supabase SQL Editor**
   - Open your Supabase project
   - Click on "SQL Editor" in the left sidebar
   - Click "New query"

2. **Clear Existing Data** (if needed)
   ```sql
   TRUNCATE TABLE tests CASCADE;
   ```

3. **Paste Your INSERT Statements**
   - Use the format below for each test
   - Execute the query

### SQL Insert Template

```sql
-- Example format for each test
INSERT INTO tests (
  id, 
  name, 
  category, 
  price, 
  original_price, 
  discount, 
  parameters, 
  report_time, 
  fasting, 
  status,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'Test Name Here',
  'CLINICAL BIOCHEMISTRY',
  1500,
  5000,
  70,
  1,
  '2 Days 0 hr 0 min',
  false,
  'active',
  NOW(),
  NOW()
);
```

### Method 3: Use Supabase API (Programmatic)

If you have the data in a structured format (JSON, CSV, etc.), I can create a Node.js script to import it automatically.

## Data Mapping Guide

### Categories
Map your "Department" column to these categories:
- `CLINICAL BIOCHEMISTRY`
- `IMMUNOLOGY / SEROLOGY` → Use `IMMUNOLOGY`
- `HAEMATOLOGY`
- `MICROBIOLOGY`
- `CLINICAL PATHOLOGY`
- `IMMUNO-HEMATOLOGY`
- `PATHOLOGY`
- `PACKAGES`
- `MOLECULAR BIOLOGY`

### Sample Types
Keep as-is from your data:
- SERUM
- WB EDTA
- Urine
- Plasma
- CSF
- Stool
- etc.

### Report Time (TAT)
Keep the format from your data:
- "1 Days 0 hr 0 min"
- "2 Days 0 hr 0 min"
- "24 hours"
- etc.

### Pricing
- `price`: Use MRP value from your data
- `original_price`: Calculate as `price / 0.3` (for 70% discount)
- `discount`: 70 (or your preferred percentage)

### Fasting
Set to `true` for these test types:
- Glucose - Fasting
- Lipid Profile
- Cholesterol tests
- Triglycerides
- Any test with "Fasting" in the name

### Parameters
- Single tests: 1
- Profiles/Panels: 5-15
- Packages: 20-80

## After Import

### 1. Verify the Import
```bash
cd newtons-lab
node verify-database-import.js
```

### 2. Check the Website
- Visit http://localhost:3000
- Go to /tests page
- Search for tests
- Check categories

### 3. Update Specific Fields (if needed)
```sql
-- Update fasting requirement
UPDATE tests 
SET fasting = true 
WHERE name ILIKE '%fasting%' 
   OR name ILIKE '%glucose - fasting%'
   OR name ILIKE '%lipid profile%';

-- Update parameters for profiles
UPDATE tests 
SET parameters = 10 
WHERE name ILIKE '%profile%' 
   OR name ILIKE '%panel%';

-- Update parameters for packages
UPDATE tests 
SET parameters = 50 
WHERE category = 'PACKAGES';
```

## Need Help?

If you need me to:
1. ✅ Create a CSV template
2. ✅ Generate SQL INSERT statements
3. ✅ Write an import script
4. ✅ Parse your data automatically

Just let me know! I can process your data and generate the exact SQL you need to run.

## Current Status

- ✅ Server running: http://localhost:3000
- ✅ Database schema ready
- ✅ API endpoints ready
- ✅ Frontend components ready
- ⏳ **Waiting for data import**

## Next Step

**Choose your import method above and import your test data to Supabase!**

Once imported, refresh your browser at http://localhost:3000 and you'll see all the tests displayed.
