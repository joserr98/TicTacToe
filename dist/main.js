const player1 = "x";
const player2 = "o";
let player1Turns = 3;
let player2Turns = 3;
let currentPlayer = "x";
let lastQuit;
let ficha = 'luffy';
let gameOver = false;
const views = document.querySelectorAll(".container-fluid");
let nickname;
let nickname2;
let nick;
let currentViewIndex = 0;
var regex = "/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/";
const ticTacToeBoard = [
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
        if (ticTacToeBoard[i][0] === ticTacToeBoard[i][1] &&
            ticTacToeBoard[i][1] === ticTacToeBoard[i][2] &&
            ticTacToeBoard[i][0] !== "") {
            return ticTacToeBoard[i][0];
        }
        if (ticTacToeBoard[0][i] === ticTacToeBoard[1][i] &&
            ticTacToeBoard[1][i] === ticTacToeBoard[2][i] &&
            ticTacToeBoard[0][i] !== "") {
            return ticTacToeBoard[0][i];
        }
    }
    if (ticTacToeBoard[0][0] === ticTacToeBoard[1][1] &&
        ticTacToeBoard[1][1] === ticTacToeBoard[2][2] &&
        ticTacToeBoard[0][0] !== "")
        return ticTacToeBoard[0][0];
    if (ticTacToeBoard[0][2] === ticTacToeBoard[1][1] &&
        ticTacToeBoard[1][1] === ticTacToeBoard[2][0] &&
        ticTacToeBoard[0][2] !== "")
        return ticTacToeBoard[0][2];
};
const cambiarTurno = () => {
    currentPlayer == "x" ? (currentPlayer = "o") : (currentPlayer = "x");
    if (currentPlayer === "x") {
        ficha = 'luffy';
        nick = nickname;
    }
    else {
        ficha = 'chopper';
        nick = nickname2;
    }
};
const reducirContador = () => {
    let turns;
    if (currentPlayer === "x") {
        player1Turns = player1Turns - 1;
        turns = player1Turns;
    }
    else {
        player2Turns = player2Turns - 1;
        turns = player2Turns;
    }
    return turns;
};
const aumentarContador = () => {
    if (currentPlayer === "x") {
        player1Turns = player1Turns + 1;
    }
    else {
        player2Turns = player2Turns + 1;
    }
};
const colocarFicha = (cell) => {
    const box = document.querySelector(`#${cell}`);
    const row = document.querySelector(`#${cell}`).dataset.row;
    const column = document.querySelector(`#${cell}`).dataset.column;
    let turnos = comprobarTurnos();
    if (true) {
        if (currentPlayer) {
            if (turnos > 0) {
                if (ticTacToeBoard[row][column] === '' && box != lastQuit) {
                    ticTacToeBoard[row][column] = currentPlayer;
                    box.innerHTML = currentPlayer;
                    box.classList.add(`${ficha}`);
                    let turns = reducirContador();
                    let winner = checkWin();
                    if (winner) {
                        clearTablero();
                    }
                    cambiarTurno();
                    document.querySelector('.turn-name').innerHTML = `Turno de ${nick}`;
                    document.querySelector('.turn-counter').innerHTML = `Te quedan ${turnos} turnos`;
                }
            }
            else {
                if (box.innerHTML !== "" && box.innerHTML === currentPlayer) {
                    lastQuit = box;
                    ticTacToeBoard[row][column] = "";
                    box.innerHTML = "";
                    box.classList.remove(`${ficha}`);
                    document.querySelector('.turn-counter').innerHTML = `Te quedan ${turnos} turnos`;
                    aumentarContador();
                }
            }
        }
    }
    else {
        if (turnos > 0) {
            if (ticTacToeBoard[row][column] === '' && box != lastQuit) {
                ticTacToeBoard[row][column] = currentPlayer;
                box.classList.add(`${ficha}`);
                reducirContador();
                let winner = checkWin();
                if (winner) {
                    //   clearTablero();
                    alert('Ganador ');
                    return;
                }
                AIMovement(ticTacToeBoard);
                let winnerAI = checkWin();
                if (winnerAI) {
                    //   clearTablero();
                    alert('Ganador IA');
                }
            }
        }
        else {
            if (box.innerHTML !== "" && box.innerHTML === currentPlayer) {
                lastQuit = box;
                ticTacToeBoard[row][column] = "";
                box.innerHTML = "";
                box.classList.remove(`${ficha}`);
                aumentarContador();
                // AIMovement(ticTacToeBoard);
            }
        }
    }
    console.log(player2Turns);
};
const comprobarTurnos = () => {
    if (currentPlayer === "x") {
        return player1Turns;
    }
    else {
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
        cell[i].classList.remove('luffy');
        cell[i].classList.remove('chopper');
    }
    player1Turns = 3;
    player2Turns = 3;
};
const nextPage = (page) => {
    let views = document.querySelectorAll(".container-fluid");
    let actualPage = document.querySelector(`.${page}`);
    nickname = document.querySelector("#nickname").value;
    nickname2 = document.querySelector("#nickname2").value;
    document.querySelector('#player1').innerHTML = nickname;
    document.querySelector('#player2').innerHTML = nickname2;
    document.querySelector('.turn-name').innerHTML = `Turno de ${nickname}`;
    document.querySelector('.turn-counter').innerHTML = `Te quedan ${player1Turns} turnos`;
    if (page === "game") {
        if (document.querySelector("#select-num-players1").checked === true) {
            if (nickname === "") {
                document.querySelector("#nickname-tag").classList.add("error");
                document.querySelector("#nickname").classList.add("error");
                document.querySelector(".comprobar").classList.remove("hidden");
                return;
            }
            else {
                document.querySelector("#nickname-tag").classList.remove("error");
                document.querySelector("#nickname").classList.remove("error");
            }
            if (nickname2 === "") {
                document.querySelector("#nickname2-tag").classList.add("error");
                document.querySelector("#nickname2").classList.add("error");
                document.querySelector(".comprobar").classList.remove("hidden");
                return;
            }
            else {
                document.querySelector("#nickname2-tag").classList.remove("error");
                document.querySelector("#nickname2").classList.remove("error");
            }
        }
        else {
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
    let radio2 = document.querySelector("#select-num-players2");
    let nickname2 = document.querySelector("#nickname2");
    if (radio2.checked === true) {
        nickname2.disabled = true;
    }
    else {
        nickname2.disabled = false;
    }
};
function emptyPositions(arr) {
    let emptyPositions = [];
    for (let i = 0; i < ticTacToeBoard.length; i++) {
        for (let j = 0; j < ticTacToeBoard.length; j++) {
            if (ticTacToeBoard[i][j] == '') {
                emptyPositions.push([i, j]);
            }
        }
    }
    return emptyPositions;
}
function OPositions(arr) {
    let OPositions = [];
    for (let i = 0; i < ticTacToeBoard.length; i++) {
        for (let j = 0; j < ticTacToeBoard.length; j++) {
            if (ticTacToeBoard[i][j] == 'o') {
                OPositions.push([i, j]);
            }
        }
    }
    return OPositions;
}
const AIMovement = (arr) => {
    if (player2Turns > 0) {
        const posicionesVacias = emptyPositions(arr);
        const indiceAleatorio = Math.floor(Math.random() * posicionesVacias.length);
        const posicionAleatoria = posicionesVacias[indiceAleatorio];
        arr[posicionAleatoria[0]][posicionAleatoria[1]] = 'o';
        let cells = document.querySelectorAll('.cell');
        const arrayPositions = [];
        for (let i = 0; i < cells.length; i++) {
            arrayPositions.push(cells[i]);
        }
        let posiciones123 = Array.from({ length: 3 }, (_, i) => arrayPositions.slice(i * 3, (i + 1) * 3));
        // posiciones123[posicionAleatoria[0]][posicionAleatoria[1]].innerHTML = 'o';
        posiciones123[posicionAleatoria[0]][posicionAleatoria[1]].classList.add('chopper');
        player2Turns--;
    }
    else {
        const posicionesO = OPositions(arr);
        const indiceAleatorio = Math.floor(Math.random() * posicionesO.length);
        const posicionO = posicionesO[indiceAleatorio];
        arr[posicionO[0]][posicionO[1]] = '';
        let cells = document.querySelectorAll('.cell');
        const arrayPositions = [];
        for (let i = 0; i < cells.length; i++) {
            arrayPositions.push(cells[i]);
        }
        let posiciones123 = Array.from({ length: 3 }, (_, i) => arrayPositions.slice(i * 3, (i + 1) * 3));
        posiciones123[posicionO[0]][posicionO[1]].innerHTML = '';
        posiciones123[posicionO[0]][posicionO[1]].classList.remove('chopper');
        player2Turns++;
        AIMovement(arr);
    }
};
//# sourceMappingURL=main.js.map