import React from "react";
import { motion } from "framer-motion";
import { Code, Terminal, Database, Wrench, Cpu } from "lucide-react";

const categorizedSkills = [
  {
    category: "Programming Languages",
    skills: [
      { name: "Java", icon: <Cpu size={28} /> },
      { name: "Python", icon: <Cpu size={28} /> },
      { name: "JavaScript", icon: <Terminal size={28} /> },
    ],
  },
  {
    category: "Frontend",
    skills: [
      { name: "HTML5", icon: <Code size={28} /> },
      { name: "CSS3", icon: <Code size={28} /> },
      { name: "React", icon: <Code size={28} /> },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", icon: <Terminal size={28} /> },
      { name: "MySQL", icon: <Database size={28} /> },
    ],
  },
  {
    category: "Tools",
    skills: [
      { name: "Git & GitHub", icon: <Wrench size={28} /> },
    ],
  },
];

function Skills() {
  return (
    <motion.section
      id="skills"
      className="max-w-5xl mx-auto px-6"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-6 border-b-2 border-mkbhdRed inline-block">
        Skills
      </h2>

      {categorizedSkills.map((group, idx) => (
        <div key={idx} className="mb-10">
          <h3 className="text-xl font-semibold mb-4 text-mkbhdRed dark:text-red-400">{group.category}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {group.skills.map((skill, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center p-4 rounded-xl bg-gray-100 dark:bg-gray-800 shadow hover:shadow-md transition"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-mkbhdRed dark:text-red-400 mb-2">{skill.icon}</div>
                <p className="text-sm font-medium">{skill.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </motion.section>
  );
}

export default Skills;
