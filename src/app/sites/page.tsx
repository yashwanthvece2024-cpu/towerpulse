"use client";
import { useState } from 'react';
import { useTowerStore } from '@/store/useTowerStore';
import { Search, Filter, MoreHorizontal, ShieldCheck, AlertTriangle, ShieldAlert, WifiOff } from 'lucide-react';

export default function TowerSitesPage() {
  const { towers } = useTowerStore();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Convert our Zustand store object into an array and filter it based on search
  const towerArray = Object.values(towers).filter(tower => 
    tower.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tower.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'SAFE': return <span className="flex items-center gap-1 text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded text-[10px] font-bold"><ShieldCheck size={12}/> SECURE</span>;
      case 'WARNING': return <span className="flex items-center gap-1 text-amber-400 bg-amber-400/10 px-2 py-1 rounded text-[10px] font-bold"><AlertTriangle size={12}/> MONITOR</span>;
      case 'CRITICAL': return <span className="flex items-center gap-1 text-red-500 bg-red-500/10 px-2 py-1 rounded text-[10px] font-bold animate-pulse"><ShieldAlert size={12}/> BREACH</span>;
      default: return <span className="flex items-center gap-1 text-slate-500 bg-slate-500/10 px-2 py-1 rounded text-[10px] font-bold"><WifiOff size={12}/> OFFLINE</span>;
    }
  };

  return (
    <div className="space-y-6 flex flex-col h-full">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Tower Sites</h1>
          <p className="text-xs text-slate-400 mt-1">Manage and monitor all telecom tower locations</p>
        </div>
      </header>

      {/* Control Bar */}
      <div className="bg-noc-800 border border-noc-700 rounded-lg p-4 flex gap-4 items-center shadow-lg">
        <div className="flex-1 flex items-center bg-noc-900 border border-noc-700 rounded-md px-3 py-2">
          <Search size={16} className="text-slate-500 mr-2" />
          <input 
            type="text" 
            placeholder="Search by Site ID, Name, or Location..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none text-xs text-slate-200 w-full placeholder-slate-600"
          />
        </div>
        
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-noc-900 border border-noc-700 rounded-md text-xs text-slate-300 hover:bg-noc-700 transition-colors">
            <Filter size={14} /> All Regions
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-noc-900 border border-noc-700 rounded-md text-xs text-slate-300 hover:bg-noc-700 transition-colors">
            <Filter size={14} /> All Status
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-noc-800 border border-noc-700 rounded-lg overflow-hidden flex-1 shadow-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-noc-900/50 border-b border-noc-700 text-slate-400 uppercase tracking-wider text-[10px]">
            <tr>
              <th className="px-6 py-4 font-bold">Site ID</th>
              <th className="px-6 py-4 font-bold">Location Name</th>
              <th className="px-6 py-4 font-bold">Cabinet Lock</th>
              <th className="px-6 py-4 font-bold">Temp</th>
              <th className="px-6 py-4 font-bold">Security Status</th>
              <th className="px-6 py-4 font-bold text-right">Last Seen</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-noc-700">
            {towerArray.map((tower) => (
              <tr key={tower.id} className="hover:bg-noc-700/30 transition-colors group">
                <td className="px-6 py-4 font-mono font-bold text-slate-200">{tower.id}</td>
                <td className="px-6 py-4 text-slate-400">{tower.name}</td>
                <td className="px-6 py-4">
                  <span className={`font-mono ${tower.servoState === 'LOCKED' ? 'text-emerald-400' : 'text-red-400'}`}>
                    {tower.servoState}
                  </span>
                </td>
                <td className="px-6 py-4 font-mono text-slate-300">{tower.temperature}°C</td>
                <td className="px-6 py-4">{getStatusBadge(tower.status)}</td>
                <td className="px-6 py-4 text-right font-mono text-slate-500 text-[10px]">
                  {new Date(tower.lastHeartbeat).toLocaleTimeString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-500 hover:text-noc-accent transition-colors opacity-0 group-hover:opacity-100">
                    <MoreHorizontal size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {towerArray.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                  No towers found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}