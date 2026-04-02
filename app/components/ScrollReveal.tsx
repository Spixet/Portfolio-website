'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  className?: string;
  once?: boolean;
  damping?: number;
  stiffness?: number;
}

const ScrollReveal = ({
  children,
  direction = 'up',
  delay = 0,
  className = '',
  once = true,
  damping = 30,
  stiffness = 300,
}: ScrollRevealProps) => {
  // Set initial animation values based on direction
  const getInitialValue = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: 50 };
      case 'down':
        return { opacity: 0, y: -50 };
      case 'left':
        return { opacity: 0, x: 50 };
      case 'right':
        return { opacity: 0, x: -50 };
      default:
        return { opacity: 0, y: 50 };
    }
  };

  // Set target animation values
  const getAnimateValue = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { opacity: 1, y: 0 };
      case 'left':
      case 'right':
        return { opacity: 1, x: 0 };
      default:
        return { opacity: 1, y: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitialValue()}
      whileInView={getAnimateValue()}
      viewport={{ once }}
      transition={{
        duration: 0.8,
        delay,
        type: 'spring',
        damping,
        stiffness,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
