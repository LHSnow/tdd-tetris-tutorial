"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var block_1 = require("./block");
var Piece = (function () {
    function Piece(charMatrix) {
        //size 1 pieces don't have several rows in the charmatrix
        this.size = Math.max(charMatrix.indexOf("\n"), 1);
        var rows = charMatrix.split("\n");
        for (var y = 0; y < this.size; y++) {
            for (var x = 0; x < this.size; x++) {
                var type = rows[y].charAt(x);
                if (type != ".") {
                    var block = new block_1.Block(type);
                    block.xpos = x;
                    block.ypos = y;
                    this.blocks.push(block);
                }
            }
        }
    }
    Piece.prototype.toString = function () {
        var str = "";
        for (var y = 0; y < this.size; y++) {
            for (var x = 0; x < this.size; x++) {
                var block = undefined;
                for (var b = 0; b < this.blocks.length; b++) {
                    if ((y == this.blocks[b].ypos) && (x == this.blocks[b].xpos)) {
                        block = this.blocks[b];
                        break;
                    }
                }
                if (block) {
                    str = str + block;
                }
                else {
                    str = str + ".";
                }
            }
            str = str + "\n";
        }
        return str;
    };
    Piece.prototype.blockAt = function (y, x) {
        for (var b = 0; b < this.blocks.length; b++) {
            var block = this.blocks[b];
            if ((block.xpos == x) && (block.ypos == y)) {
                return block;
            }
        }
        return null;
    };
    Piece.prototype.rotateRight = function () {
        this.rotate(true);
        return this;
    };
    Piece.prototype.rotateLeft = function () {
        this.rotate(false);
        return this;
    };
    //adapted from http://stackoverflow.com/questions/42519/how-do-you-rotate-a-two-dimensional-array/193942#193942
    Piece.prototype.rotate = function (clockwise) {
        var size = this.size;
        for (var b = 0; b < this.blocks.length; b++) {
            var x = this.blocks[b].xpos;
            var y = this.blocks[b].ypos;
            if (clockwise) {
                this.blocks[b].ypos = x;
                this.blocks[b].xpos = size - y - 1;
            }
            else {
                this.blocks[b].ypos = size - x - 1;
                this.blocks[b].xpos = y;
            }
        }
        return this;
    };
    return Piece;
}());
exports.Piece = Piece;
