import { PER_ROW } from "./constants.js";

const TILE_COUNT = PER_ROW * PER_ROW;

function showNumbers(tile, number) {
  let numberNode = document.createElement("span");
  numberNode.innerText = number;
  numberNode.classList.add("number");
  tile.appendChild(numberNode);
}

function placeMap(numbers = false) {
  let map = document.getElementById("map");
  map.innerHTML = "";
  var tileFragments = document.createDocumentFragment();
  for (let i = 0; i < TILE_COUNT; i++) {
    let tile = document.createElement("div");
    numbers && showNumbers(tile, i);
    tile.classList.add("tile");
    tile.setAttribute("id", `tile-${i}`);
    tileFragments.appendChild(tile);
  }
  map.appendChild(tileFragments);
}
export default placeMap;
