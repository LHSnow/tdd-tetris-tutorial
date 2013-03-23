function Board(height, width) {
  this.width = width;
  this.height = height;
  this.falling = null;
  this.fallX = 0;
  this.fallY = 0;
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
      var fallingBlock = this.fallingBlockAt(y,x);
      if(fallingBlock != null) {
        str = str + fallingBlock;
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

Board.prototype.fallingBlockAt = function(y,x) {
  if(!this.hasFalling()) {
    return null;
  }
  if(this.falling.size == 1) {
    if(this.fallX == x && this.fallY == y) {
      return this.falling;
    } else {
      return null;
    }
  } else {
    return this.falling.blockAt(y-this.fallY,x-this.fallX);
  }
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
  var xOffset = Math.floor(this.width / 2) - Math.floor(block.size / 2);
  //single block
  this.falling = block;
  this.fallX = xOffset;
  this.fallY = 0;
}

Board.prototype.tick = function() {
  if(this.boardCollision() || this.blockCollision()) {
    var x = this.fallX;
    var y = this.fallY;
    this.matrix[y][x] = this.falling;
    this.falling = null;
  } else { 
    this.fallY++;
  }
}
Board.prototype.boardCollision = function() {
  //hit bottom of board?
  //compare to height - 1 as array is 0-indexed
  if(this.fallY == (this.height -1)) {
    return true;
  }

  return false;
}

Board.prototype.blockCollision = function() {
  var x = this.fallX;
  var y = this.fallY;
  if(this.matrix[y+1][x]) {
    return true;
  }
  return false;
}
