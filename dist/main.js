const player1 = "x";
const player2 = "o";
let player1Turns = 3;
let player2Turns = 3;
let currentPlayer = "x";
let lastQuit;
let token = 'luffy';
let gameOver = false;
const views = document.querySelectorAll(".container-fluid");
let nickname;
let nickname2;
let nick;
let currentViewIndex = 0;
const ticTacToeBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
];
// Function that check's if there's a winning position.
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
// Function that checks whose player is playing and changes.
const changeTurn = () => {
    currentPlayer == "x" ? currentPlayer = "o" : currentPlayer = "x";
    if (currentPlayer === "x") {
        token = 'luffy';
        nick = nickname;
    }
    else {
        token = 'chopper';
        nick = nickname2;
    }
};
// Reduces the counter of both players
const reduceCounter = () => {
    let turns;
    if (currentPlayer === "x") {
        player1Turns = player1Turns - 1;
        turns = player2Turns;
    }
    else {
        player2Turns = player2Turns - 1;
        turns = player1Turns;
    }
    return turns;
};
// Increases the counter of both players
const increaseCounter = () => {
    if (currentPlayer === "x") {
        player1Turns = player1Turns + 1;
    }
    else {
        player2Turns = player2Turns + 1;
    }
};
// Game function. Has all the logic since you set a token on the board.
const setToken = (cell) => {
    const box = document.querySelector(`#${cell}`);
    const row = document.querySelector(`#${cell}`).dataset.row;
    const column = document.querySelector(`#${cell}`).dataset.column;
    let turnos = checkTurns();
    if (document.querySelector("#select-num-players1").checked === true) {
        if (turnos > 0) {
            if (ticTacToeBoard[row][column] === '' && box != lastQuit) {
                ticTacToeBoard[row][column] = currentPlayer;
                box.classList.add(`${token}`);
                let turns = reduceCounter();
                if (turns > 0) {
                    document.querySelector('.turn-counter').innerHTML = `You have ${turns} turns left`;
                }
                else {
                    document.querySelector('.turn-counter').innerHTML = `You have no turns left to place. Remove a token from you.`;
                }
                let winner = checkWin();
                if (winner) {
                    showWinner(nick, token);
                    clearBoard();
                    return;
                }
                changeTurn();
                document.querySelector('.turn-name').innerHTML = `${nick}'s turn`;
            }
        }
        else {
            if (ticTacToeBoard[row][column] !== "" && ticTacToeBoard[row][column] === currentPlayer) {
                lastQuit = box;
                ticTacToeBoard[row][column] = "";
                box.classList.remove(`${token}`);
                document.querySelector('.turn-counter').innerHTML = `Place the token in another cell.`;
                increaseCounter();
            }
        }
    }
    else {
        // This happens when you play vs the IA.
        if (turnos > 0) {
            currentPlayer = 'x';
            if (ticTacToeBoard[row][column] === '' && box != lastQuit) {
                ticTacToeBoard[row][column] = 'x';
                box.classList.add(`luffy`);
                player1Turns--;
                let winner = checkWin();
                if (winner) {
                    showWinner(nickname, 'luffy');
                    clearBoard();
                    return;
                }
                AIMovement(ticTacToeBoard);
                let winnerAI = checkWin();
                if (winnerAI) {
                    showWinner('Chopper', 'chopper');
                    clearBoard();
                    return;
                }
                if (player1Turns > 0) {
                    document.querySelector('.turn-counter').innerHTML = `You have ${player1Turns} turns left`;
                }
                else {
                    document.querySelector('.turn-counter').innerHTML = `You have no turns left to place. Remove a token from you.`;
                }
                document.querySelector('.turn-name').innerHTML = `${nickname}'s turn`;
            }
        }
        else {
            if (ticTacToeBoard[row][column] !== "" && ticTacToeBoard[row][column] === 'x') {
                lastQuit = box;
                ticTacToeBoard[row][column] = "";
                box.classList.remove(`luffy`);
                document.querySelector('.turn-counter').innerHTML = `Place the token in another cell.`;
                increaseCounter();
            }
        }
    }
};
// Checks how many turns a player has.
const checkTurns = () => {
    if (currentPlayer === "x") {
        return player1Turns;
    }
    else {
        return player2Turns;
    }
};
// Clears the board in the array and in HTML.
const clearBoard = () => {
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
};
// Set data in their divs once it is verified.
const setData = () => {
    nickname = document.querySelector("#nickname").value;
    nickname2 = document.querySelector("#nickname2").value;
    document.querySelector('#player1').innerHTML = nickname;
    document.querySelector('#player2').innerHTML = nickname2;
    document.querySelector('.turn-name').innerHTML = `${nickname}'s turn`;
    document.querySelector('.turn-counter').innerHTML = `You have ${player1Turns} turns left`;
    if (document.querySelector("#select-num-players2").checked === true) {
        nickname2 = 'Chopper';
    }
};
// Hides current page and show you the next page.
const nextPage = (page) => {
    let views = document.querySelectorAll(".container-fluid");
    let nextPage = document.querySelector(`.${page}`);
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
    nextPage.classList.remove("hidden");
};
// Disables the input of the second player if you select playing vs IA.
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
// Checks all available positions in the main board.
function checkAvailablePositions() {
    let availablePositions = [];
    for (let i = 0; i < ticTacToeBoard.length; i++) {
        for (let j = 0; j < ticTacToeBoard.length; j++) {
            if (ticTacToeBoard[i][j] == '') {
                availablePositions.push([i, j]);
            }
        }
    }
    return availablePositions;
}
// Checks the positions where an "o" is setted
function OPositions() {
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
// Controls if IA has to set a token or remove it.
const AIMovement = (arr, excl) => {
    if (player2Turns > 0) {
        const availablePositions = checkAvailablePositions();
        if (excl) {
            removeElementFromArray(availablePositions, excl);
        }
        const randomIndex = Math.floor(Math.random() * availablePositions.length);
        const newPosition = availablePositions[randomIndex];
        arr[newPosition[0]][newPosition[1]] = 'o';
        let cells = document.querySelectorAll('.cell');
        const arrayPositions = [];
        for (let i = 0; i < cells.length; i++) {
            arrayPositions.push(cells[i]);
        }
        let cellsArray = Array.from({ length: 3 }, (_, i) => arrayPositions.slice(i * 3, (i + 1) * 3));
        cellsArray[newPosition[0]][newPosition[1]].classList.add('chopper');
        player2Turns--;
    }
    else {
        const AIPositions = OPositions();
        const randomIndex = Math.floor(Math.random() * AIPositions.length);
        const AIPosition = AIPositions[randomIndex];
        arr[AIPosition[0]][AIPosition[1]] = '';
        let cells = document.querySelectorAll('.cell');
        const arrayPositions = [];
        for (let i = 0; i < cells.length; i++) {
            arrayPositions.push(cells[i]);
        }
        let cellsArray = Array.from({ length: 3 }, (_, i) => arrayPositions.slice(i * 3, (i + 1) * 3));
        cellsArray[AIPosition[0]][AIPosition[1]].innerHTML = '';
        cellsArray[AIPosition[0]][AIPosition[1]].classList.remove('chopper');
        player2Turns++;
        AIMovement(arr, AIPosition);
    }
};
// Removes the position from the last token taken off from the array of all empty positions
const removeElementFromArray = (arr, excl) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][0] === excl[0] && arr[i][1] === excl[1]) {
            arr.splice(i, 1);
            i--;
        }
    }
    return arr;
};
// Show a div with the info needed when any player wins
const showWinner = (nick, token) => {
    document.querySelector('.character-image-winner').classList.remove(`chopper`);
    document.querySelector('.character-image-winner').classList.remove(`luffy`);
    document.querySelector('.winner-winner').classList.remove('hidden');
    document.querySelector('.character-image-winner').classList.add(`${token}`);
    document.querySelector('.text-winner').innerHTML = `${nick} has won!!`;
};
// Resets all fields.
const restartGame = () => {
    document.querySelector('.winner-winner').classList.add('hidden');
    document.querySelector("#nickname").value = "";
    document.querySelector("#nickname2").value = "";
    document.querySelector('.character-image-winner').classList.remove(`${token}`);
    document.querySelector('.turn-name').innerHTML = `${nick}'s turn`;
    player1Turns = 3;
    player2Turns = 3;
    lastQuit = '';
    let turnos = checkTurns();
    document.querySelector('.turn-counter').innerHTML = `You have ${turnos} left`;
    document.querySelector(".comprobar").classList.add("hidden");
};
//# sourceMappingURL=main.js.map