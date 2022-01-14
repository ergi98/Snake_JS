import { generateRandomNumber, PER_ROW } from "./constants.js";

let FRUITS = [];

export function draw() {
  let fruitLength = FRUITS.length;
  for (let i = 0; i < fruitLength; i++) {
    let fruit = createFruit(i);
    let tile = document.querySelector(`#tile-${FRUITS[i].tile}`);
    tile.appendChild(fruit);
  }
}

export function update() {
  if (FRUITS.length >= 10) return;
  let x = generateRandomNumber(0, PER_ROW - 1);
  let y = generateRandomNumber(0, PER_ROW - 1);
  let tile = y * PER_ROW + x;
  let tileNode = document.querySelector(`#tile-${tile}`);
  if (
    !tileNode.getElementsByClassName("snake").length &&
    !tileNode.getElementsByClassName("fruit").length
  ) {
    FRUITS.push({
      x,
      y,
      tile,
    });
  }
}

export function resetFruits() {
  FRUITS = [];
}

export function removePreviousFruits() {
  const elements = document.getElementsByClassName("fruit");
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}

export function isEatingFruit(snake) {
  let snakeLength = snake.length;
  let fruitLength = FRUITS.length;

  for (let i = 0; i < snakeLength; i++) {
    for (let j = 0; j < fruitLength; j++) {
      if (snake[i].tile === FRUITS[j].tile) {
        FRUITS.splice(j, 1);
        return true;
      }
    }
  }
  return false;
}

function createFruit(index) {
  let fruit = document.createElement("div");
  fruit.style.backgroundColor = "whitesmoke";
  fruit.classList.add("fruit");
  fruit.setAttribute("id", `fruit-${index}`);
  return fruit;
}
