const BOARD = document.getElementById('board')
// const SQUARES = Array.from(document.querySelectorAll('.square'));
const SQUARES = document.querySelectorAll('.square');
const RESULT = document.getElementById('display-result')
const PLAYER_UNICORN = "🦄"
const PLAYER_DRAGON = "🐲"
let currentPlayer = PLAYER_DRAGON

const WINNING_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

console.log(SQUARES[1]);

function newGame() {
    // clear board (empty each square - set to null?)
    // hide result and button
    // set event listener for click on any square (FILL SQUARE)
}

newGame()

// FILL SQUARE
// check whether clicked square is empty/null
// fill square with current player
// check if winner
// if not, swap turns

// CHECK WINNER
// check SQUARES array against WINNING_COMBOS
// if winner, show result and button
// set event listener for button - launch newGame
// prevent any other squares being clicked - remove event listener
