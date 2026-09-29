export type SystemState = "ARMED" | "BREACHED" | "OPEN";

export interface TelemetryPayload {
  distance: number;
  state: SystemState;
  buzzerActive: boolean;
  servoAngle: number;
  auditLog: string[];
  timestamp: number;
}

export interface NodeStatus {
  id: string;
  location: string;
  clearance: number;
  state: SystemState;
  lastSeen: number;
}