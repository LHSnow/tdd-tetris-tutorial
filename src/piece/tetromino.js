"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var piece_1 = require("./piece");
var Tetromino = (function () {
    function Tetromino(shape) {
        this.shape = shape;
        switch (shape) {
            case "T":
                this.piece = new piece_1.Piece("" +
                    ".T.\n" +
                    "TTT\n" +
                    "...\n");
                break;
            case "I":
                this.piece = new piece_1.Piece("" +
                    "....\n" +
                    "IIII\n" +
                    "....\n" +
                    "....\n");
                break;
            case "O":
                this.piece = new piece_1.Piece("" +
                    "OO\n" +
                    "OO\n");
                break;
            case "S":
                this.piece = new piece_1.Piece("" +
                    ".SS\n" +
                    "SS.\n" +
                    "...\n");
                break;
            case "Z":
                this.piece = new piece_1.Piece("" +
                    "ZZ.\n" +
                    ".ZZ\n" +
                    "...\n");
                break;
            case "J":
                this.piece = new piece_1.Piece("" +
                    "J..\n" +
                    "JJJ\n" +
                    "...\n");
                break;
            case "L":
                this.piece = new piece_1.Piece("" +
                    "..L\n" +
                    "LLL\n" +
                    "...\n");
                break;
            default:
                throw "No such shape as '" + shape + "'";
        }
    }
    Tetromino.prototype.toString = function () {
        return this.piece.toString();
    };
    Tetromino.prototype.blockAt = function (y, x) {
        return this.piece.blockAt(y, x);
    };
    Tetromino.prototype.rotateLeft = function () {
        this.piece.rotateLeft();
        return this;
    };
    Tetromino.prototype.rotateRight = function () {
        this.piece.rotateRight();
        return this;
    };
    return Tetromino;
}());
exports.Tetromino = Tetromino;
