"use client";

import { useTelemetry } from "../../hooks/useTelemetry";
import { ShieldAlert, Activity, Cpu, AlertOctagon } from "lucide-react";

export default function ThreatDetectionPage() {
  const { data } = useTelemetry();
  const isBreached = data.state === "BREACHED";
  
  const riskScore = isBreached ? 87 : 12;
  const displayDistance = data.distance === 999 ? "--" : data.distance;

  return (
    <div className="p-6 md:p-8 w-full flex flex-col gap-6 min-h-[calc(100vh-3.5rem)] bg-[#020617]">
      <div className="flex justify-between items-center border-b border-slate-800 pb-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1.5 tracking-tight">Threat Detection & AI Analysis</h1>
          <p className="text-slate-400 text-xs">Autonomous ECE hardware anomaly detection and security policy evaluation</p>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold border shadow-sm ${isBreached ? 'bg-red-950/40 border-red-500/50 text-red-500' : 'bg-green-950/20 border-green-500/30 text-green-500'}`}>
          <AlertOctagon size={16} /> 
          {isBreached ? 'CRITICAL BREACH ACTIVE' : 'SYSTEM NOMINAL'}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 shrink-0">
        {/* RISK METER */}
        <div className="bg-[#070b14] rounded-xl p-6 border border-slate-800 shadow-xl flex flex-col items-center justify-center min-h-[260px]">
          <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-6">CURRENT FLEET RISK INDEX</h3>
          <div className={`w-32 h-32 rounded-full border-8 flex flex-col items-center justify-center mb-6 shadow-inner ${isBreached ? 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.3)]' : 'border-[#00e5ff] shadow-[0_0_30px_rgba(0,229,255,0.1)]'}`}>
            <span className={`text-4xl font-black ${isBreached ? 'text-red-500' : 'text-white'}`}>{riskScore}</span>
            <span className="text-[9px] text-slate-500 font-bold">/ 100 MAX</span>
          </div>
          <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wider border ${isBreached ? 'bg-red-500/10 text-red-500 border-red-500/30' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
            {isBreached ? 'SEVERITY: CRITICAL THREAT' : 'SEVERITY: LOW (SAFE)'}
          </div>
        </div>

        {/* ANOMALY PARAMETERS */}
        <div className="col-span-1 lg:col-span-2 bg-[#070b14] rounded-xl p-6 border border-slate-800 shadow-xl flex flex-col">
          <h3 className="text-[11px] font-bold text-white uppercase tracking-widest mb-4">REAL-TIME SENSOR ANOMALY PARAMETERS</h3>
          <div className="space-y-3 flex-1">
            <div className="bg-[#03050a] p-3.5 rounded-lg border border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full ${isBreached ? 'bg-red-500' : 'bg-green-500'}`}></span>
                <span className="text-xs font-bold text-slate-300">HC-SR04 Door Distance</span>
              </div>
              <span className={`font-mono text-xs font-bold ${isBreached ? 'text-red-400' : 'text-[#00e5ff]'}`}>
                {displayDistance} cm {isBreached && '(Delta: >30cm)'}
              </span>
            </div>
            <div className="bg-[#03050a] p-3.5 rounded-lg border border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full ${isBreached ? 'bg-amber-500' : 'bg-green-500'}`}></span>
                <span className="text-xs font-bold text-slate-300">Signal Variance (Noise Rate)</span>
              </div>
              <span className="font-mono text-xs font-bold text-amber-400">5.4 Std Dev</span>
            </div>
            <div className="bg-[#03050a] p-3.5 rounded-lg border border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="text-xs font-bold text-slate-300">ESP32 Gateway Link</span>
              </div>
              <span className="font-mono text-xs font-bold text-green-400">Stable (10 Hz)</span>
            </div>
          </div>
        </div>
      </div>

      {/* PIPELINE VISUALIZATION */}
      <div className="bg-[#070b14] rounded-xl p-6 border border-slate-800 shadow-xl flex-1 flex flex-col">
        <h3 className="text-[11px] font-bold text-white uppercase tracking-widest mb-6">AUTONOMOUS THREAT DETECTION PIPELINE</h3>
        <div className="flex items-center gap-4 flex-1">
          <div className="flex-1 bg-[#03050a] rounded-xl border border-slate-800 p-5 flex flex-col items-center text-center justify-center h-full">
            <Activity size={24} className="text-[#00e5ff] mb-3" />
            <h4 className="text-xs font-bold text-white mb-1">1. HC-SR04 Sensor</h4>
            <p className="text-[10px] text-slate-500">Ultrasonic echo timing converted to raw distance.</p>
          </div>
          <div className="text-slate-600">→</div>
          <div className="flex-1 bg-[#03050a] rounded-xl border border-slate-800 p-5 flex flex-col items-center text-center justify-center h-full">
            <Cpu size={24} className="text-[#00e5ff] mb-3" />
            <h4 className="text-xs font-bold text-white mb-1">2. DSP Filter</h4>
            <p className="text-[10px] text-slate-500">Noise reduction across sliding window.</p>
          </div>
          <div className="text-slate-600">→</div>
          <div className={`flex-1 rounded-xl border p-5 flex flex-col items-center text-center justify-center h-full transition-colors ${isBreached ? 'bg-red-950/20 border-red-500/50' : 'bg-[#03050a] border-slate-800'}`}>
            <ShieldAlert size={24} className={isBreached ? 'text-red-500 mb-3 animate-bounce' : 'text-slate-600 mb-3'} />
            <h4 className={`text-xs font-bold mb-1 ${isBreached ? 'text-red-500' : 'text-slate-400'}`}>3. Anomaly Engine</h4>
            <p className="text-[10px] text-slate-500">{isBreached ? 'Threshold breach detected. Threat score updated.' : 'Awaiting anomaly trigger...'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}