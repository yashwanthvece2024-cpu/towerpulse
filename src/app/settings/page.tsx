"use client";
import { Cpu, Shield, Bell, Save } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6 pb-12">
      <header className="bg-[#0e1626] border border-[#1a233a] p-6 rounded-xl shadow-xl flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-white">System Settings</h1>
          <p className="text-sm text-slate-400 mt-1">Configure hardware thresholds, DSP filters, and AI Agent routing</p>
        </div>
        <button className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg flex items-center gap-2 transition-colors">
          <Save size={16} /> Save Configurations
        </button>
      </header>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-[#0e1626] border border-[#1a233a] rounded-xl p-6 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-[#1a233a] pb-4">
            <div className="p-2 bg-cyan-950/50 rounded-lg border border-cyan-900">
              <Cpu className="text-cyan-400" size={20} />
            </div>
            <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Edge Hardware & DSP Calibration</h2>
          </div>
          
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5">HC-SR04 Safe Baseline Distance (cm)</label>
              <input type="number" defaultValue={15} className="w-full bg-[#05080e] border border-[#1a233a] text-white text-sm font-mono rounded-lg px-4 py-2.5 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all" />
              <p className="text-[10px] text-slate-500 mt-1.5">The expected distance from the sensor to the closed cabinet door.</p>
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5">Critical Breach Delta Threshold (cm)</label>
              <input type="number" defaultValue={30} className="w-full bg-[#05080e] border border-[#1a233a] text-white text-sm font-mono rounded-lg px-4 py-2.5 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all" />
              <p className="text-[10px] text-slate-500 mt-1.5">If the distance exceeds this value, the SG90 servo deadbolt actuates automatically.</p>
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5">DSP Moving Average Window (N)</label>
              <input type="number" defaultValue={5} className="w-full bg-[#05080e] border border-[#1a233a] text-white text-sm font-mono rounded-lg px-4 py-2.5 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all" />
              <p className="text-[10px] text-slate-500 mt-1.5">Number of acoustic array samples to average before validating a breach.</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-[#0e1626] border border-[#1a233a] rounded-xl p-6 shadow-xl space-y-6">
              <div className="flex items-center gap-3 border-b border-[#1a233a] pb-4">
                <div className="p-2 bg-purple-950/50 rounded-lg border border-purple-900">
                  <Shield className="text-purple-400" size={20} />
                </div>
                <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">AI Intelligence Layer</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1.5">Google Gemini API Key</label>
                  <input type="password" defaultValue="AIzaSyB-XXXXXXXXXXXXXXXXXXXXXXX" className="w-full bg-[#05080e] border border-[#1a233a] text-white text-sm font-mono rounded-lg px-4 py-2.5 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all" />
                </div>
              </div>
           </div>

           <div className="bg-[#0e1626] border border-[#1a233a] rounded-xl p-6 shadow-xl space-y-6">
              <div className="flex items-center gap-3 border-b border-[#1a233a] pb-4">
                <div className="p-2 bg-amber-950/50 rounded-lg border border-amber-900">
                  <Bell className="text-amber-400" size={20} />
                </div>
                <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Alert Routing</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1.5">Critical Incident Webhook URL</label>
                  <input type="text" defaultValue="https://api.towerpulse.io/v1/webhook" className="w-full bg-[#05080e] border border-[#1a233a] text-white text-sm font-mono rounded-lg px-4 py-2.5 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all" />
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}