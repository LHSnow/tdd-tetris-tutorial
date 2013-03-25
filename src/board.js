function Board(height, width) {
  this.width = width + 2;
  this.height = height + 2;
  this.falling = null;
  this.lastCleared = null;
  this.totalScore = 0;
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

//create a board with pre-fixed blocks from a string representation
//@param charMatrix should not contain walls
//utility method to ease testing (and possible b-mode and saved games)
Board.prototype.fromString = function(charMatrix) {
  var height = charMatrix.indexOf("\n");
  var rows = charMatrix.split("\n");
  
  for(var y = 0; y < height; y++) {
    for(var x = 0; x < rows[y].length; x++) {
      var type = rows[y].charAt(x);
      if(type != ".") {
        this.matrix[y+1][x+1] = new Block(type);
      }
    }
  }
}

//returns a Block if there is a falling one at absolute board position y,x
//null otherwise
Board.prototype.fallingBlockAt = function(y,x) {
  if(!this.hasFalling()) {
    return null;
  }
  return this.falling.blockAt(y-this.fallY,x-this.fallX);
}

//true if there is currently a falling piece (or block)
Board.prototype.hasFalling = function() {
  return this.falling != null;
}

//spawn a new piece/block/tetromino onto the board
Board.prototype.drop = function(piece) {
  //at most one block may be falling at the same time
  if(this.hasFalling()) {
    throw "already falling";
  }
  
  //find horizontal centre of board
  var xOffset = Math.floor(this.width / 2) - Math.floor(piece.size / 2);
  //single block
  this.falling = piece;
  this.fallX = xOffset;
  this.fallY = 1;
}

Board.prototype.tick = function() {
  this.fallY++;
  if(this.collision()) {
    this.fallY--; //undo
    this.lockFalling();
    this.clear();
    this.score();
  }
}

//hard drop brings current falling piece to the bottom
Board.prototype.fall = function() {
  while(this.hasFalling()) {
    this.tick();
  }
}

// Locks falling blocks into place by moving their indivudual blocks to this.matrix
Board.prototype.lockFalling = function() {
  var x = this.fallX;
  var y = this.fallY;
  for(var b = 0; b < this.falling.blocks.length; b++) {
    var block = this.falling.blocks[b];
    this.matrix[y+block.ypos][x+block.xpos] = block;
  }
  
  this.falling = null;
}

Board.prototype.clear = function() {
  var rows = this.fullRows();
  if(rows.length > 0) {
    var emptyRow = new Array(this.width);
    emptyRow[0] = new Block("+");
    emptyRow[this.width-1] = new Block("+");
  }
  for(var i = 0; i < rows.length; i++) {
    //add 1 to the row index for every row already removed,
    //as one row is replaced for each removal
    this.matrix.splice(rows[i] + i, 1);
    this.matrix.splice(1, 0, emptyRow);
  }
  this.lastCleared = rows;
}

Board.prototype.score = function() {
  switch(this.lastCleared.length) {
    case 1 : this.totalScore += 1; break;
    case 2 : this.totalScore += 3; break;
    case 3 : this.totalScore += 5; break;
    case 4 : this.totalScore += 8; break;
  }
}

Board.prototype.fullRows = function() {
  var rowIndexes = new Array();
  //ignore first and last row
  for(var y = this.height -2; y > 0; y--) {
    //ignore walls
    var full = true;
    for(var x = 1; x < this.width -1 ; x++) {
      if(this.matrix[y][x] == undefined) {
        full = false; break;
      }
    }
    if(full) {
      rowIndexes.push(y);
    }
  }
  return rowIndexes;
}

//move currently falling piece to the left
Board.prototype.moveLeft = function() {
  this.fallX--;
  if(this.collision()) {
    //undo
    this.fallX++;
  }
}

//move currently falling piece to the right
Board.prototype.moveRight = function() {
  this.fallX++
  if(this.collision()) {
    //undo
    this.fallX--;
  }
}

//move currently falling piece down (as tick)
Board.prototype.moveDown = function() {
  this.tick();
}

Board.prototype.rotateRight = function() {
  //"try"
  this.falling.rotateRight();
  if(this.collision()) {
    //try wallkick (right first, then left as TGM)
    //note: both move actions contain their own collision checks and will undo themselves if illegal
    this.moveRight();
    this.moveLeft();
    if(this.collision()) {
      //undo
      this.falling.rotateLeft();
    }
  }
}

Board.prototype.rotateLeft = function() {
  //"try"
  this.falling.rotateLeft();
  if(this.collision()) {
    //try wallkick (right first, then left as TGM) 
    //note: both move actions contain their own collision checks and will undo themselves if illegal
    this.moveRight();
    this.moveLeft();
    if(this.collision()) {
      //undo
      this.falling.rotateRight();
    }
  }
}

//true if any falling block shares position with any fixed block, including board walls
Board.prototype.collision = function() {
  //iterate over area covered by the falling shape
  var xmax = this.fallX + this.falling.size;
  var ymax = this.fallY + this.falling.size;
  for(var y = this.fallY; y < ymax; y++) {
    for(var x = this.fallX; x < xmax; x++) {
      var fixedBlock = this.matrix[y][x];
      if(fixedBlock) {
        if(this.fallingBlockAt(y,x) != null) {
          return true;
        }
      }  
    }
  }
  return false;
}
