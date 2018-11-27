import { Piece } from './piece'

describe('Rotating pieces of blocks', function () {

	describe('A piece of 3x3 blocks', function () {
		var piece;
		beforeEach(function () {
			piece = new Piece('' +
				'.X.\n' +
				'.X.\n' +
				'...\n');
		});

		it('consists of many blocks', function () {
			expect(piece.toString()).toEqual('' +
				'.X.\n' +
				'.X.\n' +
				'...\n');
		});

		it('can be rotated right', function () {
			piece = piece.rotateRight();
			expect(piece.toString()).toEqual('' +
				'...\n' +
				'.XX\n' +
				'...\n');
		});

		it('can be rotated left', function () {
			piece = piece.rotateLeft();
			expect(piece.toString()).toEqual('' +
				'...\n' +
				'XX.\n' +
				'...\n');
		});
	});

	describe('A piece of 5x5 blocks', function () {
		var piece;
		beforeEach(function () {
			piece = new Piece('' +
				'..XXX\n' +
				'..XX.\n' +
				'..X..\n' +
				'.....\n' +
				'.....\n');
		});


		it('consists of many blocks', function () {
			expect(piece.toString()).toEqual('' +
				'..XXX\n' +
				'..XX.\n' +
				'..X..\n' +
				'.....\n' +
				'.....\n');
		});

		it('can be rotated right', function () {
			piece = piece.rotateRight();
			expect(piece.toString()).toEqual('' +
				'.....\n' +
				'.....\n' +
				'..XXX\n' +
				'...XX\n' +
				'....X\n');
		});

		it('can be rotated left', function () {
			piece = piece.rotateLeft();
			expect(piece.toString()).toEqual('' +
				'X....\n' +
				'XX...\n' +
				'XXX..\n' +
				'.....\n' +
				'.....\n');
		});
	});
});