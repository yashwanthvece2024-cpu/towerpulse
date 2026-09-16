"use client";
import { FileText, Download, ShieldCheck, AlertTriangle, Calendar } from 'lucide-react';

export default function ReportsPage() {
  const reports = [
    { id: 'REP-2026-09', title: 'Monthly Fleet Security & Telemetry Summary', date: 'Sept 14, 2026', type: 'PDF / CSV', status: 'Ready' },
    { id: 'REP-2026-08', title: 'ESP32 & Arduino Hardware Diagnostic Report', date: 'Aug 31, 2026', type: 'PDF', status: 'Archived' },
    { id: 'REP-2026-07', title: 'Intrusion Incident & Response Audit Log', date: 'July 31, 2026', type: 'CSV', status: 'Archived' },
  ];

  return (
    <div className="space-y-6 pb-12">
      <header className="bg-[#111c3a] border border-[#1e293b] p-6 rounded-xl shadow-xl flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Analytics & Compliance Reports</h1>
          <p className="text-sm text-slate-300 mt-1">Generate and download official telecommunication security reports</p>
        </div>
        <button className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-lg flex items-center gap-2 transition-colors">
          <Download size={16} /> Generate New Report
        </button>
      </header>

      <div className="bg-[#111c3a] border border-[#1e293b] rounded-xl p-6 shadow-xl">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4">Available System Reports</h3>
        <div className="space-y-3">
          {reports.map((rep) => (
            <div key={rep.id} className="bg-[#090d16] border border-[#1e293b] p-4 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-cyan-950/50 rounded-xl border border-cyan-800 text-cyan-400">
                  <FileText size={24} />
                </div>
                <div>
                  <span className="text-xs font-mono text-cyan-400">{rep.id}</span>
                  <h4 className="text-base font-bold text-white mt-0.5">{rep.title}</h4>
                  <p className="text-xs text-slate-400 flex items-center gap-2 mt-1">
                    <Calendar size={12} /> {rep.date} • <span className="font-mono">{rep.type}</span>
                  </p>
                </div>
              </div>
              <button className="px-4 py-2 bg-[#1e293b] hover:bg-slate-700 text-cyan-400 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors">
                <Download size={14} /> Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}