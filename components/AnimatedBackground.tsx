'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Calculate sun position based on time
  const getSunPosition = () => {
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const totalMinutes = hours * 60 + minutes;
    
    // Map 24 hours to 360 degrees (sun arc across sky)
    // 6 AM = sunrise (left horizon), 12 PM = noon (overhead), 6 PM = sunset (right horizon)
    // Night time (6 PM - 6 AM) = sun below horizon
    
    let sunAngle;
    let isVisible;
    
    if (totalMinutes >= 360 && totalMinutes <= 1080) { // 6 AM to 6 PM
      // Daytime - sun moves from left to right across sky
      sunAngle = ((totalMinutes - 360) / 720) * 180; // 0 to 180 degrees
      isVisible = true;
    } else {
      // Nighttime - sun below horizon
      isVisible = false;
      sunAngle = totalMinutes < 360 ? 180 + ((totalMinutes + 720) / 720) * 180 : 180 + ((totalMinutes - 1080) / 720) * 180;
    }
    
    const x = 50 + Math.cos((sunAngle - 90) * Math.PI / 180) * 45; // Horizontal position (5% to 95%)
    const y = 50 - Math.sin((sunAngle - 90) * Math.PI / 180) * 35; // Vertical position (15% to 85%)
    
    return { x, y, isVisible, angle: sunAngle };
  };

  const sunPosition = getSunPosition();
  return (
    <div className="fixed inset-0 overflow-hidden -z-10">
      {/* Realistic deep space background - true cosmic black */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 15% 25%, rgba(8, 12, 20, 1) 0%, rgba(2, 4, 8, 1) 40%, rgba(0, 0, 0, 1) 70%),
            radial-gradient(ellipse at 85% 75%, rgba(12, 8, 15, 1) 0%, rgba(4, 2, 6, 1) 40%, rgba(0, 0, 0, 1) 70%),
            linear-gradient(135deg, rgba(0, 0, 0, 1) 0%, rgba(5, 8, 12, 1) 50%, rgba(0, 0, 0, 1) 100%)
          `
        }}
      />

      {/* Smooth Nebula Clouds - No Flickering */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 900px 600px at 25% 35%, rgba(60, 30, 15, 0.2) 0%, rgba(40, 20, 10, 0.12) 40%, rgba(25, 12, 6, 0.06) 70%, transparent 85%),
            radial-gradient(ellipse 700px 500px at 75% 65%, rgba(40, 20, 60, 0.18) 0%, rgba(25, 12, 35, 0.10) 45%, rgba(15, 8, 20, 0.05) 75%, transparent 90%),
            radial-gradient(ellipse 600px 400px at 60% 20%, rgba(20, 40, 60, 0.15) 0%, rgba(12, 25, 35, 0.08) 50%, rgba(8, 15, 20, 0.04) 80%, transparent 95%),
            radial-gradient(ellipse 500px 350px at 15% 80%, rgba(50, 20, 35, 0.16) 0%, rgba(30, 12, 20, 0.09) 55%, rgba(18, 8, 12, 0.04) 85%, transparent 95%)
          `,
          filter: 'blur(80px)',
          opacity: 0.7
        }}
        animate={{
          scale: [1, 1.02, 0.99, 1.01, 1],
          rotate: [0, 0.2, -0.1, 0.3, 0]
        }}
        transition={{
          duration: 120,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Elegant Space Grid - Simple Wave Animation */}
      <div className="absolute inset-0 overflow-hidden">
        
        {/* Primary Grid Lines with Wave-like Opacity */}
        <motion.div 
          className="absolute inset-0"
          animate={{
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Vertical Lines */}
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={`v-${i}`}
              className="absolute w-px h-full"
              style={{
                left: `${(i + 1) * 3.33}%`,
                background: `linear-gradient(180deg, 
                  transparent 0%, 
                  rgba(180, 200, 255, 0.3) 20%, 
                  rgba(200, 220, 255, 0.6) 50%, 
                  rgba(180, 200, 255, 0.3) 80%, 
                  transparent 100%
                )`,
                filter: 'blur(0.5px)'
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.1
              }}
            />
          ))}
          
          {/* Horizontal Lines */}
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={`h-${i}`}
              className="absolute h-px w-full"
              style={{
                top: `${(i + 1) * 6.67}%`,
                background: `linear-gradient(90deg, 
                  transparent 0%, 
                  rgba(180, 200, 255, 0.2) 20%, 
                  rgba(200, 220, 255, 0.5) 50%, 
                  rgba(180, 200, 255, 0.2) 80%, 
                  transparent 100%
                )`,
                filter: 'blur(0.5px)'
              }}
              animate={{
                opacity: [0.15, 0.7, 0.15]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.15
              }}
            />
          ))}
        </motion.div>



        {/* Floating Geometric Elements */}
        <motion.div
          className="absolute left-1/4 top-1/4 w-16 h-16 border border-blue-300/20 rounded-full"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
            x: [0, 20, -10, 15, 0],
            y: [0, -15, 25, -5, 0]
          }}
          transition={{
            rotate: { duration: 30, repeat: Infinity, ease: "linear" },
            scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            x: { duration: 20, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 25, repeat: Infinity, ease: "easeInOut" }
          }}
        />

        <motion.div
          className="absolute right-1/3 top-2/3 w-12 h-12 border border-purple-300/20"
          style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
          animate={{
            rotate: [0, -360],
            scale: [1, 0.8, 1.2, 1],
            x: [0, -25, 10, -15, 0],
            y: [0, 20, -30, 5, 0]
          }}
          transition={{
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            x: { duration: 18, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 22, repeat: Infinity, ease: "easeInOut" }
          }}
        />

        <motion.div
          className="absolute right-1/4 top-1/6 w-8 h-8 border border-cyan-300/25"
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.3, 0.9, 1],
            x: [0, 15, -20, 12, 0],
            y: [0, -12, 18, -8, 0]
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            x: { duration: 16, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 19, repeat: Infinity, ease: "easeInOut" }
          }}
        />





      </div>

      {/* Dynamic Sun - moves based on real time */}
      {sunPosition.isVisible && (
        <motion.div
          className="absolute w-16 h-16"
          style={{
            left: `${sunPosition.x}%`,
            top: `${sunPosition.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.9, 1, 0.9]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Sun corona - outer glow */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `
                radial-gradient(circle, 
                  rgba(255, 220, 120, 0.8) 0%, 
                  rgba(255, 200, 80, 0.6) 20%, 
                  rgba(255, 180, 60, 0.4) 40%, 
                  rgba(255, 160, 40, 0.2) 60%, 
                  transparent 80%
                )
              `,
              filter: 'blur(8px)',
              transform: 'scale(3)'
            }}
          />
          
          {/* Sun photosphere - main body */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `
                radial-gradient(circle at 30% 30%, 
                  rgba(255, 255, 255, 1) 0%, 
                  rgba(255, 245, 200, 1) 15%, 
                  rgba(255, 220, 120, 1) 40%, 
                  rgba(255, 200, 80, 1) 70%, 
                  rgba(255, 180, 60, 1) 100%
                )
              `,
              boxShadow: `
                0 0 30px rgba(255, 220, 120, 0.8),
                0 0 60px rgba(255, 200, 80, 0.6),
                0 0 100px rgba(255, 180, 60, 0.4),
                inset -2px -2px 8px rgba(255, 160, 40, 0.3)
              `
            }}
          />
          
          {/* Solar flares - dynamic activity */}
          <motion.div
            className="absolute inset-0"
            animate={{
              rotate: [0, 360]
            }}
            transition={{
              duration: 120,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-6 bg-gradient-to-t from-yellow-300 to-transparent rounded-full"
                style={{
                  left: '50%',
                  top: '-10px',
                  transformOrigin: '50% 42px',
                  transform: `rotate(${i * 45}deg) translateX(-50%)`,
                  opacity: 0.6
                }}
                animate={{
                  scaleY: [1, 1.5, 0.8, 1.2, 1],
                  opacity: [0.4, 0.8, 0.3, 0.7, 0.4]
                }}
                transition={{
                  duration: 4 + Math.random() * 6,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}

      {/* Photorealistic Mars - Advanced CSS simulation of actual Mars photography */}
      <motion.div
        className="absolute top-1/6 left-3/4 w-48 h-48 rounded-full"
        style={{
          background: `
            /* Primary Mars surface - authentic rust/iron oxide colors from NASA imagery */
            radial-gradient(ellipse 110% 90% at ${sunPosition.isVisible ? '25%' : '75%'} 35%, 
              #C4441C 0%, #B83A1A 15%, #A33418 30%, #8E2E17 50%, #732315 70%, #5C1C0F 100%),
            
            /* Surface mineral composition variations - hematite, olivine, pyroxene */
            radial-gradient(ellipse 85% 70% at 65% 45%, rgba(180, 85, 40, 0.15) 0%, transparent 70%),
            radial-gradient(ellipse 75% 85% at 35% 65%, rgba(160, 70, 35, 0.12) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 75% 25%, rgba(200, 95, 50, 0.1) 0%, transparent 50%),
            
            /* Iron oxide weathering patterns */
            conic-gradient(from 0deg at 55% 40%, transparent 0deg, rgba(170, 65, 30, 0.08) 60deg, 
              transparent 120deg, rgba(190, 75, 40, 0.06) 180deg, transparent 240deg, 
              rgba(150, 55, 25, 0.1) 300deg, transparent 360deg),
            
            /* Atmospheric dust and haze simulation */
            radial-gradient(ellipse 180% 120% at 50% 50%, rgba(255, 180, 120, 0.03) 0%, transparent 85%),
            
            /* Polar region ice and dry ice simulation */
            radial-gradient(ellipse 35% 25% at 20% 15%, rgba(255, 220, 180, 0.08) 0%, transparent 90%),
            radial-gradient(ellipse 30% 20% at 85% 85%, rgba(240, 200, 160, 0.06) 0%, transparent 80%)
          `,
          boxShadow: `
            /* Realistic planetary terminator and shadow */
            inset ${sunPosition.isVisible ? '-30px -30px 100px' : '-50px -50px 150px'} rgba(0, 0, 0, ${sunPosition.isVisible ? '0.75' : '0.95'}),
            inset ${sunPosition.isVisible ? '25px 25px 80px' : '10px 10px 40px'} rgba(196, 68, 28, ${sunPosition.isVisible ? '0.2' : '0.08'}),
            
            /* Atmospheric glow and space environment */
            0 0 150px rgba(196, 68, 28, ${sunPosition.isVisible ? '0.35' : '0.12'}),
            0 0 300px rgba(163, 52, 24, ${sunPosition.isVisible ? '0.2' : '0.06'}),
            0 0 500px rgba(139, 42, 25, ${sunPosition.isVisible ? '0.1' : '0.03'}),
            
            /* Deep space reflection */
            0 0 800px rgba(92, 28, 15, ${sunPosition.isVisible ? '0.05' : '0.015'})
          `,
          filter: `contrast(1.8) brightness(${sunPosition.isVisible ? '1.4' : '0.5'}) saturate(1.2) sepia(0.15)`
        }}
        animate={{
          rotate: [0, 360],
          x: [0, -20, 10, -15, 5, 0],
          y: [0, 15, -8, 12, -5, 0],
          scale: [1, 1.02, 0.99, 1.01, 1]
        }}
        transition={{
          rotate: { duration: 200, repeat: Infinity, ease: "linear" },
          x: { duration: 80, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 65, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 35, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        {/* Photorealistic surface texture overlay - simulates NASA imagery detail */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          {/* Subtle mineral composition variations */}
          <div
            className="absolute inset-0 rounded-full opacity-15"
            style={{
              background: `
                radial-gradient(ellipse 40% 30% at 70% 30%, rgba(220, 120, 60, 0.4) 0%, transparent 80%),
                radial-gradient(ellipse 30% 45% at 25% 65%, rgba(180, 90, 45, 0.3) 0%, transparent 70%),
                radial-gradient(ellipse 35% 25% at 80% 75%, rgba(200, 100, 55, 0.25) 0%, transparent 60%),
                radial-gradient(ellipse 25% 35% at 40% 20%, rgba(160, 80, 40, 0.35) 0%, transparent 65%)
              `,
              filter: 'blur(0.5px) contrast(1.2)'
            }}
          />
          
          {/* Atmospheric dust layer simulation */}
          <motion.div
            className="absolute inset-0 rounded-full opacity-60"
            style={{
              background: `
                radial-gradient(ellipse 140% 100% at 50% 50%, rgba(255, 200, 150, 0.03) 0%, transparent 90%),
                linear-gradient(45deg, transparent 40%, rgba(240, 180, 120, 0.02) 50%, transparent 60%)
              `,
              filter: 'blur(1px)'
            }}
            animate={{
              opacity: [0.5, 0.7, 0.4, 0.6, 0.5],
              scale: [1, 1.01, 0.995, 1.005, 1]
            }}
            transition={{
              duration: 60,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>

      {/* Photorealistic Earth - Advanced CSS simulation of NASA satellite imagery */}
      <motion.div
        className="absolute bottom-1/5 left-1/8 w-42 h-42 rounded-full"
        style={{
          background: `
            /* Primary ocean color - based on deep ocean spectral analysis */
            radial-gradient(ellipse 120% 110% at ${sunPosition.isVisible ? '30%' : '70%'} 25%, 
              #4682B4 0%, #1E69AF 20%, #0F559E 40%, #065781 65%, #042D64 100%),
            
            /* Land mass simulation - continental color variations */
            radial-gradient(ellipse 70% 60% at 65% 70%, rgba(34, 139, 34, ${sunPosition.isVisible ? '0.6' : '0.25'}) 0%, transparent 60%),
            radial-gradient(ellipse 80% 50% at 75% 25%, rgba(139, 90, 43, ${sunPosition.isVisible ? '0.5' : '0.2'}) 0%, transparent 55%),
            radial-gradient(ellipse 60% 70% at 25% 65%, rgba(50, 120, 50, ${sunPosition.isVisible ? '0.4' : '0.15'}) 0%, transparent 50%),
            radial-gradient(ellipse 50% 40% at 85% 80%, rgba(25, 90, 25, ${sunPosition.isVisible ? '0.45' : '0.18'}) 0%, transparent 45%),
            
            /* Atmospheric perspective and curvature */
            radial-gradient(ellipse 150% 130% at 50% 50%, rgba(135, 206, 235, 0.08) 0%, transparent 85%),
            
            /* Polar ice caps simulation */
            radial-gradient(ellipse 30% 20% at 25% 8%, rgba(255, 255, 255, ${sunPosition.isVisible ? '0.4' : '0.2'}) 0%, transparent 90%),
            radial-gradient(ellipse 35% 25% at 75% 92%, rgba(255, 255, 255, ${sunPosition.isVisible ? '0.35' : '0.18'}) 0%, transparent 85%),
            
            /* Night side city lights effect */
            ${!sunPosition.isVisible ? 'radial-gradient(ellipse 100% 80% at 60% 40%, rgba(255, 255, 180, 0.03) 0%, transparent 90%),' : ''}
            
            /* Terminator line simulation */
            linear-gradient(${sunPosition.isVisible ? '135deg' : '315deg'}, transparent 0%, 
              rgba(0, 0, 0, ${sunPosition.isVisible ? '0.2' : '0.75'}) 60%, 
              rgba(0, 0, 0, ${sunPosition.isVisible ? '0.5' : '0.9'}) 100%)
          `,
          boxShadow: `
            /* Realistic planetary shadow and lighting */
            inset ${sunPosition.isVisible ? '-20px -20px 60px' : '-40px -40px 100px'} rgba(0, 0, 0, ${sunPosition.isVisible ? '0.6' : '0.95'}),
            inset ${sunPosition.isVisible ? '18px 18px 50px' : '8px 8px 25px'} rgba(70, 130, 180, ${sunPosition.isVisible ? '0.4' : '0.15'}),
            
            /* Atmospheric glow */
            0 0 100px rgba(70, 130, 180, ${sunPosition.isVisible ? '0.5' : '0.25'}),
            0 0 200px rgba(25, 105, 175, ${sunPosition.isVisible ? '0.3' : '0.15'}),
            0 0 350px rgba(15, 85, 150, ${sunPosition.isVisible ? '0.15' : '0.08'}),
            
            /* Space environment reflection */
            0 0 500px rgba(5, 45, 100, ${sunPosition.isVisible ? '0.08' : '0.04'})
          `,
          filter: `contrast(1.7) brightness(${sunPosition.isVisible ? '1.3' : '0.6'}) saturate(${sunPosition.isVisible ? '1.4' : '0.7'}) hue-rotate(${sunPosition.isVisible ? '0deg' : '10deg'})`
        }}
        animate={{
          rotate: [0, 360],
          x: [0, 12, -6, 10, -4, 0],
          y: [0, -10, 15, -8, 12, 0],
          scale: [1, 1.03, 0.98, 1.02, 1]
        }}
        transition={{
          rotate: { duration: 150, repeat: Infinity, ease: "linear" },
          x: { duration: 70, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 55, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 40, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        {/* Photorealistic atmospheric and surface detail overlay */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          {/* Cloud layer simulation - dynamic weather patterns */}
          <motion.div
            className="absolute inset-0 rounded-full opacity-40"
            style={{
              background: `
                radial-gradient(ellipse 80% 60% at 40% 30%, rgba(255, 255, 255, 0.25) 0%, transparent 70%),
                radial-gradient(ellipse 70% 50% at 75% 60%, rgba(255, 255, 255, 0.2) 0%, transparent 65%),
                radial-gradient(ellipse 60% 40% at 20% 70%, rgba(255, 255, 255, 0.18) 0%, transparent 60%),
                radial-gradient(ellipse 50% 35% at 85% 25%, rgba(255, 255, 255, 0.15) 0%, transparent 55%)
              `,
              filter: 'blur(1px)'
            }}
            animate={{
              opacity: [0.35, 0.45, 0.25, 0.40, 0.35],
              scale: [1, 1.02, 0.98, 1.01, 1]
            }}
            transition={{
              duration: 50,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Atmospheric refraction and edge glow */}
          <div
            className="absolute inset-0 rounded-full opacity-20"
            style={{
              background: `
                radial-gradient(ellipse 130% 120% at 50% 50%, transparent 70%, rgba(135, 206, 235, 0.3) 85%, rgba(70, 130, 180, 0.15) 95%, transparent 100%)
              `,
              filter: 'blur(0.5px)'
            }}
          />
        </div>
      </motion.div>

      {/* Orion Nebula - Classic deep-sky astronomical object for dark academia theme */}
      <motion.div
        className="absolute"
        style={{
          left: '18%',
          top: '55%',
          width: '220px',
          height: '180px'
        }}
        animate={{
          scale: [0.95, 1.08, 0.92, 1.05, 0.95],
          x: [0, 8, -5, 12, -3, 0],
          y: [0, -12, 6, -8, 15, 0],
          rotate: [0, 2, -1, 3, 0]
        }}
        transition={{
          scale: { duration: 60, repeat: Infinity, ease: "easeInOut" },
          x: { duration: 180, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 220, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 300, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        {/* Main nebula body - warm emission nebula colors */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              /* Central emission region - ionized hydrogen (H-alpha) */
              radial-gradient(ellipse 45% 60% at 40% 45%, 
                rgba(220, 100, 80, ${sunPosition.isVisible ? '0.4' : '0.25'}) 0%, 
                rgba(180, 70, 60, ${sunPosition.isVisible ? '0.3' : '0.18'}) 25%, 
                rgba(140, 50, 45, ${sunPosition.isVisible ? '0.2' : '0.12'}) 50%, 
                transparent 80%),
              
              /* Oxygen III emission regions - blue-green */
              radial-gradient(ellipse 35% 40% at 60% 35%, 
                rgba(80, 150, 120, ${sunPosition.isVisible ? '0.3' : '0.18'}) 0%, 
                rgba(60, 120, 100, ${sunPosition.isVisible ? '0.2' : '0.12'}) 40%, 
                transparent 70%),
              
              /* Dust lanes and dark nebulae */
              radial-gradient(ellipse 80% 30% at 50% 70%, 
                rgba(15, 10, 8, ${sunPosition.isVisible ? '0.6' : '0.8'}) 0%, 
                rgba(25, 18, 15, ${sunPosition.isVisible ? '0.4' : '0.6'}) 30%, 
                transparent 60%),
              
              /* Background stellar nursery glow */
              radial-gradient(ellipse 100% 80% at center, 
                rgba(60, 40, 80, ${sunPosition.isVisible ? '0.15' : '0.08'}) 0%, 
                rgba(40, 25, 60, ${sunPosition.isVisible ? '0.1' : '0.05'}) 50%, 
                transparent 80%)
            `,
            filter: `blur(8px) contrast(${sunPosition.isVisible ? '1.2' : '0.9'}) brightness(${sunPosition.isVisible ? '1.1' : '0.7'})`
          }}
          animate={{
            opacity: sunPosition.isVisible ? [0.8, 1.0, 0.7, 0.9, 0.8] : [0.5, 0.7, 0.4, 0.6, 0.5]
          }}
          transition={{
            duration: 45,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Trapezium Cluster - central hot young stars */}
        <motion.div
          className="absolute"
          style={{
            left: '45%',
            top: '40%',
            width: '8px',
            height: '8px'
          }}
        >
          {[0, 1, 2, 3].map((star, index) => (
            <motion.div
              key={`trapezium-${index}`}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${[0, 6, 3, 8][index]}px`,
                top: `${[0, 2, 6, 4][index]}px`,
                background: sunPosition.isVisible ? 
                  `radial-gradient(circle, rgba(255, 240, 220, 0.9) 0%, rgba(200, 180, 160, 0.6) 70%, transparent 100%)` :
                  `radial-gradient(circle, rgba(180, 160, 140, 0.6) 0%, rgba(120, 100, 80, 0.4) 70%, transparent 100%)`,
                boxShadow: sunPosition.isVisible ? 
                  `0 0 8px rgba(255, 240, 220, 0.6), 0 0 16px rgba(255, 200, 150, 0.3)` :
                  `0 0 4px rgba(180, 160, 140, 0.4), 0 0 8px rgba(150, 120, 100, 0.2)`
              }}
              animate={{
                scale: [0.8, 1.2, 0.9, 1.1, 0.8],
                opacity: sunPosition.isVisible ? [0.7, 1.0, 0.6, 0.9, 0.7] : [0.4, 0.7, 0.3, 0.6, 0.4]
              }}
              transition={{
                duration: 8 + index * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.5
              }}
            />
          ))}
        </motion.div>

        {/* Stellar wind cavities and shock fronts */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              /* Stellar wind bubble */
              radial-gradient(circle at 45% 40%, 
                transparent 0%, 
                transparent 20%, 
                rgba(100, 180, 255, ${sunPosition.isVisible ? '0.15' : '0.08'}) 25%, 
                rgba(80, 150, 200, ${sunPosition.isVisible ? '0.1' : '0.05'}) 35%, 
                transparent 50%),
              
              /* Herbig-Haro objects - stellar jets */
              linear-gradient(135deg, 
                transparent 0%, 
                rgba(150, 100, 200, ${sunPosition.isVisible ? '0.2' : '0.12'}) 40%, 
                rgba(120, 80, 160, ${sunPosition.isVisible ? '0.15' : '0.08'}) 50%, 
                transparent 60%)
            `,
            filter: 'blur(12px)'
          }}
          animate={{
            opacity: sunPosition.isVisible ? [0.6, 0.9, 0.5, 0.8, 0.6] : [0.3, 0.5, 0.2, 0.4, 0.3],
            scale: [1, 1.05, 0.98, 1.03, 1]
          }}
          transition={{
            duration: 80,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Molecular cloud structure */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              /* Dense molecular cores */
              radial-gradient(ellipse 25% 35% at 70% 60%, 
                rgba(25, 15, 10, ${sunPosition.isVisible ? '0.7' : '0.9'}) 0%, 
                rgba(35, 25, 20, ${sunPosition.isVisible ? '0.5' : '0.7'}) 40%, 
                transparent 70%),
              
              radial-gradient(ellipse 20% 30% at 25% 25%, 
                rgba(20, 12, 8, ${sunPosition.isVisible ? '0.6' : '0.8'}) 0%, 
                rgba(30, 20, 15, ${sunPosition.isVisible ? '0.4' : '0.6'}) 50%, 
                transparent 80%),
              
              /* Wispy cloud structure */
              conic-gradient(from ${sunPosition.angle}deg at 50% 50%, 
                transparent 0deg, 
                rgba(40, 30, 50, ${sunPosition.isVisible ? '0.2' : '0.35'}) 60deg, 
                transparent 120deg, 
                rgba(50, 35, 40, ${sunPosition.isVisible ? '0.15' : '0.3'}) 180deg, 
                transparent 240deg, 
                rgba(35, 25, 45, ${sunPosition.isVisible ? '0.18' : '0.32'}) 300deg, 
                transparent 360deg)
            `,
            filter: `blur(15px) contrast(${sunPosition.isVisible ? '1.1' : '1.3'})`
          }}
          animate={{
            rotate: [0, 8, -4, 12, 0],
            opacity: sunPosition.isVisible ? [0.7, 0.9, 0.6, 0.8, 0.7] : [0.8, 1.0, 0.7, 0.9, 0.8]
          }}
          transition={{
            rotate: { duration: 400, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 100, repeat: Infinity, ease: "easeInOut" }
          }}
        />

        {/* Reflection nebula components */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 60% 40% at 30% 30%, 
                rgba(100, 150, 255, ${sunPosition.isVisible ? '0.12' : '0.06'}) 0%, 
                rgba(80, 120, 200, ${sunPosition.isVisible ? '0.08' : '0.04'}) 60%, 
                transparent 85%)
            `,
            filter: 'blur(20px)'
          }}
          animate={{
            opacity: sunPosition.isVisible ? [0.4, 0.7, 0.3, 0.6, 0.4] : [0.2, 0.4, 0.15, 0.35, 0.2],
            x: [0, 5, -3, 7, 0],
            y: [0, -8, 4, -6, 0]
          }}
          transition={{
            opacity: { duration: 70, repeat: Infinity, ease: "easeInOut" },
            x: { duration: 150, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 180, repeat: Infinity, ease: "easeInOut" }
          }}
        />
      </motion.div>

      {/* Distant galaxy cluster - realistic astronomical object */}
      <motion.div
        className="absolute top-1/3 right-1/6 w-[200px] h-[120px] rounded-full"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at center, rgba(25, 20, 30, 0.3) 0%, rgba(15, 12, 20, 0.2) 40%, rgba(8, 6, 12, 0.15) 70%, transparent 90%),
            radial-gradient(ellipse 80% 20% at center, rgba(35, 25, 40, 0.2) 0%, transparent 60%)
          `,
          filter: 'blur(40px)'
        }}
        animate={{
          opacity: [0.1, 0.3, 0.15, 0.25, 0.1],
          scale: [0.95, 1.1, 0.9, 1.05, 0.95],
          rotate: [0, 8, -4, 6, 0]
        }}
        transition={{
          duration: 120,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 30
        }}
      />

      {/* Subtle cosmic microwave background radiation effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          background: `
            repeating-conic-gradient(
              from 0deg at 30% 40%,
              transparent 0deg,
              rgba(25, 20, 15, 0.08) 15deg,
              transparent 30deg,
              rgba(20, 15, 25, 0.06) 45deg,
              transparent 60deg
            )
          `,
          filter: 'blur(200px)'
        }}
        animate={{
          rotate: [0, 360],
          opacity: [0.03, 0.08, 0.04, 0.06, 0.03]
        }}
        transition={{
          duration: 300,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Realistic interstellar medium */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: `
            radial-gradient(ellipse 1200px 600px at 10% 80%, rgba(15, 10, 8, 0.12) 0%, transparent 70%),
            radial-gradient(ellipse 900px 400px at 90% 20%, rgba(12, 8, 15, 0.1) 0%, transparent 70%)
          `,
          filter: 'blur(150px)'
        }}
        animate={{
          x: [0, 30, -20, 25, 0],
          y: [0, -25, 40, -15, 0],
          scale: [1, 1.05, 0.98, 1.03, 1]
        }}
        transition={{
          duration: 200,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default AnimatedBackground;