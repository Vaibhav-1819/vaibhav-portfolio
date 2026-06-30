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
  }
];
