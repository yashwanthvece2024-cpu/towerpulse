"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { LineChart as LineIcon, Activity, Zap, CheckCircle2 } from 'lucide-react';

export default function SignalAnalyticsPage() {
  const spectrumData = [
    { freq: '10Hz', power: 12 },
    { freq: '20Hz', power: 28 },
    { freq: '30Hz', power: 65 },
    { freq: '40Hz', power: 95 }, // Peak noise frequency
    { freq: '50Hz', power: 40 },
    { freq: '60Hz', power: 15 },
  ];

  return (
    <div className="space-y-6 pb-12">
      <header className="bg-[#111c3a] border border-[#1e293b] p-6 rounded-xl shadow-xl flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Signal Analytics & FFT Spectrum</h1>
          <p className="text-sm text-slate-300 mt-1">Frequency domain analysis of HC-SR04 ultrasonic sensor telemetry</p>
        </div>
        <div className="flex items-center gap-2 bg-[#090d16] px-4 py-2 rounded-lg border border-[#1e293b] text-xs font-mono text-cyan-400">
          <Activity size={16} /> Sampling Rate: 50 Hz
        </div>
      </header>

      {/* Main Spectrum Chart */}
      <div className="bg-[#111c3a] border border-[#1e293b] rounded-xl p-6 shadow-xl">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4">Fast Fourier Transform (FFT) Power Spectrum</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={spectrumData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="freq" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#090d16', borderColor: '#1e293b', fontSize: '12px' }} />
              <Line type="monotone" dataKey="power" stroke="#00e5ff" strokeWidth={3} dot={{ r: 4, fill: '#00e5ff' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-[#111c3a] border border-[#1e293b] rounded-xl p-5 shadow-xl">
          <span className="text-xs text-slate-400 block mb-1">Peak Noise Frequency</span>
          <span className="text-2xl font-mono font-bold text-amber-400">40 Hz</span>
          <span className="text-[11px] text-slate-500 block mt-1">Environmental vibration detected</span>
        </div>
        <div className="bg-[#111c3a] border border-[#1e293b] rounded-xl p-5 shadow-xl">
          <span className="text-xs text-slate-400 block mb-1">Signal-to-Noise Ratio (SNR)</span>
          <span className="text-2xl font-mono font-bold text-emerald-400">24.6 dB</span>
          <span className="text-[11px] text-slate-500 block mt-1">Within optimal operating threshold</span>
        </div>
        <div className="bg-[#111c3a] border border-[#1e293b] rounded-xl p-5 shadow-xl">
          <span className="text-xs text-slate-400 block mb-1">Digital Filter Status</span>
          <span className="text-2xl font-mono font-bold text-cyan-400">Active</span>
          <span className="text-[11px] text-slate-500 block mt-1">Moving average window N=5</span>
        </div>
      </div>
    </div>
  );
}