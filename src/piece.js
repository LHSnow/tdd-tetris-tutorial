//Requires block.js

function Piece(charMatrix) {
  this.size = charMatrix.indexOf("\n");
  this.blocks = new Array();
  
  var rows = charMatrix.split("\n");
  
  for(var y = 0; y < this.size; y++) {
    for(var x = 0; x < this.size; x++) {
      var type = rows[y].charAt(x);
      if(type != ".") {
        var block = new Block(type);
        block.xpos = x;
        block.ypos = y;
        this.blocks.push(block);
      }
    }
  }
}

Piece.prototype.toString = function() {
  var str = "";
  for(var y = 0; y < this.size; y++) {
    for(var x = 0; x < this.size; x++) {
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

Piece.prototype.rotateRight = function() {
  this.rotate(true);
  return this;
}

Piece.prototype.rotateLeft = function() {
  this.rotate(false);
  return this;
}

//adapted from http://stackoverflow.com/questions/42519/how-do-you-rotate-a-two-dimensional-array/193942#193942
Piece.prototype.rotate = function(clockwise) {
  var n = this.size;
  for(var b = 0; b < this.blocks.length; b++) {
    var x = this.blocks[b].xpos;
    var y = this.blocks[b].ypos;
    if(clockwise) {
      this.blocks[b].ypos = x;
      this.blocks[b].xpos = n - y - 1;
    } else {
      this.blocks[b].ypos = n - x - 1;
      this.blocks[b].xpos = y;
    }
  }
  return this;
}
