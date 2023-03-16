const board = document.querySelector("#board");
const info = document.querySelector("#info");
const gameMatrix = ["", "", "", "", "", "", "", "", ""];
const btn = document.querySelector("button");

let starting = "circle";
info.innerHTML = `<span>&#11096</span> Circle goes first!`;

function createGame() {
  gameMatrix.forEach((index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("square");
    cellElement.id = index;
    cellElement.addEventListener("click", play);
    board.append(cellElement);
    btn.style.display = "none";
  });
}

createGame();

function play(e) {
  const turn = document.createElement("div");
  turn.classList.add(starting);
  e.target.append(turn);
  if (starting === "circle") {
    starting = "cross";
    info.innerHTML =
      `<span class="red">&#9587</span>` + " " + starting + "'s go.";
  } else {
    starting = "circle";
    info.innerHTML = `<span>&#11096</span>` + " " + starting + "'s go.";
  }
  e.target.removeEventListener("click", play);
  check();
}

function check() {
  const all = document.querySelectorAll(".square");
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let emptySquares = 0;
  let winner = false;
  winningCombinations.forEach((combination) => {
    const circleWins = combination.every((cell) =>
      all[cell].firstChild?.classList.contains("circle")
    );
    if (circleWins) {
      info.innerHTML = `<span>&#11096</span>` + " Circle wins!";
      combination.forEach(
        (cell) => (all[cell].style.backgroundColor = "black")
      );
      all.forEach((square) => square.replaceWith(square.cloneNode(true)));
      btn.style.display = "inline-block";
      winner = true;
      return;
    }
  });

  winningCombinations.forEach((combination) => {
    const crossWins = combination.every((cell) =>
      all[cell].firstChild?.classList.contains("cross")
    );
    if (crossWins) {
      info.innerHTML = `<span class="red">&#9587</span>` + " Cross wins!";
      combination.forEach(
        (cell) => (all[cell].style.backgroundColor = "black")
      );
      all.forEach((square) => square.replaceWith(square.cloneNode(true)));
      btn.style.display = "inline-block";
      winner = true;
      return;
    }
  });

  all.forEach((square) => {
    if (!square.firstChild) {
      emptySquares++;
    }
  });

  if (emptySquares === 0 && winner === false) {
    info.innerHTML = "Draw!";
    btn.style.display = "inline-block";
  }
}
function refresh() {
  const squares = document.querySelectorAll(".square");
  squares.forEach((square) => {
    square.innerHTML = "";
    square.style.backgroundColor = "";
    square.addEventListener("click", play);
  });

  info.innerHTML = `<span>&#11096;</span> Circle goes first!`;
  starting = "circle";
  btn.style.display = "none";
}
