import {
  PER_ROW,
  DIRECTION,
  INITIAL_LENGTH,
  generateRandomNumber,
  setGameStatus,
} from "./constants.js";

import { USER_SCORE, update as updateScore } from "./score.js";

import { playCaptureMusic, playCollisionAudio } from "./sound.js";

import { isEatingFruit } from "./fruit.js";

let CURRENT_ROW = 0;
let CURRENT_COL = 0;
let SNAKE = [];

export function draw() {
  let snakeLength = SNAKE.length;
  let currentSnakeBody = document.getElementsByClassName("snake");
  currentSnakeBody.item(0)?.remove();

  for (let i = 0; i < snakeLength; i++) {
    let snakeNode = createNode(i, snakeLength - 1);
    let tile = document.querySelector(`#tile-${SNAKE[i].tile}`);
    tile.appendChild(snakeNode);
  }
}

export function update() {
  let snakeLength = SNAKE.length;
  let nextPosition = getNextPosition();
  if (
    isCollidingWithWalls(nextPosition.row, nextPosition.col, DIRECTION) ||
    isOverlapping()
  ) {
    if (USER_SCORE === PER_ROW * PER_ROW) {
      setGameStatus("win");
    } else {
      playCollisionAudio();
      setGameStatus("fail");
    }
  } else {
    for (let i = 0; i < snakeLength; i++) {
      i === snakeLength - 1
        ? updateHeadNode(SNAKE[i])
        : (SNAKE[i] = { ...SNAKE[i + 1] });
    }
  }
  if (isEatingFruit(SNAKE)) {
    playCaptureMusic();
    increaseSnakeSize();
    updateScore();
  }
}

export function removePreviousSnake() {
  const elements = document.getElementsByClassName("snake");
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}

export function placeSnake() {
  SNAKE = [];
  let randomY = generateRandomNumber(0, PER_ROW - 1);
  for (let i = 0; i < INITIAL_LENGTH; i++) {
    SNAKE.push({ x: i, y: randomY, tile: randomY * PER_ROW + i });
  }
  CURRENT_COL = INITIAL_LENGTH - 1;
  CURRENT_ROW = randomY;
}

export function increaseSnakeSize() {
  let coordinates = getNextSnakeNodeCoordinates(SNAKE[0]);
  SNAKE.unshift({
    n: "e",
    x: coordinates.x,
    y: coordinates.y,
    tile: coordinates.y * PER_ROW + coordinates.x,
  });
}

function getNextSnakeNodeCoordinates(firstSnakeNode) {
  let x, y;
  switch (DIRECTION) {
    case "up":
      y = firstSnakeNode.y + 1;
      x = firstSnakeNode.x;
      break;
    case "down":
      y = firstSnakeNode.y - 1;
      x = firstSnakeNode.x;
      break;
    case "left":
      y = firstSnakeNode.y;
      x = firstSnakeNode.x + 1;
      break;
    case "right":
      y = firstSnakeNode.y;
      x = firstSnakeNode.x - 1;
      break;
  }
  return { x, y };
}

function updateHeadNode(head) {
  switch (DIRECTION) {
    case "up":
      head.y = head.y - 1;
      CURRENT_ROW--;
      break;
    case "down":
      head.y = head.y + 1;
      CURRENT_ROW++;
      break;
    case "left":
      head.x = head.x - 1;
      CURRENT_COL--;
      break;
    case "right":
      head.x = head.x + 1;
      CURRENT_COL++;
      break;
  }
  head.tile = head.y * PER_ROW + head.x;
}

function createNode(index, length) {
  let nodeType = "";
  let nodeId = "";

  switch (index) {
    case length:
      nodeType = "head";
      break;
    default:
      nodeType = "body";
      nodeId = `${nodeType}-${index}`;
  }
  let node = document.createElement("div");
  node.setAttribute("id", nodeId);
  node.classList.add(nodeType, "snake");
  return node;
}

function isCollidingWithWalls(row, col, direction) {
  switch (direction) {
    case "up":
      if (row < 0) return true;
      break;
    case "down":
      if (row > PER_ROW - 1) return true;
      break;
    case "left":
      if (col < 0) return true;
      break;
    case "right":
      if (col > PER_ROW - 1) return true;
      break;
  }
  return false;
}

function isOverlapping() {
  let snakeLength = SNAKE.length;
  if (snakeLength <= 1) return false;
  let head = SNAKE[snakeLength - 1];
  for (let i = 0; i < snakeLength - 1; i++)
    if (SNAKE[i].tile === head.tile) return true;
  return false;
}

function getNextPosition() {
  let row = CURRENT_ROW,
    col = CURRENT_COL;
  switch (DIRECTION) {
    case "up":
      row--;
      break;
    case "down":
      row++;
      break;
    case "left":
      col--;
      break;
    case "right":
      col++;
      break;
  }
  return {
    row,
    col,
  };
}
