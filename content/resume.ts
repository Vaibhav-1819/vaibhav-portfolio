import { Code, Server, FileText, BrainCircuit } from "lucide-react";

export const resumes = [
  {
    id: "software-engineer",
    title: "Software Engineer",
    description: "General software engineering resume highlighting full-stack development, modern frontend frameworks, backend technologies, and system architecture.",
    file: "/docs/Resume_Vaibhav_Ram.pdf",
    icon: Code,
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-500"
  },
  {
    id: "java-developer",
    title: "Java Developer",
    description: "Specialized resume focusing on Java ecosystem, Spring Boot, Microservices, enterprise backend patterns, and relational databases.",
    file: "/docs/Vaibhav_JavaDeveloper.pdf",
    icon: Server,
    color: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-500"
  },
  {
    id: "ml-engineer",
    title: "Machine Learning Engineer",
    description: "Specialized resume focusing on ML models, Python, Deep Learning, data processing pipelines, and AI deployment.",
    file: "/docs/Vaibhav_MLEngineer.pdf",
    icon: BrainCircuit,
    color: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-500"
  }
];
