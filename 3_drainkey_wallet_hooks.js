
(function() {
    console.log("🚀 Sandbox Hooking Started");

    // Hook into signTransaction
    const originalSignTransaction = window.signTransaction;
    window.signTransaction = function(transaction) {
        console.log("🚨 [HOOKED] signTransaction called with:", transaction);
        return originalSignTransaction(transaction);
    };

    // Hook into fromPrivateKey
    const originalFromPrivateKey = window.fromPrivateKey;
    window.fromPrivateKey = function(key) {
        console.log("🚨 [HOOKED] fromPrivateKey accessed:", key);
        return originalFromPrivateKey(key);
    };

    // Hook into sendTransaction
    const originalSendTransaction = window.sendTransaction;
    window.sendTransaction = function(transaction) {
        console.log("🚨 [HOOKED] sendTransaction called with:", transaction);
        return originalSendTransaction(transaction);
    };

    // Hook into drainKeysFoundInLookupTable (highly suspicious function)
    const originalDrainKeys = window.drainKeysFoundInLookupTable;
    window.drainKeysFoundInLookupTable = function(state) {
        console.log("🚨 [HOOKED] drainKeysFoundInLookupTable scanning:", state);
        return originalDrainKeys(state);
    };

    // Hook into addSignature
    const originalAddSignature = window.addSignature;
    window.addSignature = function(publicKey, signature) {
        console.log("🚨 [HOOKED] addSignature modifying:", publicKey, signature);
        return originalAddSignature(publicKey, signature);
    };

    console.log("✅ Hooks Installed. Monitoring for suspicious activity...");
})();
