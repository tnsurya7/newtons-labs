# Complete Database Guide - Newton's Lab

## 📊 Current Status

### ✅ Database: **189 Tests Imported**

| Category | Count |
|----------|-------|
| CLINICAL BIOCHEMISTRY | 178 |
| PACKAGES | 10 |
| PATHOLOGY | 1 |
| **TOTAL** | **189** |

---

## 🎯 Quick Actions

### 1️⃣ Check Database Status
```bash
node check-database-count.js
```
Shows:
- Total tests in database
- Tests by category
- Sample tests
- Saves `existing-tests.json`

### 2️⃣ Add More Tests

**Step A:** Add tests to `all-515-tests-data.txt`
```
TestName|Price|SampleType|TAT|Category
```

**Step B:** Generate SQL for new tests only
```bash
node generate-remaining-tests.js
```
Creates: `ADD_REMAINING_TESTS.sql`

**Step C:** Run in Supabase SQL Editor
- Copy `ADD_REMAINING_TESTS.sql`
- Paste in Supabase SQL Editor
- Click "Run"

### 3️⃣ Replace All Tests (Fresh Import)
```bash
node generate-all-515-tests.js
```
Creates: `FINAL_515_TESTS_IMPORT.sql`
- ⚠️ This TRUNCATES (deletes) all existing tests
- Then imports all tests from data file

---

## 📁 File Structure

### Data Files
- **all-515-tests-data.txt** - Source data (add new tests here)
- **existing-tests.json** - Current DB tests (auto-generated)
- **final-515-tests.json** - Parsed test data (auto-generated)
- **missing-tests.json** - Tests not in DB (auto-generated)

### SQL Files
- **FINAL_515_TESTS_IMPORT.sql** - Complete import (replaces all)
- **ADD_REMAINING_TESTS.sql** - Only new tests (incremental)
- **CHECK_DATABASE_QUERIES.sql** - Useful queries to run

### Scripts
- **check-database-count.js** - Check current database
- **generate-remaining-tests.js** - Generate SQL for missing tests
- **generate-all-515-tests.js** - Generate complete import SQL

---

## 🔧 How to Add More Tests

### Example: You want to add 326 more tests (to reach 515 total)

**Step 1:** Prepare your data
Open `all-515-tests-data.txt` and add:
```
Complete Blood Count|299|Blood|6 hours|PATHOLOGY
Liver Function Test|450|Serum|12 hours|CLINICAL BIOCHEMISTRY
Kidney Function Test|400|Serum|12 hours|CLINICAL BIOCHEMISTRY
Diabetes Screening Package|999|Blood|24 hours|PACKAGES
... (add all 326 tests)
```

**Format Rules:**
- Pipe-separated values: `|`
- 5 fields: Name | Price | Sample Type | TAT | Category
- No quotes needed
- One test per line

**Step 2:** Generate SQL
```bash
node generate-remaining-tests.js
```

**Output:**
```
✅ Database has 189 tests
📄 Data file has 515 lines
🔍 Missing from database: 326

✅ SQL file generated: ADD_REMAINING_TESTS.sql
```

**Step 3:** Import to Supabase
1. Open Supabase Dashboard
2. Go to SQL Editor
3. Copy content from `ADD_REMAINING_TESTS.sql`
4. Paste and click "Run"
5. Wait for success message

**Step 4:** Verify
```bash
node check-database-count.js
```

Should show: **515 tests**

---

## 🗄️ Database Schema

