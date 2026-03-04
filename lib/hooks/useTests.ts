import { useState, useEffect } from 'react';

interface Test {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  parameters: number;
  reportTime: string;
  fasting: boolean;
  category: string;
}

interface UseTestsOptions {
  category?: string;
  search?: string;
  limit?: number;
}

export function useTests(options: UseTestsOptions = {}) {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTests() {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        
        if (options.category) params.append('category', options.category);
        if (options.search) params.append('search', options.search);
        if (options.limit) params.append('limit', options.limit.toString());

        const response = await fetch(`/api/tests?${params.toString()}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch tests');
        }

        const data = await response.json();
        setTests(data.tests || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching tests:', err);
        setError(err instanceof Error ? err.message : 'Failed to load tests');
        setTests([]);
      } finally {
        setLoading(false);
      }
    }

    fetchTests();
  }, [options.category, options.search, options.limit]);

  return { tests, loading, error };
}
