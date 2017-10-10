import {Piece} from "./piece";

export class Tetromino {
    private _piece: Piece;
    private _size: number;

    constructor(public shape) {
        switch (shape) {
            case "T" :
                this._piece = new Piece("" +
                    ".T.\n" +
                    "TTT\n" +
                    "...\n");
                break;
            case "I" :
                this._piece = new Piece("" +
                    "....\n" +
                    "IIII\n" +
                    "....\n" +
                    "....\n");
                break;
            case "O" :
                this._piece = new Piece("" +
                    "OO\n" +
                    "OO\n");
                break;
            case "S" :
                this._piece = new Piece("" +
                    ".SS\n" +
                    "SS.\n" +
                    "...\n");
                break;
            case "Z" :
                this._piece = new Piece("" +
                    "ZZ.\n" +
                    ".ZZ\n" +
                    "...\n");
                break;
            case "J" :
                this._piece = new Piece("" +
                    "J..\n" +
                    "JJJ\n" +
                    "...\n");
                break;
            case "L" :
                this._piece = new Piece("" +
                    "..L\n" +
                    "LLL\n" +
                    "...\n");
                break;
            default :
                throw "No such shape as '" + shape + "'";
        }
    }

    get blocks() {
        return this._piece.blocks;
    }

    get size() {
        return this._piece.size;
    }

    toString() {
        return this._piece.toString();
    }

    blockAt(y, x) {
        return this._piece.blockAt(y, x);
    }

    rotateLeft() {
        this._piece.rotateLeft();
        return this;
    }

    rotateRight() {
        this._piece.rotateRight();
        return this;
    }

}

