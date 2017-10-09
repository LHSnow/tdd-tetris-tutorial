describe('Next tetromino', function() {
    describe("A new tetromino bag", function() {
        var bag;
        var tetromino;

        beforeEach(function() {
            bag = new TetrominoBag();
        });

        it("does not have a record of previous pieces", function() {
            expect(bag.history.length).toBe(0);
        });
    });

    describe("Picking a tetromino from the bag", function() {
        var bag;
        var tetromino;

        beforeEach(function() {
            bag = new TetrominoBag();
            tetromino = bag.pick();
        });

        it("returns a random tetromino", function() {
            var shapes = ["T", "O", "I", "S", "Z", "L", "J"];
            expect(shapes).toContain(tetromino.shape);
        });

        it("adds it to bag history", function() {
            expect(bag.history.length).toBe(1);
            expect(bag.history[0]).toEqual(tetromino.shape);
        });

        it("removes oldest history item if history exceeds 4 shapes", function() {
            var picked = [];
            picked.push(tetromino);
            for (var t = 0; t < 4; t++) {
                picked.push(bag.pick());
            }
            expect(bag.history.length).toBe(4);
            for (var t = 0; t < 4; t++) {
                expect(bag.history[t]).toEqual(picked[t + 1].shape);
            }
        });
    });

    describe("Peeking into the bag", function() {
        var bag;
        var tetromino;

        beforeEach(function() {
            bag = new TetrominoBag();
            tetromino = bag.peek();
        });

        it("reveals next item to be picked", function() {
            expect(bag.pick().shape).toEqual(tetromino.shape);
        });

        it("does not change the outcome of the next peek", function() {
            for (var i = 0; i < 10; i++) {
                expect(bag.peek().shape).toEqual(tetromino.shape);
            }
        });
    });
});