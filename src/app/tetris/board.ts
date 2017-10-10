import {Block, Piece} from "./piece";

export class Board {
    public width: number;
    public height: number;
    falling: Piece;
    lastCleared: number[];
    totalScore: number;
    fallX: number;
    fallY: number;
    matrix: Block[][];

    constructor(height, width) {
        this.fallX = 0;
        this.fallY = 0;
        this.totalScore = 0;
        this.width = width + 2;
        this.height = height + 2;
        this.matrix = [];
        for (let y = 0; y < this.height; y++) {
            this.matrix[y] = ([] as Block[]);
            for (let x = 0; x < this.width; x++) {
                if (y == 0 || x == 0 || y == this.height - 1 || x == this.width - 1) {
                    //add wall block
                    this.matrix[y][x] = new Block("+");
                }
            }
        }
    }

    toString() {
        let str = "";

        //ignore walls in string representation
        for (let y = 1; y < this.height - 1; y++) {
            for (let x = 1; x < this.width - 1; x++) {
                let block = this.matrix[y][x];
                let fallingBlock = this.fallingBlockAt(y, x);
                if (fallingBlock != null) {
                    str = str + fallingBlock;
                } else if (block == undefined) {
                    str = str + ".";
                } else {
                    str = str + block;
                }
            }
            str = str + "\n";
        }
        return str;
    }

    //create a board with pre-fixed blocks from a string representation
    //@param charMatrix should not contain walls
    //utility method to ease testing (and possible b-mode and saved games)
    fromString(charMatrix) {
        let height = charMatrix.indexOf("\n");
        let rows = charMatrix.split("\n");
        let width = rows[0].length;

        for (let y = 0; y < height; y++) {
            if (rows[y].length != width) {
                throw "row " + y + " has a different width than row 0";
            }
            for (let x = 0; x < width; x++) {
                let type = rows[y].charAt(x);
                if (type != ".") {
                    this.matrix[y + 1][x + 1] = new Block(type);
                }
            }
        }
    }

    //returns a Block if there is a falling one at absolute board position y,x
    //null otherwise
    fallingBlockAt(y, x) {
        if (!this.hasFalling()) {
            return null;
        }
        return this.falling.blockAt(y - this.fallY, x - this.fallX);
    }

    //true if there is currently a falling piece (or block)
    hasFalling() {
        return !!this.falling;
    }

    //spawn a new piece/block/tetromino onto the board
    drop(piece: Piece) {
        //at most one block may be falling at the same time
        if (this.hasFalling()) {
            throw "already falling";
        }

        //find horizontal centre of board
        let xOffset = Math.floor(this.width / 2) - Math.floor(piece.size / 2);
        //single block
        this.falling = piece;
        this.fallX = xOffset;
        this.fallY = 1;
    }

    tick() {
        this.fallY++;
        if (this.collision()) {
            this.fallY--; //undo
            this.lockFalling();
            this.clear();
            this.score();
        }
    }

    //hard drop brings current falling piece to the bottom
    fall() {
        while (this.hasFalling()) {
            this.tick();
        }
    }

    // Locks falling blocks into place by moving their indivudual blocks to this.matrix
    lockFalling() {
        let x = this.fallX;
        let y = this.fallY;
        if(this.hasFalling()) {
            for (let b = 0; b < this.falling.blocks.length; b++) {
                let block = this.falling.blocks[b];
                this.matrix[y + block.ypos][x + block.xpos] = block;
            }
        }

        this.falling = null;
    }

    //clears/replaces full rows and sets lastCleared to an array of indices
    clear() {
        let rows = this.fullRows();
        let emptyRow: Block[];

        if (rows.length > 0) {
            emptyRow = new Array(this.width);
            emptyRow[0] = new Block("+");
            emptyRow[this.width - 1] = new Block("+");
        }
        for (let i = 0; i < rows.length; i++) {
            //add 1 to the row index for every row already removed,
            //as one row is replaced for each removal
            this.matrix.splice(rows[i] + i, 1);
            this.matrix.splice(1, 0, emptyRow);
        }
        this.lastCleared = rows;
    }

    //adds to total score depending on the length of lastCleared
    score() {
        switch (this.lastCleared.length) {
            case 1 :
                this.totalScore += 1;
                break;
            case 2 :
                this.totalScore += 3;
                break;
            case 3 :
                this.totalScore += 5;
                break;
            case 4 :
                this.totalScore += 8;
                break;
        }
    }

    fullRows() {
        let rowIndexes = [];
        //ignore first and last row
        for (let y = this.height - 2; y > 0; y--) {
            //ignore walls
            let full = true;
            for (let x = 1; x < this.width - 1; x++) {
                if (this.matrix[y][x] == undefined) {
                    full = false;
                    break;
                }
            }
            if (full) {
                rowIndexes.push(y);
            }
        }
        return rowIndexes;
    }

    //move currently falling piece to the left
    moveLeft() {
        this.fallX--;
        if (this.collision()) {
            //undo
            this.fallX++;
        }
    }

    //move currently falling piece to the right
    moveRight() {
        this.fallX++;
        if (this.collision()) {
            //undo
            this.fallX--;
        }
    }

    //move currently falling piece down (as tick)
    moveDown() {
        this.tick();
    }

    rotateRight() {
        //"try"
        this.falling.rotateRight();
        if (this.collision()) {
            //try wallkick (right first, then left as TGM)
            //note: both move actions contain their own collision checks and will undo themselves if illegal
            this.moveRight();
            this.moveLeft();
            if (this.collision()) {
                //undo
                this.falling.rotateLeft();
            }
        }
    }

    rotateLeft() {
        //"try"
        this.falling.rotateLeft();
        if (this.collision()) {
            //try wallkick (right first, then left as TGM)
            //note: both move actions contain their own collision checks and will undo themselves if illegal
            this.moveRight();
            this.moveLeft();
            if (this.collision()) {
                //undo
                this.falling.rotateRight();
            }
        }
    }

    //true if any falling block shares position with any fixed block, including board walls
    collision() {
        //iterate over area covered by the falling shape
        let xmax = this.fallX + this.falling.size;
        let ymax = this.fallY + this.falling.size;
        for (let y = this.fallY; y < ymax; y++) {
            for (let x = this.fallX; x < xmax; x++) {
                let fixedBlock = this.matrix[y][x];
                if (fixedBlock) {
                    if (this.fallingBlockAt(y, x) != null) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

}
