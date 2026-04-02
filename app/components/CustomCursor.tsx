'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isPointer, setIsPointer] = useState(false);
  const [isText, setIsText] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isLargeTarget, setIsLargeTarget] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true); // Assume desktop initially

  // Ref to store cleanup functions for event listeners
  const cleanupFunctionsRef = useRef<(() => void)[]>([]);

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

    const checkDevice = () => {
      if (window.innerWidth < 768) { // Common breakpoint for mobile
        setIsDesktop(false);
        // Ensure default cursor is restored if switching to mobile view
        document.body.style.cursor = 'auto';
        // Clean up any existing event listeners if we switch to mobile
        cleanupFunctionsRef.current.forEach(cleanup => cleanup());
        cleanupFunctionsRef.current = [];
        setIsVisible(false); // Hide custom cursor elements
      } else {
        setIsDesktop(true);
        // Re-initialize if switching back to desktop and cursor was hidden
        if (!isVisible && document.body.style.cursor === 'auto') {
          initializeCursor();
        }
      }
    };

    const initializeCursor = () => {
      if (!isDesktop) return; // Don't initialize if not desktop

      const handleMouseMove = (e: MouseEvent) => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
        if (!isVisible) {
          setIsVisible(true);
        }
      };

      const handleMouseDown = () => setIsActive(true);
      const handleMouseUp = () => setIsActive(false);

      const handlePointerElements = () => {
        const pointerElements = document.querySelectorAll('a, button, [role="button"], select, [role="link"], [data-cursor="pointer"]');
        const textElements = document.querySelectorAll('input, textarea, [contenteditable="true"], [data-cursor="text"]');
        const largeTargetElements = document.querySelectorAll('.skill-card, [data-cursor="large"]:not(.project-card)');

        const onPointerEnter = () => setIsPointer(true);
        const onPointerLeave = () => setIsPointer(false);
        const onTextEnter = () => setIsText(true);
        const onTextLeave = () => setIsText(false);
        const onLargeEnter = () => setIsLargeTarget(true);
        const onLargeLeave = () => setIsLargeTarget(false);

        const listeners: { el: Element; type: string; handler: () => void }[] = [];

        pointerElements.forEach(el => {
          el.addEventListener('mouseenter', onPointerEnter);
          el.addEventListener('mouseleave', onPointerLeave);
          listeners.push({ el, type: 'mouseenter', handler: onPointerEnter });
          listeners.push({ el, type: 'mouseleave', handler: onPointerLeave });
        });

        textElements.forEach(el => {
          el.addEventListener('mouseenter', onTextEnter);
          el.addEventListener('mouseleave', onTextLeave);
          listeners.push({ el, type: 'mouseenter', handler: onTextEnter });
          listeners.push({ el, type: 'mouseleave', handler: onTextLeave });
        });

        largeTargetElements.forEach(el => {
          el.addEventListener('mouseenter', onLargeEnter);
          el.addEventListener('mouseleave', onLargeLeave);
          listeners.push({ el, type: 'mouseenter', handler: onLargeEnter });
          listeners.push({ el, type: 'mouseleave', handler: onLargeLeave });
        });

        const cleanup = () => {
          listeners.forEach(({ el, type, handler }) => {
            el.removeEventListener(type, handler);
          });
        };
        cleanupFunctionsRef.current.push(cleanup);
        return cleanup;
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mouseup', handleMouseUp);
      const pointerCleanup = handlePointerElements();

      document.body.style.cursor = 'none';
      setIsVisible(true); // Show cursor once initialized on desktop

      const mainCleanup = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mouseup', handleMouseUp);
        pointerCleanup();
        document.body.style.cursor = 'auto';
      };
      cleanupFunctionsRef.current.push(mainCleanup);
      return mainCleanup;
    };

    // Initial check
    checkDevice();

    // Add resize listener
    window.addEventListener('resize', checkDevice);
    cleanupFunctionsRef.current.push(() => window.removeEventListener('resize', checkDevice));

    // Initialize if desktop on mount
    if (isDesktop) {
      initializeCursor();
    }

    // Cleanup on unmount
    return () => {
      cleanupFunctionsRef.current.forEach(cleanup => cleanup());
      cleanupFunctionsRef.current = [];
      // Ensure default cursor is restored on unmount
      if (document.body.style.cursor === 'none') {
        document.body.style.cursor = 'auto';
      }
    };
  }, [isDesktop]); // Re-run effect if isDesktop changes

  // Don't render on server, if not desktop, or if cursor not initialized
  if (typeof window === 'undefined' || !isDesktop || !isVisible) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div 
          className="rounded-full bg-primary-500 dark:bg-primary-400 border-2 border-white dark:border-gray-900 shadow-lg"
          animate={{
            width: isPointer ? '36px' : isText ? '4px' : '20px',
            height: isPointer ? '36px' : isText ? '28px' : '20px',
            opacity: 1,
            borderRadius: isText ? '2px' : '9999px',
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
            mass: 0.5,
          }}
        />
      </motion.div>
      
      {/* Large hover ring - appears when hovering over cards */}
      {isLargeTarget && (
        <motion.div
          className="fixed top-0 left-0 w-20 h-20 rounded-full border-[16px] border-primary-600 dark:border-primary-300 bg-primary-100/20 dark:bg-primary-900/20 pointer-events-none z-[9998] shadow-lg"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          initial={{ scale: 0, opacity: 4 }}
          animate={{ scale: 1.7, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      {/* Cursor trail/glow effect */}
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-primary-300 dark:bg-primary-700 pointer-events-none z-[9997] shadow-md"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isPointer ? '70px' : '55px',
          height: isPointer ? '70px' : '55px',
          opacity: isActive ? 1 : 0.9,
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 25,
          mass: 0.5,
        }}
      />
    </>
  );
};

export default CustomCursor;
