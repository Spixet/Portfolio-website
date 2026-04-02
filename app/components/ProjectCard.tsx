'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiExternalLink, FiGithub, FiStar } from 'react-icons/fi';
import { useState, useRef, useEffect } from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  index: number;
  featured?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  tags,
  githubUrl,
  liveUrl,
  index,
  featured = false,
}) => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Handle image load error and use a gradient fallback
  const handleImageError = () => {
    setImageError(true);
  };

  // Add data-cursor attribute for CustomCursor component
  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.setAttribute('data-cursor', 'large');
    }
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -10,
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="project-card group bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 relative"
    >
      {featured && (
        <div className="absolute top-4 right-4 z-20 flex items-center bg-primary-600 text-white px-3 py-1 rounded-full shadow-lg">
          <FiStar className="h-4 w-4 mr-1 animate-pulse" />
          <span className="text-xs font-bold">Featured</span>
        </div>
      )}
      <motion.div 
        className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700 overflow-hidden"
        animate={{
          filter: isHovered ? 'brightness(1.1)' : 'brightness(1)'
        }}
      >
        <img
          src={image}
          alt={`${title} project thumbnail`}
          className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-110"
          onError={handleImageError}
        />
        
        {/* Overlay that appears on hover */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-4 w-full">
            <div className="flex justify-end space-x-2">
              {githubUrl && (
                <motion.button
                  onClick={() => window.open(githubUrl, '_blank', 'noopener,noreferrer')}
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="GitHub Repository"
                  type="button"
                >
                  <FiGithub className="h-5 w-5 text-white" />
                </motion.button>
              )}
              {liveUrl && (
                <motion.button
                  onClick={() => window.open(liveUrl, '_blank', 'noopener,noreferrer')}
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Live Demo"
                  type="button"
                >
                  <FiExternalLink className="h-5 w-5 text-white" />
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
      <div className="p-6">
        <div className="mb-1 flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {tags.slice(0, 3).map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="inline-block px-2 py-1 text-xs font-medium bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-300 rounded-md"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="text-xs text-gray-500 dark:text-gray-400">+{tags.length - 3}</span>
            )}
          </div>
          {featured && <FiStar className="h-5 w-5 text-yellow-500" />}
        </div>
        
        <motion.h3 
          className="text-xl font-bold text-gray-900 dark:text-white group flex items-center gap-2"
          animate={{ color: isHovered ? 'var(--primary-600)' : 'currentColor' }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h3>
        
        <p className="text-gray-600 dark:text-gray-400 mt-2 mb-4 line-clamp-3">{description}</p>
        
        <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-100 dark:border-gray-800">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {new Date().getFullYear()}
          </div>
          
          <div className="flex space-x-2">
            {githubUrl && (
              <motion.a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                aria-label={`GitHub repository for ${title}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiGithub className="h-5 w-5" />
              </motion.a>
            )}
            {liveUrl && (
              <motion.a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                aria-label={`Live demo for ${title}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiExternalLink className="h-5 w-5" />
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;