const _ = require('lodash');
const readline = require('readline');

const sum = (array) => {
  return array.reduce((a, b) => a + b)
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Game {
  constructor() {
    this.board = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];
    this.currentPlayer = 1;
    this.finished = false;
  }

  printBoard() {
    for (let row of this.board) {
      this.printRow(row);
    }
  }

  getNextMove() {
    this.promptUser(() => {
      if (!this.finished) {
        this.getNextMove();
      }
    });
  }

  promptUser(callback) {
    let playerName = this.currentPlayer === 1 ?
      'Player 1' :
      'Player 2';

    this.printBoard();

    rl.question(`${playerName}'s turn.  Please input a move.`, (answer) => {
      let move = answer.split(' ');
      this.specifyMove(move);
      callback();
    });
  }

  printRow(row) {
    console.log(
      _.map(row, (cell) => {
        if (cell === 0) { return '-' };
        if (cell === -1) { return 'O' };
        if (cell === 1) { return 'X' };
      }).join(' | ')
    );
  }

  specifyMove(move) {
    this.verifyMove();
    this.board[move[0]][move[1]] = this.currentPlayer;
    this.currentPlayer = -this.currentPlayer;
    this.checkForWinner();
    this.checkIfFull();
  }

  checkForWinner() {
    let sums = [
      sum(this.board[0]),
      sum(this.board[1]),
      sum(this.board[2]),
      sum([this.board[0][0], this.board[1][1], this.board[2][2]]),
      sum([this.board[0][2], this.board[1][1], this.board[2][0]])
    ];

    if ( _.some(sums, sum => sum === 3) ) {
      console.log('Player 1 wins');
      this.finished = true
    }

    if ( _.some(sums, sum => sum === -3) ) {
      console.log('Player 2 wins');
      this.finished = true
    }
  }

  verifyMove() {
    return true;
  }

  checkIfFull() {
    let full = true;
    for (let row of this.board) {
      for (let cell of row) {
        if (cell === 0) {
          full = false;
        }
      }
    }
    if (full) {
      console.log('Game is a draw')
      this.finished = true;
    }
  }
}

let game = new Game();
game.getNextMove();
