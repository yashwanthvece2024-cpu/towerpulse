"use client";

import dynamic from 'next/dynamic';
import { useTelemetry } from "@/hooks/useTelemetry";
import { AlertTriangle, ShieldCheck, Settings, Play, Square } from "lucide-react";

// CRITICAL SSR FIX: Load the map ONLY on the browser
const LiveMap = dynamic(() => import('@/components/LiveMap'), { ssr: false });

export default function TowerMapTab() {
  const { 
    data, 
    isSimulated, setIsSimulated, 
    simulatedDistance, setSimulatedDistance, 
    isAutoDemo, setIsAutoDemo 
  } = useTelemetry();

  const isBreached = data.status === "CRITICAL";

  return (
    <div className="flex h-screen bg-slate-950">
      {/* MAP AREA */}
      <div className="flex-1 relative">
         <LiveMap isBreached={isBreached} />
         
         {isBreached && (
           <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[1000] bg-red-600 text-white px-8 py-3 rounded-full font-bold animate-pulse shadow-[0_0_20px_rgba(220,38,38,0.6)] flex items-center gap-3">
             <AlertTriangle size={24} /> CAB-ALPHA SABOTAGE DETECTED
           </div>
         )}
      </div>

      {/* SIDEBAR - Now with overflow-y-auto so you can scroll! */}
      <div className="w-96 bg-slate-900 border-l border-slate-800 p-6 flex flex-col overflow-y-auto">
        <h3 className="text-slate-400 font-bold mb-6 text-sm tracking-widest">LIVE NETWORK NODES</h3>
        
        {/* Node Status Card */}
        <div className={`p-5 rounded-xl border-2 transition-all ${isBreached ? 'border-red-500 bg-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'border-slate-700 bg-slate-800'}`}>
          <div className="flex justify-between items-center mb-3">
            <span className="font-bold text-white text-lg">CAB-ALPHA (CT-004)</span>
            {isBreached ? <AlertTriangle className="text-red-500" size={20} /> : <ShieldCheck className="text-green-500" size={20} />}
          </div>
          <div className="text-sm text-slate-400">
            Clearance: <span className="font-mono text-white ml-2">{data.distance} cm</span>
          </div>
          <div className="text-sm text-slate-400 mt-2">
            Status: <span className={isBreached ? 'text-red-500 font-bold animate-pulse ml-2' : 'text-green-500 font-bold ml-2'}>
              {isBreached ? 'LOCKED (INCIDENT)' : 'SECURE'}
            </span>
          </div>
        </div>

        {/* HACKATHON FAIL-SAFE: Simulation Controls */}
        <div className="mt-auto pt-6 border-t border-slate-800">
          <h3 className="text-slate-400 font-bold mb-4 text-sm flex items-center gap-2">
            <Settings size={16} /> DEVELOPER OVERRIDE
          </h3>
          
          <div className="flex gap-2 mb-4">
            <button 
              onClick={() => { setIsSimulated(!isSimulated); setIsAutoDemo(false); }}
              className={`flex-1 py-2 rounded font-bold transition-colors text-sm ${isSimulated && !isAutoDemo ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
            >
              Manual Override
            </button>
            
            <button 
              onClick={() => setIsAutoDemo(!isAutoDemo)}
              className={`flex-1 py-2 rounded font-bold transition-colors text-sm flex justify-center items-center gap-2 ${isAutoDemo ? 'bg-green-600 text-white animate-pulse' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
            >
              {isAutoDemo ? <Square size={16} /> : <Play size={16} />}
              Auto-Pilot Demo
            </button>
          </div>

          {(isSimulated && !isAutoDemo) && (
            <div className="bg-slate-950 p-4 rounded border border-slate-800">
              <label className="text-xs text-slate-500 block mb-2">Simulate Physical Distance (cm)</label>
              <input 
                type="range" 
                min="5" 
                max="80" 
                value={simulatedDistance}
                onChange={(e) => setSimulatedDistance(Number(e.target.value))}
                className="w-full accent-purple-500"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-2">
                <span className="text-red-500 font-bold">Alert ({`<`}30cm)</span>
                <span className="text-green-500 font-bold">Secure Zone</span>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}