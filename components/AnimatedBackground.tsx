'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const AnimatedBackground = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMobile, setIsMobile] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Reduce timer frequency on mobile or when motion is reduced
    const interval = (isMobile || shouldReduceMotion) ? 300000 : 60000; // 5 min vs 1 min
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, interval);

    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile, shouldReduceMotion]);

  // Calculate sun position based on time
  const getSunPosition = () => {
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const totalMinutes = hours * 60 + minutes;
    
    let sunAngle;
    let isVisible;
    
    if (totalMinutes >= 360 && totalMinutes <= 1080) { // 6 AM to 6 PM
      sunAngle = ((totalMinutes - 360) / 720) * 180; // 0 to 180 degrees
      isVisible = true;
    } else {
      isVisible = false;
      sunAngle = totalMinutes < 360 ? 180 + ((totalMinutes + 720) / 720) * 180 : 180 + ((totalMinutes - 1080) / 720) * 180;
    }
    
    const x = 50 + Math.cos((sunAngle - 90) * Math.PI / 180) * 45;
    const y = 50 - Math.sin((sunAngle - 90) * Math.PI / 180) * 35;
    
    return { x, y, isVisible, angle: sunAngle };
  };

  const sunPosition = getSunPosition();
  
  // Memoize expensive calculations
  const backgroundStyles = useMemo(() => ({
    space: {
      background: `
        radial-gradient(ellipse at 15% 25%, rgba(8, 12, 20, 1) 0%, rgba(2, 4, 8, 1) 40%, rgba(0, 0, 0, 1) 70%),
        radial-gradient(ellipse at 85% 75%, rgba(12, 8, 15, 1) 0%, rgba(4, 2, 6, 1) 40%, rgba(0, 0, 0, 1) 70%),
        linear-gradient(135deg, rgba(0, 0, 0, 1) 0%, rgba(5, 8, 12, 1) 50%, rgba(0, 0, 0, 1) 100%)
      `
    },
    nebula: {
      background: `
        radial-gradient(ellipse 900px 600px at 25% 35%, rgba(60, 30, 15, 0.12) 0%, rgba(40, 20, 10, 0.06) 40%, rgba(25, 12, 6, 0.03) 70%, transparent 85%),
        radial-gradient(ellipse 700px 500px at 75% 65%, rgba(40, 20, 60, 0.10) 0%, rgba(25, 12, 35, 0.05) 45%, rgba(15, 8, 20, 0.02) 75%, transparent 90%),
        radial-gradient(ellipse 600px 400px at 60% 20%, rgba(20, 40, 60, 0.08) 0%, rgba(12, 25, 35, 0.04) 50%, rgba(8, 15, 20, 0.02) 80%, transparent 95%)
      `,
      filter: isMobile ? 'blur(30px)' : 'blur(60px)',
      opacity: isMobile ? 0.4 : 0.6
    }
  }), [isMobile]);

  return (
    <div className="fixed inset-0 overflow-hidden -z-10" style={{ willChange: 'auto' }}>
      {/* Deep space background */}
      <div className="absolute inset-0" style={backgroundStyles.space} />

      {/* Simplified Nebula Clouds - Mobile Optimized */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute inset-0 animated-bg-element"
          style={backgroundStyles.nebula}
          animate={isMobile ? {} : {
            scale: [1, 1.005, 1],
            rotate: [0, 0.05, 0]
          }}
          transition={isMobile ? {} : {
            duration: 240,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
      
      {/* Simplified Grid - Mobile Optimized */}
      {!isMobile && !shouldReduceMotion && (
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {/* CSS-based grid pattern - no JavaScript animations */}
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(180, 200, 255, 0.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(180, 200, 255, 0.08) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
              animation: 'fadeGrid 12s ease-in-out infinite alternate'
            }}
          />
        </div>
      )}

      {/* Minimal floating elements for desktop only */}
      {!isMobile && !shouldReduceMotion && (
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <motion.div
            className="absolute left-1/4 top-1/4 w-8 h-8 border border-blue-300/40 rounded-full animated-bg-element"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute right-1/3 top-2/3 w-6 h-6 border border-purple-300/40 animated-bg-element"
            style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
            animate={{ rotate: [0, -360] }}
            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}

      {/* Static elements for mobile */}
      {isMobile && (
        <div className="absolute inset-0 overflow-hidden opacity-15">
          <div className="absolute left-1/4 top-1/4 w-4 h-4 border border-blue-300/50 rounded-full" />
          <div className="absolute right-1/3 top-2/3 w-3 h-3 border border-purple-300/50" 
               style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
          <div className="absolute right-1/4 top-1/6 w-2 h-2 border border-cyan-300/50" />
        </div>
      )}

      {/* Simplified Sun - Mobile Optimized */}
      {sunPosition.isVisible && !shouldReduceMotion && (
        <div
          className="absolute w-8 h-8 animated-bg-element"
          style={{
            left: `${sunPosition.x}%`,
            top: `${sunPosition.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          {/* Simple sun with CSS-only glow */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(255, 220, 120, 0.7) 0%, rgba(255, 200, 80, 0.5) 50%, transparent 100%)`,
              filter: isMobile ? 'blur(3px)' : 'blur(6px)',
              transform: isMobile ? 'scale(1.5)' : 'scale(2)'
            }}
          />
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 220, 120, 0.8) 70%, rgba(255, 180, 60, 0.7) 100%)`,
              boxShadow: isMobile ? '0 0 10px rgba(255, 220, 120, 0.4)' : '0 0 20px rgba(255, 220, 120, 0.6)'
            }}
          />
        </div>
      )}

      {/* Static stars for better performance */}
      <div className="absolute inset-0 overflow-hidden opacity-50">
        {Array.from({ length: isMobile ? 30 : 80 }).map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.6 + 0.2
            }}
          />
        ))}
      </div>
      
      {/* Simplified planets - Desktop only */}
      {!isMobile && !shouldReduceMotion && (
        <>
          <div
            className="absolute top-1/5 right-1/5 w-6 h-6 rounded-full opacity-60 animated-bg-element"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #C4441C 0%, #8E2E17 70%)',
              boxShadow: '0 0 15px rgba(196, 68, 28, 0.2)'
            }}
          />
          <div
            className="absolute bottom-1/5 left-1/8 w-8 h-8 rounded-full opacity-50 animated-bg-element"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #4682B4 0%, #065781 70%)',
              boxShadow: '0 0 20px rgba(70, 130, 180, 0.2)'
            }}
          />
        </>
      )}

      {/* Subtle cosmic microwave background radiation effect */}
      <motion.div
        className="absolute inset-0 opacity-20 animated-bg-element"
        style={{
          background: `
            radial-gradient(ellipse 200% 100% at 50% 0%, rgba(255, 100, 200, 0.02) 0%, transparent 50%),
            radial-gradient(ellipse 150% 100% at 0% 100%, rgba(100, 200, 255, 0.015) 0%, transparent 60%),
            radial-gradient(ellipse 180% 120% at 100% 50%, rgba(200, 255, 100, 0.01) 0%, transparent 70%)
          `
        }}
        animate={isMobile ? {} : {
          scale: [1, 1.02, 0.98, 1.01, 1]
        }}
        transition={isMobile ? {} : {
          duration: 300,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default AnimatedBackground;