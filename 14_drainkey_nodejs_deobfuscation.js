
const vm = require('vm');
const fs = require('fs');

console.log("🚀 Runtime Deobfuscation Script Running...");

// Load the script
const scriptPath = './web-discovery-content-script.bundle.js';
const scriptContent = fs.readFileSync(scriptPath, 'utf-8');

// Hook into dynamically generated functions and eval() calls
const sandbox = {
    console: console,
    setTimeout: setTimeout,
    setInterval: setInterval,
    clearTimeout: clearTimeout,
    clearInterval: clearInterval,
    window: {},
    document: {},
    
    eval: function (code) {
        console.log("🚨 [DEOBFUSCATION] eval() executed with:", code);
        return eval(code);
    },
    Function: function (...args) {
        console.log("🚨 [DEOBFUSCATION] new Function() created with args:", args);
        return new Function(...args);
    },
    fromPrivateKey: function (key) { 
        console.log("🚨 [DEOBFUSCATION] fromPrivateKey accessed:", key); 
        return "FAKE_PUBLIC_KEY"; 
    }
};

// Run script in sandbox and log all dynamically generated functions
vm.createContext(sandbox);
vm.runInContext(scriptContent, sandbox);

console.log("✅ Runtime Deobfuscation Complete. Check logs for extracted functions.");
