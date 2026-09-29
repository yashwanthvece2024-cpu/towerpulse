import { useEffect, useState, useRef } from "react";

export function useTelemetry() {
  const [data, setData] = useState<any>({ 
    distance: 999, 
    state: "ARMED", 
    buzzerActive: false,
    servoAngle: 90,
    auditLog: ["System initialized. Monitoring safe baseline."]
  });
  
  const [lastTelemetryTime, setLastTelemetryTime] = useState<number | null>(null);
  const watchdogTimer = useRef<NodeJS.Timeout | null>(null);

  const sendCommand = async (cmd: string) => {
    try {
      const res = await fetch("/api/analyze-threat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command: cmd })
      });
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (e) {
      console.error("Command failed", e);
    }
  };

  const adminOpenDoor = () => sendCommand("OPEN_DOOR");
  const adminCloseDoor = () => sendCommand("REARM");
  const rebootSensors = () => sendCommand("REBOOT");
  const testBuzzer = () => sendCommand("TEST_BUZZER");

  useEffect(() => {
    const updateTelemetry = async () => {
      try {
        const res = await fetch("/api/analyze-threat", { cache: "no-store" });
        if (res.ok) {
          const json = await res.json();
          setData(json);
          setLastTelemetryTime(Date.now());

          if (watchdogTimer.current) clearTimeout(watchdogTimer.current);
          watchdogTimer.current = setTimeout(() => {
            setData((prev: any) => ({ ...prev, distance: 999 })); 
          }, 3500); 
        }
      } catch (error) {
        // Silent catch for network drops
      }
    };
    
    updateTelemetry();
    
    // Poll the telemetry endpoint every 1 second (1000ms)
    const interval = setInterval(updateTelemetry, 1000); 
    
    return () => {
      clearInterval(interval);
      if (watchdogTimer.current) clearTimeout(watchdogTimer.current);
    };
  }, []);

  return { data, adminOpenDoor, adminCloseDoor, rebootSensors, testBuzzer, lastTelemetryTime };
}