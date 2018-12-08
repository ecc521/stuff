  let compress = function(arr) {
    
    let dict = {}
    let size = 256    
    
    for (let i=0;i<256;i++) {
      dict[String.fromCharCode(i)] = i
    }
    
    
    let res = []
    
    
    let p = String.fromCharCode(arr[0])
    
    for (let pos = 1;pos< arr.length;pos++) {
      c = String.fromCharCode(arr[pos])
      
      let pc = p+c
      
      if (dict[pc] !== undefined) {
        p = pc
      }
      else {
        res.push(dict[p])
        dict[pc] = size++
        p = c
      }
    }
    
    res.push(dict[p])
    return res
  }




  
  let decompress = function(arr) {
        
        let dict = []
        for (let i = 0; i < 256; i++) {
            dict[i] = String.fromCharCode(i)
        }   
    
        let w
        let res
        let c
        let add = ""
        let size = 256
 
        w = dict[arr[0]];
        res = w
    
        for (i = 1; i < arr.length; i++) {
          c = dict[arr[i]]
          if (c) {
            add = c
          } 
          else {
            if (arr[i] === size) {
              add = w + w[0]
            } 
            else {
              throw "Malformed Data. The dictionary size attempted to increase by " + (arr[i] - size)
            }
          }
 
          res += add
          dict[size++] = w + add[0] 
          w = add
      }
      return res
    }
