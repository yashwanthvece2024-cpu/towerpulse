import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

// Global cache to hold the latest ESP32 hardware data
let latestTelemetry = {
  distance: 80, // Default to a safe distance (empty room)
  status: "SAFE",
  logMessage: "System initialized. Monitoring safe baseline."
};

// Rate Limiting Trackers
let lastApiCallTime = 0;
let lastEvaluatedDistance = 80;

// The Dashboard UI calls this GET route to update the live charts
export async function GET() {
  return NextResponse.json(latestTelemetry);
}

// The ESP32 calls this POST route to push new hardware data
export async function POST(req: Request) {
  try {
    console.log("--- NEW INCOMING HARDWARE PING ---");
    
    // Checkpoint 1: Is the API key loaded?
    if (!process.env.GEMINI_API_KEY) {
       console.log("❌ ERROR: GEMINI_API_KEY is missing!");
       return NextResponse.json({ error: 'Missing API Key' }, { status: 500 });
    }

    // Checkpoint 2: Can we read the ESP32 JSON data?
    const body = await req.json();
    console.log("✅ Check 2: ESP32 Payload received:", body);

    // ALWAYS update the cache distance instantly so the frontend chart looks completely live
    latestTelemetry.distance = body.distance;

    // ==========================================
    // 🛡️ THE PERMANENT RATE LIMIT FIX
    // ==========================================
    const now = Date.now();
    const COOLDOWN_MS = 16000; // 16 seconds = max 3.75 requests per minute. Completely safe!
    
    // 1. Check Hard Cooldown Timer
    if (now - lastApiCallTime < COOLDOWN_MS) {
        const timeLeft = Math.round((COOLDOWN_MS - (now - lastApiCallTime)) / 1000);
        console.log(`⏳ AI Cooldown Active (${timeLeft}s left). UI updated, AI call skipped.`);
        return NextResponse.json(latestTelemetry);
    }

    // 2. Sensor Noise Filter (Ignore acoustic bouncing under 10cm)
    if (Math.abs(body.distance - lastEvaluatedDistance) < 10) {
        console.log(`⏸️ Target static (noise ignored). UI updated, AI skipped.`);
        return NextResponse.json(latestTelemetry);
    }

    // ==========================================
    // 🧠 CALLING GEMINI AI
    // ==========================================
    lastApiCallTime = now; 
    lastEvaluatedDistance = body.distance; 

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    // THE NEW AI PROMPT: "Near = Breach, Far = Secure"
    const prompt = `You are an enterprise telecom security AI. Sensor node ${body.node} just reported a physical distance of ${body.distance}cm. The secure baseline is empty space (greater than 30cm). If the distance is LESS THAN 30cm, it means an intruder is near the cabinet and it is a critical breach. Respond with a strict JSON object: { "status": "SAFE" | "CRITICAL", "actionTaken": "string describing servo lockdown or normal monitoring", "logMessage": "string for the audit log" }`;
    
    console.log("✅ Check 3: Prompting Gemini AI...");
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
    });

    // Checkpoint 4: Parse AI Response
    const rawText = response.text || "{}";
    const cleanedText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    const evaluation = JSON.parse(cleanedText);

    console.log(`✅ Check 4: AI Agent Alert -> ${evaluation.logMessage}`);

    // Update global cache with AI status
    latestTelemetry.status = evaluation.status;
    latestTelemetry.logMessage = evaluation.logMessage;

    return NextResponse.json(evaluation);

  } catch (error) {
    console.error("🚨 API CRASH DETAILS:", error);
    return NextResponse.json({ error: 'AI processing failed' }, { status: 500 });
  }
}