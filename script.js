import { films } from './data.js';

const input = document.getElementById('myinput');
const messageContainer = document.getElementsByClassName('message-container')[0];
const emojiCluesContainer = document.getElementsByClassName('emoji-clues-container')[0];
const btn = document.getElementById('btn');

// Track used films and the current state
let filmsUsed = [];
let currentFilmIndex = -1;
let guessesRemaining = 3;

// Initialize the game
function startGame() {
    // Reset guesses for the new movie
    guessesRemaining = 3;

    // Check if all films have been used
    if (filmsUsed.length === films.length) {
        messageContainer.innerHTML = "That's all folks! You've guessed all the movies!";
        emojiCluesContainer.innerHTML = ""; // Clear emoji clues
        btn.disabled = true; // Disable button
        return;
    }

    // Select a random film that hasn't been used yet
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * films.length);
    } while (filmsUsed.includes(randomIndex));

    currentFilmIndex = randomIndex;
    filmsUsed.push(currentFilmIndex); // Mark film as used

    // Get the current film and process emojis
    const currentFilm = films[currentFilmIndex];
    console.log("Current Film:", currentFilm); // Log current film for debugging

    // Display emoji clues without commas (split by commas and join with spaces)
    const emojiString = currentFilm.emoji; // Ensure no commas
    console.log("Emoji String:", emojiString); // Log the emoji string for debugging

    // Set the emoji clues and aria label
    emojiCluesContainer.innerHTML = emojiString;
    emojiCluesContainer.setAttribute('aria-label', currentFilm.ariaLabel);
    
    // Update message
    messageContainer.innerHTML = `You have ${guessesRemaining} guesses remaining.`;
}

// Handle guess submission
btn.onclick = function (e) {
    e.preventDefault();

    // Get user input and correct answer
    const userGuess = input.value.trim().toLowerCase();
    const correctAnswer = films[currentFilmIndex].title.toLowerCase();

    // Check the guess
    if (userGuess === correctAnswer) {
        messageContainer.innerHTML = "Correct! 🎉";
        setTimeout(() => {
            startGame(); // Move to the next movie after a delay
        }, 3000); // Wait 3 seconds
    } else {
        guessesRemaining--; // Decrease guesses on incorrect guess

        if (guessesRemaining > 0) {
            messageContainer.innerHTML = `Incorrect! You have ${guessesRemaining} guesses remaining.`;
        } else {
            // All guesses exhausted
            messageContainer.innerHTML = `The film was "${films[currentFilmIndex].title}"!`;
            setTimeout(() => {
                startGame(); // Move to the next movie after a delay
            }, 3000); // Wait 3 seconds
        }
    }

    // Clear input field after each guess
    input.value = '';
};

// Start the game on page load
startGame();
