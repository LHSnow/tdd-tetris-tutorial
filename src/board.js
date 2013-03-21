function Board(width, height) {
  this.width = width;
  this.height = height;
  this.falling = null;
  this.blocks = new Array();
}

Board.prototype.toString = function() {
  var str = "";
  var matrix = new Array(this.height);
  for(var y = 0; y < this.height; y++) {
    matrix[y] = new Array(this.width);
  }
  if(this.hasFalling()) {
    var x = this.falling.xpos;
    var y = this.falling.ypos;
    matrix[y][x] = this.falling;
  }
  for(var b = 0; b < this.blocks.length; b++) {
    var x = this.blocks[b].xpos;
    var y = this.blocks[b].ypos;
    matrix[y][x] = this.blocks[b];
  }
  
  for(var y = 0; y < this.height; y++) {
    for(var x = 0; x < this.width; x++) {
      var block = matrix[y][x];
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
