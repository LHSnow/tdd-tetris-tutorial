describe('Moving a falling piece', function() {
    describe("A falling piece", function() {
        var board;

        beforeEach(function() {
            board = new Board(6, 8);
            board.drop(new Tetromino("T"));
        });

        it("can be moved left", function() {
            board.moveLeft();
            expect(board.toString()).toEqual("" +
                "...T....\n" +
                "..TTT...\n" +
                "........\n" +
                "........\n" +
                "........\n" +
                "........\n");
        });
        it("can be moved right", function() {
            board.moveRight();
            expect(board.toString()).toEqual("" +
                ".....T..\n" +
                "....TTT.\n" +
                "........\n" +
                "........\n" +
                "........\n" +
                "........\n");
        });

        it("can be moved down", function() {
            board.moveDown();
            expect(board.toString()).toEqual("" +
                "........\n" +
                "....T...\n" +
                "...TTT..\n" +
                "........\n" +
                "........\n" +
                "........\n");
        });

        it("will not move left over over the board", function() {
            board.moveLeft();
            board.moveLeft();
            board.moveLeft();
            expect(board.toString()).toEqual("" +
                ".T......\n" +
                "TTT.....\n" +
                "........\n" +
                "........\n" +
                "........\n" +
                "........\n");
            board.moveLeft();
            expect(board.toString()).toEqual("" +
                ".T......\n" +
                "TTT.....\n" +
                "........\n" +
                "........\n" +
                "........\n" +
                "........\n");
        });

        it("will not move right over over the board", function() {
            board.moveRight();
            board.moveRight();
            expect(board.toString()).toEqual("" +
                "......T.\n" +
                ".....TTT\n" +
                "........\n" +
                "........\n" +
                "........\n" +
                "........\n");
            board.moveRight();
            expect(board.toString()).toEqual("" +
                "......T.\n" +
                ".....TTT\n" +
                "........\n" +
                "........\n" +
                "........\n" +
                "........\n");
        });

        it("will not move down over the board (will stop falling)", function() {
            board.moveDown();
            board.moveDown();
            board.moveDown();
            board.moveDown();
            expect(board.toString()).toEqual("" +
                "........\n" +
                "........\n" +
                "........\n" +
                "........\n" +
                "....T...\n" +
                "...TTT..\n");
            expect(board.hasFalling()).toBe(true);
            board.moveDown();
            expect(board.toString()).toEqual("" +
                "........\n" +
                "........\n" +
                "........\n" +
                "........\n" +
                "....T...\n" +
                "...TTT..\n");
            expect(board.hasFalling()).toBe(false, "should stop falling");
        });

        it("can not be moved left if another piece is in the way", function() {
            board.moveLeft();
            board.moveLeft();
            board.moveLeft();
            board.tick();
            board.tick();
            board.tick();
            board.tick();
            board.tick(); //lock
            expect(board.toString()).toEqual("" +
                "........\n" +
                "........\n" +
                "........\n" +
                "........\n" +
                ".T......\n" +
                "TTT.....\n");
            board.drop(new Tetromino("T"));
            board.moveLeft();
            board.moveLeft();
            board.moveLeft();
            board.tick();
            board.tick();
            board.tick();
            expect(board.toString()).toEqual("" +
                "........\n" +
                "........\n" +
                ".T......\n" +
                "TTT.....\n" +
                ".T......\n" +
                "TTT.....\n");
            board.drop(new Tetromino("O"));
            board.tick();
            board.tick();
            expect(board.toString()).toEqual("" +
                "........\n" +
                "........\n" +
                ".T.OO...\n" +
                "TTTOO...\n" +
                ".T......\n" +
                "TTT.....\n");
            board.moveLeft();
            expect(board.toString()).toEqual("" +
                "........\n" +
                "........\n" +
                ".T.OO...\n" +
                "TTTOO...\n" +
                ".T......\n" +
                "TTT.....\n");
        });

        it("can not be moved right if another piece is in the way", function() {
            board.moveRight();
            board.moveRight();
            board.tick();
            board.tick();
            board.tick();
            board.tick();
            board.tick(); //lock
            expect(board.toString()).toEqual("" +
                "........\n" +
                "........\n" +
                "........\n" +
                "........\n" +
                "......T.\n" +
                ".....TTT\n");
            board.drop(new Tetromino("T"));
            board.moveRight();
            board.moveRight();
            board.tick();
            board.tick();
            board.tick();
            expect(board.toString()).toEqual("" +
                "........\n" +
                "........\n" +
                "......T.\n" +
                ".....TTT\n" +
                "......T.\n" +
                ".....TTT\n");
            board.drop(new Tetromino("O"));
            board.tick();
            board.tick();
            expect(board.toString()).toEqual("" +
                "........\n" +
                "........\n" +
                "...OO.T.\n" +
                "...OOTTT\n" +
                "......T.\n" +
                ".....TTT\n");
            board.moveRight();
            expect(board.toString()).toEqual("" +
                "........\n" +
                "........\n" +
                "...OO.T.\n" +
                "...OOTTT\n" +
                "......T.\n" +
                ".....TTT\n");
        });

        it("can not be moved down if another piece is in the way (will stop falling)", function() {
            board.moveDown();
            board.moveDown();
            board.moveDown();
            board.moveDown();
            board.moveDown();
            expect(board.toString()).toEqual("" +
                "........\n" +
                "........\n" +
                "........\n" +
                "........\n" +
                "....T...\n" +
                "...TTT..\n");
            board.drop(new Tetromino("T"))
            board.moveDown();
            board.moveDown();
            expect(board.toString()).toEqual("" +
                "........\n" +
                "........\n" +
                "....T...\n" +
                "...TTT..\n" +
                "....T...\n" +
                "...TTT..\n");
            board.moveDown();
            expect(board.toString()).toEqual("" +
                "........\n" +
                "........\n" +
                "....T...\n" +
                "...TTT..\n" +
                "....T...\n" +
                "...TTT..\n");
            expect(board.hasFalling()).toBe(false, "should stop falling");
        });
    });
});
// P.S. Take into consideration, that part of the piece's area may be empty cells.
// Only non-empty cells should take part in the collision checks.
