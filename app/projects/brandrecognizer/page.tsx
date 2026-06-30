"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Car, BarChart, Container, Cpu, ArrowRight } from "lucide-react";
import Link from "next/link";
import { projects } from "@/content/projects";

const project = projects.find(p => p.slug === 'brandrecognizer');

export default function BrandRecognizerPage() {
  if (!project) return null;

  return (
    <main className="min-h-screen bg-background text-secondary pb-32">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-background/80 backdrop-blur-md border-b border-border/50">
        <Link href="/labs" className="flex items-center gap-2 text-muted hover:text-primary transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-mono text-sm">Back to Labs</span>
        </Link>
        <div className="font-heading font-bold text-lg tracking-tighter">BrandRecognizer</div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-xs font-mono mb-8 uppercase tracking-widest">
            Functional Machine Learning Model
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tight mb-8">
            Car Brand Classifier.
          </h1>
          <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed mb-12">
            An image classification machine learning pipeline designed to identify car brands with high accuracy. The project leverages transfer learning to recognize intricate automotive features.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm font-mono text-muted mb-20">
            {['TensorFlow', 'Keras', 'OpenCV', 'Numpy', 'Matplotlib', 'Docker'].map(tech => (
              <span key={tech} className="px-4 py-2 border border-border/50 rounded-lg bg-surface/30">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Architecture & Features */}
      <section className="py-20 px-6 max-w-6xl mx-auto space-y-32">
        
        <div className="space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h3 className="font-heading font-bold text-3xl md:text-5xl text-secondary">Key Features</h3>
            <p className="text-muted text-lg">
              The pipeline is designed to be robust and portable, handling everything from raw image input to confident predictions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Preprocessing Engine', icon: Cpu, desc: 'Automatically preprocesses input images (resizing, scaling) for optimal model inference.' },
              { title: 'Confidence Visualization', icon: BarChart, desc: 'Provides classification confidence percentage visualization via Matplotlib.' },
              { title: 'Docker Containerization', icon: Container, desc: 'Fully containerized via Docker for portable and consistent inference across environments.' }
            ].map((step, i) => (
              <motion.div 
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-surface/30 border border-border/50 text-center space-y-4 hover:border-primary/50 transition-colors group relative overflow-hidden"
              >
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <step.icon size={32} />
                </div>
                <h4 className="font-bold text-lg">{step.title}</h4>
                <p className="text-muted text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Technical Deep Dive */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="font-heading font-bold text-3xl">Model Architecture</h3>
            <p className="text-muted leading-relaxed">
              The core of the classifier relies on <strong>EfficientNetB0</strong>, a highly optimized convolutional neural network. By fine-tuning this pre-trained architecture, the model learns brand-specific features without requiring massive amounts of computational resources.
            </p>
            <ul className="space-y-2 text-muted list-disc ml-5 mb-4">
              <li><strong>Architecture:</strong> EfficientNetB0 (Fine-tuned)</li>
              <li><strong>Dataset:</strong> 11,000+ images across 50 distinct car brands</li>
              <li><strong>Framework:</strong> Built and trained with TensorFlow & Keras</li>
              <li><strong>Computer Vision:</strong> OpenCV utilized for advanced image processing operations</li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-surface border border-border/50 relative overflow-hidden shadow-2xl"
          >
             <div className="absolute top-0 right-0 p-4 opacity-10">
               <Car size={120} />
             </div>
             <h4 className="text-xl font-heading font-bold mb-6 text-primary">Tech Stack Detail</h4>
             <div className="space-y-4">
               <div className="flex justify-between items-center border-b border-border/50 pb-4">
                 <span className="text-muted">Deep Learning</span>
                 <span className="font-mono text-secondary">TensorFlow, Keras</span>
               </div>
               <div className="flex justify-between items-center border-b border-border/50 pb-4">
                 <span className="text-muted">Data processing</span>
                 <span className="font-mono text-secondary">Numpy, OpenCV</span>
               </div>
               <div className="flex justify-between items-center border-b border-border/50 pb-4">
                 <span className="text-muted">Visualization</span>
                 <span className="font-mono text-secondary">Matplotlib</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-muted">Deployment</span>
                 <span className="font-mono text-secondary">Docker</span>
               </div>
             </div>
          </motion.div>
        </div>

      </section>

      {/* Footer CTA */}
      <section className="py-32 px-6 text-center border-t border-border/50">
        <h2 className="text-3xl font-heading font-bold mb-8">View the source.</h2>
        {project.github && (
          <a 
            href={project.github} 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-surface border border-border hover:border-primary transition-colors font-bold"
          >
            GitHub Repository <ArrowRight size={18} />
          </a>
        )}
      </section>
    </main>
  );
}
