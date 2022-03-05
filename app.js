/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

 const WIDTH = 7;
 const HEIGHT = 6;
 
 let currPlayer = 1; // active player: 1 or 2
 const board = []; // array of rows, each row is array of cells  (board[y][x])
 
 /** makeBoard: create in-JS board structure:
  *    board = array of rows, each row is array of cells  (board[y][x])
  */
 
 function makeBoard() {
   // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for(let y = 0; y < HEIGHT; y++){
    board.push(Array.from({ length: WIDTH}));
  }
 }
 
 /** makeHtmlBoard: make HTML table and row of column tops. */
 function makeHtmlBoard() {
   // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
   const board = document.querySelector('#board');
   
   
   // TODO: add comment for this code
 
     //create column top row element 
   const top = document.createElement("tr");
     //give top column row, id=column-top 
   top.setAttribute("id", "column-top");
     //add click event for players to choose column to place piece in
   top.addEventListener("click", handleClick);
 
     //for loop for finding x-axis of game board
   for (let x = 0; x < WIDTH; x++) {
     //creating top column cells for clicking event
     const headCell = document.createElement("td");
       //giving each cell and id of index so that it can be identified later
     headCell.setAttribute("id", x);
       //appending to DOM, top column
     top.append(headCell);
   }
   //appending top column to DOM inside game board
   board.append(top);
 
   // TODO: add comment for this code
 
     //loop through value of height to add rows to game board, y-axis
     for(let y = 0; y < HEIGHT; y++) {
       //create a table row, building y-axis
       const row = document.createElement("tr");
     // for loop for finding how many cells to put in each row
       for(let x = 0; x < WIDTH; x++) {
       //create table cells within table row, building x-axis
       const cell = document.createElement("td");
       //setting id to each cell, giving y,x coordinates
       cell.setAttribute("id", `${y}-${x}`);
       //appending each td in every iteration to the table row
       row.append(cell);
     }
     //appends row to the game board, one iteration at a time
     board.append(row);
   }
 }
 
 /** findSpotForCol: given column x, return top empty y (null if filled) */
 
 function findSpotForCol(x) {
   // TODO: write the real version of this, rather than always returning 0
   for(let y = HEIGHT -1; y >=0; y--){
     if(!board[y][x]){
       return y;
     }
   }
   return null;
 }
 
 /** placeInTable: update DOM to place piece into HTML table of board */
 
 function placeInTable(y, x) {
   // TODO: make a div and insert into correct table cell
   const newDiv = document.createElement('div');
   newDiv.classList.add('piece');
   newDiv.classList.add('p'+currPlayer);
   const placeLoc = document.getElementById(`${y}-${x}`);
   newDiv.style.top = -50 * (y + 2);
   placeLoc.append(newDiv);
 }
 
 /** endGame: announce game end */
 
 function endGame(msg) {
   // TODO: pop up alert message
   alert(msg);
 }
 
 /** handleClick: handle click of column top to play piece */
 
 function handleClick(evt) {
   // get x from ID of clicked cell
   let x = +evt.target.id;
 
   // get next spot in column (if none, ignore click)
   const y = findSpotForCol(x);
   if (y === null) {
     return;
   }
 
   // place piece in board and add to HTML table
   // TODO: add line to update in-memory board
   board[y][x] = currPlayer;
   placeInTable(y, x);
   
 
   // check for win
   if (checkForWin()) {
     return endGame(`Player ${currPlayer} won!`);
   }
 
   // check for tie
   // TODO: check if all cells in board are filled; if so call, call endGame
     if(board.every(row => row.every(cell => cell))){
       return endGame('Tie game!')
     }
     
 
   // switch players
   // TODO: switch currPlayer 1 <-> 2
   currPlayer = currPlayer === 1 ? 2 : 1;
 }
 
 /** checkForWin: check board cell-by-cell for "does a win start here?" */
 
 function checkForWin() {
   function _win(cells) {
     // Check four cells to see if they're all color of current player
     //  - cells: list of four (y, x) cells
     //  - returns true if all are legal coordinates & all match currPlayer
 
     return cells.every(
       ([y, x]) =>
         y >= 0 &&
         y < HEIGHT &&
         x >= 0 &&
         x < WIDTH &&
         board[y][x] === currPlayer
     );
   }
 
   // TODO: read and understand this code. Add comments to help you.
 
   for (var y = 0; y < HEIGHT; y++) {
     for (var x = 0; x < WIDTH; x++) {
       const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
       const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
       const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
       const diagUR = [[y, x], [y - 1, x + 1], [y - 2, x + 2], [y - 3, x + 3]];
       const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
       const diagUL = [[y, x], [y - 1, x - 1], [y - 2, x - 2], [y - 3, x - 3]];
 
       if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL) || _win(diagUR) || _win(diagUL)) {
         return true;
       }
     }
   }
 }
 
 makeBoard();
 makeHtmlBoard();
 