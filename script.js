"use strict";

const reset = document.querySelector(".btn--new");
const roll = document.querySelector(".btn--roll");
const hold = document.querySelector(".btn--hold");
const dice = document.querySelector(".dice");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

//This function generatos an integer number betwenn 1 and 6 and changes the dice image
function randomDice() {
  const number = Number(Math.floor(Math.random() * 6 + 1));
  dice.src = `dice-${number}.png`;
  return number;
}

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = "0";
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
}

function init() {
  activePlayer = 0;
  player0.classList.add("player--active");
  player1.classList.remove("player--active");

  dice.classList.add("hidden");

  score0El.textContent = "0";
  score1El.textContent = "0";
  current0El.textContent = "0";
  current1El.textContent = "0";

  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");

  totalScore = [0, 0];
  finished = false;
  let currentScore = 0;
}

let totalScore, currentScore, activePlayer, finished;
init();

//When we reset the game, all score must be reseted and the player active must be the player 1
reset.addEventListener("click", init);

roll.addEventListener("click", function () {
  if (!finished) {
    const number = randomDice();
    dice.classList.remove("hidden");
    if (number !== 1) {
      currentScore += number;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else switchPlayer();
  }
});

hold.addEventListener("click", function () {
  totalScore[activePlayer] += currentScore;
  console.log(document.getElementById(`score--${activePlayer}`))
  document.getElementById(`score--${activePlayer}`).textContent = totalScore[activePlayer];
  if (totalScore[activePlayer] >= 100) {
    finished = true;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner");
    currentScore = 0;
  } else {
    dice.classList.add("hidden");
    switchPlayer();
  }
});
