// @ts-check

const BOARD = document.getElementById("board");
const SQUARES = Array.from(document.querySelectorAll(".square"));
const RESULT_MESSAGE = document.getElementById("result-message");
const RESTART_BUTTON = document.getElementById("restart-button");
const PLAYER_UNICORN = "unicorn";
const PLAYER_DRAGON = "dragon";
let winnerCombo;
let result;

let currentPlayer = PLAYER_DRAGON;
BOARD.classList.add(currentPlayer);

const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function newGame() {
  RESULT_MESSAGE.innerText = "";
  RESTART_BUTTON.classList.add("hidden");
  SQUARES.forEach(square => {
    square.classList.remove("dragon", "unicorn", "winner-squares");
    square.addEventListener("click", fillSquare);
  });
}

newGame();

// Adds player classes to clicked game squares
function fillSquare(e) {
  let square = e.target;
  // Checks whether clicked square already has a player class
  if (
    !square.classList.contains(PLAYER_DRAGON) &&
    !square.classList.contains(PLAYER_UNICORN)
  ) {
    square.classList.add(currentPlayer);
    // Swaps currentPlayer class of BOARD (used for hover preview effect)
    BOARD.classList.toggle("dragon");
    BOARD.classList.toggle("unicorn");
    checkWinner();
    if (result != currentPlayer) {
      checkTiedResult();
    }
    switchPlayer();
  }
}

function checkWinner() {
  WINNING_COMBOS.forEach((combo) => {
    if (
      SQUARES[combo[0]].classList.contains(currentPlayer) &&
      SQUARES[combo[1]].classList.contains(currentPlayer) &&
      SQUARES[combo[2]].classList.contains(currentPlayer)
    ) {
      winnerCombo = combo;
      result = currentPlayer;
      displayResult(result);
    }
  });
}

function checkTiedResult() {
  let filledSquares = 0;
  SQUARES.forEach((square) => {
    if (
      square.classList.contains(PLAYER_DRAGON) ||
      square.classList.contains(PLAYER_UNICORN)
    ) {
      filledSquares++;
      if (filledSquares == 9) {
        displayResult();
      }
    }
  });
}

function switchPlayer() {
  currentPlayer == PLAYER_DRAGON
    ? (currentPlayer = PLAYER_UNICORN)
    : (currentPlayer = PLAYER_DRAGON);
}

function displayResult(result) {
  result == currentPlayer
   ? RESULT_MESSAGE.innerText = `${result.toUpperCase()} IS THE WINNER!`
   : RESULT_MESSAGE.innerText = `IT'S A TIE!`;
   // Adds background colour to winner squares
   winnerCombo.forEach((number) => {
    SQUARES[number].classList.add("winner-squares");
   })
  // Removes event listeners for all squares so no empties can be filled
  // Adds endGame class to prevent next-move hover effect after win/tie
  SQUARES.forEach(square => {
    square.removeEventListener("click", fillSquare);
    square.classList.add("endGame");
  });
  RESTART_BUTTON.addEventListener("click", newGame);
  RESTART_BUTTON.classList.remove("hidden");
}