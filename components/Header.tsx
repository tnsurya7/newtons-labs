'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FiSearch, FiPhone, FiHome, FiUser, FiShoppingCart, FiMenu, FiX, FiMapPin, FiMoon, FiSun, FiLogOut } from 'react-icons/fi';
import { useCartStore } from '@/store/cart';
import { useThemeStore } from '@/store/theme';
import { useAuthStore } from '@/store/auth';
import { useLocationStore } from '@/store/location';
import { supportApi } from '@/lib/api/client';
import LocationModal from './modals/LocationModal';

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const totalItems = useCartStore((state) => state.totalItems);
  const { isDark, toggleTheme } = useThemeStore();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { city, pincode, setLocation } = useLocationStore();

  const handleSupportClick = async () => {
    const phone = prompt('Enter your phone number for callback:');
    if (phone) {
      try {
        const response = await supportApi.callback(phone) as any;
        alert(`✅ Callback Requested!\n\nTicket ID: ${response.data.ticketId}\nEstimated wait: ${response.data.estimatedCallTime}\nQueue position: ${response.data.queuePosition}\n\nOur team will call you shortly!`);
      } catch (error) {
        alert('Failed to request callback. Please call 1800-123-4567');
      }
    }
  };

  const handleLocationSelect = (location: { city: string; pincode: string }) => {
    setLocation(location.city, location.pincode);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
        {/* Top Bar */}
        <div className="bg-gradient-to-r from-blue-600 via-teal-600 to-purple-600 text-white py-1.5 px-4 text-sm">
          <div className="container mx-auto flex justify-between items-center">
            <span>🎉 Get 60% OFF on Health Packages | Free Home Sample Collection</span>
            <div className="hidden md:flex items-center gap-4">
              <span className="flex items-center gap-1">
                <FiPhone size={14} /> 9003130800
              </span>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                N
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                  New10Lab
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">Trusted Diagnostics</p>
              </div>
            </div>

            {/* Location */}
            <div
              className="hidden lg:flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setShowLocationModal(true)}
            >
              <FiMapPin className="text-blue-600" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Location</p>
                <p className="text-sm font-semibold">{city} {pincode}</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-xl">
              <div className="relative w-full">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search for Tests & Packages"
                  className="w-full pl-12 pr-4 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 border-2 border-transparent focus:border-blue-600 focus:bg-white dark:focus:bg-gray-900 outline-none transition-all"
                />
              </div>
            </div>

            {/* Action Icons */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
                title="Toggle dark/light mode"
              >
                {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
              </button>

              <button
                onClick={handleSupportClick}
                className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title="Contact Support"
              >
                <FiPhone size={20} className="text-blue-600" />
                <span className="text-sm font-medium">Support</span>
              </button>

              <button
                onClick={() => router.push('/home-visit')}
                className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title="Book Home Visit"
              >
                <FiHome size={20} className="text-teal-600" />
                <span className="text-sm font-medium">Home Visit</span>
              </button>

              {isAuthenticated && user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    title="User Profile"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden md:block text-sm font-medium">{user.name.split(' ')[0]}</span>
                  </button>

                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 z-50"
                    >
                      <div className="border-b border-gray-200 dark:border-gray-700 pb-3 mb-3">
                        <p className="font-semibold text-gray-900 dark:text-white">{user.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{user.phone}</p>
                      </div>
                      <button
                        onClick={async () => {
                          try {
                            await fetch('/api/auth/logout', { method: 'POST' });
                            logout();
                            setShowUserMenu(false);
                            router.push('/');
                          } catch (error) {
                            console.error('Logout error:', error);
                          }
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
                      >
                        <FiLogOut size={18} />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => router.push('/login')}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  title="Login"
                >
                  <FiUser size={20} />
                  <span className="hidden md:block text-sm font-medium">Login</span>
                </button>
              )}

              <button
                onClick={() => router.push('/cart')}
                className="relative p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title="Shopping Cart"
              >
                <FiShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                    {totalItems}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-4">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search tests..."
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 outline-none"
              />
            </div>
          </div>

          {/* Mobile Location */}
          <div className="lg:hidden mt-4">
            <button
              onClick={() => setShowLocationModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <FiMapPin className="text-blue-600" />
              <div className="text-left">
                <p className="text-xs text-gray-500 dark:text-gray-400">Location</p>
                <p className="text-sm font-semibold">{city} {pincode}</p>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4"
          >
            <nav className="flex flex-col gap-2">
              <a href="#tests" className="px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                Tests
              </a>
              <a href="#packages" className="px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                Packages
              </a>
              <button
                onClick={() => setShowLocationModal(true)}
                className="px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
              >
                Locations
              </button>
            </nav>
          </motion.div>
        )}
      </header>

      {/* Location Modal */}
      <LocationModal
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        onLocationSelect={handleLocationSelect}
        currentLocation={{ city, pincode }}
      />
    </>
  );
}
