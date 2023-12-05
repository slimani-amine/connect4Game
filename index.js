const turn = document.querySelector(".turn");
const board = document.querySelector(".white-board");
const marker = document.querySelector("#marker");
let player1Time = 30;
let player2Time = 30;
let currentPlayer = "PLAYER 1";
let interval;
let boardMatrix = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

scoreOfPlayer1 = document.querySelector(".scoreOfPlayer1");
scoreOfPlayer2 = document.querySelector(".scoreOfPlayer2");

function startGame() {
  interval = setInterval(() => {
    if (player1Time <= 0 && player2Time <= 0) {
      clearInterval(interval);
      player1Time = 30;
      player2Time = 30;
      currentPlayer = "PLAYER 1";
      return;
    }

    if (currentPlayer === "PLAYER 2") {
      turn.style.backgroundImage = 'url("images/turn-background-yellow.svg")';
      turn.children[0].style.color = "black";
      turn.children[1].style.color = "black";
      marker.style.backgroundImage = 'url("images/marker-yellow.svg")';
    } else {
      turn.style.backgroundImage = 'url("images/turn-background-red.svg")';
      turn.children[0].style.color = "white";
      turn.children[1].style.color = "white";
      marker.style.backgroundImage = 'url("images/marker-red.svg")';
    }

    turn.children[0].textContent = `${currentPlayer} turn`;
    turn.children[1].textContent = `${
      currentPlayer === "PLAYER 1" ? player1Time : player2Time
    }  S`;

    if (currentPlayer === "PLAYER 1") {
      player1Time--;
      if (player1Time === 0) {
        currentPlayer = "PLAYER 2";
      }
    } else {
      player2Time--;
      if (player2Time === 0) {
        currentPlayer = "PLAYER 1";
      }
    }
  }, 1000);
}

startGame();

const rows = 7;
board.addEventListener("mousemove", function (event) {
  const rect = board.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const rowWidth = board.clientWidth / rows;
  const rowIndex = Math.floor(x / rowWidth);
  const newLeft = rowIndex * rowWidth + 20;
  marker.style.left = newLeft + "px";
});

board.addEventListener("click", function (event) {
  const rect = board.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const rowIndex = Math.floor(x / (board.clientWidth / rows));
  let classname = `${currentPlayer}`;
  let div = document.createElement("div");
  if (currentPlayer === "PLAYER 1") {
    div.classList.add("ball-red");
  } else {
    div.classList.add("ball-yellow");
  }

  console.log(div);
  if (boardMatrix[0][rowIndex] === 0) {
    for (let i = boardMatrix.length - 1; i >= 0; i--) {
      if (boardMatrix[i][rowIndex] === 0) {
        boardMatrix[i][rowIndex] = currentPlayer === "PLAYER 1" ? 1 : 2;
        if (checkForWin(boardMatrix, currentPlayer)) {
          console.log(`Player ${currentPlayer} wins!`);
          if (currentPlayer === "PLAYER 1") {
            scoreOfPlayer1.textContent = scoreOfPlayer1.textContent * 1 + 1;
            turn.style.backgroundImage =
              'url("images/turn-background-yellow.svg")';
            turn.children[0].style.color = "black";
            turn.children[1].style.color = "black";
          } else {
            scoreOfPlayer2.textContent = scoreOfPlayer2.textContent * 1 + 1;
          }
        } else {
          currentPlayer =
            currentPlayer === "PLAYER 1" ? "PLAYER 2" : "PLAYER 1";
          player1Time = 30;
          player2Time = 30;

          updateBoard();
          break;
        }
      }
    }
  }
});

function createGridCell(value) {
  const cell = document.createElement("div");
  cell.className = value === 1 ? "red-col" : value === 2 ? "yellow-col" : "";

  const existingHandler = cell.dataset.clickHandler;
  if (existingHandler) {
    cell.removeEventListener("click", existingHandler);
  }

  return cell;
}

function updateBoard() {
  const blackBoard = document.querySelector(".black-board");
  blackBoard.innerHTML = "";

  boardMatrix.forEach((row, rowIndex) => {
    row.forEach((cellValue, colIndex) => {
      const gridCell = createGridCell(cellValue);
      blackBoard.appendChild(gridCell);
      const clickHandler = () => handleCellClick(rowIndex, colIndex);
      gridCell.addEventListener("click", clickHandler);
      gridCell.dataset.clickHandler = clickHandler;
    });
  });
}

function handleCellClick(row, col) {
  console.log(`Cell clicked at row ${row}, column ${col}`);
}

function checkForWin(board, player) {
  // Check horizontally
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 4; col++) {
      if (
        board[row][col] === player &&
        board[row][col + 1] === player &&
        board[row][col + 2] === player &&
        board[row][col + 3] === player
      ) {
        return true;
      }
    }
  }

  // Check vertically
  for (let col = 0; col < 7; col++) {
    for (let row = 0; row < 3; row++) {
      if (
        board[row][col] === player &&
        board[row + 1][col] === player &&
        board[row + 2][col] === player &&
        board[row + 3][col] === player
      ) {
        return true;
      }
    }
  }

  // Check diagonally (positive)
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 4; col++) {
      if (
        board[row][col] === player &&
        board[row + 1][col + 1] === player &&
        board[row + 2][col + 2] === player &&
        board[row + 3][col + 3] === player
      ) {
        return true; // Diagonal win
      }
    }
  }

  // Check diagonally (negative)
  for (let row = 0; row < 3; row++) {
    for (let col = 3; col < 7; col++) {
      if (
        board[row][col] === player &&
        board[row + 1][col - 1] === player &&
        board[row + 2][col - 2] === player &&
        board[row + 3][col - 3] === player
      ) {
        return true;
      }
    }
  }

  return false;
}

function printBoard(board) {
  for (let row = 0; row < 6; row++) {
    console.log(board[row].join(" "));
  }
}

// Restart the game
const restart = document.querySelector(".restart-btn");
restart.addEventListener("click", () => {
  window.location.reload();
});
