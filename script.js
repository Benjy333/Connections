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
const dynamicAnswers = document.getElementById("dynamic-answers");
const resultsScreen = document.getElementById("results-screen");
const feedback = document.getElementById("feedback");
const submitButton = document.getElementById("submit-btn");
let attempts = 4;
let selectedWords = [];
let solvedGroups = [];

// Shuffle and render the words
const shuffledWords = words.sort(() => Math.random() - 0.5);
shuffledWords.forEach((item) => {
    const div = document.createElement("div");
    div.className = "word-card";
    div.textContent = item.word;
    div.addEventListener("click", () => toggleSelection(div, item));
    gameContainer.appendChild(div);
});

function toggleSelection(div, word) {
    if (div.classList.contains("selected")) {
        div.classList.remove("selected");
        selectedWords = selectedWords.filter((w) => w.word !== word.word);
    } else if (selectedWords.length < 4) {
        div.classList.add("selected");
        selectedWords.push(word);
    }
}

submitButton.addEventListener("click", () => {
    if (selectedWords.length !== 4) {
        feedback.textContent = "Select exactly 4 words!";
        feedback.style.color = "red";
        return;
    }

    const group = selectedWords[0].group;
    const allMatch = selectedWords.every((word) => word.group === group);

    if (allMatch) {
        feedback.textContent = `Correct! Group: ${group}`;
        feedback.style.color = "green";

        // Add this group to dynamic answers
        solvedGroups.push(group);
        updateDynamicAnswers(group, selectedWords);

        // Remove cards from the game board
        selectedWords.forEach((word) => {
            const card = [...gameContainer.children].find((el) => el.textContent === word.word);
            if (card) card.remove();
        });

        // Check if all groups are solved
        if (solvedGroups.length === 4) {
            feedback.textContent = "Congratulations! You've solved all groups!";
            showResultsScreen();
        }
    } else {
        feedback.textContent = "Incorrect! Try again.";
        feedback.style.color = "red";
        attempts--;
        document.getElementById("attempts").textContent = attempts;

        if (attempts === 0) {
            feedback.textContent = "Game Over! You've used all attempts.";
            submitButton.disabled = true;
            showResultsScreen();
        }
    }

    // Clear selections
    document.querySelectorAll(".word-card.selected").forEach((div) => div.classList.remove("selected"));
    selectedWords = [];
});

function updateDynamicAnswers(group, words) {
    const row = document.createElement("div");
    row.className = "answer-row";
    row.style.backgroundColor = getDifficultyColor(words[0].difficulty);

    const heading = document.createElement("h3");
    heading.textContent = group;

    const wordsList = document.createElement("p");
    wordsList.textContent = words.map((word) => word.word).join(", ");

    row.appendChild(heading);
    row.appendChild(wordsList);
    dynamicAnswers.appendChild(row);
}

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

function showResultsScreen() {
    solvedGroups.forEach((group) => {
        const resultRow = document.createElement("div");
        resultRow.className = "result-row";

        const blocks = words.filter((word) => word.group === group);
        blocks.forEach((word) => {
            const block = document.createElement("div");
            block.className = "result-block";
            block.style.backgroundColor = getDifficultyColor(word.difficulty);
            resultRow.appendChild(block);
        });

        resultsScreen.appendChild(resultRow);
    });
}
