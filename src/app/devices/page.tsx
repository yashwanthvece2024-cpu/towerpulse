"use client";

import { Cpu, Wifi, Activity, Terminal, Server, CheckCircle2, XCircle } from "lucide-react";
import { useTelemetry } from "../../hooks/useTelemetry";
import { useEffect, useState, useRef } from "react";

export default function DevicesPage() {
  const { data, lastTelemetryTime } = useTelemetry();
  const [isOnline, setIsOnline] = useState(false);
  const logsContainerRef = useRef<HTMLDivElement>(null);

  // Auto-detect if the hardware connection drops
  useEffect(() => {
    setIsOnline(true);
    const timeout = setTimeout(() => setIsOnline(false), 3000);
    return () => clearTimeout(timeout);
  }, [lastTelemetryTime]);

  // Safely auto-scroll the event log without jumping the page
  useEffect(() => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [data.auditLog]);

  const displayDistance = data.distance === 999 ? "--" : data.distance;
  const isBreached = data.state === "BREACHED";

  return (
    <div className="p-6 md:p-8 w-full flex flex-col gap-6 min-h-[calc(100vh-3.5rem)] bg-noc-950">
      
      {/* HEADER */}
      <div className="border-b border-noc-800 pb-4 shrink-0">
        <h1 className="text-2xl font-bold text-white mb-1.5 flex items-center gap-2 tracking-tight">
          <Cpu className="text-[#00e5ff]" size={22} /> Edge Device Management
        </h1>
        <p className="text-slate-400 text-xs">Hardware diagnostics, live telemetry, and microcontroller health</p>
      </div>

      {/* DEVICE CARDS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 shrink-0">
        
        {/* ARDUINO UNO NODE */}
        <div className="bg-noc-900 rounded-xl p-6 border border-noc-800 shadow-xl flex flex-col transition-all">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-noc-800 rounded-lg border border-noc-700">
                <Cpu size={18} className="text-[#00e5ff]" />
              </div>
              <div>
                <h3 className="font-bold text-[14px] text-white tracking-wide">Arduino Uno (Sensor Node)</h3>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">Firmware: v2.1 (DSP Active)</p>
              </div>
            </div>
            {isOnline ? (
              <span className="flex items-center gap-1.5 bg-green-500/10 text-green-400 text-[10px] font-bold px-2.5 py-1 rounded border border-green-500/20 tracking-wider">
                <CheckCircle2 size={12} /> ONLINE
              </span>
            ) : (
              <span className="flex items-center gap-1.5 bg-red-500/10 text-red-500 text-[10px] font-bold px-2.5 py-1 rounded border border-red-500/20 tracking-wider">
                <XCircle size={12} /> OFFLINE
              </span>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center bg-[#050914] p-3 rounded-lg border border-noc-800 text-[11px]">
              <span className="flex items-center gap-2 text-slate-400"><Activity size={14} className="text-slate-500" /> Ultrasonic Distance</span>
              <span className="font-bold text-[#00e5ff] font-mono text-sm">{isOnline ? `${displayDistance} cm` : '--'}</span>
            </div>
            <div className="flex justify-between items-center bg-[#050914] p-3 rounded-lg border border-noc-800 text-[11px]">
              <span className="flex items-center gap-2 text-slate-400"><Terminal size={14} className="text-slate-500" /> SG90 Servo Actuator</span>
              <span className={`font-bold text-xs ${isBreached ? 'text-red-500' : 'text-green-400'}`}>
                {isOnline ? `POS: ${data.servoAngle}° (${isBreached ? 'LOCKED' : 'STANDBY'})` : '--'}
              </span>
            </div>
            <div className="flex justify-between items-center bg-[#050914] p-3 rounded-lg border border-noc-800 text-[11px]">
              <span className="flex items-center gap-2 text-slate-400"><Cpu size={14} className="text-slate-500" /> Filter Algorithm</span>
              <span className="font-bold text-slate-300">Exp. Moving Average</span>
            </div>
          </div>
        </div>

        {/* ESP32 GATEWAY */}
        <div className="bg-noc-900 rounded-xl p-6 border border-noc-800 shadow-xl flex flex-col transition-all">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-noc-800 rounded-lg border border-noc-700">
                <Wifi size={18} className="text-purple-400" />
              </div>
              <div>
                <h3 className="font-bold text-[14px] text-white tracking-wide">ESP32 (Network Gateway)</h3>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">Node ID: CT-004</p>
              </div>
            </div>
            {isOnline ? (
              <span className="flex items-center gap-1.5 bg-green-500/10 text-green-400 text-[10px] font-bold px-2.5 py-1 rounded border border-green-500/20 tracking-wider">
                <CheckCircle2 size={12} /> ONLINE
              </span>
            ) : (
              <span className="flex items-center gap-1.5 bg-red-500/10 text-red-500 text-[10px] font-bold px-2.5 py-1 rounded border border-red-500/20 tracking-wider">
                <XCircle size={12} /> OFFLINE
              </span>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center bg-[#050914] p-3 rounded-lg border border-noc-800 text-[11px]">
              <span className="flex items-center gap-2 text-slate-400"><Wifi size={14} className="text-slate-500" /> Network Link</span>
              <span className="font-bold text-green-400">2.4GHz Wi-Fi (Live)</span>
            </div>
            <div className="flex justify-between items-center bg-[#050914] p-3 rounded-lg border border-noc-800 text-[11px]">
              <span className="flex items-center gap-2 text-slate-400"><Activity size={14} className="text-slate-500" /> UART Serial Bridge</span>
              <span className="font-bold text-[#00e5ff]">Active (9600 baud)</span>
            </div>
            <div className="flex justify-between items-center bg-[#050914] p-3 rounded-lg border border-noc-800 text-[11px]">
              <span className="flex items-center gap-2 text-slate-400"><Server size={14} className="text-slate-500" /> API Status</span>
              <span className={`font-bold ${isOnline ? 'text-slate-300' : 'text-red-500'}`}>
                {isOnline ? 'Connected to Next.js' : 'Connection Lost'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* LIVE SYSTEM EVENT LOG */}
      <div className="bg-noc-900 rounded-xl p-6 border border-noc-800 shadow-xl flex-1 flex flex-col min-h-[220px]">
        <h3 className="text-[13px] font-bold text-white mb-4 flex items-center gap-2 shrink-0">
          <Terminal size={16} className="text-slate-400" /> Live System Event Log
        </h3>
        <div 
          ref={logsContainerRef}
          className="flex-1 bg-[#050914] rounded-lg border border-noc-800 p-5 font-mono text-[11px] overflow-y-auto custom-scrollbar"
        >
          {data.auditLog && data.auditLog.length > 0 ? (
            data.auditLog.map((log: string, i: number) => (
              <div key={i} className={`mb-2 leading-relaxed ${log.includes("CRITICAL") || log.includes("BREACH") ? 'text-red-500' : log.includes("Admin") ? 'text-cyan-400' : 'text-green-500'}`}>
                <span className="text-slate-600 mr-2">[{new Date().toISOString().split('T')[1].substring(0,8)}]</span>
                {log}
              </div>
            ))
          ) : (
            <div className="text-slate-500 italic">No system events recorded in the current session.</div>
          )}
        </div>
      </div>

    </div>
  );
}