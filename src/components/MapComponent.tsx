"use client";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useTowerStore } from '@/store/useTowerStore';
import L from 'leaflet';

// Fix for Leaflet icons in Next.js
const iconSafe = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
});
const iconCritical = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
});

export default function MapComponent() {
  const { towers } = useTowerStore();

  // Chennai Coordinates
  const positions = {
    'CAB-ALPHA': [13.0827, 80.2707], 
    'CAB-BETA': [12.9716, 80.2496],  
    'CAB-GAMMA': [13.1235, 80.2145], 
  };

  const getIcon = (status: string) => status === 'CRITICAL' ? iconCritical : iconSafe;

  return (
    <MapContainer 
      center={[13.05, 80.25]} 
      zoom={11} 
      style={{ height: '100%', width: '100%', background: '#030712' }}
      zoomControl={true}
    >
      {/* FREE OpenStreetMap Provider with a dark filter applied via CSS */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        className="map-tiles"
      />
      {Object.values(towers).map((tower) => (
        <Marker key={tower.id} position={positions[tower.id as keyof typeof positions] as [number, number]} icon={getIcon(tower.status)}>
          <Popup>
            <div className="text-slate-800 font-sans">
              <strong className="block text-sm">{tower.id}</strong>
              <span className="text-xs">{tower.name}</span>
              <div className="mt-1 text-xs">Status: <b className={tower.status === 'CRITICAL' ? 'text-red-500' : 'text-emerald-500'}>{tower.status}</b></div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}