import { useEffect, useState } from "react";

export interface Telemetry {
  distance: number;
  status: string;
  logMessage: string;
}

export function useTelemetry() {
  const [data, setData] = useState<Telemetry>({ distance: 80, status: "SAFE", logMessage: "Connecting..." });
  const [isSimulated, setIsSimulated] = useState(false);
  const [simulatedDistance, setSimulatedDistance] = useState(80);
  const [isAutoDemo, setIsAutoDemo] = useState(false);

  // 🤖 AUTO-PILOT DEMO DIRECTOR
  useEffect(() => {
    if (!isAutoDemo) return;
    setIsSimulated(true);
    setSimulatedDistance(80); // Safe

    const breachTimer = setTimeout(() => {
      setSimulatedDistance(12); // Near (< 30cm) -> Instant Alert!
    }, 5000);

    const resolveTimer = setTimeout(() => {
      setSimulatedDistance(80); // Safe again
      setIsAutoDemo(false);
    }, 15000);

    return () => { clearTimeout(breachTimer); clearTimeout(resolveTimer); };
  }, [isAutoDemo]);

  // 📡 THE POLLING ENGINE
  useEffect(() => {
    if (isSimulated) {
      const noise = Math.floor(Math.random() * 3) - 1; 
      const currentSimCm = Math.max(0, simulatedDistance + noise);
      
      // INSTANT LOCAL CHECK: < 30cm means someone is near -> CRITICAL RED ALERT
      const isBreached = currentSimCm < 30;

      setData({
        distance: currentSimCm,
        status: isBreached ? "CRITICAL" : "SAFE",
        logMessage: isBreached 
          ? `CRITICAL ALERT: Proximity breach detected at ${currentSimCm}cm!`
          : `Area secure. Baseline distance at ${currentSimCm}cm.`
      });
      return; 
    }

    // REAL HARDWARE POLLING
    const pollData = async () => {
      try {
        const res = await fetch("/api/analyze-threat");
        if (res.ok) {
          const liveData = await res.json();
          
          // ⚡ INSTANT UI OVERRIDE: Even if the backend AI is cooling down, 
          // if the physical distance drops below 30cm right now, turn the UI RED immediately!
          const instantStatus = liveData.distance < 30 ? "CRITICAL" : liveData.status;
          
          setData({
            ...liveData,
            status: instantStatus,
            logMessage: liveData.distance < 30 && instantStatus === "CRITICAL"
              ? `CRITICAL ALERT: Physical proximity breach at ${liveData.distance}cm!`
              : liveData.logMessage
          });
        }
      } catch (error) {
        console.error("Backend API offline");
      }
    };
    
    const interval = setInterval(pollData, 500);
    return () => clearInterval(interval);
  }, [isSimulated, simulatedDistance]);

  return { data, isSimulated, setIsSimulated, simulatedDistance, setSimulatedDistance, isAutoDemo, setIsAutoDemo };
}