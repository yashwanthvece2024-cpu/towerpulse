import { NextResponse } from 'next/server';

// In-memory state store for the live session
let globalState = {
  distance: 169,
  state: "ARMED",
  buzzerActive: false,
  servoAngle: 90,
  auditLog: ["System initialized. Monitoring safe baseline."]
};

// 1. Handle GET requests from the Next.js frontend telemetry hook
export async function GET() {
  return NextResponse.json(globalState);
}

// 2. Handle POST requests from the ESP32 or UI Command buttons
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Check if the ESP32 sent a distance reading
    if (body.distance !== undefined) {
      const distance = Number(body.distance);
      const isBreached = distance <= 30 && distance > 0;

      globalState.distance = distance;
      globalState.state = isBreached ? "CRITICAL BREACH" : "ARMED";
      globalState.buzzerActive = isBreached;
      globalState.servoAngle = isBreached ? 90 : 0; // 90 = Open, 0 = Locked (or vice versa per your setup)

      if (isBreached && !globalState.auditLog.includes(`[CRITICAL] Object detected at ${distance}cm!`)) {
        globalState.auditLog.unshift(`[CRITICAL] Object detected at ${distance}cm! Auto-locking door.`);
      }
    }

    // Check if the frontend sent a command (e.g. OPEN_DOOR, REARM)
    if (body.command) {
      if (body.command === "OPEN_DOOR") {
        globalState.servoAngle = 90;
        globalState.auditLog.unshift("[ADMIN] Door manually opened.");
      } else if (body.command === "REARM") {
        globalState.servoAngle = 0;
        globalState.state = "ARMED";
        globalState.buzzerActive = false;
        globalState.auditLog.unshift("[ADMIN] System re-armed.");
      }
    }

    return NextResponse.json(globalState);
  } catch (error) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}