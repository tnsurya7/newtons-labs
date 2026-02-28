'use client';

import { motion } from 'framer-motion';
import { FiTrash2, FiShoppingCart, FiArrowLeft, FiCheck } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cart';
import { useAuthStore } from '@/store/auth';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import CheckoutModal from '@/components/modals/CheckoutModal';
import { formatPrice } from '@/lib/utils';
import { useState, useEffect } from 'react';

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, clearCart, totalItems } = useCartStore();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push('/login');
    }
  }, [mounted, isAuthenticated, router]);

  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const discount = Math.floor(subtotal * 0.1); // 10% discount
  const total = subtotal - discount;

  const handleCheckout = () => {
    setShowCheckoutForm(true);
  };

  const handleCheckoutSubmit = async (data: { name: string; phone: string; address: string }) => {
    try {
      const response = await fetch('/api/booking/home-visit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          items: items.map(item => ({ id: item.id, name: item.name, price: item.price })),
          total,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setShowCheckoutForm(false);
        setShowCheckoutModal(true);
        setTimeout(() => {
          clearCart();
          router.push('/');
        }, 3000);
      }
    } catch (error) {
      alert('Checkout failed. Please try again.');
    }
  };

  if (showCheckoutModal) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-teal-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheck size={48} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
            Order Placed Successfully!
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
            Thank you for choosing Newton Labs
          </p>
          <p className="text-gray-500 dark:text-gray-500">
            Redirecting to home...
          </p>
        </motion.div>
      </div>
    );
  }

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <FiArrowLeft size={24} />
              <span className="font-medium">Continue Shopping</span>
            </button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Shopping Cart
            </h1>
            <div className="w-32" /> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {totalItems === 0 ? (
          // Empty Cart
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-32 h-32 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiShoppingCart size={64} className="text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Your Cart is Empty
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Add tests and packages to get started
            </p>
            <Button onClick={() => router.push('/')} size="lg">
              Browse Tests & Packages
            </Button>
          </motion.div>
        ) : (
          // Cart with Items
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Cart Items ({totalItems})
                </h2>
                <button
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-2"
                >
                  <FiTrash2 size={16} />
                  Clear All
                </button>
              </div>

              {items.map((item, index) => (
                <motion.div
                  key={`${item.id}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 hover:shadow-xl transition-shadow">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                            {item.type === 'test' ? '🧪' : '📦'}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 capitalize mb-2">
                              {item.type === 'test' ? 'Diagnostic Test' : 'Health Package'}
                            </p>
                            <div className="flex items-center gap-4">
                              <span className="text-2xl font-bold text-blue-600">
                                {formatPrice(item.price)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 transition-colors"
                        title="Remove item"
                      >
                        <FiTrash2 size={20} />
                      </button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="sticky top-24"
              >
                <Card glass className="p-6">
                  <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                      <span>Subtotal ({totalItems} items)</span>
                      <span className="font-semibold">{formatPrice(subtotal)}</span>
                    </div>

                    <div className="flex justify-between text-green-600">
                      <span>Discount (10%)</span>
                      <span className="font-semibold">-{formatPrice(discount)}</span>
                    </div>

                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                      <span>Home Collection</span>
                      <span className="font-semibold text-green-600">FREE</span>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white">
                        <span>Total</span>
                        <span className="text-blue-600">{formatPrice(total)}</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleCheckout}
                    className="w-full mb-4"
                    size="lg"
                  >
                    Proceed to Checkout
                  </Button>

                  <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <FiCheck className="text-green-600" />
                      <span>Free home sample collection</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiCheck className="text-green-600" />
                      <span>NABL certified labs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiCheck className="text-green-600" />
                      <span>Reports within 24-48 hours</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiCheck className="text-green-600" />
                      <span>100% safe & hygienic</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        )}
      </div>

      {/* Checkout Form Modal */}
      <CheckoutModal
        isOpen={showCheckoutForm}
        onClose={() => setShowCheckoutForm(false)}
        onSubmit={handleCheckoutSubmit}
        totalAmount={total}
        itemCount={totalItems}
      />
    </div>
  );
}
