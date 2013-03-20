function Piece(charMatrix) {
  this.arr = charMatrix.split('');
  this.width = charMatrix.indexOf("\n") - 1; 
}

Piece.prototype.toString = function() {
  return this.arr.join("");
}

Piece.prototype.rotateLeft = function() {
  return this;
}

Piece.prototype.rotateRight = function() {
  return this;
}
