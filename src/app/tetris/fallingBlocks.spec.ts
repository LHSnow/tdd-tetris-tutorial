import {Board} from "./board";
import {Piece} from "./piece";

describe('Falling blocks', function() {

    describe("A new board", function() {
        let board;
        beforeEach(function() {
            board = new Board(3, 3);
        });

        it("is empty", function() {
            expect(board.toString()).toEqual("" +
                "...\n" +
                "...\n" +
                "...\n");
        });

        it("has no falling blocks", function() {
            expect(board.hasFalling()).toBe(false);
        });
    });

    describe("When a block is dropped", function() {
        let board;
        beforeEach(function() {
            board = new Board(3, 3);
            board.drop(new Piece('X'))
        });

        it("the block is falling", function() {
            expect(board.hasFalling()).toBe(true);
        });

        it("the starts from the top middle", function() {
            expect(board.toString()).toEqual("" +
                ".X.\n" +
                "...\n" +
                "...\n");
        });

        it("it moves down one row per tick", function() {
            board.tick();
            expect(board.toString()).toEqual("" +
                "...\n" +
                ".X.\n" +
                "...\n");
        });

        it("at most one block may be falling at a time", function() {
            try {
                board.drop(new Piece('Y'));
                expect(false).toBe(true, "exception expected");
            } catch (e) {
                expect(e).toContain("already falling");
            }
            expect(board.toString()).toEqual("" +
                ".X.\n" +
                "...\n" +
                "...\n");
        });
    });


    describe("When a block reaches the bottom", function() {
        let board;

        beforeEach(function() {
            board = new Board(3, 3);
            //fall to last row
            board.drop(new Piece('X'));
            board.tick();
            board.tick();
        });

        it("it is still falling on the last row", function() {
            expect(board.toString()).toEqual("" +
                "...\n" +
                "...\n" +
                ".X.\n");
            expect(board.hasFalling()).toBe(true, "the player should still be able to move the block");
        });

        it("it stops when it hits the bottom", function() {
            board.tick();
            expect(board.hasFalling()).toBe(false, "the block should stop moving");
            expect(board.toString()).toEqual("" +
                "...\n" +
                "...\n" +
                ".X.\n");
        });
    });


    describe("When a block lands on another block", function() {
        let board;
        beforeEach(function() {
            board = new Board(3, 3);
            board.drop(new Piece('X'));
            board.tick();
            board.tick();
            board.tick();
            expect(board.toString()).toEqual("" +
                "...\n" +
                "...\n" +
                ".X.\n");
            expect(board.hasFalling()).toBe(false);

            board.drop(new Piece('Y'));
            board.tick();
        });

        it("it is still falling right above the other block", function() {
            expect(board.toString()).toEqual("" +
                "...\n" +
                ".Y.\n" +
                ".X.\n");
            expect(board.hasFalling()).toBe(true, "the player should still be able to avoid landing on the other block");
        });

        it("it stops when it hits the other block", function() {
            board.tick();
            expect(board.toString()).toEqual("" +
                "...\n" +
                ".Y.\n" +
                ".X.\n");
            expect(board.hasFalling()).toBe(false, "the block should stop moving when it lands on the other block");
        });
    });
});