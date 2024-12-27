/*
You are going to build an app that challenges players to identify a Christmas Movie from some emoji 🍿 🎅 🎬. The players will have 3 guesses per movie.

For example, the emoji 🌇 💣 👮 ✈️ ️🔫  represent the film “Die Hard”, which everyone knows is the best Christmas movie of all time.

In data.js you have an array of Christmas movies with emoji and text for aria labels.

Your task is to build an app that meets these criteria:

- The app should present the player with a set of emoji selected at random from the array in data.js. 

- The player will input their guess.

- If the player guesses correctly, the app should display a message saying "Correct!". Then, after a pause of 3 seconds, it should randomly select the next set of emoji clues and display them to the player.

- If the player’s guess is incorrect, the app should display a message saying “Incorrect! You have 2 more guesses remaining.”

- If the player fails to guess correctly on the next two attempts, the app should display a message saying, `The film was <Film Name Here>!`. After a pause of 3 seconds, it should randomly select a new set of emoji clues and display them to the player.

- When all films in the array have been used, the player should see a message saying "That's all folks!".

- Each film should only be used once. There should be no repetition. 


Stretch Goals

- Use AI to decide if an answer is correct or incorrect. For example if the correct answer is "The Polar Express" but the player inputs "Polar Express" a straight comparison of the two strings will find that the player's answer was incorrect. AI could assess if there is sufficient similarity between the strings to judge it as correct. 

- Improve the UX by disabling the form/button when the game is over and during the pause between questions.
*/

import { films } from './data.js';

const input = document.getElementById('myinput');
const messageContainer = document.getElementsByClassName('message-container')[0];
const emojiCluesContainer = document.getElementsByClassName('emoji-clues-container')[0];
const btn = document.getElementById('btn');

// Track films used and the current film index
let filmsUsed = [];
let currentFilmIndex = -1;

// Initialize the game
function startGame() {
    // Check if all films have been used
    if (filmsUsed.length === films.length) {
        messageContainer.innerHTML = "That's all folks!";
        return;
    }

    // Select a random film that hasn't been used yet
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * films.length);
    } while (filmsUsed.includes(randomIndex));
    
    currentFilmIndex = randomIndex;
    filmsUsed.push(currentFilmIndex);  // Mark film as used

    const currentFilm = films[currentFilmIndex];
    emojiCluesContainer.innerHTML = currentFilm.emoji;
    emojiCluesContainer.setAttribute('aria-label', currentFilm.ariaLabel);
    messageContainer.innerHTML = "You have 3 guesses remaining.";
}

// Start game when page loads
startGame();

// Handle guess submission
btn.onclick = function (e) {
    e.preventDefault();

    const userGuess = input.value.trim().toLowerCase();
    const correctAnswer = films[currentFilmIndex].title.toLowerCase();
    
    let guessesRemaining = 3;
    
    // Check guess
    if (userGuess === correctAnswer) {
        messageContainer.innerHTML = "Correct!";
        setTimeout(() => {
            startGame();
        }, 3000); // Wait 3 seconds before starting the next round
    } else {
        guessesRemaining--;
        if (guessesRemaining > 0) {
            messageContainer.innerHTML = `Incorrect! You have ${guessesRemaining} guesses remaining.`;
        } else {
            messageContainer.innerHTML = `The film was ${films[currentFilmIndex].title}!`;
            setTimeout(() => {
                startGame();
            }, 3000); // Wait 3 seconds before showing the next set of emoji clues
        }
    }

    // Clear input field after each guess
    input.value = '';
};
