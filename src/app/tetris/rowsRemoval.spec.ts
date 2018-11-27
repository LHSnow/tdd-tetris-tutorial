import { Board } from './board'
import { Tetromino } from './piece'

describe('Rows removal', function () {
	describe('When a single row clears', function () {
		let board;
		beforeEach(function () {
			board = new Board(8, 8);
			board.fromString('' +
				'........\n' +
				'........\n' +
				'........\n' +
				'........\n' +
				'........\n' +
				'........\n' +
				'........\n' +
				'OOOOOO..\n');
			board.drop(new Tetromino('J'));
			board.rotateLeft();
			board.moveRight();
			board.moveRight();
			board.moveRight();
			board.fall();
		});

		it('one row is removed', function () {
			expect(board.lastCleared.length).toBe(1);
		});

		it('score is increased by 1', function () {
			expect(board.totalScore).toBe(1);
		});

		it('removed row is replaced by an empty row on top of the board', function () {
			expect(board.toString()).toEqual('' +
				'........\n' +
				'........\n' +
				'........\n' +
				'........\n' +
				'........\n' +
				'........\n' +
				'.......J\n' +
				'.......J\n');
			//"OOOOOOJJ\n" <- removed
		});
	});

	describe('When double rows clear', function () {
		let board;
		beforeEach(function () {
			board = new Board(8, 8);
			board.fromString('' +
				'........\n' +
				'........\n' +
				'........\n' +
				'........\n' +
				'........\n' +
				'........\n' +
				'OOOOOO..\n' +
				'OOOOOO..\n');
			board.drop(new Tetromino('O'));
			board.moveRight();
			board.moveRight();
			board.moveRight();
			board.fall();
		});

		it('two rows are removed', function () {
			expect(board.lastCleared.length).toBe(2);
		});

		it('score is increased by 3', function () {
			expect(board.totalScore).toBe(3);
		});

		it('removed rows are replaced by empty rows on top of the board', function () {
			expect(board.toString()).toEqual('' +
				'........\n' +
				'........\n' +
				'........\n' +
				'........\n' +
				'........\n' +
				'........\n' +
				'........\n' +
				'........\n');
		});
	});

	describe('When triple rows clear', function () {
		let board;
		beforeEach(function () {
			board = new Board(8, 8);
			board.fromString('' +
				'........\n' +
				'........\n' +
				'........\n' +
				'........\n' +
				'........\n' +
				'OOOOOO..\n' +
				'OOOOOOO.\n' +
				'OOOOOOO.\n');
			board.drop(new Tetromino('L'));
			board.rotateLeft();
			board.moveRight();
			board.moveRight();
			board.moveRight();
			board.fall();
		});

		it('three rows are removed', function () {
			expect(board.lastCleared.length).toBe(3);
		});

		it('score is increased by 5', function () {
			expect(board.totalScore).toBe(5);
		});

		it('removed rows are replaced by empty rows on top of the board', function () {
			expect(board.toString()).toEqual('' +
				'........\n' +
				'........\n' +
				'........\n' +
				'........\n' +
				'........\n' +
				'........\n' +
				'........\n' +
				'........\n');
		});
	});

	describe('When quadruple (tetris) rows clear', function () {
		let board;
		beforeEach(function () {
			board = new Board(8, 8);
			board.fromString('' +
				'........\n' +
				'........\n' +
				'........\n' +
				'........\n' +
				'OOOOOOI.\n' +
				'OOOOOOI.\n' +
				'OOOOOOI.\n' +
				'OOOOOOI.\n');
			board.drop(new Tetromino('I'));
			board.rotateLeft();
			board.moveRight();
			board.moveRight();
			board.moveRight();
			board.moveRight();
			board.fall();
		});

		it('four rows are removed', function () {
			expect(board.lastCleared.length).toBe(4);
		});

		it('score is increased by 8', function () {
			expect(board.totalScore).toBe(8);
		});

		it('removed rows are replaced by empty rows on top of the board', function () {
			expect(board.toString()).toEqual('' +
				'........\n' +
				'........\n' +
				'........\n' +
				'........\n' +
				'........\n' +
				'........\n' +
				'........\n' +
				'........\n');
		});
	});
});