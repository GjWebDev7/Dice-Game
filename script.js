'use strict';
// Activates strict mode in JavaScript, enforcing stricter parsing and error handling, making it easier to catch bugs and unsafe actions.

// Selecting elements from the DOM (Document Object Model)
const player0El = document.querySelector('.player--0');
// Selects the element with the class 'player--0' (represents Player 0's container).

const player1El = document.querySelector('.player--1');
// Selects the element with the class 'player--1' (represents Player 1's container).

const score0El = document.querySelector('#score--0');
// Selects the element with the ID 'score--0' (displays Player 0's total score).

const score1El = document.getElementById('score--1');
// Selects the element with the ID 'score--1' (displays Player 1's total score).

const current0El = document.getElementById('current--0');
// Selects the element with the ID 'current--0' (displays Player 0's current round score).

const current1El = document.getElementById('current--1');
// Selects the element with the ID 'current--1' (displays Player 1's current round score).

const diceEl = document.querySelector('.dice');
// Selects the dice image element with the class 'dice'.

const btnNew = document.querySelector('.btn--new');
// Selects the button element with the class 'btn--new' (to reset the game).

const btnRoll = document.querySelector('.btn--roll');
// Selects the button element with the class 'btn--roll' (to roll the dice).

const btnHold = document.querySelector('.btn--hold');
// Selects the button element with the class 'btn--hold' (to hold the current score).

// Declaring variables for game state
let scores, currentScore, activePlayer, playing;
// `scores`: array to store total scores for both players
// `currentScore`: stores the score for the ongoing round
// `activePlayer`: tracks the currently active player (0 for Player 0, 1 for Player 1)
// `playing`: boolean to check if the game is ongoing

const init = function () {
  // Function to initialize or reset the game to its starting state
  scores = [0, 0];
  // Initializes scores for both players to 0.
  currentScore = 0;
  // Resets the current score to 0.
  activePlayer = 0;
  // Sets Player 0 as the starting player.
  playing = true;
  // Indicates the game is active and can be played.

  score0El.textContent = 0;
  // Displays Player 0's total score as 0.

  score1El.textContent = 0;
  // Displays Player 1's total score as 0.

  current0El.textContent = 0;
  // Resets Player 0's current score display to 0.

  current1El.textContent = 0;
  // Resets Player 1's current score display to 0.

  diceEl.classList.add('hidden');
  // Hides the dice image by adding the 'hidden' class.

  player0El.classList.remove('player--winner');
  // Removes the winner styling from Player 0 (if previously added).

  player1El.classList.remove('player--winner');
  // Removes the winner styling from Player 1 (if previously added).

  player0El.classList.add('player--active');
  // Sets Player 0 as the active player by adding 'player--active' class.

  player1El.classList.remove('player--active');
  // Ensures Player 1 does not have the active styling.

  // Remove any existing winning messages
  document
    .querySelectorAll('.winning-message')
    .forEach(message => message.remove());
};

init();
// Calls the `init` function to initialize the game when the script is loaded.

const switchPlayer = function () {
  // Function to switch the active player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  // Resets the current score display of the active player to 0.

  currentScore = 0;
  // Resets the `currentScore` variable to 0.

  activePlayer = activePlayer === 0 ? 1 : 0;
  // Switches the active player. If Player 0 is active, switch to Player 1, and vice versa.

  player0El.classList.toggle('player--active');
  // Toggles the 'player--active' class on Player 0's container (adds if absent, removes if present).

  player1El.classList.toggle('player--active');
  // Toggles the 'player--active' class on Player 1's container.
};

btnRoll.addEventListener('click', function () {
  // Adds an event listener to the roll button for the 'click' event.
  if (playing) {
    // Checks if the game is active.
    const dice = Math.trunc(Math.random() * 6) + 1;
    // Generates a random dice roll between 1 and 6.

    diceEl.classList.remove('hidden');
    // Makes the dice visible by removing the 'hidden' class.

    diceEl.src = `dice-${dice}.png`;
    // Updates the dice image based on the rolled value.

    if (dice !== 1) {
      // If the dice roll is not 1:
      currentScore += dice;
      // Adds the dice value to the current score.

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // Updates the current score display for the active player.
    } else {
      // If the dice roll is 1:
      switchPlayer();
      // Calls `switchPlayer` to switch to the other player.
    }
  }
});

btnHold.addEventListener('click', function () {
  // Adds an event listener to the hold button for the 'click' event.
  if (playing) {
    // Checks if the game is active.
    scores[activePlayer] += currentScore;
    // Adds the current score to the active player's total score.

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // Updates the total score display for the active player.

    if (scores[activePlayer] >= 20) {
      // Checks if the active player's score is 20 or more.
      playing = false;
      // Ends the game by setting `playing` to false.

      diceEl.classList.add('hidden');
      // Hides the dice.

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      // Adds the winner styling to the active player.

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      // Removes the active styling from the winner.

      // Display a winning message
      document
        .querySelector(`.player--${activePlayer}`)
        .insertAdjacentHTML(
          'beforeend',
          `<p class="winning-message">🎉 Player ${
            activePlayer + 1
          } Wins! 🏆</p>`
        );
    } else {
      // If no player has won yet:
      switchPlayer();
      // Switches to the other player.
    }
  }
});

btnNew.addEventListener('click', init);
// Adds an event listener to the new game button for the 'click' event.
// When clicked, it resets the game by calling the `init` function.
