let bitstream = function(bytes) {
  
  this.buffer = new Uint8Array(bytes)
  
  
  this.bytenum = 0
  this.bitpos = 7
  
  this.bytesize = bytes
  
  this.write = function(bit) {
      
    //Set the bit to zero if not already
    //Note: See if you can use a XOR instead to reduce this to a single operation
    this.buffer[this.bytenum] -= this.buffer[this.bytenum] & (1<<this.bitpos)
    this.buffer[this.bytenum] += bit<<this.bitpos
   
    if (this.bitpos-- < 0) {
      this.bytenum++
      this.bitpos = 7
    }
    
    return;
  }
}
