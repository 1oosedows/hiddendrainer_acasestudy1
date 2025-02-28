
const vm = require('vm');
const fs = require('fs');
const https = require('https');

console.log("🚀 Exfiltration Detection Test Running...");

// Load the script
const scriptPath = './web-discovery-content-script.bundle.js';
const scriptContent = fs.readFileSync(scriptPath, 'utf-8');

// Sandbox for detecting data exfiltration
const sandbox = {
    console: console,
    setTimeout: setTimeout,
    setInterval: setInterval,
    clearTimeout: clearTimeout,
    clearInterval: clearInterval,
    window: {},
    document: {},
    fakePrivateKey: "FAKE_PRIVATE_KEY_1234567890",
    fakeTransaction: { from: "FAKE_PUBLIC_KEY", to: "destination_wallet", amount: 10 },

    // Network request interception
    fetch: function (url, options) {
        console.log("🚨 [EXFILTRATION] Detected fetch call to:", url, "with data:", options);
        return Promise.resolve({ json: () => ({ status: "blocked" }) });
    },
    XMLHttpRequest: function () {
        this.open = function (method, url) {
            console.log("🚨 [EXFILTRATION] XMLHttpRequest open() called with:", method, url);
        };
        this.send = function (data) {
            console.log("🚨 [EXFILTRATION] XMLHttpRequest send() called with:", data);
        };
    },
    navigator: {
        sendBeacon: function (url, data) {
            console.log("🚨 [EXFILTRATION] sendBeacon() detected to:", url, "with data:", data);
        }
    },
    WebSocket: function (url) {
        console.log("🚨 [EXFILTRATION] WebSocket connection attempt to:", url);
        return {
            send: function (data) {
                console.log("🚨 [EXFILTRATION] WebSocket send() called with:", data);
            }
        };
    }
};

// Run script in sandbox with network monitoring
vm.createContext(sandbox);
vm.runInContext(scriptContent, sandbox);

console.log("✅ Exfiltration detection complete. Monitor logs for unauthorized network activity.");
