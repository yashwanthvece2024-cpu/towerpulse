"use client";

import { useState, useEffect } from "react";
import { useTelemetry } from "../../hooks/useTelemetry";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { Activity, Zap, Waves } from "lucide-react";

interface VarianceData {
  range: string;
  count: number;
}

export default function SignalAnalyticsPage() {
  const { data } = useTelemetry();
  const [distribution, setDistribution] = useState<VarianceData[]>([
    { range: "0-20cm", count: 0 },
    { range: "21-40cm", count: 0 },
    { range: "41-60cm", count: 0 },
    { range: "61-80cm", count: 0 },
    { range: "81-100cm", count: 0 },
  ]);

  // Maps live distances into a frequency distribution bar chart
  useEffect(() => {
    if (data.distance !== undefined && data.distance !== 999) {
      setDistribution(prev => {
        const newDist = [...prev];
        if (data.distance <= 20) newDist[0].count += 1;
        else if (data.distance <= 40) newDist[1].count += 1;
        else if (data.distance <= 60) newDist[2].count += 1;
        else if (data.distance <= 80) newDist[3].count += 1;
        else newDist[4].count += 1;
        return newDist;
      });
    }
  }, [data.distance]);

  const isBreached = data.state === "BREACHED";

  return (
    <div className="p-6 md:p-8 w-full flex flex-col gap-5 h-[calc(100vh-3.5rem)] bg-[#020617] overflow-hidden">
      
      <div className="border-b border-slate-800 pb-4 shrink-0">
        <h1 className="text-2xl font-bold text-white mb-1.5 tracking-tight">Signal Analytics & DSP Profiling</h1>
        <p className="text-slate-400 text-xs">Acoustic echo distribution and real-time network latency metrics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 shrink-0 h-[120px]">
        <div className="bg-[#070b14] rounded-xl p-5 border border-slate-800 shadow-xl flex items-center gap-5">
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/20">
            <Waves size={24} />
          </div>
          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Signal-to-Noise (SNR)</p>
            <p className="text-2xl font-black text-white">42.8 <span className="text-sm text-slate-500 font-normal">dB</span></p>
          </div>
        </div>
        
        <div className="bg-[#070b14] rounded-xl p-5 border border-slate-800 shadow-xl flex items-center gap-5">
          <div className={`p-3 rounded-lg border ${isBreached ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-green-500/10 text-green-400 border-green-500/20'}`}>
            <Activity size={24} />
          </div>
          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Acoustic Stability</p>
            <p className={`text-2xl font-black ${isBreached ? 'text-red-500' : 'text-green-400'}`}>
              {isBreached ? 'ERRATIC' : 'STABLE'}
            </p>
          </div>
        </div>

        <div className="bg-[#070b14] rounded-xl p-5 border border-slate-800 shadow-xl flex items-center gap-5">
          <div className="p-3 bg-[#00e5ff]/10 text-[#00e5ff] rounded-lg border border-[#00e5ff]/20">
            <Zap size={24} />
          </div>
          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">UART Polling Rate</p>
            <p className="text-2xl font-black text-white">2.5 <span className="text-sm text-slate-500 font-normal">Hz</span></p>
          </div>
        </div>
      </div>

      <div className="bg-[#070b14] rounded-xl p-6 border border-slate-800 shadow-xl flex-1 flex flex-col min-h-0">
        <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4 shrink-0">ACOUSTIC REFLECTION DISTRIBUTION (FREQUENCY DOMAIN)</h3>
        
        <div className="flex-1 w-full relative">
          <div className="absolute inset-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e2d5c" vertical={false} />
                <XAxis dataKey="range" stroke="#475569" fontSize={10} tickMargin={8} />
                <YAxis stroke="#475569" fontSize={10} />
                <Tooltip 
                  cursor={{ fill: '#1e2d5c', opacity: 0.4 }}
                  contentStyle={{ backgroundColor: '#0b132b', borderColor: '#1e2d5c', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} isAnimationActive={false}>
                  {distribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.range === "0-20cm" || entry.range === "21-40cm" ? "#ef4444" : "#00e5ff"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

    </div>
  );
}