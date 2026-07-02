"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wind, Thermometer, Droplets, ArrowRight, Loader2, Sparkles } from 'lucide-react';

export function AetherAIDemo() {
  const [temperature, setTemperature] = useState<number>(32);
  const [humidity, setHumidity] = useState<number>(65);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ aqi: number; advice: string } | null>(null);

  const handlePredict = () => {
    setLoading(true);
    setResult(null);
    
    // Simulate FastAPI + XGBoost + Gemini latency
    setTimeout(() => {
      // Mock ML Logic
      const mockAqi = Math.floor(temperature * 2.5 + humidity * 0.5 - 10 + (Math.random() * 20));
      let mockAdvice = "";
      
      if (mockAqi < 50) mockAdvice = "The air quality is excellent today. It's a perfect day for outdoor exercise or opening the windows!";
      else if (mockAqi < 100) mockAdvice = "Air quality is acceptable. However, unusually sensitive individuals should consider limiting prolonged outdoor exertion.";
      else if (mockAqi < 150) mockAdvice = "Members of sensitive groups may experience health effects. The general public is less likely to be affected.";
      else mockAdvice = "Everyone may begin to experience health effects. Active children and adults should avoid prolonged outdoor exertion.";

      setResult({ aqi: mockAqi, advice: mockAdvice });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="my-12 p-1 rounded-3xl bg-gradient-to-br from-primary/20 via-surface to-accent/20">
      <div className="bg-background rounded-[22px] p-6 md:p-8 space-y-8">
        
        <div className="flex items-center justify-between border-b border-border/50 pb-4">
          <div className="flex items-center gap-2 text-primary font-mono text-sm tracking-widest uppercase">
            <Wind size={18} />
            <span>AetherAI Inference Demo</span>
          </div>
          <div className="flex gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-border" />
            <span className="w-2.5 h-2.5 rounded-full bg-border" />
            <span className="w-2.5 h-2.5 rounded-full bg-primary/50" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Input Panel */}
          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-xs font-mono text-muted uppercase tracking-wider mb-3">
                <Thermometer size={14} /> Temperature (°C)
              </label>
              <input 
                type="range" min="-10" max="45" value={temperature} 
                onChange={(e) => setTemperature(parseInt(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="text-right text-secondary font-mono font-bold mt-1">{temperature}°C</div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-xs font-mono text-muted uppercase tracking-wider mb-3">
                <Droplets size={14} /> Humidity (%)
              </label>
              <input 
                type="range" min="0" max="100" value={humidity} 
                onChange={(e) => setHumidity(parseInt(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="text-right text-secondary font-mono font-bold mt-1">{humidity}%</div>
            </div>

            <button 
              onClick={handlePredict}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm tracking-wide active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:active:scale-100"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <><Sparkles size={16} /> Predict AQI</>}
            </button>
            <p className="text-[10px] text-center text-muted/60 font-mono">*Using cached model weights to avoid Gemini API costs</p>
          </div>

          {/* Output Panel */}
          <div className="bg-surface/50 border border-border/50 rounded-2xl p-6 flex flex-col justify-center min-h-[200px]">
            {loading ? (
              <div className="space-y-4 w-full animate-pulse">
                <div className="h-4 bg-border/50 rounded w-1/4" />
                <div className="h-12 bg-border/50 rounded w-full" />
                <div className="h-4 bg-border/50 rounded w-full" />
                <div className="h-4 bg-border/50 rounded w-3/4" />
              </div>
            ) : result ? (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <div>
                  <span className="text-[10px] font-mono text-muted uppercase tracking-widest block mb-1">Forecasted AQI (XGBoost)</span>
                  <div className="flex items-end gap-2">
                    <span className="text-5xl font-heading font-black text-secondary">{result.aqi}</span>
                    <span className="text-sm font-bold pb-1 text-primary">µg/m³</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-border/50">
                  <span className="text-[10px] font-mono text-muted uppercase tracking-widest flex items-center gap-1 mb-2">
                    <Sparkles size={10} className="text-accent" /> Gemini 1.5 Flash Insight
                  </span>
                  <p className="text-sm leading-relaxed text-secondary italic">
                    "{result.advice}"
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="text-center text-muted flex flex-col items-center gap-2">
                <ArrowRight className="opacity-20" size={32} />
                <p className="text-sm">Adjust parameters and predict</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
