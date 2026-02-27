import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Newton Labs - Premium Diagnostic Laboratory | NABL Certified",
  description: "Book diagnostic tests from India's most trusted laboratory. NABL certified, free home sample collection, accurate reports. 250+ cities, 10M+ tests per year.",
  keywords: "diagnostic lab, pathology tests, health checkup, blood test, NABL certified, home sample collection, medical tests India",
  authors: [{ name: "Newton Labs" }],
  openGraph: {
    title: "Newton Labs - Premium Diagnostic Laboratory",
    description: "Book diagnostic tests with free home sample collection. NABL certified labs across 250+ cities.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Newton Labs - Premium Diagnostic Laboratory",
    description: "Book diagnostic tests with free home sample collection. NABL certified labs across 250+ cities.",
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0EA5E9',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased min-h-screen`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
