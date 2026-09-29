"use client";

import { useTelemetry } from "../../hooks/useTelemetry";
import { FileText, Download, Activity, ShieldAlert, ShieldCheck } from "lucide-react";

export default function ReportsPage() {
  const { data } = useTelemetry();
  
  // Dynamically analyze the live hardware session log
  const isBreached = data.state === "BREACHED";
  const incidentCount = data.auditLog ? data.auditLog.filter((log: string) => log.includes("CRITICAL") || log.includes("BREACH")).length : 0;
  
  const liveSessionId = `SESSION-${new Date().toISOString().split('T')[1].substring(0,5).replace(/:/g, '')}`;

  const historicalReports = [
    { id: "REP-2026-09", title: "Monthly Fleet Security & Telemetry Summary", date: "Sept 14, 2026", type: "PDF / CSV" },
    { id: "REP-2026-08", title: "ESP32 & Arduino Hardware Diagnostic Report", date: "Aug 31, 2026", type: "PDF" },
    { id: "REP-2026-07", title: "Intrusion Incident & Response Audit Log", date: "July 31, 2026", type: "CSV" },
  ];

  return (
    <div className="p-6 md:p-8 w-full flex flex-col gap-5 h-[calc(100vh-3.5rem)] bg-[#020617] overflow-hidden">
      
      {/* HEADER */}
      <div className="flex justify-between items-center border-b border-slate-800 pb-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1.5 tracking-tight">Analytics & Compliance Reports</h1>
          <p className="text-slate-400 text-xs">Generate and download official telecommunication security reports</p>
        </div>
        <button className="bg-[#00e5ff] hover:bg-cyan-300 text-[#020617] font-bold px-4 py-2.5 rounded-lg text-xs flex items-center gap-2 transition shadow-[0_0_15px_rgba(0,229,255,0.2)] hover:scale-[1.02]">
          <Download size={14} /> GENERATE NEW REPORT
        </button>
      </div>

      {/* SCROLLABLE REPORTS LIST */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 flex flex-col gap-4">
        
        <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest shrink-0 mt-2">LIVE HARDWARE SESSION</h2>
        
        {/* DYNAMIC LIVE SESSION REPORT */}
        <div className={`rounded-xl p-5 border flex justify-between items-center transition shadow-md shrink-0 ${isBreached || incidentCount > 0 ? 'bg-red-950/10 border-red-500/30' : 'bg-[#00e5ff]/5 border-[#00e5ff]/30'}`}>
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg border ${isBreached || incidentCount > 0 ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-[#00e5ff]/10 border-[#00e5ff]/20 text-[#00e5ff]'}`}>
              <Activity size={20} strokeWidth={2} />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-1">
                <p className={`text-[9px] font-bold uppercase tracking-wider ${isBreached || incidentCount > 0 ? 'text-red-400' : 'text-[#00e5ff]'}`}>{liveSessionId}</p>
                <span className="text-[9px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">JUST NOW</span>
              </div>
              <h3 className="text-sm font-bold text-white mb-1">Live Hardware Telemetry & Event Audit</h3>
              <p className="text-[11px] text-slate-400 flex items-center gap-2">
                {incidentCount > 0 ? (
                  <span className="flex items-center gap-1 text-red-400 font-bold"><ShieldAlert size={12}/> {incidentCount} Incidents Logged</span>
                ) : (
                  <span className="flex items-center gap-1 text-green-400 font-bold"><ShieldCheck size={12}/> Clean Acoustic Baseline</span>
                )}
                <span className="text-slate-600">|</span> 
                <span className="font-mono text-slate-500">JSON / CSV</span>
              </p>
            </div>
          </div>
          <button className={`bg-transparent font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-2 transition hover:underline ${isBreached || incidentCount > 0 ? 'text-red-400' : 'text-[#00e5ff]'}`}>
            <Download size={14} /> Export Session
          </button>
        </div>

        <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest shrink-0 mt-4">HISTORICAL ARCHIVE</h2>

        {/* HISTORICAL STATIC REPORTS */}
        {historicalReports.map((r, i) => (
          <div key={i} className="bg-[#070b14] rounded-xl p-5 border border-slate-800 flex justify-between items-center hover:border-slate-700 transition shadow-sm shrink-0">
            <div className="flex items-center gap-4">
              <div className="bg-[#03050a] p-3 rounded-lg border border-slate-800 text-slate-400">
                <FileText size={20} strokeWidth={1.5} />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">{r.id}</p>
                <h3 className="text-sm font-bold text-white mb-1">{r.title}</h3>
                <p className="text-[11px] text-slate-400 flex items-center gap-2">
                  <span className="border border-slate-800 bg-[#03050a] px-1.5 py-0.5 rounded">{r.date}</span> 
                  <span className="font-mono text-slate-500">{r.type}</span>
                </p>
              </div>
            </div>
            <button className="bg-transparent text-slate-400 font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-2 transition hover:text-white hover:bg-slate-800/50">
              <Download size={14} /> Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}