-- ============================================
-- Database Status Check Queries
-- Run these in Supabase SQL Editor
-- ============================================

-- 1. Total count of tests
SELECT COUNT(*) as total_tests FROM tests;

-- 2. Tests by category
SELECT 
  category, 
  COUNT(*) as count,
  ROUND(AVG(price), 2) as avg_price,
  MIN(price) as min_price,
  MAX(price) as max_price
FROM tests 
GROUP BY category 
ORDER BY count DESC;

-- 3. Tests by status
SELECT 
  status, 
  COUNT(*) as count 
FROM tests 
GROUP BY status;

-- 4. Price range distribution
SELECT 
  CASE 
    WHEN price < 100 THEN 'Under ₹100'
    WHEN price < 500 THEN '₹100-500'
    WHEN price < 1000 THEN '₹500-1000'
    WHEN price < 2000 THEN '₹1000-2000'
    ELSE 'Over ₹2000'
  END as price_range,
  COUNT(*) as count
FROM tests
GROUP BY price_range
ORDER BY MIN(price);

-- 5. Fasting required tests
SELECT 
  fasting_required,
  COUNT(*) as count
FROM tests
GROUP BY fasting_required;

-- 6. Sample of tests (first 10)
SELECT 
  id,
  name,
  category,
  price,
  original_price,
  discount,
  parameters,
  report_time,
  fasting_required
FROM tests 
ORDER BY id
LIMIT 10;

-- 7. Most expensive tests
SELECT 
  name,
  category,
  price,
  original_price,
  discount
FROM tests 
ORDER BY price DESC
LIMIT 10;

-- 8. Cheapest tests
SELECT 
  name,
  category,
  price,
  original_price,
  discount
FROM tests 
ORDER BY price ASC
LIMIT 10;

-- 9. Tests with most parameters
SELECT 
  name,
  category,
  parameters,
  price
FROM tests 
ORDER BY parameters DESC
LIMIT 10;

-- 10. Check for duplicates (should return 0 rows)
SELECT 
  name, 
  COUNT(*) as count 
FROM tests 
GROUP BY name 
HAVING COUNT(*) > 1;

-- 11. Recent tests (by created_at)
SELECT 
  id,
  name,
  category,
  price,
  created_at
FROM tests 
ORDER BY created_at DESC
LIMIT 10;

-- 12. Tests by report time
SELECT 
  report_time,
  COUNT(*) as count
FROM tests
GROUP BY report_time
ORDER BY count DESC
LIMIT 10;

-- 13. Package tests (usually have more parameters)
SELECT 
  name,
  price,
  parameters,
  report_time
FROM tests
WHERE category = 'PACKAGES'
ORDER BY price DESC;

-- 14. Clinical Biochemistry tests
SELECT 
  COUNT(*) as total,
  ROUND(AVG(price), 2) as avg_price,
  MIN(price) as min_price,
  MAX(price) as max_price
FROM tests
WHERE category = 'CLINICAL BIOCHEMISTRY';

-- 15. Full database summary
SELECT 
  'Total Tests' as metric,
  COUNT(*)::text as value
FROM tests
UNION ALL
SELECT 
  'Total Categories',
  COUNT(DISTINCT category)::text
FROM tests
UNION ALL
SELECT 
  'Average Price',
  '₹' || ROUND(AVG(price), 2)::text
FROM tests
UNION ALL
SELECT 
  'Total Revenue Potential',
  '₹' || SUM(price)::text
FROM tests
UNION ALL
SELECT 
  'Active Tests',
  COUNT(*)::text
FROM tests
WHERE status = 'active';
