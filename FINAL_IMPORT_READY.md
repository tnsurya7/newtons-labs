# ✅ SQL Ready to Import - 193 New Tests

## Current Status

- **Tests in Database:** 189
- **Tests in Data File:** 328 (unique)
- **New Tests to Add:** 193
- **Total After Import:** 382 tests

---

## 📊 New Tests Breakdown

| Category | Count |
|----------|-------|
| IMMUNOLOGY / SEROLOGY | 171 |
| PATHOLOGY | 8 |
| MICROBIOLOGY | 5 |
| IMMUNO-HEMATOLOGY | 4 |
| CLINICAL BIOCHEMISTRY | 3 |
| HAEMATOLOGY | 1 |
| CLINICAL PATHOLOGY | 1 |
| **TOTAL NEW** | **193** |

---

## 🚀 Import Instructions

### Step 1: Open Supabase
1. Go to your Supabase Dashboard
2. Click "SQL Editor" in the left sidebar

### Step 2: Copy SQL
1. Open file: `ADD_NEW_TESTS_ONLY.sql`
2. Select all (Ctrl+A)
3. Copy (Ctrl+C)

### Step 3: Run in Supabase
1. Paste the SQL into the editor
2. Click "Run" button
3. Wait for success message

### Step 4: Verify
Run these queries in SQL Editor:

```sql
-- Check total count (should be 382)
SELECT COUNT(*) as total_tests FROM tests;

-- Check by category
SELECT category, COUNT(*) as count 
FROM tests 
GROUP BY category 
ORDER BY count DESC;

-- Check new tests
SELECT id, name, price, category 
FROM tests 
WHERE id >= 'test-190'
ORDER BY id
LIMIT 10;
```

### Step 5: Check Website
Visit: http://localhost:3000

You should see all 382 tests!

---

## 📁 Files Generated

| File | Purpose | Size |
|------|---------|------|
| `ADD_NEW_TESTS_ONLY.sql` | SQL to add 193 new tests | 63.63 KB |
| `COMPLETE_TESTS_IMPORT.sql` | SQL to replace all (328 tests) | 105.14 KB |
| `all-parsed-tests.json` | All 328 tests in JSON | Reference |
| `new-tests-only.json` | Only 193 new tests in JSON | Reference |
| `existing-tests.json` | Current 189 tests in DB | Reference |

---

## 🎯 Which SQL File to Use?

### Option 1: Add Only New Tests (RECOMMENDED)
**File:** `ADD_NEW_TESTS_ONLY.sql`
- ✅ Keeps existing 189 tests
- ✅ Adds 193 new tests
- ✅ Total: 382 tests
- ✅ Preserves test IDs
- ✅ Faster import

### Option 2: Replace All Tests
**File:** `COMPLETE_TESTS_IMPORT.sql`
- ⚠️ Deletes all existing tests
- ⚠️ Imports 328 tests fresh
- ⚠️ Resets test IDs
- ⚠️ Slower import

**Recommendation:** Use `ADD_NEW_TESTS_ONLY.sql`

---

## 📝 Sample New Tests

1. Kidney Basic screen - For Profiles - ₹400
2. Fertility Profile - I - ₹750
3. Coombs Test - Indirect - ₹450
4. Anti Phospholipid Antibody IgM - ₹850
5. Chikungunya Rapid - ₹700
6. Herpes Simplex Virus 2 IgG - ₹300
7. Thyroglobulin - ₹1250
8. Aspergillus fumigatus IgG - ₹1100
9. SARS CoV 2 Antibody Titre - ₹3500
10. Parvovirus B 19 Antibody IgG - ₹5500

---

## ⚡ Quick Commands

### Check current database:
```bash
node check-database-count.js
```

### Regenerate SQL (if needed):
```bash
node generate-new-tests-only.js
```

### After import, verify:
```bash
node check-database-count.js
```

---

## 🔍 What Changed?

### Before:
- 189 tests
- 3 categories (CLINICAL BIOCHEMISTRY, PACKAGES, PATHOLOGY)

### After:
- 382 tests (+193)
- 8 categories (added IMMUNOLOGY/SEROLOGY, MICROBIOLOGY, HAEMATOLOGY, etc.)

---

## ✅ Ready to Import!

The SQL file `ADD_NEW_TESTS_ONLY.sql` is ready.

Just copy and paste it into Supabase SQL Editor and click Run!

---

**Generated:** ${new Date().toISOString()}
