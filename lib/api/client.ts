// API Client for making requests to backend

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
  const url = `${baseUrl}/api${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new ApiError(response.status, error.message || 'Request failed');
    }

    return response.json();
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, 'Network error occurred');
  }
}

// Cart API
export const cartApi = {
  addItem: (item: { id: string; name: string; price: number; type: string }) =>
    fetchApi('/cart/add', {
      method: 'POST',
      body: JSON.stringify(item),
    }),

  getCart: () => fetchApi('/cart'),

  removeItem: (id: string) =>
    fetchApi(`/cart/remove/${id}`, { method: 'DELETE' }),

  clearCart: () =>
    fetchApi('/cart/clear', { method: 'DELETE' }),
};

// Booking API
export const bookingApi = {
  bookHomeVisit: (data: { name: string; phone: string; address: string; date?: string; time?: string }) =>
    fetchApi('/booking/home-visit', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  bookTest: (testId: string, data: any) =>
    fetchApi(`/booking/test/${testId}`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  bookPackage: (packageId: string, data: any) =>
    fetchApi(`/booking/package/${packageId}`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  bookRadiology: (serviceId: string, data: any) =>
    fetchApi(`/booking/radiology/${serviceId}`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  bookConsultation: (data: { name: string; phone: string; email: string; message: string }) =>
    fetchApi('/booking/consultation', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// Prescription API
export const prescriptionApi = {
  upload: (file: File) => {
    const formData = new FormData();
    formData.append('prescription', file);
    return fetch('/api/prescription/upload', {
      method: 'POST',
      body: formData,
    }).then(res => res.json());
  },
};

// Reports API
export const reportsApi = {
  getReports: () => fetchApi('/reports'),

  downloadReport: (reportId: string) =>
    fetchApi(`/reports/download/${reportId}`),
};

// Support API
export const supportApi = {
  createTicket: (data: { name: string; email: string; phone: string; message: string }) =>
    fetchApi('/support/ticket', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  callback: (phone: string) =>
    fetchApi('/support/callback', {
      method: 'POST',
      body: JSON.stringify({ phone }),
    }),
};

// Location API
export const locationApi = {
  findNearby: (pincode: string) =>
    fetchApi(`/locations/nearby?pincode=${pincode}`),

  getAll: () => fetchApi('/locations'),
};

// Health Concerns API
export const healthConcernsApi = {
  getTests: (concernId: string) =>
    fetchApi(`/health-concerns/${concernId}/tests`),
};
