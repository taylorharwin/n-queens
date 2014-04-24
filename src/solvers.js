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

window.findNRooksSolution = function(n) {
  var solutions = [];
  if (n===1){
    return [[]];
  }

  var makeMatrix = function(num){
    var emptyMatrix = [];
    var shallow = [];
    for (var x = 0; x < num; x++){
      for (var y = 0; y < num; y++){
        shallow.push(0);
      }
      emptyMatrix.push(shallow);
      shallow = [];
    }
    return emptyMatrix;
  };

  for (var k = 0; k < n*n; k++){  //run this loop for each position in the matrix
    var z=k%n;
    var counter = 0;
    var solutionMatrix = makeMatrix(n);
    console.log("emptyMatrix created", solutionMatrix);
    for (var i = z; i < n; i++){
      for (var j = 0; j < n; j++){
        solutionMatrix[i][j] = 1;
        console.log("solutionMatrix", solutionMatrix);
        // if (this.Board.hasAnyRowConflicts() || this.Board.hasAnyColConflicts()) {
        //   console.log("row or column conflict");
        //   solutionMatrix[i][j] = 0;
        //}
      }
    }
    console.log("solutionMatrix filled", solutionMatrix);
    for (var g = 0; g < n; g++){
      for (var h = 0; h < n; h++){
        if (solutionMatrix[g][h] === 1){
          counter++;
        }
      }
    }
    if (counter === n){
      solutions.push(solutionMatrix);
    }
  }
  //console.log("solutions", solutions);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solutions));
  return solutions;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = (this.findNRooksSolution(n)).length;

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;


  //create an n*n empty array of zeros;
  //put a rook on first available spot, which means setting spot to one
  //for next rook, traverse rest of available spaces,
  //checking if rook violates row or column conflict
  //if it can occupy a spot and not violate row or column conflict
  //increment solution counter
  //repeat for all rooks
  //return counter value
  //
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
