'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight, FiGithub, FiExternalLink } from 'react-icons/fi';

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
};

const FeaturedProjects = () => {
  // Example featured projects - replace with your actual projects
  const featuredProjects: Project[] = [
    {
      id: 'emotion-ai',
      title: 'Emotion Recognition AI',
      description: 'An OpenCV project with Python that recognizes emotions from facial expressions and responds accordingly. Uses TensorFlow for model training and React for the frontend interface.',
      image: '/images/placeholders/ai-project.svg',
      tags: ['Python', 'OpenCV', 'TensorFlow', 'React'],
      githubUrl: 'https://github.com/yourusername/emotion-recognition',
      liveUrl: 'https://emotion-recognition-demo.example.com',
    },
    {
      id: 'ecommerce',
      title: 'E-Commerce Website',
      description: 'A full-featured e-commerce website with modern design, responsive layout, and secure payment processing. Includes product catalog, user authentication, and order management.',
      image: '/images/placeholders/web-project.svg',
      tags: ['React', 'Next.js', 'Tailwind CSS', 'Node.js'],
      githubUrl: 'https://github.com/yourusername/ecommerce-website',
      liveUrl: 'https://ecommerce-demo.example.com',
    },
    {
      id: 'smart-home',
      title: 'Smart Home IoT System',
      description: 'An IoT system that connects home devices and provides an interface to control them remotely. Built with Raspberry Pi as the central hub and React for the user interface.',
      image: '/images/placeholders/iot-project.svg',
      tags: ['IoT', 'Raspberry Pi', 'MQTT', 'React'],
      githubUrl: 'https://github.com/yourusername/smart-home',
      liveUrl: 'https://smart-home-demo.example.com',
    },
  ];

  return (
    <section className="py-16 bg-backgroundLight dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Featured Projects
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Check out some of my recent work. These projects showcase my skills in web development and AI/ML.
          </p>
        </motion.div>

        <div className="space-y-20">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}
            >
              {/* Project Image with enhanced animations */}
              <motion.div 
                className="lg:w-1/2 relative group overflow-hidden rounded-2xl shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              >
                <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700 rounded-2xl overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-110"
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="p-4 w-full">
                      <div className="flex justify-end space-x-2">
                        <motion.button
                          onClick={() => window.open(project.githubUrl, '_blank', 'noopener,noreferrer')}
                          className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-200" 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label="GitHub Repository"
                          type="button"
                        >
                          <FiGithub className="h-5 w-5 text-white" />
                        </motion.button>
                        <motion.button
                          onClick={() => window.open(project.liveUrl, '_blank', 'noopener,noreferrer')}
                          className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-200" 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label="Live Demo"
                          type="button"
                        >
                          <FiExternalLink className="h-5 w-5 text-white" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Project Info with refined styles */}
              <div className="lg:w-1/2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <motion.span
                        key={tag}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 transition-all duration-300 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-500 dark:hover:text-white" 
                        whileHover={{ scale: 1.1 }} // Primary-600 for dark mode compatibility
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <motion.button
                      onClick={() => window.open(project.githubUrl, '_blank', 'noopener,noreferrer')}
                      className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200" 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                    >
                      <FiGithub className="mr-2" />
                      Source Code
                    </motion.button>
                    <motion.button
                      onClick={() => window.open(project.liveUrl, '_blank', 'noopener,noreferrer')}
                      className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200" 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                    >
                      <FiExternalLink className="mr-2" />
                      Live Demo
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link
              href="/projects"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              View All Projects
              <FiArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;