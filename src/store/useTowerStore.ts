import { create } from 'zustand';

export interface TelemetryEvent {
  timestamp: string;
  rawDistance: number;
  filteredDistance: number;
  noiseLevel: number;
}

export interface TowerSite {
  id: string;
  name: string;
  status: 'SAFE' | 'WARNING' | 'CRITICAL' | 'OFFLINE';
  temperature: number;
  doorState: 'CLOSED' | 'OPEN';
  servoState: 'LOCKED' | 'UNLOCKED';
  buzzerState: 'INACTIVE' | 'ACTIVE';
  lastHeartbeat: string;
  telemetryHistory: TelemetryEvent[];
}

interface TowerStore {
  towers: Record<string, TowerSite>;
  simulationMode: boolean;
  activeAlerts: any[];
  
  updateTelemetry: (towerId: string, event: TelemetryEvent) => void;
  triggerSecurityIncident: (towerId: string) => void;
  resetTower: (towerId: string) => void;
}

const initialTowers: Record<string, TowerSite> = {
  "CAB-ALPHA": {
    id: "CAB-ALPHA", name: "Main Equipment Node (Local)", status: "SAFE",
    temperature: 32.4, doorState: "CLOSED", servoState: "LOCKED", buzzerState: "INACTIVE",
    lastHeartbeat: new Date().toISOString(), telemetryHistory: []
  },
  "CAB-BETA": {
    id: "CAB-BETA", name: "Remote Relay 04", status: "SAFE",
    temperature: 28.1, doorState: "CLOSED", servoState: "LOCKED", buzzerState: "INACTIVE",
    lastHeartbeat: new Date().toISOString(), telemetryHistory: []
  },
  "CAB-GAMMA": {
    id: "CAB-GAMMA", name: "Fiber Junction C", status: "OFFLINE",
    temperature: 0, doorState: "CLOSED", servoState: "LOCKED", buzzerState: "INACTIVE",
    lastHeartbeat: "2026-09-14T08:00:00Z", telemetryHistory: []
  }
};

export const useTowerStore = create<TowerStore>((set) => ({
  towers: initialTowers,
  simulationMode: true,
  activeAlerts: [],

  updateTelemetry: (towerId, event) => set((state) => {
    const tower = state.towers[towerId];
    if (!tower) return state;
    const newHistory = [...tower.telemetryHistory, event].slice(-60); // Keep 60 seconds
    return {
      towers: {
        ...state.towers,
        [towerId]: { ...tower, telemetryHistory: newHistory, lastHeartbeat: event.timestamp }
      }
    };
  }),

  triggerSecurityIncident: (towerId) => set((state) => {
    const tower = state.towers[towerId];
    if (!tower) return state;
    return {
      towers: {
        ...state.towers,
        [towerId]: {
          ...tower,
          status: 'CRITICAL',
          doorState: 'OPEN',
          servoState: 'LOCKED', 
          buzzerState: 'ACTIVE' 
        }
      },
      activeAlerts: [...state.activeAlerts, {
        id: `INC-${Date.now()}`,
        towerId,
        severity: 'CRITICAL',
        message: 'Unauthorized Cabinet Access Detected',
        timestamp: new Date().toISOString()
      }]
    };
  }),

  resetTower: (towerId) => set((state) => {
    const tower = state.towers[towerId];
    if (!tower) return state;
    return {
      towers: {
        ...state.towers,
        [towerId]: {
          ...tower,
          status: 'SAFE',
          doorState: 'CLOSED',
          buzzerState: 'INACTIVE'
        }
      }
    };
  })
}));