import React from "react";
import { motion } from "framer-motion";
import { Award } from "lucide-react";

const certificates = [
  {
    title: "Full Stack Web Development",
    issuer: "Coursera",
    link: "https://www.coursera.org/account/accomplishments/certificate/XYZ123",
    date: "March 2024",
  },
  {
    title: "AI & Machine Learning",
    issuer: "Udacity",
    link: "https://confirm.udacity.com/ABC456",
    date: "January 2024",
  },
  {
    title: "Frontend Developer Certification",
    issuer: "FreeCodeCamp",
    link: "https://www.freecodecamp.org/certification/vaibhav/frontend",
    date: "November 2023",
  },
];

function Certificates() {
  return (
    <motion.section
      id="certificates"
      className="max-w-4xl mx-auto px-6 py-12"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-6 border-b-2 border-mkbhdRed inline-block">
        Certificates
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {certificates.map((cert, index) => (
          <div
            key={index}
            className="bg-white dark:bg-zinc-900 text-black dark:text-white border border-gray-200 dark:border-zinc-700 p-6 rounded-2xl shadow-sm hover:shadow-md transition-transform hover:scale-[1.02]"
          >
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-5 h-5 text-mkbhdRed dark:text-red-400" />
              <h3 className="text-xl font-semibold">{cert.title}</h3>
            </div>
            <p className="text-zinc-700 dark:text-zinc-300 mb-1">{cert.issuer}</p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3">{cert.date}</p>
            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-mkbhdRed underline hover:opacity-80 transition"
            >
              View Certificate →
            </a>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

export default Certificates;
