const player1 = 'x'
const player2 = 'o'
let player1Turns = 3;
let player2Turns = 3;
let currentPlayer = 'x'
const ticTacToeBoard = [
    ['','',''],
    ['','',''],
    ['','','']
]
let gameOver = false;
const views = document.querySelectorAll('.container-fluid')
let currentViewIndex = 0

const changeView = () => {

    for (let i = 0; i < views.length; i++){
        views[i].classList.add('hidden')
    }
    
    views[currentViewIndex].classList.remove('hidden')
      
    currentViewIndex++
      
    if (currentViewIndex >= views.length) {
    currentViewIndex = 0
    }
}

const checkWin = () => {
    for (let i = 0; i < ticTacToeBoard.length; i++){
        for (let j = 0; j < ticTacToeBoard.length; j++){
          if ((ticTacToeBoard[i][0] === ticTacToeBoard[i][1] && ticTacToeBoard[i][1] === ticTacToeBoard[i][2] && ticTacToeBoard[i][0] !== '') || 
              (ticTacToeBoard[0][j] === ticTacToeBoard[1][j] && ticTacToeBoard[1][j] === ticTacToeBoard[2][j] && ticTacToeBoard[0][j] !== '') ||
              (ticTacToeBoard[0][0] === ticTacToeBoard[1][1] && ticTacToeBoard[1][1] === ticTacToeBoard[2][2] && ticTacToeBoard[0][0] !== '') || 
              (ticTacToeBoard[0][2] === ticTacToeBoard[1][1] && ticTacToeBoard[1][1] === ticTacToeBoard[2][0] && ticTacToeBoard[0][2] !== '')){
                gameOver = true;
                alert('GameOver')
                return
            }
        }
      }
};

const colocarFicha = (fila:number,columna:number,celda:number) => {
    const box = document.querySelector(`#box${celda}`)
    console.log(box)
    if(box.innerHTML === '' && player1Turns > 0 || player2Turns > 0){
        ticTacToeBoard[fila][columna] = currentPlayer
        console.log(ticTacToeBoard)
        box.innerHTML = currentPlayer;
        reducirContador()
        checkWin()
        cambiarTurno()
    }
}

const cambiarTurno = () => {
    
   if (currentPlayer == 'x'){
        currentPlayer = 'o'
   } else {
        currentPlayer = 'x'
   }
}

const reducirContador = () => {
    if (currentPlayer == 'x'){
        player1Turns = player1Turns - 1
    } else {
        player2Turns = player2Turns - 1
    }
    console.log(player1Turns)
    console.log(player2Turns)
}