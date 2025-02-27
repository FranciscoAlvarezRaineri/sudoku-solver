const chai = require("chai");
const assert = chai.assert;

const Solver = require("../controllers/sudoku-solver.js");
const puzzlesAndSolutions = require("../controllers/puzzle-strings");

suite("UnitTests", () => {
  suite("Function validate(puzzleString)", function () {
    // Logic handles a valid puzzle string of 81 characters
    test("logic handles a valid puzzle string of 81 characters", function (done) {
      let puzzleAndSolution = puzzlesAndSolutions.puzzlesAndSolutions[0];

      let puzzle = puzzleAndSolution[0];

      assert.equal(Solver.isValidPuzzleString(puzzle), true);
      done();
    });

    test("logic handles a puzzle string with invalid characters (not 1-9 or .", function (done) {
      let input =
        "1.5d.2.84..63h12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
      assert.equal(
        Solver.isValidPuzzleString(input),
        "Invalid characters in puzzle"
      );
      done();
    });

    test("logic handles a puzzle string that is not 81 characters in length", function (done) {
      let input =
        "1.5d.2.84..63h12.7.2..5.....9..1....8.2.3674.3.7.2..9.47....8..1..16....926914.37.";
      assert.equal(input.length, 82);
      assert.equal(
        Solver.isValidPuzzleString(input),
        "Expected puzzle to be 81 characters long"
      );
      done();
    });
  });

  suite("Function solve(puzzleString)", function () {
    test("Valid puzzle strings pass the solver", function (done) {
      let input = puzzlesAndSolutions.puzzlesAndSolutions[0];
      let solution =
        "135762984946381257728459613694517832812936745357824196473298561581673429269145378";
      input = input[0].split(",");
      input = input[0];

      let grid = Solver.convertToGrid(input);

      let solver = new Solver(grid);
      let result = solver.getSolvedPuzzleString();
      assert.equal(result, solution);
      done();
    });

    test("inValid puzzle strings fail the solver", function (done) {
      let input =
        "9.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";

      let grid = Solver.convertToGrid(input);

      let solver = new Solver(grid);
      let result = solver.solve();
      assert.equal(result, false);
      done();
    });

    test("Solver returns the expected solution for an incomplete puzzle", function (done) {
      let input = puzzlesAndSolutions.puzzlesAndSolutions[0];
      let solution =
        "135762984946381257728459613694517832812936745357824196473298561581673429269145378";
      input = input[0].split(",");
      input = input[0];

      let grid = Solver.convertToGrid(input);
      let solver = new Solver(grid);
      let result = solver.getSolvedPuzzleString();
      assert.equal(result, solution);
      done();
    });
  });

  suite(
    "Function checkRowPlacement(puzzleString, row, column, value)",
    function () {
      test("logic handles a valid row placement", function (done) {
        let puzzleAndSolution = puzzlesAndSolutions.puzzlesAndSolutions[0];

        let puzzle = puzzleAndSolution[0];

        // we have the example puzzle string in the input now
        // input's B row is ..63.12.7　（B行に9文字分 -> 946381257 -> B行のB1, B2ときたら4）

        let grid = Solver.convertToGrid(puzzle);
        let solver = new Solver(grid);

        let result = solver.isRightValueViaCoordinate("B", 2, 4);
        assert.equal(result, true);
        done();
      });

      test("logic handles an invalid row placement", function (done) {
        let input = puzzlesAndSolutions.puzzlesAndSolutions[0];
        input = input[0].split(",");
        input = input[0];
        // we have the example puzzle string in the input now
        // input's B row is ..63.12.7

        let grid = Solver.convertToGrid(input);
        let solver = new Solver(grid);

        let result = solver.isRightValueViaCoordinate("B", 2, 7);
        assert.equal(result, false);
        done();
      });
    }
  );

  suite(
    "Function checkColPlacement(puzzleString,row,column,value)",
    function () {
      test("logic handles a valid column placement", function (done) {
        let input = puzzlesAndSolutions.puzzlesAndSolutions[2];
        input = input[0].split(",");
        input = input[0];
        //we have the example puzzle string in the input now
        //input's B row is ..63.12.7
        let grid = Solver.convertToGrid(input);
        let solver = new Solver(grid);

        let result = solver.isRightValueViaCoordinate("B", 5, 8);
        assert.equal(result, true);
        done();
      });

      test("logic handles a invalid column placement", function (done) {
        let input = puzzlesAndSolutions.puzzlesAndSolutions[2];
        input = input[0].split(",");
        input = input[0];
        //we have the example puzzle string in the input now
        //input's B row is ..63.12.7
        let grid = Solver.convertToGrid(input);
        let solver = new Solver(grid);

        let result = solver.isRightValueViaCoordinate("B", 5, 4);
        assert.equal(result, false);
        done();
      });
    }
  );

  suite(
    "Function checkRegionPlacement(puzzleString,row,column,value",
    function () {
      test("logic handles a valid region(3x3 grid) placement", function (done) {
        let input = puzzlesAndSolutions.puzzlesAndSolutions[0];
        input = input[0].split(",");
        input = input[0];
        //we have the example puzzle string in the input now
        //input's region for B8 is
        //'.', '8', '4',
        //'2', '.', '7',
        //'.', '.', '.'
        let grid = Solver.convertToGrid(input);
        let solver = new Solver(grid);

        let result = solver.isRightValueViaCoordinate("B", 8, 5);
        // let result = solver.checkRegionPlacement(input, 'B', 8, 5);
        assert.equal(result, true);
        done();
      });

      test("logic handles an invalid region(3x3 grid) placement", function (done) {
        let input = puzzlesAndSolutions.puzzlesAndSolutions[0];
        input = input[0].split(",");
        input = input[0];
        //we have the example puzzle string in the input now
        //input's region for B8 is
        //'.', '8', '4',
        //'2', '.', '7',
        //'.', '.', '.'
        let grid = Solver.convertToGrid(input);
        let solver = new Solver(grid);

        let result = solver.isRightValueViaCoordinate("B", 8, 8);
        assert.equal(result, false);
        done();
      });
    }
  );
});
