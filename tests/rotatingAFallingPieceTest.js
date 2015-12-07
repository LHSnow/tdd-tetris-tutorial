describe("A falling piece", function() {
  var board;
  beforeEach(function() {
    board = new Board(6,8);
    board.drop(new Tetromino("T"));
  });

  it("can be rotated clockwise",  function() {
    board.rotateRight();
    expect(board.toString()).toEqual( "" +
    "....T...\n" +
    "....TT..\n" +
    "....T...\n" +
    "........\n" +
    "........\n" +
    "........\n");
  });

  it("can be rotated counter-clockwise",  function() {
    board.rotateLeft();
    expect(board.toString()).toEqual( "" +
    "....T...\n" +
    "...TT...\n" +
    "....T...\n" +
    "........\n" +
    "........\n" +
    "........\n");
  });

  it("can be rotated next to wall",  function() {
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.rotateLeft();
    expect(board.toString()).toEqual( "" +
    ".T......\n" +
    "TT......\n" +
    ".T......\n" +
    "........\n" +
    "........\n" +
    "........\n");
  });

  it("can not be rotated when there is no room to rotate off other piece",  function() {
    board.tick();
    board.tick();
    board.tick();
    board.tick();
    board.tick(); //lock
    expect(board.toString()).toEqual( "" +
    "........\n" +
    "........\n" +
    "........\n" +
    "........\n" +
    "....T...\n" +
    "...TTT..\n");
    board.drop(new Tetromino("S"));
    board.moveLeft();
    board.moveLeft();
    board.tick();
    board.tick();
    board.tick();
    board.tick();
    expect(board.toString()).toEqual( "" +
    "........\n" +
    "........\n" +
    "........\n" +
    "........\n" +
    "..SST...\n" +
    ".SSTTT..\n");
    board.rotateRight();
    expect(board.toString()).toEqual( "" +
    "........\n" +
    "........\n" +
    "........\n" +
    "........\n" +
    "..SST...\n" +
    ".SSTTT..\n");
    //other direction
    board.rotateLeft();
    expect(board.toString()).toEqual( "" +
    "........\n" +
    "........\n" +
    "........\n" +
    "........\n" +
    "..SST...\n" +
    ".SSTTT..\n");
  });

  it("rotated off the left wall is moved away from the wall ('wallkicked')",  function() {
    board.rotateRight();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    expect(board.toString()).toEqual( "" +
    "T.......\n" +
    "TT......\n" +
    "T.......\n" +
    "........\n" +
    "........\n" +
    "........\n");
    board.rotateLeft();
    expect(board.toString()).toEqual( "" +
    ".T......\n" +
    "TTT.....\n" +
    "........\n" +
    "........\n" +
    "........\n" +
    "........\n");
  });

  it("rotated off the right wall is moved away from the wall ('wallkicked')",  function() {
    board.rotateLeft();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    expect(board.toString()).toEqual( "" +
    ".......T\n" +
    "......TT\n" +
    ".......T\n" +
    "........\n" +
    "........\n" +
    "........\n");
    board.rotateRight();
    expect(board.toString()).toEqual( "" +
    "......T.\n" +
    ".....TTT\n" +
    "........\n" +
    "........\n" +
    "........\n" +
    "........\n");
  });
  // See: http://bsixcentdouze.free.fr/tc/tgm-en/tgm.html
  // http://bsixcentdouze.free.fr/tc/tgm-en/img/wallkick1.png
  // http://bsixcentdouze.free.fr/tc/tgm-en/img/wallkick2.png
  // http://bsixcentdouze.free.fr/tc/tgm-en/img/wallkick3.png
});
