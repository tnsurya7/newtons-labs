'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiUser, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import Button from '../ui/Button';

interface WhatsAppBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemName: string;
  itemPrice: number;
  itemDetails: string;
  itemType: 'test' | 'package';
}

export default function WhatsAppBookingModal({
  isOpen,
  onClose,
  itemName,
  itemPrice,
  itemDetails,
  itemType,
}: WhatsAppBookingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Build WhatsApp message with item details and user info
    let message = `Hi, I would like to book the following ${itemType}:\n\n`;
    message += `*${itemType === 'test' ? 'Test' : 'Package'} Name:* ${itemName}\n`;
    message += `*Price:* ₹${itemPrice}\n`;
    message += `${itemDetails}\n`;
    
    // Add user details if provided
    if (formData.name || formData.phone || formData.address) {
      message += `\n*My Details:*\n`;
      if (formData.name) message += `*Name:* ${formData.name}\n`;
      if (formData.phone) message += `*Phone:* ${formData.phone}\n`;
      if (formData.address) message += `*Address:* ${formData.address}\n`;
    }
    
    message += `\nPlease help me with the booking process.`;
    
    const whatsappUrl = `https://wa.me/919003252500?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Reset form and close modal
    setFormData({ name: '', phone: '', address: '' });
    onClose();
  };

  const handleSkip = () => {
    // Open WhatsApp without user details
    let message = `Hi, I would like to book the following ${itemType}:\n\n`;
    message += `*${itemType === 'test' ? 'Test' : 'Package'} Name:* ${itemName}\n`;
    message += `*Price:* ₹${itemPrice}\n`;
    message += `${itemDetails}\n`;
    message += `\nPlease help me with the booking process.`;
    
    const whatsappUrl = `https://wa.me/919003252500?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    onClose();
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
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border-2 border-gray-200 dark:border-gray-700">
              {/* Header */}
              <div className="relative bg-gradient-to-r from-green-600 via-teal-600 to-green-600 text-white p-5">
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 p-2 hover:bg-white/20 rounded-xl transition-colors"
                >
                  <FiX size={20} />
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center">
                    <FaWhatsapp size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Book on WhatsApp</h2>
                    <p className="text-sm text-green-100">Share your details</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <form onSubmit={handleSubmit} className="p-5">
                {/* Item Summary */}
                <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-4 mb-5 border-2 border-green-200 dark:border-green-800">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-1">{itemName}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{itemDetails}</p>
                    </div>
                    <div className="text-right ml-3">
                      <p className="text-xl font-bold text-green-600">₹{itemPrice}</p>
                    </div>
                  </div>
                </div>

                {/* Info Message - Removed */}

                {/* Form Fields */}
                <div className="space-y-4 mb-5">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Name
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-green-600 bg-white dark:bg-gray-800 outline-none transition-colors text-sm"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="10-digit mobile number"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-green-600 bg-white dark:bg-gray-800 outline-none transition-colors text-sm"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Address
                    </label>
                    <div className="relative">
                      <FiMapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter your address"
                        rows={3}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-green-600 bg-white dark:bg-gray-800 outline-none transition-colors resize-none text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2"
                >
                  <FaWhatsapp size={18} />
                  Continue to WhatsApp
                </Button>

                {/* Footer Note */}
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    You'll be redirected to WhatsApp to complete your booking
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
