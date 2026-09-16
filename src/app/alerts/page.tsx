"use client";
import { ShieldAlert, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function AlertsPage() {
  return (
    <div className="space-y-6 pb-12">
      <header className="bg-[#111c3a] border border-[#1e293b] p-6 rounded-xl shadow-xl">
        <h1 className="text-3xl font-extrabold text-white">Alerts & Security Incidents</h1>
        <p className="text-sm text-slate-300 mt-1">Active and historical breach logs across all telecom sites</p>
      </header>

      <div className="bg-[#111c3a] border border-[#1e293b] rounded-xl p-6 shadow-xl">
        <div className="space-y-4">
          <div className="bg-[#090d16] border border-red-900/60 p-5 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-950/50 rounded-xl border border-red-800 text-red-500">
                <ShieldAlert size={28} />
              </div>
              <div>
                <span className="text-[10px] font-bold text-red-400 bg-red-950 px-2 py-0.5 rounded border border-red-800">CRITICAL</span>
                <h3 className="text-base font-bold text-white mt-1">Unauthorized Cabinet Access at CT-004 (Chennai)</h3>
                <p className="text-xs text-slate-400 mt-0.5">Ultrasonic distance jumped from 42cm to 74cm. Servo locked automatically.</p>
              </div>
            </div>
            <span className="text-xs font-mono text-slate-400">14:32:17 UTC</span>
          </div>

          <div className="bg-[#090d16] border border-amber-900/60 p-5 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-950/50 rounded-xl border border-amber-800 text-amber-500">
                <AlertTriangle size={28} />
              </div>
              <div>
                <span className="text-[10px] font-bold text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">WARNING</span>
                <h3 className="text-base font-bold text-white mt-1">Signal Fluctuation Detected at CT-003 (Bangalore)</h3>
                <p className="text-xs text-slate-400 mt-0.5">Minor acoustic noise anomaly in ultrasonic sensor array.</p>
              </div>
            </div>
            <span className="text-xs font-mono text-slate-400">12:15:00 UTC</span>
          </div>
        </div>
      </div>
    </div>
  );
}