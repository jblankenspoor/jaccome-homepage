/**
 * Root Layout Component for Jacco's Homepage
 * @description The root layout component that wraps all pages
 * @version 3.0.1
 * @author Jacco
 */

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import dynamic from 'next/dynamic';

/**
 * Inter font configuration
 * @type {NextFont}
 */
const inter = Inter({ subsets: ["latin"] });

/**
 * Metadata for the site
 * @type {Metadata}
 */
export const metadata: Metadata = {
  title: {
    template: "%s | Jacco's Portfolio",
    default: "Jacco's Portfolio",
  },
  description: "A showcase of Jacco's projects and skills",
  keywords: ["portfolio", "developer", "web development", "projects"],
  authors: [{ name: "Jacco" }],
};

/**
 * RootLayout component props interface
 * @interface RootLayoutProps
 * @property {React.ReactNode} children - Child components
 */
interface RootLayoutProps {
  children: React.ReactNode;
}

/**
 * RootLayout component
 * @param {RootLayoutProps} props - Component props
 * @returns {JSX.Element} - RootLayout component
 */
export default function RootLayout({ children }: RootLayoutProps) {
  // Dynamically import PiwikProTracker with no SSR to ensure it only runs on client
  const PiwikProTracker = dynamic(
    () => import('../components/PiwikProTracker'),
    { ssr: false }
  );
  
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <PiwikProTracker />
        <div className="fixed bottom-1 left-1 text-xs text-gray-400">v3.0.1</div>
      </body>
    </html>
  );
}
