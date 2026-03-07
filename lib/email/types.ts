// Shared email types
export interface BookingItem {
  id?: string;
  name?: string;
  service_name?: string;
  service_type?: string;
  quantity?: number;
  price: number;
  type?: string;
  category?: string;
  parameters?: number;
  reportTime?: string;
}

export interface BookingWithItems {
  booking_id: string;
  user_email: string;
  user_name: string;
  user_phone: string;
  user_address?: string;
  items: BookingItem[];
  total_amount: number;
  subtotal?: number;
  discount_amount?: number;
  tax_amount?: number;
  booking_date?: string;
  created_at?: string;
  status?: string;
  address?: string;
  id?: string;
}
