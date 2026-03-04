-- Newton's Lab - Complete Test Data Import
-- Generated: 2026-03-04T14:07:44.087Z
-- Total Tests: 4

-- Clear existing data
TRUNCATE TABLE tests CASCADE;

-- Insert tests
INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting, status, created_at, updated_at)
VALUES (
  '25492e92-7275-4f69-a025-8869715c4d39',
  'Dual Marker With Graph',
  'CLINICAL BIOCHEMISTRY',
  1600,
  6667,
  76,
  1,
  '2 Days 0 hr 0 min',
  false,
  'active',
  NOW(),
  NOW()
);

INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting, status, created_at, updated_at)
VALUES (
  '165b848e-f278-4aaa-b77a-8d14951fa801',
  'Quad Marker With Graph',
  'CLINICAL BIOCHEMISTRY',
  2000,
  7407,
  73,
  1,
  '2 Days 0 hr 0 min',
  false,
  'active',
  NOW(),
  NOW()
);

INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting, status, created_at, updated_at)
VALUES (
  '6cb87af2-f6f8-426a-9b2c-30bf5c8cb38a',
  'Triple Marker With Graph',
  'CLINICAL BIOCHEMISTRY',
  1500,
  7895,
  81,
  1,
  '2 Days 0 hr 0 min',
  false,
  'active',
  NOW(),
  NOW()
);

INSERT INTO tests (id, name, category, price, original_price, discount, parameters, report_time, fasting, status, created_at, updated_at)
VALUES (
  'e7030511-4fe7-4581-91cf-8c3f349300a4',
  'Arthiritis Basic Screen',
  'PATHOLOGY',
  1500,
  10714,
  86,
  1,
  '1 Days 0 hr 0 min',
  false,
  'active',
  NOW(),
  NOW()
);

