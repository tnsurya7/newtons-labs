'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  FiHome, FiPackage, FiUsers, FiShoppingBag, 
  FiBarChart2, FiLogOut, FiMenu, FiX 
} from 'react-icons/fi';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<any>(null);

  useEffect(() => {
    // Check if admin is logged in
    const token = localStorage.getItem('adminToken');
    const user = localStorage.getItem('adminUser');

    if (!token || !user) {
      router.push('/admin/login');
      return;
    }

    setAdminUser(JSON.parse(user));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    router.push('/admin/login');
  };

  const menuItems = [
    { icon: FiHome, label: 'Dashboard', href: '/admin/dashboard' },
    { icon: FiPackage, label: 'Services', href: '/admin/services' },
    { icon: FiUsers, label: 'Users', href: '/admin/users' },
    { icon: FiShoppingBag, label: 'Bookings', href: '/admin/bookings' },
    { icon: FiBarChart2, label: 'Analytics', href: '/admin/analytics' },
  ];

  if (!adminUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-50 transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-blue-600">New10Lab Admin</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
            
            return (
              <button
                key={item.href}
                onClick={() => {
                  router.push(item.href);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="mb-3 px-4">
            <p className="text-sm font-medium">{adminUser.name}</p>
            <p className="text-xs text-gray-500">{adminUser.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <FiLogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        
        {/* Top Bar */}
        <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden"
          >
            <FiMenu size={24} />
          </button>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Welcome back, {adminUser.name}
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>

      </div>
    </div>
  );
}
