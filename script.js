// @ts-check

const BOARD = document.getElementById('board')
const SQUARES = Array.from(document.querySelectorAll('.square'));
const RESULT = document.getElementById('display-result')
const PLAYER_UNICORN = "unicorn"
const PLAYER_DRAGON = "dragon"

let currentPlayer = PLAYER_DRAGON
BOARD.classList.add(currentPlayer)

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

function newGame() {
    // clear board (empty each square - set to null?)
    // hide result and button
    SQUARES.forEach((square) => {
        square.classList.remove(currentPlayer)
        square.addEventListener("click", fillSquare)
    });

}

newGame()

// FILL SQUARE
// check whether clicked square is empty/null
// fill square with current player
// check if winner
// if not, swap turns
function fillSquare(e) {
    let square = e.target
    if (!square.classList.contains(PLAYER_DRAGON || PLAYER_UNICORN)) {
        square.classList.add(currentPlayer)
        if (BOARD.classList.contains('dragon')) {
            BOARD.classList.remove('dragon')
            BOARD.classList.add('unicorn')
        } else {
            BOARD.classList.remove('unicorn')
            BOARD.classList.add('dragon')
        }
        checkWinner()
        switchPlayer()
    }
    console.log(e.target)
}

function switchPlayer() {
    currentPlayer == PLAYER_DRAGON ? currentPlayer = PLAYER_UNICORN : currentPlayer = PLAYER_DRAGON;
}

function checkWinner() {
    WINNING_COMBOS.forEach(combo => {
        if (SQUARES[combo[0]].classList.contains(currentPlayer) 
        && SQUARES[combo[1]].classList.contains(currentPlayer) 
        && SQUARES[combo[2]].classList.contains(currentPlayer)) {
            let result = currentPlayer
            displayResult(result)
        } else if () {
            // tied result
        }
    });
}

function displayResult(result) {
    console.log("winner is ", result)
}

// CHECK WINNER
// check SQUARES array against WINNING_COMBOS
// if winner, show result and button
// set event listener for button - launch newGame
// Remove event listeners for all squares so no empties can be filled:
//      SQUARES.forEach((square) => {
//          square.removeEventListener("click", fillSquare)
// });


// TO DO:
// - checkWinner function
// - displayResult function
// - show/hide display-result div (hide at newGame and display at displayResult)
// - eventListener for NEW GAME button
// - change background color of winner squares