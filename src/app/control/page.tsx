"use client";
import { Terminal, Lock, Unlock, Zap, RefreshCcw } from 'lucide-react';

export default function RemoteControlPage() {
  return (
    <div className="space-y-6 pb-12">
      <header className="bg-[#111c3a] border border-[#1e293b] p-6 rounded-xl shadow-xl">
        <h1 className="text-3xl font-extrabold text-white">Remote Actuation & Control</h1>
        <p className="text-sm text-slate-300 mt-1">Manual overrides and hardware command interface</p>
      </header>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-[#111c3a] border border-[#1e293b] rounded-xl p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Cabinet Lock Override</h3>
          <p className="text-xs text-slate-400">Manually engage or disengage the SG90 servo motor locking mechanism.</p>
          <div className="flex gap-4 pt-2">
            <button className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-2">
              <Lock size={16} /> ENGAGE LOCK
            </button>
            <button className="flex-1 py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-2">
              <Unlock size={16} /> DISENGAGE
            </button>
          </div>
        </div>

        <div className="bg-[#111c3a] border border-[#1e293b] rounded-xl p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">System Diagnostics</h3>
          <p className="text-xs text-slate-400">Trigger hardware re-calibration and sensor reboot.</p>
          <div className="flex gap-4 pt-2">
            <button className="flex-1 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-2">
              <RefreshCcw size={16} /> REBOOT SENSORS
            </button>
            <button className="flex-1 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-2">
              <Zap size={16} /> TEST BUZZER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}