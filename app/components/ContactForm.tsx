'use client';

import { useEffect, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { FiSend, FiCheck, FiAlertTriangle } from 'react-icons/fi';

import ScrollReveal from './ScrollReveal';
import { siteConfig } from '../lib/site';

interface FormData {
  name: string;
  email: string;
  message: string;
  website: string;
  formStartedAt: number;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  message: '',
  website: '',
  formStartedAt: 0,
};

const initialTouched = {
  name: false,
  email: false,
  message: false,
};

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [touched, setTouched] = useState<Record<string, boolean>>(initialTouched);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      formStartedAt: Date.now(),
    }));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmitError(null);
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setFocused(null);
  };

  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFocused(e.target.name);
  };

  useEffect(() => {
    const nextErrors: Record<string, string> = {};

    if (touched.name && !formData.name.trim()) {
      nextErrors.name = 'Name is required';
    }

    if (touched.email) {
      if (!formData.email.trim()) {
        nextErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        nextErrors.email = 'Invalid email format';
      }
    }

    if (touched.message) {
      if (!formData.message.trim()) {
        nextErrors.message = 'Message is required';
      } else if (formData.message.trim().length < 10) {
        nextErrors.message = 'Please add a little more detail';
      }
    }

    setErrors(nextErrors);
  }, [formData, touched]);

  const isFormValid = () =>
    formData.name.trim() !== '' &&
    formData.email.trim() !== '' &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
    formData.message.trim().length >= 10;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({
      name: true,
      email: true,
      message: true,
    });

    if (!isFormValid()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = (await response.json()) as {
        message?: string;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }

      setIsSubmitted(true);
      setFormData({
        ...initialFormData,
        formStartedAt: Date.now(),
      });
      setTouched(initialTouched);
    } catch (error: unknown) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : `Failed to send message. Please email me directly at ${siteConfig.email}.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const formVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const successVariants: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 25,
      },
    },
  };

  return (
    <ScrollReveal>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden transition-all duration-300 border border-gray-200 dark:border-gray-800">
        <div className="p-8">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Start a Conversation
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Tell me a little about your project, role, or idea and I&apos;ll
              get back to you as soon as I can.
            </p>
          </div>

          {isSubmitted ? (
            <motion.div
              className="py-8 text-center"
              variants={successVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-green-100 dark:bg-green-900">
                <FiCheck className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Message Sent
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Thanks for reaching out. I&apos;ll get back to you shortly.
              </p>
              <motion.button
                type="button"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsSubmitted(false)}
              >
                Send another message
              </motion.button>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <div
                className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden opacity-0 pointer-events-none"
                aria-hidden="true"
              >
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  autoComplete="off"
                  tabIndex={-1}
                />
              </div>
              <input
                type="hidden"
                name="formStartedAt"
                value={formData.formStartedAt}
                readOnly
              />
              <motion.div variants={itemVariants}>
                <div className="relative">
                  <label
                    htmlFor="name"
                    className={`absolute left-3 ${
                      focused === 'name' || formData.name
                        ? '-top-2 text-xs bg-white dark:bg-gray-900 px-1'
                        : 'top-3 text-base'
                    } text-gray-600 dark:text-gray-400 transition-all duration-200`}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    autoComplete="name"
                    maxLength={80}
                    className={`w-full px-3 py-3 border-2 rounded-lg outline-none transition-all duration-200 ${
                      errors.name
                        ? 'border-red-500 dark:border-red-400'
                        : focused === 'name'
                          ? 'border-primary-500 dark:border-primary-400'
                          : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <div className="relative">
                  <label
                    htmlFor="email"
                    className={`absolute left-3 ${
                      focused === 'email' || formData.email
                        ? '-top-2 text-xs bg-white dark:bg-gray-900 px-1'
                        : 'top-3 text-base'
                    } text-gray-600 dark:text-gray-400 transition-all duration-200`}
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    autoComplete="email"
                    maxLength={254}
                    className={`w-full px-3 py-3 border-2 rounded-lg outline-none transition-all duration-200 ${
                      errors.email
                        ? 'border-red-500 dark:border-red-400'
                        : focused === 'email'
                          ? 'border-primary-500 dark:border-primary-400'
                          : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <div className="relative">
                  <label
                    htmlFor="message"
                    className={`absolute left-3 ${
                      focused === 'message' || formData.message
                        ? '-top-2 text-xs bg-white dark:bg-gray-900 px-1'
                        : 'top-3 text-base'
                    } text-gray-600 dark:text-gray-400 transition-all duration-200`}
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    minLength={10}
                    maxLength={4000}
                    className={`w-full px-3 py-3 border-2 rounded-lg outline-none transition-all duration-200 ${
                      errors.message
                        ? 'border-red-500 dark:border-red-400'
                        : focused === 'message'
                          ? 'border-primary-500 dark:border-primary-400'
                          : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                      {errors.message}
                    </p>
                  )}
                </div>
              </motion.div>

              {submitError && (
                <motion.div
                  variants={itemVariants}
                  className="p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg flex items-start gap-2"
                >
                  <FiAlertTriangle className="h-5 w-5 mt-0.5" />
                  <span>{submitError}</span>
                </motion.div>
              )}

              <motion.p
                variants={itemVariants}
                className="text-sm text-gray-500 dark:text-gray-400"
              >
                Prefer email? Reach me directly at{' '}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-primary-600 dark:text-primary-400 hover:underline"
                >
                  {siteConfig.email}
                </a>
                .
              </motion.p>

              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium text-white transition-all duration-300 ${
                    isSubmitting
                      ? 'bg-gray-400 dark:bg-gray-700 cursor-not-allowed'
                      : 'bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600'
                  }`}
                  whileHover={isSubmitting ? {} : { scale: 1.02 }}
                  whileTap={isSubmitting ? {} : { scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4Zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647Z"
                        ></path>
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <FiSend className="h-5 w-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </motion.div>
            </motion.form>
          )}
        </div>
      </div>
    </ScrollReveal>
  );
};

export default ContactForm;
