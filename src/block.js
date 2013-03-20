function Block(type) {
  this.type = type;
  this.xpos = undefined;
  this.ypos = undefined;
}

Block.prototype.toString = function() {
  return this.type + '';
}
