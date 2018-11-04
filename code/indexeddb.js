//Deal with prefixes
window.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.OIDBTransaction || window.msIDBTransaction


window.idb = {};

//We need to defind loader so that appendto.new can be set.
let loader = function(appendto){

    if (!appendto || typeof appendto !== "object") {
        throw new Error("You must pass an object as parameter number 1. The methods will be added to that object.")
    }
    
    appendto.new = loader //Store the original creation function. If we don't, we won't be able to clone the object due to private variables

    let _db; //We can only declare private variables at objects creation
    
    appendto.loaddb = async function(dbname){
        _db = await new Promise(function(resolve,reject){
        
            let store = indexedDB.open(dbname, 1);   

            store.onupgradeneeded = function(){
                let db = event.target.result;
                db.createObjectStore("data", { keyPath: "key" });
            }

            store.onsuccess = function(){
                resolve(store.result)
            }
        
        })          
    }
    
    appendto.deletedb = async function(dbname){
        let request = indexedDB.deleteDatabase(dbname);
        
        return new Promise(function(resolve,reject){
            request.onsuccess = resolve
            request.onerror = reject
        })
    }
    
    
    appendto.setitem = async function(key, value) {
        let trans = _db.transaction("data", "readwrite")
        let store = trans.objectStore("data");
        
        //It's an objectStore, so lets make an object
        let obj = {key:key,value:value}
        
        let request = store.put(obj);
        
        return new Promise(function(resolve, reject){
            request.onsuccess = resolve
            request.onerror = reject
        }) 
    }
    
    appendto.getitem = async function(key) {
        let trans = _db.transaction("data", "readonly")
        let store = trans.objectStore("data");
        
        let request = store.get(key)
        
        return new Promise(function(resolve, reject){
            
            request.onsuccess = function(){
                //Check that the value exists
                if(request.result) {
                    resolve(request.result.value)   
                }
                else {resolve(null)} //Return null if doesn't exist
            }
            
            request.onerror = reject
        }) 
    }
    
    appendto.deleteitem = async function(key) {
        let trans = _db.transaction("data", "readwrite")
        let store = trans.objectStore("data");
        
        let request = store.delete(key)
        
        
        return new Promise(function(resolve, reject){
            request.onsuccess = resolve
            request.onerror = reject
        }) 
    }
    



};
