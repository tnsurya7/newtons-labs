# SQL Import Instructions - 515 Tests

## What You Need to Do

Since you have the final 515 test list, here's how to import it using SQL Editor:

### Step 1: Prepare the Data

I need the test data in a text format to generate the complete SQL. You can provide it in ANY of these formats:

**Option A: Copy from Excel/Sheets**
```
TestName    MRP    SampleType    TAT    Department
Test1       100    SERUM         1 day  CLINICAL BIOCHEMISTRY
Test2       200    Urine         2 days PATHOLOGY
```

**Option B: Comma-separated (CSV)**
```
Test1,100,SERUM,1 day,CLINICAL BIOCHEMISTRY
Test2,200,Urine,2 days,PATHOLOGY
```

**Option C: Pipe-separated**
```
Test1|100|SERUM|1 day|CLINICAL BIOCHEMISTRY
Test2|200|Urine|2 days|PATHOLOGY
```

### Step 2: I'll Generate the Complete SQL

Once you provide the data, I'll create a file like `COMPLETE_DATA_UPDATE.sql` with:
- DELETE command to clear old data
- INSERT commands for all 515 tests
- Proper formatting and calculations

### Step 3: Run in Supabase SQL Editor

1. Open your Supabase project
2. Go to "SQL Editor"
3. Click "New query"
4. Paste the generated SQL
5. Click "Run" or press Ctrl+Enter
6. Done! All 515 tests will be in your database

## Quick Alternative: Use the Existing SQL File

If you want to manually edit the SQL file:

1. Open `COMPLETE_DATA_UPDATE.sql`
2. Follow the template format
3. Add all 515 tests using this pattern:

```sql
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting, status, created_at, updated_at)
VALUES 
(gen_random_uuid(), 'Test Name', 'CATEGORY', price, original_price, discount, parameters, 'TAT', fasting, 'active', NOW(), NOW());
```

## Pricing Formula

For each test:
- `price` = MRP from your data
- `original_price` = ROUND(price / 0.3) for 70% discount
- `discount` = 70
- `parameters` = 1 for single tests, higher for packages
- `fasting` = true for fasting tests, false otherwise

## Example

```sql
-- Vitamin B12 test with MRP 600
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting, status, created_at, updated_at)
VALUES 
(gen_random_uuid(), 'Vitamin - B12', 'CLINICAL BIOCHEMISTRY', 600, 2000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());
```

## What I Need From You

**To generate the complete SQL file automatically, please provide:**

1. The test data in any text format (copy-paste from your source)
2. Or share the Excel/CSV file
3. Or just paste the raw data here

I'll then generate the complete `COMPLETE_DATA_UPDATE.sql` file with all 515 tests ready to run!

## Current Status

- ✅ SQL template created: `COMPLETE_DATA_UPDATE.sql`
- ✅ Server running: http://localhost:3000
- ⏳ Need test data to generate complete SQL
- ⏳ Ready to import once SQL is generated

## Next Step

**Provide the 515 test data in any format, and I'll generate the complete SQL file for you!**
