# Quick Verification Guide

## 3 Ways to Verify Database Import

### Method 1: Supabase Dashboard (Easiest) ⭐

1. Open https://supabase.com/dashboard
2. Go to **Table Editor** → **tests** table
3. Check bottom: Should show **"508 rows"**
4. Switch to **packages** table
5. Check: Should show **"8 rows"**

✅ Done! If you see these numbers, import was successful.

---

### Method 2: SQL Queries (Most Accurate)

Open **SQL Editor** in Supabase and run:

```sql
-- Check test count
SELECT COUNT(*) as total_tests FROM tests;
-- Expected: 508

-- Check package count
SELECT COUNT(*) as total_packages FROM packages;
-- Expected: 8

-- Check categories
SELECT category, COUNT(*) as count 
FROM tests 
GROUP BY category 
ORDER BY count DESC;
-- Expected: 7 categories with specific counts

-- Check for duplicates
SELECT name, COUNT(*) as count 
FROM tests 
GROUP BY name 
HAVING COUNT(*) > 1;
-- Expected: No rows (no duplicates)
```

---

### Method 3: Verification Script (Automated)

Run in terminal:
```bash
node verify-database-import.js
```

This checks:
- ✅ Test count (508)
- ✅ Package count (8)
- ✅ Category distribution
- ✅ No duplicates
- ✅ All prices valid
- ✅ Sample data

---

## Expected Results

After successful import:

| Item | Expected Value |
|------|----------------|
| Total Tests | 508 |
| Total Packages | 8 |
| CLINICAL BIOCHEMISTRY | 221 tests |
| IMMUNOLOGY | 163 tests |
| PATHOLOGY | 44 tests |
| CLINICAL MICROBIOLOGY | 38 tests |
| CLINICAL PATHOLOGY | 17 tests |
| MOLECULAR BIOLOGY | 15 tests |
| PACKAGES | 10 tests |
| Duplicates | 0 |
| Tests with no price | 0 |

---

## Quick Checklist

- [ ] Tests table has 508 rows
- [ ] Packages table has 8 rows
- [ ] No duplicate test names
- [ ] All tests have prices > 0
- [ ] 7 categories present
- [ ] Sample tests visible in table

---

## If Something's Wrong

**Problem**: Count is 0 or wrong
**Solution**: Re-run `supabase-data-import.sql`

**Problem**: Duplicates found
**Solution**: Run `DELETE FROM tests;` then re-import

**Problem**: Missing categories
**Solution**: Re-generate SQL with `generate-final-sql.js`

---

## Need Detailed Help?

See: `VERIFY_DATABASE_IMPORT.md` for complete guide
