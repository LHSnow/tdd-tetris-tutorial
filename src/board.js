function Board(width, height) {
  this.width = width;
  this.height = height;
  this.falling = new Array();
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
  return this.falling.length > 0;
}

Board.prototype.drop = function(piece) {
  //at most one block may be falling at the same time
  if(this.hasFalling()) {
    throw "already falling";
  }
  
  //find horizontal centre of board
  var xOffset = Math.floor(this.width / 2);
  if(piece.blocks) {
    //multiple-block pieces have blocks defined
    for(var b = 0; b < piece.blocks.length; b++) {
      var block = piece.blocks[b];
      this.falling.push(block);
      this.blocks.push(block);
      block.xpos = block.xpos + xOffset;
    }
  } else {
    //single block
    var block = piece;
    this.falling.push(block);
    this.blocks.push(block);
    block.xpos = xOffset;
    block.ypos = 0;
  }
  
}

Board.prototype.tick = function() {
  if(!this.collisionCheck()) {
    for(var b = 0; b < this.falling.length; b++) {
      this.falling[b].ypos++;
    }
  } else { 
    this.falling.length = 0;
  }
}
Board.prototype.collisionCheck = function() {
  for(var f = 0; f < this.falling.length; f++) {
    //hit bottom of board?
    //compare to height - 1 as array is 0-indexed
    if(this.falling[f].ypos == (this.height -1)) {
      return true;
    }
    //hit another block?
    //(only applicable if there is at least two blocks on board)
    if(this.blocks.length > 1) {
      for(var b = 0; b < this.blocks.length; b++) {
        if((this.falling[f].ypos +1) == this.blocks[b].ypos) {
          return true;
        }   
      }
    }
  }
  
  //hit neither
  return false;
}
