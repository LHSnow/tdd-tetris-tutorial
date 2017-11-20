import {TETROMINOES, Tetromino} from "./piece";

export class TetrominoBag {
    history : Tetromino[];
    next : Tetromino;

    constructor() {
        this.history = [];
        this.spawn();
    }

    //pick the next piece from the bag, recording and replacing it
    pick() {
        let tetromino = this.peek();
        this.history.push(tetromino);
        if (this.history.length > 4) {
            this.history.splice(0, 1);
        }
        this.spawn();
        return tetromino;
    }

    //peek on the next item without replacing it
    peek() {
        return this.next;
    }

    //not tested, as the outcome is random
    //as in TGM rules, a piece is less likely to be returned if is currently stored in bag history
    spawn() {
        let rand, tetromino;
        for (let i = 0; i < 4; i++) {
            rand = Math.floor(Math.random() * Object.keys(TETROMINOES).length);
            tetromino = new Tetromino(Object.keys(TETROMINOES)[rand]);
            //if not in history
            if (this.history.indexOf(tetromino) == -1) {
                break;
            }
        }
        this.next = tetromino;
    }
}