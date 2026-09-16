"use client";
import { ShieldAlert, ShieldCheck, Activity, Cpu, ArrowRight, Lock, Bell, Radio } from 'lucide-react';

export default function ThreatDetectionPage() {
  return (
    <div className="space-y-6 pb-12">
      <header className="flex justify-between items-center bg-[#111c3a] border border-[#1e293b] p-6 rounded-xl shadow-xl">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-wide">Threat Detection & AI Analysis</h1>
          <p className="text-sm text-slate-300 mt-1">Autonomous ECE hardware anomaly detection and security policy evaluation</p>
        </div>
        <div className="flex items-center gap-3 bg-red-950/50 border border-red-800/80 px-4 py-2.5 rounded-lg shadow-inner">
          <ShieldAlert size={28} className="text-red-500 animate-pulse" />
          <div>
            <span className="text-[10px] text-red-400 font-bold uppercase tracking-widest block">System Status</span>
            <span className="text-sm font-bold text-white">CRITICAL BREACH ACTIVE</span>
          </div>
        </div>
      </header>

      {/* Top Section: Big Risk Score & Key Parameters */}
      <div className="grid grid-cols-3 gap-6">
        
        {/* Big Risk Score Gauge */}
        <div className="bg-[#111c3a] border border-[#1e293b] rounded-xl p-6 shadow-2xl flex flex-col items-center justify-center text-center">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Current Fleet Risk Index</h3>
          <div className="relative w-40 h-40 rounded-full border-8 border-red-500/20 flex items-center justify-center bg-[#090d16] shadow-[0_0_30px_rgba(239,68,68,0.2)]">
            <div className="absolute inset-0 rounded-full border-8 border-red-500 border-t-transparent animate-spin" style={{ animationDuration: '10s' }}></div>
            <div className="flex flex-col">
              <span className="text-5xl font-black text-red-500 tracking-tight">87</span>
              <span className="text-xs font-mono text-slate-400">/ 100 MAX</span>
            </div>
          </div>
          <span className="mt-4 text-xs font-bold text-red-400 bg-red-950/80 px-3 py-1 rounded-full border border-red-800">
            SEVERITY: CRITICAL THREAT
          </span>
        </div>

        {/* Detection Parameters Table */}
        <div className="bg-[#111c3a] border border-[#1e293b] rounded-xl p-6 shadow-2xl col-span-2 flex flex-col justify-between">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4">Real-Time Sensor Anomaly Parameters</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center bg-[#090d16] p-3 rounded-lg border border-[#1e293b]">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                <span className="text-sm font-medium text-slate-200">HC-SR04 Door Distance</span>
              </div>
              <span className="text-sm font-mono font-bold text-red-400">74.2 cm (Delta: +32.2cm)</span>
            </div>

            <div className="flex justify-between items-center bg-[#090d16] p-3 rounded-lg border border-[#1e293b]">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                <span className="text-sm font-medium text-slate-200">Signal Variance (Noise Rate)</span>
              </div>
              <span className="text-sm font-mono font-bold text-amber-400">5.4 Standard Deviation</span>
            </div>

            <div className="flex justify-between items-center bg-[#090d16] p-3 rounded-lg border border-[#1e293b]">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                <span className="text-sm font-medium text-slate-200">Cabinet Temperature</span>
              </div>
              <span className="text-sm font-mono font-bold text-emerald-400">42°C (Safe Range)</span>
            </div>

            <div className="flex justify-between items-center bg-[#090d16] p-3 rounded-lg border border-[#1e293b]">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                <span className="text-sm font-medium text-slate-200">ESP32 Gateway Link</span>
              </div>
              <span className="text-sm font-mono font-bold text-emerald-400">Connected (10 Hz)</span>
            </div>
          </div>
        </div>

      </div>

      {/* Detailed ECE Signal Processing & Threat Flowchart */}
      <div className="bg-[#111c3a] border border-[#1e293b] rounded-xl p-6 shadow-2xl">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-6">Autonomous Threat Detection & Closed-Loop Pipeline</h3>
        
        <div className="grid grid-cols-5 gap-4 items-center">
          
          <div className="bg-[#090d16] border border-[#1e293b] p-4 rounded-xl text-center flex flex-col items-center shadow-lg">
            <Radio size={24} className="text-cyan-400 mb-2" />
            <h4 className="text-xs font-bold text-white">1. HC-SR04 Sensor</h4>
            <p className="text-[11px] text-slate-400 mt-1">Ultrasonic echo timing converted to raw distance.</p>
          </div>

          <div className="flex justify-center text-slate-500"><ArrowRight size={24} /></div>

          <div className="bg-[#090d16] border border-[#1e293b] p-4 rounded-xl text-center flex flex-col items-center shadow-lg">
            <Activity size={24} className="text-cyan-400 mb-2" />
            <h4 className="text-xs font-bold text-white">2. Moving Average Filter</h4>
            <p className="text-[11px] text-slate-400 mt-1">DSP noise reduction across N=5 sliding window.</p>
          </div>

          <div className="flex justify-center text-slate-500"><ArrowRight size={24} /></div>

          <div className="bg-[#090d16] border border-red-800/80 p-4 rounded-xl text-center flex flex-col items-center shadow-lg bg-red-950/20">
            <ShieldAlert size={24} className="text-red-500 mb-2 animate-bounce" />
            <h4 className="text-xs font-bold text-red-400">3. Anomaly Engine</h4>
            <p className="text-[11px] text-slate-300 mt-1">Threshold breach detected (&gt;30cm delta). Threat score: 87.</p>
          </div>

        </div>

        <div className="mt-6 pt-6 border-t border-[#1e293b] grid grid-cols-2 gap-4">
          <div className="bg-[#090d16] p-4 rounded-lg border border-[#1e293b] flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-white block">Closed-Loop Actuation: Servo Lock</span>
              <span className="text-[11px] text-emerald-400">Command dispatched via ESP32 UART → SG90 Locked</span>
            </div>
            <Lock size={20} className="text-emerald-400" />
          </div>
          <div className="bg-[#090d16] p-4 rounded-lg border border-[#1e293b] flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-white block">Audible Alarm: Pin 8 Buzzer</span>
              <span className="text-[11px] text-amber-400">Active High Pulse Triggered</span>
            </div>
            <Bell size={20} className="text-amber-400" />
          </div>
        </div>
      </div>

    </div>
  );
}