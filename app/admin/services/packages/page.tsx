'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiX } from 'react-icons/fi';
import Button from '@/components/ui/Button';

interface Package {
  id: string;
  name: string;
  price: number;
  original_price: number;
  discount: number;
  tests_count: number;
  popular: boolean;
  status: string;
  description?: string;
  features?: any;
}

export default function PackagesManagementPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    original_price: '',
    tests_count: '',
    popular: false,
    description: '',
    status: 'active',
    features: '',
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await fetch('/api/admin/services/packages');
      const data = await response.json();
      setPackages(data.packages || []);
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const packageData = {
      ...formData,
      price: parseFloat(formData.price),
      original_price: parseFloat(formData.original_price),
      tests_count: parseInt(formData.tests_count),
      discount: Math.round(((parseFloat(formData.original_price) - parseFloat(formData.price)) / parseFloat(formData.original_price)) * 100),
      features: formData.features ? JSON.parse(`[${formData.features.split(',').map(f => `"${f.trim()}"`).join(',')}]`) : [],
    };

    try {
      const url = editingPackage 
        ? `/api/admin/services/packages/${editingPackage.id}`
        : '/api/admin/services/packages';
      
      const method = editingPackage ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(packageData),
      });

      if (response.ok) {
        fetchPackages();
        closeModal();
      }
    } catch (error) {
      console.error('Error saving package:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this package?')) return;

    try {
      const response = await fetch(`/api/admin/services/packages/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchPackages();
      }
    } catch (error) {
      console.error('Error deleting package:', error);
    }
  };

  const openModal = (pkg?: Package) => {
    if (pkg) {
      setEditingPackage(pkg);
      setFormData({
        name: pkg.name,
        price: pkg.price.toString(),
        original_price: pkg.original_price.toString(),
        tests_count: pkg.tests_count.toString(),
        popular: pkg.popular,
        description: pkg.description || '',
        status: pkg.status,
        features: Array.isArray(pkg.features) ? pkg.features.join(', ') : '',
      });
    } else {
      setEditingPackage(null);
      setFormData({
        name: '',
        price: '',
        original_price: '',
        tests_count: '',
        popular: false,
        description: '',
        status: 'active',
        features: '',
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingPackage(null);
  };

  const filteredPackages = packages.filter(pkg =>
    pkg.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Packages Management</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage health packages and bundles
            </p>
          </div>
          <Button onClick={() => openModal()} className="gap-2">
            <FiPlus /> Add New Package
          </Button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search packages..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="text-left py-4 px-6 font-medium">Name</th>
                    <th className="text-left py-4 px-6 font-medium">Price</th>
                    <th className="text-left py-4 px-6 font-medium">Discount</th>
                    <th className="text-left py-4 px-6 font-medium">Tests</th>
                    <th className="text-left py-4 px-6 font-medium">Popular</th>
                    <th className="text-left py-4 px-6 font-medium">Status</th>
                    <th className="text-left py-4 px-6 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPackages.map((pkg) => (
                    <tr
                      key={pkg.id}
                      className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    >
                      <td className="py-4 px-6 font-medium">{pkg.name}</td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-semibold">₹{pkg.price}</p>
                          <p className="text-sm text-gray-500 line-through">₹{pkg.original_price}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                          {pkg.discount}% OFF
                        </span>
                      </td>
                      <td className="py-4 px-6">{pkg.tests_count} tests</td>
                      <td className="py-4 px-6">
                        {pkg.popular && (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400">
                            Popular
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          pkg.status === 'active'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400'
                        }`}>
                          {pkg.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openModal(pkg)}
                            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                          >
                            <FiEdit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(pkg.id)}
                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {editingPackage ? 'Edit Package' : 'Add New Package'}
              </h2>
              <button onClick={closeModal} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <FiX size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Package Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Original Price</label>
                  <input
                    type="number"
                    value={formData.original_price}
                    onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Discounted Price</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Number of Tests</label>
                  <input
                    type="number"
                    value={formData.tests_count}
                    onChange={(e) => setFormData({ ...formData, tests_count: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="popular"
                    checked={formData.popular}
                    onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="popular" className="text-sm font-medium">
                    Mark as Popular
                  </label>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Features (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    placeholder="CBC, Lipid Profile, Liver Function"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">
                  {editingPackage ? 'Update Package' : 'Add Package'}
                </Button>
                <Button type="button" variant="outline" onClick={closeModal} className="flex-1">
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
