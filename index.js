const continueBtn = document.getElementById("continue-btn");
const pScoreRed = document.getElementById("score-red");
const pScoreYellow = document.getElementById("score-yellow");
const currentPlayer = document.getElementById("current-player");
const time = document.getElementById("time");
let boardMatrix = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
];
let player = 1;
let scoreRed = 0,
  scoreYellow = 0;
let playedBalls = 0;
let draw = false;

//score container
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const player1Avatar = document.getElementById("player1-avatar");
const player2Avatar = document.getElementById("player2-avatar");

player1.innerHTML = "player 1";
player2.innerHTML = "player 2";
player1Avatar.style.backgroundImage = "url(./images/player-one.svg)";
player2Avatar.style.backgroundImage = "url(./images/player-two.svg)";

//turn
const winner = document.getElementById("winner");
const winsRect = document.getElementById("wins-rect");
const drawWins = document.getElementById("wins-draw");
const turnBg = document.getElementById("turn-bg");
const turn = document.getElementById("turn");
turn.classList.add(player === 1 ? "turn-red" : "turn-yellow");
const marker = document.getElementById("marker");

const whiteCol0 = document.getElementById("white-col0");
const whiteCol1 = document.getElementById("white-col1");
const whiteCol2 = document.getElementById("white-col2");
const whiteCol3 = document.getElementById("white-col3");
const whiteCol4 = document.getElementById("white-col4");
const whiteCol5 = document.getElementById("white-col5");
const whiteCol6 = document.getElementById("white-col6");

const blackCol0 = document.getElementById("black-col0");
const blackCol1 = document.getElementById("black-col1");
const blackCol2 = document.getElementById("black-col2");
const blackCol3 = document.getElementById("black-col3");
const blackCol4 = document.getElementById("black-col4");
const blackCol5 = document.getElementById("black-col5");
const blackCol6 = document.getElementById("black-col6");

const rows = ["row0", "row1", "row2", "row3", "row4", "row5"];
const delays = [612, 559, 500, 433, 353, 250];
const turnBgs = ["#5C2DD5", "#FD6687", "#FFCE67"];

const redLargeBallSrc = "./images/counter-red-large.svg";
const yellowLargeBallSrc = "./images/counter-yellow-large.svg";

//timer
let timer;
let timerID;
function startTimer(seconds) {
  timer = seconds ?? 30;
  timerID = setInterval(() => {
    time.innerHTML = timer;
    timer--;
    if (timer === -1) {
      togglePlayer();
      showWinner();
      if (player === 1) {
        scoreRed++;
        pScoreRed.innerHTML = scoreRed;
      } else {
        scoreYellow++;
        pScoreYellow.innerHTML = scoreYellow;
      }
      togglePlayer();
      timer = 30;
    }
  }, 1000);
}

startTimer();

currentPlayer.innerHTML = `player ${player}'s`;

function togglePlayer() {
  player = player === 1 ? 2 : 1;
  currentPlayer.innerHTML = `player ${player}'s`;
  turn.classList.toggle("turn-red");
  turn.classList.toggle("turn-yellow");
  marker.classList.toggle("marker-red");
  marker.classList.toggle("marker-yellow");
  timer = 30;
  time.innerHTML = 30;
}
//check winner
function checkWinner(i, j) {
  let range = [],
    k = i,
    p = j;
  //check row
  while (k < 7 && boardMatrix[k][p] === player) {
    range.push(boardMatrix[k][p]);
    k++;
  }
  k = i - 1;
  while (k > -1 && boardMatrix[k][p] === player) {
    range.unshift(boardMatrix[k][p]);
    k--;
  }
  if (range.length > 3) {
    setTimeout(() => {
      k++;
      for (let n = 0; n < range.length; n++) {
        setTimeout(() => {
          document.getElementById(`black-col${k + n}`).children[
            p
          ].children[1].style.display = "inline";
        }, (n + 1) * 75);
      }
    }, delays[j]);
    return true;
  } else range = [];
  //check column
  k = i;
  while (p < 6 && boardMatrix[k][p] === player) {
    range.push(boardMatrix[k][p]);
    p++;
  }
  p = j - 1;
  while (p > -1 && boardMatrix[k][p] === player) {
    range.unshift(boardMatrix[k][p]);
    p--;
  }
  if (range.length > 3) {
    setTimeout(() => {
      p++;
      for (let n = 0; n < range.length; n++) {
        setTimeout(() => {
          document.getElementById(`black-col${k}`).children[
            p + n
          ].children[1].style.display = "inline";
        }, (n + 1) * 75);
      }
    }, delays[j]);
    return true;
  } else range = [];
  // check y=x line
  p = j;
  while (k < 7 && p < 6 && boardMatrix[k][p] === player) {
    range.push(boardMatrix[k][p]);
    k++;
    p++;
  }
  k = i - 1;
  p = j - 1;
  while (k > -1 && p > -1 && boardMatrix[k][p] === player) {
    range.unshift(boardMatrix[k][p]);
    k--;
    p--;
  }
  if (range.length > 3) {
    setTimeout(() => {
      p++;
      k++;
      for (let n = 0; n < range.length; n++) {
        setTimeout(() => {
          document.getElementById(`black-col${k + n}`).children[
            p + n
          ].children[1].style.display = "inline";
        }, (n + 1) * 75);
      }
    }, delays[j]);
    return true;
  } else range = [];
  //check y=-x line
  k = i;
  p = j;
  while (k > -1 && p < 6 && boardMatrix[k][p] === player) {
    range.push(boardMatrix[k][p]);
    k--;
    p++;
  }
  k = i + 1;
  p = j - 1;
  while (k < 7 && p > -1 && boardMatrix[k][p] === player) {
    range.unshift(boardMatrix[k][p]);
    k++;
    p--;
  }
  if (range.length > 3) {
    setTimeout(() => {
      p++;
      k--;
      for (let n = 0; n < range.length; n++) {
        setTimeout(() => {
          document.getElementById(`black-col${k - n}`).children[
            p + n
          ].children[1].style.display = "inline";
        }, (n + 1) * 75);
      }
    }, delays[j]);
  }
  return range.length > 3;
}

