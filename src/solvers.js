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
  var solution = new Board({n:n}); // fixme
  var matrix =[];
  var row = 0;
  var col = 0;
  //write our algo
  var test = false;
  var theSituation = function(row,col){
    //place a peice on the board into the 'next' spot
    solution.togglePiece(row,col);
    //test if there are any Rook conflicts
    test = solution.hasAnyRooksConflicts();
    //if there are conflicts we remove the peice and recurse again on
    //next position in row
    if(test){
      solution.togglePiece(row,col);
      col++;
      theSituation(row,col);
    }else if(row === n-1){
      return null;
    }
    // if there are no conflicts go to next row and repeat
    else{
      col = 0;
      row++;
      theSituation(row,col);
    }

  }

  //debugger;
  theSituation(row,col);

    for(var i = 0; i < n; i++){
      matrix.push(solution.get(i));

    }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(matrix));
  return matrix;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n:n});
  var treeRecurse = function(row){
    if(row === n){
      solutionCount++;
      return;
    }

    for(var i = 0; i < n; i++){
      board.togglePiece(row,i);
      if(!board.hasAnyRooksConflicts()){
        treeRecurse(row+1);
      }
      board.togglePiece(row,i);
    }

  };

  treeRecurse(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);


  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board({n:n}); // fixme
  var result = solution.rows();

  //debugger;
  var row = 0;
  //write our algo
  var theSituation = function(row){
    // base case when row = n
    // kick out as a solution
    // return solution.rows

    if (row === n){
      result = _.map(solution.rows(), function(row){
        return row.slice();
      });
      return;
    }
    //
    //
    //
    for (var i=0; i<n; i++){
      solution.togglePiece(row,i);
      if (!solution.hasAnyQueensConflicts()){
        theSituation(row+1);
      }
      solution.togglePiece(row,i);
    }



  };

  //debugger;
  theSituation(row);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(result));
  return result;


};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
