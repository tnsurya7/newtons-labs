'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  FiUsers, FiShoppingBag, FiDollarSign, FiPackage,
  FiTrendingUp, FiClock, FiCheckCircle, FiAlertCircle
} from 'react-icons/fi';

interface DashboardStats {
  totalUsers: number;
  totalBookings: number;
  totalRevenue: number;
  activeServices: number;
  todayBookings: number;
  pendingBookings: number;
  completedBookings: number;
  recentBookings: any[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/admin/dashboard/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  const statCards = [
    {
      icon: FiUsers,
      label: 'Total Users',
      value: stats?.totalUsers || 0,
      change: '+12%',
      color: 'blue',
    },
    {
      icon: FiShoppingBag,
      label: 'Total Bookings',
      value: stats?.totalBookings || 0,
      change: '+8%',
      color: 'green',
    },
    {
      icon: FiDollarSign,
      label: 'Total Revenue',
      value: `₹${(stats?.totalRevenue || 0).toLocaleString()}`,
      change: '+15%',
      color: 'purple',
    },
    {
      icon: FiPackage,
      label: 'Active Services',
      value: stats?.activeServices || 0,
      change: '+3',
      color: 'orange',
    },
  ];

  const quickStats = [
    {
      icon: FiClock,
      label: 'Today\'s Bookings',
      value: stats?.todayBookings || 0,
      color: 'text-blue-600',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      icon: FiAlertCircle,
      label: 'Pending',
      value: stats?.pendingBookings || 0,
      color: 'text-yellow-600',
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    },
    {
      icon: FiCheckCircle,
      label: 'Completed',
      value: stats?.completedBookings || 0,
      color: 'text-green-600',
      bg: 'bg-green-50 dark:bg-green-900/20',
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome to your admin dashboard
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-${stat.color}-50 dark:bg-${stat.color}-900/20`}>
                    <Icon className={`text-${stat.color}-600`} size={24} />
                  </div>
                  <span className="text-sm text-green-600 flex items-center gap-1">
                    <FiTrendingUp size={16} />
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`${stat.bg} rounded-2xl p-6`}
              >
                <div className="flex items-center gap-4">
                  <Icon className={stat.color} size={32} />
                  <div>
                    <h3 className="text-3xl font-bold">{stat.value}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Bookings */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Recent Bookings</h2>
          
          {stats?.recentBookings && stats.recentBookings.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-medium">Booking ID</th>
                    <th className="text-left py-3 px-4 font-medium">Customer</th>
                    <th className="text-left py-3 px-4 font-medium">Service</th>
                    <th className="text-left py-3 px-4 font-medium">Amount</th>
                    <th className="text-left py-3 px-4 font-medium">Status</th>
                    <th className="text-left py-3 px-4 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentBookings.map((booking: any) => (
                    <tr
                      key={booking.id}
                      className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    >
                      <td className="py-3 px-4 font-mono text-sm">{booking.booking_id}</td>
                      <td className="py-3 px-4">{booking.user_name}</td>
                      <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                        {booking.items?.length || 0} item(s)
                      </td>
                      <td className="py-3 px-4 font-semibold">₹{booking.total_amount}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'completed'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                            : booking.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                            : 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                        {new Date(booking.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">No bookings yet</p>
          )}
        </div>

      </div>
    </AdminLayout>
  );
}
