/*
Logic to implement:
1 - Add event for Space to change gameStarted to true
2 - Once that happens, reset all variables
3 - Once there is a click on the boxes (detected via event listener), run a playRound function
4 - This function should take event id as playerSelection and run computerChoice()
5 - Compute result of round and update all related fields (current score and table at the end)
6 - Once a player reaches five, show some final match message and return gameStarted to false
NOTE: Work so that the only global variable is gameStarted, all others can be defined inside functions
*/


// Global variable
let playerSelection = '';
let userScore, computerScore;
let round = 0;
const playOptions = ['rock', 'paper', 'scissors'];
let gameStarted = false;
const buttons = document.getElementsByClassName("icon");
const h1 = document.querySelector("h1");
const h2 = document.querySelector("h2");
const roundScore = document.getElementById("round-result");
const currentScore = document.getElementById("score");
const table = document.getElementById("table");

// Start of the Game when Space key is pressed
document.addEventListener("keyup", function(event) {
  if (event.key === " ") {
    if (!gameStarted) {
      gameStarted = true;
      h2.textContent = "Select one of the three options below";
      userScore = 0;
      computerScore = 0;
      roundScore.textContent = "";
      currentScore.textContent = "";
      playGame();
    }
  }
});

// Start of game activates the buttons
function playGame() {
  Array.from(buttons).forEach( (button) => {
    button.addEventListener("click", playRound );
  });
}

function playRound(e) {
  round++;
  playerSelection = e.target.getAttribute("id");
  computerChoice = getComputerChoice();
  roundWinner(playerSelection, computerChoice);
  updateScore(userScore, computerScore);
  updateTable(playerSelection, computerChoice, userScore, computerScore);
  checkEndOfMatch(userScore, computerScore);
}

// Function to generate Computer play
function getComputerChoice() {
  let choice = Math.floor(Math.random() * 3);
  return playOptions[choice];
}


// Function to check end of the match
function checkEndOfMatch(user, computer) {
  if (user === 5 || computer === 5) {
    gameStarted = false;
    Array.from(buttons).forEach( (button) => {
      button.removeEventListener("click", playRound );
    });
    if (user === 5) {
      roundScore.textContent = "Congratulations, you won!";
    } else {
      roundScore.textContent = "What a shame, you were beaten!";
    }
    h2.textContent = "Press Space to play again!";
  }
}

// Reset player and computer selection for next round
function resetChoices() {
  playerSelection = '';
  computerChoice = '';
}

// Function to check the winner of each round and update the current result
function roundWinner(player, computer) {
  if (player === computer) {
    roundScore.textContent = "It's a tie, let's keep playing!"
    resetChoices()
    return;
  }
  
  switch (player) {
    case 'rock':
      if (computer === 'scissors') {
        roundScore.textContent = "You broke it in two! You rock!";
        userScore++;
      } else {
        roundScore.textContent = "He turned you into a Christmas gift!";
        computerScore++;
      };
      resetChoices();
      break;
    case 'paper':
      if (computer === 'rock') {
        roundScore.textContent = "We just wrapped this, no way we are losing!";
        userScore++;
      } else {
        roundScore.textContent = "You were cut to pieces, what a shame!";
        computerScore++;
      };
      resetChoices();
      break;
    case 'scissors':
      if (computer === 'paper') {
        roundScore.textContent = "Better find some glue for him!";
        userScore++;
      } else {
        roundScore.textContent = "That gotta have hurt!";
        computerScore++;
      };
      resetChoices();
      break;
  }
}

// Function to update string literal with score after each round
function updateScore(player, computer) {
  currentScore.textContent = `Player ${userScore} - Computer ${computerScore}`;
}