"use client";

import { useTelemetry } from "../../hooks/useTelemetry";
import { Lock, Unlock, RefreshCw, Zap } from "lucide-react";

export default function RemoteControl() {
  const { adminOpenDoor, adminCloseDoor, rebootSensors, testBuzzer } = useTelemetry();

  return (
    <div className="p-6 md:p-8 w-full flex flex-col gap-6 min-h-[calc(100vh-3.5rem)] bg-[#020617]">
      <div className="border-b border-slate-800 pb-4 bg-[#070b14] p-6 rounded-xl border shadow-xl shrink-0">
        <h1 className="text-2xl font-bold text-white mb-1.5 tracking-tight">Remote Actuation & Control</h1>
        <p className="text-slate-400 text-xs">Manual overrides and hardware command interface</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
        
        {/* CABINET LOCK */}
        <div className="bg-[#070b14] rounded-xl p-6 border border-slate-800 shadow-xl flex flex-col justify-between max-h-[220px]">
          <div>
            <h3 className="text-xs font-bold text-white mb-2 uppercase tracking-wider">CABINET LOCK OVERRIDE</h3>
            <p className="text-slate-400 text-xs">Manually engage or disengage the SG90 servo motor locking mechanism.</p>
          </div>
          <div className="flex gap-4 mt-6">
            <button onClick={adminCloseDoor} className="flex-1 py-3 px-4 text-xs font-bold rounded-lg flex items-center justify-center gap-2 bg-[#10b981] hover:bg-emerald-400 text-white transition shadow-lg hover:scale-[1.02]">
              <Lock size={16} /> ENGAGE LOCK
            </button>
            <button onClick={adminOpenDoor} className="flex-1 py-3 px-4 text-xs font-bold rounded-lg flex items-center justify-center gap-2 bg-[#ef4444] hover:bg-red-500 text-white transition shadow-lg hover:scale-[1.02]">
              <Unlock size={16} /> DISENGAGE
            </button>
          </div>
        </div>

        {/* SYSTEM DIAGNOSTICS */}
        <div className="bg-[#070b14] rounded-xl p-6 border border-slate-800 shadow-xl flex flex-col justify-between max-h-[220px]">
          <div>
            <h3 className="text-xs font-bold text-white mb-2 uppercase tracking-wider">SYSTEM DIAGNOSTICS</h3>
            <p className="text-slate-400 text-xs">Trigger hardware re-calibration and sensor reboot.</p>
          </div>
          <div className="flex gap-4 mt-6">
            <button onClick={rebootSensors} className="flex-1 py-3 px-4 text-xs font-bold rounded-lg bg-[#00e5ff] hover:bg-cyan-300 text-[#020617] flex items-center justify-center gap-2 transition shadow-lg hover:scale-[1.02]">
              <RefreshCw size={16} /> REBOOT SENSORS
            </button>
            <button onClick={testBuzzer} className="flex-1 py-3 px-4 text-xs font-bold rounded-lg bg-[#f59e0b] hover:bg-amber-400 text-white flex items-center justify-center gap-2 transition shadow-lg hover:scale-[1.02]">
              <Zap size={16} /> TEST BUZZER
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
}