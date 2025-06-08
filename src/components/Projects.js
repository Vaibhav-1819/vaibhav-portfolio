import React from 'react';
import { motion } from 'framer-motion';

const Projects = () => {
  return (
    <section id="projects" className="py-16 px-4 md:px-12 lg:px-24">
      <motion.h2
        className="text-3xl font-bold mb-6 text-center text-red-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Projects
      </motion.h2>
      <div className="grid md:grid-cols-2 gap-6">

        {/* Car Brand Classifier Project */}
        <motion.div
          className="p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-xl font-semibold text-black dark:text-white">
            Car Brand Classifier
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            A deep learning model built with TensorFlow and EfficientNetB0 to classify images of car brands. Achieved ~80% validation accuracy using a dataset of 11,000 images and real-time prediction via a web interface.
          </p>
        </motion.div>

        {/* Quiz Platform Project */}
        <motion.div
          className="p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-xl font-semibold text-black dark:text-white">
            Quiz Platform
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            A full-featured React quiz app with categories, progress bar, timer, session persistence, animations, and dynamic IPL/MKBHD-themed styling using Tailwind CSS and Framer Motion.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default Projects;
