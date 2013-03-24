function Board(height, width) {
  this.width = width + 2;
  this.height = height + 2;
  this.falling = null;
  this.fallX = 0;
  this.fallY = 0;
  this.matrix = new Array(this.height);
  for(var y = 0; y < this.height; y++) {
    this.matrix[y] = new Array(this.width);
    for(var x = 0; x < this.width; x++) {
      if(y == 0 || x == 0 || y == this.height -1 || x == this.width -1) {
        //add wall block
        this.matrix[y][x] = new Block("+");
      }  
    }
  }
}

Board.prototype.toString = function() {
  var str = "";
  
  //ignore walls in string representation
  for(var y = 1; y < this.height -1; y++) {
    for(var x = 1; x < this.width -1; x++) {
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

//returns a Block if there is a falling one at absolute board position y,x
//null otherwise
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

//true if there is currently a falling piece (or block)
Board.prototype.hasFalling = function() {
  return this.falling != null;
}

//spawn a new piece/block/tetromino onto the board
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
  this.fallY = 1;
}

Board.prototype.tick = function() {
  if(this.floorCollision() || this.blockCollision("down")) {
    this.lockFalling();
  } else { 
    this.fallY++;
  }
}


// Locks falling blocks into place by moving their indivudual blocks to this.matrix
Board.prototype.lockFalling = function() {
  var x = this.fallX;
  var y = this.fallY;
  if(this.falling.size > 1) {
    for(var b = 0; b < this.falling.blocks.length; b++) {
      var block = this.falling.blocks[b];
      this.matrix[y+block.ypos][x+block.xpos] = block;
    }
  } else {
    this.matrix[y][x] = this.falling;
  }
  this.falling = null;
}

//move currently falling piece to the left
Board.prototype.moveLeft = function() {
  //avoid hitting left wall
  if(!this.leftWallCollision() && !this.blockCollision("left")) {
    this.fallX--;
  }
}

//move currently falling piece to the right
Board.prototype.moveRight = function() {
  if(!this.rightWallCollision() && !this.blockCollision("right")) {
    this.fallX++;
  }
}

//move currently falling piece down (as tick)
Board.prototype.moveDown = function() {
  this.tick();
}

Board.prototype.rotateRight = function() {
  //"try"
  this.falling.rotateRight();
  if(this.leftWallCollision() || this.rightWallCollision()) {
    this.falling.rotateLeft();
  }
}

Board.prototype.rotateLeft = function() {
  //"try"
  this.falling.rotateLeft();
  if(this.leftWallCollision() || this.rightWallCollision()) {
    this.falling.rotateRight();
  }
}

//true if currently falling piece has a block directly above the board floor
Board.prototype.floorCollision = function() {
  for(var x = 0; x < this.width; x++) {
    if(this.fallingBlockAt(this.height-1,x) != null) {
      return true;
    }
  }

  return false;
}

//true if currently falling piece has a block directly to the right of the left wall
Board.prototype.leftWallCollision = function() {
  for(var y = 0; y < this.height; y++) {
    if(this.fallingBlockAt(y,0) != null) {
      return true;
    }
  }
  return false;
}

//true if currently falling piece has a block directly to the left of the right wall
Board.prototype.rightWallCollision = function() {
  for(var y = 0; y < this.height; y++) {
    if(this.fallingBlockAt(y,this.width-1) != null) {
      return true;
    }
  }
  return false;
}

//true if there is a fixed block in arg:direction of a falling block
Board.prototype.blockCollision = function(direction) {
  //iterate over all fixed blocks
  for(var y = 0; y < this.height; y++) {
    for(var x = 0; x < this.width; x++) {
      var fixedBlock = this.matrix[y][x];
      if(fixedBlock) {
        var fallingBlock;
        //check if a falling block is beside a fixed block in provided direction
        switch(direction) {
          case "left" : fallingBlock = this.fallingBlockAt(y,x+1); break;
          case "right" : fallingBlock = this.fallingBlockAt(y,x-1); break;
          case "down" : //falls through to default
            default : fallingBlock = this.fallingBlockAt(y-1,x); //down
        }
        if(fallingBlock != null) {
          return true;
        }
      }  
    }
  }
  return false;
}
