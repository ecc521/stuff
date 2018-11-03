self.addEventListener("fetch", fetchevent)

function fetchevent(event) {
    event.respondWith(
        (async function(){
            console.log(event)
            let url = event.request.url
            
            console.log(url)
            
            //Ignore requests for non manifests. In case registered in too high of a scope
            if (url.indexOf("/stuff/manifestcreator/manifest?") === -1) {
                console.warn("Ignored request for " + url)
                return fetch(event.request)    
            }
            
            if (event.request.method === "GET") {
            let manifest = url.slice(url.indexOf("?")+1)
            }
            else if (event.request.method === "POST") {
            console.log(event.request)
            
            }
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
