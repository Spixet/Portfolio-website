'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import ScrollReveal from '../components/ScrollReveal';

export default function Projects() {
  const [filter, setFilter] = useState('all');

  // Example projects - you would replace these with your actual projects
  const allProjects = [
    {
      title: 'Emotion Recognition AI',
      description:
        'An OpenCV project with Python that recognizes emotions from facial expressions and responds accordingly. Uses TensorFlow for model training and React for the frontend interface.',
      image: '/images/placeholders/ai-project.svg',
      tags: ['Python', 'OpenCV', 'TensorFlow', 'React'],
      category: 'ai',
      githubUrl: 'https://github.com/Spixet/emotion-recognition',
      liveUrl: 'https://emotion-recognition-demo.example.com',
      featured: true,
    },
    {
      title: 'E-Commerce Website',
      description:
        'A full-featured e-commerce website with modern design, responsive layout, and secure payment processing. Includes product catalog, user authentication, and order management.',
      image: '/images/placeholders/web-project.svg',
      tags: ['React', 'Next.js', 'Tailwind CSS', 'Node.js'],
      category: 'web',
      githubUrl: 'https://github.com/Spixet/ecommerce-website',
      liveUrl: 'https://ecommerce-demo.example.com',
      featured: true,
    },
    {
      title: 'Smart Home IoT System',
      description:
        'An IoT system that connects home devices and provides an interface to control them remotely. Built with Raspberry Pi as the central hub and React for the user interface.',
      image: '/images/placeholders/iot-project.svg',
      tags: ['IoT', 'Raspberry Pi', 'MQTT', 'React'],
      category: 'iot',
      githubUrl: 'https://github.com/Spixet/smart-home',
      liveUrl: 'https://smart-home-demo.example.com',
      featured: true,
    },
    {
      title: 'Weather Dashboard',
      description:
        'A beautiful weather app that displays current conditions and forecasts with engaging animations. Integrates with weather APIs to provide accurate data for any location.',
      image: '/images/placeholders/weather-project.svg',
      tags: ['JavaScript', 'CSS', 'Weather API'],
      category: 'web',
      githubUrl: 'https://github.com/Spixet/weather-dashboard',
      liveUrl: 'https://weather-demo.example.com',
    },
    {
      title: 'Image Recognition App',
      description:
        'A mobile application that can identify objects in images. Utilizes deep learning models for accurate object detection and classification.',
      image: '/images/placeholders/ai-recognition.svg',
      tags: ['Python', 'TensorFlow', 'React Native'],
      category: 'ai',
      githubUrl: 'https://github.com/Spixet/image-recognition',
      liveUrl: 'https://image-recognition-demo.example.com',
    },
    {
      title: 'Portfolio Website',
      description:
        'A responsive portfolio website built with modern web technologies. Features animations, dark mode, and optimized performance.',
      image: '/images/placeholders/portfolio-project.svg',
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      category: 'web',
      githubUrl: 'https://github.com/Spixet/portfolio',
      liveUrl: 'https://yourname-portfolio.example.com',
    },
    {
      title: 'Natural Language Chatbot',
      description:
        'An AI-powered chatbot that can understand and respond to natural language queries. Uses NLP techniques for understanding user intent.',
      image: '/images/placeholders/chatbot-project.svg',
      tags: ['Python', 'NLTK', 'TensorFlow', 'React'],
      category: 'ai',
      githubUrl: 'https://github.com/Spixet/nl-chatbot',
      liveUrl: 'https://chatbot-demo.example.com',
    },
  ];

  const filteredProjects = filter === 'all' 
    ? allProjects 
    : allProjects.filter(project => project.category === filter);

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
            My Projects
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Check out some of my recent work. These projects showcase my skills in web development and AI/ML.
          </p>
        </motion.div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                filter === 'all'
                  ? 'bg-primary-600 text-white dark:bg-primary-500'
                  : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
              } border border-gray-300 dark:border-gray-700 transition-colors duration-200`}
            >
              All Projects
            </button>
            <button
              type="button"
              onClick={() => setFilter('web')}
              className={`px-4 py-2 text-sm font-medium ${
                filter === 'web'
                  ? 'bg-primary-600 text-white dark:bg-primary-500'
                  : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
              } border-t border-b border-r border-gray-300 dark:border-gray-700 transition-colors duration-200`}
            >
              Web Development
            </button>
            <button
              type="button"
              onClick={() => setFilter('ai')}
              className={`px-4 py-2 text-sm font-medium ${
                filter === 'ai'
                  ? 'bg-primary-600 text-white dark:bg-primary-500'
                  : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
              } border-t border-b border-r border-gray-300 dark:border-gray-700 transition-colors duration-200`}
            >
              AI/ML Projects
            </button>
            <button
              type="button"
              onClick={() => setFilter('iot')}
              className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                filter === 'iot'
                  ? 'bg-primary-600 text-white dark:bg-primary-500'
                  : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
              } border-t border-b border-r border-gray-300 dark:border-gray-700 transition-colors duration-200`}
            >
              IoT Projects
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              image={project.image}
              tags={project.tags}
              githubUrl={project.githubUrl}
              liveUrl={project.liveUrl}
              index={index}
              featured={project.featured}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No projects found matching this filter.
            </p>
          </div>
        )}
      </div>
    </main>
  );
} 