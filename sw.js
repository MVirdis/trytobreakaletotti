if ('serviceWorker' in navigator) { // if browser supports
    navigator.serviceWorker.register("./sw.js").then((response)=>{
        console.log("Service worker successfully installed.");
        console.log("Scope of service worker: " + response.scope);
    }).catch((error) => {
        console.log("Error installing service worker");
    });
} else {
    console.log("Unsupported service workers");
}

self.addEventListener("fetch", function(event) {
    // Empty event listener for now
});

self.addEventListener("install", function(event) {
    // Empty installing phase for now
});
