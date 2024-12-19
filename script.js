const words = [
  { word: "Apple", category: "Fruits" },
  { word: "Banana", category: "Fruits" },
  { word: "Carrot", category: "Vegetables" },
  { word: "Broccoli", category: "Vegetables" },
  { word: "Shark", category: "Animals" },
  { word: "Tiger", category: "Animals" },
  { word: "Guitar", category: "Instruments" },
  { word: "Drum", category: "Instruments" },
  { word: "Orange", category: "Fruits" },
  { word: "Piano", category: "Instruments" },
  { word: "Lion", category: "Animals" },
  { word: "Potato", category: "Vegetables" },
  { word: "Flute", category: "Instruments" },
  { word: "Whale", category: "Animals" },
  { word: "Tomato", category: "Fruits" },
  { word: "Cabbage", category: "Vegetables" }
];

const gameContainer = document.getElementById("game-container");
const feedback = document.getElementById("feedback");
const attemptsLeft = document.getElementById("attempts");
const submitButton = document.getElementById("submit-btn");

let selectedWords = [];
let attempts = 4;

// Shuffle words and render them
const shuffledWords = words.sort(() => Math.random() - 0.5);

shuffledWords.forEach(item => {
  const div = document.createElement("div");
  div.className = "word-card";
  div.textContent = item.word;
  div.addEventListener("click", () => toggleSelection(div, item));
  gameContainer.appendChild(div);
});

function toggleSelection(div, word) {
  if (div.classList.contains("selected")) {
    div.classList.remove("selected");
    selectedWords = selectedWords.filter(w => w.word !== word.word);
  } else if (selectedWords.length < 4) {
    div.classList.add("selected");
    selectedWords.push(word);
  }
}

submitButton.addEventListener("click", checkGroup);

function checkGroup() {
  if (attempts === 0) return; // Disable interaction if attempts are 0

  if (selectedWords.length !== 4) {
    feedback.textContent = "Select exactly 4 words!";
    return;
  }

  // Check if all selected words are in the same category
  const category = selectedWords[0].category;
  const allMatch = selectedWords.every(word => word.category === category);

  if (allMatch) {
    feedback.textContent = `Correct! Group: ${category}`;
    selectedWords.forEach(word => {
      const div = [...gameContainer.children].find(el => el.textContent === word.word);
      if (div) div.remove();
    });
    selectedWords = [];
  } else {
    feedback.textContent = "Incorrect group!";
    attempts--;
    attemptsLeft.textContent = attempts;
    if (attempts === 0) {
      feedback.textContent = "Game Over! Try again.";
      submitButton.disabled = true;
    }
  }

  // Clear selections
  document.querySelectorAll(".word-card.selected").forEach(div => div.classList.remove("selected"));
  selectedWords = [];
}
