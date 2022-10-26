const possibleWinningCombinitions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [1,4,7],
    [0,3,6],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const x_class = 'x'
const circle_class = 'circle'
const individualCell = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessage  = document.getElementById('winningMessage')
const winningMessageText = document.querySelector('[data-winning-message-text]')
let which_Mark
const restartButton = document.getElementById('restart')

restartButton.addEventListener('click', startGame)
startGame() 

function startGame(){
    which_Mark = false
    individualCell.forEach(cell=>{
        cell.classList.remove(x_class)
        cell.classList.remove(circle_class)
        cell.addEventListener('click', clickHanlder, { once:true })
    })
    addingHoverToTheBoard()
    winningMessage.classList.remove('show')
}

function clickHanlder (e){
    console.log("clickedd") 
    const cell_triggered = e.target
    const currentClass = which_Mark ? circle_class : x_class
    markThePlace(cell_triggered, currentClass)
    if(checkWin(currentClass)){
        endTheGame(false)
    }else if(isDraw()){
        console.log('hah')
        endTheGame(true)
    }else{
        swapTheCircleType()
        addingHoverToTheBoard()
    }
}
function endTheGame(draw){
    if(draw){
        console.log('draw')
        winningMessageText.innerText = 'Draw!'
    } else {
        console.log('win')
        winningMessageText.innerText = `${which_Mark ? "O's" : "X's"}Wins`
    }
    winningMessage.classList.add('show')
}
function isDraw(){
 return [...individualCell].every(cell=>{
    return cell.classList.contains(x_class) || 
    cell.classList.contains(circle_class)
 })   
}
function markThePlace(cell_triggered, currentClass){
    cell_triggered.classList.add(currentClass)
}
function swapTheCircleType(){
    which_Mark = !which_Mark
}
function addingHoverToTheBoard () {
    board.classList.remove(x_class)
    board.classList.remove(circle_class)

    if(which_Mark){
        board.classList.add(circle_class)
    }else{
        board.classList.add(x_class)
    }
}
function checkWin(currentClass){
    return possibleWinningCombinitions.some(combinition=>{
        return combinition.every(index=>{
            return individualCell[index].classList.contains(currentClass)
        })
    })
}