
const v8 = require('v8');
const fs = require('fs');

console.log("🚀 Native Memory Monitoring Running...");

// Capture initial heap snapshot
v8.writeHeapSnapshot('./heap_initial.heapsnapshot');

// Overwrite cryptographic memory allocations
const sandbox = {
    console: console,
    Buffer: {
        from: function(data) {
            console.log("🚨 [MEMORY MONITOR] Buffer allocated:", data);
            return Buffer.from(data);
        }
    },
    Uint8Array: class extends Uint8Array {
        constructor(...args) {
            super(...args);
            console.log("🚨 [MEMORY MONITOR] Uint8Array allocated:", this);
        }
    }
};

// Load the script
const vm = require('vm');
const scriptPath = './web-discovery-content-script.bundle.js';
const scriptContent = fs.readFileSync(scriptPath, 'utf-8');

// Run script in sandboxed memory monitoring mode
vm.createContext(sandbox);
vm.runInContext(scriptContent, sandbox);

// Capture heap snapshot after execution
global.gc();
v8.writeHeapSnapshot('./heap_final.heapsnapshot');

console.log("✅ Memory monitoring complete. Compare 'heap_initial' vs 'heap_final' for sensitive data retention.");
