//jshint esversion:6

'use strict';
//selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const player0Name = document.getElementById('name--0');
const player1Name = document.getElementById('name--1');

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Set Initialization State
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0Name.textContent = 'Player 1';
  player1Name.textContent = 'Player 2';
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Roll Dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. generate a random dice Roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2. display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //3. check for a rolled 1, if true, switch player
    if (dice !== 1) {
      //add dice to current score
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

//hold current score
btnHold.addEventListener('click', () => {
  if (playing) {
    console.log(scores[activePlayer]);
    //1. add current score to active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. check if score is >= 100
    if (scores[activePlayer] >= 100) {
      //finish game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document.getElementById(`name--${activePlayer}`).textContent =
        'WINNER!!!';

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
