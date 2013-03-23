function Board(width, height) {
  this.width = width;
  this.height = height;
  this.falling = null;
  this.blocks = new Array();
  this.matrix = new Array();
  for(var y = 0; y < height; y++) {
    this.matrix[y] = new Array(width);  
  }
}

Board.prototype.toString = function() {
  var str = "";
  
  if(this.hasFalling()) {
    if(this.falling.type) {
      //single block
      var x = this.falling.xpos;
      var y = this.falling.ypos;
      this.matrix[y][x] = this.falling;  
    } else {
      //multiple block shapes
      var pos = this.falling.blockPos();
      for(var i = 0; i < pos.length; i++) {
        var p = pos[i];
        this.matrix[p.ypos][p.xpos] = p;
      }
    }
  }
  for(var b = 0; b < this.blocks.length; b++) {
    var x = this.blocks[b].xpos;
    var y = this.blocks[b].ypos;
    this.matrix[y][x] = this.blocks[b];
  }
  
  for(var y = 0; y < this.height; y++) {
    for(var x = 0; x < this.width; x++) {
      var block = this.matrix[y][x];
      if(block == null) {
        str = str + ".";
      } else {
        str = str + block;
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
  if(this.hasFalling()) {
    throw "already falling";
  }
  
  //find horizontal centre of board
  var xOffset = Math.floor(this.width / 2);
  //single block
  this.falling = block;
  block.xpos = xOffset;
  block.ypos = 0;

}

Board.prototype.tick = function() {
  if(this.collisionCheck() || this.falling.collisionCheck(this.blocks)) {
    this.blocks.push(this.falling);
    this.falling = null;
  } else { 
    this.falling.moveDown();
  }
}
Board.prototype.collisionCheck = function() {
  //hit bottom of board?
  //compare to height - 1 as array is 0-indexed
  if(this.falling.ypos == (this.height -1)) {
    return true;
  }

  return false;
}
