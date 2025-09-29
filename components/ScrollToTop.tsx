'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top whenever the route changes
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    // Set scroll restoration to manual on initial load
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // Ensure page starts at top on refresh
    window.scrollTo(0, 0);
    
    // Prevent the browser from restoring scroll position
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return null;
}