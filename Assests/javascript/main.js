// RULES MODULE
document.getElementById("rules-button").addEventListener("click", function () {
  const rules = document.querySelector(".rules");
  const closeButton = document.querySelector(".close-button");

  if (rules.style.transform === "scale(1)") {
    rules.style.transform = "scale(0)";
    closeButton.style.display = "none";
  } else {
    rules.style.transform = "scale(1)";
    closeButton.style.display = "flex";
  }
});

document.getElementById("close-button").addEventListener("click", function () {
  document.querySelector(".rules").style.transform = "scale(0)";
  document.querySelector(".close-button").style.display = "none";
});

// Gameplay
const CHOICES = [
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissors",
    beats: "paper",
  },
  {
    name: "rock",
    beats: "scissors",
  },
];

const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".Gameplay");
const resultsDiv = document.querySelector(".results");
const resultsDivs = document.querySelectorAll(".results_result");
const resultWinner = document.querySelector('.results_winner');
const resultText = document.querySelector('.results_text');
const playAgainBtn = document.querySelector('.play-again');

// Add scoreboard elements
const userScoreElement = document.querySelector('.your .pc-score');
const pcScoreElement = document.querySelector('.comp .pc-score');

// Load scores from localStorage
let userScore = parseInt(localStorage.getItem('userScore')) || 0;
let pcScore = parseInt(localStorage.getItem('pcScore')) || 0;

// Update the scoreboard display
userScoreElement.textContent = userScore;
pcScoreElement.textContent = pcScore;

choiceButtons.forEach(button => {
  button.addEventListener('click', () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find(choice => choice.name === choiceName);
    choose(choice);
  });
});

function choose(choice) {
  const pcChoice = pcChoose();
  displayResults([choice, pcChoice]);
  displayWinner([choice, pcChoice]);
  updateScore([choice, pcChoice]);
  toggleGameResults();
}

function pcChoose() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
}

function displayResults(results) {
  resultsDivs.forEach((resultsDiv, idx) => {
    setTimeout(() => {
      resultsDiv.innerHTML = `
        <div class="choice ${results[idx].name}">
        <img src="/Assests/img/icon-${results[idx].name}.png" alt="${results[idx].name}"/>
        </div>
      `;
    }, idx * 200);
  });

  // Ripple effect
  const userChoice = results[0];
  const pcChoice = results[1];
  
  if (userChoice.beats === pcChoice.name) {
    resultsDivs[0].classList.add('winner'); // User wins
  } else if (pcChoice.beats === userChoice.name) {
    resultsDivs[1].classList.add('winner'); // PC wins
  }
}

function updateScore(results) {
  const userWins = isWinner(results);
  const pcWins = isWinner(results.reverse());

  if (userWins) {
    userScore += 1;
    userScoreElement.textContent = userScore;
    localStorage.setItem('userScore', userScore);
  } else if (pcWins) {
    pcScore += 1;
    pcScoreElement.textContent = pcScore;
    localStorage.setItem('pcScore', pcScore);
  }
}

function toggleGameResults() {
  gameDiv.classList.toggle('hidden'); 
  resultsDiv.classList.toggle('hidden'); 
}

function displayWinner(results) {
  setTimeout(() => {
    const userWins = isWinner(results);
    const pcWins = isWinner(results.reverse());

    if (userWins) {
      resultText.innerHTML = "YOU WIN<br><span class='against-pc'>AGAINST PC</span>";
    } else if (pcWins) {
      resultText.innerHTML = "YOU LOST<br><span class='against-pc'>AGAINST PC</span>";
    } else {
      resultText.innerText = "TIE UP";
    }
  }, 200);

  resultWinner.classList.remove('hidden'); 
  resultsDiv.classList.add('show-winner'); 
}

function isWinner(results) {
  return results[0].beats === results[1].name;
}

playAgainBtn.addEventListener('click', () => {
  gameDiv.classList.remove('hidden'); 
  resultsDiv.classList.add('hidden'); 

  resultsDivs.forEach(resultDiv => {  
    resultDiv.innerHTML = "";
    resultDiv.classList.remove('winner');
  });
  resultText.innerText = "";
  resultWinner.classList.add('hidden'); 
  resultsDiv.classList.remove('show-winner'); 
});
