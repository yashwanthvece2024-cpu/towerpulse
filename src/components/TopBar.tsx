"use client";

export default function TopBar() {
  return (
    <header className="h-12 bg-[#0b132b] border-b border-[#1e2d5c] flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex-1"></div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10b981]"></span>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-[#10b981] leading-none">System Online</span>
            <span className="text-[9px] text-slate-500 mt-0.5 leading-none">Last sync: just now (SIM)</span>
          </div>
        </div>

        <div className="flex items-center gap-2 pl-4 border-l border-[#1e2d5c]">
          <div className="w-7 h-7 rounded-full bg-[#1e2d5c] flex items-center justify-center text-[#00e5ff] text-xs font-bold">
            AV
          </div>
          <span className="text-[11px] font-bold text-slate-200">Admin</span>
        </div>
      </div>
    </header>
  );
}