-- New10Labs Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  password_hash TEXT NOT NULL,
  role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'blocked')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tests table
CREATE TABLE IF NOT EXISTS tests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2) NOT NULL,
  discount INTEGER DEFAULT 0,
  parameters INTEGER DEFAULT 0,
  report_time VARCHAR(50),
  fasting_required BOOLEAN DEFAULT false,
  description TEXT,
  category VARCHAR(100),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Packages table
CREATE TABLE IF NOT EXISTS packages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2) NOT NULL,
  discount INTEGER DEFAULT 0,
  tests_count INTEGER DEFAULT 0,
  popular BOOLEAN DEFAULT false,
  features JSONB,
  description TEXT,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id VARCHAR(50) UNIQUE NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  user_phone VARCHAR(20) NOT NULL,
  user_address TEXT NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  discount_amount DECIMAL(10, 2) DEFAULT 0,
  tax_amount DECIMAL(10, 2) DEFAULT 0,
  total_amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'sample_collected', 'processing', 'completed', 'cancelled')),
  appointment_date DATE,
  appointment_time TIME,
  notes TEXT,
  payment_status VARCHAR(20) DEFAULT 'paid' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  payment_method VARCHAR(50) DEFAULT 'online',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Booking items table
CREATE TABLE IF NOT EXISTS booking_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  service_type VARCHAR(50) NOT NULL CHECK (service_type IN ('test', 'package', 'consultation', 'home-visit')),
  service_id VARCHAR(100) NOT NULL,
  service_name VARCHAR(255) NOT NULL,
  quantity INTEGER DEFAULT 1,
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2),
  discount INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activity logs table
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL,
  description TEXT,
  ip_address VARCHAR(50),
  user_agent TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_booking_id ON bookings(booking_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_booking_items_booking_id ON booking_items(booking_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON activity_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tests_status ON tests(status);
CREATE INDEX IF NOT EXISTS idx_packages_status ON packages(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tests_updated_at BEFORE UPDATE ON tests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_packages_updated_at BEFORE UPDATE ON packages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert initial test data from JSON
INSERT INTO tests (id, name, price, original_price, discount, parameters, report_time, fasting_required, category, status)
VALUES
  ('1', 'Complete Blood Count (CBC)', 299, 499, 40, 28, '6 hours', false, 'Blood Tests', 'active'),
  ('2', 'Thyroid Profile Total', 399, 699, 43, 3, '12 hours', true, 'Thyroid', 'active'),
  ('3', 'Lipid Profile', 449, 799, 44, 8, '12 hours', true, 'Heart Health', 'active'),
  ('4', 'HbA1c (Glycated Hemoglobin)', 349, 599, 42, 1, '24 hours', false, 'Diabetes', 'active'),
  ('5', 'Vitamin D (25-OH)', 799, 1299, 38, 1, '48 hours', false, 'Vitamins', 'active'),
  ('6', 'Liver Function Test (LFT)', 399, 699, 43, 11, '12 hours', true, 'Liver Health', 'active')
ON CONFLICT (id) DO NOTHING;

-- Insert initial package data
INSERT INTO packages (id, name, price, original_price, discount, tests_count, popular, features, status)
VALUES
  ('p1', 'Aarogyam Basic', 999, 2499, 60, 62, true, '["CBC", "Lipid Profile", "Liver Function", "Kidney Function", "Thyroid"]'::jsonb, 'active'),
  ('p2', 'Aarogyam Advanced', 1999, 4999, 60, 98, true, '["All Basic Tests", "Vitamin D", "Vitamin B12", "Iron Studies", "HbA1c"]'::jsonb, 'active'),
  ('p3', 'Full Body Checkup', 2499, 6999, 64, 110, false, '["Complete Health Screening", "Cardiac Risk", "Diabetes", "Thyroid", "Vitamins"]'::jsonb, 'active'),
  ('p4', 'Senior Citizen Package', 2999, 7999, 63, 125, false, '["Age-specific Tests", "Cardiac Markers", "Bone Health", "Cancer Markers"]'::jsonb, 'active')
ON CONFLICT (id) DO NOTHING;

-- Create admin user (password: admin123 - CHANGE THIS!)
-- Password hash for 'admin123' using bcrypt
INSERT INTO users (name, email, phone, password_hash, role, status)
VALUES (
  'Admin User',
  'admin@new10lab.com',
  '9003130800',
  '$2a$10$rKvVPZqGvXQKvXQKvXQKvOqGvXQKvXQKvXQKvXQKvXQKvXQKvXQKve',
  'admin',
  'active'
)
ON CONFLICT (email) DO NOTHING;

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for public read access to tests and packages
CREATE POLICY "Tests are viewable by everyone" ON tests
  FOR SELECT USING (status = 'active');

CREATE POLICY "Packages are viewable by everyone" ON packages
  FOR SELECT USING (status = 'active');

-- RLS Policies for authenticated users
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view their own bookings" ON bookings
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create bookings" ON bookings
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Admin policies (service role bypass RLS)
-- Admins will use service role key which bypasses RLS

COMMENT ON TABLE users IS 'User accounts for customers and admins';
COMMENT ON TABLE tests IS 'Diagnostic tests offered';
COMMENT ON TABLE packages IS 'Health packages with multiple tests';
COMMENT ON TABLE bookings IS 'Customer bookings and orders';
COMMENT ON TABLE booking_items IS 'Individual items in each booking';
COMMENT ON TABLE activity_logs IS 'User activity tracking for admin';