```sql
CREATE TABLE tests (
  id TEXT PRIMARY KEY,              -- 'test-1', 'test-2', etc.
  name VARCHAR(255) NOT NULL,       -- Test name
  price DECIMAL(10, 2) NOT NULL,    -- Current price (70% off)
  original_price DECIMAL(10, 2),    -- Original price
  discount INTEGER DEFAULT 0,        -- Discount % (70)
  parameters INTEGER DEFAULT 0,      -- Number of parameters
  report_time VARCHAR(50),          -- TAT
  fasting_required BOOLEAN,         -- Fasting flag
  description TEXT,                 -- Optional description
  category VARCHAR(100),            -- Test category
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

---

## 📝 Data Format Details

### Test Name
- Any text
- Single quotes will be escaped automatically
- Example: `Glucose - Fasting`

### Price
- Number only (no ₹ symbol)
- Will be used to calculate original_price
- Formula: `original_price = price / 0.3` (70% discount)
- Example: `299` → original_price: `997`

### Sample Type
- Can be empty (leave blank between pipes)
- Examples: `Blood`, `Serum`, `Urine`, `Plasma`

### TAT (Turn Around Time)
- Any text format
- Examples: `6 hours`, `1 Days 0 hr 0 min`, `24 hours`

### Category
- Recommended categories:
  - `CLINICAL BIOCHEMISTRY`
  - `PATHOLOGY`
  - `PACKAGES`
  - `RADIOLOGY`
  - `MICROBIOLOGY`
  - `HEMATOLOGY`
  - `IMMUNOLOGY`

---

## 🔍 Useful Supabase Queries

### Check Total Count
```sql
SELECT COUNT(*) as total_tests FROM tests;
```

### Tests by Category
```sql
SELECT category, COUNT(*) as count 
FROM tests 
GROUP BY category 
ORDER BY count DESC;
```

### Search for a Test
```sql
SELECT * FROM tests 
WHERE name ILIKE '%glucose%';
```

### Most Expensive Tests
```sql
SELECT name, category, price 
FROM tests 
ORDER BY price DESC 
LIMIT 10;
```

### All Packages
```sql
SELECT name, price, parameters 
FROM tests 
WHERE category = 'PACKAGES'
ORDER BY price DESC;
```

**More queries:** See `CHECK_DATABASE_QUERIES.sql`

---

## 🌐 Verify on Website

After importing, check your website:

**URL:** http://localhost:3000

**What to check:**
- Home page shows tests
- Search works
- Test cards display correctly
- Prices show with discount
- Categories filter works

---

## ⚠️ Important Notes

### About Test IDs
- Format: `test-1`, `test-2`, `test-3`, etc.
- Sequential numbering
- If you delete and re-import, IDs restart from `test-1`

### About Pricing
- All tests get 70% discount automatically
- `price` = what customer pays
- `original_price` = calculated as `price / 0.3`
- `discount` = always 70

### About Fasting
- Auto-detected from test name
- Tests with "fasting" or "glucose - fasting" in name
- Set to `true` automatically

### About Parameters
- PACKAGES: Random 20-60
- Tests with "profile" or "panel": Random 5-15
- Other tests: 1

### About Duplicates
- Script automatically removes duplicates
- Based on test name (case-insensitive)
- First occurrence is kept

---

## 🆘 Troubleshooting

### Error: Column 'fasting' does not exist
**Fix:** Use `fasting_required` (already fixed in scripts)

### Error: Cannot find module
**Fix:** Make sure you're in the `newtons-lab` directory
```bash
cd newtons-lab
node check-database-count.js
```

### No tests showing on website
**Checks:**
1. Run `node check-database-count.js` - Are tests in DB?
2. Check `.env.local` - Are Supabase credentials correct?
3. Restart dev server: `npm run dev`
4. Check browser console for errors

### Script shows 0 missing tests but I added more
**Fix:** Make sure you saved `all-515-tests-data.txt` after editing

---

## 📞 Quick Reference

| Task | Command |
|------|---------|
| Check DB status | `node check-database-count.js` |
| Add new tests | `node generate-remaining-tests.js` |
| Replace all tests | `node generate-all-515-tests.js` |
| Start dev server | `npm run dev` |
| View website | http://localhost:3000 |

---

**Last Updated:** ${new Date().toISOString()}
