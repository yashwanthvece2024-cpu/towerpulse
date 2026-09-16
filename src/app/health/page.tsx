"use client";
import { Cpu, Activity, CheckCircle2, AlertTriangle, Wifi, HardDrive } from 'lucide-react';

export default function DeviceHealthPage() {
  const devices = [
    { id: 'ESP32-GW-01', name: 'ESP32 Main Gateway', status: 'Healthy', cpu: '14%', memory: '32%', uptime: '14 days' },
    { id: 'ARD-UNO-04', name: 'Arduino Uno Sensor Unit', status: 'Healthy', cpu: '8%', memory: '18%', uptime: '4 days' },
    { id: 'SEN-HC04-04', name: 'HC-SR04 Ultrasonic Array', status: 'Warning', cpu: 'N/A', memory: 'N/A', uptime: '4 days' },
    { id: 'ACT-SG90-04', name: 'SG90 Servo Lock Actuator', status: 'Healthy', cpu: 'N/A', memory: 'N/A', uptime: '14 days' },
  ];

  return (
    <div className="space-y-6 pb-12">
      <header className="bg-[#111c3a] border border-[#1e293b] p-6 rounded-xl shadow-xl">
        <h1 className="text-3xl font-extrabold text-white">Device Hardware Health</h1>
        <p className="text-sm text-slate-300 mt-1">Diagnostic status of microcontrollers, sensors, and gateway modules</p>
      </header>

      <div className="grid grid-cols-2 gap-6">
        {devices.map((dev) => (
          <div key={dev.id} className="bg-[#111c3a] border border-[#1e293b] rounded-xl p-6 shadow-xl flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-800">{dev.id}</span>
                <h3 className="text-lg font-bold text-white mt-1">{dev.name}</h3>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${dev.status === 'Healthy' ? 'bg-emerald-950 text-emerald-400 border-emerald-800' : 'bg-amber-950 text-amber-400 border-amber-800'}`}>
                {dev.status}
              </span>
            </div>
            
            <div className="grid grid-cols-3 gap-3 bg-[#090d16] p-4 rounded-lg border border-[#1e293b] text-xs">
              <div>
                <span className="text-slate-400 block">CPU Load</span>
                <span className="font-mono text-white font-bold text-sm">{dev.cpu}</span>
              </div>
              <div>
                <span className="text-slate-400 block">RAM Usage</span>
                <span className="font-mono text-white font-bold text-sm">{dev.memory}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Uptime</span>
                <span className="font-mono text-emerald-400 font-bold text-sm">{dev.uptime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}