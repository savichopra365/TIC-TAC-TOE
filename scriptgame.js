const boxs = document.querySelectorAll(".box");
const statusTxt = document.querySelector("#status");
const Btnrestart = document.querySelector("#restart");
let x = "<img src='./X.png'>";
let o = "<img src='./O.png'>";
const win = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6],
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = x;
let player = "X";
let running = false;
init();
function init() {
  boxs.forEach((box) => box.addEventListener("click", boxClick));
  statusTxt.textContent = `${player} your turn`;
  running = true;
}
function boxClick() {
  const index = this.dataset.index;
  if (options[index] != "" || !running) {
    return;
  }
  updateBox(this, index);
  checkWinner();
}
// upadates the images
function updateBox(box, index) {
  options[index] = player;
  box.innerHTML = currentPlayer;
}

function changePlayer() {
  player = player == "X" ? "O" : "X";
  currentPlayer = currentPlayer == x ? o : x;
  statusTxt.textContent = `${player} Your Turn`;
}

function checkWinner() {
  let isWon = false;
  for (let i = 0; i < win.length; i++) {
    const condition = win[i];
    const box1 = options[condition[0]];
    const box2 = options[condition[1]];
    const box3 = options[condition[2]];

    if (box1 == "" || box2 == "" || box3 == "") {
      continue;
    }
    if (box1 == box2 && box2 == box3) {
      isWon = true;
      boxs[condition[0]].classList.add("win");
      boxs[condition[1]].classList.add("win");
      boxs[condition[2]].classList.add("win");
    }
  }

  if (isWon) {
    statusTxt.textContent = `${player} won!`;
    running = false;
  } else if (!options.includes("")) {
    statusTxt.textContent = "Game Drawn";
    running = false;
  } else {
    changePlayer();
  }
}

function restartGame() {
  options = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = x;
  player = "X";
  running = true;

  statusTxt.textContent = `${player} your turn`;

  boxs.forEach((box) => {
    box.innerHTML = "";
    box.classList.remove("win");
  });
}
