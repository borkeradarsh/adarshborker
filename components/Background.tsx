import React from 'react';

const Background = () => {
  return (
    <>
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black -z-10" />
      
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full blur-3xl animate-float-1"
          style={{
            top: "10%",
            left: "10%",
            animationDelay: "0s",
            animationDuration: "20s"
          }}
        />
        
        <div 
          className="absolute w-80 h-80 bg-gradient-to-r from-purple-500/25 to-cyan-500/25 rounded-full blur-3xl animate-float-2"
          style={{
            top: "60%",
            right: "15%",
            animationDelay: "-5s",
            animationDuration: "18s"
          }}
        />
        
        <div 
          className="absolute w-72 h-72 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-float-3"
          style={{
            bottom: "20%",
            left: "20%",
            animationDelay: "-10s",
            animationDuration: "22s"
          }}
        />
        
        <div 
          className="absolute w-64 h-64 bg-gradient-to-r from-purple-400/15 to-pink-500/15 rounded-full blur-3xl animate-float-4"
          style={{
            top: "30%",
            right: "40%",
            animationDelay: "-15s",
            animationDuration: "25s"
          }}
        />
        
        <div 
          className="absolute w-88 h-88 bg-gradient-to-r from-teal-500/20 to-blue-600/20 rounded-full blur-3xl animate-float-5"
          style={{
            bottom: "40%",
            right: "10%",
            animationDelay: "-8s",
            animationDuration: "19s"
          }}
        />
      </div>
      
      <div className="fixed inset-0 bg-black/10 -z-10" />
    </>
  );
};

export default Background;