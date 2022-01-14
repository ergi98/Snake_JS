import { SNAKE_SPEED, GAME_STATUS, setGameStatus } from "./constants.js";

// Score
import { placeScoreBoard, draw as drawScoreBoard } from "./score.js";

// Map
import placeMap from "./map.js";

// Fruits
import {
  resetFruits,
  removePreviousFruits,
  draw as drawFood,
  update as updateFood,
} from "./fruit.js";

// Snake
import {
  placeSnake,
  removePreviousSnake,
  draw as drawSnake,
  update as updateSnake,
} from "./snake.js";

// Controls
import {
  placeControlListeners,
  update as updateDirection,
} from "./controls.js";

// Audio
import { playThemeMusic, stopThemeMusic } from "./sound.js";

// not-started in-progress fail success
let lastRenderTime = 0;

function main(currentTime) {
  if (GAME_STATUS !== "in-progress") {
    stopGame();
    return;
  }
  window.requestAnimationFrame(main);
  const timeSinceLastRender = (currentTime - lastRenderTime) / 100;
  if (timeSinceLastRender < 1 / SNAKE_SPEED) return;
  lastRenderTime = currentTime;
  update();
  draw();
}

function initialSetup() {
  setGameStatus("not-started");
  placeMap(false);
  placeSnake();
  placeControlListeners();
  placeScoreBoard();
  addStartGameOverlay();
  draw();
}

function startGame() {
  setGameStatus("in-progress");
  removeOverlay();
  playThemeMusic();
  window.requestAnimationFrame(main);
}

function stopGame() {
  stopThemeMusic();
}

function update() {
  updateDirection();
  updateSnake();
  updateFood();
}

function draw() {
  removePreviousSnake();
  removePreviousFruits();
  drawSnake();
  drawFood();
  drawScoreBoard();
  if (GAME_STATUS === "fail") {
    addLoseGameOverlay();
  } else if (GAME_STATUS === "win") {
    addWinGameOverlay();
  }
}

function removeOverlay() {
  let overlay = document.querySelector("#overlay");
  if (overlay) overlay.remove();
}

function createOverlay(customClass = null) {
  // Overlay
  let overlay = document.createElement("div");
  overlay.setAttribute("id", "overlay");
  overlay.classList.add("overlay");
  customClass && overlay.classList.add(customClass);
  return overlay;
}

function createButton(text, className, event) {
  let buttonNode = document.createElement("button");
  buttonNode.classList.add(className); // "start-game-button"
  buttonNode.addEventListener("click", () => event());
  buttonNode.innerText = text; // "Start";
  return buttonNode;
}

function addStartGameOverlay() {
  let body = document.getElementsByTagName("body")[0];
  // Overlay
  let overlay = createOverlay();
  // Start Game
  let startGameButton = createButton("Start", "start-game-button", startGame);
  // Appends
  overlay.appendChild(startGameButton);
  body.appendChild(overlay);
}

function createStatusNode(text, className) {
  let statusNode = document.createElement("div");
  statusNode.innerText = text;
  statusNode.classList.add(className);
  return statusNode;
}

function addLoseGameOverlay() {
  let body = document.getElementsByTagName("body")[0];
  // Overlay
  let overlay = createOverlay("col-overlay");
  // Text
  let text = createStatusNode("YOU LOST! :(", "lose-text");
  // Restart Game
  let startGameButton = createButton(
    "Start Again",
    "start-game-button",
    restartGame
  );
  overlay.append(text);
  overlay.appendChild(startGameButton);
  body.appendChild(overlay);
}

function addWinGameOverlay() {
  let body = document.getElementsByTagName("body")[0];
  // Overlay
  let overlay = createOverlay("col-overlay");
  // Text
  let text = createStatusNode("YOU WON! :)", "win-text");
  // Restart Game
  let startGameButton = createButton(
    "Restart",
    "start-game-button",
    restartGame
  );
  overlay.append(text);
  overlay.appendChild(startGameButton);
  body.appendChild(overlay);
}

function restartGame() {
  placeSnake();
  placeMap();
  resetFruits();
  placeScoreBoard();
  startGame();
}

initialSetup();
