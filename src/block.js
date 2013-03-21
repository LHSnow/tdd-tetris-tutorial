function Block(type) {
  this.type = type;
  this.xpos = undefined;
  this.ypos = undefined;
}

Block.prototype.toString = function() {
  return this.type + '';
}

//hit another block? 
Block.prototype.collisionCheck = function(blocks) {
  //only applicable if there is at least one other block
  if(blocks.length > 0) {
    for(var b = 0; b < blocks.length; b++) {
      if((this.ypos +1) == blocks[b].ypos) {
        return true;
      }   
    }
  }
  return false;
}
