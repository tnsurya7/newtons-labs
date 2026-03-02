'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import { FiPackage, FiActivity } from 'react-icons/fi';

export default function AdminServicesPage() {
  const router = useRouter();

  const serviceTypes = [
    {
      icon: FiActivity,
      title: 'Tests Management',
      description: 'Manage diagnostic tests, prices, and details',
      href: '/admin/services/tests',
      color: 'blue',
      count: '6 active tests',
    },
    {
      icon: FiPackage,
      title: 'Packages Management',
      description: 'Manage health packages and bundles',
      href: '/admin/services/packages',
      color: 'purple',
      count: '4 active packages',
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Services Management</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your diagnostic tests and health packages
          </p>
        </div>

        {/* Service Type Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {serviceTypes.map((service) => {
            const Icon = service.icon;
            return (
              <button
                key={service.href}
                onClick={() => router.push(service.href)}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-left hover:shadow-xl transition-shadow"
              >
                <div className={`inline-flex p-4 rounded-xl bg-${service.color}-50 dark:bg-${service.color}-900/20 mb-4`}>
                  <Icon className={`text-${service.color}-600`} size={32} />
                </div>
                <h2 className="text-2xl font-bold mb-2">{service.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {service.description}
                </p>
                <p className="text-sm text-gray-500">{service.count}</p>
              </button>
            );
          })}
        </div>

      </div>
    </AdminLayout>
  );
}
