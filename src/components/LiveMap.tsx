"use client";

import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const iconSafe = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41], iconAnchor: [12, 41]
});

const iconDanger = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41], iconAnchor: [12, 41]
});

export default function LiveMap({ isBreached }: { isBreached: boolean }) {
  const centerPosition: [number, number] = [13.0827, 80.2707]; 

  return (
    <MapContainer center={centerPosition} zoom={11} style={{ height: '100%', width: '100%', zIndex: 0 }}>
      {/* PERFECTLY FREE, UNWATERMARKED DARK MAP */}
      <TileLayer 
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png" 
        attribution='&copy; OpenStreetMap'
      />
      
      <Marker position={centerPosition} icon={isBreached ? iconDanger : iconSafe}>
        <Popup className="text-black font-bold">
          CAB-ALPHA (CT-004) <br/> 
          <span className={isBreached ? "text-red-600" : "text-green-600"}>
            {isBreached ? 'CRITICAL BREACH' : 'SECURE'}
          </span>
        </Popup>
      </Marker>

      {isBreached && (
        <Circle center={centerPosition} radius={4000} pathOptions={{ color: 'red', fillColor: 'red', fillOpacity: 0.2 }} />
      )}
    </MapContainer>
  );
}