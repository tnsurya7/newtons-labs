'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiCheckCircle, FiXCircle, FiAlertCircle, FiHome } from 'react-icons/fi';
import Button from '@/components/ui/Button';

interface ConnectionStatus {
  supabase: {
    configured: boolean;
    connected: boolean;
    error?: string;
    tablesCount?: number;
  };
  email: {
    configured: boolean;
    service?: string;
  };
  environment: {
    supabaseUrl: boolean;
    supabaseAnonKey: boolean;
    supabaseServiceKey: boolean;
    resendKey: boolean;
  };
}

export default function TestConnectionPage() {
  const router = useRouter();
  const [status, setStatus] = useState<ConnectionStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    testConnections();
  }, []);

  const testConnections = async () => {
    try {
      const response = await fetch('/api/test-connection');
      const data = await response.json();
      setStatus(data);
    } catch (error) {
      console.error('Error testing connections:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-teal-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Testing connections...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Connection Test</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Check your database and service connections
          </p>
        </div>

        {/* Supabase Status */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Supabase Database</h2>
            {status?.supabase.connected ? (
              <FiCheckCircle className="text-green-600" size={32} />
            ) : status?.supabase.configured ? (
              <FiAlertCircle className="text-yellow-600" size={32} />
            ) : (
              <FiXCircle className="text-red-600" size={32} />
            )}
          </div>

          <div className="space-y-3">
            <StatusRow
              label="Configuration"
              status={status?.supabase.configured ? 'success' : 'error'}
              message={status?.supabase.configured ? 'Environment variables set' : 'Missing environment variables'}
            />
            
            <StatusRow
              label="Connection"
              status={status?.supabase.connected ? 'success' : 'error'}
              message={status?.supabase.connected ? 'Successfully connected' : status?.supabase.error || 'Not connected'}
            />

            {status?.supabase.connected && (
              <StatusRow
                label="Tables"
                status="success"
                message={`${status.supabase.tablesCount || 0} tables accessible`}
              />
            )}
          </div>

          {!status?.supabase.configured && (
            <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
              <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-2">
                <strong>Setup Required:</strong>
              </p>
              <ol className="text-sm text-yellow-700 dark:text-yellow-300 list-decimal list-inside space-y-1">
                <li>Create Supabase account at https://supabase.com</li>
                <li>Create new project</li>
                <li>Run SQL migration from <code>supabase/schema.sql</code></li>
                <li>Add credentials to <code>.env.local</code></li>
              </ol>
            </div>
          )}
        </div>

        {/* Email Service Status */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Email Service</h2>
            {status?.email.configured ? (
              <FiCheckCircle className="text-green-600" size={32} />
            ) : (
              <FiXCircle className="text-gray-400" size={32} />
            )}
          </div>

          <div className="space-y-3">
            <StatusRow
              label="Configuration"
              status={status?.email.configured ? 'success' : 'warning'}
              message={status?.email.configured ? `${status.email.service} configured` : 'Email service not configured (optional)'}
            />
          </div>

          {!status?.email.configured && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
                <strong>Optional Setup:</strong>
              </p>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Add <code>RESEND_API_KEY</code> to <code>.env.local</code> to enable email notifications.
                Get your API key from https://resend.com
              </p>
            </div>
          )}
        </div>

        {/* Environment Variables */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Environment Variables</h2>
          
          <div className="space-y-3">
            <StatusRow
              label="NEXT_PUBLIC_SUPABASE_URL"
              status={status?.environment.supabaseUrl ? 'success' : 'error'}
              message={status?.environment.supabaseUrl ? 'Set' : 'Missing'}
            />
            
            <StatusRow
              label="NEXT_PUBLIC_SUPABASE_ANON_KEY"
              status={status?.environment.supabaseAnonKey ? 'success' : 'error'}
              message={status?.environment.supabaseAnonKey ? 'Set' : 'Missing'}
            />
            
            <StatusRow
              label="SUPABASE_SERVICE_ROLE_KEY"
              status={status?.environment.supabaseServiceKey ? 'success' : 'error'}
              message={status?.environment.supabaseServiceKey ? 'Set' : 'Missing'}
            />
            
            <StatusRow
              label="RESEND_API_KEY"
              status={status?.environment.resendKey ? 'success' : 'warning'}
              message={status?.environment.resendKey ? 'Set' : 'Not set (optional)'}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button onClick={() => testConnections()} variant="outline">
            Test Again
          </Button>
          <Button onClick={() => router.push('/')} className="gap-2">
            <FiHome /> Back to Home
          </Button>
        </div>

        {/* Documentation Link */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Need help? Check <code>ENV_SETUP_GUIDE.md</code> for detailed setup instructions
          </p>
        </div>

      </div>
    </div>
  );
}

function StatusRow({ label, status, message }: { label: string; status: 'success' | 'error' | 'warning'; message: string }) {
  const icons = {
    success: <FiCheckCircle className="text-green-600" size={20} />,
    error: <FiXCircle className="text-red-600" size={20} />,
    warning: <FiAlertCircle className="text-yellow-600" size={20} />,
  };

  const colors = {
    success: 'text-green-700 dark:text-green-400',
    error: 'text-red-700 dark:text-red-400',
    warning: 'text-yellow-700 dark:text-yellow-400',
  };

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
      <div className="flex items-center gap-3">
        {icons[status]}
        <span className="font-medium text-gray-900 dark:text-white">{label}</span>
      </div>
      <span className={`text-sm ${colors[status]}`}>{message}</span>
    </div>
  );
}
