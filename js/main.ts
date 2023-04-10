type fichas = "x" | "o" | "";
const player1 = "x";
const player2 = "o";
let player1Turns = 3;
let player2Turns = 3;
let currentPlayer: fichas = "x";
let lastQuit;
let ficha: String = 'luffy';
let gameOver = false;
const views = document.querySelectorAll(".container-fluid");
let nickname: string
let nickname2: string
let nick: string

let currentViewIndex = 0;

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

const changeTurn = () => {
  currentPlayer == "x" ? currentPlayer = "o" : currentPlayer = "x";
  if(currentPlayer === "x"){
    ficha = 'luffy'
    nick = nickname
  } else {
    ficha = 'chopper'
    nick = nickname2
  }
};

const reduceCounter = () => {
  let turns: number
  if (currentPlayer === "x") {
    player1Turns = player1Turns - 1;
    turns = player2Turns
  } else {
    player2Turns = player2Turns - 1;
    turns = player1Turns
  }

  return turns
};

const increaseCounter = () => {
  if (currentPlayer === "x") {
    player1Turns = player1Turns + 1;
  } else {
    player2Turns = player2Turns + 1;
  }
};

const setToken = (cell: string) => {
  const box = document.querySelector(`#${cell}`);
  const row = (document.querySelector(`#${cell}`) as any).dataset.row
  const column = (document.querySelector(`#${cell}`) as any).dataset.column
  let turnos = checkTurns();
  if ( (document.querySelector("#select-num-players1") as any).checked === true) {
      if (turnos > 0) {
        if (ticTacToeBoard[row][column] === '' && box != lastQuit) {
          ticTacToeBoard[row][column] = currentPlayer;
          box.classList.add(`${ficha}`)
          let turns = reduceCounter();
          if (turns > 0){
            document.querySelector('.turn-counter').innerHTML = `You have ${turns} turns left`
          } else {
            document.querySelector('.turn-counter').innerHTML = `You have no turns left to place. Remove a token from you.`
          }
          let winner = checkWin();
          if (winner) {
            showWinner(nick,ficha)
            clearBoard();
            return
          }

          changeTurn();
          document.querySelector('.turn-name').innerHTML = `${nick}'s turn`
        }
      } else {
        if (ticTacToeBoard[row][column] !== "" && ticTacToeBoard[row][column] === currentPlayer) {
          lastQuit = box;
          ticTacToeBoard[row][column] = "";
          box.classList.remove(`${ficha}`)
          document.querySelector('.turn-counter').innerHTML = `Place the token in another cell.`
          increaseCounter();
        }
      }
  } else {
    if (turnos > 0) {
        currentPlayer = 'x'
        if (ticTacToeBoard[row][column] === '' && box != lastQuit) {
          ticTacToeBoard[row][column] = 'x';
          box.classList.add(`luffy`)
          player1Turns--;
          let winner = checkWin();
          if (winner) {
            showWinner(nickname,'luffy')
            clearBoard();
            return
          }
          AIMovement(ticTacToeBoard);
          let winnerAI = checkWin();
          if (winnerAI) {
            showWinner('Chopper','chopper')
            clearBoard();
            return
          }
          if (player1Turns > 0){
            document.querySelector('.turn-counter').innerHTML = `You have ${player1Turns} turns left`
          } else {
            document.querySelector('.turn-counter').innerHTML = `You have no turns left to place. Remove a token from you.`
          }
          document.querySelector('.turn-name').innerHTML = `${nickname}'s turn`
        } 
    } else {
      if (ticTacToeBoard[row][column] !== "" && ticTacToeBoard[row][column] === 'x') {
        lastQuit = box;
        ticTacToeBoard[row][column] = "";
        box.classList.remove(`luffy`)
        document.querySelector('.turn-counter').innerHTML = `Place the token in another cell.`
        increaseCounter();
      }
  }
  }
};

const checkTurns = (): number => {
  if (currentPlayer === "x") {
    return player1Turns;
  } else {
    return player2Turns;
  }
};

const clearBoard = () => {
  for (let i = 0; i < ticTacToeBoard.length; i++) {
    for (let j = 0; j < ticTacToeBoard.length; j++) {
      ticTacToeBoard[i][j] = "";
    }
  }
  let cell = document.querySelectorAll(".cell");
  for (let i = 0; i < cell.length; i++) {
    cell[i].innerHTML = "";
    cell[i].classList.remove('luffy')
    cell[i].classList.remove('chopper')
  }
  player1Turns = 3;
  player2Turns = 3;
  lastQuit = '';
};

