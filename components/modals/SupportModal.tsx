'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiPhone, FiMail, FiMapPin, FiClock, FiMessageCircle } from 'react-icons/fi';
import { useState } from 'react';
import Button from '../ui/Button';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SupportModal({ isOpen, onClose }: SupportModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`✅ Support Request Submitted!\n\nThank you ${formData.name}!\n\nOur team will contact you shortly at:\n📞 ${formData.phone}\n📧 ${formData.email}\n\nYou can also reach us directly at 9003130800`);
    setFormData({ name: '', phone: '', email: '', message: '' });
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
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-blue-600 via-teal-600 to-purple-600 text-white p-6 rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">Contact Support</h2>
                    <p className="text-blue-100">We're here to help you 24/7</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                  >
                    <FiX size={24} />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      Get in Touch
                    </h3>

                    {/* Phone */}
                    <div className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
                      <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FiPhone className="text-white" size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          Call Us
                        </h4>
                        <p className="text-blue-600 dark:text-blue-400 font-bold text-lg">
                          9003130800
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Available 24/7
                        </p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-4 p-4 bg-teal-50 dark:bg-teal-900/20 rounded-2xl">
                      <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FiMail className="text-white" size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          Email Us
                        </h4>
                        <p className="text-teal-600 dark:text-teal-400 text-sm">
                          support@new10lab.com
                        </p>
                        <p className="text-teal-600 dark:text-teal-400 text-sm">
                          info@new10lab.com
                        </p>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-start gap-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-2xl">
                      <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FiMapPin className="text-white" size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          Visit Us
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          152/3, 6th Avenue,<br />
                          Anna Nagar East,<br />
                          Chennai - 600 102
                        </p>
                      </div>
                    </div>

                    {/* Working Hours */}
                    <div className="flex items-start gap-4 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-2xl">
                      <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FiClock className="text-white" size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          Working Hours
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Monday - Saturday: 7:00 AM - 9:00 PM<br />
                          Sunday: 8:00 AM - 6:00 PM<br />
                          <span className="text-green-600 dark:text-green-400 font-semibold">
                            Emergency: 24/7
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Contact Form */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      Send us a Message
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-blue-600 outline-none transition-colors"
                          placeholder="Enter your name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-blue-600 outline-none transition-colors"
                          placeholder="Enter your phone number"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-blue-600 outline-none transition-colors"
                          placeholder="Enter your email"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Message
                        </label>
                        <textarea
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          rows={4}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-blue-600 outline-none transition-colors resize-none"
                          placeholder="How can we help you?"
                        />
                      </div>

                      <Button type="submit" className="w-full gap-2">
                        <FiMessageCircle />
                        Send Message
                      </Button>
                    </form>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Quick Actions
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <button
                      onClick={() => window.location.href = 'tel:9003130800'}
                      className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors text-center"
                    >
                      <FiPhone className="mx-auto mb-1 text-blue-600" size={20} />
                      <p className="text-xs font-medium text-gray-900 dark:text-white">Call Now</p>
                    </button>
                    <button
                      onClick={() => window.location.href = 'mailto:support@new10lab.com'}
                      className="p-3 bg-teal-50 dark:bg-teal-900/20 rounded-xl hover:bg-teal-100 dark:hover:bg-teal-900/30 transition-colors text-center"
                    >
                      <FiMail className="mx-auto mb-1 text-teal-600" size={20} />
                      <p className="text-xs font-medium text-gray-900 dark:text-white">Email</p>
                    </button>
                    <button
                      onClick={() => window.open('https://wa.me/919003130800', '_blank')}
                      className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors text-center"
                    >
                      <FiMessageCircle className="mx-auto mb-1 text-green-600" size={20} />
                      <p className="text-xs font-medium text-gray-900 dark:text-white">WhatsApp</p>
                    </button>
                    <button
                      onClick={() => window.open('https://maps.google.com/?q=152/3,6th Avenue,Anna Nagar East,Chennai', '_blank')}
                      className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors text-center"
                    >
                      <FiMapPin className="mx-auto mb-1 text-purple-600" size={20} />
                      <p className="text-xs font-medium text-gray-900 dark:text-white">Directions</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
