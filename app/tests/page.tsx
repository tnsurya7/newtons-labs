'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';
import TestCard from '@/components/TestCard';
import { useTests } from '@/lib/hooks/useTests';
import { FiSearch, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const TESTS_PER_PAGE = 24;

function TestsContent() {
  const searchParams = useSearchParams();
  const scrollToId = searchParams.get('scrollTo');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Fetch all tests from database
  const { tests: allTests, loading } = useTests();

  // Ensure body can scroll (fix modal overflow issue)
  useEffect(() => {
    document.body.style.overflow = 'unset';
    return () => {
      // Don't reset on cleanup to avoid interfering with modals
    };
  }, []);

  // Effect 1: Change page when scrollTo parameter exists
  useEffect(() => {
    if (!scrollToId || !allTests.length) return;

    // CLEAR LOCAL SEARCH AND FILTERS
    setSearchQuery("");
    setSelectedCategory("All");

    const index = allTests.findIndex(test => String(test.id) === scrollToId);
    if (index === -1) return;

    const pageNumber = Math.floor(index / TESTS_PER_PAGE) + 1;
    
    // Always set the page, even if it's the same
    setCurrentPage(pageNumber);
  }, [scrollToId, allTests]);

  // Effect 2: Scroll when element actually appears in DOM (bulletproof)
  useEffect(() => {
    if (!scrollToId) return;

    const observer = new MutationObserver(() => {
      const el = document.querySelector(`[data-item-id="${scrollToId}"]`);
      
      if (el) {
        // Scroll to element
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        
        // Add highlight
        el.classList.add("highlight-test");
        setTimeout(() => {
          el.classList.remove("highlight-test");
        }, 3000);
        
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [scrollToId]);

  // Get unique categories
  const categories = useMemo(() => {
    if (!allTests.length) return ['All'];
    return ['All', ...Array.from(new Set(allTests.map(test => test.category)))];
  }, [allTests]);

  // Filter tests with flexible search
  const filteredTests = useMemo(() => {
    return allTests.filter((test) => {
      // Normalize strings for flexible matching
      const normalizeString = (str: string) => {
        return str
          .toLowerCase()
          .replace(/[\s\-_]/g, '') // Remove spaces, hyphens, underscores
          .replace(/[().,]/g, ''); // Remove parentheses, commas, dots
      };
      
      const normalizedQuery = normalizeString(searchQuery);
      const normalizedTestName = normalizeString(test.name);
      
      const matchesSearch = searchQuery === '' || normalizedTestName.includes(normalizedQuery);
      const matchesCategory = selectedCategory === 'All' || test.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [allTests, searchQuery, selectedCategory]);

  // Pagination
  const totalPages = Math.ceil(filteredTests.length / TESTS_PER_PAGE);
  const startIndex = (currentPage - 1) * TESTS_PER_PAGE;
  const paginatedTests = filteredTests.slice(startIndex, startIndex + TESTS_PER_PAGE);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
      <Header />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                All Diagnostic Tests
              </span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
              Browse our complete range of {loading ? '...' : `${allTests.length}+`} diagnostic tests with up to 91% discount
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative mb-6">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search for tests..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-colors"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Results Count */}
          <div className="mb-6 text-center text-gray-600 dark:text-gray-400">
            Showing {startIndex + 1}-{Math.min(startIndex + TESTS_PER_PAGE, filteredTests.length)} of {filteredTests.length} tests
          </div>

          {/* Tests Grid */}
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading tests...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {paginatedTests.map((test, index) => (
                <motion.div
                  key={test.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.02 }}
                >
                  <TestCard {...test} />
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <FiChevronLeft size={20} />
              </button>
              
              <div className="flex gap-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                        currentPage === pageNum
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <FiChevronRight size={20} />
              </button>
            </div>
          )}

          {/* No Results */}
          {filteredTests.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No tests found matching "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
}

export default function AllTestsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
        <Header />
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4">
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading tests...</p>
            </div>
          </div>
        </main>
        <Footer />
        <MobileNav />
      </div>
    }>
      <TestsContent />
    </Suspense>
  );
}
