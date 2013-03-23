function Block(type) {
  this.type = type;
  this.size = 1;
  this.xpos = undefined;
  this.ypos = undefined;
}

Block.prototype.toString = function() {
  return this.type + '';
}

Block.prototype.moveDown = function() {
  this.ypos++;
}
