class SudokuSolver {
  validate(puzzleString) {
    return puzzleString.length === 81 && /^[\.0-9]*$/.test(puzzleString);
  }

  splitRows(puzzleString, row) {
    return puzzleString.match(/.{1,9}/g);
  }

  splitCols(puzzleString, col) {
    let result = ["", "", "", "", "", "", "", "", ""];
    for (let j = 0; j < 9; j++) {
      for (let i = j; i < 81; i = i + 9) {
        result[j] = result[j] + puzzleString[i];
      }
    }
    return result;
  }

  splitRegions(puzzleString, reg) {
    let rows = this.splitRows(puzzleString);
    let result = ["", "", "", "", "", "", "", "", ""];
    for (let i = 0; i < 9; i++) {
      for (let j = Math.floor(i / 3) * 3; j < Math.floor(i / 3) * 3 + 3; j++) {
        for (let k = (i % 3) * 3; k < (i % 3) * 3 + 3; k++) {
          console.log(i, j, k);
          result[i] = result[i] + rows[j][k];
        }
      }
    }
    console.log(result);
    return result;
  }

  checkRowPlacement(puzzleString, row, column, value) {}

  checkColPlacement(puzzleString, row, column, value) {}

  checkRegionPlacement(puzzleString, row, column, value) {}

  solve(puzzleString) {}
}

module.exports = SudokuSolver;
