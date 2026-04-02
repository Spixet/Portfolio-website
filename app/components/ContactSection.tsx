'use client';

import { motion } from 'framer-motion';
import {
  FiMail,
  FiMapPin,
  FiPhone,
  FiGithub,
  FiLinkedin,
  FiTwitter,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

import ContactForm from './ContactForm';
import { siteConfig } from '../lib/site';

const socialLinks = [
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
];

const ContactSection = () => {
  return (
    <section className="py-16 bg-backgroundLight dark:bg-gray-800 transition-colors duration-300 relative overflow-hidden">
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-primary-100 dark:bg-primary-900/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 20, 0],
          y: [0, -20, 0],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-72 h-72 bg-primary-200 dark:bg-primary-800/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          x: [0, -20, 0],
          y: [0, 20, 0],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Let&apos;s Work Together
          </h2>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Use the contact form for project inquiries, or reach out directly on
            email, LinkedIn, X, GitHub, or WhatsApp.
          </p>
          <div className="flex justify-center gap-5 mt-8 flex-wrap">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/80 dark:bg-gray-900/80 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 shadow-md"
                aria-label={link.label}
                whileHover={{ y: -5, scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] gap-8 md:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
          >
            <ContactForm />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary-50 to-cardLight dark:from-gray-900 dark:to-gray-800 shadow-lg rounded-xl p-8 border border-gray-200 dark:border-gray-800"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Contact Information
            </h3>

            <div className="space-y-5">
              <div className="flex items-start">
                <div className="flex-shrink-0 p-2 bg-primary-100 dark:bg-gray-800 rounded-full">
                  <FiMail className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Email</p>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 p-2 bg-primary-100 dark:bg-gray-800 rounded-full">
                  <FiPhone className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Phone</p>
                  <a
                    href={`tel:${siteConfig.phoneLink}`}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    {siteConfig.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 p-2 bg-primary-100 dark:bg-gray-800 rounded-full">
                  <FiMapPin className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Location</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {siteConfig.location}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Preferred ways to connect
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <motion.a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center justify-center px-4 py-3 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white font-medium rounded-lg transition-all duration-300"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiMail className="h-5 w-5 mr-2" />
                  Email Directly
                </motion.a>
                <motion.a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-primary-50 dark:hover:bg-gray-800 hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-300 group"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaWhatsapp className="h-5 w-5 mr-2 text-green-500 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Chat on WhatsApp
                  </span>
                </motion.a>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Availability
              </h4>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                {[
                  'Full-time opportunities',
                  'Freelance projects',
                  'Collaborative ventures',
                ].map((item) => (
                  <li key={item} className="flex items-center">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mr-3">
                      <span className="w-2 h-2 rounded-full bg-primary-500 dark:bg-primary-400"></span>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
