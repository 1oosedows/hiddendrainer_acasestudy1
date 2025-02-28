
import psutil
import time
import json

print("🚀 Continuous Python Security Monitor Running...")

# Thresholds for detecting anomalies
CPU_THRESHOLD = 80  # Percentage CPU usage limit
MEMORY_THRESHOLD = 500  # MB of memory usage limit

# Monitoring loop
while True:
    time.sleep(5)  # Check every 5 seconds

    # Capture CPU and memory usage
    cpu_usage = psutil.cpu_percent(interval=1)
    memory_usage = psutil.virtual_memory().used / (1024 * 1024)  # Convert to MB

    # Check if usage exceeds thresholds
    alert = {}
    if cpu_usage > CPU_THRESHOLD:
        alert['CPU_Overuse'] = f"High CPU usage detected: {cpu_usage}%"

    if memory_usage > MEMORY_THRESHOLD:
        alert['Memory_Overuse'] = f"High memory usage detected: {memory_usage}MB"

    # Log if anomaly detected
    if alert:
        with open("security_alerts.log", "a") as log_file:
            log_file.write(json.dumps(alert) + "\n")
        print(f"🚨 [ALERT] {json.dumps(alert)}")

    print(f"✅ CPU: {cpu_usage}%, Memory: {memory_usage}MB")
