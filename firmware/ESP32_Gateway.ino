#include <WiFi.h>
#include <HTTPClient.h>

// ESP32 Hardware Serial 2 definitions
#define RXp2 16
#define TXp2 17

const char* ssid = "POCO M6 Pro 5G";         // Replace with your Wi-Fi name
const char* password = "yash2607"; // Replace with your Wi-Fi password

// Your Next.js local network endpoint
const char* serverName = "http://10.171.109.56:3000/api/analyze-threat";

void setup() {
  Serial.begin(115200);                      // USB Serial Monitor for debugging
  Serial2.begin(115200, SERIAL_8N1, RXp2, TXp2); // UART link from Arduino

  WiFi.begin(ssid, password);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWi-Fi Connected successfully!");
}

void loop() {
  // Listen for serial data coming from the Arduino Uno
  if (Serial2.available()) {
    String data = Serial2.readStringUntil('\n');
    data.trim();

    if (data.startsWith("DIST:")) {
      int distance = data.substring(5).toInt();
      Serial.println("Sensor Telemetry -> Distance: " + String(distance) + " cm");

      // Push JSON payload over Wi-Fi to Next.js API route
      if (WiFi.status() == WL_CONNECTED) {
        HTTPClient http;
        http.begin(serverName);
        http.addHeader("Content-Type", "application/json");

        String jsonPayload = "{\"node\":\"CT-004\", \"distance\":" + String(distance) + "}";
        int httpResponseCode = http.POST(jsonPayload);

        Serial.print("Next.js Server Response: ");
        Serial.println(httpResponseCode);
        http.end();
      }
    }
  }
}