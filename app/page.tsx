'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Hero from '../components/Hero';

// Dynamic imports for performance optimization
const AnimatedBackground = dynamic(() => import('../components/AnimatedBackground'), {
  ssr: false, // Client-side only to reduce server bundle
  loading: () => null, // No loading placeholder to prevent CLS
});

const CosmicLoader = dynamic(() => import('../components/CosmicLoader'), {
  ssr: false, // Client-side only for loading animation
  loading: () => null, // No loading placeholder
});

// Preload components
const preloadAnimatedBackground = () => {
  const componentImport = () => import('../components/AnimatedBackground');
  return componentImport;
};

const pageTransition = {
  initial: { 
    opacity: 0, 
    y: 10 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.4,
      ease: 'easeOut'
    }
  },
  exit: { 
    opacity: 0, 
    y: -10,
    transition: { 
      duration: 0.3,
      ease: 'easeIn'
    }
  }
};

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Scroll to top on page load/refresh
    window.scrollTo(0, 0);
    // Also set scroll restoration to manual
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Preload critical resources to prevent CLS
    const preloadLinks = [
      { href: '/profile-picture.jpg', as: 'image', type: 'image/jpeg' },
      { href: '/resume.pdf', as: 'fetch', crossOrigin: 'anonymous' }
    ];

    preloadLinks.forEach(({ href, as, type, crossOrigin }) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = as;
      if (type) link.type = type;
      if (crossOrigin) link.crossOrigin = crossOrigin;
      document.head.appendChild(link);
    });

    // Preload background component
    let preloadTriggered = false;
    const preloadComponent = () => {
      if (!preloadTriggered) {
        preloadTriggered = true;
        preloadAnimatedBackground();
      }
    };

    const events = ['mouseenter', 'touchstart', 'focus'];
    events.forEach(event => 
      document.addEventListener(event, preloadComponent, { once: true, passive: true })
    );

    return () => {
      events.forEach(event => 
        document.removeEventListener(event, preloadComponent)
      );
    };
  }, []);

  const handleLoaderComplete = () => {
    // Smooth transition from loader to main content with CLS prevention
    setShowContent(true);
    setTimeout(() => {
      setShowLoader(false);
    }, 300); // Small delay for smooth handoff
  };

  return (
    <div 
      className="relative"
      style={{
        // Prevent CLS during loading
        minHeight: '100vh',
        contain: 'layout',
        willChange: showLoader ? 'contents' : 'auto'
      }}
    >
      {showLoader && <CosmicLoader onComplete={handleLoaderComplete} />}
      {showContent && (
        <>
          <AnimatedBackground />
          <motion.div
            variants={pageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative z-10"
            style={{ 
              opacity: showLoader ? 0 : 1,
              transition: 'opacity 0.8s ease-in-out',
              // Prevent layout shifts
              minHeight: '100vh',
              contain: 'layout'
            }}
          >
            <Hero />
          </motion.div>
        </>
      )}
    </div>
  );
}