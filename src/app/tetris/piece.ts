export class Block {
    constructor(public type: string, public ypos?: number, public xpos?: number) {
    }

    toString() {
        return this.type;
    }
}

const TETROMINOES = {
    'T':    ".T.\n" +
            "TTT\n" +
            "...\n",
    'I':    "....\n" +
            "IIII\n" +
            "....\n" +
            "....\n",
    'O':    "OO\n" +
            "OO\n",
    'S':    ".SS\n" +
            "SS.\n" +
            "...\n",
    'Z':    "ZZ.\n" +
            ".ZZ\n" +
            "...\n",
    'J':    "J..\n" +
            "JJJ\n" +
            "...\n",
    'L':    "..L\n" +
            "LLL\n" +
            "...\n"
};

export class Piece {
    blocks: Block[];
    size: number;

    constructor(charMatrix) {
        //size 1 pieces don't have several rows in the charmatrix
        this.size = Math.max(charMatrix.indexOf("\n"), 1);
        this.blocks = [];

        let rows = charMatrix.split("\n");

        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                let type = rows[y].charAt(x);
                if (type != ".") {
                    this.blocks.push(new Block(type, y, x));
                }
            }
        }
    }

    toString() {
        let str = "";
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                let block = undefined;
                for (let b = 0; b < this.blocks.length; b++) {
                    if ((y == this.blocks[b].ypos) && (x == this.blocks[b].xpos)) {
                        block = this.blocks[b];
                        break;
                    }
                }
                if (block) {
                    str = str + block;
                } else {
                    str = str + ".";
                }
            }
            str = str + "\n";
        }
        return str;
    }

    blockAt(y, x) {
        for (let b = 0; b < this.blocks.length; b++) {
            let block = this.blocks[b];
            if ((block.xpos == x) && (block.ypos == y)) {
                return block;
            }
        }
        return null;
    }

    rotateRight() {
        this.rotate(true);
        return this;
    }

    rotateLeft() {
        this.rotate(false);
        return this;
    }

    //adapted from http://stackoverflow.com/questions/42519/how-do-you-rotate-a-two-dimensional-array/193942#193942
    private rotate(clockwise: boolean) {
        for (let b = 0; b < this.blocks.length; b++) {
            let x = this.blocks[b].xpos;
            let y = this.blocks[b].ypos;
            if (clockwise) {
                this.blocks[b].ypos = x;
                this.blocks[b].xpos = this.size - y - 1;
            } else {
                this.blocks[b].ypos = this.size - x - 1;
                this.blocks[b].xpos = y;
            }
        }
        return this;
    }
}

export class Tetromino extends Piece {
    constructor(public shape: string) {
        super(TETROMINOES[shape])
    }
}