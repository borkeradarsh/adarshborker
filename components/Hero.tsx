import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const fullText = 'Adarsh Borker';

  useEffect(() => {
    const startAnimation = () => {
      if (isAnimating) return; // Prevent overlapping animations
      
      setIsAnimating(true);
      setDisplayText('');
      
      // Type out each character smoothly
      for (let i = 0; i <= fullText.length; i++) {
        setTimeout(() => {
          setDisplayText(fullText.slice(0, i));
          if (i === fullText.length) {
            setIsAnimating(false);
          }
        }, i * 150); // Consistent timing
      }
    };

    // Start first animation after component mounts
    if (!hasStarted) {
      setHasStarted(true);
      const initialTimeout = setTimeout(() => {
        startAnimation();
      }, 800); // Delay to avoid conflict with page load
      
      return () => clearTimeout(initialTimeout);
    }
    
    // Repeat animation every 5 seconds after first one
    const interval = setInterval(startAnimation, 5000);
    
    return () => clearInterval(interval);
  }, [hasStarted, isAnimating, fullText]);

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Adarsh_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewGitHub = () => {
    window.open("https://github.com/borkeradarsh", "_blank");
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative z-10 pt-20">
      <div className="container mx-auto px-6 text-center max-w-5xl">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="text-slate-300">Hello, I'm</span>
            <br />
            <motion.span 
              className="bg-gradient-to-r from-[#010139] via-[#4a0051] to-[#340166] bg-clip-text text-transparent inline-block"
              style={{ 
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: '#60A5FA' // Fallback color
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {displayText || 'Adarsh Borker'}
            </motion.span>
          </h1>
          
          <h2 className="text-2xl md:text-3xl text-slate-400 mb-8 font-light">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 font-medium">
              Full-Stack Developer | React, Next.js, AI Integration | Travel
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              onClick={handleDownloadResume}
              className="bg-gradient-to-r from-[#010139] to-[#340166] shadow-lg px-8 py-4 transform hover:scale-105"
            >
              📄 Download Resume
            </Button>
            
            <Button 
              variant="outline"
              onClick={handleViewGitHub}
              className="border-2 bg-black hover:bg-black border-slate-600 hover:border-blue-400 px-8 py-4 hover:scale-105 "
            >
              🚀 View GitHub
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;