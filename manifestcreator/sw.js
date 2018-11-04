self.importScripts("https://ecc521.github.io/librarys/indexeddb.js")


function send_message_to_all_clients(msg){
    clients.matchAll().then(clients => {
        clients.forEach(client => {
            send_message_to_client(client, msg);
        })
    })
}

self.addEventListener("install", function(){self.skipWaiting()})
self.addEventListener("activate", function(){
    clients.claim()
    send_message_to_all_clients("scriptsloaded!")
})


self.addEventListener("fetch", fetchevent)

function fetchevent(event) {
    event.respondWith(
        (async function(){

            
            //Ignore requests for non manifests. In case registered in too high of a scope
            if (event.request.url.indexOf("/stuff/manifestcreator/manifest?") === -1) {
                console.warn("ServiceWorker: Sent request for " + event.request.url + " to the network")
                return fetch(event.request)    
            }
            
            let db = await lib.loaddb("manifest")
            let manifest = await db.get("json")
                        
            let headers = new Headers()
            headers.set('Content-Type', 'application/json');
            headers.set('Access-Control-Allow-Origin', '*');
            headers.set('Cache-Control', 'no-cache');
            headers.set('Strict-Transport-Security', 'max-age=60; includeSubDomains');
            
            let options = {
                status:200,
                statusText:"OK",
                headers: headers
            }
            
            return new Response(manifest, options)
        }())
    )
}
