"use client";

import { useTelemetry } from "../../hooks/useTelemetry";
import { ShieldAlert, Unlock, Lock, Activity, Server } from "lucide-react";

export default function CabinetSecurityPage() {
  const { data } = useTelemetry();
  
  // Real-time hardware states
  const isBreached = data.state === "BREACHED";
  const isOpen = data.state === "OPEN";
  const displayDistance = data.distance === 999 ? "--" : data.distance;

  // Dynamic lock state formatter for the live cabinet
  const getLockState = () => {
    if (isBreached) return { text: "UNLOCKED (BREACH)", icon: <Unlock size={14} />, color: "text-red-500" };
    if (isOpen) return { text: "DISENGAGED (ADMIN)", icon: <Unlock size={14} />, color: "text-[#00e5ff]" };
    return { text: "LOCKED & SECURED", icon: <Lock size={14} />, color: "text-green-400" };
  };

  const lockStatus = getLockState();

  return (
    <div className="p-6 md:p-8 w-full flex flex-col gap-5 h-[calc(100vh-3.5rem)] bg-[#020617] overflow-hidden">
      
      {/* HEADER */}
      <div className="flex justify-between items-center border-b border-slate-800 pb-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1.5 tracking-tight">Cabinet Security</h1>
          <p className="text-slate-400 text-xs">Real-time cabinet status and multi-node physical security monitoring</p>
        </div>
        <div className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors shadow-lg border ${isBreached ? 'bg-red-950/40 text-red-500 border-red-500/50 animate-pulse' : 'bg-green-950/20 text-green-500 border-green-500/30'}`}>
          {isBreached ? "BREACH DETECTED" : "SYSTEM SECURE"}
        </div>
      </div>

      {/* SCROLLABLE CONTENT AREA */}
      <div className="flex flex-col flex-1 min-h-0 gap-6 overflow-y-auto custom-scrollbar pr-2 pb-4">
        
        {/* LIVE HARDWARE TELEMETRY STREAM (CT-004) */}
        <div className="bg-[#070b14] rounded-xl p-6 border border-slate-800 shadow-xl flex flex-col shrink-0">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <Activity size={16} className="text-[#00e5ff]" /> LIVE HARDWARE TELEMETRY STREAM
            </h3>
            <span className="text-[9px] bg-[#00e5ff]/10 text-[#00e5ff] px-2 py-1 rounded border border-[#00e5ff]/30 font-bold tracking-wider">
              ACTIVE SENSOR NODE (CT-004)
            </span>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            <div className="bg-[#03050a] rounded-lg border border-slate-800 p-4 flex flex-col justify-center">
              <p className="text-[10px] text-slate-500 mb-1">Raw Distance (HC-SR04)</p>
              <div className={`text-2xl font-black ${isBreached ? 'text-red-500' : 'text-[#00e5ff]'}`}>
                {displayDistance} <span className="text-xs font-bold text-slate-500">cm</span>
              </div>
            </div>
            <div className="bg-[#03050a] rounded-lg border border-slate-800 p-4 flex flex-col justify-center">
              <p className="text-[10px] text-slate-500 mb-1">Filtered Distance (DSP)</p>
              <div className={`text-2xl font-black ${isBreached ? 'text-red-400' : 'text-cyan-400'}`}>
                {displayDistance} <span className="text-xs font-bold text-slate-500">cm</span>
              </div>
            </div>
            <div className="bg-[#03050a] rounded-lg border border-slate-800 p-4 flex flex-col justify-center">
              <p className="text-[10px] text-slate-500 mb-1">Internal Temp</p>
              <div className="text-2xl font-black text-amber-400">
                42.1 <span className="text-xs font-bold text-slate-500">°C</span>
              </div>
            </div>
            <div className="bg-[#03050a] rounded-lg border border-slate-800 p-4 flex flex-col justify-center">
              <p className="text-[10px] text-slate-500 mb-1">ESP32 Gateway</p>
              <div className="text-sm font-black text-green-400 flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> ONLINE
              </div>
            </div>
          </div>

          <div className={`rounded-lg p-3.5 flex items-center gap-3 border text-xs font-bold ${isBreached ? 'bg-red-950/30 border-red-500/50 text-red-400' : 'bg-slate-900/50 border-slate-700 text-slate-400'}`}>
            <ShieldAlert size={16} className={isBreached ? 'text-red-500 animate-bounce' : 'text-slate-500'} />
            {isBreached 
              ? `Security Policy Triggered: Distance delta > 30cm from baseline. Automatic lockdown initiated.` 
              : `Security Policy Active: Monitoring acoustic baseline. System nominal.`}
          </div>
        </div>

        {/* MULTI-CABINET FLEET STATUS */}
        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest shrink-0 mt-2">CABINET FLEET STATUS</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 shrink-0">
          
          {/* CAB-ALPHA (LIVE HARDWARE) */}
          <div className={`rounded-xl p-5 border shadow-xl flex flex-col ${isBreached ? 'bg-red-950/10 border-red-500/40' : 'bg-[#070b14] border-[#00e5ff]/40'}`}>
            <div className="flex justify-between items-center mb-5">
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${isBreached ? 'bg-red-500/20 text-red-500 border-red-500/40' : 'bg-[#00e5ff]/10 text-[#00e5ff] border-[#00e5ff]/30'}`}>
                {isBreached ? 'THREAT DETECTED' : 'SECURE (LIVE)'}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">CT-004</span>
            </div>
            
            <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2"><Server size={14} className="text-slate-400"/> Baseband Cabinet A</h3>
            <p className="text-[11px] text-slate-500 mb-5">Chennai Central Sector (Active Node)</p>

            <div className="bg-[#03050a] rounded-lg border border-slate-800 p-4 space-y-3.5 mt-auto">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Lock State:</span>
                <span className={`font-bold flex items-center gap-1.5 ${lockStatus.color}`}>
                  {lockStatus.icon} {lockStatus.text}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Deadbolt:</span>
                <span className={`font-bold ${isOpen ? 'text-amber-400' : 'text-green-400'}`}>
                  {isOpen ? 'DISENGAGED' : 'ENGAGED'}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Buzzer Alarm:</span>
                <span className={`font-bold ${isBreached ? 'text-red-500 animate-pulse' : 'text-slate-500'}`}>
                  {isBreached ? 'ACTIVE (PIN 8)' : 'SILENT'}
                </span>
              </div>
            </div>
          </div>

          {/* CAB-BETA (SIMULATED / SAFE) */}
          <div className="bg-[#070b14] rounded-xl p-5 border border-slate-800 shadow-xl flex flex-col opacity-90">
            <div className="flex justify-between items-center mb-5">
              <span className="text-[9px] font-bold px-2 py-0.5 rounded border bg-green-500/10 text-green-400 border-green-500/30 uppercase tracking-wider">
                SECURE
              </span>
              <span className="text-[10px] text-slate-500 font-mono">CT-005</span>
            </div>
            
            <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2"><Server size={14} className="text-slate-400"/> Baseband Cabinet B</h3>
            <p className="text-[11px] text-slate-500 mb-5">Guindy Industrial Corridor</p>

            <div className="bg-[#03050a] rounded-lg border border-slate-800 p-4 space-y-3.5 mt-auto">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Lock State:</span>
                <span className="font-bold flex items-center gap-1.5 text-green-400">
                  <Lock size={14} /> LOCKED & SECURED
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Deadbolt:</span>
                <span className="font-bold text-green-400">ENGAGED</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Buzzer Alarm:</span>
                <span className="font-bold text-slate-500">SILENT</span>
              </div>
            </div>
          </div>

          {/* CAB-GAMMA (SIMULATED / SAFE) */}
          <div className="bg-[#070b14] rounded-xl p-5 border border-slate-800 shadow-xl flex flex-col opacity-90">
            <div className="flex justify-between items-center mb-5">
              <span className="text-[9px] font-bold px-2 py-0.5 rounded border bg-green-500/10 text-green-400 border-green-500/30 uppercase tracking-wider">
                SECURE
              </span>
              <span className="text-[10px] text-slate-500 font-mono">CT-006</span>
            </div>
            
            <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2"><Server size={14} className="text-slate-400"/> Baseband Cabinet C</h3>
            <p className="text-[11px] text-slate-500 mb-5">Tambaram Transit Hub</p>

            <div className="bg-[#03050a] rounded-lg border border-slate-800 p-4 space-y-3.5 mt-auto">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Lock State:</span>
                <span className="font-bold flex items-center gap-1.5 text-green-400">
                  <Lock size={14} /> LOCKED & SECURED
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Deadbolt:</span>
                <span className="font-bold text-green-400">ENGAGED</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Buzzer Alarm:</span>
                <span className="font-bold text-slate-500">SILENT</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}