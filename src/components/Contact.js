import React from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";

function Contact() {
  return (
    <motion.section
      id="contact"
      className="max-w-3xl mx-auto px-6 py-12"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-6 border-b-2 border-mkbhdRed inline-block">
        Contact
      </h2>
      <p className="text-lg mb-8">
        Have a question, project idea, or just want to say hi? Feel free to reach out!
      </p>

      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Mail className="text-mkbhdRed" />
          <a href="mailto:bharathulavaibhav@gmail.com" className="text-lg hover:underline">
            bharathulavaibhav@gmail.com
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <Linkedin className="text-mkbhdRed" />
          <a
            href="https://www.linkedin.com/in/vaibhav-bharathula"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg hover:underline"
          >
            linkedin.com/in/vaibhav-bharathula
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <Github className="text-mkbhdRed" />
          <a
            href="https://github.com/Vaibhav-1819"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg hover:underline"
          >
            github.com/Vaibhav-1819
          </a>
        </div>
      </div>
    </motion.section>
  );
}

export default Contact;
