# Ready to Import 515 Tests

## I've created the tools, now here's what to do:

### Option 1: Use the Script (Recommended)

1. **Edit `generate-515-tests-sql.js`**
   - Open the file
   - Replace the `allTestsData` variable with ALL 515 tests from your data
   - Format: `TestName|Price|SampleType|TAT|Category` (one per line)

2. **Run the script**:
   ```bash
   cd newtons-lab
   node generate-515-tests-sql.js
   ```

3. **This will generate**:
   - `FINAL_515_TESTS_IMPORT.sql` - Ready to run SQL file
   - `final-tests-data.json` - JSON backup

4. **Import to Supabase**:
   - Open Supabase SQL Editor
   - Copy content from `FINAL_515_TESTS_IMPORT.sql`
   - Paste and run
   - Done!

### Option 2: Manual SQL (If you prefer)

I can generate the complete SQL file for you right now if you provide the data in a text file or paste it here.

## What the SQL Will Do

1. **DELETE** all old test data: `TRUNCATE TABLE tests CASCADE;`
2. **INSERT** all 515 new tests with:
   - Proper pricing (70% discount calculated)
   - Correct categories
   - Fasting flags
   - Parameters count
   - Report times
   - Sample types

## Current Status

- ✅ Server running: http://localhost:3000
- ✅ Database schema ready
- ✅ API endpoints ready
- ✅ Frontend components ready
- ✅ SQL generator script ready
- ⏳ Need to paste complete 515 test data into script
- ⏳ Run script to generate SQL
- ⏳ Import SQL to Supabase

## Data Format Example

The script expects data in this format:
```
Test Name|MRP|Sample Type|TAT|Department
Vitamin B12|600|SERUM|1 Days 0 hr 0 min|CLINICAL BIOCHEMISTRY
Glucose - Fasting|50|Naf Plasma|1 Days 0 hr 0 min|CLINICAL BIOCHEMISTRY
```

## Need Help?

If you want me to generate the complete SQL directly:
1. Provide all 515 tests in any text format
2. I'll generate the complete SQL file
3. You just copy-paste and run in Supabase

The app is ready and waiting for the data!
