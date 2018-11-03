self.addEventListener("fetch", fetchevent)

function fetchevent(event) {
    event.respondWith(
        (async function(){

            
            //Ignore requests for non manifests. In case registered in too high of a scope
            if (event.request.url.indexOf("/stuff/manifestcreator/manifest?") === -1) {
                console.warn("ServiceWorker: Sent request for " + event.request.url + " to the network")
                return fetch(event.request)    
            }
            
            //Deal with IndexedDB prefixes. Arrrgh....
            self.indexedDB = self.indexedDB || self.webkitIndexedDB || self.mozIndexedDB || self.OIndexedDB || self.msIndexedDB
            self.IDBTransaction = self.IDBTransaction || self.webkitIDBTransaction || self.OIDBTransaction || self.msIDBTransaction
            
            let db = await new Promise(function(resolve,reject){
                let db = indexedDB.open("manifest", 1);
                            
                db.onsuccess = function(){
                    resolve(db.result)
                }
            
            })

            
            console.log(db)
            let trans = await db.transaction("manifest", "readonly");
            console.log(trans)
            let store = await trans.objectStore("manifest")
            console.log(store)               
            let manifest = await store.get("json")
            console.log(manifest)
                        
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
