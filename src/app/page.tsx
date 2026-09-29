"use client";

import { useState, useEffect, useRef } from "react";
import { Activity, Server, Lock, Unlock, Shield, Wifi } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useTelemetry } from "../hooks/useTelemetry";

interface ChartData {
  time: string;
  distance: number;
  timestamp: number;
}

export default function Dashboard() {
  const { data, lastTelemetryTime, adminOpenDoor, adminCloseDoor } = useTelemetry();
  const [history, setHistory] = useState<ChartData[]>([]);
  const [isOnline, setIsOnline] = useState(false);
  const logsContainerRef = useRef<HTMLDivElement>(null);
  
  const lastValidDistance = useRef<number>(0); 

  useEffect(() => {
    setIsOnline(true);
    const timeout = setTimeout(() => setIsOnline(false), 3500);
    return () => clearTimeout(timeout);
  }, [lastTelemetryTime]);

  // LIVE CHART ENGINE: High-speed render
  useEffect(() => {
    if (data.distance !== undefined && isOnline) {
      setHistory(prev => {
        const date = new Date();
        const formattedTime = `${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
        
        let plotDistance = data.distance;
        if (data.distance === 999) {
           plotDistance = lastValidDistance.current;
        } else {
           plotDistance = data.distance;
           lastValidDistance.current = data.distance;
        }

        // CHANGED: If a fast movement is detected, plot it IMMEDIATELY regardless of the second.
        // We only skip plotting if the distance hasn't changed at all to avoid drawing overlapping dots.
        if (prev.length > 0) {
          const lastPoint = prev[prev.length - 1];
          if (lastPoint.time === formattedTime && lastPoint.distance === plotDistance) {
            return prev;
          }
        }

        const newPoint = { time: formattedTime, distance: plotDistance, timestamp: date.getTime() };
        const newHistory = [...prev, newPoint];
        // Increased array size to 60 to handle the faster data rate smoothly
        return newHistory.length > 60 ? newHistory.slice(1) : newHistory; 
      });
    }
  }, [lastTelemetryTime]);

  useEffect(() => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [data.auditLog]);

  const isBreached = data.state === "BREACHED";
  const isOpen = data.state === "OPEN";

  const activeDistance = data.distance === 999 ? lastValidDistance.current : data.distance;
  const displayDistance = !isOnline ? "NULL" : activeDistance;
  const progressWidth = !isOnline ? 0 : Math.min((activeDistance / 100) * 100, 100);

  const headerStatus = isBreached && isOnline ? (
    <div className="flex items-center gap-2 bg-red-950 border border-red-500 text-red-500 px-4 py-1.5 rounded-full text-xs font-bold shadow-[0_0_15px_rgba(239,68,68,0.2)] animate-pulse">
      PERIMETER BREACHED
    </div>
  ) : isOnline ? (
    <div className="flex items-center gap-2 bg-green-950/40 border border-green-500/50 text-green-400 px-4 py-1.5 rounded-full text-xs font-bold shadow-[0_0_15px_rgba(16,185,129,0.1)]">
      PERIMETER SECURE
    </div>
  ) : (
    <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 text-slate-500 px-4 py-1.5 rounded-full text-xs font-bold">
      HARDWARE OFFLINE
    </div>
  );

  return (
    <div className="p-6 md:p-8 w-full flex flex-col gap-5 h-[calc(100vh-3.5rem)] bg-[#020617] overflow-hidden">
      
      <div className="flex justify-between items-center border-b border-slate-800 pb-3 shrink-0">
        <h2 className="text-slate-300 text-sm font-semibold">Autonomous AI Edge Security Node: CT-004</h2>
        <div className="flex gap-4">
          <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold border transition-colors ${isOnline ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' : 'bg-slate-900 border-slate-800 text-slate-600'} hidden md:flex`}>
            {isOnline ? <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span> : <Wifi size={10} />}
            ESP32 Gateway {isOnline ? 'Active' : 'Disconnected'}
          </div>
          {headerStatus}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 shrink-0 max-h-[260px] flex-1">
        
        <div className="bg-[#070b14] rounded-xl p-6 border border-slate-800 shadow-xl flex flex-col relative h-full min-h-0">
          <div className="flex items-center justify-between gap-2 text-slate-400 text-xs mb-2 shrink-0">
             <span className="flex items-center gap-2"><Activity size={14} className="text-[#00e5ff]" /> Live Sonic Telemetry</span>
             {isOnline && displayDistance !== "NULL" && <span className="text-[9px] font-bold text-[#00e5ff] tracking-widest uppercase animate-pulse">Live Stream</span>}
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center min-h-0">
            <div className={`text-[64px] font-black leading-none tracking-tighter drop-shadow-md transition-colors ${displayDistance === "NULL" ? 'text-slate-700' : isBreached ? 'text-red-500' : 'text-[#00e5ff]'}`}>
              {displayDistance}
              {displayDistance !== "NULL" && <span className="text-2xl text-slate-500 ml-2 tracking-normal font-bold">cm</span>}
            </div>
          </div>
          
          <div className="w-full bg-[#020617] h-3.5 rounded-full mt-4 overflow-hidden flex shadow-inner border border-slate-800/50 shrink-0">
            <div 
              className={`h-full transition-all duration-150 ${isBreached ? 'bg-red-500' : 'bg-[#00e5ff]'}`} 
              style={{ width: `${progressWidth}%` }}
            />
          </div>
          <div className="flex justify-between w-full text-[9px] text-slate-500 mt-2 font-medium uppercase tracking-wider shrink-0">
            <span>0cm (Lens)</span>
            <span>30cm (Threshold)</span>
            <span>Sensor Target</span>
          </div>
        </div>

        <div className="flex flex-col gap-4 justify-between h-full min-h-0">
          <div className="bg-[#070b14] rounded-xl p-5 border border-slate-800 shadow-xl flex-1 flex flex-col min-h-0">
            <h2 className="text-xs font-bold text-white mb-2 flex items-center gap-2 shrink-0">
              <Server className="text-purple-400" size={14} /> Gemini Intelligence Layer
            </h2>
            
            <div 
              ref={logsContainerRef}
              className="flex-1 bg-[#03050a] rounded-lg border border-slate-800 p-3 font-mono text-[10px] overflow-y-auto mb-3 custom-scrollbar"
            >
              {data.auditLog && data.auditLog.map((log: string, i: number) => (
                <div key={i} className={`mb-1.5 leading-relaxed ${log.includes("CRITICAL") ? 'text-red-500' : 'text-green-500'}`}>
                  {log}
                </div>
              ))}
            </div>

            <div className="bg-slate-900/50 rounded-lg p-2.5 flex justify-between items-center border border-slate-800 shrink-0">
              <span className="text-slate-300 font-semibold text-[11px]">Physical Servo Deadbolt</span>
              {isBreached ? 
                <span className="text-red-500 font-bold flex items-center gap-1.5 text-[10px]"><Lock size={12} /> LOCKED DOWN</span> : 
                <span className="text-green-400 font-bold flex items-center gap-1.5 text-[10px]"><Unlock size={12} /> {isOpen ? 'DISENGAGED' : 'ENGAGED'}</span>
              }
            </div>
          </div>

          <div className="flex gap-4 shrink-0 h-[44px]">
            <button 
              onClick={adminOpenDoor}
              disabled={!isOnline}
              className="flex-1 bg-[#00e5ff] hover:bg-cyan-300 text-[#020617] disabled:bg-slate-800 disabled:text-slate-600 font-bold rounded-lg text-xs flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,229,255,0.2)] transition-all"
            >
              <Unlock size={14} /> ADMIN: OPEN DOOR
            </button>
            <button 
              onClick={adminCloseDoor}
              disabled={!isOnline}
              className="flex-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 disabled:opacity-50 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <Shield size={14} /> ADMIN: RE-ARM SYSTEM
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#070b14] rounded-xl p-5 border border-slate-800 shadow-xl flex-1 flex flex-col min-h-[220px]">
        <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4 shrink-0">DSP Acoustic Trend (Live)</h2>
        
        <div className="flex-1 w-full relative">
          <div className="absolute inset-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={history} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDistance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={isBreached ? "#ef4444" : "#00e5ff"} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={isBreached ? "#ef4444" : "#00e5ff"} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e2d5c" vertical={false} />
                <XAxis dataKey="time" stroke="#475569" fontSize={10} tickMargin={8} />
                <YAxis stroke="#475569" fontSize={10} domain={[0, 'dataMax + 20']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0b132b', borderColor: '#1e2d5c', color: '#fff', fontSize: '11px', borderRadius: '6px' }} 
                  itemStyle={{ color: '#00e5ff' }}
                  animationDuration={150}
                />
                <Area 
                  type="monotone" 
                  dataKey="distance" 
                  stroke={isBreached ? "#ef4444" : "#00e5ff"} 
                  strokeWidth={2} 
                  fillOpacity={1} 
                  fill="url(#colorDistance)" 
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
    </div>
  );
}