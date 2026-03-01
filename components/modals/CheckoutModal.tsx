'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiUser, FiPhone, FiMapPin, FiShoppingCart, FiCheck } from 'react-icons/fi';
import Button from '../ui/Button';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; phone: string; address: string }) => void;
  totalAmount: number;
  itemCount: number;
}

export default function CheckoutModal({ 
  isOpen, 
  onClose, 
  onSubmit,
  totalAmount,
  itemCount
}: CheckoutModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    address: '',
  });

  const validateForm = () => {
    const newErrors = {
      name: '',
      phone: '',
      address: '',
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.phone && !newErrors.address;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Call the booking API
        const response = await fetch('/api/bookings/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user: formData,
            items: [], // Will be populated from cart
            address: formData.address,
            phone: formData.phone,
          }),
        });

        const result = await response.json();

        if (result.success) {
          onSubmit(formData);
        } else {
          alert('Failed to create booking. Please try again.');
        }
      } catch (error) {
        console.error('Booking error:', error);
        alert('An error occurred. Please try again.');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (errors[e.target.name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [e.target.name]: '',
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border-2 border-gray-200 dark:border-gray-700">
              {/* Header */}
              <div className="relative bg-gradient-to-r from-blue-600 via-teal-600 to-purple-600 text-white p-5">
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 p-2 hover:bg-white/20 rounded-xl transition-colors"
                >
                  <FiX size={20} />
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center">
                    <FiShoppingCart size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Checkout</h2>
                    <p className="text-sm text-blue-100">Complete your order</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <form onSubmit={handleSubmit} className="p-5">
                {/* Order Summary */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {itemCount} {itemCount === 1 ? 'item' : 'items'}
                    </span>
                    <span className="text-lg font-bold text-blue-600">
                      ₹{totalAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-green-600">
                    <FiCheck size={14} />
                    <span>Free home sample collection included</span>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border-2 ${
                          errors.name 
                            ? 'border-red-500 focus:border-red-600' 
                            : 'border-gray-200 dark:border-gray-700 focus:border-blue-600'
                        } bg-white dark:bg-gray-800 outline-none transition-colors text-sm`}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="10-digit mobile number"
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border-2 ${
                          errors.phone 
                            ? 'border-red-500 focus:border-red-600' 
                            : 'border-gray-200 dark:border-gray-700 focus:border-blue-600'
                        } bg-white dark:bg-gray-800 outline-none transition-colors text-sm`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FiMapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter your complete address for sample collection"
                        rows={3}
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border-2 ${
                          errors.address 
                            ? 'border-red-500 focus:border-red-600' 
                            : 'border-gray-200 dark:border-gray-700 focus:border-blue-600'
                        } bg-white dark:bg-gray-800 outline-none transition-colors resize-none text-sm`}
                      />
                    </div>
                    {errors.address && (
                      <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                    )}
                  </div>
                </div>

                {/* Benefits */}
                <div className="mt-5 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    What happens next?
                  </p>
                  <ul className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>Our team will call you to confirm the appointment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>Trained phlebotomist will visit your address</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>Reports will be available within 24-48 hours</span>
                    </li>
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-5">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1"
                  >
                    Place Order
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
