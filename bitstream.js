let bitstream = function(buffer) {
   
  this.buffer = new Uint8Array(buffer);
  
  this.bytenum = 0;
  this.bitpos = 7;
    
  this.write = function(bit) {
      
    //Set the bit to zero if not already
    //Note: See if you can use a XOR instead to reduce this to a single operation. I don't think so.

    this.buffer[this.bytenum] -= this.buffer[this.bytenum] & (1<<this.bitpos);
    this.buffer[this.bytenum] += bit<<this.bitpos;
   
    this.bitpos--
    if (this.bitpos < 0) {
      this.bytenum++;
      this.bitpos = 7;
    }
        
    return;
  }
  
  
  this.read = function() {
    
    let res = this.buffer[this.bytenum] & (1<<this.bitpos);
    
    this.bitpos--
    if (this.bitpos < 0) {
      this.bytenum++;
      this.bitpos = 7;
    }
    
    if (res) {
      return 1;
    }
    return 0;
  }
  
  
  this.writepos = function(bit, bytenum, bitpos) {
    
    this.buffer[bytenum] -= this.buffer[bytenun] & (1<<bitpos);
    this.buffer[bytenum] += bit<<bitpos;
    
    return;
  }
  
  
  this.readpos = function(bytenum, bitpos) {
    if (this.buffer[bytenum] & (1<<bitpos)) {
      return 1;
    }
    return 0;
  }  
}
