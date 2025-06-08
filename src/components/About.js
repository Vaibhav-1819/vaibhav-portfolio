import React from "react";
import { motion } from "framer-motion";

function About() {
  return (
    <motion.section
      id="about"
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "1.5rem",
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "1rem",
          borderBottom: "2px solid #e10600", // MKBHD red
          display: "inline-block",
        }}
      >
        About Me
      </h2>
      <p
        style={{
          fontSize: "1.1rem",
          lineHeight: "1.6",
          color: "#fff",
        }}
      >
        I’m Vaibhav Ram Bharathula, a developer passionate about building
        user-centric web applications. I focus on creating responsive,
        intuitive interfaces using React. Currently, I’m exploring performance
        optimization and animations. Outside of coding, I enjoy tech reviews,
        cricket, and discovering new productivity tools.
      </p>
    </motion.section>
  );
}

export default About;
