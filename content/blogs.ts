export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
};

export const blogs: BlogPost[] = [
  {
    id: "building-realtime-sfu",
    slug: "building-realtime-sfu",
    title: "Building a Real-Time SFU with LiveKit",
    description: "An deep dive into transitioning from a standard WebRTC mesh network to a scalable Selective Forwarding Unit (SFU) architecture.",
    date: "May 2026",
    readTime: "8 min read",
    tags: ["WebRTC", "LiveKit", "React"]
  },
  {
    id: "ai-air-quality",
    slug: "ai-air-quality",
    title: "Predicting Air Quality with XGBoost & Gemini",
    description: "How I built AetherAI using Python, FastAPI, and an XGBoost machine learning model to provide real-time localized environmental insights.",
    date: "March 2026",
    readTime: "6 min read",
    tags: ["Machine Learning", "Python", "FastAPI"]
  },
  {
    id: "cricsphere-architecture",
    slug: "cricsphere-architecture",
    title: "Architecting CricSphere: High-Performance Analytics at Scale",
    description: "An overview of how I built CricSphere, combining full-stack web development with machine learning models to deliver real-time cricket match predictions.",
    date: "January 2026",
    readTime: "7 min read",
    tags: ["Next.js", "Machine Learning", "Data Analytics"]
  },
  {
    id: "machinaiq-predictive-maintenance",
    slug: "machinaiq-predictive-maintenance",
    title: "MachinaIQ: AI-Driven Predictive Maintenance at Scale",
    description: "Building an explainable AI system using FastAPI, Random Forests, and SMOTE to predict industrial equipment failures in real-time.",
    date: "June 2026",
    readTime: "10 min read",
    tags: ["Machine Learning", "FastAPI", "Explainable AI"]
  },
  {
    id: "car-brand-classification-efficientnet",
    slug: "car-brand-classification-efficientnet",
    title: "Automated Car Brand Classification using EfficientNet",
    description: "Training a deep learning CNN model on over 11,000 images to identify 50 distinct car brands with transfer learning.",
    date: "May 2025",
    readTime: "8 min read",
    tags: ["Deep Learning", "Computer Vision", "TensorFlow"]
  },
  {
    id: "cyber-threat-detection-ml",
    slug: "cyber-threat-detection-ml",
    title: "Building a Real-Time Cyber Threat Detection System with ML",
    description: "A deep dive into architecting a real-time network anomaly detection system using Machine Learning, packet inspection, and Python.",
    date: "October 2025",
    readTime: "15 min read",
    tags: ["Machine Learning", "Cybersecurity", "FastAPI", "Python"]
  }
];
