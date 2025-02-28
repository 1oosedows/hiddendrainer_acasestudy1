
(function() {
    console.log("Sandbox Execution Started");

    // Hook into signTransaction
    const originalSignTransaction = window.signTransaction;
    window.signTransaction = function(transaction) {
        console.log("[HOOKED] signTransaction called with:", transaction);
        return originalSignTransaction(transaction);
    };

    // Hook into fromPrivateKey
    const originalFromPrivateKey = window.fromPrivateKey;
    window.fromPrivateKey = function(key) {
        console.log("[HOOKED] fromPrivateKey accessed:", key);
        return originalFromPrivateKey(key);
    };

    // Hook into sendTransaction
    const originalSendTransaction = window.sendTransaction;
    window.sendTransaction = function(transaction) {
        console.log("[HOOKED] sendTransaction called with:", transaction);
        return originalSendTransaction(transaction);
    };

    console.log("Hooks Installed. Awaiting Transactions...");
})();
