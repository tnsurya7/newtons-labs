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
    // Try to get booking from sessionStorage first (for immediate redirect after booking)
    const storedBooking = sessionStorage.getItem(`booking_${bookingId}`);
    if (storedBooking) {
      try {
        const parsedBooking = JSON.parse(storedBooking);
        setBooking(parsedBooking);
        setLoading(false);
        return;
      } catch (e) {
        console.error('Error parsing stored booking:', e);
      }
    }
    
    // If not in storage, show error
    setBooking(null);
    setLoading(false);
  }, [bookingId]);

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

        {/* Payment Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-200 dark:border-orange-800 rounded-2xl p-4 mb-6"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/40 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">💳</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900 dark:text-white mb-2">
                Payment: Pay on Service
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                No payment required now. Our team will call you to confirm your booking and discuss payment options.
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 mt-2">
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                  📞 Contact: 9003130800
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  You can also call us to confirm your booking and make payment arrangements
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Email Confirmation Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
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
                  Status: <span className="text-orange-600 font-semibold">PENDING PAYMENT</span>
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
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Payment & Terms:</h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• <strong>Payment:</strong> Pay on service - Our team will call you to confirm and discuss payment options</li>
              <li>• <strong>Payment Methods:</strong> Cash, UPI, Card (during consultation call or at service time)</li>
              <li>• Sample collection within 24 hours of booking confirmation</li>
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
              <div>
                <p className="text-gray-700 dark:text-gray-300 font-semibold mb-1">
                  We'll Call You (Within 2 Hours)
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Our team will call you at <strong>{booking.user_phone}</strong> to confirm your booking, discuss payment options, and schedule the sample collection time.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                2
              </div>
              <div>
                <p className="text-gray-700 dark:text-gray-300 font-semibold mb-1">
                  Confirm Payment Method
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  During the call, you can choose to pay via UPI, Card, or Cash. You can also pay when our phlebotomist arrives.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                3
              </div>
              <div>
                <p className="text-gray-700 dark:text-gray-300 font-semibold mb-1">
                  Sample Collection at Your Doorstep
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  A trained phlebotomist will visit your address at the scheduled time for safe and hygienic sample collection.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                4
              </div>
              <div>
                <p className="text-gray-700 dark:text-gray-300 font-semibold mb-1">
                  Get Your Reports
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Reports will be available within 24-48 hours via email at <strong>{booking.user_email}</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Contact Card */}
          <div className="mt-4 bg-white dark:bg-gray-800 rounded-xl p-4 border-2 border-blue-200 dark:border-blue-800">
            <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Need to talk to us now?
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <a 
                href="tel:9003130800" 
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
              >
                <span className="text-xl">📞</span>
                <span>9003130800</span>
              </a>
              <a 
                href="mailto:support@new10lab.com" 
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
              >
                <span className="text-xl">✉️</span>
                <span>support@new10lab.com</span>
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
