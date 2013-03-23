function Board(width, height) {
  this.width = width;
  this.height = height;
  this.falling = null;
  this.blocks = new Array();
  this.matrix = new Array(height);
  for(var y = 0; y < height; y++) {
    this.matrix[y] = new Array(width);  
  }
}

Board.prototype.toString = function() {
  var str = "";
  
  for(var y = 0; y < this.height; y++) {
    for(var x = 0; x < this.width; x++) {
      var block = this.matrix[y][x];
      if(this.hasFalling() && this.falling.xpos == x && this.falling.ypos == y) {
        str = str + this.falling;
      } else if(block == undefined) {
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
  if(this.boardCollision() || this.blockCollision()) {
    var x = this.falling.xpos;
    var y = this.falling.ypos;
    this.matrix[y][x] = this.falling;
    this.falling = null;
  } else { 
    this.falling.moveDown();
  }
}
Board.prototype.boardCollision = function() {
  //hit bottom of board?
  //compare to height - 1 as array is 0-indexed
  if(this.falling.ypos == (this.height -1)) {
    return true;
  }

  return false;
}

Board.prototype.blockCollision = function() {
  var x = this.falling.xpos;
  var y = this.falling.ypos;
  if(this.matrix[y+1][x]) {
    return true;
  }
  return false;
}
