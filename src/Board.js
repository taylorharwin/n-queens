// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      //rows() returns an array of [1,0,1]-type values
      //check for each element in row if there is >1 "1"
      //if so return true. Otherwise return false

      var boardRows = this.rows();
      console.log(boardRows);
      var counter = 0;
      for (var i = 0; i < boardRows[rowIndex].length; i++){

        if (boardRows[rowIndex][i] === 1){
          counter++;
        }
      }
      if (counter > 1){
        return true;
      }
      return false;
    },

    // // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      //get all rows, accessible by a variable
      //assign a counter variable to 0
      //for each row loop over all elements in rows
      //if counter > 1 for any row
      //return true
      //otherwise return false
      var boardRow = this.rows();
      var counter = 0;
      for (var i = 0; i < boardRow.length; i++){
        for (var j = 0; j < boardRow[i].length; j++){
          if (boardRow[i][j] === 1){
            counter++;
          }
        }
        if (counter > 1){
          return true;
        }
        counter = 0;
      }
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    makeColumns : function(arr){
      var allColumns = [];
      var singleColumns=[];
      for(var i=0; i<arr.length; i++) {
        for(var j=0; j<arr[i].length; j++) {
          singleColumns.push(arr[j][i]);
        }
        allColumns.push(singleColumns);
        singleColumns =[];
      }
      return allColumns;
    },

    hasColConflictAt: function(colIndex) {

      //provided a column index, identify it on board.
      //If it has more than one "1". return true. Otherwise, return false
      var boardRows = this.rows();
      var counter = 0;
      var boardColumns = this.makeColumns(boardRows);

      for(var i=0; i<boardColumns[colIndex].length; i++) {
        if(boardColumns[colIndex][i] === 1) {
          counter++;
        }
      }
      if(counter>1) {
        return true;
      }
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var boardColumns = this.makeColumns(this.rows());
      for (var i = 0; i < boardColumns.length; i++){
        if (this.hasColConflictAt(i)){
          return true;
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict

    hasMajorDiagonalConflictAt: function (majorDiagonalColumnIndexAtFirstRow) {
      var boardRows = this.rows();
      var diagonal = [];
      var pivot = majorDiagonalColumnIndexAtFirstRow;
      for (var j = 0; j < boardRows.length; j++) {
        if (pivot === 0) {
          diagonal.push(boardRows[j][j]);
        }
        else if (pivot > 0) {
          if (this._isInBounds(j, pivot + j)) {
            diagonal.push(boardRows[j][pivot + j]);
          }
        }
        else if (this._isInBounds(j, (-pivot + j))) {
          diagonal.push(boardRows[-pivot + j][j]);
        }
      }
      var counter = 0;
      for (var i = 0; i < diagonal.length; i++) {
        if (diagonal[i] === 1) {
          counter++;
        }
      }
      return true ? (counter>1) : false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var boardRow = this.rows();
      for (var i = 0; i < boardRow.length; i++){
        if (this.hasMajorDiagonalConflictAt(i)){
          return true;
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var boardRows = this.rows();
      var diagonal = [];
      var pivot = minorDiagonalColumnIndexAtFirstRow;
      for (var j = 0; j < boardRows.length; j++) {
        if (pivot === boardRows[0].length-1) {
          diagonal.push(boardRows[j][boardRows[0].length-1-j]);
        }
        else if (pivot > 0) {
          if (this._isInBounds(j, pivot + j)) {
            diagonal.push(boardRows[j][pivot - j]);
          }
        }
        // else if (this._isInBounds(j, (-pivot + j))) {
        //   diagonal.push(boardRows[-pivot + j][j]);
        // }
      }
      var counter = 0;
      console.log(diagonal);
      for (var i = 0; i < diagonal.length; i++) {
        if (diagonal[i] === 1) {
          counter++;
        }
      }
      return true ? (counter>1) : false;
    },

        // test if any major diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var boardRow = this.rows();
      for (var i = 0; i < boardRow.length; i++){
        if (this.hasMinorDiagonalConflictAt(i)){
          return true;
        }
      }
      return false;
    },


    /*--------------------  End of Helper Functions  ---------------------*/



  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());


