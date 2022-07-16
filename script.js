// @ts-check

const BOARD = document.getElementById("board");
const SQUARES = Array.from(document.querySelectorAll(".square"));
const RESULT_MESSAGE = document.getElementById("result-message");
const RESTART_BUTTON = document.getElementById("restart-button");
const PLAYER_UNICORN = "unicorn";
const PLAYER_DRAGON = "dragon";
let winnerCombo;
let result;
let winnerSound = new Audio('win.wav')

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

// This lets the sound effect overlap
function playFillSound() {
  let sound = document.getElementById("pop-sound");
  sound.load();     
  sound.play();
}

function newGame() {
  RESULT_MESSAGE.innerText = "";
  RESTART_BUTTON.classList.add("hidden");
  SQUARES.forEach((square) => {
    square.classList.remove(
      "dragon",
      "unicorn",
      "winner-squares",
      "end-game",
      "filled"
    );
    square.addEventListener("click", fillSquare);
  });
}

newGame();

// Adds player classes to clicked game squares
function fillSquare(e) {
  let square = e.target;
  // Checks whether clicked square already has a player class
  if (!square.classList.contains("filled")) {
    square.classList.add(currentPlayer, "filled");
    playFillSound()
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
      winnerSound.play()
      // Adds background colour to winner squares
      winnerCombo.forEach((number) => {
        SQUARES[number].classList.add("winner-squares");
      });
      displayResult(result);
    }
  });
}

function checkTiedResult() {
  let filledSquares = 0;
  SQUARES.forEach((square) => {
    if (square.classList.contains("filled")) {
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
    ? (RESULT_MESSAGE.innerText = `THE WINNER IS ${result.toUpperCase()}!`)
    : (RESULT_MESSAGE.innerText = `IT'S A TIE!`);
  // Removes event listeners for all squares so no empties can be filled
  // Adds endGame class to prevent next-move hover effect after win/tie
  SQUARES.forEach((square) => {
    square.removeEventListener("click", fillSquare);
    square.classList.add("end-game");
  });
  RESTART_BUTTON.addEventListener("click", newGame);
  RESTART_BUTTON.classList.remove("hidden");
}
