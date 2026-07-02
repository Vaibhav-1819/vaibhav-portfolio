# 1. Nexus – Real-Time Collaboration Platform

- **Status:** Currently Working
- **Tech Stack:** React, Node.js, Socket.IO, Firebase, LiveKit

## Problem Statement
As an academic exploration, I wanted to understand the complexities of building a real-time communication platform that scales better than traditional WebRTC mesh networks.

## Approach
I migrated a basic WebRTC mesh architecture toward a Selective Forwarding Unit (SFU) model using LiveKit. I integrated Firebase for authentication and Socket.IO for real-time text chat alongside the video layer.

## Challenges & Learnings
I gained a deep understanding of video streaming protocols, managing complex WebSocket states in React, and balancing scalability with performance when dealing with multiple video tracks.

---

# 2. AetherAI – Environmental Intelligence Platform

- **Status:** Offline
- **Tech Stack:** React, FastAPI, XGBoost, Gemini 1.5 Flash, SQLite

## Problem Statement
Most air quality apps provide raw, static numbers (like AQI 112) without context or forecasting. I wanted to build a system that not only predicts future air quality based on meteorological trends but translates those numbers into human-readable advice.

## Approach
I built a real-time forecasting pipeline using an XGBoost model trained on tabular meteorological data. The model achieved a 94.2% confidence rate in forecasting PM2.5 levels. To provide context, I integrated the Google Gemini 1.5 Flash API to translate the predicted AQI into actionable, personalized health advice.

## Challenges & Learnings
The primary challenge was the latency bottleneck of calling an external LLM. I learned to decouple the fast local ML inference (XGBoost) from the slower LLM API call using asynchronous processing and frontend skeleton loaders to maintain a snappy UX.

---

# 3. CricSphere – High-Performance Cricket Analytics

- **Status:** Online
- **Tech Stack:** Next.js, FastAPI, Redis, DuckDB, Vercel Edge

## Problem Statement
Running complex machine learning inference in real-time during live sports events (where traffic spikes violently after major plays) can easily crash a monolithic backend.

## Approach
I designed a decoupled microservices architecture. A FastAPI backend handles the CPU-bound ML predictions, while a Next.js Edge layer caches the results in Redis (achieving >95% cache hit rates). DuckDB was used for rapid querying of historical PvP records.

## Challenges & Learnings
I tackled severe bottlenecks caused by Python's GIL blocking on CPU-intensive XGBoost predictions. This project taught me the critical importance of caching, point-in-time feature engineering to prevent data leakage, and designing for high concurrency.

---

# 4. MachinaIQ – Predictive Maintenance Platform

- **Status:** Archived
- **Tech Stack:** Python, FastAPI, Scikit-learn (Random Forest), SMOTE, React

## Problem Statement
Industrial equipment failures are costly when caught too late. This project explored whether sensor-style data could be used to predict equipment failure before it happens, rather than relying on reactive or fixed-schedule maintenance.

## Approach
I built a Random Forest classification model trained on equipment sensor data, using SMOTE to handle severe class imbalance between normal operation and failure events (failures are rare by nature, which skews naive models toward always predicting "no failure"). The model was served through a FastAPI backend, with a React frontend for visualizing predictions and equipment status.

## Challenges & Learnings
Class imbalance was the core challenge — without SMOTE, the model could hit high accuracy just by ignoring failures entirely, which is useless in practice. This pushed me to learn precision/recall tradeoffs and why accuracy alone is a misleading metric for imbalanced problems. I also learned how to structure a FastAPI service around a scikit-learn model for real-time inference.

---

# 5. BrandRecognizer – Car Brand Classifier

- **Status:** Archived
- **Tech Stack:** Python, TensorFlow, EfficientNetB0

## Problem Statement
Distinguishing between visually similar car brands from images is a fine-grained image classification problem — small stylistic differences (grille shape, badge placement, body lines) separate one brand from another, making it harder than typical object classification.

## Approach
I used transfer learning on EfficientNetB0, fine-tuning it on a dataset of 11,000+ images spanning 50 car brands. I built an automated preprocessing pipeline (resizing, normalization, augmentation — flips, rotations, brightness shifts) to improve generalization given the dataset size relative to the number of classes.

## Challenges & Learnings
With 50 classes and a moderate dataset size, overfitting was a constant risk. Augmentation and transfer learning (versus training from scratch) were what got the model to ~80% accuracy. I learned how much data pipeline quality affects final model performance, sometimes more than architecture choice.

## Description
Trained an EfficientNetB0 model via transfer learning to classify 50 car brands from 11,000+ images, reaching ~80% accuracy.

---

# 6. CrickIQ – Cricket Quiz Platform

- **Status:** Archived
- **Tech Stack:** React.js

## Problem Statement
Wanted to build a fast, engaging quiz experience for cricket fans — timed questions, categories, and scoring — without a backend, testing how much state and persistence logic could live entirely on the client.

## Approach
Built the UI and quiz logic in React, with a timer system per question, category-based question sets, and a scoring engine. Used session storage to persist quiz state (score, progress, current question) across refreshes without needing a database.

## Challenges & Learnings
Managing timer state correctly alongside React's render cycle (avoiding stale closures in setInterval/setTimeout) was the trickiest part. This project taught me how far client-only state management can go before a backend becomes necessary.

## Description
A responsive cricket quiz platform with timers, categories, and score tracking, using session storage for state persistence.
