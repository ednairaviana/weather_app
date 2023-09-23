import { updateMili } from "./clock.js";
import {doThings} from "./dom.js"

doThings("london");
searchOnClick();
updateMili();

function searchOnClick() {
  const searchInput = document.querySelector("#search");
  const btn = document.querySelector("#btn");

  btn.addEventListener("click", () => {
    doThings(searchInput.value);
  });
}