'use client';

import { motion } from 'framer-motion';
import { FiDownload } from 'react-icons/fi';
import { siteConfig } from '../lib/site';

export default function About() {
  return (
    <main className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
            About Me
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Learn more about my background, skills, and passion for creating amazing web and AI experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="prose prose-lg text-gray-600 dark:text-gray-400">
              <p>
              Hi, I am Mohit Pandya. A Graphic Designer, A Full Stack developer and an ai/ml enthusiast who loves to be creative and enjoy making solutions that work well but also look good too.

My journey into the world of technology started on the creative front as a graphic designer. I was intrigued by images, stories, and self-telling design without the need for words. However, as I progressed in work, my interest in the technical side increased. This led me to web development, and thereafter, I stepped into the inner world of Python, artificial intelligence, and backend systems.

Currently, I work on full-stack web development using React, Next.js, Node.js, and Tailwind CSS for the frontend and Django, Flask, and FastAPI for the backend. I am also very much interested in machine learning and AI and apply Python to create intelligent systems that optimize the complexity and intuitiveness of an application.

Whether designing intuitive user interfaces, constructing beautiful backend APIs, or testing out neural networks, I am always excited to close the loop between creativity and code.

Aside from technology, you can most probably find me playing chess, strumming the guitar, or getting lost in a good PC game.
              </p>
            </div>

            <div className="mt-8">
              <a
                href={siteConfig.resumePath}
                download="Mohit-Pandya-Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
              >
                <FiDownload className="mr-2" /> Download Resume
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
} 
