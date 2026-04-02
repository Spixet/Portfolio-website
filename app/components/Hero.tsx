'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { FiArrowRight, FiGithub, FiLinkedin } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { siteConfig } from '../lib/site';

const Hero = () => {
  const [imageError, setImageError] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="relative overflow-hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      {/* Enhanced Background gradient with animated effects */}
      <motion.div
        className="absolute inset-0 opacity-50 dark:opacity-50"
        animate={{
          // @ts-ignore - Framer Motion type issue with backgroundPosition
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'linear',
        }}
        style={{
          // @ts-ignore - Framer Motion type issue with backgroundImage
          backgroundImage:
            'linear-gradient(135deg, #0F172A 0%,rgb(48, 62, 84) 50%,rgb(180, 190, 205) 100%)',
          backgroundSize: '400% 400%',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="relative py-16 sm:py-24 md:py-32 lg:w-full">
          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="lg:w-1/2 text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.h2
                    className="text-base font-semibold text-primary-600 dark:text-primary-400 tracking-wide uppercase"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    Full Stack Developer Specializing in intelligent interfaces
                  </motion.h2>
                  <motion.h1
                    className="mt-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <span className="block xl:inline">I build amazing </span>
                    <span className="block text-primary-600 dark:text-primary-400 xl:inline">
                      experiences
                    </span>
                  </motion.h1>
                  <motion.p
                    className="mt-3 text-base text-gray-600 dark:text-gray-400 sm:mt-5 sm:text-lg md:mt-5 md:text-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    Hello! I&apos;m{' '}
                    <TypeAnimation
                      sequence={[
                        'Mohit Pandya',
                        2000,
                        'a Developer',
                        1000,
                        'an Engineer' ,
                        1000,
                        'a Designer',
                        1000,
                        'an Artist',
                        1000,
                        'an Innovator' ,
                        1000,
                        'Mohit Pandya',
                        5000,
                      ]}
                      wrapper="span"
                      cursor={true}
                      repeat={Infinity}
                      className="font-bold text-primary-600 dark:text-primary-400"
                      style={{ display: 'inline-block' }}
                    />
                    , a developer passionate about creating Intelligent systems, visually refined interfaces and real world applications
                  </motion.p>
                  <motion.div
                    className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                    variants={itemVariants}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        href="/projects"
                        className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 md:py-3 md:text-lg md:px-10 transition-all duration-300 transform hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        aria-label="View Projects"
                      >
                        View Projects
                        <FiArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-3 sm:mt-0"
                    >
                      <Link
                        href="/contact"
                        className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-primary-700 bg-white hover:bg-gray-50 dark:text-primary-400 dark:bg-gray-800 dark:hover:bg-gray-700 md:py-3 md:text-lg md:px-10 transition-all duration-300 transform hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        aria-label="Get In Touch"
                      >
                        Get In Touch
                      </Link>
                    </motion.div>
                  </motion.div>
                  <motion.div
                    className="mt-8 flex gap-5 justify-center lg:justify-start"
                    variants={itemVariants}
                  >
                    <motion.a
                      href={siteConfig.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 transform hover:scale-110"
                      aria-label="GitHub Profile"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FiGithub className="h-7 w-7" />
                    </motion.a>
                    <motion.a
                      href={siteConfig.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-transform duration-300 hover:scale-110"
                      aria-label="LinkedIn Profile"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FiLinkedin className="h-6 w-6" />
                    </motion.a>
                    <motion.a
                      href={siteConfig.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-transform duration-300 hover:scale-110"
                      aria-label="WhatsApp Contact"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaWhatsapp className="h-6 w-6" />
                    </motion.a>
                  </motion.div>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="md:w-1/2 flex justify-center"
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative h-72 w-72 sm:h-80 sm:w-80 lg:h-96 lg:w-96">
                  {/* Animated background elements with improved effects */}
                  <motion.div
                    className="absolute -inset-4 bg-gradient-to-r from-primary-300 to-primary-500 dark:from-primary-700 dark:to-primary-500 rounded-full opacity-20"
                    animate={{
                      scale: [1, 1.05, 1],
                      rotate: [0, 5, 0],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                  ></motion.div>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary-200 to-primary-400 dark:from-primary-900 dark:to-primary-700 rounded-full opacity-30"
                    animate={{
                      scale: [1, 1.03, 1],
                      rotate: [0, -3, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                  ></motion.div>
                  <div className="absolute inset-4 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-lg overflow-hidden">
                    <div className="relative h-72 w-72 sm:h-88 sm:w-88 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-inner transform transition-all duration-500 hover:scale-105 group">
                      {/* Profile photo with enhanced error handling and animation */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 opacity-30 group-hover:opacity-0 transition-opacity duration-500"></div>
                      <motion.div
                        className="w-full h-full"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                        whileHover={{ scale: 1.03 }}
                      >
                        <AnimatePresence mode="wait">
                          {!imageError ? (
                            <motion.div
                              key="profile-image"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="w-full h-full"
                            >
                              <Image
                                src={siteConfig.profileImagePath}
                                alt={`${siteConfig.name} avatar`}
                                fill
                                className="rounded-full object-cover transform group-hover:rotate-3 transition-transform duration-500"
                                priority
                                onError={() => setImageError(true)}
                              />
                            </motion.div>
                          ) : (
                            <motion.div
                              key="placeholder-image"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-full"
                            >
                              <svg
                                className="w-1/2 h-1/2 text-gray-400 dark:text-gray-500"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                              </svg>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Hero;
