function Tetromino(shape) {
  this.shape = shape;
  this.shape.freeze;
  
  switch(shape) {
    case "T" : this.piece = new Piece("" +
                    ".T.\n" +
                    "TTT\n" +
                    "...\n"); 
                    break;
    case "I" : this.piece = new Piece("" +
                    "....\n" +
                    "IIII\n" +
                    "....\n" +
                    "....\n"); 
                    break;
    case "O" : this.piece = new Piece("" +
                    "OO\n" +
                    "OO\n");
                    break;
    case "S" : this.piece = new Piece("" +
                    ".SS\n" +
                    "SS.\n" +
                    "...\n"); 
                    break;
    case "Z" : this.piece = new Piece("" +
                    "ZZ.\n" +
                    ".ZZ\n" +
                    "...\n"); 
                    break;                    
    case "J" : this.piece = new Piece("" +
                    "J..\n" +
                    "JJJ\n" +
                    "...\n"); 
                    break;
    case "L" : this.piece = new Piece("" +
                    "..L\n" +
                    "LLL\n" +
                    "...\n"); 
                    break;
    default : throw "No such shape as '"+shape+"'";                                       
  }
  //for Board.js access (pseudo-abstract fields of Piece);
  this.size = this.piece.size; 
  this.blocks = this.piece.blocks;
}

Tetromino.prototype.toString = function() {
  return this.piece.toString();
}

Tetromino.prototype.blockAt = function(y,x) {
  return this.piece.blockAt(y,x);
}

Tetromino.prototype.rotateLeft = function() {
  this.piece.rotateLeft();
  return this;
}

Tetromino.prototype.rotateRight = function() {
  this.piece.rotateRight();
  return this;
}
