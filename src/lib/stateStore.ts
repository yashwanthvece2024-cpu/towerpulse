const g = globalThis as any;
if (!g.__towerpulse_state) {
  g.__towerpulse_state = {
    state: "ARMED" as "ARMED" | "BREACHED" | "OPEN",
    lastDistance: 999,
    buzzerActive: false,
    servoAngle: 90,
    auditLog: ["System initialized. Monitoring safe baseline."] as string[],
    lastBreachAuditTime: 0,
  };
}
export const systemState = g.__towerpulse_state;