const PER_ROW = 25;
const SNAKE_SPEED = .75;
const INITIAL_LENGTH = 1;

let DIRECTION = "right";
// not-started
// in-progress
// win
// fail
let GAME_STATUS = "";

const generateRandomNumber = (min = 0, max = 624) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  // The maximum is inclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const generateRandomColor = () =>
  Math.floor(Math.random() * 16777215).toString(16);

const setDirection = (direction) => (DIRECTION = direction);

const setGameStatus = (status) => (GAME_STATUS = status);

export {
  DIRECTION,
  GAME_STATUS,
  PER_ROW,
  SNAKE_SPEED,
  INITIAL_LENGTH,
  setDirection,
  setGameStatus,
  generateRandomColor,
  generateRandomNumber,
};
