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
const modal = document.getElementById("how-to-play-modal");
const closeBtn = document.querySelector(".close-btn");
const feedback = document.getElementById("feedback");

// Function to shuffle and render the grid
function shuffleGrid() {
    const shuffledWords = words.sort(() => Math.random() - 0.5);
    gameContainer.innerHTML = "";
    shuffledWords.forEach((item) => {
        const div = document.createElement("div");
        div.className = "word-card";
        div.textContent = item.word;
        gameContainer.appendChild(div);
    });
}

// Event handler for button clicks
document.body.addEventListener("click", (event) => {
    const buttonId = event.target.id;

    if (buttonId === "submit-btn") {
        feedback.textContent = "Submit button clicked!";
        feedback.style.color = "green";
        // Add your submit logic here
    } else if (buttonId === "shuffle-btn") {
        shuffleGrid();
        feedback.textContent = "Grid shuffled!";
        feedback.style.color = "orange";
    } else if (buttonId === "how-to-play-btn") {
        modal.style.display = "block";
    }
});

// Close modal when the close button is clicked
closeBtn.addEventListener("click", () => (modal.style.display = "none"));

// Close modal when clicking outside the modal
window.addEventListener("click", (event) => {
    if (event.target === modal) modal.style.display = "none";
});

// Initial grid render
shuffleGrid();
