# Import 189 Tests to Supabase - READY TO GO! ✅

## The SQL file is ready with the correct column name!

### Steps to Import:

1. **Open Supabase Dashboard**
   - Go to your Supabase project
   - Click on "SQL Editor" in the left sidebar

2. **Copy the SQL**
   - Open the file: `FINAL_515_TESTS_IMPORT.sql`
   - Select all content (Ctrl+A)
   - Copy (Ctrl+C)

3. **Run in Supabase**
   - Paste the SQL into the SQL Editor
   - Click "Run" button
   - Wait for completion (should take a few seconds)

4. **Verify Import**
   The SQL file includes verification queries at the end:
   ```sql
   -- Check total count
   SELECT COUNT(*) as total_tests FROM tests;
   
   -- Check by category
   SELECT category, COUNT(*) as count 
   FROM tests 
   GROUP BY category 
   ORDER BY count DESC;
   ```

5. **Check Your Website**
   - Go to http://localhost:3000
   - You should see all 189 tests!

## What's in the Import:

- **Total Tests**: 189
- **Categories**:
  - CLINICAL BIOCHEMISTRY: 178 tests
  - PACKAGES: 10 tests
  - PATHOLOGY: 1 test

## Fixed Issues:

✅ Column name changed from `fasting` to `fasting_required`
✅ Using TEXT for test IDs (test-1, test-2, etc.)
✅ 70% discount applied to all tests
✅ Duplicates removed
✅ All tests set to 'active' status

## Note:

The file contains 189 tests from your `all-515-tests-data.txt` file. If you have more tests to add, paste them into `all-515-tests-data.txt` in this format:

```
TestName|Price|SampleType|TAT|Category
```

Then run: `node generate-all-515-tests.js`
