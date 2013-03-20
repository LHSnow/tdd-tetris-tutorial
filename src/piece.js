//Requires block.js

function Piece(charMatrix) {
  this.width = charMatrix.indexOf("\n"); 
  
  var rows = charMatrix.split("\n");
  this.matrix = new Array(rows.length);
  
  for(var y = 0; y < rows.length; y++) {
    this.matrix[y] = new Array(this.width);
    for(var x = 0; x < this.width; x++) {
      var type = rows[y].charAt(x);
      if(type == '.') {
        this.matrix[y][x] = null;
      } else {
        this.matrix[y][x] = new Block(type); 
      }
    }
  }
}

Piece.prototype.toString = function() {
  var str = "";
  for(var y = 0; y < this.width; y++) {
    for(var x = 0; x < this.width; x++) {
      if(this.matrix[y][x] == null) {
        str = str + '.';
      } else { 
        str = str + this.matrix[y][x];
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

Piece.prototype.rotate = function(clockwise) {
  var n = this.width;
  var rot = new Array(this.width);
  for(var y = 0; y < n; y++) {
    rot[y] = new Array(n);
    for(var x = 0; x < n; x++) {
      if(clockwise) {
        rot[y][x] = this.matrix[n - x - 1][y];
      } else {
        rot[y][x] = this.matrix[x][n - y - 1];
      }
    }
  }
  this.matrix = rot;
  
  return this;
}
