# ⚡ TowerPulse: Autonomous AI Edge Security Network

**TowerPulse** is an enterprise-grade, autonomous edge security system designed for telecom infrastructure and remote installation sites. It combines microcontrollers (ESP32 / Arduino Uno) with ultrasonic proximity sensors, an optimized Next.js backend, and the Google Gemini AI intelligence layer to provide real-time threat detection, automated servo lockdowns, and live geospatial tracking.

---

## 🏗️ System Architecture

TowerPulse operates on a multi-tiered pipeline designed for zero-latency UI updates and safe API rate-limiting:

1. **Hardware Edge Node (ESP32 / Arduino Uno):** Continuously measures perimeter distance using an ultrasonic sensor.
2. **Next.js Backend API (`/api/analyze-threat`):** Features an in-memory cache for instant dashboard polling (500ms intervals), an acoustic noise filter (ignoring micro-wobbles under 10cm), and a hard 16-second cooldown timer to strictly protect API quotas.
3. **Gemini Intelligence Layer (`gemini-3.6-flash`):** Evaluates physical clearance thresholds (e.g., objects closer than 30cm trigger a critical proximity alert) and generates automated incident logs.
4. **Command Center Dashboard:** A fully responsive Next.js frontend featuring live Recharts telemetry, Leaflet GIS mapping, hardware diagnostics, and a built-in simulation/auto-pilot demo mode.

---

## ✨ Key Features

* **Proximity Threat Detection:** Automatically flags critical security breaches when objects approach within 30cm of the sensor node.
* **Smart Rate-Limiting & Caching:** Prevents API throttling using persistent global state caching and intelligent request cooldowns.
* **Live GIS Mapping:** Integrates Leaflet with dark-mode vector tiles to track hardware nodes geographically across regional grids (e.g., Chennai deployment).
* **Developer Override & Auto-Pilot Mode:** Includes built-in software simulation controls and a one-click auto-pilot demo sequence for seamless presentation recording.
* **Unified Diagnostics:** Real-time monitoring tabs covering hardware health, UART serial bridges, and system audit logs.

---

## 🛠️ Tech Stack

* **Hardware:** ESP32 Wi-Fi Gateway, Arduino Uno, HC-SR04 Ultrasonic Sensor, SG90 Servo Actuator.
* **Backend & API:** Next.js (App Router), TypeScript, Google GenAI SDK (`gemini-3.6-flash`).
* **Frontend & UI:** Tailwind CSS, Lucide React Icons, Recharts, React-Leaflet.

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone [https://github.com/yashwanthvece2024-cpu/towerpulse.git](https://github.com/yashwanthvece2024-cpu/towerpulse.git)
cd towerpulse
