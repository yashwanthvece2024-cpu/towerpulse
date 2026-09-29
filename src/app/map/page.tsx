"use client";

import { useTelemetry } from "../../hooks/useTelemetry";
import { AlertTriangle, ShieldCheck, Activity, Radio, Lock, Unlock } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import 'leaflet/dist/leaflet.css';

const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });

interface TowerNode {
  id: string;
  name: string;
  location: string;
  coords: [number, number];
  isLiveHardware: boolean;
  status: "SECURE & ARMED" | "BREACHED" | "STANDBY";
  clearance: string;
}

export default function TowerMapPage() {
  const { data, adminOpenDoor, adminCloseDoor } = useTelemetry();
  const [leafletLib, setLeafletLib] = useState<any>(null);
  const [selectedTowerId, setSelectedTowerId] = useState<string>("CT-004");

  const isBreached = data.state === "BREACHED";
  const liveClearance = data.distance === 999 ? "-- cm" : `${data.distance} cm`;

  // Defined fleet nodes across Chennai
  const towers: TowerNode[] = [
    {
      id: "CT-004",
      name: "CAB-ALPHA",
      location: "Chennai Central Sector",
      coords: [13.0827, 80.2707],
      isLiveHardware: true,
      status: isBreached ? "BREACHED" : "SECURE & ARMED",
      clearance: liveClearance,
    },
    {
      id: "CT-005",
      name: "CAB-BETA",
      location: "Guindy Industrial Corridor",
      coords: [13.0067, 80.2025],
      isLiveHardware: false,
      status: "SECURE & ARMED",
      clearance: "78 cm",
    },
    {
      id: "CT-006",
      name: "CAB-GAMMA",
      location: "Tambaram Transit Hub",
      coords: [12.9249, 80.1000],
      isLiveHardware: false,
      status: "SECURE & ARMED",
      clearance: "92 cm",
    },
  ];

  useEffect(() => {
    import("leaflet").then((L) => {
      setLeafletLib(L);
    });
  }, []);

  // Creates high-contrast icons for each tower
  const createTowerIcon = (tower: TowerNode) => {
    if (!leafletLib) return undefined;

    const isSelected = selectedTowerId === tower.id;
    const isAlert = tower.status === "BREACHED";
    
    // High-contrast Amber for active nodes, Red for breach, Cyan for secondary
    const beaconColor = isAlert ? "#ef4444" : isSelected ? "#f59e0b" : "#38bdf8";
    const haloShadow = isAlert ? "rgba(239, 68, 68, 0.9)" : isSelected ? "rgba(245, 158, 11, 0.9)" : "rgba(56, 189, 248, 0.6)";
    const size = isSelected ? 48 : 40;

    const htmlString = `
      <div class="${isAlert || isSelected ? 'animate-pulse' : ''}" style="
        background: #020617;
        border: 3px solid ${beaconColor};
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        box-shadow: 0 0 25px ${haloShadow}, inset 0 0 10px ${haloShadow};
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      ">
        <svg xmlns="http://www.w3.org/2000/svg" width="${size - 18}" height="${size - 18}" viewBox="0 0 24 24" fill="none" stroke="${beaconColor}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2v20M2 12l10-10 10 10M4.93 10.93l1.41 1.41M17.66 12.34l1.41-1.41M9.17 15.17l1.42 1.42M13.41 16.59l1.42-1.42"/>
        </svg>
      </div>
    `;

    return leafletLib.divIcon({
      html: htmlString,
      className: "custom-beacon-marker",
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
      popupAnchor: [0, -(size / 2 + 5)],
    });
  };

  const selectedTower = towers.find((t) => t.id === selectedTowerId) || towers[0];

  return (
    <div className="flex flex-1 overflow-hidden bg-[#020617]">
      <style>{`
        .cyber-green-blue-tiles {
          filter: invert(100%) sepia(100%) hue-rotate(140deg) saturate(350%) brightness(80%) contrast(130%);
        }
        .leaflet-popup-content-wrapper, .leaflet-popup-tip {
          background: #070b14 !important;
          color: #fff !important;
          border: 1px solid #f59e0b;
          box-shadow: 0 0 20px rgba(245, 158, 11, 0.3);
        }
      `}</style>

      {/* MAP VIEWPORT */}
      <div className="flex-1 relative z-10 border-r border-slate-800 bg-[#000]">
        {typeof window !== "undefined" && leafletLib && (
          <MapContainer
            center={[13.0100, 80.1800]}
            zoom={11}
            style={{ width: "100%", height: "100%", background: "#000" }}
            zoomControl={true}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
              className="cyber-green-blue-tiles"
            />

            {towers.map((tower) => (
              <Marker
                key={tower.id}
                position={tower.coords}
                icon={createTowerIcon(tower)}
                eventHandlers={{
                  click: () => setSelectedTowerId(tower.id),
                }}
              >
                <Popup>
                  <div className="text-white font-sans min-w-[170px] p-1">
                    <strong className="text-sm border-b border-slate-700 pb-2 mb-2.5 block flex items-center gap-2 text-amber-400">
                      <Radio size={14} /> {tower.name} ({tower.id})
                    </strong>
                    <div className="text-xs space-y-1.5">
                      <div className="text-slate-400">{tower.location}</div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Clearance:</span>
                        <span className="font-mono font-bold text-amber-400">{tower.clearance}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Status:</span>
                        <span className={`font-bold ${tower.status === "BREACHED" ? "text-red-500" : "text-green-400"}`}>
                          {tower.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>

      {/* FLEET MANAGEMENT SIDEBAR */}
      <div className="w-[380px] bg-[#070b14] p-6 flex flex-col z-20 shadow-[-10px_0_20px_rgba(0,0,0,0.5)] overflow-y-auto">
        <h2 className="text-[11px] font-bold text-amber-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Activity size={14} /> FLEET GRID CONTROL ({towers.length} TOWERS)
        </h2>

        {/* TOWER SELECTOR LIST */}
        <div className="space-y-3 mb-6">
          {towers.map((t) => {
            const isSelected = selectedTowerId === t.id;
            const isAlert = t.status === "BREACHED";

            return (
              <div
                key={t.id}
                onClick={() => setSelectedTowerId(t.id)}
                className={`rounded-xl p-4 border transition-all cursor-pointer ${
                  isSelected
                    ? "border-amber-400/80 bg-amber-950/20 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                    : "border-slate-800 bg-slate-900/40 hover:border-slate-700"
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <Radio size={15} className={isSelected ? "text-amber-400" : "text-slate-400"} />
                    <span className="font-bold text-sm text-white">{t.name}</span>
                    <span className="text-[10px] text-slate-500 font-mono">({t.id})</span>
                  </div>
                  {t.isLiveHardware && (
                    <span className="text-[9px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-bold border border-cyan-500/40">
                      LIVE HARDWARE
                    </span>
                  )}
                </div>

                <div className="text-[11px] text-slate-400 mb-2">{t.location}</div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Clearance: <strong className="font-mono text-white">{t.clearance}</strong></span>
                  <span className={`font-bold text-[10px] px-2 py-0.5 rounded ${
                    isAlert ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"
                  }`}>
                    {t.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ACTIVE NODE CONTROL DECK */}
        <div className="mt-auto bg-slate-900/70 border border-slate-800 rounded-xl p-5">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
            Command: {selectedTower.name} ({selectedTower.id})
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={selectedTower.isLiveHardware ? adminCloseDoor : undefined}
              className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition"
            >
              <Lock size={14} /> ENGAGE DEADBOLT
            </button>
            <button
              onClick={selectedTower.isLiveHardware ? adminOpenDoor : undefined}
              className="py-2.5 px-3 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition"
            >
              <Unlock size={14} /> DISENGAGE LOCK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}