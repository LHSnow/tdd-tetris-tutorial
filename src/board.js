function Board(width, height) {
  this.coord = new Array(height);
  for (var i = 0; i < height; i++) {
    this.coord[i] = new Array(width);
  }
  
  this.falling = false;
}

Board.prototype.toString = function() {
  var board = "";
  for(var i = 0; i < this.coord.length; i++) {
    for(var j = 0; j < this.coord[i].length; j++) {
      if(this.coord[i][j] == undefined) {
        board = board + ".";    
      } else {
        board = board + this.coord[i][j];
      }
    }
    board = board + "\n";
  }
  return board;
}

Board.prototype.hasFalling = function() {
  return this.falling;
}

Board.prototype.drop = function(block) {
  this.falling = true;
  var middle = Math.floor(this.coord[0].length / 2);
  this.coord[0][middle] = block;
}

Board.prototype.tick = function() {
  
}
