'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  FiPlus, FiEdit2, FiTrash2, FiSearch, FiX 
} from 'react-icons/fi';
import Button from '@/components/ui/Button';

interface Test {
  id: string;
  name: string;
  price: number;
  original_price: number;
  discount: number;
  parameters: number;
  report_time: string;
  fasting_required: boolean;
  category: string;
  status: string;
  description?: string;
}

export default function TestsManagementPage() {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingTest, setEditingTest] = useState<Test | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    original_price: '',
    parameters: '',
    report_time: '',
    fasting_required: false,
    category: '',
    description: '',
    status: 'active',
  });

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const response = await fetch('/api/admin/services/tests');
      const data = await response.json();
      setTests(data.tests || []);
    } catch (error) {
      console.error('Error fetching tests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const testData = {
      ...formData,
      price: parseFloat(formData.price),
      original_price: parseFloat(formData.original_price),
      parameters: parseInt(formData.parameters),
      discount: Math.round(((parseFloat(formData.original_price) - parseFloat(formData.price)) / parseFloat(formData.original_price)) * 100),
    };

    try {
      const url = editingTest 
        ? `/api/admin/services/tests/${editingTest.id}`
        : '/api/admin/services/tests';
      
      const method = editingTest ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testData),
      });

      if (response.ok) {
        fetchTests();
        closeModal();
      }
    } catch (error) {
      console.error('Error saving test:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this test?')) return;

    try {
      const response = await fetch(`/api/admin/services/tests/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchTests();
      }
    } catch (error) {
      console.error('Error deleting test:', error);
    }
  };

  const openModal = (test?: Test) => {
    if (test) {
      setEditingTest(test);
      setFormData({
        name: test.name,
        price: test.price.toString(),
        original_price: test.original_price.toString(),
        parameters: test.parameters.toString(),
        report_time: test.report_time,
        fasting_required: test.fasting_required,
        category: test.category,
        description: test.description || '',
        status: test.status,
      });
    } else {
      setEditingTest(null);
      setFormData({
        name: '',
        price: '',
        original_price: '',
        parameters: '',
        report_time: '',
        fasting_required: false,
        category: '',
        description: '',
        status: 'active',
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTest(null);
  };

  const filteredTests = tests.filter(test =>
    test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    test.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Tests Management</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage diagnostic tests and their details
            </p>
          </div>
          <Button onClick={() => openModal()} className="gap-2">
            <FiPlus /> Add New Test
          </Button>
        </div>

        {/* Search */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tests..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
            />
          </div>
        </div>

        {/* Tests Table */}
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
                    <th className="text-left py-4 px-6 font-medium">Category</th>
                    <th className="text-left py-4 px-6 font-medium">Price</th>
                    <th className="text-left py-4 px-6 font-medium">Discount</th>
                    <th className="text-left py-4 px-6 font-medium">Parameters</th>
                    <th className="text-left py-4 px-6 font-medium">Status</th>
                    <th className="text-left py-4 px-6 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTests.map((test) => (
                    <tr
                      key={test.id}
                      className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    >
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-medium">{test.name}</p>
                          <p className="text-sm text-gray-500">{test.report_time}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">{test.category}</td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-semibold">₹{test.price}</p>
                          <p className="text-sm text-gray-500 line-through">₹{test.original_price}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                          {test.discount}% OFF
                        </span>
                      </td>
                      <td className="py-4 px-6">{test.parameters}</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          test.status === 'active'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400'
                        }`}>
                          {test.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openModal(test)}
                            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                          >
                            <FiEdit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(test.id)}
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {editingTest ? 'Edit Test' : 'Add New Test'}
              </h2>
              <button onClick={closeModal} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <FiX size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Test Name</label>
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
                  <label className="block text-sm font-medium mb-2">Parameters</label>
                  <input
                    type="number"
                    value={formData.parameters}
                    onChange={(e) => setFormData({ ...formData, parameters: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Report Time</label>
                  <input
                    type="text"
                    value={formData.report_time}
                    onChange={(e) => setFormData({ ...formData, report_time: e.target.value })}
                    placeholder="e.g., 6 hours"
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
                    id="fasting"
                    checked={formData.fasting_required}
                    onChange={(e) => setFormData({ ...formData, fasting_required: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="fasting" className="text-sm font-medium">
                    Fasting Required
                  </label>
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
                  {editingTest ? 'Update Test' : 'Add Test'}
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