function showWinner() {
  winner.innerHTML = `player ${player}`;
  drawWins.innerHTML = "wins";
  turn.style.display = "none";
  winsRect.style.display = "flex";
  turnBg.style.backgroundColor = turnBgs[player];
  clearInterval(timerID);
}

function hideWinner() {
  winner.innerHTML = `player`;
  turn.style.display = "flex";
  winsRect.style.display = "none";
  turnBg.style.backgroundColor = turnBgs[0];
  time.innerHTML = 30;
  startTimer();
}

whiteCol0.addEventListener("click", () => {
  const i = boardMatrix[0].indexOf(0);
  if (i !== -1) {
    playedBalls++;
    const ball = document.createElement("div");
    ball.classList.add("ball");
    ball.classList.add(rows[i]);
    const img1 = document.createElement("img");
    const img2 = document.createElement("img");

    img1.src = player === 1 ? redLargeBallSrc : yellowLargeBallSrc;
 
    ball.appendChild(img1);
    ball.appendChild(img2);
    blackCol0.appendChild(ball);
    boardMatrix[0][i] = player;
    let checkWinnerValue = checkWinner(0, i);
    if (checkWinnerValue) {
      showWinner();
      if (player === 1) {
        scoreRed++;
        pScoreRed.innerHTML = scoreRed;
      } else {
        scoreYellow++;
        pScoreYellow.innerHTML = scoreYellow;
      }
    } else if (playedBalls === 42) {
      draw = true;
      showWinner();
    }
    togglePlayer();
  }
});

whiteCol1.addEventListener("click", () => {
  const i = boardMatrix[1].indexOf(0);
  if (i !== -1) {
    playedBalls++;
    const ball = document.createElement("div");
    ball.classList.add("ball");
    ball.classList.add(rows[i]);
    const img1 = document.createElement("img");
    const img2 = document.createElement("img");

    img1.src = player === 1 ? redLargeBallSrc : yellowLargeBallSrc;

    ball.appendChild(img1);
    ball.appendChild(img2);
    blackCol1.appendChild(ball);
    boardMatrix[1][i] = player;
    let checkWinnerValue = checkWinner(1, i);
    if (checkWinnerValue) {
      showWinner();
      if (player === 1) {
        scoreRed++;
        pScoreRed.innerHTML = scoreRed;
      } else {
        scoreYellow++;
        pScoreYellow.innerHTML = scoreYellow;
      }
    } else if (playedBalls === 42) {
      draw = true;
      showWinner();
    }
    togglePlayer();
  }
});

whiteCol2.addEventListener("click", () => {
  const i = boardMatrix[2].indexOf(0);
  if (i !== -1) {
    playedBalls++;
    const ball = document.createElement("div");
    ball.classList.add("ball");
    ball.classList.add(rows[i]);
    const img1 = document.createElement("img");
    const img2 = document.createElement("img");

    img1.src = player === 1 ? redLargeBallSrc : yellowLargeBallSrc;

    ball.appendChild(img1);
    ball.appendChild(img2);
    blackCol2.appendChild(ball);
    boardMatrix[2][i] = player;
    let checkWinnerValue = checkWinner(2, i);
    if (checkWinnerValue) {
      showWinner();
      if (player === 1) {
        scoreRed++;
        pScoreRed.innerHTML = scoreRed;
      } else {
        scoreYellow++;
        pScoreYellow.innerHTML = scoreYellow;
      }
    } else if (playedBalls === 42) {
      draw = true;
      showWinner();
    }
    togglePlayer();
  }
});

