"use client";
import { useState } from 'react';
import { useTowerStore } from '@/store/useTowerStore';
import { ShieldAlert, Lock, Unlock, Bell, Cpu, Thermometer, Activity, Zap } from 'lucide-react';

export default function CabinetSecurityPage() {
  const { towers, triggerSecurityIncident } = useTowerStore();
  const tower = towers['CAB-ALPHA'] || { id: 'CT-004', name: 'Chennai Central', status: 'CRITICAL', temperature: 42, servoState: 'UNLOCKED' };

  const [buzzerActive, setBuzzerActive] = useState(true);

  return (
    <div className="space-y-6 flex flex-col h-full text-slate-200">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-white">Cabinet Security</h1>
          <p className="text-xs text-slate-400 mt-1">Real-time cabinet status and physical security monitoring (ESP32 / HC-SR04 telemetry)</p>
        </div>
        <button 
          onClick={() => triggerSecurityIncident('CAB-ALPHA')}
          className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded shadow-lg flex items-center gap-2 transition-all animate-pulse"
        >
          <Zap size={14} /> SIMULATE BREACH EVENT
        </button>
      </header>

      {/* Main Status Row */}
      <div className="grid grid-cols-3 gap-6">
        
        {/* Cabinet Info Card */}
        <div className="bg-[#111c3a] border border-[#1e293b] rounded-lg p-5 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-bold text-red-400 bg-red-950/60 px-2 py-1 rounded border border-red-800">THREAT DETECTED</span>
              <span className="text-xs font-mono text-slate-400">Cell Tower: CT-004</span>
            </div>
            <h2 className="text-lg font-bold text-white mb-2">Baseband Cabinet A</h2>
            <p className="text-xs text-slate-400 mb-6">Ultrasonic proximity monitoring active on Arduino Uno UART gateway.</p>
          </div>

          <div className="space-y-3 bg-[#090d16] p-4 rounded border border-[#1e293b] text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Door Lock State:</span>
              <span className="text-red-400 font-bold flex items-center gap-1"><Unlock size={12}/> UNLOCKED</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Secondary Deadbolt:</span>
              <span className="text-emerald-400 font-bold">ENGAGED</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Buzzer Alarm:</span>
              <span className="text-amber-400 font-bold animate-pulse">ACTIVE (PIN 8)</span>
            </div>
          </div>
        </div>

        {/* Live Sensor Readings */}
        <div className="bg-[#111c3a] border border-[#1e293b] rounded-lg p-5 shadow-xl col-span-2 flex flex-col justify-between">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4">Live Hardware Telemetry Stream</h3>
          
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-[#090d16] p-4 rounded border border-[#1e293b]">
              <span className="text-[10px] text-slate-400 block mb-1">Raw Distance (HC-SR04)</span>
              <span className="text-2xl font-mono font-bold text-red-400">74.2 <span className="text-xs">cm</span></span>
              <span className="text-[9px] text-red-500 block mt-1">▲ Threshold Exceeded</span>
            </div>
            <div className="bg-[#090d16] p-4 rounded border border-[#1e293b]">
              <span className="text-[10px] text-slate-400 block mb-1">Filtered Distance</span>
              <span className="text-2xl font-mono font-bold text-cyan-400">73.6 <span className="text-xs">cm</span></span>
              <span className="text-[9px] text-slate-500 block mt-1">Moving Avg Filter (N=5)</span>
            </div>
            <div className="bg-[#090d16] p-4 rounded border border-[#1e293b]">
              <span className="text-[10px] text-slate-400 block mb-1">Internal Temp</span>
              <span className="text-2xl font-mono font-bold text-amber-400">{tower.temperature} <span className="text-xs">°C</span></span>
              <span className="text-[9px] text-slate-500 block mt-1">Thermal Safe</span>
            </div>
            <div className="bg-[#090d16] p-4 rounded border border-[#1e293b]">
              <span className="text-[10px] text-slate-400 block mb-1">ESP32 Gateway</span>
              <span className="text-xl font-mono font-bold text-emerald-400 flex items-center gap-1.5 mt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span> ONLINE
              </span>
              <span className="text-[9px] text-slate-500 block mt-1">UART 115200 baud</span>
            </div>
          </div>

          <div className="mt-4 p-3 bg-red-950/30 border border-red-900/50 rounded flex items-center justify-between text-xs">
            <span className="text-red-300 font-medium">⚠️ Security Policy Triggered: Distance delta &gt; 30cm from baseline (42cm). Automatic lockdown initiated.</span>
            <span className="font-mono text-[10px] text-slate-400">14:32:17 UTC</span>
          </div>
        </div>

      </div>
    </div>
  );
}