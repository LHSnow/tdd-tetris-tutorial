function Tetromino(type) {
  this.type = type;
}

Tetromino.prototype.toString = function() {
  return this.type + '';
}