whiteCol3.addEventListener("click", () => {
  const i = boardMatrix[3].indexOf(0);
  if (i !== -1) {
    playedBalls++;
    const ball = document.createElement("div");
    ball.classList.add("ball");
    ball.classList.add(rows[i]);
    const img1 = document.createElement("img");
    const img2 = document.createElement("img");

    img1.src = player === 1 ? redLargeBallSrc : yellowLargeBallSrc;

    ball.appendChild(img1);
    ball.appendChild(img2);
    blackCol3.appendChild(ball);
    boardMatrix[3][i] = player;
    let checkWinnerValue = checkWinner(3, i);
    if (checkWinnerValue) {
      showWinner();
      if (player === 1) {
        scoreRed++;
        pScoreRed.innerHTML = scoreRed;
      } else {
        scoreYellow++;
        pScoreYellow.innerHTML = scoreYellow;
      }
    } else if (playedBalls === 42) {
      draw = true;
      showWinner();
    }
    togglePlayer();
  }
});

whiteCol4.addEventListener("click", () => {
  const i = boardMatrix[4].indexOf(0);
  if (i !== -1) {
    playedBalls++;
    const ball = document.createElement("div");
    ball.classList.add("ball");
    ball.classList.add(rows[i]);
    const img1 = document.createElement("img");
    const img2 = document.createElement("img");

    img1.src = player === 1 ? redLargeBallSrc : yellowLargeBallSrc;
    ball.appendChild(img1);
    ball.appendChild(img2);
    blackCol4.appendChild(ball);
    boardMatrix[4][i] = player;
    let checkWinnerValue = checkWinner(4, i);
    if (checkWinnerValue) {
      showWinner();
      if (player === 1) {
        scoreRed++;
        pScoreRed.innerHTML = scoreRed;
      } else {
        scoreYellow++;
        pScoreYellow.innerHTML = scoreYellow;
      }
    } else if (playedBalls === 42) {
      draw = true;
      showWinner();
    }
    togglePlayer();
  }
});

whiteCol5.addEventListener("click", () => {
  const i = boardMatrix[5].indexOf(0);
  if (i !== -1) {
    playedBalls++;
    const ball = document.createElement("div");
    ball.classList.add("ball");
    ball.classList.add(rows[i]);
    const img1 = document.createElement("img");
    const img2 = document.createElement("img");

    img1.src = player === 1 ? redLargeBallSrc : yellowLargeBallSrc;

    ball.appendChild(img1);
    ball.appendChild(img2);
    blackCol5.appendChild(ball);
    boardMatrix[5][i] = player;
    let checkWinnerValue = checkWinner(5, i);
    if (checkWinnerValue) {
      showWinner();
      if (player === 1) {
        scoreRed++;
        pScoreRed.innerHTML = scoreRed;
      } else {
        scoreYellow++;
        pScoreYellow.innerHTML = scoreYellow;
      }
    } else if (playedBalls === 42) {
      draw = true;
      showWinner();
    }
    togglePlayer();
  }
});

whiteCol6.addEventListener("click", () => {
  const i = boardMatrix[6].indexOf(0);
  if (i !== -1) {
    playedBalls++;
    const ball = document.createElement("div");
    ball.classList.add("ball");
    ball.classList.add(rows[i]);
    const img1 = document.createElement("img");
    const img2 = document.createElement("img");

    img1.src = player === 1 ? redLargeBallSrc : yellowLargeBallSrc;

    ball.appendChild(img1);
    ball.appendChild(img2);
    blackCol6.appendChild(ball);
    boardMatrix[6][i] = player;
    let checkWinnerValue = checkWinner(6, i);
    if (checkWinnerValue) {
      showWinner();
      if (player === 1) {
        scoreRed++;
        pScoreRed.innerHTML = scoreRed;
      } else {
        scoreYellow++;
        pScoreYellow.innerHTML = scoreYellow;
      }
    } else if (playedBalls === 42) {
      draw = true;
      showWinner();
    }
    togglePlayer();
  }
});

whiteCol0.addEventListener("mouseover", () => {
  marker.style.left = "35px";
});

whiteCol1.addEventListener("mouseover", () => {
  marker.style.left = "125px";
});

whiteCol2.addEventListener("mouseover", () => {
  marker.style.left = "210px";
});

whiteCol3.addEventListener("mouseover", () => {
  marker.style.left = "300px";
});

whiteCol4.addEventListener("mouseover", () => {
  marker.style.left = "385px";
});

whiteCol5.addEventListener("mouseover", () => {
  marker.style.left = "475px";
});

whiteCol6.addEventListener("mouseover", () => {
  marker.style.left = "560px";
});

//restart
const restart = document.querySelector(".restart");
restart.addEventListener("click", () => {
  window.location.reload();
});
