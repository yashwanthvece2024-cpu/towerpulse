"use client";

import { useEffect, useState, useRef } from "react";
import { ShieldCheck, AlertTriangle, Activity, Server, Lock, Unlock } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface Telemetry {
  distance: number;
  status: string;
  logMessage: string;
}

interface ChartData {
  time: string;
  distance: number;
}

export default function Dashboard() {
  const [data, setData] = useState<Telemetry>({ distance: 15, status: "SAFE", logMessage: "Initializing hardware link..." });
  const [history, setHistory] = useState<ChartData[]>([]);
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Poll the API every 500ms for live hardware data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/analyze-threat");
        if (!res.ok) return;
        const liveData = await res.json();
        
        setData(liveData);

        // Update the live chart history
        setHistory(prev => {
          const newPoint = { 
            time: new Date().toLocaleTimeString([], { hour12: false, second: '2-digit', minute: '2-digit' }), 
            distance: liveData.distance 
          };
          const newHistory = [...prev, newPoint];
          return newHistory.length > 20 ? newHistory.slice(1) : newHistory; // Keep last 20 ticks
        });

      } catch (error) {
        console.error("Hardware disconnected");
      }
    };

    const interval = setInterval(fetchData, 500); // 500ms polling
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll the terminal audit log
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data.logMessage]);

  const isSafe = data.status === "SAFE";

  return (
    <div className={`min-h-screen p-8 transition-colors duration-500 ${isSafe ? 'bg-slate-950' : 'bg-red-950/40'}`}>
      
      {/* HEADER SECTION */}
      <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-4xl font-bold text-white flex items-center gap-3">
            <Activity className="text-blue-500" /> TowerPulse NOC
          </h1>
          <p className="text-slate-400 mt-2">Autonomous AI Edge Security Node: CT-004</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-lg border border-slate-700 text-slate-300">
            <Server size={18} className="text-green-500" /> ESP32 Gateway Online
          </div>
          <div className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold border ${isSafe ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20 animate-pulse'}`}>
            {isSafe ? <ShieldCheck size={20} /> : <AlertTriangle size={20} />}
            {isSafe ? "PERIMETER SECURE" : "CRITICAL BREACH"}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LIVE HARDWARE TELEMETRY CARD */}
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute top-4 left-4 flex items-center gap-2 text-slate-400 text-sm">
             <Activity size={16} /> Live Sonic Telemetry
          </div>
          
          <div className={`text-8xl font-black mt-8 mb-2 ${isSafe ? 'text-blue-400' : 'text-red-500'}`}>
            {data.distance}
            <span className="text-3xl text-slate-500 ml-2">cm</span>
          </div>
          
          <div className="w-full bg-slate-800 h-4 rounded-full mt-8 overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${isSafe ? 'bg-blue-500' : 'bg-red-500'}`} 
              style={{ width: `${Math.min((data.distance / 100) * 100, 100)}%` }}
            />
          </div>
          <div className="flex justify-between w-full text-xs text-slate-500 mt-2">
            <span>0cm (Lens)</span>
            <span>30cm (Threshold)</span>
            <span>100+cm (Open Air)</span>
          </div>
        </div>

        {/* AI AGENT LOGIC CARD */}
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-2xl col-span-1 lg:col-span-2 flex flex-col">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Server className="text-purple-400" /> Gemini Intelligence Layer
          </h2>
          
          <div className="flex-1 bg-black rounded-lg border border-slate-800 p-4 font-mono text-sm overflow-y-auto max-h-[200px]">
            <div className="text-slate-500 mb-2">{">"} AI Evaluation Engine Engaged...</div>
            <div className={isSafe ? 'text-green-400' : 'text-red-400'}>
              {">"} {data.logMessage}
            </div>
            <div ref={logsEndRef} />
          </div>

          <div className="mt-4 flex gap-4">
             <div className="flex-1 bg-slate-800 rounded p-4 flex justify-between items-center border border-slate-700">
               <span className="text-slate-400 font-bold">Physical Servo Deadbolt</span>
               {isSafe ? 
                  <span className="text-green-500 flex items-center gap-1"><Unlock size={18} /> DISENGAGED</span> : 
                  <span className="text-red-500 font-bold flex items-center gap-1 animate-pulse"><Lock size={18} /> LOCKED DOWN</span>
               }
             </div>
          </div>
        </div>

        {/* REAL-TIME TREND GRAPH */}
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-2xl col-span-1 lg:col-span-3 h-80">
          <h2 className="text-xl font-bold text-white mb-4">DSP Acoustic Trend (Live)</h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="time" stroke="#475569" fontSize={12} />
              <YAxis stroke="#475569" fontSize={12} domain={[0, 100]} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff' }} />
              <Line 
                type="monotone" 
                dataKey="distance" 
                stroke={isSafe ? "#3b82f6" : "#ef4444"} 
                strokeWidth={3} 
                dot={false}
                isAnimationActive={false} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}