"use client";

import { useTelemetry } from "../../hooks/useTelemetry";
import { AlertTriangle, ShieldCheck } from "lucide-react";

export default function AlertsPage() {
  const { data } = useTelemetry();
  
  // Filter and format the raw audit log from the hardware for the UI table
  const incidentLogs = data.auditLog ? [...data.auditLog].reverse().filter(log => log.includes("CRITICAL") || log.includes("BREACH") || log.includes("Admin")) : [];

  return (
    <div className="p-6 md:p-8 w-full flex flex-col gap-6 min-h-[calc(100vh-3.5rem)] bg-[#020617]">
      <div className="border-b border-slate-800 pb-4 shrink-0">
        <h1 className="text-2xl font-bold text-white mb-1.5 tracking-tight">Alerts & Security Incidents</h1>
        <p className="text-slate-400 text-xs">Active and historical breach logs across all telecom sites</p>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
        {incidentLogs.length > 0 ? (
          incidentLogs.map((log: string, index: number) => {
            const isCritical = log.includes("CRITICAL") || log.includes("BREACH");
            return (
              <div key={index} className={`rounded-xl p-5 border flex items-center gap-5 shadow-md ${isCritical ? 'bg-red-950/10 border-red-500/30' : 'bg-[#070b14] border-slate-800'}`}>
                <div className={`p-3 rounded-lg border ${isCritical ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-[#00e5ff]/10 border-[#00e5ff]/20 text-[#00e5ff]'}`}>
                  {isCritical ? <AlertTriangle size={24} /> : <ShieldCheck size={24} />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded tracking-wider ${isCritical ? 'bg-red-500 text-white' : 'bg-[#00e5ff] text-[#020617]'}`}>
                      {isCritical ? 'CRITICAL' : 'SYSTEM OVERRIDE'}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">CT-004 (Chennai)</span>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">{isCritical ? 'Unauthorized Cabinet Access' : 'Admin Hardware Override'}</h3>
                  <p className="text-xs text-slate-400">{log}</p>
                </div>
                <div className="text-xs font-mono text-slate-500 text-right">
                  {new Date().toISOString().split('T')[1].substring(0,8)} UTC
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-[#070b14] rounded-xl p-10 border border-slate-800 flex flex-col items-center justify-center text-center h-full">
            <ShieldCheck size={48} className="text-slate-700 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">No Incidents Logged</h3>
            <p className="text-sm text-slate-400">All edge nodes are reporting normal acoustic baselines.</p>
          </div>
        )}
      </div>
    </div>
  );
}