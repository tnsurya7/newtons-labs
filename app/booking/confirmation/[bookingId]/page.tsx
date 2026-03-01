'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiDownload, FiPrinter, FiHome, FiMail } from 'react-icons/fi';
import Button from '@/components/ui/Button';
import { BookingWithItems } from '@/lib/supabase/types';

export default function BookingConfirmationPage() {
  const params = useParams();
  const router = useRouter();
  const bookingId = params.bookingId as string;
  
  const [booking, setBooking] = useState<BookingWithItems | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooking();
  }, [bookingId]);

  const fetchBooking = async () => {
    try {
      // Check if it's a mock booking
      if (bookingId.startsWith('BK-')) {
        // Try to fetch from database first
        if (typeof window !== 'undefined') {
          const { supabase } = await import('@/lib/supabase/client');
          
          if (supabase) {
            const { data, error } = await supabase
              .from('bookings')
              .select(`
                *,
                items:booking_items(*)
              `)
              .eq('booking_id', bookingId)
              .single();

            if (!error && data) {
              setBooking(data as any);
              setLoading(false);
              return;
            }
          }
        }
        
        // If database fetch fails or not configured, create mock booking
        const mockBooking: any = {
          id: bookingId,
          booking_id: bookingId,
          user_name: 'Test User',
          user_email: 'test@example.com',
          user_phone: '1234567890',
          user_address: 'Test Address',
          subtotal: 1000,
          discount_amount: 100,
          tax_amount: 0,
          total_amount: 900,
          status: 'pending',
          payment_status: 'paid',
          created_at: new Date().toISOString(),
          items: [
            {
              id: '1',
              service_name: 'Sample Test',
              service_type: 'test',
              quantity: 1,
              price: 1000,
            }
          ],
        };
        setBooking(mockBooking);
      }
    } catch (error) {
      console.error('Error fetching booking:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // TODO: Implement PDF download
    alert('PDF download will be implemented soon!');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading booking details...</p>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Booking Not Found</h1>
          <Button onClick={() => router.push('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full mb-4">
            <FiCheckCircle className="text-green-600 dark:text-green-400" size={48} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Thank you for choosing New10Labs
          </p>
        </motion.div>

        {/* Booking ID Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-6 text-white text-center mb-6"
        >
          <p className="text-sm opacity-90 mb-2">BOOKING ID</p>
          <p className="text-3xl font-bold tracking-wider">{booking.booking_id}</p>
        </motion.div>

        {/* Email Confirmation Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-4 mb-6 flex items-start gap-3"
        >
          <FiMail className="text-blue-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <p className="font-semibold text-gray-900 dark:text-white mb-1">
              Confirmation Email Sent
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              We've sent a detailed confirmation to <strong>{booking.user_email}</strong>
            </p>
          </div>
        </motion.div>

        {/* Invoice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-6 print:shadow-none"
          id="invoice"
        >
          {/* Invoice Header */}
          <div className="border-b-2 border-gray-200 dark:border-gray-700 pb-6 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  New10Labs Diagnostic Centre
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  152/3, 6th Avenue, Anna Nagar East<br />
                  Chennai - 600 102<br />
                  Phone: 9003130800<br />
                  Email: support@new10lab.com
                </p>
              </div>
              <div className="text-right">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">INVOICE</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Invoice #: {booking.booking_id}<br />
                  Date: {new Date(booking.created_at).toLocaleDateString()}<br />
                  Status: <span className="text-green-600 font-semibold">PAID</span>
                </p>
              </div>
            </div>
          </div>

          {/* Bill To */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">BILL TO:</h4>
            <p className="text-gray-600 dark:text-gray-400">
              {booking.user_name}<br />
              {booking.user_phone}<br />
              {booking.user_email}<br />
              {booking.user_address}
            </p>
          </div>

          {/* Services Table */}
          <div className="mb-6">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 text-gray-900 dark:text-white">Service</th>
                  <th className="text-center py-3 text-gray-900 dark:text-white">Qty</th>
                  <th className="text-right py-3 text-gray-900 dark:text-white">Price</th>
                  <th className="text-right py-3 text-gray-900 dark:text-white">Amount</th>
                </tr>
              </thead>
              <tbody>
                {booking.items.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 text-gray-900 dark:text-white">
                      {item.service_name}
                      <br />
                      <span className="text-xs text-gray-500">{item.service_type}</span>
                    </td>
                    <td className="py-3 text-center text-gray-600 dark:text-gray-400">{item.quantity}</td>
                    <td className="py-3 text-right text-gray-600 dark:text-gray-400">₹{item.price.toFixed(2)}</td>
                    <td className="py-3 text-right text-gray-900 dark:text-white font-semibold">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="border-t-2 border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex justify-end">
              <div className="w-64">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                  <span className="text-gray-900 dark:text-white font-semibold">₹{booking.subtotal.toFixed(2)}</span>
                </div>
                {booking.discount_amount > 0 && (
                  <div className="flex justify-between py-2">
                    <span className="text-green-600">Discount:</span>
                    <span className="text-green-600 font-semibold">-₹{booking.discount_amount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between py-2">
                  <span className="text-gray-600 dark:text-gray-400">Tax:</span>
                  <span className="text-gray-900 dark:text-white font-semibold">₹{booking.tax_amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-3 border-t-2 border-gray-200 dark:border-gray-700">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">TOTAL:</span>
                  <span className="text-xl font-bold text-blue-600">₹{booking.total_amount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Terms */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Terms & Conditions:</h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Sample collection within 24 hours of booking</li>
              <li>• Reports will be available within specified time frame</li>
              <li>• Fasting required for certain tests as indicated</li>
              <li>• Please keep this invoice for your records</li>
            </ul>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-4 justify-center mb-8 print:hidden"
        >
          <Button onClick={handlePrint} variant="outline" className="gap-2">
            <FiPrinter /> Print Invoice
          </Button>
          <Button onClick={handleDownload} variant="outline" className="gap-2">
            <FiDownload /> Download PDF
          </Button>
          <Button onClick={() => router.push('/')} className="gap-2">
            <FiHome /> Back to Home
          </Button>
        </motion.div>

        {/* What's Next */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-blue-100 to-teal-100 dark:from-blue-900/20 dark:to-teal-900/20 rounded-2xl p-6 print:hidden"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">What Happens Next?</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                1
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Our team will call you within 2 hours to confirm the appointment time
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                2
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                A trained phlebotomist will visit your address for sample collection
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                3
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Reports will be available within 24-48 hours via email
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
