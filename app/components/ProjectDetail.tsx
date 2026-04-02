'use client';

import { motion } from 'framer-motion';
import { FiX, FiGithub, FiExternalLink, FiCalendar } from 'react-icons/fi';
import Image from 'next/image';
import React, { useState } from 'react';

interface Skill {
  name: string;
  level: number; // 1-5
  icon?: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  tags: string[];
  category: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  dateCreated: string;
  skills: Skill[];
}

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onClose }) => {
  const [skillIconErrors, setSkillIconErrors] = useState<Record<number, boolean>>({});
  
  // Close when clicking outside the modal content
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Close on escape key press
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Handle icon load error
  const handleIconError = (index: number) => {
    setSkillIconErrors(prev => ({ ...prev, [index]: true }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black bg-opacity-75 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="relative bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 shadow-md z-10 transition-colors duration-200"
          aria-label="Close modal"
        >
          <FiX className="h-5 w-5" />
        </button>

        {/* Project image header */}
        <div className="relative h-64 sm:h-80 md:h-96 bg-gradient-to-r from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800">
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="/images/placeholders/default-project.svg"
              alt={`${project.title} project banner`}
              className="w-full h-full object-cover"
            />
          </div>
          {project.featured && (
            <div className="absolute top-6 right-6 bg-yellow-400 dark:bg-yellow-600 text-yellow-900 dark:text-yellow-100 text-sm font-bold px-4 py-1 rounded-full shadow-md transform rotate-3 z-10">
              Featured Project
            </div>
          )}
        </div>

        {/* Project content */}
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 md:mb-0">{project.title}</h2>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <FiCalendar className="mr-1" />
              <span>
                {new Date(project.dateCreated).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block px-3 py-1 text-sm font-medium bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-300 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Skills Used Section */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Skills Used</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.skills.map((skill, index) => (
                <div 
                  key={index}
                  className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700"
                >
                  {skill.icon && !skillIconErrors[index] ? (
                    <div className="w-10 h-10 mr-3 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <img
                        src={skill.icon} 
                        alt={skill.name}
                        width={24}
                        height={24}
                        className="h-6 w-6 text-primary-600 dark:text-primary-400"
                        onError={() => handleIconError(index)}
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 mr-3 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 dark:text-primary-400 font-medium">
                        {skill.name.substring(0, 2)}
                      </span>
                    </div>
                  )}
                  <div className="flex-grow">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert'][skill.level - 1]}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                      <div 
                        className="h-full bg-primary-500 dark:bg-primary-600 rounded-full"
                        style={{ width: `${skill.level * 20}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-6 py-3 bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
              >
                <FiGithub className="h-5 w-5 mr-2" />
                View Source Code
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800 text-white rounded-lg transition-colors duration-200"
              >
                <FiExternalLink className="h-5 w-5 mr-2" />
                View Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectDetail; 