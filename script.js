// Local Game Data: Words and Categories
const wordData = [
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

// Shuffle Words for Display
const shuffledWords = wordData.sort(() => Math.random() - 0.5);

// Word Selection Logic
const wordGrid = document.getElementById("word-grid");
const resultsDiv = document.getElementById("results");
let selectedWords = [];

// Populate Word Grid
function createWordGrid() {
  shuffledWords.forEach(item => {
    const wordDiv = document.createElement("div");
    wordDiv.className = "word";
    wordDiv.textContent = item.word;

    wordDiv.addEventListener("click", () => toggleWordSelection(wordDiv, item));
    wordGrid.appendChild(wordDiv);
  });
}

// Toggle Word Selection
function toggleWordSelection(wordDiv, wordItem) {
  if (selectedWords.includes(wordItem)) {
    selectedWords = selectedWords.filter(w => w !== wordItem);
    wordDiv.classList.remove("selected");
  } else {
    selectedWords.push(wordItem);
    wordDiv.classList.add("selected");
  }
}

// Check for Correct Grouping
document.getElementById("submit-btn").addEventListener("click", checkGroups);

function checkGroups() {
  if (selectedWords.length !== 4) {
    resultsDiv.textContent = "Select exactly 4 words to form a group.";
    resultsDiv.style.color = "red";
    return;
  }

  const categories = selectedWords.map(w => w.category);
  const uniqueCategories = new Set(categories);

  if (uniqueCategories.size === 1) {
    resultsDiv.textContent = `Correct! The group is: ${categories[0]}`;
    resultsDiv.style.color = "green";
    // Clear the selected words after a correct group
    clearSelectedWords();
  } else {
    resultsDiv.textContent = "Incorrect grouping. Try again!";
    resultsDiv.style.color = "red";
  }
}

function clearSelectedWords() {
  selectedWords.forEach(wordItem => {
    const wordDivs = Array.from(document.getElementsByClassName("word"));
    const wordDiv = wordDivs.find(div => div.textContent === wordItem.word);
    wordDiv.classList.remove("selected");
  });
  selectedWords = [];
}

function selectWord(div, word) {
  // Toggle the 'selected' class
  if (div.classList.contains('selected')) {
    div.classList.remove('selected');
    // Remove word from selectedWords
    selectedWords = selectedWords.filter(w => w !== word);
  } else {
    div.classList.add('selected');
    // Add word to selectedWords
    selectedWords.push(word);
  }

  console.log("Selected Words:", selectedWords); // Debug log
  checkCorrectSelection(); // Check if selection matches a group
}


// Initialize Game
createWordGrid();

