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
      //use index to get row
      var row = this.get(rowIndex);
      //create accumulator
      var accumulator = 0;
      // use reduce to sum up all values
      accumulator = _.reduce(row, function(accumulator,value){
        return accumulator += value;
      },accumulator);

      // for(var i = 0;i< row.length; i++){
      //   accumulator+=row[i];
      // }
      //return if greater than 1
      return accumulator > 1;

    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var length = this.get("n");
      // initialize a variable called results to false
      var results = false;
      // loop through each row calling hasRowConfilctAt
      for (var i=0; i<length; i++){
        results = this.hasRowConflictAt(i);
        if (results){
          return results;
        }
      }
      // update results to results of hasRowConfilctAt
      // return if true

      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // initialize an accumulator variable to zero
      var accumulator = 0;
      var length = this.get("n");
      // loop over each row
      for (var i=0; i<length; i++){
        var row = this.get(i);
        accumulator += row[colIndex];
      }
      return accumulator > 1;
      // add the value of the column index to accumulator
      // return if accumulator is greater than one
      //return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // get size of board
      var length = this.get("n");
      // initialize results to false
      var results = false;
      // loop over summing each column
      for (var i=0; i<length; i++){
        results = this.hasColConflictAt(i);
        if (results){
          return results;
        }
      }
      // if any column > 1 return true
      // else return false
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      //get size of matrix
      var length = this.get('n');
      //initialize an accumulator
      var accumulator = 0;
      //loop over diagonal and add value to accumulator
      // for(var i = colIndex; i < length; i++){
      //   for(var j = 0; j < length; j++){

      var rowIndex = 0;
      var colIndex = majorDiagonalColumnIndexAtFirstRow;
      while(rowIndex < length){
        if(colIndex < 0 || colIndex > length-1){
          rowIndex++;
          colIndex++;
        }else{
          var row = this.get(rowIndex);
          accumulator+=row[colIndex];
          rowIndex++;
          colIndex++;
        }
      }

      /* Just wanted to get this down so it can be erased on the whiteboard
      var index = majorDiameterColumnIndexAtFirstRow
      if (index >= 0){
        i=0;
      }
      if (index < 0){
        i=-index;
      }
      if(index <= 0){
        j=0;
      }
      if(index > 0){
        j=index;
      }
       */

      //return if > 1

      return accumulator > 1; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      //get matrix size
      var length = this.get('n');
      //initialize result to false
      var results = false;
      //loop over size starting column at -length
      for(var i = -length+1;i < length; i++){
        results = this.hasMajorDiagonalConflictAt(i);
        if(results){
          return true;
        }
        //return if true
      }
      //else return false
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {

      var length = this.get('n');
    //initialize an accumulator
      var accumulator = 0;
      //loop over diagonal and add value to accumulator
      // for(var i = colIndex; i < length; i++){
      //   for(var j = 0; j < length; j++){

      var rowIndex = length-1; // possibly starts at -minorDiagnal....
      var colIndex = minorDiagonalColumnIndexAtFirstRow; // now going to be larger
      while(rowIndex >= 0){
        if(colIndex < 0 || colIndex > length-1){
          rowIndex--;
          colIndex++;
        }else{
          var row = this.get(rowIndex);
          accumulator+=row[colIndex];
          rowIndex--;
          colIndex++;
        }
      }

      return accumulator > 1; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {

      var length = this.get('n');
      //initialize result to false
      var results = false;
      //loop over size starting column at -length
      for(var i = -length+1;i < length; i++){
        results = this.hasMinorDiagonalConflictAt(i);
        if(results){
          return true;
        }
        //return if true
      }
      //else return false
      return false; // fixme
    }

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
