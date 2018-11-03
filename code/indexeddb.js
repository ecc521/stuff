//Deal with prefixes
window.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.OIDBTransaction || window.msIDBTransaction


window.idb = {};

(async function(){
    
    
    let _db = new Promise(function(resolve,reject){
        
        let store = indexedDB.open("storage", 1);   
        
        store.onupgradeneeded = function(){
            let db = event.target.result;
            db.createObjectStore("data", { keyPath: "key" });
        }
        
        store.onsuccess = function(){
            resolve(db.result)
        }
        
    })    
    

    
    
    
    window.idb.prep = async function(){await _db}
    
    window.idb.set = async function(key, value) {
        let trans = _db.transaction("storage", "readwrite")
        let store = transaction.objectStore("data");
        
        let request = objectStore.put(value, key);

        
        return request
    }
    
    



}());
