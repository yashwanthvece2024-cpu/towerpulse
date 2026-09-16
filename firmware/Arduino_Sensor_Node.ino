#include <Servo.h>

const int trigPin = 2;
const int echoPin = 3;
const int buzzerPin = 8;
const int servoPin = 9;

Servo lockServo;

// DSP Filter Variables
const int numReadings = 5;
int readings[numReadings];
int readIndex = 0;
long total = 0;

// High-speed non-blocking timer
unsigned long lastTransmitTime = 0;
const int transmitInterval = 250; // Send data to ESP32 every 250ms (4x faster)

void setup() {
  Serial.begin(115200);
  
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(buzzerPin, OUTPUT);
  
  lockServo.attach(servoPin);
  lockServo.write(0);

  for (int i = 0; i < numReadings; i++) readings[i] = 0;
}

void loop() {
  long duration, rawDistance;
  
  // Fire Ultrasonic Pulse
  digitalWrite(trigPin, LOW); delayMicroseconds(2);
  digitalWrite(trigPin, HIGH); delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  // FIX 1: Add a 30,000 microsecond timeout. 
  // If no echo is heard within ~5 meters, abort instantly to prevent freezing.
  duration = pulseIn(echoPin, HIGH, 30000); 
  
  // Handle lost signals (if duration is 0, the pulse timed out)
  if (duration == 0) {
    rawDistance = 400; // Default to maximum safe distance to prevent false alarms
  } else {
    rawDistance = duration * 0.034 / 2;
  }

  // Execute DSP Moving Average Filter (Runs at maximum speed)
  total = total - readings[readIndex];
  readings[readIndex] = rawDistance;
  total = total + readings[readIndex];
  readIndex = (readIndex + 1) % numReadings;
  int filteredDistance = total / numReadings;

  // Autonomous Hardware Actuation (Reacts instantly)
  if (filteredDistance > 30 && filteredDistance < 350) { 
    lockServo.write(90);
    digitalWrite(buzzerPin, HIGH);
  } else {
    lockServo.write(0);
    digitalWrite(buzzerPin, LOW);
  }
  
  // FIX 2: Non-blocking transmission. 
  // Updates the dashboard 4x a second without pausing the sensor loop.
  if (millis() - lastTransmitTime >= transmitInterval) {
    Serial.print("DIST:");
    Serial.println(filteredDistance);
    lastTransmitTime = millis();
  }

  // FIX 3: Give the acoustic echoes 50ms to settle down before firing the next ping
  delay(50); 
}