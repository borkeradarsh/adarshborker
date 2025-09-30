'use client';

import React from 'react';
import { motion } from 'framer-motion';
import AnimatedBackground from '@/components/AnimatedBackground';

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: 'easeIn' } }
};

// Tech Icon Component
const TechIcon = ({ src, alt, filter }: { src: string; alt: string; filter?: string }) => (
  <motion.div
    className="group relative"
    whileHover={{ 
      scale: 1.1,
      transition: { duration: 0.2 }
    }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="w-16 h-16 p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all duration-300">
      <img 
        src={src} 
        alt={alt} 
        className={`w-full h-full object-contain ${filter ? 'filter invert' : ''}`}
      />
    </div>
    {/* Tooltip */}
    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      <span className="text-xs text-slate-300 whitespace-nowrap bg-black/50 px-2 py-1 rounded">{alt}</span>
    </div>
  </motion.div>
);

export default function About() {
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      <motion.div 
        className="relative z-10 container mx-auto px-6 py-24"
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h1 
              className="text-5xl md:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              About Me
            </motion.h1>
            <motion.p 
              className="text-xl text-slate-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Exploring, learning and embracing the journey
            </motion.p>
          </div>

          {/* Introduction Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="w-80 h-80 mx-auto relative">
                <img
                  src="/profile-picture.jpg"
                  alt="Adarsh Borker"
                  className="w-full h-full object-cover rounded-full border-4 border-gradient-to-br from-blue-500/50 to-purple-600/50 shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-6xl font-bold text-white opacity-0 transition-opacity duration-300 [&:has(~img[src=''])]:opacity-100">
                  A
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Hello! I'm Adarsh Borker
              </h2>
              <p className="text-slate-300 mb-6 leading-relaxed">
                Riding, Travelling, and Building applications that people would love to use is what i strive to do.
              </p>
              <p className="text-slate-300 mb-6 leading-relaxed">
                I hyper-fixate on building scalable, user-focused SaaS & Realtime applications with a focus on performance and user experience.
              </p>
              <p>
                Right now my main goal is to improve my skills by learning from senior developers and gain experience before I graduate.
                <br/>
                I want to explore the world, go on bike rides, learn from different cultures that help me grow as a person and have no regrets in the end.
              </p>
              <br />
              <div className="text-slate-300 mb-6">
                <p className="mb-2">📧 <strong>Contact:</strong> borkeradi07@gmail.com | +91-7022715411</p>
                <p className="mb-2">🎓 <strong>Education:</strong> St. Joseph's University, Bangalore (2023 – Present)</p>
                <p>📌 <strong>Open to:</strong> Internships, freelance projects, and collaborations on innovative products</p>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Tech Stack</h2>
            <p className="text-slate-300 text-center mb-12 max-w-2xl mx-auto">
              I'm currently looking to join a <span className="text-purple-400 font-semibold">cross-functional</span> team 
              that values improving people's lives through accessible design
            </p>
            
            {/* Frontend Technologies */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <TechIcon 
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" 
                alt="React" 
              />
              <TechIcon 
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" 
                alt="Next.js"
                filter="invert"
              />
              <TechIcon 
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" 
                alt="JavaScript" 
              />
              <TechIcon 
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" 
                alt="Tailwind CSS" 
              />
            </div>

            {/* Backend & Database */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <TechIcon 
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" 
                alt="Supabase" 
              />
              <TechIcon 
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" 
                alt="PostgreSQL" 
              />
              <TechIcon 
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" 
                alt="Python" 
              />
              <TechIcon 
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" 
                alt="Node.js" 
              />
            </div>

            {/* Tools & Platforms */}
            <div className="flex flex-wrap justify-center gap-6">
              <TechIcon 
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" 
                alt="GitHub"
                filter="invert"
              />
              <TechIcon 
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" 
                alt="VS Code" 
              />
              <TechIcon 
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" 
                alt="Figma" 
              />
              <TechIcon 
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" 
                alt="Git" 
              />
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}