export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  category: 'Real-Time Systems' | 'Machine Learning';
};

export const blogs: BlogPost[] = [
  {
    id: "jarvis-n8n-automation",
    slug: "jarvis-n8n-automation",
    title: "Automating My Morning Routine with n8n, Gemini, and JARVIS",
    description: "How I used n8n to build an automated, AI-powered JARVIS morning briefing that emails me the weather, a programming joke, and a daily coding challenge.",
    date: "July 17, 2026",
    readTime: "6 min read",
    tags: ["n8n", "Google Gemini", "Automation", "Workflow"],
    category: "Real-Time Systems"
  },
  {
    id: "nexus-part4-telemetry-rbac-ai",
    slug: "nexus-part4-telemetry-rbac-ai",
    title: "Building Nexus (Part 4): Production-Grade Telemetry, RBAC, and Gemini Semantic Search",
    description: "An in-depth look at implementing role-based access control, serverless-friendly vector similarity, and compiling absolute telemetry data for Nexus.",
    date: "August 5, 2026",
    readTime: "11 min read",
    tags: ["Google Gemini", "RBAC", "Telemetry", "Firebase", "Next.js"],
    category: "Real-Time Systems"
  },
  {
    id: "nexus-part1-foundation-collaboration",
    slug: "nexus-part1-foundation-collaboration",
    title: "Building Nexus (Part 1): The Foundation & Real-Time Collaborative Canvas",
    description: "How I built the foundation of Nexus: pairing Next.js 14, Clerk authentication, and Stream Video/Chat SDKs with a Liveblocks and Yjs collaborative editor.",
    date: "July 13, 2026",
    readTime: "9 min read",
    tags: ["Next.js 14", "Stream SDK", "Clerk", "Liveblocks", "Yjs"],
    category: "Real-Time Systems"
  },
  {
    id: "nexus-part2-workspace-architecture",
    slug: "nexus-part2-workspace-architecture",
    title: "Building Nexus (Part 2): Unified Workspaces, Universal Inbox, and Folder Infrastructure",
    description: "Deep diving into Nexus workspace management: building the Workspace Home dashboard, a universal inbox, and structured file navigation.",
    date: "July 14, 2026",
    readTime: "8 min read",
    tags: ["Next.js 14", "Firebase", "State Management", "Tailwind CSS"],
    category: "Real-Time Systems"
  },
  {
    id: "nexus-part3-ai-native-security",
    slug: "nexus-part3-ai-native-security",
    title: "Building Nexus (Part 3): The AI-Native Layer & Zero-Trust Security Architecture",
    description: "Architecting the final pieces of Nexus: building server-brokered storage security, Gemini activity briefs, and Pinecone-based semantic search.",
    date: "July 16, 2026",
    readTime: "10 min read",
    tags: ["Google Gemini", "Pinecone", "Vercel AI SDK", "Zero-Trust", "Security"],
    category: "Real-Time Systems"
  },
  {
    id: "building-realtime-sfu",
    slug: "building-realtime-sfu",
    title: "Building a Real-Time SFU with LiveKit",
    description: "An deep dive into transitioning from a standard WebRTC mesh network to a scalable Selective Forwarding Unit (SFU) architecture.",
    date: "May 2026",
    readTime: "8 min read",
    tags: ["WebRTC", "LiveKit", "React"],
    category: "Real-Time Systems"
  },
  {
    id: "ai-air-quality",
    slug: "ai-air-quality",
    title: "Predicting Air Quality with XGBoost & Gemini",
    description: "How I built AetherAI using Python, FastAPI, and an XGBoost machine learning model to provide real-time localized environmental insights.",
    date: "March 2026",
    readTime: "6 min read",
    tags: ["Machine Learning", "Python", "FastAPI"],
    category: "Machine Learning"
  },
  {
    id: "cricsphere-architecture",
    slug: "cricsphere-architecture",
    title: "Architecting CricSphere: High-Performance Analytics at Scale",
    description: "An overview of how I built CricSphere, combining full-stack web development with machine learning models to deliver real-time cricket match predictions.",
    date: "January 2026",
    readTime: "7 min read",
    tags: ["Next.js", "Machine Learning", "Data Analytics"],
    category: "Machine Learning"
  },
  {
    id: "machinaiq-predictive-maintenance",
    slug: "machinaiq-predictive-maintenance",
    title: "MachinaIQ: AI-Driven Predictive Maintenance at Scale",
    description: "Building an explainable AI system using FastAPI, Random Forests, and SMOTE to predict industrial equipment failures in real-time.",
    date: "June 2026",
    readTime: "10 min read",
    tags: ["Machine Learning", "FastAPI", "Explainable AI"],
    category: "Machine Learning"
  },
  {
    id: "car-brand-classification-efficientnet",
    slug: "car-brand-classification-efficientnet",
    title: "Automated Car Brand Classification using EfficientNet",
    description: "Training a deep learning CNN model on over 11,000 images to identify 50 distinct car brands with transfer learning.",
    date: "May 2025",
    readTime: "8 min read",
    tags: ["Deep Learning", "Computer Vision", "TensorFlow"],
    category: "Machine Learning"
  },
  {
    id: "cyber-threat-detection-ml",
    slug: "cyber-threat-detection-ml",
    title: "Building a Real-Time Cyber Threat Detection System with ML",
    description: "A deep dive into architecting a real-time network anomaly detection system using Machine Learning, packet inspection, and Python.",
    date: "October 2025",
    readTime: "15 min read",
    tags: ["Machine Learning", "Cybersecurity", "FastAPI", "Python"],
    category: "Machine Learning"
  }
];
