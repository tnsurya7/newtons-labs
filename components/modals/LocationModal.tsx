'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMapPin, FiSearch, FiPhone, FiClock, FiNavigation } from 'react-icons/fi';
import Button from '../ui/Button';
import { locationApi } from '@/lib/api/client';

interface Location {
  id: string;
  name: string;
  address: string;
  pincode: string;
  phone: string;
  distance: string;
  timings: string;
  services: string[];
}

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect: (location: { city: string; pincode: string }) => void;
  currentLocation?: { city: string; pincode: string };
}

export default function LocationModal({
  isOpen,
  onClose,
  onLocationSelect,
  currentLocation,
}: LocationModalProps) {
  const [pincode, setPincode] = useState('');
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchPerformed, setSearchPerformed] = useState(false);

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

  const handleSearch = async () => {
    if (!pincode.trim()) {
      setError('Please enter a pincode');
      return;
    }

    if (!/^\d{6}$/.test(pincode.trim())) {
      setError('Please enter a valid 6-digit pincode');
      return;
    }

    setLoading(true);
    setError(null);
    setSearchPerformed(true);

    try {
      const response = await locationApi.findNearby(pincode.trim()) as any;
      if (response.success) {
        setLocations(response.data.locations);
      } else {
        setError(response.message || 'No locations found');
        setLocations([]);
      }
    } catch (err: any) {
      setError('Failed to search locations. Please try again.');
      setLocations([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSelect = (location: Location) => {
    // Extract city from address (assuming format: "123 Area, City")
    const addressParts = location.address.split(',');
    const city = addressParts[addressParts.length - 1]?.trim() || 'Chennai';
    
    onLocationSelect({
      city,
      pincode: location.pincode,
    });
    onClose();
  };

  const detectLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd reverse geocode these coordinates
          // For now, we'll simulate with Chennai
          setPincode('600001');
          handleSearch();
        },
        (error) => {
          setError('Unable to detect location. Please enter pincode manually.');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  const popularCities = [
    { name: 'Chennai', pincode: '600001' },
    { name: 'Bangalore', pincode: '560001' },
    { name: 'Mumbai', pincode: '400001' },
    { name: 'Delhi', pincode: '110001' },
    { name: 'Hyderabad', pincode: '500001' },
    { name: 'Pune', pincode: '411001' },
  ];

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
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-[9998]"
            style={{ position: 'fixed' }}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[9999] overflow-y-auto" style={{ position: 'fixed' }}>
            <div className="min-h-screen px-4 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-2xl my-8"
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

                  {/* Header */}
                  <div className="mb-6 pr-10">
                    <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                      Select Your Location
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Find nearby labs and book tests with home collection
                    </p>
                  </div>

                  {/* Search Section */}
                  <div className="mb-6">
                    <div className="flex gap-3 mb-4">
                      <div className="flex-1 relative">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value)}
                          placeholder="Enter 6-digit pincode"
                          maxLength={6}
                          className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-600 dark:focus:border-blue-500 outline-none transition-colors"
                          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        />
                      </div>
                      <Button onClick={handleSearch} disabled={loading}>
                        {loading ? 'Searching...' : 'Search'}
                      </Button>
                    </div>

                    <button
                      onClick={detectLocation}
                      className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                    >
                      <FiNavigation size={16} />
                      <span className="text-sm">Detect my location</span>
                    </button>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                      <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                    </div>
                  )}

                  {/* Popular Cities */}
                  {!searchPerformed && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                        Popular Cities
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {popularCities.map((city) => (
                          <button
                            key={city.name}
                            onClick={() => {
                              setPincode(city.pincode);
                              handleSearch();
                            }}
                            className="p-3 text-left rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <FiMapPin className="text-blue-600 dark:text-blue-400" size={16} />
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">{city.name}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{city.pincode}</p>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Search Results */}
                  {searchPerformed && locations.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                        Nearby Labs ({locations.length} found)
                      </h3>
                      <div className="space-y-4">
                        {locations.map((location) => (
                          <motion.div
                            key={location.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-600 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors cursor-pointer"
                            onClick={() => handleLocationSelect(location)}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-gray-900 dark:text-white">
                                {location.name}
                              </h4>
                              <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                                {location.distance}
                              </span>
                            </div>
                            
                            <div className="flex items-start gap-2 mb-2">
                              <FiMapPin className="text-gray-400 mt-1" size={14} />
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {location.address}
                              </p>
                            </div>

                            <div className="flex items-center gap-4 mb-3">
                              <div className="flex items-center gap-1">
                                <FiPhone className="text-gray-400" size={14} />
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  {location.phone}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <FiClock className="text-gray-400" size={14} />
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  {location.timings}
                                </span>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              {location.services.map((service) => (
                                <span
                                  key={service}
                                  className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-lg"
                                >
                                  {service}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* No Results */}
                  {searchPerformed && locations.length === 0 && !loading && !error && (
                    <div className="text-center py-8">
                      <div className="text-6xl mb-4">📍</div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        No labs found
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        We don't have labs in this area yet. Try a different pincode.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSearchPerformed(false);
                          setPincode('');
                          setError(null);
                        }}
                      >
                        Search Again
                      </Button>
                    </div>
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