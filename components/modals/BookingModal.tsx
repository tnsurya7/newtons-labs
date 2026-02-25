'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import Button from '../ui/Button';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onSubmit: (data: any) => Promise<void>;
  fields: Array<{
    name: string;
    label: string;
    type: string;
    required?: boolean;
    placeholder?: string;
  }>;
}

export default function BookingModal({
  isOpen,
  onClose,
  title,
  onSubmit,
  fields,
}: BookingModalProps) {
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setFormData({});
      }, 2000);
    } catch (error) {
      alert('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - Fixed to viewport */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-[9998]"
            style={{ position: 'fixed' }}
          />

          {/* Modal Container - Fixed and Centered */}
          <div 
            className="fixed inset-0 z-[9999] overflow-y-auto"
            style={{ position: 'fixed' }}
          >
            <div className="min-h-screen px-4 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-md my-8"
                onClick={(e) => e.stopPropagation()}
              >
            <div className="p-6 max-h-[80vh] overflow-y-auto">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors z-10"
                aria-label="Close modal"
              >
                <FiX size={24} />
              </button>

              {/* Title */}
              <h2 className="text-2xl font-bold mb-6 pr-10 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                {title}
              </h2>

              {success ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-xl font-bold text-green-600 mb-2">
                    Booking Successful!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    We'll contact you shortly
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {fields.map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      {field.type === 'textarea' ? (
                        <textarea
                          name={field.name}
                          required={field.required}
                          placeholder={field.placeholder}
                          value={formData[field.name] || ''}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-600 dark:focus:border-blue-500 outline-none transition-colors"
                          rows={3}
                        />
                      ) : (
                        <input
                          type={field.type}
                          name={field.name}
                          required={field.required}
                          placeholder={field.placeholder}
                          value={formData[field.name] || ''}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-600 dark:focus:border-blue-500 outline-none transition-colors"
                        />
                      )}
                    </div>
                  ))}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-6"
                    size="lg"
                  >
                    {loading ? 'Booking...' : 'Confirm Booking'}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
        </>
      )}
    </AnimatePresence>
  );
}
