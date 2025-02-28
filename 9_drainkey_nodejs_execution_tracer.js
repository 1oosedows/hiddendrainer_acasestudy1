
const vm = require('vm');
const fs = require('fs');

console.log("🚀 Execution Path Mapping Running...");

// Load the script
const scriptPath = './web-discovery-content-script.bundle.js';
const scriptContent = fs.readFileSync(scriptPath, 'utf-8');

// Execution trace sandbox
const sandbox = {
    console: console,
    setTimeout: setTimeout,
    setInterval: setInterval,
    clearTimeout: clearTimeout,
    clearInterval: clearInterval,
    window: {},
    document: {},

    // Hook into function execution to trace call stack
    traceFunction: function (funcName) {
        return function (...args) {
            console.log(`🚨 [TRACE] ${funcName} called with args:`, args);
            console.trace();
            return "TRACED_EXECUTION";
        };
    },

    signTransaction: function (tx) { return sandbox.traceFunction("signTransaction")(tx); },
    sendTransaction: function (tx) { return sandbox.traceFunction("sendTransaction")(tx); },
    fromPrivateKey: function (key) { return sandbox.traceFunction("fromPrivateKey")(key); },
    addSignature: function (pubKey, signature) { return sandbox.traceFunction("addSignature")(pubKey, signature); },
    drainKeysFoundInLookupTable: function (state) { return sandbox.traceFunction("drainKeysFoundInLookupTable")(state); }
};

// Run script in sandbox with execution tracing
vm.createContext(sandbox);
vm.runInContext(scriptContent, sandbox);

console.log("✅ Execution Path Mapping Complete. Check logs for full execution flow.");
