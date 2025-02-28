
const vm = require('vm');
const fs = require('fs');

console.log("🚀 Node.js Function Tracer Running...");

// Load the script
const scriptPath = './web-discovery-content-script.bundle.js';
const scriptContent = fs.readFileSync(scriptPath, 'utf-8');

// Function to wrap and trace all function calls
function traceFunctionCalls(obj, functionName) {
    if (typeof obj[functionName] === 'function') {
        const originalFunction = obj[functionName];
        obj[functionName] = function (...args) {
            console.log(`🚨 [TRACE] ${functionName} called with args:`, args);
            const result = originalFunction.apply(this, args);
            console.log(`✅ [TRACE] ${functionName} returned:`, result);
            return result;
        };
    }
}

// Create a deep sandbox environment with tracing hooks
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
    
    // Hooked functions
    signTransaction: function (tx) { console.log("🚨 [TRACE] signTransaction called:", tx); return "SIGNED_TX"; },
    sendTransaction: function (tx) { console.log("🚨 [TRACE] sendTransaction called:", tx); return "TX_SENT"; },
    fromPrivateKey: function (key) { console.log("🚨 [TRACE] fromPrivateKey accessed:", key); return "FAKE_PUBLIC_KEY"; },
    drainKeysFoundInLookupTable: function (state) { console.log("🚨 [TRACE] drainKeys scanning:", state); return ["LEAKED_PRIVATE_KEY"]; },
    addSignature: function (pubKey, signature) { console.log("🚨 [TRACE] addSignature modifying:", pubKey, signature); return "MODIFIED_SIGNATURE"; },
};

// Run the script in the sandbox
vm.createContext(sandbox);
vm.runInContext(scriptContent, sandbox);

// Attach tracing to all defined functions in the script
Object.keys(sandbox).forEach(func => traceFunctionCalls(sandbox, func));

console.log("✅ Node.js Execution Tracer Running... Monitoring all function calls.");
