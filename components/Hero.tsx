import React, { memo, useCallback } from 'react';
import Button from './Button';

const Hero = memo(() => {
  // Simplified - remove complex typewriter animation to fix INP
  const fullText = 'Adarsh Borker';

  const handleDownloadResume = useCallback(() => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Adarsh_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const handleViewGitHub = useCallback(() => {
    window.open("https://github.com/borkeradarsh", "_blank");
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative z-10 pt-20">
      <div className="container mx-auto px-6 text-center max-w-5xl">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="text-slate-300">Hello, I'm</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              {fullText}
            </span>
          </h1>
          
          <h2 className="text-2xl md:text-3xl text-slate-400 mb-8 font-light">
            <span className="text-blue-400 font-medium">
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
});

Hero.displayName = 'Hero';

export default Hero;