# 1. Nexus – Real-Time Collaboration Platform

- **Status:** Currently Working
- **Tech Stack:** React, Node.js, Socket.IO, Firebase, LiveKit

## Problem Statement
As an academic exploration, I wanted to understand the complexities of building a real-time communication platform that scales better than traditional WebRTC mesh networks.

## Approach
I migrated a basic WebRTC mesh architecture toward a Selective Forwarding Unit (SFU) model using LiveKit. I integrated Firebase for authentication and Socket.IO for real-time text chat alongside the video layer.

## Challenges & Learnings
I gained a deep understanding of video streaming protocols, managing complex WebSocket states in React, and balancing scalability with performance when dealing with multiple video tracks.

## Description
Explored real-time collaboration by building an SFU-based platform using LiveKit and WebRTC.

---

# 2. AetherAI – Environmental Intelligence Platform

- **Tech Stack:** React, FastAPI, XGBoost, Gemini, SQLite

## Problem Statement
For this academic project, the goal was to bridge the gap between raw environmental data and actionable user insights by providing real-time, localized air quality forecasting.

## Approach
I engineered a full-stack system using FastAPI to serve an XGBoost machine learning model. The frontend was built with React to display the data dynamically. I also integrated the Gemini API to generate easy-to-understand summaries of the air quality metrics.

## Challenges & Learnings
Integrating multiple APIs and managing a machine learning pipeline in a web application taught me how to handle asynchronous data fetching efficiently and how to deploy ML inference endpoints.

## Description
Developed an AI-powered platform for real-time air quality monitoring and forecasting.

---

# 3. CricSphere – The Ultimate Cricket Destination with AI-ML Powered Analytics

- **Tech Stack:** React, Node.js, Express.js, RapidAPI
- **Demo Link:** [https://cricsphere-version1.vercel.app/](https://cricsphere-version1.vercel.app/)

## Problem Statement
Born from my personal passion for cricket, this academic project aimed to create a comprehensive hub for live scores, match schedules, and player statistics without the clutter of traditional sports sites.

## Approach
I developed the backend using Node.js and Express to interact with RapidAPI for live cricket data. I implemented robust caching mechanisms to minimize API calls and reduce latency. The frontend was built in React for a smooth, single-page experience.

## Challenges & Learnings
I learned critical performance optimization techniques, specifically how to implement server-side caching to handle rate-limited third-party APIs seamlessly.

## Description
Built a full-stack cricket platform with live match data integration and AI-ML powered analytics.

---

# Other Notable Projects (from Resume)

## BrandRecognizer – Car Brand Classifier
- **Tech Stack:** Python, TensorFlow, EfficientNetB0
- **Description:** Trained a deep learning model on 11,000+ images across 50 brands. Achieved ~80% accuracy using transfer learning and augmentation. Automated preprocessing and evaluation pipeline.

## CrickIQ – Cricket Quiz Platform
- **Tech Stack:** React.js
- **Description:** Developed a responsive quiz platform with timers, categories, and scoring system. Implemented session storage for state persistence and designed an engaging, user-friendly UI.
