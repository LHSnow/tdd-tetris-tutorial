function Tetromino(shape) {
  this.shape = shape;
  this.shape.freeze;
  
  switch(shape) {
    case "T" : this.piece = new Piece("" +
                    ".T.\n" +
                    "TTT\n" +
                    "...\n");
  }
}

Tetromino.prototype.toString = function() {
  return this.piece.toString();
}

Tetromino.prototype.rotateLeft = function() {
  this.piece.rotateLeft();
  return this;
}

Tetromino.prototype.rotateRight = function() {
  this.piece.rotateRight();
  return this;
}
