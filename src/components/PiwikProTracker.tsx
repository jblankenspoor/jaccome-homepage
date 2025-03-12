'use client';

import { useEffect, useCallback } from 'react';
import PiwikPro from '@piwikpro/react-piwik-pro';

/**
 * PiwikProTracker component
 * 
 * This component initializes Piwik Pro analytics tracking for the application.
 * It uses the Piwik Pro React library to track page views and other analytics data.
 * 
 * @version 1.0.0
 * @see {@link https://developers.piwik.pro/docs/react} for Piwik Pro React documentation
 * @returns {null} This component doesn't render anything visible
 */
export default function PiwikProTracker() {
  /**
   * Track a page view in Piwik Pro
   * 
   * @param {string} path - The current page path
   * @param {string} title - The current page title
   */
  const trackPageView = useCallback((path: string, title: string) => {
    try {
      // Use the PiwikPro object to track a page view
      // This uses the underlying JavaScript API
      if (typeof window !== 'undefined' && window._paq) {
        window._paq.push(['setCustomUrl', path]);
        window._paq.push(['setDocumentTitle', title]);
        window._paq.push(['trackPageView']);
        console.log(`Piwik Pro tracked page view: ${path}`);
      }
    } catch (error) {
      console.error('Error tracking page view in Piwik Pro:', error);
    }
  }, []);

  /**
   * Initialize Piwik Pro and set up tracking
   */
  useEffect(() => {
    try {
      // Initialize Piwik Pro with the site ID and container URL
      PiwikPro.initialize(
        '3ed68300-fe82-42f6-9f7d-7598f06f6d74', 
        'https://jacco.containers.piwik.pro'
      );
      
      // Ensure this only runs on client side
      if (typeof window === 'undefined') return;

      // Define window._paq if it doesn't exist
      window._paq = window._paq || [];
      
      // Track the initial page view
      const currentPath = window.location.pathname;
      const currentTitle = document.title || 'Jacco\'s Portfolio';
      trackPageView(currentPath, currentTitle);

      // Set up navigation tracking for client-side navigation
      const handleRouteChange = () => {
        const newPath = window.location.pathname;
        const newTitle = document.title || 'Jacco\'s Portfolio';
        trackPageView(newPath, newTitle);
      };

      // Listen for route changes in Next.js App Router
      // This is a custom approach since Next.js App Router doesn't have built-in events
      const originalPushState = history.pushState;
      const originalReplaceState = history.replaceState;

      history.pushState = function(...args) {
        originalPushState.apply(this, args);
        handleRouteChange();
      };

      history.replaceState = function(...args) {
        originalReplaceState.apply(this, args);
        handleRouteChange();
      };

      window.addEventListener('popstate', handleRouteChange);

      // Clean up event listeners when component unmounts
      return () => {
        window.removeEventListener('popstate', handleRouteChange);
        history.pushState = originalPushState;
        history.replaceState = originalReplaceState;
      };
    } catch (error) {
      console.error('Error initializing Piwik Pro:', error);
    }
  }, [trackPageView]);

  // This component doesn't render anything
  return null;
}
