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
let remainingWords = [...words]; // Track uncompleted words
let attempts = 4;
let groupsCompleted = 0;

// Function to shuffle the remaining grid
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

// Function to toggle word selection
function toggleSelection(div, word) {
    if (div.classList.contains("selected")) {
        div.classList.remove("selected");
        selectedWords = selectedWords.filter((w) => w.word !== word.word);
    } else if (selectedWords.length < 4) {
        div.classList.add("selected");
        selectedWords.push(word);
    }

    // Provide a hint if only one word is needed
    if (selectedWords.length === 3) {
        const possibleGroup = selectedWords[0].group;
        const hintMatch = remainingWords.filter(
            (w) => w.group === possibleGroup && !selectedWords.includes(w)
        );
        if (hintMatch.length === 1) {
            feedback.textContent = "One away!";
            feedback.style.color = "orange";
        } else {
            feedback.textContent = "";
        }
    } else {
        feedback.textContent = "";
    }
}

// Function to update results with colored boxes
function updateResults(isSuccess, group, difficulty) {
    const resultRow = document.createElement("div");
    resultRow.className = "result-row";

    // Create 4 blocks for the group
    selectedWords.forEach((word) => {
        const block = document.createElement("div");
        block.className = `result-block ${word.difficulty}`;
        block.style.backgroundColor = isSuccess ? getDifficultyColor(difficulty) : getDifficultyColor(word.difficulty);
        resultRow.appendChild(block);
    });

    // Append to results screen
    resultsScreen.appendChild(resultRow);
}

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

        // Update results screen for success
        updateResults(true, group, difficulty);

        // Remove selected words from remainingWords
        remainingWords = remainingWords.filter((word) => !selectedWords.includes(word));

        // Increment groups completed
        groupsCompleted++;

        // Clear selected words
        selectedWords = [];

        // Check if the puzzle is completed
        if (groupsCompleted === 4) {
            feedback.textContent = "Puzzle Complete! See your results below.";
            feedback.style.color = "green";
            resultsScreen.style.display = "block"; // Show results screen
        } else {
            shuffleGrid(); // Re-render remaining grid
        }
    } else {
        feedback.textContent = "Incorrect! Try again.";
        feedback.style.color = "red";

        // Update results screen for failure
        updateResults(false);

        attempts--;
        attemptsElement.textContent = attempts;

        if (attempts === 0) {
            feedback.textContent = "Game Over! You've used all attempts.";
            resultsScreen.style.display = "block"; // Show results screen
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
howToPlayButton.addEventListener("click", () => {
    modal.style.display = "block";
});

// Close modal when clicking the close button
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Close modal when clicking outside the modal
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Initial grid render
shuffleGrid();
