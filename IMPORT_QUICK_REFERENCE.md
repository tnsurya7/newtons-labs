# 🚀 Quick Import Reference

## One-Minute Import

### 1️⃣ Open Supabase
https://supabase.com/dashboard → Your Project → SQL Editor

### 2️⃣ Copy SQL File
Open: `supabase-data-import.sql`
Copy: All content (Ctrl+A, Ctrl+C)

### 3️⃣ Run
Paste in SQL Editor → Click "Run" → Wait 10 seconds → Done! ✅

---

## What You Get

✅ **508 Unique Tests** - No duplicates, correct MRP pricing
✅ **8 Packages** - Health packages with features
✅ **7 Categories** - Organized by test type
✅ **Clean Data** - All active, properly formatted

---

## Data Summary

**Tests**: 508 (removed 6 duplicates)
- CLINICAL BIOCHEMISTRY: 221 tests
- IMMUNOLOGY: 163 tests
- PATHOLOGY: 44 tests
- CLINICAL MICROBIOLOGY: 38 tests
- CLINICAL PATHOLOGY: 17 tests
- MOLECULAR BIOLOGY: 15 tests
- PACKAGES: 10 tests

**Packages**: 8
- New 69, 79, 89
- New 99 Male/Female
- Anaemia, Thyroid, Fever screens

---

## File to Use

📄 **`supabase-data-import.sql`** (57.57 KB, 564 lines)

Located in project root folder

---

## Verification

After import, SQL will show:
```
total_tests: 508
total_packages: 8
```

Plus sample data and category breakdown.

---

## Duplicates Removed

6 duplicate test names were removed:
- Dual Marker With Graph (2x)
- Quad Marker With Graph (2x)
- Triple Marker With Graph (2x)
- Arthiritis Basic Screen (2x)
- Coombs Test - Indirect (2x)
- Prothrombin Time (PT) (2x)

---

## Troubleshooting

**Problem**: "relation does not exist"
**Fix**: Run `supabase/schema.sql` first

**Problem**: "duplicate key"
**Fix**: SQL already includes DELETE statements, just re-run

**Problem**: Timeout
**Fix**: SQL method doesn't timeout (only 10 seconds)

---

## Need More Help?

📖 See: `FINAL_DATA_IMPORT_READY.md` for detailed information

---

## That's It!

Three steps, 10 seconds, 516 records imported. 🎉
