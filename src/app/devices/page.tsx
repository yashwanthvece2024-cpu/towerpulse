"use client";

import { useTelemetry } from "@/hooks/useTelemetry";
import { Cpu, Wifi, HardDrive, ShieldAlert, Zap, Terminal, Activity } from "lucide-react";

export default function DeviceManagement() {
  const { distance, status, logMessage } = useTelemetry();
  const isBreached = status === "CRITICAL";

  return (
    <div className="min-h-screen p-8 bg-slate-950 text-slate-300">
      <div className="mb-8 border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <HardDrive className="text-blue-500" /> Edge Device Management
        </h1>
        <p className="text-slate-400 mt-2">Hardware diagnostics and microcontroller health</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* ARDUINO UNO NODE */}
        <div className={`bg-slate-900 rounded-xl p-6 border transition-colors duration-300 ${isBreached ? 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'border-slate-800'}`}>
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <Cpu className="text-blue-400" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Arduino Uno (Sensor Node)</h2>
                <p className="text-sm text-slate-500">Firmware: v2.1 (DSP Active)</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-green-500/10 text-green-500 text-xs font-bold rounded border border-green-500/20">
              ONLINE
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between p-3 bg-slate-950 rounded border border-slate-800">
              <span className="text-slate-400 flex items-center gap-2"><Activity size={16}/> Ultrasonic Distance</span>
              <span className={`font-mono font-bold ${isBreached ? 'text-red-400 animate-pulse' : 'text-blue-400'}`}>
                {distance} cm
              </span>
            </div>
            <div className="flex justify-between p-3 bg-slate-950 rounded border border-slate-800">
              <span className="text-slate-400 flex items-center gap-2"><Zap size={16}/> SG90 Servo Actuator</span>
              <span className={`font-mono font-bold ${isBreached ? 'text-red-400' : 'text-green-400'}`}>
                {isBreached ? 'POS: 90° (LOCKED)' : 'POS: 0° (STANDBY)'}
              </span>
            </div>
            <div className="flex justify-between p-3 bg-slate-950 rounded border border-slate-800">
              <span className="text-slate-400 flex items-center gap-2"><Terminal size={16}/> Filter Algorithm</span>
              <span className="font-mono text-slate-300">Exp. Moving Average</span>
            </div>
          </div>
        </div>

        {/* ESP32 GATEWAY */}
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <Wifi className="text-purple-400" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">ESP32 (Network Gateway)</h2>
                <p className="text-sm text-slate-500">Node ID: CT-004</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-green-500/10 text-green-500 text-xs font-bold rounded border border-green-500/20">
              ONLINE
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between p-3 bg-slate-950 rounded border border-slate-800">
              <span className="text-slate-400 flex items-center gap-2"><Wifi size={16}/> Network Link</span>
              <span className="font-mono text-green-400 font-bold">2.4GHz Wi-Fi</span>
            </div>
            <div className="flex justify-between p-3 bg-slate-950 rounded border border-slate-800">
              <span className="text-slate-400 flex items-center gap-2"><HardDrive size={16}/> UART Serial Bridge</span>
              <span className={`font-mono ${isBreached ? 'text-red-400 animate-pulse' : 'text-blue-400'}`}>
                Active (115200 baud)
              </span>
            </div>
            <div className="flex justify-between p-3 bg-slate-950 rounded border border-slate-800">
              <span className="text-slate-400 flex items-center gap-2"><ShieldAlert size={16}/> API Status</span>
              <span className="font-mono text-slate-300">Connected to Next.js</span>
            </div>
          </div>
        </div>

        {/* SYSTEM AUDIT LOG */}
        <div className="col-span-1 lg:col-span-2 bg-slate-900 rounded-xl p-6 border border-slate-800 mt-4">
          <h3 className="text-lg font-bold text-white mb-4">Live System Event Log</h3>
          <div className="bg-black p-4 rounded-lg font-mono text-sm border border-slate-800">
             <div className="text-slate-500 mb-1">{`[SYSTEM] Connecting to remote nodes...`}</div>
             <div className="text-slate-500 mb-1">{`[ESP32] Hardware handshake established.`}</div>
             <div className={isBreached ? 'text-red-400 font-bold mt-2' : 'text-green-400 mt-2'}>
               {`[AI_EVALUATION] ${logMessage}`}
             </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}