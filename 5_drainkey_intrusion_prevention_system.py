
import psutil
import time
import os

print("🚀 Intrusion Prevention System (IPS) Running...")

# Thresholds for detection
CPU_THRESHOLD = 90  # Percentage CPU usage limit
MEMORY_THRESHOLD = 600  # MB of memory usage limit

# Known malicious process keywords
SUSPICIOUS_PROCESSES = ["node", "python", "chrome", "firefox", "phantomjs"]

def terminate_process(proc):
    try:
        proc.terminate()
        print(f"🚨 [IPS] Terminated suspicious process: {proc.name()} (PID: {proc.pid})")
    except Exception as e:
        print(f"⚠️ [IPS] Failed to terminate {proc.name()} (PID: {proc.pid}): {e}")

# Monitoring loop
while True:
    time.sleep(3)  # Check every 3 seconds

    # Capture CPU and memory usage
    cpu_usage = psutil.cpu_percent(interval=1)
    memory_usage = psutil.virtual_memory().used / (1024 * 1024)  # Convert to MB

    # Check if usage exceeds thresholds
    if cpu_usage > CPU_THRESHOLD or memory_usage > MEMORY_THRESHOLD:
        print(f"🚨 [IPS] High resource usage detected! CPU: {cpu_usage}%, Memory: {memory_usage}MB")

    # Scan running processes
    for proc in psutil.process_iter(['pid', 'name']):
        if any(keyword in proc.info['name'].lower() for keyword in SUSPICIOUS_PROCESSES):
            terminate_process(proc)
