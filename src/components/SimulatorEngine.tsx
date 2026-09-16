"use client";
import { useEffect } from 'react';
import { useTowerStore } from '@/store/useTowerStore';

export default function SimulatorEngine() {
  const { simulationMode, updateTelemetry, towers } = useTowerStore();

  useEffect(() => {
    if (!simulationMode) return;

    const interval = setInterval(() => {
      const now = new Date().toISOString();

      Object.keys(towers).forEach(towerId => {
        const tower = towers[towerId];
        if (tower.status === 'OFFLINE') return;

        let baseDistance = 42.0; 
        if (tower.status === 'CRITICAL') {
          baseDistance = 150.0; // Distance spikes when door opens
        }

        const noise = (Math.random() * 4) - 2;
        const rawDistance = baseDistance + noise;
        
        const prevData = tower.telemetryHistory.slice(-4);
        const sum = prevData.reduce((acc, curr) => acc + curr.rawDistance, 0) + rawDistance;
        const filteredDistance = sum / (prevData.length + 1);

        updateTelemetry(towerId, {
          timestamp: now,
          rawDistance: Number(rawDistance.toFixed(2)),
          filteredDistance: Number(filteredDistance.toFixed(2)),
          noiseLevel: Number(Math.abs(noise).toFixed(2))
        });
      });
    }, 1000); 

    return () => clearInterval(interval);
  }, [simulationMode, towers, updateTelemetry]);

  return null; 
}