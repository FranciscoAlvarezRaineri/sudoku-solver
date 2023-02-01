"use strict";

const puzzlesAndSolutions = require("../controllers/puzzle-strings");
const Solver = require("../controllers/sudoku-solver.js");
module.exports = function (app) {
  app.route("/api/check").post((req, res) => {
    const Rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
    let { puzzle, coordinate, value } = req.body;
    let conflictArray = [];

    if (!puzzle || !coordinate || !value) {
      return res.send({
        error: "Required field(s) missing",
      });
    }
    console.log("coordinate:", coordinate, "value:", value);
    debugger;
    //coordinate is a letter A-I followed by number 1-9
    let row = coordinate.substr(0, 1);
    let column = Number(coordinate.substr(1, coordinate.length));
    value = Number(value);
    console.log("row:", row, "col:", column, "value:", value);

    let argumentValidator = Solver.argumentValidator(row, column, value);
    if (argumentValidator != true) {
      return res.send({
        error: argumentValidator,
      });
    }

    if (Solver.isValidPuzzleString(puzzle) !== true) {
      return res.send({
        error: Solver.isValidPuzzleString(puzzle),
      });
    }

    let grid = Solver.convertToGrid(puzzle);
    let solver = new Solver(grid);

    let isRightValueViaCoordinate = solver.isRightValueViaCoordinate(
      row,
      column,
      value
    );

    if (isRightValueViaCoordinate === true) {
      return res.send({
        valid: true,
      });
    }

    let reason = solver.isValidResult;

    if (reason["conflictRow"]) {
      conflictArray.push("row");
    }

    if (reason["conflictCol"]) {
      conflictArray.push("column");
    }

    if (reason["conflictGrid"]) {
      conflictArray.push("region");
    }

    return res.send({
      valid: false,
      conflict: conflictArray,
    });
  });

  app.route("/api/solve").post((req, res) => {
    if (!req.body.puzzle) {
      return res.send({
        error: "Required field missing",
      });
    }
    let puzzleString = req.body.puzzle;
    const validateResult = Solver.isValidPuzzleString(puzzleString);

    if (validateResult === true) {
      let grid = Solver.convertToGrid(puzzleString);
      let solver = new Solver(grid);

      if (solver.solve(puzzleString)) {
        let solution = solver.getSolvedPuzzleString();
        return res.send({
          solution: solution,
        });
      } else {
        return res.send({
          error: "Puzzle cannot be solved",
        });
      }
    }

    res.send({
      error: validateResult,
    });
  });
};
