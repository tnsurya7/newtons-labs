# Quick Reference - Database Management

## 📊 Current Status
- **Tests in Database:** 189
- **Tests in Data File:** 189
- **Missing:** 0 (All imported ✅)

---

## 🚀 Common Tasks

### Check Database
```bash
node check-database-count.js
```

### Add More Tests
1. Edit `all-515-tests-data.txt`
2. Add: `TestName|Price|SampleType|TAT|Category`
3. Run: `node generate-remaining-tests.js`
4. Copy `ADD_REMAINING_TESTS.sql` to Supabase
5. Run in SQL Editor

### Replace All Tests
```bash
node generate-all-515-tests.js
```
Then copy `FINAL_515_TESTS_IMPORT.sql` to Supabase

---

## 📝 Data Format

```
TestName|Price|SampleType|TAT|Category
```

**Example:**
```
Complete Blood Count|299|Blood|6 hours|PATHOLOGY
Liver Function Test|450|Serum|12 hours|CLINICAL BIOCHEMISTRY
```

---

## 🔍 Supabase Queries

### Total Count
```sql
SELECT COUNT(*) FROM tests;
```

### By Category
```sql
SELECT category, COUNT(*) 
FROM tests 
GROUP BY category;
```

### Search
```sql
SELECT * FROM tests 
WHERE name ILIKE '%glucose%';
```

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `all-515-tests-data.txt` | Source data (edit here) |
| `FINAL_515_TESTS_IMPORT.sql` | Complete import |
| `ADD_REMAINING_TESTS.sql` | Only new tests |
| `CHECK_DATABASE_QUERIES.sql` | Useful queries |
| `existing-tests.json` | Current DB tests |

---

## 🌐 Website

**URL:** http://localhost:3000

**Start Server:**
```bash
npm run dev
```

---

## 📚 Full Documentation

- `COMPLETE_DATABASE_GUIDE.md` - Complete guide
- `DATABASE_STATUS.md` - Current status
- `IMPORT_INSTRUCTIONS.md` - Import steps
- `DATABASE_SUMMARY.txt` - Visual summary

---

## ⚡ Quick Commands

```bash
# Check database
node check-database-count.js

# Generate SQL for new tests
node generate-remaining-tests.js

# Generate complete import
node generate-all-515-tests.js

# Start dev server
npm run dev
```

---

**Need to add 326 more tests to reach 515 total!**
