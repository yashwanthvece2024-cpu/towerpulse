"use client";
import { History, ShieldAlert, CheckCircle2, Lock, Terminal } from 'lucide-react';

export default function AuditLogsPage() {
  const logs = [
    { time: '14:32:17 UTC', node: 'ESP32-GW-01', event: 'Intrusion alert received from HC-SR04 (Distance: 74cm).', type: 'CRITICAL', color: 'text-red-400 bg-red-950/40 border-red-800' },
    { time: '14:32:17 UTC', node: 'ARD-UNO-04', event: 'Closed-loop actuation command dispatched: SG90 Servo Locked.', type: 'ACTION', color: 'text-emerald-400 bg-emerald-950/40 border-emerald-800' },
    { time: '12:00:00 UTC', node: 'FLEET-MANAGER', event: 'Routine cryptographic heartbeat verified across 128 active nodes.', type: 'INFO', color: 'text-cyan-400 bg-cyan-950/40 border-cyan-800' },
    { time: '08:00:00 UTC', node: 'ESP32-GW-01', event: 'Moving average filter recalibrated (Window size N=5).', type: 'SYSTEM', color: 'text-slate-300 bg-slate-900 border-slate-700' },
  ];

  return (
    <div className="space-y-6 pb-12">
      <header className="bg-[#111c3a] border border-[#1e293b] p-6 rounded-xl shadow-xl flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-white">System Audit Logs</h1>
          <p className="text-sm text-slate-300 mt-1">Immutable event stream and hardware command history</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/50 px-3 py-1.5 rounded-lg border border-emerald-800">
          <Terminal size={14} /> Live Stream Connected
        </div>
      </header>

      <div className="bg-[#111c3a] border border-[#1e293b] rounded-xl p-6 shadow-xl">
        <div className="space-y-3 font-mono text-xs">
          {logs.map((log, index) => (
            <div key={index} className="bg-[#090d16] border border-[#1e293b] p-4 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-slate-500">{log.time}</span>
                <span className="text-cyan-400 font-bold">[{log.node}]</span>
                <span className="text-slate-200">{log.event}</span>
              </div>
              <span className={`px-2.5 py-1 rounded border font-bold text-[10px] ${log.color}`}>
                {log.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}