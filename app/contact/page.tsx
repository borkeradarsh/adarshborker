'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Button from '@/components/Button';

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: 'easeIn' } }
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Formspree endpoint for receiving form submissions
      const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xpwypgdj';
      
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        alert('Message sent successfully! I\'ll get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      alert('Error sending message. Please try again or contact me directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen relative"
    >
      <AnimatedBackground />
      <div className="min-h-screen pt-20 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 mt-4">
              Get In Touch
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Have a project in mind? Let's work together to create something amazing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Let's Connect</h2>
              <div className="space-y-6">
                <motion.div
                  onClick={() => {
                    // Simple approach that should work
                    window.location.href = 'mailto:borkeradi07@gmail.com';
                  }}
                  className="flex items-center group cursor-pointer"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-500/30 transition-colors">
                    <Mail className="text-blue-400 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium group-hover:text-blue-400 transition-colors">Email</h3>
                    <p className="text-slate-300">borkeradi07@gmail.com</p>
                  </div>
                </motion.div>
                <motion.a
                  href="https://linkedin.com/in/adarshborker04"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center group cursor-pointer"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-500/30 transition-colors">
                    <Linkedin className="text-blue-400 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium group-hover:text-blue-400 transition-colors">LinkedIn</h3>
                    <p className="text-slate-300">linkedin.com/in/adarshborker04</p>
                  </div>
                </motion.a>
                <motion.a
                  href="https://github.com/borkeradarsh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center group cursor-pointer"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-500/30 transition-colors">
                    <Github className="text-blue-400 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium group-hover:text-blue-400 transition-colors">GitHub</h3>
                    <p className="text-slate-300">github.com/borkeradarsh</p>
                  </div>
                </motion.a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-4 border border-white/20">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-white font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/20 border border-white/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-400"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-white font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/20 border border-white/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-400"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-white font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-black/20 border border-white/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 resize-vertical"
                    placeholder="Tell me about your project..."
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}