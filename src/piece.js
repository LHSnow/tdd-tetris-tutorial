function Piece(charMatrix) {
  this.arr = charMatrix.split('');
  this.width = charMatrix.indexOf("\n") - 1; 
}

Piece.prototype.toString = function() {
  return this.arr.join("");
}
