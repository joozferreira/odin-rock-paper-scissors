// Function to generate Computer play
function getComputerChoice() {
  let choice = Math.floor(Math.random() * 3);
  if (choice === 0) {
    return "Rock";
  } else if (choice === 1) {
    return "Paper";
  } else {
    return "Scissors";
  }
}

let userChoice;

// Add event listener to buttons
// To remember that getElementsByClassName doesn't generate an Array but an HTML Collection
// This means that forEach method cannot be applied directly
// Therefore I converted it to an Array using .from
// It would also be possible to iterate through a for loop
const buttons = document.getElementsByClassName("icon");

Array.from(buttons).forEach( (button) => {
  button.addEventListener("click", (event) => userChoice = event.target.getAttribute("id"));
});


// ----------- TO BE USED ON NON-UI VERSION ----------- //
// Function to retrieve play from user
// Option for a do while loop to avoid inclusion of unexpected values
// function getPlayerChoice() {
//   let userChoice;
//   do {
//     let playerInput = prompt("Define your hand: ");
//     userChoice = playerInput.charAt(0).toUpperCase() + playerInput.slice(1).toLowerCase();
//   } while (userChoice != "Rock" && userChoice != "Paper" && userChoice != "Scissors");
//   return userChoice;
// }

// Function to determine the outcome of a round
function playRound(playerSelection, computerSelection) {
  if (playerSelection === "Rock") {
    if (computerSelection === "Rock") {
      return "It's a tie, you both selected Rock";
    } else if (computerSelection === "Paper") {
      return "You lose, Paper beats Rock";
    } else {
      return "You won, Rock beats Scissors";
    }
  } else if (playerSelection === "Paper") {
    if (computerSelection === "Rock") {
      return "You won, Paper beats Rock";
    } else if (computerSelection === "Paper") {
      return "It's a tie, you both selected Paper";
    } else {
      return "You lose, Scissors beats Paper";
    }
  } else {
    if (computerSelection === "Rock") {
      return "You lose, Rock beats Scissors";
    } else if (computerSelection === "Paper") {
      return "You won, Scissors beats Paper";
    } else {
      return "It's a tie, you both selected Scissors";
    }
  }
}

// Function to play a 5 round game
// Use of includes method for strings to control the result of each round
function game() {
  let player = 0;
  let computer = 0;
  for (let round = 0; round < 5; round++) {
    let computerSelection = getComputerChoice();
    let playerSelection = getPlayerChoice();
    let result = playRound(playerSelection, computerSelection);
    console.log(result);
    if (result.includes("You won")) {
      player += 1;
    } else if (result.includes("You lose")) {
      computer += 1;
    } else {
      player += 1;
      computer += 1;
    }
    console.log(`Score: Player ${player} - Computer ${computer}`);
  }
  if (player > computer) {
    console.log("Congratulations, you won!");
  } else if (player < computer) {
    console.log("Shame on you, beaten by the CPU");
  } else {
    console.log(`01001001 01110100 00100111 01110011 00100000 01100001 00100000 01110100 01101001 01100101 00100001
    Which means: It's a tie`);
  }
}

// TODO: to avoid ties as end result, implement a do while loop that adds new rounds until any of the players wins!