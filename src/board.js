function Board(width, height) {
  this.coord = new Array(height);
  for (var i = 0; i < height; i++) {
    coord[i] = new Array(width);
  }
  
  this.falling = false;
}

Board.prototype.toString = function() {
  var board = "";
  for(var i = 0; i < this.coord.length; i++) {
    for(var j = 0; j < this.coord[i].length; j++) {
      if(coord[i][j] == undefined) {
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

Board.prototype.drop = function() {
  
}

Board.prototype.tick = function() {
  
}
