type fichas = "x" | "o" | "";
const player1 = "x";
const player2 = "o";
let player1Turns = 3;
let player2Turns = 3;
let currentPlayer: fichas = "x";
let lastQuit;
let gameOver = false;
const views = document.querySelectorAll(".container-fluid");
let currentViewIndex = 0;
var regex =
  "/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/";
const ticTacToeBoard: Array<Array<fichas>> = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

const changeView = () => {
  for (let i = 0; i < views.length; i++) {
    views[i].classList.add("hidden");
  }
  views[currentViewIndex].classList.remove("hidden");
  currentViewIndex++;
  if (currentViewIndex >= views.length) {
    currentViewIndex = 0;
  }
};

const checkWin = () => {
  for (let i = 0; i < ticTacToeBoard.length; i++) {
    if (
      ticTacToeBoard[i][0] === ticTacToeBoard[i][1] &&
      ticTacToeBoard[i][1] === ticTacToeBoard[i][2] &&
      ticTacToeBoard[i][0] !== ""
    ) {
      return ticTacToeBoard[i][0];
    }
    if (
      ticTacToeBoard[0][i] === ticTacToeBoard[1][i] &&
      ticTacToeBoard[1][i] === ticTacToeBoard[2][i] &&
      ticTacToeBoard[0][i] !== ""
    ) {
      return ticTacToeBoard[0][i];
    }
  }
  if (
    ticTacToeBoard[0][0] === ticTacToeBoard[1][1] &&
    ticTacToeBoard[1][1] === ticTacToeBoard[2][2] &&
    ticTacToeBoard[0][0] !== ""
  )
    return ticTacToeBoard[0][0];
  if (
    ticTacToeBoard[0][2] === ticTacToeBoard[1][1] &&
    ticTacToeBoard[1][1] === ticTacToeBoard[2][0] &&
    ticTacToeBoard[0][2] !== ""
  )
    return ticTacToeBoard[0][2];
};

const cambiarTurno = () => {
  currentPlayer == "x" ? (currentPlayer = "o") : (currentPlayer = "x");
};

const reducirContador = () => {
  if (currentPlayer === "x") {
    player1Turns = player1Turns - 1;
  } else {
    player2Turns = player2Turns - 1;
  }
};

const aumentarContador = () => {
  if (currentPlayer === "x") {
    player1Turns = player1Turns + 1;
  } else {
    player2Turns = player2Turns + 1;
  }
};

const colocarFicha = (fila: number, columna: number, celda: number) => {
  const box = document.querySelector(`#box${celda}`);
  let turnos = comprobarTurnos();
//   if (false) {
//     if (currentPlayer) {
//       if (turnos > 0) {
//         if (box.innerHTML === "" && box != lastQuit) {
//           ticTacToeBoard[fila][columna] = currentPlayer;
//           box.innerHTML = currentPlayer;
//           reducirContador();
//           let winner = checkWin();
//           if (winner) {
//             clearTablero();
//           }
//           cambiarTurno();
//         }
//       } else {
//         if (box.innerHTML !== "" && box.innerHTML === currentPlayer) {
//           lastQuit = box;
//           ticTacToeBoard[fila][columna] = "";
//           box.innerHTML = "";
//           aumentarContador();
//         }
//       }
//     }
//   } else {
    if (turnos > 0) {
        if (box.innerHTML === "" && box != lastQuit) {
          ticTacToeBoard[fila][columna] = currentPlayer;
          box.innerHTML = currentPlayer;
          reducirContador();
          let winner = checkWin();
          if (winner) {
            clearTablero();
          }
          IAPlays();
        } else {
            if (box.innerHTML !== "" && box.innerHTML === currentPlayer) {
              lastQuit = box;
              ticTacToeBoard[fila][columna] = "";
              box.innerHTML = "";
              aumentarContador();
            }
        }
    }
//   }
};

const comprobarTurnos = (): number => {
  if (currentPlayer === "x") {
    return player1Turns;
  } else {
    return player2Turns;
  }
};

const clearTablero = () => {
  for (let i = 0; i < ticTacToeBoard.length; i++) {
    for (let j = 0; j < ticTacToeBoard.length; j++) {
      ticTacToeBoard[i][j] = "";
    }
  }
  let cell = document.querySelectorAll(".cell");
  for (let i = 0; i < cell.length; i++) {
    cell[i].innerHTML = "";
  }
  player1Turns = 3;
  player2Turns = 3;
};

const nextPage = (page) => {
  let views = document.querySelectorAll(".container-fluid");
  let actualPage = document.querySelector(`.${page}`);

  let nickname = (document.querySelector("#nickname") as any).value;
  let nickname2 = (document.querySelector("#nickname2") as any).value;
  if (page === "game") {
    if ((document.querySelector("#select-num-players1") as any).checked === true) {
      if (nickname === "") {
        document.querySelector("#nickname-tag").classList.add("error");
        document.querySelector("#nickname").classList.add("error");
        document.querySelector(".comprobar").classList.remove("hidden");
        return;
      } else {
        document.querySelector("#nickname-tag").classList.remove("error");
        document.querySelector("#nickname").classList.remove("error");
      }
      if (nickname2 === "") {
        document.querySelector("#nickname2-tag").classList.add("error");
        document.querySelector("#nickname2").classList.add("error");
        document.querySelector(".comprobar").classList.remove("hidden");
        return;
      } else {
        document.querySelector("#nickname2-tag").classList.remove("error");
        document.querySelector("#nickname2").classList.remove("error");
      }
    } else {
      if (nickname === "") {
        document.querySelector("#nickname-tag").classList.add("error");
        document.querySelector("#nickname").classList.add("error");
        document.querySelector(".comprobar").classList.remove("hidden");
        return;
      }
    }
  }

  for (let i = 0; i < views.length; i++) {
    views[i].classList.add("hidden");
  }

  actualPage.classList.remove("hidden");
};

const disableSecondPlayer = () => {
  let radio2 = (document.querySelector("#select-num-players2") as any);
  let nickname2 = (document.querySelector("#nickname2") as any);
  if (radio2.checked === true) {
    nickname2.disabled = true;
  } else {
    nickname2.disabled = false;
  }
};

const IAPlays = () => {
    let a = Math.floor(Math.random() * 3)
    let b = Math.floor(Math.random() * 3)
    let celda = 0

    if(a === 0){
        if(b === 0){
            celda = 1
        }
        if(b === 1){
            celda = 2
        }
        if(b === 2){
            celda = 3
        }
    }
    if(a === 1){
        if(b === 0){
            celda = 4
        }
        if(b === 1){
            celda = 5
        }
        if(b === 2){
            celda = 6
        }
    }
    if(a === 2){
        if(b === 0){
            celda = 7
        }
        if(b === 1){
            celda = 8
        }
        if(b === 2){
            celda = 9
        }
    }
    if(document.querySelector(`#box${celda}`).innerHTML === ''){
        ticTacToeBoard[a][b] = 'o';
        document.querySelector(`#box${celda}`).innerHTML = 'o';
    }

}