const words = [
  { word: "Benjy", category: "Fruits" },
  { word: "Banana", category: "Fruits" },
  { word: "Carrot", category: "Vegetables" },
  { word: "Broccoli", category: "Vegetables" },
  { word: "Shark", category: "Animals" },
  { word: "Tiger", category: "Animals" },
  { word: "Guitar", category: "Instruments" },
  { word: "Drum", category: "Instruments" },
];

const gameContainer = document.getElementById("game-container");
const feedback = document.getElementById("feedback");
const attemptsLeft = document.getElementById("attempts");
const submitButton = document.getElementById("submit-btn");
const correctAnswersContainer = document.getElementById("correct-answers");

let selectedWords = [];
let attempts = 4;

// Shuffle words and render them
const shuffledWords = words.sort(() => Math.random() - 0.5);

shuffledWords.forEach(item => {
  const div = document.createElement("div");
  div.className = "word-card";
  div.textContent = item.word;
  div.addEventListener("click", () => {
    console.log(`Clicked: ${item.word}`); // Debugging
    toggleSelection(div, item);
  });
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
