import dash
import dash_core_components as dcc
import dash_html_components as html
from dash.dependencies import Input, Output
import psutil
import time
import threading

# Start Dash app
app = dash.Dash(__name__)
app.layout = html.Div([
    html.H1("🚀 Forensic Security Dashboard"),
    dcc.Interval(id='interval-component', interval=5000, n_intervals=0),
    html.Div(id='live-update-text')
])

# Security monitoring function
def get_security_status():
    cpu_usage = psutil.cpu_percent()
    memory_usage = psutil.virtual_memory().used / (1024 * 1024)
    
    alerts = []
    if cpu_usage > 80:
        alerts.append(f"⚠️ High CPU usage detected: {cpu_usage}%")
    if memory_usage > 500:
        alerts.append(f"⚠️ High memory usage detected: {memory_usage}MB")
    
    running_processes = [proc.name() for proc in psutil.process_iter(['name'])]
    alerts.append(f"🖥️ Running Processes: {', '.join(running_processes[:10])}...")
    
    return "<br>".join(alerts)

# Update dashboard
def update_dashboard(n):
    return get_security_status()

app.callback(Output('live-update-text', 'children'), Input('interval-component', 'n_intervals'))(update_dashboard)

# Start forensic monitoring in a separate thread
def start_monitoring():
    app.run_server(debug=False, use_reloader=False)

threading.Thread(target=start_monitoring, daemon=True).start()
