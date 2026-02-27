'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiUser, FiMail, FiPhone, FiMessageSquare } from 'react-icons/fi';
import Button from '@/components/ui/Button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ConsultationPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/booking/consultation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success) {
                setSuccess(true);
                setTimeout(() => {
                    router.push('/');
                }, 3000);
            } else {
                alert(result.message || 'Failed to book consultation. Please try again.');
            }
        } catch (error) {
            alert('Failed to book consultation. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <Header />

            <main className="container mx-auto px-4 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-2xl mx-auto"
                >
                    {/* Back Button */}
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 transition-colors"
                    >
                        <FiArrowLeft /> Back
                    </button>

                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="text-6xl mb-4">👨‍⚕️</div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                                Book Online Consultation
                            </span>
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Fill in your details and our medical team will contact you shortly
                        </p>
                    </div>

                    {/* Form Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border-2 border-gray-100 dark:border-gray-700"
                    >
                        {success ? (
                            <div className="text-center py-12">
                                <div className="text-7xl mb-6 animate-bounce">✅</div>
                                <h2 className="text-2xl font-bold text-green-600 mb-4">
                                    Consultation Booked Successfully!
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 mb-2">
                                    We've sent confirmation emails to both you and our medical team.
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-500">
                                    Redirecting to home page...
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name Field */}
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                        Full Name <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter your full name"
                                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-600 dark:focus:border-blue-500 outline-none transition-colors"
                                        />
                                    </div>
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                        Email Address <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="your.email@example.com"
                                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-600 dark:focus:border-blue-500 outline-none transition-colors"
                                        />
                                    </div>
                                </div>

                                {/* Phone Field */}
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                        Phone Number <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+91 XXXXX XXXXX"
                                            pattern="[0-9+\s-]+"
                                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-600 dark:focus:border-blue-500 outline-none transition-colors"
                                        />
                                    </div>
                                </div>

                                {/* Message Field */}
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                        Message / Health Concern <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <FiMessageSquare className="absolute left-4 top-4 text-gray-400" />
                                        <textarea
                                            name="message"
                                            required
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Please describe your health concern or reason for consultation..."
                                            rows={5}
                                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-600 dark:focus:border-blue-500 outline-none transition-colors resize-none"
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full"
                                    size="lg"
                                >
                                    {loading ? 'Submitting...' : 'Submit Consultation Request'}
                                </Button>

                                {/* Info Text */}
                                <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                                    By submitting this form, you agree to receive communication from Newton's Lab regarding your consultation.
                                </p>
                            </form>
                        )}
                    </motion.div>

                    {/* Features */}
                    {!success && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="grid md:grid-cols-3 gap-4 mt-8"
                        >
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 text-center border-2 border-blue-100 dark:border-blue-900">
                                <div className="text-3xl mb-2">⚡</div>
                                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Quick Response</p>
                                <p className="text-xs text-gray-500">Within 24 hours</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 text-center border-2 border-teal-100 dark:border-teal-900">
                                <div className="text-3xl mb-2">🔒</div>
                                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Secure & Private</p>
                                <p className="text-xs text-gray-500">Your data is safe</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 text-center border-2 border-purple-100 dark:border-purple-900">
                                <div className="text-3xl mb-2">👨‍⚕️</div>
                                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Expert Doctors</p>
                                <p className="text-xs text-gray-500">Qualified professionals</p>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}
