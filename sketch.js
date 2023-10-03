//create empty 3x3 board
let board = [
    ['', '', ''],  //[0, 1, 2]
    ['', '', ''],
    ['', '', ''],    
];

//assign x's and o's to human/ai players
let ai = 'X';
let human = 'O';
let currentPlayer = human;
let resultP;

function setup() {
    createCanvas(400, 400).parent("canvas-container");
    resetGame();
    button = createButton('New Game');
    button.parent("button-container").style('font-size', '24px').style('font-family', 'Georgia, Times New Roman, Times, serif');
    button.mousePressed(resetGame);
    button.id('resetButton');
    w = width / 3;
    h = height / 3;
}

function resetGame(){
  board = [ //resets the board to blank array
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  currentPlayer = human; //resets turn
  clear(); //clear the canvas
  redraw(); //redraws the canvas
  if (resultP) {
    resultP.remove();
  }
  loop(); //reenables the draw loop if it was stopped due to a win or tie
  let first = Math.floor(Math.random() * 3);
  let second = Math.floor(Math.random() * 3);
  board[first][second] = ai; //sets first move (X) to a random space on the board
}

//helper to check to see if 3 items are the same symbol (x or o) and are not blank
function threeMatch(a, b, c) {
  return (a == b && b == c && a != '');
}

function checkWinner(){
  let winner = null;
  
  //horizontal
  for (let i=0; i<3; i++) {
    if (threeMatch(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
    }
  }
  //vertical
  for (let i=0; i<3; i++) {
    if (threeMatch(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }
  }
  //diagonal from top left corner
  if (threeMatch(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
  }
  //diagonal from top right corner
  if (threeMatch(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0];
  }
  
  let openSpaces = 0;
  for (let i=0; i<3; i++){
    for (let j=0; j<3; j++){
        if (board[i][j] == '') { //if the space on the board is empty
            openSpaces++; //increment openSpaces
        }
    }
  }

  if (winner == null && openSpaces == 0) { //if there are no more open spaces on the board, but the layout does not pass the win conditions (horizontal/vertical/diagonal), return tie
    return 'tie';
  } else {
    return winner; //otherwise return the winner
  }
}

function mousePressed() {
  if (currentPlayer == human) {
    if(mouseX>400 || mouseY>400 ){ //if clicking outside of canvas, do nothing
      return; 
    } 
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);
    if (board[i][j] == '') { //if where the board is clicked is blank
      board[i][j] = human; //set that space as the human's move (O)
      currentPlayer = ai; //set the turn to ai next
      bestMove(); //call the ai function bestMove
    }
  }
}

function draw() {
    background(255);
    strokeWeight(5);
    textSize(32);
    frameRate(60);

    //draws the lines to create the board
    line(w, 0, w, height);
    line(w*2, 0, w*2, height);
    line(0, h, width, h);
    line(0, h*2, width, h*2);
  
    for (let j=0; j<3; j++){
        for (let i=0; i<3; i++){
            let x = w*i + w/2;
            let y = h*j + h/2;
            let spot = board[i][j];
            let r = w / 4;
          if (spot == human) { //if the spot is played by a human player, put an O
            noFill();
            circle(x, y, w/2);
          } else if (spot == ai) { //if the spot is played by ai, put an X
            line(x-r, y-r, x+r, y+r);
            line(x+r, y-r, x-r, y+r);
          }
        }
    }
  
  let result = checkWinner();
  if (result != null) { //displays the winner text at the bottom of the board
    noLoop();
    resultP = createP('');
    resultP
        .style('font-size', '32pt')
        .style('text-align', 'center');
    if (result == 'tie') {
      resultP.html("Tie!")
    } else {
      resultP.html(`${result} wins!`);
    }
  }
}
