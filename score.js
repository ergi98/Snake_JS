import { PER_ROW, INITIAL_LENGTH } from "./constants.js";

export let USER_SCORE = 0;
const MAX_SCORE = PER_ROW * PER_ROW;

export function draw() {
  document.querySelector("#user-score").innerText = USER_SCORE;
}

export const update = () => ++USER_SCORE;

export function placeScoreBoard() {
  // Reset
  USER_SCORE = INITIAL_LENGTH;

  let scoreboard = document.querySelector("#scoreboard");
  scoreboard.innerHTML = "";
  
  let userScore = document.createElement("span");
  userScore.innerText = USER_SCORE;
  userScore.setAttribute("id", "user-score");
  userScore.classList.add("user-score");

  let divider = document.createElement("span");
  divider.innerText = "/";
  divider.classList.add("divider");

  let maxScore = document.createElement("span");
  maxScore.innerText = MAX_SCORE.toString();
  maxScore.setAttribute("id", "max-score");
  maxScore.classList.add("max-score");

  scoreboard.appendChild(userScore);
  scoreboard.appendChild(divider);
  scoreboard.appendChild(maxScore);
}
