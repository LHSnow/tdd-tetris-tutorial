import {Piece} from "./piece";

const TETROMINOES = {
    'T':".T.\n" +
        "TTT\n" +
        "...\n",
    'I':"....\n" +
        "IIII\n" +
        "....\n" +
        "....\n",
    'O':"OO\n" +
        "OO\n",
    'S':".SS\n" +
        "SS.\n" +
        "...\n",
    'Z':"ZZ.\n" +
        ".ZZ\n" +
        "...\n",
    'J':"J..\n" +
        "JJJ\n" +
        "...\n",
    'L':"..L\n" +
        "LLL\n" +
        "...\n"
};

export class Tetromino extends Piece {
    constructor(public shape: string) {
        super(TETROMINOES[shape])
    }
}

