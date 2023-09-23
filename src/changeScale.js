import { renderMSComponents } from "./createMainSection";
import { renderAsideComponent } from "./createAsComp";
import { renderFooterComponents } from "./createFooComp";
import { currentCompIndex } from "./createFooComp";

let farenheit = false;

const tglBtn = document.querySelector(".toggle-btn");
const dot = document.querySelector(".dot");
const c = document.querySelector("#c");
const f = document.querySelector("#f");

function changeScale() {
  tglBtn.addEventListener("click", () => {
    if (farenheit) {
      farenheit = false;
      dot.classList.remove("dot-click");
      c.style.color = "#FFF";
      f.style.color = "gray";
    } else {
      farenheit = true;
      dot.classList.add("dot-click");
      c.style.color = "gray";
      f.style.color = "#FFF";
    }

    renderMSComponents(currentCompIndex);
    renderAsideComponent(currentCompIndex);
    renderFooterComponents(currentCompIndex);
  });
}

export { farenheit, changeScale };
