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
const howToPlayButton = document.getElementById("how-to-play-btn");
const attemptsElement = document.getElementById("attempts");

let selectedWords = [];
let remainingWords = [...words];
let attempts = 4;
let groupsCompleted = 0;

// Shuffle grid function
function shuffleGrid() {
    const shuffledWords = remainingWords.sort(() => Math.random() - 0.5);
    gameContainer.innerHTML = ""; // Clear the grid
    shuffledWords.forEach((item) => {
        const div = document.createElement("div");
        div.className = "word-card";
        div.textContent = item.word;
        div.addEventListener("click", () => toggleSelection(div, item));
        gameContainer.appendChild(div);
    });
}

// Toggle word selection
function toggleSelection(div, word) {
    if (div.classList.contains("selected")) {
        div.classList.remove("selected");
        selectedWords = selectedWords.filter((w) => w.word !== word.word);
    } else if (selectedWords.length < 4) {
        div.classList.add("selected");
        selectedWords.push(word);
    }
}

// Display the correct group at the top
function displayCorrectGroup(group, difficulty) {
    const correctGroupDiv = document.createElement("div");
    correctGroupDiv.className = `completed-group ${difficulty}`;
    correctGroupDiv.style.backgroundColor = getDifficultyColor(difficulty);

    const groupTitle = document.createElement("h3");
    groupTitle.textContent = group.toUpperCase();

    const groupWords = document.createElement("p");
    groupWords.textContent = selectedWords.map((w) => w.word).join(", ");

    correctGroupDiv.appendChild(groupTitle);
    correctGroupDiv.appendChild(groupWords);

    // Add to the results section
    resultsScreen.style.display = "block";
    resultsScreen.appendChild(correctGroupDiv);
}

// Get the color for the group difficulty
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

// Submit button functionality
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

        // Mark the group as complete
        displayCorrectGroup(group, difficulty);

        // Remove selected words from the grid
        remainingWords = remainingWords.filter((word) => !selectedWords.includes(word));

        // Increment groups completed
        groupsCompleted++;

        // Check if the game is complete
        if (groupsCompleted === 4) {
            feedback.textContent = "Puzzle Complete! See your results above.";
            feedback.style.color = "green";
        } else {
            shuffleGrid(); // Re-render remaining grid
        }
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

// Shuffle button functionality
shuffleButton.addEventListener("click", shuffleGrid);

// Modal functionality
howToPlayButton.addEventListener("click", () => {
    modal.style.display = "block";
});
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Initial grid render
shuffleGrid();
