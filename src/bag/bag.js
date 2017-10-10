"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tetromino_1 = require("../tetromino");
var SHAPES = ["T", "O", "I", "S", "Z", "L", "J"];
var TetrominoBag = (function () {
    function TetrominoBag() {
        this.spawn();
    }
    //pick the next piece from the bag, recording and replacing it
    TetrominoBag.prototype.pick = function () {
        var tetromino = this.peek();
        this.history.push(tetromino.shape);
        if (this.history.length > 4) {
            this.history.splice(0, 1);
        }
        this.spawn();
        return tetromino;
    };
    //peek on the next item without replacing it
    TetrominoBag.prototype.peek = function () {
        return this.next;
    };
    //not tested, as the outcome is random
    //as in TGM rules, a piece is less likely to be returned if is currently stored in bag history
    TetrominoBag.prototype.spawn = function () {
        var rand, tetromino;
        for (var i = 0; i < 4; i++) {
            rand = Math.floor(Math.random() * 7);
            tetromino = new tetromino_1.Tetromino(SHAPES[rand]);
            //if not in history
            if (this.history.indexOf(tetromino) == -1) {
                break;
            }
        }
        this.next = tetromino;
    };
    return TetrominoBag;
}());
exports.TetrominoBag = TetrominoBag;
