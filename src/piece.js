function Piece(charMatrix) {
  this.width = charMatrix.indexOf("\n"); 
  
  var rows = charMatrix.split("\n");
  this.matrix = new Array(rows.length);
  
  for(var y = 0; y < rows.length; y++) {
    this.matrix[y] = new Array(this.width);
    for(var x = 0; x < this.width; x++) {
      this.matrix[y][x] = rows[y].charAt(x);
    }
  }
}

Piece.prototype.toString = function() {
  var str = "";
  for(var y = 0; y < this.width; y++) {
    for(var x = 0; x < this.width; x++) {
      str = str + this.matrix[y][x];
    }
    str = str + "\n";
  }
  return str;
}

Piece.prototype.rotateRight = function() {
  var n = this.width;
  var rot = new Array(this.width);
  for(var y = 0; y < n; y++) {
    rot[y] = new Array(n);
    for(var x = 0; x < n; x++) {
      rot[y][x] = this.matrix[n - x - 1][y];
    }
  }
  this.matrix = rot;
  
  return this;
}

Piece.prototype.rotateLeft = function() {
  var n = this.width;
  var rot = new Array(this.width);
  for(var y = 0; y < n; y++) {
    rot[y] = new Array(n);
    for(var x = 0; x < n; x++) {
      rot[y][x] = this.matrix[x][n - y - 1];
    }
  }
  this.matrix = rot;
  
  return this;
}
