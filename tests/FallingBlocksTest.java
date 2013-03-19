<!DOCTYPE html>

<!--
  Copyright (c) 2008-2012  Esko Luontola <www.orfjackal.net> and Lars Bergström <harhund.com>
  You may use and modify this source code freely for personal non-commercial use.
  This source code may NOT be used as course material without prior written agreement.

  @author Esko Luontola <www.orfjackal.net> (original Java/junit examples)
  @author Lars Bergström <harhund.com> (adaptation to Javascript/qunit)
-->
 
<html>
<head>
  <meta charset="utf-8">
  <title>Falling blocks test</title>
  <link rel="stylesheet" href="http://code.jquery.com/qunit/qunit-1.11.0.css">
</head>
<body>
  <div id="qunit"></div>
  <div id="qunit-fixture"></div>
</body>

<script src="http://code.jquery.com/qunit/qunit-1.11.0.js"></script>
<script>
 
var board = new Board(3, 3);


module("A_new_board");

test("is empty", function() {
  equal( "" +
        "...\n" +
        "...\n" +
        "...\n", board.toString() );
});

test("has no falling blocks" {
  ok(!board.hasFalling());
});


module("When a block is dropped", {
  setup: function() {
    board.drop(new Block('X'))
  }
});


test("the block is falling", function() {
  ok(board.hasFalling());
});

test("it starts from the top middle", function() {
    equals("" +
            ".X.\n" +
            "...\n" +
            "...\n", board.toString());
});

test("it moves down one row per tick", function() {
    board.tick();
    assertEquals("" +
            "...\n" +
            ".X.\n" +
            "...\n", board.toString());
});
/*
test("at most one block may be falling at a time", function() {
    try {
        board.drop(new Block('Y'));
        fail();
    } catch (IllegalStateException e) {
        assertTrue(e.getMessage().contains("already falling"));
    }
    assertEquals("" +
            ".X.\n" +
            "...\n" +
            "...\n", board.toString());
});
*/    



module("When a block reaches the bottom", {
  setup: function() {
    //fall to last row 
    board.drop(new Block('X'));
    board.tick();
    board.tick();
  }
}); 

test("it is still falling on the last row", function() {
    equal("" +
            "...\n" +
            "...\n" +
            ".X.\n", board.toString());
    ok(board.hasFalling(), "the player should still be able to move the block");
});

test("it stops when it hits the bottom", function() {
    board.tick();
    equal("" +
            "...\n" +
            "...\n" +
            ".X.\n", board.toString());
    ok(!board.hasFalling(), "the block should stop moving");
});




module("When a block lands on another block", {
  setup: function() {
    board.drop(new Block('X'));
    board.tick();
    board.tick();
    board.tick();
    assertEquals("" +
            "...\n" +
            "...\n" +
            ".X.\n", board.toString());
    assertFalse(board.hasFalling());

    board.drop(new Block('Y'));
    board.tick();
  }  
});


test("it is still falling right above the other block", function() {
    equal("" +
            "...\n" +
            ".Y.\n" +
            ".X.\n", board.toString());
    ok(board.hasFalling(), "the player should still be able to avoid landing on the other block");
});

test("it stops when it hits the other block", function() {
    board.tick();
    equal("" +
            "...\n" +
           ".Y.\n" +
            ".X.\n", board.toString());
    ok(!board.hasFalling(), "the block should stop moving when it lands on the other block");
});

</script>
</html> 
