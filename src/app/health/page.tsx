"use client";

import { useTelemetry } from "../../hooks/useTelemetry";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function DeviceHealthPage() {
  const { data, lastTelemetryTime } = useTelemetry();
  const [isOnline, setIsOnline] = useState(false);

  // Auto-detect if the hardware drops offline (no data for 3 seconds)
  useEffect(() => {
    setIsOnline(true);
    const timeout = setTimeout(() => setIsOnline(false), 3000);
    return () => clearTimeout(timeout);
  }, [lastTelemetryTime]);

  const sensorFault = data.distance === 999;
  const isBreached = data.state === "BREACHED";

  // Reusable status badge component
  const StatusBadge = ({ state }: { state: 'healthy' | 'warning' | 'offline' }) => {
    if (state === 'healthy') return (
      <div className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 text-green-400 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide">
        <CheckCircle2 size={14} /> HEALTHY
      </div>
    );
    if (state === 'warning') return (
      <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide animate-pulse">
        <AlertTriangle size={14} /> WARNING
      </div>
    );
    return (
      <div className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 text-red-500 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide">
        <XCircle size={14} /> OFFLINE
      </div>
    );
  };

  return (
    <div className="p-6 md:p-8 w-full flex flex-col min-h-[calc(100vh-3.5rem)] bg-noc-950">
      
      {/* HEADER */}
      <div className="mb-6 border-b border-noc-800 pb-5 bg-noc-900 p-6 rounded-xl border shadow-lg">
        <h1 className="text-2xl font-bold text-white mb-1.5 tracking-tight">Device Hardware Health</h1>
        <p className="text-slate-400 text-xs">Diagnostic status of microcontrollers, sensors, and gateway modules</p>
      </div>

      {/* 2x2 HARDWARE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* ESP32 GATEWAY */}
        <div className="bg-noc-900 rounded-xl p-6 border border-noc-800 shadow-xl flex flex-col transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-[10px] font-bold text-[#00e5ff] bg-[#00e5ff]/10 px-2 py-1 rounded border border-[#00e5ff]/20 uppercase tracking-wider mb-2 inline-block">
                ESP32-GW-01
              </span>
              <h3 className="text-lg font-bold text-white">ESP32 Main Gateway</h3>
            </div>
            <StatusBadge state={isOnline ? 'healthy' : 'offline'} />
          </div>
          <div className="bg-[#050914] rounded-lg border border-noc-800 p-4 grid grid-cols-3 gap-4 mt-auto">
            <div>
              <p className="text-[10px] text-slate-500 mb-1">CPU Load</p>
              <p className="text-sm font-bold text-white">{isOnline ? '14%' : '--'}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 mb-1">RAM Usage</p>
              <p className="text-sm font-bold text-white">{isOnline ? '32%' : '--'}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 mb-1">Network Ping</p>
              <p className={`text-sm font-bold ${isOnline ? 'text-green-400' : 'text-red-500'}`}>
                {isOnline ? '< 45ms' : 'TIMEOUT'}
              </p>
            </div>
          </div>
        </div>

        {/* ARDUINO UNO */}
        <div className="bg-noc-900 rounded-xl p-6 border border-noc-800 shadow-xl flex flex-col transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-[10px] font-bold text-[#00e5ff] bg-[#00e5ff]/10 px-2 py-1 rounded border border-[#00e5ff]/20 uppercase tracking-wider mb-2 inline-block">
                ARD-UNO-04
              </span>
              <h3 className="text-lg font-bold text-white">Arduino Uno Sensor Unit</h3>
            </div>
            <StatusBadge state={isOnline ? 'healthy' : 'offline'} />
          </div>
          <div className="bg-[#050914] rounded-lg border border-noc-800 p-4 grid grid-cols-3 gap-4 mt-auto">
            <div>
              <p className="text-[10px] text-slate-500 mb-1">DSP Filter</p>
              <p className="text-sm font-bold text-white">{isOnline ? 'Active' : '--'}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 mb-1">UART Bridge</p>
              <p className="text-sm font-bold text-white">{isOnline ? '9600 Baud' : '--'}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 mb-1">Uptime</p>
              <p className="text-sm font-bold text-green-400">{isOnline ? '14 days' : '--'}</p>
            </div>
          </div>
        </div>

        {/* ULTRASONIC SENSOR */}
        <div className={`bg-noc-900 rounded-xl p-6 border shadow-xl flex flex-col transition-colors ${sensorFault && isOnline ? 'border-amber-500/50 bg-amber-950/10' : 'border-noc-800'}`}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-[10px] font-bold text-[#00e5ff] bg-[#00e5ff]/10 px-2 py-1 rounded border border-[#00e5ff]/20 uppercase tracking-wider mb-2 inline-block">
                SEN-HC04-04
              </span>
              <h3 className="text-lg font-bold text-white">HC-SR04 Ultrasonic Array</h3>
            </div>
            <StatusBadge state={!isOnline ? 'offline' : sensorFault ? 'warning' : 'healthy'} />
          </div>
          <div className="bg-[#050914] rounded-lg border border-noc-800 p-4 grid grid-cols-3 gap-4 mt-auto">
            <div>
              <p className="text-[10px] text-slate-500 mb-1">Raw Echo</p>
              <p className={`text-sm font-bold ${sensorFault ? 'text-amber-500' : 'text-white'}`}>
                {isOnline ? (sensorFault ? 'TIMEOUT' : 'RECEIVED') : '--'}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 mb-1">Polled Distance</p>
              <p className="text-sm font-bold text-white">{isOnline ? `${data.distance} cm` : '--'}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 mb-1">Acoustic Status</p>
              <p className={`text-sm font-bold ${sensorFault ? 'text-amber-500' : 'text-green-400'}`}>
                {isOnline ? (sensorFault ? 'BLOCKED/LOST' : 'CLEAR') : '--'}
              </p>
            </div>
          </div>
        </div>

        {/* SERVO ACTUATOR */}
        <div className={`bg-noc-900 rounded-xl p-6 border shadow-xl flex flex-col transition-colors ${isBreached ? 'border-red-500/50 bg-red-950/10' : 'border-noc-800'}`}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-[10px] font-bold text-[#00e5ff] bg-[#00e5ff]/10 px-2 py-1 rounded border border-[#00e5ff]/20 uppercase tracking-wider mb-2 inline-block">
                ACT-SG90-04
              </span>
              <h3 className="text-lg font-bold text-white">SG90 Servo Lock Actuator</h3>
            </div>
            <StatusBadge state={isOnline ? 'healthy' : 'offline'} />
          </div>
          <div className="bg-[#050914] rounded-lg border border-noc-800 p-4 grid grid-cols-3 gap-4 mt-auto">
            <div>
              <p className="text-[10px] text-slate-500 mb-1">PWM Signal</p>
              <p className="text-sm font-bold text-white">{isOnline ? 'Active (50Hz)' : '--'}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 mb-1">Angle</p>
              <p className="text-sm font-bold text-white">{isOnline ? `${data.servoAngle}°` : '--'}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 mb-1">Mechanical Lock</p>
              <p className={`text-sm font-bold ${isBreached ? 'text-red-500' : 'text-green-400'}`}>
                {isOnline ? (isBreached ? 'ENGAGED' : 'STANDBY') : '--'}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}