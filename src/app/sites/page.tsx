"use client";

import { useTelemetry } from "../../hooks/useTelemetry";
import { Radio, AlertTriangle, ShieldCheck, Activity } from "lucide-react";
import { useEffect, useState } from "react";

export default function TowerSitesPage() {
  const { data, lastTelemetryTime } = useTelemetry();
  const [syncTime, setSyncTime] = useState<string>("--:--:--");

  // Formats the live timestamp from the hardware polling
  useEffect(() => {
    if (lastTelemetryTime) {
      const d = new Date(lastTelemetryTime);
      setSyncTime(d.toLocaleTimeString());
    }
  }, [lastTelemetryTime]);

  const isBreached = data.state === "BREACHED";
  const displayClearance = data.distance === 999 ? "--" : data.distance;

  return (
    <div className="p-6 md:p-8 w-full flex flex-col gap-6 min-h-[calc(100vh-3.5rem)]">
      
      {/* HEADER */}
      <div className="flex justify-between items-center border-b border-noc-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1.5 tracking-tight">Infrastructure / Tower Sites</h1>
          <p className="text-slate-400 text-xs">Real-time status and spatial clearance of all deployed edge nodes.</p>
        </div>
        <div className="flex items-center gap-2 bg-noc-800 border border-noc-700 text-slate-300 px-4 py-2 rounded-lg text-xs font-semibold shadow-sm">
          <Activity size={14} className="text-[#00e5ff]" /> 
          {isBreached ? "Active Incidents: 1" : "Grid Normal"}
        </div>
      </div>

      {/* DATA TABLE */}
      <div className="bg-noc-900 rounded-xl border border-noc-800 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            
            {/* TABLE HEADER */}
            <thead>
              <tr className="bg-[#050914] border-b border-noc-800 text-[10px] text-slate-400 uppercase tracking-widest">
                <th className="px-6 py-4 font-bold">Node ID</th>
                <th className="px-6 py-4 font-bold">Clearance</th>
                <th className="px-6 py-4 font-bold">Hardware Temp</th>
                <th className="px-6 py-4 font-bold">AI Status</th>
                <th className="px-6 py-4 font-bold text-right">Last Sync</th>
              </tr>
            </thead>
            
            {/* TABLE BODY */}
            <tbody className="text-xs text-slate-300">
              
              {/* LIVE HARDWARE NODE (CT-004) */}
              <tr className={`border-b border-noc-800/50 hover:bg-noc-800/30 transition-colors ${isBreached ? 'bg-red-950/20' : ''}`}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-md ${isBreached ? 'bg-red-500/20 text-red-500 animate-pulse' : 'bg-cyan-500/10 text-[#00e5ff]'}`}>
                      <Radio size={16} />
                    </div>
                    <div>
                      <p className="font-bold text-white text-[13px]">CAB-ALPHA (CT-004)</p>
                      <p className="text-[10px] text-slate-500">Chennai Central Sector (Live)</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-mono">
                  <span className={`font-bold text-sm ${isBreached ? 'text-red-500' : 'text-[#00e5ff]'}`}>
                    {displayClearance} <span className="text-[10px] text-slate-500 ml-0.5 font-sans font-medium">cm</span>
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-300 font-medium">42°C</td>
                <td className="px-6 py-4">
                  {isBreached ? (
                    <span className="inline-flex items-center gap-1.5 bg-red-500/20 text-red-400 border border-red-500/50 px-2 py-1 rounded text-[10px] font-bold tracking-wider">
                      <AlertTriangle size={12} /> LOCKED (BREACH)
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 bg-green-500/20 text-green-400 border border-green-500/50 px-2 py-1 rounded text-[10px] font-bold tracking-wider">
                      <ShieldCheck size={12} /> SECURE
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right font-mono text-[10px] text-slate-400">
                  {syncTime}
                </td>
              </tr>

              {/* SECONDARY NODE (CT-005) */}
              <tr className="border-b border-noc-800/50 hover:bg-noc-800/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-md bg-slate-800/50 text-slate-400">
                      <Radio size={16} />
                    </div>
                    <div>
                      <p className="font-bold text-white text-[13px]">CAB-BETA (CT-005)</p>
                      <p className="text-[10px] text-slate-500">Guindy Industrial Corridor</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-mono">
                  <span className="font-bold text-sm text-slate-300">
                    78 <span className="text-[10px] text-slate-500 ml-0.5 font-sans font-medium">cm</span>
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-300 font-medium">38°C</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 bg-green-500/10 text-green-500 border border-green-500/20 px-2 py-1 rounded text-[10px] font-bold tracking-wider">
                    <ShieldCheck size={12} /> SECURE
                  </span>
                </td>
                <td className="px-6 py-4 text-right font-mono text-[10px] text-slate-500">
                  9:30:41 PM
                </td>
              </tr>
              
              {/* TERTIARY NODE (CT-006) */}
              <tr className="border-b border-transparent hover:bg-noc-800/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-md bg-slate-800/50 text-slate-400">
                      <Radio size={16} />
                    </div>
                    <div>
                      <p className="font-bold text-white text-[13px]">CAB-GAMMA (CT-006)</p>
                      <p className="text-[10px] text-slate-500">Tambaram Transit Hub</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-mono">
                  <span className="font-bold text-sm text-slate-300">
                    92 <span className="text-[10px] text-slate-500 ml-0.5 font-sans font-medium">cm</span>
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-300 font-medium">39°C</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 bg-green-500/10 text-green-500 border border-green-500/20 px-2 py-1 rounded text-[10px] font-bold tracking-wider">
                    <ShieldCheck size={12} /> SECURE
                  </span>
                </td>
                <td className="px-6 py-4 text-right font-mono text-[10px] text-slate-500">
                  9:30:41 PM
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}