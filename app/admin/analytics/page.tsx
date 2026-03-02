'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  FiTrendingUp, FiUsers, FiShoppingBag, FiDollarSign,
  FiPackage, FiActivity
} from 'react-icons/fi';

export default function AnalyticsPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/admin/dashboard/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
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

  const metrics = [
    {
      icon: FiUsers,
      label: 'Total Users',
      value: stats?.totalUsers || 0,
      change: '+12%',
      changeType: 'positive',
      color: 'blue',
    },
    {
      icon: FiShoppingBag,
      label: 'Total Bookings',
      value: stats?.totalBookings || 0,
      change: '+8%',
      changeType: 'positive',
      color: 'green',
    },
    {
      icon: FiDollarSign,
      label: 'Total Revenue',
      value: `₹${(stats?.totalRevenue || 0).toLocaleString()}`,
      change: '+15%',
      changeType: 'positive',
      color: 'purple',
    },
    {
      icon: FiPackage,
      label: 'Active Services',
      value: stats?.activeServices || 0,
      change: '+3',
      changeType: 'positive',
      color: 'orange',
    },
  ];

  const bookingStats = [
    {
      label: "Today's Bookings",
      value: stats?.todayBookings || 0,
      icon: FiActivity,
      color: 'text-blue-600',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      label: 'Pending',
      value: stats?.pendingBookings || 0,
      icon: FiShoppingBag,
      color: 'text-yellow-600',
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    },
    {
      label: 'Completed',
      value: stats?.completedBookings || 0,
      icon: FiTrendingUp,
      color: 'text-green-600',
      bg: 'bg-green-50 dark:bg-green-900/20',
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Business insights and performance metrics
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-${metric.color}-50 dark:bg-${metric.color}-900/20`}>
                    <Icon className={`text-${metric.color}-600`} size={24} />
                  </div>
                  <span className={`text-sm font-semibold ${
                    metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-1">{metric.value}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{metric.label}</p>
              </div>
            );
          })}
        </div>

        {/* Booking Statistics */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-6">Booking Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bookingStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className={`${stat.bg} rounded-xl p-6`}
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
        </div>

        {/* Revenue Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Revenue Overview</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Total Revenue</span>
                <span className="text-2xl font-bold text-blue-600">
                  ₹{(stats?.totalRevenue || 0).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Average Order Value</span>
                <span className="text-xl font-semibold">
                  ₹{stats?.totalBookings > 0 
                    ? Math.round(stats.totalRevenue / stats.totalBookings).toLocaleString()
                    : 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Total Orders</span>
                <span className="text-xl font-semibold">{stats?.totalBookings || 0}</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Service Performance</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Active Services</span>
                <span className="text-2xl font-bold text-green-600">
                  {stats?.activeServices || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Total Users</span>
                <span className="text-xl font-semibold">{stats?.totalUsers || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Completion Rate</span>
                <span className="text-xl font-semibold text-green-600">
                  {stats?.totalBookings > 0
                    ? Math.round((stats.completedBookings / stats.totalBookings) * 100)
                    : 0}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Growth Indicators */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Business Growth</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-blue-100 mb-2">User Growth</p>
              <p className="text-3xl font-bold">+12%</p>
              <p className="text-sm text-blue-100 mt-1">vs last month</p>
            </div>
            <div>
              <p className="text-blue-100 mb-2">Revenue Growth</p>
              <p className="text-3xl font-bold">+15%</p>
              <p className="text-sm text-blue-100 mt-1">vs last month</p>
            </div>
            <div>
              <p className="text-blue-100 mb-2">Booking Growth</p>
              <p className="text-3xl font-bold">+8%</p>
              <p className="text-sm text-blue-100 mt-1">vs last month</p>
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            <strong>Note:</strong> Analytics data is calculated from your Supabase database. 
            Growth percentages are sample values. Implement time-series queries for accurate historical comparisons.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
