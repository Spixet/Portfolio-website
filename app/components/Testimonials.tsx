'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiMessageSquare } from 'react-icons/fi';
import ScrollReveal from './ScrollReveal';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Alex Johnson',
    role: 'Product Manager',
    company: 'TechCorp',
    text: 'Mohit delivered exceptional results and was a pleasure to work with. Their technical skills and attention to detail really made our project shine.',
    image: '/images/testimonials/testimonial-1.jpg',
  },
  {
    id: 2,
    name: 'Sarah Chen',
    role: 'CTO',
    company: 'StartupX',
    text: 'Working with Mohit was a game-changer for our startup. They quickly understood our vision and implemented solutions that exceeded our expectations.',
    image: '/images/testimonials/testimonial-2.jpg',
  },
  {
    id: 3,
    name: 'Michael Rivera',
    role: 'Senior Developer',
    company: 'DevStudio',
    text: "As a fellow developer, I was impressed by Mohit's clean code and innovative approaches to complex problems. Their work significantly improved our project architecture.",
    image: '/images/testimonials/testimonial-3.jpg',
  },
];

const Testimonials = () => {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const activeTestimonial = testimonials[active];
  const showImage =
    Boolean(activeTestimonial.image) && !failedImages[activeTestimonial.id];

  useEffect(() => {
    if (testimonialsRef.current) {
      testimonialsRef.current.setAttribute('data-cursor', 'large');
    }
  }, []);

  const next = () => {
    setDirection(1);
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const variants = {
    enter: (currentDirection: number) => ({
      x: currentDirection > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (currentDirection: number) => ({
      x: currentDirection < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              <span className="block">What People Say</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
              Feedback from colleagues and clients I&apos;ve worked with.
            </p>
          </div>
        </ScrollReveal>

        <div className="relative max-w-3xl mx-auto" ref={testimonialsRef}>
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
            <div className="relative h-full px-8 py-10 sm:px-10">
              <div className="absolute top-0 left-0 transform -translate-x-6 -translate-y-6">
                <FiMessageSquare className="h-12 w-12 text-primary-400 opacity-20" />
              </div>

              <div className="relative min-h-[280px] flex items-center">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={active}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: 'spring', stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                    }}
                    className="w-full"
                  >
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <div className="md:w-1/4 flex justify-center">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-primary-500">
                          <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-300 dark:from-primary-900 dark:to-primary-700 flex items-center justify-center text-2xl font-bold text-white">
                            {showImage ? (
                              <img
                                src={activeTestimonial.image}
                                alt={activeTestimonial.name}
                                className="w-full h-full object-cover"
                                onError={() =>
                                  setFailedImages((prev) => ({
                                    ...prev,
                                    [activeTestimonial.id]: true,
                                  }))
                                }
                              />
                            ) : (
                              activeTestimonial.name.charAt(0)
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="md:w-3/4">
                        <blockquote>
                          <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-200 italic">
                            &quot;{activeTestimonial.text}&quot;
                          </p>
                          <footer className="mt-4">
                            <div className="flex items-center">
                              <div className="text-base font-medium text-gray-900 dark:text-white">
                                {activeTestimonial.name}
                              </div>
                              <span className="mx-1 text-gray-500 dark:text-gray-400">
                                &bull;
                              </span>
                              <div className="text-base text-gray-500 dark:text-gray-400">
                                {activeTestimonial.role} at {activeTestimonial.company}
                              </div>
                            </div>
                          </footer>
                        </blockquote>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-4">
            <motion.button
              onClick={prev}
              className="p-2 rounded-full bg-white dark:bg-gray-700 shadow-md hover:bg-primary-50 dark:hover:bg-gray-600 focus:outline-none"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Previous testimonial"
            >
              <FiChevronLeft className="h-6 w-6 text-primary-500 dark:text-primary-400" />
            </motion.button>

            <div className="flex space-x-2 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > active ? 1 : -1);
                    setActive(index);
                  }}
                  className={`w-2 h-2 rounded-full focus:outline-none ${
                    index === active
                      ? 'bg-primary-500 dark:bg-primary-400 w-4 transition-all'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <motion.button
              onClick={next}
              className="p-2 rounded-full bg-white dark:bg-gray-700 shadow-md hover:bg-primary-50 dark:hover:bg-gray-600 focus:outline-none"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Next testimonial"
            >
              <FiChevronRight className="h-6 w-6 text-primary-500 dark:text-primary-400" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
