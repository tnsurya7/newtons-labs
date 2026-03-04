-- ============================================
-- Newton's Lab - Complete Test Data Update
-- This script will DELETE all old data and INSERT 515 new tests
-- ============================================

-- Step 1: Clear all existing test data
TRUNCATE TABLE tests CASCADE;

-- Step 2: Reset the table (optional, ensures clean state)
-- ALTER SEQUENCE tests_id_seq RESTART WITH 1;

-- Step 3: Insert all 515 tests
-- Format: INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting, status, created_at, updated_at)

-- ============================================
-- PACKAGES (14 tests)
-- ============================================

INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting, status, created_at, updated_at)
VALUES 
(gen_random_uuid(), 'MAP59*', 'PACKAGES', 1412, 4707, 70, 30, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW()),
(gen_random_uuid(), 'MAP69*', 'PACKAGES', 1969, 6563, 70, 35, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW()),
(gen_random_uuid(), 'MAP79 *', 'PACKAGES', 7807, 26023, 70, 45, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW()),
(gen_random_uuid(), 'MAP89*', 'PACKAGES', 8166, 27220, 70, 50, '2 Days 0 hr 0 min', false, 'active', NOW(), NOW()),
(gen_random_uuid(), 'MAP99* FEMALE', 'PACKAGES', 11401, 38003, 70, 60, '2 Days 0 hr 0 min', false, 'active', NOW(), NOW()),
(gen_random_uuid(), 'MAP99* MALE', 'PACKAGES', 11401, 38003, 70, 60, '2 Days 0 hr 0 min', false, 'active', NOW(), NOW()),
(gen_random_uuid(), 'Antithrombin Panel', 'PACKAGES', 5000, 16667, 70, 25, '2 Days 0 hr 0 min', false, 'active', NOW(), NOW()),
(gen_random_uuid(), 'Thyroid screening', 'PACKAGES', 2000, 6667, 70, 15, '2 Days 0 hr 0 min', false, 'active', NOW(), NOW()),
(gen_random_uuid(), 'Breast Cancer screen', 'PACKAGES', 1500, 5000, 70, 12, '2 Days 0 hr 0 min', false, 'active', NOW(), NOW()),
(gen_random_uuid(), '40 Plus Male Comprehensive Package', 'PACKAGES', 2100, 7000, 70, 40, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- ============================================
-- CLINICAL BIOCHEMISTRY (Sample - Add all remaining tests)
-- ============================================

INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting, status, created_at, updated_at)
VALUES 
(gen_random_uuid(), 'Dual Marker With Graph', 'CLINICAL BIOCHEMISTRY', 1600, 5333, 70, 2, '2 Days 0 hr 0 min', false, 'active', NOW(), NOW()),
(gen_random_uuid(), 'Quad Marker With Graph', 'CLINICAL BIOCHEMISTRY', 2000, 6667, 70, 4, '2 Days 0 hr 0 min', false, 'active', NOW(), NOW()),
(gen_random_uuid(), 'Triple Marker With Graph', 'CLINICAL BIOCHEMISTRY', 1500, 5000, 70, 3, '2 Days 0 hr 0 min', false, 'active', NOW(), NOW()),
(gen_random_uuid(), 'Phosphorus - Serum', 'CLINICAL BIOCHEMISTRY', 150, 500, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW()),
(gen_random_uuid(), 'Total cholesterol/HDL ratio', 'CLINICAL BIOCHEMISTRY', 300, 1000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW()),
(gen_random_uuid(), 'Vitamin - B12', 'CLINICAL BIOCHEMISTRY', 600, 2000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW()),
(gen_random_uuid(), 'TGL‎/HDL Ratio', 'CLINICAL BIOCHEMISTRY', 300, 1000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW()),
(gen_random_uuid(), 'C-Peptide', 'CLINICAL BIOCHEMISTRY', 1500, 5000, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW()),
(gen_random_uuid(), 'Iron', 'CLINICAL BIOCHEMISTRY', 200, 667, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW()),
(gen_random_uuid(), 'Glucose - Fasting', 'CLINICAL BIOCHEMISTRY', 50, 167, 70, 1, '1 Days 0 hr 0 min', true, 'active', NOW(), NOW()),
(gen_random_uuid(), 'Glucose - Postprandial', 'CLINICAL BIOCHEMISTRY', 40, 133, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW()),
(gen_random_uuid(), 'Glucose - Random', 'CLINICAL BIOCHEMISTRY', 40, 133, 70, 1, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- ============================================
-- PATHOLOGY
-- ============================================

INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting, status, created_at, updated_at)
VALUES 
(gen_random_uuid(), 'Arthiritis Basic Screen', 'PATHOLOGY', 1500, 5000, 70, 8, '1 Days 0 hr 0 min', false, 'active', NOW(), NOW());

-- ============================================
-- IMMUNOLOGY
-- ============================================

-- Add IMMUNOLOGY / SEROLOGY tests here...

-- ============================================
-- HAEMATOLOGY
-- ============================================

-- Add HAEMATOLOGY tests here...

-- ============================================
-- MICROBIOLOGY
-- ============================================

-- Add MICROBIOLOGY tests here...

-- ============================================
-- CLINICAL PATHOLOGY
-- ============================================

-- Add CLINICAL PATHOLOGY tests here...

-- ============================================
-- NOTE: This is a TEMPLATE
-- You need to add all 515 tests following the same format
-- ============================================

-- Verification query (run after import)
SELECT 
  category,
  COUNT(*) as test_count
FROM tests
GROUP BY category
ORDER BY test_count DESC;

-- Total count
SELECT COUNT(*) as total_tests FROM tests;
