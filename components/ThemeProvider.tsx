'use client';

import { useEffect } from 'react';
import { useThemeStore } from '@/store/theme';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    const { isDark } = useThemeStore();

    useEffect(() => {
        // Apply theme to document element
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    // Also apply theme on initial load
    useEffect(() => {
        const stored = localStorage.getItem('theme-storage');
        if (stored) {
            try {
                const { state } = JSON.parse(stored);
                if (state?.isDark) {
                    document.documentElement.classList.add('dark');
                }
            } catch (error) {
                console.error('Error parsing theme from localStorage:', error);
            }
        }
    }, []);

    return <>{children}</>;
}