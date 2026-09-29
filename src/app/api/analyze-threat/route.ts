// Example: src/app/api/analyze-threat/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const currentDistance = body.distance;

    // 1. Evorozen Neural Pulse API Integration
    const evorozenResponse = await fetch("https://api.evorozen.com/v1/neural-pulse/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.EVOROZEN_API_KEY}` // Add your key to .env
      },
      body: JSON.stringify({
        sensor_type: "HC-SR04",
        telemetry_value: currentDistance,
        threshold: 30
      })
    });

    const aiAnalysis = await evorozenResponse.json();

    // 2. Security Logic based on AI + Distance
    let isBreached = currentDistance <= 30;
    
    return NextResponse.json({
      distance: currentDistance,
      state: isBreached ? "CRITICAL BREACH" : "ARMED",
      buzzerActive: isBreached,
      servoAngle: isBreached ? 90 : 0,
      evorozenInsights: aiAnalysis.pulse_insight || "Monitoring baseline."
    });

  } catch (error) {
    return NextResponse.json({ error: 'Failed to process telemetry' }, { status: 500 });
  }
}