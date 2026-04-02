import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { useState, useEffect, lazy, Suspense } from 'react';
import { FiFilter, FiList, FiGrid, FiArrowUp, FiArrowDown, FiX, FiGithub, FiExternalLink } from 'react-icons/fi';
import Image from 'next/image';

// Lazy load the ProjectDetail component
const ProjectDetail = lazy(() => import('./ProjectDetail'));

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

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortOption, setSortOption] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage, setProjectsPerPage] = useState(6);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Example projects - you would replace these with your actual projects
  const allProjects: Project[] = [
    {
      id: 'emotion-ai',
      title: 'Emotion Recognition AI',
      description: 'An OpenCV project with Python that recognizes emotions from facial expressions and responds accordingly.',
      longDescription: 'This project uses computer vision and machine learning to identify emotions from facial expressions in real-time. Built with OpenCV and TensorFlow, it analyzes key facial points to classify expressions into categories like happy, sad, angry, surprised, etc. The system can be integrated with other applications to provide emotion-responsive features.',
      image: '/images/placeholders/ai-project.svg',
      tags: ['Python', 'OpenCV', 'TensorFlow', 'React'],
      category: 'AI',
      githubUrl: 'https://github.com/yourusername/emotion-recognition',
      liveUrl: 'https://emotion-recognition-demo.example.com',
      featured: true,
      dateCreated: '2023-11-10',
      skills: [
        { name: 'Python', level: 5, icon: '/images/icons/python.svg' },
        { name: 'OpenCV', level: 4, icon: '/images/icons/default-skill.svg' },
        { name: 'TensorFlow', level: 4, icon: '/images/icons/default-skill.svg' },
        { name: 'React', level: 3, icon: '/images/icons/react.svg' }
      ]
    },
    {
      id: 'ecommerce',
      title: 'E-Commerce Website',
      description: 'A full-featured e-commerce website with modern design, responsive layout, and secure payment processing.',
      longDescription: 'This e-commerce platform offers a complete shopping experience with product catalog, user accounts, shopping cart, checkout process, and order management. Built with Next.js and Tailwind CSS for the frontend, with Node.js powering the backend. Features include product filtering, search functionality, secure payment processing, and responsive design for all devices.',
      image: '/images/placeholders/web-project.svg',
      tags: ['React', 'Next.js', 'Tailwind CSS', 'Node.js'],
      category: 'Web Development',
      githubUrl: 'https://github.com/yourusername/ecommerce-website',
      liveUrl: 'https://ecommerce-demo.example.com',
      featured: true,
      dateCreated: '2023-09-05',
      skills: [
        { name: 'React', level: 5, icon: '/images/icons/react.svg' },
        { name: 'Next.js', level: 4, icon: '/images/icons/nextjs.svg' },
        { name: 'Tailwind CSS', level: 5, icon: '/images/icons/tailwind.svg' },
        { name: 'Node.js', level: 4, icon: '/images/icons/nodejs.svg' }
      ]
    },
    {
      id: 'weather',
      title: 'Weather Dashboard',
      description: 'A beautiful weather app that displays current conditions and forecasts with engaging animations.',
      longDescription: 'This weather application provides real-time weather data and forecasts with an intuitive and visually appealing interface. Users can search for locations worldwide and view current conditions, hourly forecasts, and 7-day predictions. The app features dynamic backgrounds that change based on weather conditions and time of day, along with smooth animations for data visualization.',
      image: '/images/placeholders/web-project.svg',
      tags: ['JavaScript', 'CSS', 'Weather API'],
      category: 'Web Development',
      githubUrl: 'https://github.com/yourusername/weather-dashboard',
      liveUrl: 'https://weather-demo.example.com',
      featured: false,
      dateCreated: '2023-07-22',
      skills: [
        { name: 'JavaScript', level: 5, icon: '/images/icons/javascript.svg' },
        { name: 'CSS', level: 4, icon: '/images/icons/default-skill.svg' },
        { name: 'API Integration', level: 4, icon: '/images/icons/default-skill.svg' }
      ]
    },
    {
      id: 'task-management',
      title: 'Task Management App',
      description: 'A productivity app that helps users organize tasks, set priorities, and track progress on projects.',
      longDescription: 'This task management application helps users stay organized and productive with features for creating, categorizing, and prioritizing tasks. Built with React Native for cross-platform compatibility, it includes task boards, lists, timers, reminders, and progress tracking. The app syncs across devices and integrates with calendar applications.',
      image: '/images/placeholders/mobile-project.svg',
      tags: ['React Native', 'Firebase', 'Redux'],
      category: 'Mobile App',
      githubUrl: 'https://github.com/yourusername/task-management',
      liveUrl: 'https://task-app-demo.example.com',
      featured: false,
      dateCreated: '2023-05-14',
      skills: [
        { name: 'React Native', level: 4, icon: '/images/icons/react.svg' },
        { name: 'Firebase', level: 3, icon: '/images/icons/default-skill.svg' },
        { name: 'Redux', level: 4, icon: '/images/icons/default-skill.svg' }
      ]
    },
    {
      id: 'finance-tracker',
      title: 'Personal Finance Tracker',
      description: 'An application to track expenses, income, and investments with data visualization and budget planning.',
      longDescription: 'This financial management tool helps users monitor their finances, set budgets, and visualize spending patterns. It features expense tracking, income recording, budget planning, and investment monitoring. The dashboard provides visual representations of financial data through charts and graphs, making it easy to understand spending habits and financial trends.',
      image: '/images/placeholders/web-project.svg',
      tags: ['Vue.js', 'Firebase', 'Chart.js'],
      category: 'Web Development',
      githubUrl: 'https://github.com/yourusername/finance-tracker',
      liveUrl: 'https://finance-tracker-demo.example.com',
      featured: false,
      dateCreated: '2023-03-19',
      skills: [
        { name: 'Vue.js', level: 4, icon: '/images/icons/default-skill.svg' },
        { name: 'Firebase', level: 4, icon: '/images/icons/default-skill.svg' },
        { name: 'Chart.js', level: 5, icon: '/images/icons/default-skill.svg' }
      ]
    },
    {
      id: 'smart-home',
      title: 'Smart Home IoT System',
      description: 'An IoT system that connects home devices and provides an interface to control them remotely.',
      longDescription: 'This Internet of Things (IoT) solution creates a connected smart home environment where users can monitor and control various devices remotely. Built with Raspberry Pi as the central hub, it connects to smart lights, thermostats, security cameras, and other home devices. The accompanying React application provides a user-friendly interface for device management, automation rules, and monitoring.',
      image: '/images/placeholders/iot-project.svg',
      tags: ['IoT', 'Raspberry Pi', 'MQTT', 'React'],
      category: 'IoT',
      githubUrl: 'https://github.com/yourusername/smart-home',
      liveUrl: 'https://smart-home-demo.example.com',
      featured: true,
      dateCreated: '2023-01-05',
      skills: [
        { name: 'IoT', level: 4, icon: '/images/icons/default-skill.svg' },
        { name: 'Raspberry Pi', level: 5, icon: '/images/icons/default-skill.svg' },
        { name: 'MQTT', level: 3, icon: '/images/icons/default-skill.svg' },
        { name: 'React', level: 4, icon: '/images/icons/react.svg' }
      ]
    },
    {
      id: 'portfolio-website',
      title: 'Portfolio Website',
      description: 'A modern portfolio website showcasing projects and skills with a clean, responsive design.',
      longDescription: 'This portfolio website serves as a showcase for professional work, projects, and skills. Built with Next.js and Tailwind CSS, it features a responsive design that works seamlessly across all devices. The site includes project galleries, skill visualization, contact forms, and blog functionality, all with smooth animations and transitions.',
      image: '/images/placeholders/web-project.svg',
      tags: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
      category: 'Web Development',
      githubUrl: 'https://github.com/yourusername/portfolio',
      liveUrl: 'https://portfolio-demo.example.com',
      featured: false,
      dateCreated: '2022-12-10',
      skills: [
        { name: 'Next.js', level: 5, icon: '/images/icons/nextjs.svg' },
        { name: 'Tailwind CSS', level: 5, icon: '/images/icons/tailwind.svg' },
        { name: 'Framer Motion', level: 4, icon: '/images/icons/default-skill.svg' }
      ]
    },
  ];

  // Extract unique categories from projects
  const categories = ['All', ...new Set(allProjects.map(project => project.category))];

  // Filter projects based on active filter
  const filteredProjects = activeFilter === 'All'
    ? allProjects
    : allProjects.filter(project => project.category === activeFilter);

  // Sort projects based on sort option
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortOption) {
      case 'newest':
        return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
      case 'oldest':
        return new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime();
      case 'az':
        return a.title.localeCompare(b.title);
      case 'za':
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  // Get current projects for pagination
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = sortedProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(sortedProjects.length / projectsPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Handle project click to open modal
  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    // Re-enable scrolling
    document.body.style.overflow = 'auto';
  };

  // Reset pagination when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  return (
    <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            All Projects
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore my complete portfolio of projects across different technologies and domains.
          </p>
        </motion.div>

        {/* Control Bar - Categories, Sorting, View Toggle */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((category, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  activeFilter === category
                    ? 'bg-primary-600 text-white dark:bg-primary-500'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                } transition-colors duration-200`}
              >
                {category}
              </motion.button>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="appearance-none bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-2 pl-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="az">A-Z</option>
                <option value="za">Z-A</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                {sortOption.includes('newest') ? (
                  <FiArrowDown className="h-4 w-4" />
                ) : sortOption.includes('oldest') ? (
                  <FiArrowUp className="h-4 w-4" />
                ) : (
                  <FiArrowDown className="h-4 w-4" />
                )}
              </div>
            </div>
            
            {/* View Toggle */}
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
                aria-label="Grid view"
              >
                <FiGrid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
                aria-label="List view"
              >
                <FiList className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Projects Display - Grid or List View */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentProjects.map((project, index) => (
              <motion.div
                key={project.id}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                onClick={() => handleProjectClick(project)}
                className="cursor-pointer relative"
              >
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  tags={project.tags}
                  githubUrl={project.githubUrl}
                  liveUrl={project.liveUrl}
                  index={index}
                />
                {project.featured && (
                  <div className="absolute top-4 right-4 bg-yellow-400 dark:bg-yellow-600 text-yellow-900 dark:text-yellow-100 text-xs font-bold px-3 py-1 rounded-full shadow-md transform rotate-3 z-10">
                    Featured
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {currentProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ 
                  x: 5,
                  transition: { duration: 0.2 }
                }}
                onClick={() => handleProjectClick(project)}
                className="cursor-pointer bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg p-6 transition-all duration-300 relative flex flex-col md:flex-row gap-6"
              >
                <div className="w-full md:w-1/4 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden h-48 md:h-auto">
                  <div className="w-full h-full bg-gradient-to-r from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 flex items-center justify-center">
                    <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                      {project.title.split(' ').map(word => word[0]).join('')}
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-3/4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <div className="bg-yellow-400 dark:bg-yellow-600 text-yellow-900 dark:text-yellow-100 text-xs font-bold px-3 py-1 rounded-full shadow-sm transform rotate-3">
                        Featured
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="inline-block px-3 py-1 text-xs font-medium bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-300 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 flex items-center"
                          aria-label={`GitHub repository for ${project.title}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FiGithub className="h-5 w-5 mr-1" />
                          <span>Code</span>
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 flex items-center ml-4"
                          aria-label={`Live demo for ${project.title}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FiExternalLink className="h-5 w-5 mr-1" />
                          <span>Demo</span>
                        </a>
                      )}
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-500">
                      {new Date(project.dateCreated).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short'
                      })}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-3 py-2 rounded-l-md border ${
                  currentPage === 1
                    ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed'
                    : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                } text-sm font-medium ${
                  currentPage === 1
                    ? 'text-gray-400 dark:text-gray-600'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                    currentPage === index + 1
                      ? 'bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-300 border-primary-500'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`relative inline-flex items-center px-3 py-2 rounded-r-md border ${
                  currentPage === totalPages
                    ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed'
                    : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                } text-sm font-medium ${
                  currentPage === totalPages
                    ? 'text-gray-400 dark:text-gray-600'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                Next
              </button>
            </nav>
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <FiFilter className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" />
            <h3 className="mt-2 text-xl font-medium text-gray-900 dark:text-white">No projects found</h3>
            <p className="mt-1 text-gray-500 dark:text-gray-400">Try changing your filter selection</p>
          </div>
        )}

        {/* Project Detail Modal */}
        <AnimatePresence>
          {isModalOpen && selectedProject && (
            <Suspense fallback={
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                  Loading project details...
                </div>
              </div>
            }>
              <ProjectDetail
                project={selectedProject}
                onClose={closeModal}
              />
            </Suspense>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects; 