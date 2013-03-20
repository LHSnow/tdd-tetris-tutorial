function Board(width, height) {
  this.width = width;
  this.height = height;
  this.falling = null;
  this.blocks = new Array();
}

Board.prototype.toString = function() {
  var str = "";
  for(var y = 0; y < this.height; y++) {
    for(var x = 0; x < this.width; x++) {
      var block = undefined;
      for(var b = 0; b < this.blocks.length; b++) {
        if((y == this.blocks[b].ypos) && (x == this.blocks[b].xpos)) {
          block = this.blocks[b];
          break;
        }
      }
      if(block) {
        str = str + block;
      } else {
        str = str + ".";
      }
    }
    str = str + "\n";
  }
  return str;
}

Board.prototype.hasFalling = function() {
  return this.falling != null;
}

Board.prototype.drop = function(block) {
  //at most one block may be falling at the same time
  if(this.falling) {
    throw "already falling";
  }
  this.falling = block;
  this.blocks.push(block);
  //find horizontal centre of board
  var x = Math.floor(this.width / 2);
  block.xpos = x;
  block.ypos = 0;
}

Board.prototype.tick = function() {
  //compare to height - 1 as array is 0-indexed
  if(!this.collisionCheck()) {
    this.falling.ypos++;
  } else { 
    this.falling = undefined;
  }
}

Board.prototype.collisionCheck = function() {
  //hit bottom of board?
  if(this.falling.ypos == (this.height -1)) {
    return true;
  }
  //hit another block?
  //(only applicable if there is at least two blocks on board)
  if(this.blocks.length > 1) {
    for(var b = 0; b < this.blocks.length; b++) {
      if((this.falling.ypos +1) == this.blocks[b].ypos) {
        return true;
      }   
    }
  }
  //hit neither
  return false;
}