const nextPage = (page: string) => {
  let views = document.querySelectorAll(".container-fluid");
  let actualPage = document.querySelector(`.${page}`);

  nickname = (document.querySelector("#nickname") as any).value;
  nickname2 = (document.querySelector("#nickname2") as any).value;

  if ((document.querySelector("#select-num-players2") as any).checked === true) {
    nickname2 = 'Chopper'
  }

  document.querySelector('#player1').innerHTML = nickname
  document.querySelector('#player2').innerHTML = nickname2
  document.querySelector('.turn-name').innerHTML = `${nickname}'s turn`
  document.querySelector('.turn-counter').innerHTML = `You have ${player1Turns} turns left`
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

  if (page === "game") {
    document.querySelector('.winner-winner').classList.add('hidden');
    (document.querySelector("#nickname") as any).value = "";
    (document.querySelector("#nickname2") as any).value = "";
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

function checkAvailablePositions() {
  let availablePositions: any = []
  for (let i = 0; i < ticTacToeBoard.length; i++){
    for (let j = 0; j < ticTacToeBoard.length; j++){
      if(ticTacToeBoard[i][j] == ''){
        availablePositions.push([i,j]);
      }
    }
  }
  return availablePositions
}

function OPositions(arr) {
  let OPositions: any = []

  for (let i = 0; i < ticTacToeBoard.length; i++){
    for (let j = 0; j < ticTacToeBoard.length; j++){
      if(ticTacToeBoard[i][j] == 'o'){
        OPositions.push([i,j]);
      }
    }
  }
  return OPositions
}
const AIMovement = (arr,excl?) => {

  if (player2Turns > 0){
    const availablePositions = checkAvailablePositions();
    if (excl) {
      removeElementFromArray(availablePositions,excl)
    }
    const randomIndex = Math.floor(Math.random() * availablePositions.length);

    const newPosition = availablePositions[randomIndex];
    arr[newPosition[0]][newPosition[1]] = 'o';
    let cells = document.querySelectorAll('.cell')
    const arrayPositions = []
    for (let i = 0; i < cells.length; i++){
      arrayPositions.push(cells[i])
    }
    let cellsArray = Array.from({ length: 3 }, (_, i) => arrayPositions.slice(i * 3, (i + 1) * 3));
    cellsArray[newPosition[0]][newPosition[1]].classList.add('chopper');
    player2Turns--;
  } else {
    const AIPositions = OPositions(arr);
    const randomIndex = Math.floor(Math.random() * AIPositions.length);
    const AIPosition = AIPositions[randomIndex];
    arr[AIPosition[0]][AIPosition[1]] = '';
    let cells = document.querySelectorAll('.cell')
    const arrayPositions = []
    for (let i = 0; i < cells.length; i++){
      arrayPositions.push(cells[i])
    }
    let cellsArray = Array.from({ length: 3 }, (_, i) => arrayPositions.slice(i * 3, (i + 1) * 3));
    cellsArray[AIPosition[0]][AIPosition[1]].innerHTML = '';
    cellsArray[AIPosition[0]][AIPosition[1]].classList.remove('chopper');
    player2Turns++;
    AIMovement(arr,AIPosition);
  }
}

const removeElementFromArray = (arr,excl) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][0] === excl[0] && arr[i][1] === excl[1]) {
      arr.splice(i, 1);
      i--;
    }
  }
  return arr;
}

const showWinner = (nick,ficha) => {
  document.querySelector('.character-image-winner').classList.remove(`chopper`)
  document.querySelector('.character-image-winner').classList.remove(`luffy`)
  document.querySelector('.winner-winner').classList.remove('hidden')
  document.querySelector('.character-image-winner').classList.add(`${ficha}`)
  document.querySelector('.text-winner').innerHTML = `${nick} has won!!`
}

const restartGame = () => {
  document.querySelector('.winner-winner').classList.add('hidden')
  document.querySelector('.character-image-winner').classList.remove(`${ficha}`)
  document.querySelector('.turn-name').innerHTML = `${nick}'s turn`
  player1Turns = 3;
  player2Turns = 3;
  let turnos = checkTurns();
  document.querySelector('.turn-counter').innerHTML = `You have ${turnos} left`
}