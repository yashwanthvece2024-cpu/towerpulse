"use client";

import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Map, Radio, Activity, Cpu, 
  AlertTriangle, Bell, Terminal, 
  TrendingUp, FileText, Settings, Shield, Antenna
} from "lucide-react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Dynamically applies the blue highlight to the active left-side menu item
  const getLinkClass = (path: string) => {
    const isActive = pathname === path;
    return `flex items-center gap-3 px-6 py-2.5 border-l-2 transition-colors ${
      isActive 
        ? 'border-[#00e5ff] bg-[#0b132b] text-white shadow-[inset_4px_0_10px_rgba(0,229,255,0.1)]' 
        : 'border-transparent text-slate-400 hover:bg-slate-800/30 hover:text-white'
    }`;
  };

  const getIconClass = (path: string) => {
    return pathname === path ? "text-[#00e5ff]" : "";
  };

  return (
    <html lang="en" className="dark">
      <body className="bg-[#020617] text-white flex min-h-screen font-sans">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className="w-[260px] bg-[#070b14] border-r border-slate-800 flex flex-col shrink-0 select-none">
          <div className="p-5 border-b border-slate-800 flex items-center gap-3">
            <Antenna size={28} className="text-[#00e5ff]" />
            <div>
              <h1 className="font-bold text-lg tracking-wide text-white leading-tight">TowerPulse</h1>
              <p className="text-[9px] text-[#00e5ff] uppercase tracking-widest font-semibold">Autonomous Security</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto py-6 space-y-6 text-[12px] font-medium">
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider px-6 mb-2 font-bold">Overview</p>
              <div className="space-y-1">
                <Link href="/" className={getLinkClass("/")}>
                  <LayoutDashboard size={16} className={getIconClass("/")} /> Overview
                </Link>
                <Link href="/map" className={getLinkClass("/map")}>
                  <Map size={16} className={getIconClass("/map")} /> Tower Map
                </Link>
              </div>
            </div>

            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider px-6 mb-2 font-bold">Infrastructure</p>
              <div className="space-y-1">
                <Link href="/sites" className={getLinkClass("/sites")}>
                  <Radio size={16} className={getIconClass("/sites")} /> Tower Sites
                </Link>
                <Link href="/health" className={getLinkClass("/health")}>
                  <Activity size={16} className={getIconClass("/health")} /> Device Health
                </Link>
                <Link href="/devices" className={getLinkClass("/devices")}>
                  <Cpu size={16} className={getIconClass("/devices")} /> Device Management
                </Link>
              </div>
            </div>

            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider px-6 mb-2 font-bold">Security</p>
              <div className="space-y-1">
                <Link href="/security" className={getLinkClass("/security")}>
                  <Shield size={16} className={getIconClass("/security")} /> Cabinet Security
                </Link>
                <Link href="/threats" className={getLinkClass("/threats")}>
                  <AlertTriangle size={16} className={getIconClass("/threats")} /> Threat Detection
                </Link>
                <Link href="/alerts" className={getLinkClass("/alerts")}>
                  <Bell size={16} className={getIconClass("/alerts")} /> Alerts & Incidents
                </Link>
                <Link href="/control" className={getLinkClass("/control")}>
                  <Terminal size={16} className={getIconClass("/control")} /> Remote Control
                </Link>
              </div>
            </div>

            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider px-6 mb-2 font-bold">Analytics</p>
              <div className="space-y-1">
                <Link href="/telemetry" className={getLinkClass("/telemetry")}>
                  <Activity size={16} className={getIconClass("/telemetry")} /> Live Telemetry
                </Link>
                <Link href="/signal" className={getLinkClass("/signal")}>
                  <TrendingUp size={16} className={getIconClass("/signal")} /> Signal Analytics
                </Link>
                <Link href="/reports" className={getLinkClass("/reports")}>
                  <FileText size={16} className={getIconClass("/reports")} /> Analytics & Reports
                </Link>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-slate-800 flex items-center gap-3 bg-[#03050a]">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center font-bold justify-center text-[12px] border border-blue-500/30">
              Y
            </div>
            <div>
              <p className="text-xs font-bold text-white">Yashwanth V.</p>
              <p className="text-[10px] text-slate-400">CIT Engineering</p>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 min-w-0 overflow-y-auto bg-[#020617] flex flex-col">
          <header className="h-14 border-b border-slate-800 bg-[#070b14]/90 backdrop-blur px-8 flex items-center justify-end sticky top-0 z-20 gap-4">
             <div className="flex items-center gap-1.5 border border-slate-700/50 bg-slate-800/30 px-3 py-1.5 rounded-md text-[11px] font-semibold text-slate-300 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                System Online <span className="text-slate-500 text-[9px] font-normal ml-1">Last sync: just now (Live)</span>
             </div>
             <div className="bg-blue-600 text-white font-bold px-3 py-1.5 rounded-md text-[11px] flex items-center gap-2 shadow-md">
                <div className="bg-blue-800/50 rounded-full px-1">AV</div> Admin
             </div>
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}