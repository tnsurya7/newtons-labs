'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FiSearch, FiPhone, FiHome, FiShoppingCart, FiMenu, FiX, FiMapPin, FiMoon, FiSun, FiGift } from 'react-icons/fi';
import { useCartStore } from '@/store/cart';
import { useThemeStore } from '@/store/theme';
import { useLocationStore } from '@/store/location';
import LocationModal from './modals/LocationModal';
import SupportModal from './modals/SupportModal';

interface SearchResult {
  id: string;
  name: string;
  type: 'test' | 'package';
  price: number;
  originalPrice: number;
  discount: number;
  details?: string;
}

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  
  const totalItems = useCartStore((state) => state.totalItems);
  const { isDark, toggleTheme } = useThemeStore();
  const { city, pincode, setLocation } = useLocationStore();

  const handleHomeVisitClick = () => {
    router.push('/home-visit');
  };

  // Handle click outside to close search results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search functionality - INSTANT (no debounce)
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    // Show results immediately on any input
    setShowSearchResults(true);

    // Instant search - no debounce
    const performSearch = async () => {
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
        const data = await response.json();
        setSearchResults(data.results || []);
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      }
    };

    performSearch();
  }, [searchQuery]);

  const handleSearchResultClick = (result: SearchResult) => {
    setSearchQuery('');
    setShowSearchResults(false);
    
    // Navigate to homepage if not already there
    if (window.location.pathname !== '/') {
      router.push('/');
      // Wait for navigation then scroll
      setTimeout(() => {
        const sectionId = result.type === 'test' ? 'tests' : 'packages';
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      // Already on homepage, just scroll
      const sectionId = result.type === 'test' ? 'tests' : 'packages';
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleSupportClick = () => {
    setShowSupportModal(true);
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
            <span className="flex items-center gap-2">
              <FiGift size={16} /> Get 60% OFF on Health Packages | Free Home Sample Collection
            </span>
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
            <div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => router.push('/')}
            >
              <img 
                src="/New10labs-logo.png" 
                alt="New10Labs Logo" 
                className="h-16 md:h-20 w-auto object-contain"
              />
            </div>

            {/* Location - Fixed, Non-editable */}
            <div
              className="hidden lg:flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl"
            >
              <FiMapPin className="text-blue-600" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Location</p>
                <p className="text-sm font-semibold">Chennai 600102</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-xl relative" ref={searchRef}>
              <div className="relative w-full">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search for Tests & Packages"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery && setShowSearchResults(true)}
                  className="w-full pl-12 pr-4 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 border-2 border-transparent focus:border-blue-600 focus:bg-white dark:focus:bg-gray-900 outline-none transition-all"
                />
              </div>

              {/* Search Results Dropdown */}
              <AnimatePresence>
                {showSearchResults && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto z-50"
                  >
                    {searchResults.length > 0 ? (
                      <div className="p-2">
                        {searchResults.map((result) => (
                          <button
                            key={result.id}
                            onClick={() => handleSearchResultClick(result)}
                            className="w-full text-left p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                    {result.name}
                                  </span>
                                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                                    result.type === 'test' 
                                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
                                      : 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
                                  }`}>
                                    {result.type === 'test' ? 'Test' : 'Package'}
                                  </span>
                                </div>
                                {result.details && (
                                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {result.details}
                                  </p>
                                )}
                              </div>
                              <div className="text-right ml-4">
                                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">₹{result.price}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 line-through">₹{result.originalPrice}</p>
                                <p className="text-xs text-green-600 dark:text-green-400 font-semibold">{result.discount}% OFF</p>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
                          <FiSearch size={32} className="text-gray-400 dark:text-gray-500" />
                        </div>
                        <p className="text-gray-900 dark:text-white font-semibold mb-1">No matches found</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Try searching with different keywords
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
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
                onClick={handleHomeVisitClick}
                className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title="Book Home Visit"
              >
                <FiHome size={20} className="text-teal-600" />
                <span className="text-sm font-medium">Home Visit</span>
              </button>



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
          <div className="md:hidden mt-4" ref={searchRef}>
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search tests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery && setShowSearchResults(true)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 outline-none"
              />
            </div>

            {/* Mobile Search Results */}
            <AnimatePresence>
              {showSearchResults && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 max-h-80 overflow-y-auto"
                >
                  {searchResults.length > 0 ? (
                    <div className="p-2">
                      {searchResults.map((result) => (
                        <button
                          key={result.id}
                          onClick={() => handleSearchResultClick(result)}
                          className="w-full text-left p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                  {result.name}
                                </span>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${
                                  result.type === 'test' 
                                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
                                    : 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
                                }`}>
                                  {result.type === 'test' ? 'Test' : 'Package'}
                                </span>
                              </div>
                              {result.details && (
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  {result.details}
                                </p>
                              )}
                            </div>
                            <div className="text-right ml-4">
                              <p className="text-base font-bold text-blue-600 dark:text-blue-400">₹{result.price}</p>
                              <p className="text-xs text-green-600 dark:text-green-400 font-semibold">{result.discount}% OFF</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center">
                      <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-2">
                        <FiSearch size={24} className="text-gray-400 dark:text-gray-500" />
                      </div>
                      <p className="text-gray-900 dark:text-white font-semibold text-sm mb-1">No matches found</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Try different keywords
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Location - Fixed, Non-editable */}
          <div className="lg:hidden mt-4">
            <div
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl"
            >
              <FiMapPin className="text-blue-600" />
              <div className="text-left">
                <p className="text-xs text-gray-500 dark:text-gray-400">Location</p>
                <p className="text-sm font-semibold">Chennai 600102</p>
              </div>
            </div>
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
            </nav>
          </motion.div>
        )}
      </header>

      {/* Support Modal */}
      <SupportModal
        isOpen={showSupportModal}
        onClose={() => setShowSupportModal(false)}
      />
    </>
  );
}
