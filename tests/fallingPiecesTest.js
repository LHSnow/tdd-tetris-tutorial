describe("When a piece is dropped",  function() {
  var board;
  beforeEach( function() {
      board = new Board(6, 8);
      board.drop(new Tetromino("T"));
  })

  it("it starts from top middle",  function() {
    expect(board.toString()).toEqual(  "" +
      "....T...\n" +
      "...TTT..\n" +
      "........\n" +
      "........\n" +
      "........\n" +
      "........\n");
  });
});

describe("When a piece reaches the bottom",  function() {
  var board;
  beforeEach( function() {
      board = new Board(6, 8);
      board.drop(new Tetromino("T"));
      board.tick();
      board.tick();
      board.tick();
      board.tick();
  });

  it("it is still falling on the last row",  function() {
    expect(board.toString()).toEqual(  "" +
            "........\n" +
            "........\n" +
            "........\n" +
            "........\n" +
            "....T...\n" +
            "...TTT..\n");
    expect(board.hasFalling()).toBe(true);
  });

  it("it stops when it hits the bottom",  function() {
      board.tick();
      expect(board.toString()).toEqual(  "" +
              "........\n" +
              "........\n" +
              "........\n" +
              "........\n" +
              "....T...\n" +
              "...TTT..\n");
      expect(board.hasFalling()).toBe(false);
  });
});


describe("When a piece lands on another piece",  function() {
  var board;
  beforeEach( function() {
    board = new Board(6,8);
    board.drop(new Tetromino("T"));
    board.tick();
    board.tick();
    board.tick();
    board.tick();
    board.tick();
    expect(board.toString()).toEqual(  "" +
            "........\n" +
            "........\n" +
            "........\n" +
            "........\n" +
            "....T...\n" +
            "...TTT..\n");
    expect(board.hasFalling()).toBe(false);

    board.drop(new Tetromino("T"));
    board.tick();
    board.tick();
  });

  it("it is still falling right above the other piece",  function() {
    expect(board.toString()).toEqual(  "" +
            "........\n" +
            "........\n" +
            "....T...\n" +
            "...TTT..\n" +
            "....T...\n" +
            "...TTT..\n");
    expect(board.hasFalling()).toBe(true);
  });

  it("it stops when it hits the other piece",  function() {
      board.tick();
      expect(board.toString()).toEqual(  "" +
              "........\n" +
              "........\n" +
              "....T...\n" +
              "...TTT..\n" +
              "....T...\n" +
              "...TTT..\n");
      expect(board.hasFalling()).toBe(false);
  });

});
