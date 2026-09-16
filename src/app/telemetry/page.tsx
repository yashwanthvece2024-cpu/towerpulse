"use client";
import { useTowerStore } from '@/store/useTowerStore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Radio, Cpu, Activity, CheckCircle2 } from 'lucide-react';

export default function LiveTelemetryPage() {
  const signalData = [
    { time: '13:30', raw: 42.1, filtered: 42.0 },
    { time: '13:35', raw: 42.5, filtered: 42.1 },
    { time: '13:40', raw: 41.9, FILTERED: 42.0 },
    { time: '13:45', raw: 42.8, filtered: 42.2 },
    { time: '13:50', raw: 74.2, filtered: 73.6 }, // Breach spike
    { time: '13:55', raw: 74.0, filtered: 73.8 },
  ];

  return (
    <div className="space-y-6 flex flex-col h-full text-slate-200">
      <header>
        <h1 className="text-2xl font-bold text-white">Live Telemetry & Signal Processing</h1>
        <p className="text-xs text-slate-400 mt-1">Real-time ultrasonic sensor stream and moving average digital filter performance</p>
      </header>

      {/* Main Chart Section */}
      <div className="bg-[#111c3a] border border-[#1e293b] rounded-lg p-5 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider">HC-SR04 Ultrasonic Distance Stream (Raw vs Filtered)</h2>
          <div className="flex gap-4 text-xs font-mono">
            <span className="text-red-400 flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500"></span> Raw Signal</span>
            <span className="text-cyan-400 flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-cyan-400"></span> Filtered Signal</span>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={signalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="time" stroke="#64748b" fontSize={10} />
              <YAxis stroke="#64748b" fontSize={10} domain={[30, 90]} />
              <Tooltip contentStyle={{ backgroundColor: '#090d16', borderColor: '#1e293b', fontSize: '11px' }} />
              <Line type="monotone" dataKey="raw" stroke="#ef4444" strokeWidth={1.5} dot={false} />
              <Line type="monotone" dataKey="filtered" stroke="#00e5ff" strokeWidth={2} dot={true} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* DSP Pipeline Info Grid */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-[#111c3a] border border-[#1e293b] rounded-lg p-5 shadow-xl">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">DSP Filter Metrics</h3>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between border-b border-[#1e293b] pb-2">
              <span className="text-slate-400">Raw Signal Noise:</span>
              <span className="font-mono text-red-400 font-bold">18.4%</span>
            </div>
            <div className="flex justify-between border-b border-[#1e293b] pb-2">
              <span className="text-slate-400">Filtered Noise:</span>
              <span className="font-mono text-cyan-400 font-bold">2.1%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Noise Reduction Efficiency:</span>
              <span className="font-mono text-emerald-400 font-bold">88.6%</span>
            </div>
          </div>
        </div>

        <div className="bg-[#111c3a] border border-[#1e293b] rounded-lg p-5 shadow-xl col-span-2">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Hardware Link Status</h3>
          <div className="grid grid-cols-3 gap-4 text-xs">
            <div className="bg-[#090d16] p-3 rounded border border-[#1e293b]">
              <span className="text-slate-400 block mb-1">Arduino Uno Sensor</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle2 size={12}/> Operational</span>
            </div>
            <div className="bg-[#090d16] p-3 rounded border border-[#1e293b]">
              <span className="text-slate-400 block mb-1">ESP32 WiFi Gateway</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle2 size={12}/> Operational</span>
            </div>
            <div className="bg-[#090d16] p-3 rounded border border-[#1e293b]">
              <span className="text-slate-400 block mb-1">SG90 Servo Actuator</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle2 size={12}/> Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}