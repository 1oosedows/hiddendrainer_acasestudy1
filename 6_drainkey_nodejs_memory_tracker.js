
const vm = require('vm');
const fs = require('fs');
const v8 = require('v8');

console.log("🚀 Node.js Heap Memory Tracker Running...");

// Load the script
const scriptPath = './web-discovery-content-script.bundle.js';
const scriptContent = fs.readFileSync(scriptPath, 'utf-8');

// Enable heap snapshots
v8.writeHeapSnapshot('./heap_before.heapsnapshot');

// Create a sandbox for monitoring
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

    // Hook into private key handling to track memory usage
    fromPrivateKey: function (key) { 
        console.log("🚨 [MEMORY] fromPrivateKey accessed:", key); 
        return "FAKE_PUBLIC_KEY"; 
    },
    drainKeysFoundInLookupTable: function (state) { 
        console.log("🚨 [MEMORY] drainKeys scanning:", state); 
        return ["LEAKED_PRIVATE_KEY"]; 
    }
};

// Run script in sandbox
vm.createContext(sandbox);
vm.runInContext(scriptContent, sandbox);

// Force garbage collection and snapshot memory state after execution
global.gc();
v8.writeHeapSnapshot('./heap_after.heapsnapshot');

console.log("✅ Heap memory tracking complete. Compare 'heap_before' and 'heap_after' snapshots.");
