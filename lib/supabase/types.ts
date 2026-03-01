export interface User {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  password_hash: string;
  role: 'user' | 'admin';
  status: 'active' | 'blocked';
  created_at: string;
  updated_at: string;
}

export interface Test {
  id: string;
  name: string;
  price: number;
  original_price: number;
  discount: number;
  parameters: number;
  report_time: string;
  fasting_required: boolean;
  description: string | null;
  category: string | null;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface Package {
  id: string;
  name: string;
  price: number;
  original_price: number;
  discount: number;
  tests_count: number;
  popular: boolean;
  features: string[];
  description: string | null;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  booking_id: string;
  user_id: string;
  user_name: string;
  user_email: string;
  user_phone: string;
  user_address: string;
  subtotal: number;
  discount_amount: number;
  tax_amount: number;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'sample_collected' | 'processing' | 'completed' | 'cancelled';
  appointment_date: string | null;
  appointment_time: string | null;
  notes: string | null;
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  payment_method: string;
  created_at: string;
  updated_at: string;
}

export interface BookingItem {
  id: string;
  booking_id: string;
  service_type: 'test' | 'package' | 'consultation' | 'home-visit';
  service_id: string;
  service_name: string;
  quantity: number;
  price: number;
  original_price: number | null;
  discount: number;
  created_at: string;
}

export interface ActivityLog {
  id: string;
  user_id: string | null;
  action: string;
  description: string | null;
  ip_address: string | null;
  user_agent: string | null;
  metadata: Record<string, any> | null;
  created_at: string;
}

export interface BookingWithItems extends Booking {
  items: BookingItem[];
}
