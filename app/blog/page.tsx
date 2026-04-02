'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiClock, FiTag, FiArrowRight } from 'react-icons/fi';
import Image from 'next/image';

export default function Blog() {
  // Example blog posts - you would replace these with your actual content
  // Placeholder blog posts - replace with actual data fetching later
  const blogPosts = [
    {
      id: 1,
      title: 'Building This Portfolio with Next.js & Tailwind',
      excerpt: 'A deep dive into the technologies and techniques used to create this website.',
      imageUrl: '/images/placeholder-blog-portfolio.jpg', // Corrected path
      date: '2024-07-28',
      tags: ['Next.js', 'Tailwind CSS', 'React'],
      slug: '/blog/building-portfolio',
      readTime: '5 min read', // Added placeholder
      category: 'Tutorial', // Added placeholder
    },
    {
      id: 2,
      title: 'Animating React Components with Framer Motion',
      excerpt: 'Learn how to add smooth, performant animations to your React applications.',
      imageUrl: '/images/placeholder-blog-emotion.jpg', // Corrected path
      date: '2024-07-25',
      tags: ['React', 'Animation', 'Framer Motion'],
      slug: '/blog/animating-with-framer-motion',
      readTime: '7 min read', // Added placeholder
      category: 'Guide', // Added placeholder
    },
    {
      id: 3,
      title: 'Getting Started with Tailwind CSS Utility Classes',
      excerpt: 'An introduction to the utility-first approach of Tailwind CSS for rapid UI development.',
      imageUrl: '/images/placeholder-blog-tailwind.jpg', // Corrected path
      date: '2024-07-22',
      tags: ['CSS', 'Tailwind CSS', 'Web Development'],
      slug: '/blog/getting-started-tailwind',
      readTime: '4 min read', // Added placeholder
      category: 'Introduction', // Added placeholder
    },
    {
      id: 4,
      title: 'Integrating AI Features into Web Applications',
      excerpt: 'Exploring different ways to leverage AI models and services in modern web apps.',
      imageUrl: '/images/placeholder-blog-ai-web.jpg', // Corrected path
      date: '2024-07-19',
      tags: ['AI', 'Web Development', 'APIs'],
      slug: '/blog/integrating-ai-web',
      readTime: '8 min read', // Added placeholder
      category: 'Exploration', // Added placeholder
    },
    // Add more placeholder posts if needed
  ];

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
            Blog
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Thoughts, tutorials, and insights about web development, AI, and technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-48 sm:h-64 md:h-40 lg:h-48 xl:h-56 overflow-hidden group"> {/* Added group class */}
                <Image
                  src={post.imageUrl}
                  alt={`Featured image for ${post.title}`}
                  width={400} // Base width
                  height={250} // Base height
                  // Add sizes prop for responsive loading
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/placeholder-image.svg'; // Fallback image
                    target.alt = 'Placeholder image';
                  }}
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <span className="flex items-center">
                    <FiClock className="mr-1" /> {post.readTime}
                  </span>
                  <span className="mx-2">•</span>
                  <span className="flex items-center">
                    <FiTag className="mr-1" /> {post.category}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{post.date}</span>
                  <Link
                    href={post.slug} // Use post.slug directly
                    className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
                  >
                    Read More <FiArrowRight className="ml-1" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </main>
  );
}