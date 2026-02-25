import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LocationStore {
    city: string;
    pincode: string;
    setLocation: (city: string, pincode: string) => void;
}

export const useLocationStore = create<LocationStore>()(
    persist(
        (set) => ({
            city: 'Chennai',
            pincode: '600001',
            setLocation: (city: string, pincode: string) => set({ city, pincode }),
        }),
        {
            name: 'location-storage',
        }
    )
);