'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Linkedin, Github, Instagram, Orbit, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10 ${className}`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-400" onClick={closeMenu}>
          Adarsh Borker
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <Link href="/" className="text-white/80 hover:text-white transition-colors">Home</Link>
          <Link href="/about" className="text-white/80 hover:text-white transition-colors">About</Link>
          <Link href="/projects" className="text-white/80 hover:text-white transition-colors">Projects</Link>
          <Link href="/travel" className="text-white/80 hover:text-white transition-colors">Travel</Link>
          <Link href="/contact" className="text-white/80 hover:text-white transition-colors">Contact</Link>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Social Media Icons - Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              href="https://linkedin.com/in/adarshborker04"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-blue-400 transition-colors p-1"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link
              href="https://github.com/borkeradarsh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-blue-400 transition-colors p-1"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </Link>
            <Link
              href="https://instagram.com/adarsh.borker"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-pink-400 transition-colors p-1"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </Link>
          </div>
          
          {/* Get In Touch Button - Desktop */}
          <div className="hidden md:block">
            <Link href="/contact">
              <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
                Get In Touch
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={toggleMenu}
            className="md:hidden text-white/80 hover:text-white transition-colors p-2"
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle navigation menu"
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Orbit className="w-6 h-6" />}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="md:hidden bg-black/30 backdrop-blur-md border-b border-white/10 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 space-y-6">
              {/* Navigation Links */}
              <div className="space-y-4">
                {[
                  { href: "/", label: "Home" },
                  { href: "/about", label: "About" },
                  { href: "/projects", label: "Projects" },
                  { href: "/travel", label: "Travel" },
                  { href: "/contact", label: "Contact" }
                ].map((link, index) => (
                  <motion.div
                    key={link.href}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                    custom={index}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className="block text-white/80 hover:text-white transition-colors text-lg py-2"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Social Media Icons - Mobile */}
              <motion.div
                variants={itemVariants}
                initial="closed"
                animate="open"
                custom={5}
                className="flex items-center justify-center space-x-6 pt-4 border-t border-white/10"
              >
                <Link
                  href="https://linkedin.com/in/adarshborker04"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-blue-400 transition-colors p-2"
                  aria-label="LinkedIn"
                  onClick={closeMenu}
                >
                  <Linkedin className="w-6 h-6" />
                </Link>
                <Link
                  href="https://github.com/borkeradarsh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-blue-400 transition-colors p-2"
                  aria-label="GitHub"
                  onClick={closeMenu}
                >
                  <Github className="w-6 h-6" />
                </Link>
                <Link
                  href="https://instagram.com/adarsh_borker"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-pink-400 transition-colors p-2"
                  aria-label="Instagram"
                  onClick={closeMenu}
                >
                  <Instagram className="w-6 h-6" />
                </Link>
              </motion.div>

              {/* Get In Touch Button - Mobile */}
              <motion.div
                variants={itemVariants}
                initial="closed"
                animate="open"
                custom={6}
                className="pt-4"
              >
                <Link href="/contact" onClick={closeMenu}>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full border-white/30 text-white hover:bg-white/10"
                  >
                    Get In Touch
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;