import { useState } from 'react';
import { bookingApi } from '@/lib/api/client';

export function useBooking() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const bookHomeVisit = async (data: {
    name: string;
    phone: string;
    address: string;
    date?: string;
    time?: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await bookingApi.bookHomeVisit(data);
      return response;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const bookConsultation = async (data: {
    name: string;
    phone: string;
    email: string;
    message: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await bookingApi.bookConsultation(data);
      return response;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    bookHomeVisit,
    bookConsultation,
  };
}
