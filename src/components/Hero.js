import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center text-center bg-white dark:bg-mkbhdBlack px-4"
    >
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-6xl font-extrabold text-mkbhdRed dark:text-red-500"
      >
        Hi, I'm Vaibhav
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="mt-6 text-lg md:text-xl max-w-xl text-gray-700 dark:text-gray-300"
      >
        Full-stack developer with a strong focus on AI integration, UI/UX design,
        and building scalable, user-centric web applications.
      </motion.p>

      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <motion.a
          href="#projects"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="inline-block bg-mkbhdRed text-white px-6 py-3 rounded-xl shadow hover:bg-red-600 transition"
        >
          View My Work
        </motion.a>

        <motion.a
          href="/Vaibhav_Resume.pdf"
          download
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="inline-block border-2 border-mkbhdRed text-mkbhdRed px-6 py-3 rounded-xl shadow hover:bg-mkbhdRed hover:text-white transition"
        >
          Download Resume
        </motion.a>
      </div>
    </section>
  );
};

export default Hero;
