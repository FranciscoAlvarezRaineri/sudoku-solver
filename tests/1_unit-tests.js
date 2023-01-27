const chai = require("chai");
const assert = chai.assert;
const { suite } = require("mocha");

const SudokuSolver = require("../controllers/sudoku-solver.js");
const sudokus = require("../controllers/puzzle-strings").puzzlesAndSolutions;
const sudoku1 = sudokus[0][0];
const sudoku1Solved = sudokus[0][1];
let solver = new SudokuSolver();

suite("Unit Tests", () => {
  suite("String", () => {
    test("Logic handles a valid puzzle string of 81 characters", (done) => {
      assert.isTrue(solver.validate(sudoku1));
      assert.isTrue(solver.validate(sudoku1Solved));
      done();
    });
    test("Logic handles a puzzle string with invalid characters (not 1-9 or .)", (done) => {
      assert.isFalse(solver.validate("hola"));
      assert.isFalse(
        solver.validate(
          "11111111111111111111111111111111111111111111111111111111111111111111111111111111a"
        )
      );
      done();
    });
    test("Logic handles a puzzle string that is not 81 characters in length", (done) => {
      assert.isFalse(solver.validate("hola"));
      assert.isFalse(solver.validate("111"));
      done();
    });
    suite("Placement", () => {
      test("Logic handles a valid row placement", (done) => {
        done();
      });
      test("Logic handles an invalid row placement", (done) => {
        done();
      });
      test("Logic handles a valid column placement", (done) => {
        done();
      });
      test("Logic handles an invalid column placement", (done) => {
        done();
      });
      test("Logic handles a valid region (3x3 grid) placement", (done) => {
        done();
      });
      // Logic handles an invalid region (3x3 grid) placement
    });
  });
  // Valid puzzle strings pass the solver
  // Invalid puzzle strings fail the solver
  // Solver returns the expected solution for an incomplete puzzle
});
