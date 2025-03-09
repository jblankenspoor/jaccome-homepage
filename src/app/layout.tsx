/**
 * Root Layout Component for Jacco's Homepage
 * @description The root layout component that wraps all pages
 * @version 3.0.0
 * @author Jacco
 */

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

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
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
