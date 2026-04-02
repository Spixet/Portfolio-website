'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// This component tracks navigation events and helps reset/cleanup resources
export const NavigationEvents = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Function to create a new event we can dispatch
    const createCustomEvent = (name: string, detail = {}) => {
      return new CustomEvent(name, { 
        bubbles: true, 
        cancelable: true, 
        detail 
      });
    };

    console.log(`Navigation detected: Pathname changed to ${pathname}`);

    // Dispatch a custom navigation event for other components that might need it
    document.dispatchEvent(
      createCustomEvent('app:navigation:complete', { 
        pathname, 
        searchParams: searchParams.toString() 
      })
    );

    // Optional: Add popstate listener if specific back/forward handling is needed
    // const handlePopState = () => {
    //   console.log('Popstate event detected');
    //   // Add any specific logic needed for back/forward navigation
    // };
    // window.addEventListener('popstate', handlePopState);

    // return () => {
    //   window.removeEventListener('popstate', handlePopState);
    // };

  }, [pathname, searchParams]);

  return null; // This component doesn't render anything
};
