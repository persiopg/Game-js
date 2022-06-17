let userScore = 0;
let computerScore = 0;
const userScore_span = document.getElementById("user-score");
const computer_span = document.getElementById("computer-score");
const scoreBoard_div = document.querySelector(".score-board");
const result_p =document.querySelector(".result > p");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");

function getComputerChoice(){
    const choice = ['r','p','s'];    
    const randomNumber = Math.floor(Math.random() * 3);
    return choice[randomNumber]
}

function convertToWorld(letter){
    if(letter === "r")return "Rock";
    if(letter === "p")return "Paper";
    return "Scissors"
}

function wins(userChoice, computerChoice){
    userScore++;
    userScore_span.innerHTML = userScore;
    computer_span.innerHTML = computerScore;
    result_p.innerHTML = `${convertToWorld(userChoice)} beats ${convertToWorld(computerChoice)}. you win!!`;
    document.getElementById(userChoice).classList.add('green-glow');
    setTimeout(function(){document.getElementById(userChoice).classList.remove('green-glow')},500);
}

function lose(userChoice, computerChoice){
    computerScore++;
    userScore_span.innerHTML = userScore;
    computer_span.innerHTML = computerScore;
    result_p.innerHTML = `${convertToWorld(userChoice)} loses to ${convertToWorld(computerChoice)}. you lost!!`;
    document.getElementById(userChoice).classList.add('red-glow');
    setTimeout(function(){document.getElementById(userChoice).classList.remove('red-glow')},500);
}
function draw(userChoice, computerChoice){
    result_p.innerHTML = `${convertToWorld(userChoice)} equals ${convertToWorld(computerChoice)}. It's a draw!!`;
    document.getElementById(userChoice).classList.add('gray-glow');
    setTimeout(function(){document.getElementById(userChoice).classList.remove('gray-glow')},500);
}

function game(userChoice){
    const computerChoice = getComputerChoice();
    switch(userChoice+computerChoice){
        case "rs":
        case "pr":
        case "sp":
            wins(userChoice, computerChoice);
            break;
        case "rp":
        case "ps":
        case "sr":
            lose(userChoice, computerChoice);
            break;
        case "rr":
        case "pp":
        case "ss":
            draw(userChoice, computerChoice);
            break;            
    }
}

function main(){
    rock_div.addEventListener('click', function(){
        game("r");
    } );
    paper_div.addEventListener('click', function(){
        game("p");
    } );
    scissors_div.addEventListener('click', function(){
        game("s");
    } );

}
main();



