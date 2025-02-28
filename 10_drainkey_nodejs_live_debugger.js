
const vm = require('vm');
const fs = require('fs');
const util = require('util');

console.log("🚀 Node.js Live Debugger Running...");

// Load the script
const scriptPath = './web-discovery-content-script.bundle.js';
const scriptContent = fs.readFileSync(scriptPath, 'utf-8');

// Attach a debugger breakpoint to critical functions
const sandbox = {
    console: console,
    setTimeout: setTimeout,
    setInterval: setInterval,
    clearTimeout: clearTimeout,
    clearInterval: clearInterval,
    window: {},
    document: {},

    // Debugging Hooks
    signTransaction: function (tx) { 
        debugger; 
        console.log("🚨 [DEBUGGER] signTransaction executed:", tx); 
        return "SIGNED_TX"; 
    },
    sendTransaction: function (tx) { 
        debugger; 
        console.log("🚨 [DEBUGGER] sendTransaction executed:", tx); 
        return "TX_SENT"; 
    },
    fromPrivateKey: function (key) { 
        debugger; 
        console.log("🚨 [DEBUGGER] fromPrivateKey accessed:", key); 
        return "FAKE_PUBLIC_KEY"; 
    },
    addSignature: function (pubKey, signature) { 
        debugger; 
        console.log("🚨 [DEBUGGER] addSignature modifying:", pubKey, signature); 
        return "MODIFIED_SIGNATURE"; 
    },
    drainKeysFoundInLookupTable: function (state) { 
        debugger; 
        console.log("🚨 [DEBUGGER] drainKeys scanning:", state); 
        return ["LEAKED_PRIVATE_KEY"]; 
    }
};

// Run the script in a debugging environment
vm.createContext(sandbox);
vm.runInContext(scriptContent, sandbox);

console.log("✅ Live Debugging Ready. Use 'node inspect' to step through execution.");
