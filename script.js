const words = [
    { word: "Bluey", group: "Bluey Characters", difficulty: "easy" },
    { word: "Bingo", group: "Bluey Characters", difficulty: "easy" },
    { word: "Bandit", group: "Bluey Characters", difficulty: "easy" },
    { word: "Chilli", group: "Bluey Characters", difficulty: "easy" },
    { word: "Broncos", group: "Brisbane Teams", difficulty: "medium" },
    { word: "Dolphins", group: "Brisbane Teams", difficulty: "medium" },
    { word: "Lions", group: "Brisbane Teams", difficulty: "medium" },
    { word: "Heat", group: "Brisbane Teams", difficulty: "medium" },
    { word: "Wallaby", group: "Native Australian Species", difficulty: "hard" },
    { word: "Platypus", group: "Native Australian Species", difficulty: "hard" },
    { word: "Kookaburra", group: "Native Australian Species", difficulty: "hard" },
    { word: "Koala", group: "Native Australian Species", difficulty: "hard" },
    { word: "Squirrel", group: "Red objects", difficulty: "tricky" },
    { word: "Fox", group: "Red objects", difficulty: "tricky" },
    { word: "Apple", group: "Red objects", difficulty: "tricky" },
    { word: "Cabbage", group: "Red objects", difficulty: "tricky" },
];

const gameContainer = document.getElementById("game-container");
const feedback = document.getElementById("feedback");
const submitButton = document.getElementById("submit-btn");
const shuffleButton = document.getElementById("shuffle-btn");
const resultsScreen = document.getElementById("results-screen");
const modal = document.getElementById("how-to-play-modal");
const closeBtn = document.querySelector(".close-btn");
const attemptsElement = document.getElementById("attempts");

let selectedWords = [];
let attempts = 4;

// Function to get the color based on difficulty
function getDifficultyColor(difficulty) {
    switch (difficulty) {
        case "easy":
            return "#8bc34a"; // Green
        case "medium":
            return "#ffeb3b"; // Yellow
        case "hard":
            return "#2196f3"; // Blue
        case "tricky":
            return "#9c27b0"; // Purple
        default:
            return "#ccc"; // Default gray
    }
}

// Function to shuffle the grid
function shuffleGrid() {
    const shuffledWords = words.sort(() => Math.random() - 0.5);
    gameContainer.innerHTML = "";
    shuffledWords.forEach((item) => {
        const div = document.createElement("div");
        div.className = "word-card";
        div.textContent = item.word;
        div.addEventListener("click", () => toggleSelection(div, item));
        gameContainer.appendChild(div);
    });
}

// Function to toggle word selection
function toggleSelection(div, word) {
    if (div.classList.contains("selected")) {
        div.classList.remove("selected");
        selectedWords = selectedWords.filter((w) => w.word !== word.word);
    } else if (selectedWords.length < 4) {
        div.classList.add("selected");
        selectedWords.push(word);
    }
}

// Function to update results with colored boxes
function updateResults(group, difficulty) {
    const resultRow = document.createElement("div");
    resultRow.className = "result-row";

    // Create 4 blocks for the group
    for (let i = 0; i < 4; i++) {
        const block = document.createElement("div");
        block.className = `result-block ${difficulty}`;
        block.style.backgroundColor = getDifficultyColor(difficulty);
        resultRow.appendChild(block);
    }

    resultsScreen.appendChild(resultRow);
}

// Event listener for the Submit button
submitButton.addEventListener("click", () => {
    if (selectedWords.length !== 4) {
        feedback.textContent = "Select exactly 4 words!";
        feedback.style.color = "red";
        return;
    }

    const group = selectedWords[0].group;
    const difficulty = selectedWords[0].difficulty;
    const allMatch = selectedWords.every((word) => word.group === group);

    if (allMatch) {
        feedback.textContent = `Correct! Group: ${group}`;
        feedback.style.color = "green";

        // Update results screen
        updateResults(group, difficulty);

        // Remove selected words from the grid
        selectedWords.forEach((word) => {
            const card = [...gameContainer.children].find((el) => el.textContent === word.word);
            if (card) card.remove();
        });
        selectedWords = [];
    } else {
        feedback.textContent = "Incorrect! Try again.";
        feedback.style.color = "red";
        attempts--;
        attemptsElement.textContent = attempts;

        if (attempts === 0) {
            feedback.textContent = "Game Over! You've used all attempts.";
            submitButton.disabled = true;
        }
    }

    // Clear selections
    document.querySelectorAll(".word-card.selected").forEach((div) => div.classList.remove("selected"));
    selectedWords = [];
});

// Event listener for the Shuffle button
shuffleButton.addEventListener("click", shuffleGrid);

// Event listener for the How to Play button
document.getElementById("how-to-play-btn").addEventListener("click", () => {
    modal.style.display = "block";
});

// Close modal when clicking the close button
closeBtn.addEventListener("click", () => (modal.style.display = "none"));

// Close modal when clicking outside the modal
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Initial grid render
shuffleGrid();
