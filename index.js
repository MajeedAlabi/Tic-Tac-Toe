const gameTextEl = document.getElementById("gameText")
const startBtn = document.getElementById("startBtn")
const boxEl = Array.from(document.getElementsByClassName("box"))

const firsPlayer = "X"
const secondPlayer = "O"

let currentPlayer = firsPlayer

let winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

let spaces = [ "","","","","","","","","" ]
let gameMoves = 0

function startGame(){
    boxEl.forEach(cell => cell.addEventListener("click", boxClicked))
}

function boxClicked(e){
    if(!spaces[e.target.id] && gameMoves < 9){
        spaces[e.target.id] = currentPlayer
        e.target.innerText = currentPlayer

        if (winningText() !== false) {
            gameTextEl.textContent = `${currentPlayer} has won`
            gameTextEl.style.color = "green"
            gameMoves = 100
            let winningRow = winningText()
            winningRow.map(cell => boxEl[cell].style.color = "green")
            return
        }
    }
    gameMoves++
    currentPlayer = currentPlayer == firsPlayer? secondPlayer: firsPlayer

    if(gameMoves == 9){
        gameTextEl.textContent = `DRAW GAME`
        gameTextEl.style.color = "red"
        boxEl.forEach(box => box.style.color = 'red');
    }
}

function winningText(){
    for (const combinations of winningCombinations) {
        const [a,b,c] = combinations

        if (spaces[a] && spaces[a] == spaces[b] && spaces[b] == spaces[c]) {
            return [a,b,c]
        }
    }
    return false
}

startBtn.addEventListener("click", function(){
    spaces = [ "","","","","","","","","" ]
    gameTextEl.textContent = "Tic Tac Toe"
    gameTextEl.style.color = "#37505C"
    boxEl.forEach(cell => cell.textContent ="" )
    boxEl.forEach(box => box.style.color = '#37505C')
    currentPlayer = firsPlayer
    gameMoves = 0
})

startGame()