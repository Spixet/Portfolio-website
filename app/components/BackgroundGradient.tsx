'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

// Generate the stars data only on the client side to avoid hydration mismatches
const BackgroundGradient = () => {
  const [isClient, setIsClient] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 });
  
  // Store generated star data in a ref to avoid regeneration
  const starsRef = useRef<Array<{
    id: number;
    size: number;
    posX: string;
    posY: string;
    duration: number;
    delay: number;
    opacity: number;
  }>>([]);

  // Initialize all the client-side only code in useEffect
  useEffect(() => {
    setIsClient(true);
    
    // Set window size
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
    
    // Generate stars data once
    if (starsRef.current.length === 0) {
      for (let i = 0; i < 70; i++) {
        starsRef.current.push({
          id: i,
          size: 1 + Math.random() * 3,
          posX: `${Math.random() * 100}%`,
          posY: `${Math.random() * 100}%`,
          duration: 3 + Math.random() * 7,
          delay: Math.random() * 2,
          opacity: 0.3 + Math.random() * 0.5
        });
      }
    }
    
    // Set up event listeners
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / windowSize.width,
        y: e.clientY / windowSize.height
      });
    };

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Primary gradient background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950"
        style={{
          transform: `translate(${(mousePosition.x - 0.5) * -20}px, ${(mousePosition.y - 0.5) * -20}px)`,
          transition: 'transform 0.5s ease-out'
        }}
      />

      {/* Stars/dots effect - only render on client side */}
      {isClient && (
        <div className="absolute inset-0">
          {starsRef.current.map((star) => (
            <motion.div
              key={star.id}
              className="absolute rounded-full bg-white dark:bg-blue-500/20"
              style={{
                left: star.posX,
                top: star.posY,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity
              }}
              animate={{
                y: [0, 20, 0],
                opacity: [star.opacity, star.opacity - 0.2, star.opacity]
              }}
              transition={{
                duration: star.duration,
                repeat: Infinity,
                delay: star.delay
              }}
            />
          ))}
        </div>
      )}

      {/* Colorful floating shapes - only render on client side */}
      {isClient && (
        <div className="absolute inset-0 opacity-30 dark:opacity-40">
          {/* Purple cube */}
          <motion.div
            className="absolute w-64 h-64 rounded-3xl bg-purple-500/20 backdrop-blur-3xl"
            style={{
              left: '30%',
              top: '20%',
              filter: 'blur(40px)',
              transform: `translate(${(mousePosition.x - 0.5) * -30}px, ${(mousePosition.y - 0.5) * -30}px) rotate(15deg)`
            }}
            animate={{ 
              y: [0, 20, 0],
              rotate: [15, 20, 15]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />

          {/* Indigo cube */}
          <motion.div
            className="absolute w-72 h-72 rounded-3xl bg-indigo-500/20 backdrop-blur-3xl"
            style={{
              left: '60%',
              top: '60%',
              filter: 'blur(40px)',
              transform: `translate(${(mousePosition.x - 0.5) * -25}px, ${(mousePosition.y - 0.5) * -25}px) rotate(-10deg)`
            }}
            animate={{ 
              y: [0, -20, 0],
              rotate: [-10, -15, -10]
            }}
            transition={{ 
              duration: 7,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />

          {/* Pink cube */}
          <motion.div
            className="absolute w-56 h-56 rounded-3xl bg-pink-500/20 backdrop-blur-3xl"
            style={{
              left: '10%',
              top: '70%',
              filter: 'blur(40px)',
              transform: `translate(${(mousePosition.x - 0.5) * -35}px, ${(mousePosition.y - 0.5) * -35}px) rotate(25deg)`
            }}
            animate={{ 
              y: [0, -20, 0],
              rotate: [25, 30, 25]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        </div>
      )}
    </div>
  );
};

export default BackgroundGradient;
