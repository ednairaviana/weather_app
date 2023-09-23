import { dataBase, getData } from "./database";
import { renderAsideComponent } from "./createAsComp";
import { renderFooterComponents } from "./createFooComp";
import { renderMSComponents } from "./createMainSection";
import { renderHeader } from "./createHeaderComp";
import { getDateApi } from "./clock";
import { changeScale } from "./changeScale";


async function doThings(value) {
  if ((await getData(value)) === false) {
    return
  } else {
    getDateApi();
    renderHeader();
    renderMSComponents("0");
    renderAsideComponent("0");
    renderFooterComponents("0");
    changeScale();
  }
}

function searchOnClick() {
  const searchInput = document.querySelector("#search");
  const btn = document.querySelector("#btn");

  btn.addEventListener("click", () => {
    doThings(searchInput.value);
    changeScale();
  });
}

export { doThings, searchOnClick };
