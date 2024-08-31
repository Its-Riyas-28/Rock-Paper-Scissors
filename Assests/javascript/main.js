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

//Gameplay

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
const gameDiv = document.querySelector(".Gameplay");  // Use querySelector instead of querySelectorAll
const resultsDiv = document.querySelector(".results");  // Use querySelector instead of querySelectorAll
const resultsDivs = document.querySelectorAll(".results_result");

// Game Logic
choiceButtons.forEach(button => {
  button.addEventListener('click', () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find(choice => choice.name === choiceName); // Corrected the assignment operator to equality check
    choose(choice);
  });
});

function choose(choice) {
  const pcChoice = pcChoose();
  displayResults([choice, pcChoice]);
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
    }, idx * 300); 
  });
}

// Function to toggle visibility between Gameplay and Results sections
function toggleGameResults() {
  gameDiv.classList.toggle('hidden');  // Hide the Gameplay section
  resultsDiv.classList.toggle('hidden');  // Show the Results section
}
