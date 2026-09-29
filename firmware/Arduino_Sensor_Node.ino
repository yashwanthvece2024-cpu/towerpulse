#include <Servo.h>

const int trigPin = 2;
const int echoPin = 3;
const int buzzerPin = 8;
const int servoPin = 9;

Servo doorServo;
unsigned long lastPingTime = 0; 

float filteredDistance = 0.0;
// Exponential Moving Average remains at 0.4 as required
const float alpha = 0.4; 

void setup() {
  Serial.begin(9600); 

  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(buzzerPin, OUTPUT);

  doorServo.attach(servoPin);
  doorServo.write(90); 
  delay(300);
  doorServo.detach(); 
}

void loop() {
  // 1. Process commands instantly
  if (Serial.available()) {
    String cmd = Serial.readStringUntil('\n');
    cmd.trim();

    if (cmd.length() > 0) {
      if (cmd == "BUZZ_ON") digitalWrite(buzzerPin, HIGH);
      else if (cmd == "BUZZ_OFF") digitalWrite(buzzerPin, LOW);
      else if (cmd == "OPEN") {
        doorServo.attach(servoPin);
        doorServo.write(0); 
        delay(200);
        doorServo.detach();
      } 
      else if (cmd == "LOCK") {
        doorServo.attach(servoPin);
        doorServo.write(90); 
        delay(200);
        doorServo.detach();
      }
    }
  }

  // 2. Ultra-Fast Acoustic Polling (40ms interval)
  if (millis() - lastPingTime >= 40) {
    lastPingTime = millis();

    digitalWrite(trigPin, LOW);
    delayMicroseconds(2);
    digitalWrite(trigPin, HIGH);
    delayMicroseconds(10);
    digitalWrite(trigPin, LOW);

    // CRITICAL HARDWARE FIX: 12000us timeout prevents the Arduino from freezing
    // This locks the max range to ~200cm but guarantees millisecond responsiveness
    long duration = pulseIn(echoPin, HIGH, 12000); 
    
    if (duration > 0) {
      int rawDistance = duration * 0.034 / 2;
      
      // Apply existing DSP filter
      if (filteredDistance == 0.0 || filteredDistance >= 999) {
        filteredDistance = rawDistance;
      } else {
        filteredDistance = (alpha * rawDistance) + ((1.0 - alpha) * filteredDistance);
      }
      
      int finalDistance = (int)filteredDistance;
      Serial.println(finalDistance);
      
    } else {
      // Hardware timeout
      filteredDistance = 999;
      Serial.println(999);
    }
  }
}