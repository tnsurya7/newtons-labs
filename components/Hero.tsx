'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FiHome, FiActivity, FiSearch, FiPackage, FiX } from 'react-icons/fi';
import Button from './ui/Button';
import Image from 'next/image';

export default function Hero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    '/BLLOD SAMPLE.jpg',
    '/BLLOD SAMPLE (1).jpg'
  ];

  // Image carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const handleHomeVisit = () => {
    router.push('/home-visit');
  };

  // Handle search with API
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const searchTimeout = setTimeout(async () => {
      setIsSearching(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
        const data = await response.json();
        
        if (data.results) {
          const formattedResults = data.results.map((result: any) => ({
            ...result,
            displayPrice: `₹${result.price}`
          }));
          setSearchResults(formattedResults);
          setShowResults(true);
        }
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300); // Debounce search

    return () => clearTimeout(searchTimeout);
  }, [searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResultClick = (result: any) => {
    if (result.type === 'test') {
      router.push(`/tests?search=${encodeURIComponent(result.name)}`);
    } else {
      router.push(`/tests?search=${encodeURIComponent(result.name)}`);
    }
    setSearchQuery('');
    setShowResults(false);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
  };

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-100 via-teal-100 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 md:py-20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90],
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-teal-400/30 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900 rounded-full text-blue-700 dark:text-blue-300 text-sm font-semibold mb-4 flex items-center gap-2">
                <FiActivity size={16} />
                <span>India&apos;s Trusted Diagnostic Lab</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-teal-600 to-purple-600 bg-clip-text text-transparent">
                  Home Collections
                </span>
                <br />
                <span className="text-gray-900 dark:text-white">Made Easy</span>
              </h1>

              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-xl">
                Book diagnostic tests from the comfort of your home. NABL certified labs, accurate reports, and free home sample collection.
              </p>

              {/* Search Bar */}
              <div className="mb-8 relative" ref={searchRef}>
                <div className="relative">
                  <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search for tests or packages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => searchQuery.length >= 2 && setShowResults(true)}
                    className="w-full pl-12 pr-12 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-lg"
                  />
                  {searchQuery && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      <FiX size={20} />
                    </button>
                  )}
                </div>

                {/* Search Results Dropdown */}
                <AnimatePresence>
                  {showResults && searchResults.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden z-50 max-h-[400px] overflow-y-auto"
                    >
                      {searchResults.map((result, index) => (
                        <button
                          key={`${result.type}-${result.id}`}
                          onClick={() => handleResultClick(result)}
                          className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-0 text-left"
                        >
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            result.type === 'package' 
                              ? 'bg-gradient-to-br from-purple-500 to-pink-500' 
                              : 'bg-gradient-to-br from-blue-500 to-cyan-500'
                          }`}>
                            {result.type === 'package' ? (
                              <FiPackage className="text-white" size={20} />
                            ) : (
                              <FiActivity className="text-white" size={20} />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 dark:text-white truncate">
                              {result.name}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {result.type === 'package' ? result.details : result.category}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-blue-600 dark:text-blue-400">
                              {result.displayPrice}
                            </p>
                            {result.discount > 0 && (
                              <p className="text-xs text-green-600 dark:text-green-400">
                                {result.discount}% OFF
                              </p>
                            )}
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                  {showResults && searchQuery.length >= 2 && searchResults.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 p-6 text-center z-50"
                    >
                      <p className="text-gray-500 dark:text-gray-400">No results found for &quot;{searchQuery}&quot;</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="gap-2"
                  onClick={handleHomeVisit}
                >
                  <FiHome /> Book Home Visit
                </Button>
              </div>

              {/* Quality Highlights */}
              <div className="grid grid-cols-2 gap-6 mt-12 max-w-md">
                <div className="text-center">
                  <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                    <FiHome className="text-white" size={28} />
                  </div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Home Visit</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Available</p>
                </div>
                <div className="text-center">
                  <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-teal-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                    <FiActivity className="text-white" size={28} />
                  </div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Chennai</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">600102</p>
                </div>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50">
                {/* Crossfading Images */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={images[currentImageIndex]}
                      alt="Blood Sample Testing"
                      fill
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-4 -left-2 md:top-8 md:-left-4 bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-2xl p-3 md:p-4 max-w-[160px] md:max-w-[200px] border-2 border-teal-200 dark:border-teal-800"
              >
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-teal-400 to-cyan-500 dark:bg-teal-900 rounded-lg md:rounded-xl flex items-center justify-center text-xl md:text-2xl shadow-lg">
                    ✓
                  </div>
                  <div>
                    <p className="font-semibold text-xs md:text-sm">Quality Testing</p>
                    <p className="text-[10px] md:text-xs text-gray-500">Accurate Results</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="absolute bottom-4 -right-2 md:bottom-8 md:-right-4 bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-2xl p-3 md:p-4 max-w-[160px] md:max-w-[200px] border-2 border-blue-200 dark:border-blue-800"
              >
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-400 to-cyan-500 dark:bg-blue-900 rounded-lg md:rounded-xl flex items-center justify-center">
                    <FiHome size={20} className="text-white md:w-6 md:h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-xs md:text-sm">Home Visit</p>
                    <p className="text-[10px] md:text-xs text-gray-500">Safe & Convenient</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
