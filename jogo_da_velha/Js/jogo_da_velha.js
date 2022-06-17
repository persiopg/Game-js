const cellElement = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const wineerMessageTextElement = document.querySelector("[data-winner-message-text]");
const winnerMessage = document.querySelector("[data-winner-message]");
const restartButton = document.querySelector("[data-restart-button]");

let isCircleTurne;
const winnerCombination = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


const startGame = () => {    
    isCircleTurne = false;

    for(const cell of cellElement){        
        cell.classList.remove("circle");
        cell.classList.remove("x");
        cell.removeEventListener("click", handleCLick);
        cell.addEventListener('click', handleCLick,{ once: true });
    }

    setboardHouverClass();
    winnerMessage.classList.remove("show-winner-message");
};

const endGame = (isDraw) => {
    if(isDraw){
        wineerMessageTextElement.innerText = "Empate!";
    }else{
        wineerMessageTextElement.innerText = isCircleTurne ? "O ganhou!" : "X ganhou!";
    }
    winnerMessage.classList.add("show-winner-message");
};


const checkForWin = (currentPLayer) => {
    return winnerCombination.some(combination => {
        return combination.every(index => {
            return cellElement[index].classList.contains(currentPLayer);
        })
    });
};

const checkForDraw = () => {
    return [...cellElement].every(cell => {
        return cell.classList.contains("circle") || cell.classList.contains("x");
    });
}

const placeMArk = (cell, classToAdd) => {    
    cell.classList.add(classToAdd);
};

const setboardHouverClass = () => {
    board.classList.remove("circle");
    board.classList.remove("x");

    if(isCircleTurne){
        board.classList.add("circle");
    }else{
        board.classList.add("x");
    }
};

const  swapTurn = () => {
    isCircleTurne = !isCircleTurne;

    setboardHouverClass();

};

const handleCLick = (e) => {
    //colocar x ou circulo
    const cell = e.target;
    const classToAdd = isCircleTurne ? 'circle' : 'x';
    placeMArk(cell, classToAdd);
    
    //verificar empate
    const isDraw = checkForDraw();
    //checar se ganhou
    const isWin = checkForWin(classToAdd);
    if(isWin){
        endGame(false);
    }else if(isDraw){        
        endGame(true);
    }else{
        //mudar simbulo    
        swapTurn();
    };
};

startGame();

restartButton.addEventListener("click", startGame);