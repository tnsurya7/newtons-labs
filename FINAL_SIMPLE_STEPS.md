# FINAL SIMPLE STEPS - Generate SQL for 515 Tests

## What I Created For You:

1. ✅ `PASTE_YOUR_DATA_HERE.txt` - Empty file where you paste your data
2. ✅ `generate-from-file.js` - Script that reads the file and generates SQL

## What You Do Now (3 Simple Steps):

### Step 1: Paste Your Data
1. Open `PASTE_YOUR_DATA_HERE.txt`
2. Delete everything in it
3. Paste ALL your 515 tests in this format:
   ```
   TestName|Price|SampleType|TAT|Category
   ```
4. Save the file

### Step 2: Run the Script
Open terminal in `newtons-lab` folder and run:
```bash
node generate-from-file.js
```

This will create `FINAL_515_TESTS_IMPORT.sql` with all your tests!

### Step 3: Import to Supabase
1. Open your Supabase project
2. Click "SQL Editor" in left menu
3. Click "New query"
4. Open the generated file `FINAL_515_TESTS_IMPORT.sql`
5. Copy ALL the SQL
6. Paste into Supabase SQL Editor
7. Click "Run" or press Ctrl+Enter

**DONE!** Your database now has all 515 tests!

## Your Data Format

From your message, convert to pipe-separated:
```
Dual Marker With Graph|1600||2 Days 0 hr 0 min|CLINICAL BIOCHEMISTRY
Quad Marker With Graph|2000||2 Days 0 hr 0 min|CLINICAL BIOCHEMISTRY
Vitamin - B12|600|SERUM|1 Days 0 hr 0 min|CLINICAL BIOCHEMISTRY
... (all 515 tests)
Hepatitis D Virus (HDV) IgM antobodies|1800|Serum|-|IMMUNOLOGY / SEROLOGY
```

## What the SQL Does:
1. Deletes all old tests: `TRUNCATE TABLE tests CASCADE;`
2. Inserts all 515 new tests with proper pricing, categories, etc.
3. Includes verification queries to check the import

## After Import:
- Visit http://localhost:3000
- All 515 tests will show on the website!
- Search, filter, and browse will work with the new data

## Need Help?
If you have trouble pasting the data, just let me know and I can help format it!
