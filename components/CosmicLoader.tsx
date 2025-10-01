'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface CosmicLoaderProps {
  onComplete?: () => void;
}

const CosmicLoader = ({ onComplete }: CosmicLoaderProps = {}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  // Initialize mobile detection immediately to prevent flash - default to desktop for better experience
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // Debug logging
  useEffect(() => {
    // CosmicLoader loading started
  }, [pathname]);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Reset for each navigation
    setIsVisible(true);
    setLoadingProgress(0);
    setIsTransitioning(false);

    // Animate progress bar
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        const increment = Math.random() * 15 + 5;
        return Math.min(prev + increment, 90); // Ensure it never exceeds 90
      });
    }, 150);

    // Complete loading after a reasonable time (longer on desktop to show the beautiful animation)
    const completeTimer = setTimeout(() => {
      setLoadingProgress(100);
      
      // Start transition phase
      setTimeout(() => {
        setIsTransitioning(true);
        
        // Hide loader after transition - ensure smooth handoff to main content
        setTimeout(() => {
          setIsVisible(false);
          onComplete?.(); // Notify parent component that loading is complete
        }, isMobile ? 600 : 1800); // Longer transition for smooth handoff
      }, isMobile ? 300 : 1000); // Longer pause on desktop
    }, isMobile ? 1200 : 3000); // Extended time on desktop to show the full cosmic animation

    return () => {
      clearInterval(progressInterval);
      clearTimeout(completeTimer);
    };
  }, [pathname, isMobile]); // Add isMobile to dependencies

  if (!isVisible) return null;

  // Don't show cosmic loader on mobile devices
  if (isMobile) {
    // Immediately complete for mobile
    setTimeout(() => onComplete?.(), 0);
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ 
            opacity: isTransitioning ? 0 : 1,
            scale: isTransitioning ? 1.05 : 1,
            filter: isTransitioning ? "blur(5px)" : "blur(0px)"
          }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            filter: "blur(10px)"
          }}
          transition={{ 
            duration: isTransitioning ? 1.2 : 0.8, 
            ease: [0.4, 0.0, 0.2, 1] // Custom easing for smooth transition
          }}
          className="fixed inset-0 z-[99999] bg-slate-900 flex items-center justify-center"
          style={{ 
            background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
            backdropFilter: 'blur(10px)'
          }}
        >
        {/* Central Loading Animation */}
        <div className="relative flex flex-col items-center justify-center">
          {/* Orbital Rings - Simplified on mobile */}
          {isMobile ? (
            // Simple single ring for mobile
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute w-16 h-16 border-2 border-cyan-400/60 rounded-full"
            />
          ) : (
            // Full orbital system for desktop
            <>
              {/* Outer Orbital Ring */}
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute w-32 h-32 border border-blue-400/30 rounded-full"
              />
              
              {/* Middle Orbital Ring */}
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute w-24 h-24 border border-purple-400/40 rounded-full"
              />
              
              {/* Inner Orbital Ring */}
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute w-16 h-16 border border-cyan-400/50 rounded-full"
              />
            </>
          )}

          {/* Orbiting Planets - Only on desktop */}
          {!isMobile && (
            <>
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute w-32 h-32"
              >
                <div className="absolute -top-1 left-1/2 w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50" />
              </motion.div>

              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute w-24 h-24"
              >
                <div className="absolute -top-1 left-1/2 w-1.5 h-1.5 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50" />
              </motion.div>

              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute w-16 h-16"
              >
                <div className="absolute -top-0.5 left-1/2 w-1 h-1 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50" />
              </motion.div>
            </>
          )}

          {/* Central Sun/Core */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1.2 }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              repeatType: "reverse",
              ease: "easeInOut" 
            }}
            className="w-6 h-6 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-full shadow-2xl shadow-orange-400/50"
          />

          {/* Loading Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute top-20 text-center"
          >
            <motion.h2
              animate={{ 
                opacity: isTransitioning ? [1, 0.3, 0] : [0.5, 1, 0.5],
                y: isTransitioning ? -20 : 0
              }}
              transition={{ 
                duration: isTransitioning ? 1 : 2, 
                repeat: isTransitioning ? 0 : Infinity,
                ease: "easeInOut" 
              }}
              className="text-2xl font-light text-white/80 tracking-wider mb-2"
            >
              {isTransitioning ? 'WELCOME' : (loadingProgress >= 100 ? 'READY' : 'INITIALIZING')}
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              animate={{ 
                width: `${Math.min(loadingProgress, 100)}%`,
                opacity: isTransitioning ? 0 : 1
              }}
              transition={{ 
                duration: loadingProgress >= 100 ? 0.3 : 0.1, 
                ease: "easeOut" 
              }}
              className="h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            />
            {/* Progress percentage */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: isTransitioning ? 0 : 0.4,
                y: isTransitioning ? -10 : 0
              }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-xs text-white/30 tracking-wide mt-1"
            >
              {isTransitioning ? '' : `${Math.round(Math.min(loadingProgress, 100))}%`}
            </motion.p>
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: isTransitioning ? 0.8 : 0.6,
                y: isTransitioning ? -10 : 0
              }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-sm text-white/40 tracking-wide mt-1"
            >
              {isTransitioning ? 'Experience awaits...' : (loadingProgress >= 100 ? 'Launching...' : 'Entering the cosmos...')}
            </motion.p>
          </motion.div>
        </div>

        {/* Cosmic Nebula Effects - Only on desktop */}
        {!isMobile && (
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 15, 
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-purple-500/20 via-blue-500/10 to-transparent rounded-full blur-3xl"
            />
            <motion.div
              animate={{ 
                scale: [1.2, 1, 1.2],
                opacity: [0.1, 0.2, 0.1],
                rotate: [360, 180, 0]
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-cyan-500/20 via-purple-500/10 to-transparent rounded-full blur-3xl"
            />
          </div>
        )}

        {/* Cosmic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-slate-900/50" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CosmicLoader;