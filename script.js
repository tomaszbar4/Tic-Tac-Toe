const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const winningMessage = document.getElementById('winning-message')
const winningMessageText = document.querySelector('[data-winning-message-text]')

const whoIsFirst = document.querySelector('.whoisfirst')

const restartButton = document.getElementById('restartButton')

const xStart = document.getElementById('x-start')
const circleStart = document.getElementById('circle-start')

const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
]

const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')

let circleTurn

circleStart.addEventListener('click', () => {
    circleTurn = true
    startGame()
    whoIsFirst.style.display = 'none'
})

xStart.addEventListener('click', () => {
    circleTurn = false
    startGame()
    whoIsFirst.style.display = 'none'
})

restartButton.addEventListener('click', startGame)

function startGame() {
    cellElements.forEach(element => {
        element.classList.remove(CIRCLE_CLASS)
        element.classList.remove(X_CLASS)
        element.addEventListener('click', handleClick, { once: true })
    })
    winningMessage.classList.remove('show')
    setBoardHoverClass()
}

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)

    if (checkWin(currentClass)) {
        endGame(false)
    }
    else if (isDraw()) {
        endGame(true)
    }
    else {
        swapTurns()
        setBoardHoverClass()
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}


function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function endGame(draw) {
    if (draw) {
        winningMessageText.textContent = 'Draw!'
    }
    else {
        winningMessageText.textContent = `${circleTurn ? "O's" : "X's"} wins!`
    }

    winningMessage.classList.add('show')
    circleTurn = !circleTurn
}
function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) board.classList.add(CIRCLE_CLASS)
    else board.classList.add(X_CLASS)
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}