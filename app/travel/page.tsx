'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const AnimatedBackground = dynamic(() => import('../../components/AnimatedBackground'), {
  ssr: false,
  loading: () => null
});

const pageTransition = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3, ease: 'easeIn' } }
};

const TravelCard = ({ 
  location, 
  country, 
  date, 
  description, 
  highlights,
  image,
  gradient
}: {
  location: string;
  country: string;
  date: string;
  description: string;
  highlights: string[];
  image?: string;
  gradient: string;
}) => (
  <motion.div
    className={`relative overflow-hidden rounded-2xl h-full bg-gradient-to-br ${gradient} border border-white/10 transform-gpu will-change-transform`}
    whileHover={{ scale: 1.01 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
  >
    {/* Image Section - Top Half */}
    {image && (
      <div className="relative h-80 overflow-hidden bg-slate-800/50 flex items-center justify-center">
        <Image
          src={image}
          alt={`${location}, ${country} - Travel destination`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Overlay Text on Image */}
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-3xl font-bold mb-1">{location}</h3>
          <p className="text-lg opacity-90">{country}</p>
          <p className="text-sm opacity-75">{date}</p>
        </div>
        
        {/* Travel Badge */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/80 text-white border border-emerald-400/50 backdrop-blur-sm">
            Travel
          </span>
        </div>
      </div>
    )}

    {/* Content Section - Bottom Half */}
    <div className="p-8">
      {!image && (
        <>
          <div className="flex justify-between items-start mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Travel
            </span>
            <div className="w-3 h-3 bg-white/20 rounded-full animate-pulse"></div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">{location}</h3>
          <p className="text-slate-300 text-sm mb-1 font-medium">{country}</p>
          <p className="text-slate-400 text-sm mb-6">{date}</p>
        </>
      )}
      
      <p className="text-slate-300 mb-6 leading-relaxed">{description}</p>

      <div className="space-y-2">
        <h4 className="text-white font-semibold mb-3">Highlights:</h4>
        {highlights.map((highlight, index) => (
          <div key={index} className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-slate-300 text-sm">{highlight}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Decorative Elements */}
    <div className="absolute inset-0 opacity-5 pointer-events-none">
      <div className="absolute top-4 right-4 w-20 h-20 border border-white rounded-full"></div>
      <div className="absolute bottom-4 left-4 w-16 h-16 border border-white rounded-full"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white rounded-full"></div>
    </div>
  </motion.div>
);

export default function Travel() {
  const travels = [
    {
      location: "Varkala",
      country: "Kerala, India",
      date: "February 2025",
      description: "An unforgettable journey to the stunning cliffs of Varkala that began with a scenic train ride through Kerala's breathtaking landscapes. What started as a solo adventure turned into an incredible cultural immersion experience, meeting fascinating people from around the world and discovering the true essence of travel - human connections.",
      highlights: [
        "Scenic train journey through Kerala's lush green countryside and coastal beauty",
        "Serendipitous meeting with fellow travelers from Bangalore at the railway station",
        "Staying at a cliff-top hostel with panoramic views of the Arabian Sea",
        "Cultural exchange with backpackers from Belgium, Mumbai, Sicily, and beyond",
        "Late-night games, deep conversations, and unforgettable hostel memories",
        "Beach adventures right at the hostel's doorstep with golden sand and azure waters",
        "Exploring the dramatic cliff formations and discovering the global traveler community",
        "Witnessing breathtaking sunsets from the cliff edge - a view that stays forever",
        "Learning that authentic travel is about people, stories, and shared experiences"
      ],
      image: "/varkala-cliff.jpg", // You'll need to add this image to public folder
      gradient: "from-orange-900/20 to-red-800/20"
    }
  ];

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
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h1 
              className="text-5xl md:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Travel Adventures
            </motion.h1>
            <motion.p 
              className="text-xl text-slate-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Exploring the world, one destination at a time. Sharing stories, experiences, and memories from my journeys across incredible places.
            </motion.p>
          </div>

          <section className="mb-20">
            <motion.h2 
              className="text-3xl font-bold text-white mb-8 flex items-center"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-1 h-8 bg-gradient-to-b from-emerald-400 to-blue-600 rounded-full mr-4"></div>
              Recent Adventures
            </motion.h2>
            <div className="grid lg:grid-cols-2 xl:grid-cols-2 gap-8">
              {travels.map((travel, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <TravelCard {...travel} />
                </motion.div>
              ))}
            </div>
          </section>

          {/* Travel Philosophy */}
          <motion.section 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-white mb-8">Travel Philosophy</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div 
                className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-2xl p-8 border border-purple-500/30 relative overflow-hidden transform-gpu will-change-transform"
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-purple-400/10 rounded-full -translate-y-10 translate-x-10"></div>
                <h3 className="text-xl font-bold text-purple-300 mb-4">🌍 Explore</h3>
                <p className="text-slate-300">Discovering new cultures, landscapes, and perspectives that broaden my understanding of the world.</p>
              </motion.div>
              <motion.div 
                className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl p-8 border border-blue-500/30 relative overflow-hidden transform-gpu will-change-transform"
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-400/10 rounded-full -translate-y-10 translate-x-10"></div>
                <h3 className="text-xl font-bold text-blue-300 mb-4">📚 Learn</h3>
                <p className="text-slate-300">Every journey teaches valuable lessons about life, resilience, and the beauty of human diversity.</p>
              </motion.div>
              <motion.div 
                className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-2xl p-8 border border-green-500/30 relative overflow-hidden transform-gpu will-change-transform"
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-green-400/10 rounded-full -translate-y-10 translate-x-10"></div>
                <h3 className="text-xl font-bold text-green-300 mb-4">🤝 Connect</h3>
                <p className="text-slate-300">Building meaningful connections with people from different backgrounds and sharing unforgettable experiences.</p>
              </motion.div>
            </div>
          </motion.section>

          {/* Next Adventures */}
          <motion.section 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-8">Next Adventures</h2>
            <div className="bg-gradient-to-r from-emerald-900/20 to-blue-900/20 rounded-xl p-8 border border-emerald-500/30">
              <h3 className="text-xl font-semibold text-white mb-4">🗺️ Planning Future Journeys</h3>
              <p className="text-slate-300 mb-4">
                Always looking forward to the next adventure! Currently planning trips to explore new destinations, 
                experience different cultures, and create more unforgettable memories.
              </p>
              <p className="text-emerald-300 font-medium">
                "The world is a book, and those who do not travel read only one page."
              </p>
            </div>
          </motion.section>
        </div>
      </motion.div>
    </div>
  );
}