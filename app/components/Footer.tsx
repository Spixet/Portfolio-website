'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiMail,
  FiArrowUp,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useEffect, useState } from 'react';

import { siteConfig } from '../lib/site';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300 relative">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={footerVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          <motion.div
            className="flex flex-col items-center md:items-start text-center md:text-left"
            variants={itemVariants}
          >
            <motion.h2
              className="text-2xl font-bold text-gray-900 dark:text-white mb-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {siteConfig.name}
            </motion.h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-xs mx-auto md:mx-0">
              Passionate Engineer crafting beautiful, functional experiences.
            </p>
            <div className="flex space-x-5">
              {[
                {
                  href: siteConfig.githubUrl,
                  label: 'GitHub',
                  icon: <FiGithub className="h-6 w-6" />,
                },
                {
                  href: siteConfig.linkedinUrl,
                  label: 'LinkedIn',
                  icon: <FiLinkedin className="h-6 w-6" />,
                },
                {
                  href: siteConfig.twitterUrl,
                  label: 'Twitter',
                  icon: <FiTwitter className="h-6 w-6" />,
                },
                {
                  href: siteConfig.whatsappUrl,
                  label: 'WhatsApp',
                  icon: <FaWhatsapp className="h-6 w-6" />,
                },
              ].map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300"
                  aria-label={item.label}
                  whileHover={{ y: -5, scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {item.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-5">
              Navigation
            </h3>
            <ul className="space-y-3 text-center md:text-left">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About' },
                { href: '/projects', label: 'Projects' },
                { href: '/blog', label: 'Blog' },
                { href: '/contact', label: 'Contact' },
              ].map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 flex items-center group"
                  >
                    <span className="inline-block w-0 group-hover:w-2 h-0.5 bg-primary-600 dark:bg-primary-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-5">
              Get in Touch
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-5 text-center md:text-left">
              Feel free to reach out for collaborations or just a friendly hello.
            </p>
            <motion.a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline transition-all duration-300 group text-center md:text-left mx-auto md:mx-0"
              whileHover={{ x: 5, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative">
                {siteConfig.email}
                <motion.span
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 dark:bg-primary-400 group-hover:w-full transition-all duration-300"
                  whileHover={{ width: '100%' }}
                ></motion.span>
              </span>
              <FiMail className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 md:mt-16 pt-8 border-t border-gray-200 dark:border-gray-700"
          variants={itemVariants}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-3 sm:mb-0">
              &copy; {currentYear} {siteConfig.name}. All rights reserved.
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Crafted with <span className="text-red-500 animate-pulse">&#10084;</span> and{' '}
              <span className="font-semibold text-primary-600 dark:text-primary-400">Next.js</span>
            </p>
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 p-3 bg-primary-600 dark:bg-primary-500 text-white rounded-full shadow-lg z-50"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top"
          >
            <FiArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
