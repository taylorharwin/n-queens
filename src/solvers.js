/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard,
// with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function (n) {
var solution = [];
    var board = new Board({n: n});

    var findASolution = function (board, cols, row) {
        if (row === cols) {
          solution.push(board.rows());
          return;
        }
        for (var i = 0; i < cols; i++) {
          board.togglePiece(row, i);
          if (!board.hasAnyRooksConflicts()) {
            findASolution(board, cols, row + 1);
          }
          board.togglePiece(row, i);
        }
      };

  findASolution(board, n, 0);
  return solution[0];
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function (n) {

  var solutionCount = 0;
  var board = new Board({n: n});

  var findSolutions = function (board, cols, row) {
    if (row === cols) {
      solutionCount++;
      return;
    }

    for (var i = 0; i < cols; i++) {
      board.togglePiece(row, i);

      if (!board.hasAnyRooksConflicts()) {
        findSolutions(board, cols, row + 1);
      }
      board.togglePiece(row, i);
    }
  };

  findSolutions(board, n, 0);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = [];
  var board = new Board({n: n});

  var findSolutions = function findSolutions (board, cols, row) {

      if (row === cols && !board.hasAnyQueensConflicts()) {
        solution.push(board.rows());
        return;
      }
      for (var i = 0; i < cols; i++) {
        board.togglePiece(row, i);

        if (!board.hasAnyQueensConflicts())  {
          findSolutions(board, cols, row + 1);
        }
        board.togglePiece(row, i);
      }
    };

  findSolutions(board, n, 0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution[0];



};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});

  var findSolutions = function findSolutions (board, cols, row) {

      if (row === cols && !board.hasAnyQueensConflicts()) {
        if(n === 3)debugger;
        solutionCount++;
        return;
      }
      for (var i = 0; i < cols; i++) {
        board.togglePiece(row, i);

        if (!board.hasAnyQueensConflicts())  {
          findSolutions(board, cols, row + 1);
        }
        board.togglePiece(row, i);
      }
    };

  findSolutions(board, n, 0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
