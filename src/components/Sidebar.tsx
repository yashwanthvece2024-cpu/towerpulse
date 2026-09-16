"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Map, RadioTower, Cpu, Server, 
  Lock, ShieldAlert, AlertTriangle, Terminal, 
  Radio, LineChart, FileText, History, Settings 
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const menuGroups = [
    {
      title: "",
      items: [
        { name: "Overview", href: "/", icon: LayoutDashboard },
        { name: "Tower Map", href: "/map", icon: Map },
      ]
    },
    {
      title: "INFRASTRUCTURE",
      items: [
        { name: "Tower Sites", href: "/sites", icon: RadioTower },
        { name: "Device Health", href: "/health", icon: Cpu },
        { name: "Device Management", href: "/devices", icon: Server },
      ]
    },
    {
      title: "SECURITY",
      items: [
        { name: "Cabinet Security", href: "/security", icon: Lock },
        { name: "Threat Detection", href: "/threats", icon: ShieldAlert },
        { name: "Alerts & Incidents", href: "/alerts", icon: AlertTriangle },
        { name: "Remote Control", href: "/control", icon: Terminal },
      ]
    },
    {
      title: "ANALYTICS",
      items: [
        { name: "Live Telemetry", href: "/telemetry", icon: Radio },
        { name: "Signal Analytics", href: "/analytics", icon: LineChart },
        { name: "Analytics & Reports", href: "/reports", icon: FileText },
      ]
    },
    {
      title: "ADMINISTRATION",
      items: [
        { name: "Audit Logs", href: "/logs", icon: History },
        { name: "Settings", href: "/settings", icon: Settings },
      ]
    }
  ];

  return (
    <aside 
      style={{
        width: '260px',
        height: '100vh',
        backgroundColor: '#070b14', // Matches unified background
        borderRight: '1px solid #1a233a',
        position: 'fixed',
        left: 0,
        top: 0,
        display: 'flex',
        flexDirection: 'column',
        zIndex: 100,
        boxShadow: '4px 0 24px rgba(0,0,0,0.6)',
        overflowY: 'auto'
      }}
    >
      {/* Brand Header */}
      <div style={{ padding: '20px 16px', borderBottom: '1px solid #1a233a', display: 'flex', alignItems: 'center', gap: '12px', background: '#05080e' }}>
        <RadioTower size={26} color="#00e5ff" />
        <div>
          <h1 style={{ fontSize: '16px', fontWeight: 'bold', color: '#ffffff', margin: 0, letterSpacing: '0.5px' }}>TowerPulse</h1>
          <p style={{ fontSize: '9px', color: '#94a3b8', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>Autonomous Security</p>
        </div>
      </div>
      {/* ... rest of sidebar code ... */}

      {/* Navigation Links */}
      <nav style={{ padding: '16px 0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {menuGroups.map((group, idx) => (
          <div key={idx}>
            {group.title && (
              <h2 style={{ fontSize: '10px', fontWeight: 'bold', color: '#64748b', margin: '0 16px 8px 16px', letterSpacing: '1.2px', textTransform: 'uppercase' }}>
                {group.title}
              </h2>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link 
                    key={item.name} 
                    href={item.href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 16px',
                      fontSize: '13px',
                      fontWeight: isActive ? '600' : '500',
                      color: isActive ? '#00e5ff' : '#f1f5f9',
                      backgroundColor: isActive ? '#1e293b' : 'transparent',
                      borderLeft: isActive ? '4px solid #00e5ff' : '4px solid transparent',
                      textDecoration: 'none',
                      transition: 'background 0.2s',
                    }}
                  >
                    <Icon size={16} color={isActive ? "#00e5ff" : "#94a3b8"} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}