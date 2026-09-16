import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

export const metadata: Metadata = {
  title: "TowerPulse | Network Operations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0b132b] text-slate-100 min-h-screen font-sans flex m-0 overflow-hidden">
        <Sidebar />
        
        <div className="flex-1 ml-[260px] flex flex-col h-screen overflow-hidden">
          <TopBar />
          <main className="flex-1 p-6 overflow-y-auto bg-[#0b132b] space-y-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}