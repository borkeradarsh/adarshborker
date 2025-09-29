'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import AnimatedBackground from '@/components/AnimatedBackground';

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
  useEffect(() => {
    // Scroll to top on page load/refresh
    window.scrollTo(0, 0);
    // Also set scroll restoration to manual
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <div className="relative">
      <AnimatedBackground />
      <motion.div
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        className="relative z-10"
      >
        <Hero />
      </motion.div>
    </div>
  );
}