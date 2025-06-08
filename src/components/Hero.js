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
        Full-stack developer with a strong focus on AI integration, UI/UX design, and building scalable, user-centric web applications.
      </motion.p>

      <motion.a
        href="#projects"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.6 }}
        className="mt-8 inline-block bg-mkbhdRed text-white px-6 py-3 rounded-xl shadow hover:bg-red-600 transition"
      >
        View My Work
      </motion.a>
    </section>
  );
};

export default Hero;
