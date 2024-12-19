const words = [
  { word: "Bluey", group: "Bluey Characters" },
  { word: "Bingo", group: "Bluey Characters" },
  { word: "Bandit", group: "Bluey Characters" },
  { word: "Chilli", group: "Bluey Characters" },
  { word: "Broncos", group: "Brisbane Teams" },
  { word: "Dolphins", group: "Brisbane Teams" },
  { word: "Lions", group: "Brisbane Teams" },
  { word: "Heat", group: "Brisbane Teams" },
  { word: "Wallaby", group: "Native Australian Species" },
  { word: "Platypus", group: "Native Australian Species" },
  { word: "Kookaburra", group: "Native Australian Species" },
  { word: "Koala", group: "Native Australian Species" },
  { word: "Squirrel", group: "Red objects" },
  { word: "Fox", group: "Red objects" },
  { word: "Apple", group: "Red objects" },
  { word: "Cabbage", group: "Red objects" }
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
    if (selectedWords.length !== 4) {
        feedback.textContent = "Select exactly 4 words!";
        feedback.style.color = "red";
        return;
    }

    // Check if all selected words are in the same group
    const group = selectedWords[0].group;
    const allMatch = selectedWords.every(word => word.group === group);

    if (allMatch) {
        feedback.textContent = `Bingo! Group: ${group}`;
        feedback.style.color = "green";

        // Add the correct group to the "Correct Answers" section
        const groupDiv = document.createElement("div");
        groupDiv.className = "correct-group";
        groupDiv.textContent = `${group}: ${selectedWords.map(w => w.word).join(", ")}`;
        correctAnswersContainer.appendChild(groupDiv);

        // Remove the selected words from the game
        selectedWords.forEach(word => {
            const wordCard = [...gameContainer.children].find(el => el.textContent === word.word);
            if (wordCard) wordCard.remove();
        });

        selectedWords = [];
    } else {
        feedback.textContent = "Stupid!";
        feedback.style.color = "red";
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


