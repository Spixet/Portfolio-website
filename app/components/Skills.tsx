'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

type Skill = {
  name: string;
  level: number;
  icon: string;
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  // Example skills - replace with your actual skills
  const allSkills: Record<string, Skill[]> = {
    frontend: [
      { name: 'React', level: 5, icon: '/images/icons/react.svg' },
      { name: 'Next.js', level: 5, icon: '/images/icons/nextjs.svg' },
      { name: 'TypeScript', level: 3, icon: '/images/icons/typescript.svg' },
      { name: 'Tailwind CSS', level: 3, icon: '/images/icons/tailwind.svg' },
      { name: 'JavaScript', level: 5, icon: '/images/icons/javascript.svg' },
      { name: 'HTML/CSS', level: 5, icon: '/images/icons/html.svg' },
    ],
    backend: [
      { name: 'Node.js', level: 4, icon: '/images/icons/nodejs.svg' },
      { name: 'Express', level: 4, icon: '/images/icons/express.svg' },
      { name: 'MongoDB', level: 2, icon: '/images/icons/mongodb.svg' },
      { name: 'SQL', level: 2, icon: '/images/icons/sql.svg' },
      { name: 'Firebase', level: 2, icon: '/images/icons/firebase.svg' },
    ],
    ai: [
      { name: 'Python', level: 5, icon: '/images/icons/python.svg' },
      { name: 'TensorFlow', level: 4, icon: '/images/icons/tensorflow.svg' },
      { name: 'OpenCV', level: 4, icon: '/images/icons/opencv.svg' },
      { name: 'Machine Learning', level: 3, icon: '/images/icons/ml.svg' },
    ],
    tools: [
      { name: 'Git', level: 5, icon: '/images/icons/git.svg' },
      { name: 'Docker', level: 3, icon: '/images/icons/docker.svg' },
      { name: 'VS Code', level: 5, icon: '/images/icons/vscode.svg' },
      { name: 'Figma', level: 5, icon: '/images/icons/figma.svg' },
    ],
  };

  // Get skills based on active category
  const skills = activeCategory === 'all'
    ? Object.values(allSkills).flat()
    : allSkills[activeCategory] || [];

  // Categories for the filter
  const categories = [
    { id: 'all', name: 'All Skills' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' },
    { id: 'ai', name: 'AI & ML' },
    { id: 'tools', name: 'Tools & Others' },
  ];

  return (
    <section className="py-16 bg-backgroundLight dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            My Skills & Expertise
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            I specialize in web development and AI/ML, with a focus on creating responsive, user-friendly applications.
          </p>
        </motion.div>

        {/* Skills filter with enhanced animations and accessibility */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category.id
                ? 'bg-primary-600 text-white shadow-md transform scale-105'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'}`}
              initial={{ filter: 'drop-shadow(0 0px 0px rgba(0, 0, 0, 0))' }}
              whileHover={{ scale: 1.1, filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Filter skills by ${category.name}` }
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills grid with refined animations, tooltips, and smooth filtering */}
        <motion.div
          key={activeCategory} // Force re-animate on category change
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }} // For smooth transitions if using a library like framer-motion for routing, but handled here for filtering
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-8"
        >
          {skills.map((skill, index) => (
            // Inside the .map loop for skills
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              // Adjust delay based on index
              transition={{ duration: 0.3, delay: index * 0.05 }} // Existing delay is good!
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.1, transition: { duration: 0.3 } }}
              className="bg-cardLight dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col items-center transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700 relative overflow-hidden group"
              title={`Skill Level: ${(skill.level / 5) * 100}% - ${['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert'][skill.level - 1]}`} // Add tooltip for skill level
            >
              <div className="w-14 h-14 mb-3 flex items-center justify-center bg-primary-50 dark:bg-gray-700 rounded-full p-2 z-10 group-hover:shadow-md transition-all duration-300">
                <img
                  src={skill.icon}
                  alt={`${skill.name} icon`}
                  className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/icons/default-skill.svg';
                  }}
                />
              </div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white text-center z-10 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                {skill.name}
              </h3>
              <div className="mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden z-10">
                <motion.div
                  className="bg-primary-600 dark:bg-primary-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(skill.level / 5) * 100}%` }}
                  transition={{ duration: 0.8, delay: index * 0.05 }}
                  viewport={{ once: true }}
                />
              </div>
              <span className="mt-2 text-xs text-gray-500 dark:text-gray-400 z-10 group-hover:font-medium transition-all duration-300">
                {['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert'][skill.level - 1]}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty state with animation */}
        {skills.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 dark:text-gray-400">No skills found in this category.</p>
          </motion.div>
        )}

        {/* Additional info with motion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            I&apos;m constantly learning and expanding my skill set. Currently exploring{' '}
            <span className="text-primary-600 dark:text-primary-400 font-medium">Three.js</span> and{' '}
            <span className="text-primary-600 dark:text-primary-400 font-medium">WebGL</span> for creating immersive web experiences.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
