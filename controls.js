import { DIRECTION, setDirection } from "./constants.js";

let nextDirection = "";

export function placeControlListeners() {
  nextDirection = DIRECTION;
  document.addEventListener("keyup", (event) => {
    switch (event.code) {
      case "ArrowUp":
        nextDirection = "up";
        break;
      case "ArrowDown":
        nextDirection = "down";
        break;
      case "ArrowLeft":
        nextDirection = "left";
        break;
      case "ArrowRight":
        nextDirection = "right";
        break;
    }
  });
}

export function update() {
  switch (nextDirection) {
    case "up":
      DIRECTION !== "down" && setDirection("up");
      break;
    case "down":
      DIRECTION !== "up" && setDirection("down");
      break;
    case "left":
      DIRECTION !== "right" && setDirection("left");
      break;
    case "right":
      DIRECTION !== "left" && setDirection("right");
      break;
    default:
      setDirection(DIRECTION);
  }
}
