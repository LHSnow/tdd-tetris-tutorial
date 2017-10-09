describe("Rotating tetrominoes", function() {

    /*
    describe("All shape instances", function() {
      setup: function() {
        shape = new Tetromino("T");
      }
    });

    it("are immutable",  function() {
        var original = shape.toString();
        shape.rotateRight();
        expect(original).toEqual( shape.toString());
        shape.rotateLeft();
        expect(original).toEqual( shape.toString());
      }
    );
    */

    describe("The T shape", function() {
        var shape;
        beforeEach(function() {
            shape = new Tetromino("T");
        });

        it("is shaped like T", function() {
            expect(shape.toString()).toEqual("" +
                ".T.\n" +
                "TTT\n" +
                "...\n");
        });

        it("can be rotated right 3 times", function() {
            shape = shape.rotateRight();
            expect(shape.toString()).toEqual("" +
                ".T.\n" +
                ".TT\n" +
                ".T.\n");
            shape = shape.rotateRight();
            expect(shape.toString()).toEqual("" +
                "...\n" +
                "TTT\n" +
                ".T.\n");
            shape = shape.rotateRight();
            expect(shape.toString()).toEqual("" +
                ".T.\n" +
                "TT.\n" +
                ".T.\n");
        });

        it("can be rotated left 3 times", function() {
            shape = shape.rotateLeft();
            expect(shape.toString()).toEqual("" +
                ".T.\n" +
                "TT.\n" +
                ".T.\n");
            shape = shape.rotateLeft();
            expect(shape.toString()).toEqual("" +
                "...\n" +
                "TTT\n" +
                ".T.\n");
            shape = shape.rotateLeft();
            expect(shape.toString()).toEqual("" +
                ".T.\n" +
                ".TT\n" +
                ".T.\n");
        });

        it("rotating it 4 times will go back to the original shape", function() {
            var originalShape = shape.toString();
            shape = shape.rotateRight().rotateRight().rotateRight().rotateRight();
            expect(shape.toString()).toEqual(originalShape);
            shape = shape.rotateLeft().rotateLeft().rotateLeft().rotateLeft();
            expect(shape.toString()).toEqual(originalShape);
        });
    });

    describe("The I shape", function() {
        var shape;
        beforeEach(function() {
            shape = new Tetromino("I");
        });

        it("is shaped like I", function() {
            expect(shape.toString()).toEqual("" +
                "....\n" +
                "IIII\n" +
                "....\n" +
                "....\n");
        });

        it("can be rotated right once", function() {
            shape = shape.rotateRight();
            expect(shape.toString()).toEqual("" +
                "..I.\n" +
                "..I.\n" +
                "..I.\n" +
                "..I.\n");
        });

        it("can be rotated left once", function() {
            shape = shape.rotateLeft();
            expect(shape.toString()).toEqual("" +
                ".I..\n" +
                ".I..\n" +
                ".I..\n" +
                ".I..\n");
        });

        it("rotating it twice left will drop it down one line", function() {
            var expectedShape = "" +
                "....\n" +
                "....\n" +
                "IIII\n" +
                "....\n";
            shape = shape.rotateLeft().rotateLeft();
            expect(shape.toString()).toEqual(expectedShape);
        });

        it("rotating it twice right will drop it down one line", function() {
            var expectedShape = "" +
                "....\n" +
                "....\n" +
                "IIII\n" +
                "....\n";
            shape = shape.rotateRight().rotateRight();
            expect(shape.toString()).toEqual(expectedShape);
        });

        it("rotating it 4 times left will bring back the original shape", function() {
            var originalShape = shape.toString();
            shape = shape.rotateLeft().rotateLeft().rotateLeft().rotateLeft();
            expect(shape.toString()).toEqual(originalShape);
        });

        it("rotating it 4 times right will bring back the original shape", function() {
            var originalShape = shape.toString();
            shape = shape.rotateRight().rotateRight().rotateRight().rotateRight();
            expect(shape.toString()).toEqual(originalShape);
        });
    });


    describe("The O shape", function() {
        var shape;
        beforeEach(function() {
            shape = new Tetromino("O");
        });

        it("is shaped like O", function() {
            expect(shape.toString()).toEqual("" +
                "OO\n" +
                "OO\n");
        });

        it("can not be rotated right", function() {
            shape = shape.rotateRight();
            expect(shape.toString()).toEqual("" +
                "OO\n" +
                "OO\n");
        });

        it("can not be rotated left", function() {
            shape = shape.rotateLeft();
            expect(shape.toString()).toEqual("" +
                "OO\n" +
                "OO\n");
        });
    });

    describe("The S shape", function() {
        var shape;
        beforeEach(function() {
            shape = new Tetromino("S");
        });

        it("is shaped like S", function() {
            expect(shape.toString()).toEqual("" +
                ".SS\n" +
                "SS.\n" +
                "...\n");
        });

        it("can be rotated right 3 times", function() {
            shape = shape.rotateRight();
            expect(shape.toString()).toEqual("" +
                ".S.\n" +
                ".SS\n" +
                "..S\n");
            shape = shape.rotateRight();
            expect(shape.toString()).toEqual("" +
                "...\n" +
                ".SS\n" +
                "SS.\n");
            shape = shape.rotateRight();
            expect(shape.toString()).toEqual("" +
                "S..\n" +
                "SS.\n" +
                ".S.\n");
        });

        it("rotating it 4 times will go back to the original shape", function() {
            var originalShape = shape.toString();
            shape = shape.rotateRight().rotateRight().rotateRight().rotateRight();
            expect(shape.toString()).toEqual(originalShape);
            shape = shape.rotateLeft().rotateLeft().rotateLeft().rotateLeft();
            expect(shape.toString()).toEqual(originalShape);
        });

    });

    describe("The Z shape", function() {
        var shape;
        beforeEach(function() {
            shape = new Tetromino("Z");
        });

        it("is shaped like Z", function() {
            expect(shape.toString()).toEqual("" +
                "ZZ.\n" +
                ".ZZ\n" +
                "...\n");
        });

        it("can be rotated right 3 times", function() {
            shape = shape.rotateRight();
            expect(shape.toString()).toEqual("" +
                "..Z\n" +
                ".ZZ\n" +
                ".Z.\n");
            shape = shape.rotateRight();
            expect(shape.toString()).toEqual("" +
                "...\n" +
                "ZZ.\n" +
                ".ZZ\n");
            shape = shape.rotateRight();
            expect(shape.toString()).toEqual("" +
                ".Z.\n" +
                "ZZ.\n" +
                "Z..\n");
        });

        it("rotating it 4 times will go back to the original shape", function() {
            var originalShape = shape.toString();
            shape = shape.rotateRight().rotateRight().rotateRight().rotateRight();
            expect(shape.toString()).toEqual(originalShape);
            shape = shape.rotateLeft().rotateLeft().rotateLeft().rotateLeft();
            expect(shape.toString()).toEqual(originalShape);
        });
    });


    describe("The J shape", function() {
        beforeEach(function() {
            shape = new Tetromino("J");
        });

        it("is shaped like J", function() {
            expect(shape.toString()).toEqual("" +
                "J..\n" +
                "JJJ\n" +
                "...\n");
        });

        it("can be rotated right 3 times", function() {
            shape = shape.rotateRight();
            expect(shape.toString()).toEqual("" +
                ".JJ\n" +
                ".J.\n" +
                ".J.\n");
            shape = shape.rotateRight();
            expect(shape.toString()).toEqual("" +
                "...\n" +
                "JJJ\n" +
                "..J\n");
            shape = shape.rotateRight();
            expect(shape.toString()).toEqual("" +
                ".J.\n" +
                ".J.\n" +
                "JJ.\n");
        });

        it("rotating it 4 times will go back to the original shape", function() {
            var originalShape = shape.toString();
            shape = shape.rotateRight().rotateRight().rotateRight().rotateRight();
            expect(shape.toString()).toEqual(originalShape);
            shape = shape.rotateLeft().rotateLeft().rotateLeft().rotateLeft();
            expect(shape.toString()).toEqual(originalShape);
        });

    });

    describe("The L shape", function() {
        var shape;
        beforeEach(function() {
            shape = new Tetromino("L");
        });

        it("is shaped like L", function() {
            expect(shape.toString()).toEqual("" +
                "..L\n" +
                "LLL\n" +
                "...\n");
        });

        it("can be rotated right 3 times", function() {
            shape = shape.rotateRight();
            expect(shape.toString()).toEqual("" +
                ".L.\n" +
                ".L.\n" +
                ".LL\n");
            shape = shape.rotateRight();
            expect(shape.toString()).toEqual("" +
                "...\n" +
                "LLL\n" +
                "L..\n");
            shape = shape.rotateRight();
            expect(shape.toString()).toEqual("" +
                "LL.\n" +
                ".L.\n" +
                ".L.\n");
        });

        it("rotating it 4 times will go back to the original shape", function() {
            var originalShape = shape.toString();
            shape = shape.rotateRight().rotateRight().rotateRight().rotateRight();
            expect(shape.toString()).toEqual(originalShape);
            shape = shape.rotateLeft().rotateLeft().rotateLeft().rotateLeft();
            expect(shape.toString()).toEqual(originalShape);
        });
    });
});