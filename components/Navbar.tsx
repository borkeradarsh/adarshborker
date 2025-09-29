import React from 'react';
import Link from 'next/link';
import { Linkedin, Github, Instagram } from 'lucide-react';
import Button from './Button';

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className = '' }) => {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10 ${className}`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-400">
          Adarsh Borker
        </Link>
        
        <div className="hidden md:flex space-x-8">
          <Link href="/" className="text-white/80 hover:text-white transition-colors">Home</Link>
          <Link href="/about" className="text-white/80 hover:text-white transition-colors">About</Link>
          <Link href="/projects" className="text-white/80 hover:text-white transition-colors">Projects</Link>
          <Link href="/travel" className="text-white/80 hover:text-white transition-colors">Travel</Link>
          <Link href="/contact" className="text-white/80 hover:text-white transition-colors">Contact</Link>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Social Media Icons */}
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
          
          <Link href="/contact">
            <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
              Get In Touch
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;