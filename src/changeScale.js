import { renderMSComponents } from "./createMainSection";
import { renderAsideComponent } from "./createAsComp";
import { renderFooterComponents } from "./createFooComp";

let farenheit = false;

const tglBtn = document.querySelector(".toggle-btn");
const dot = document.querySelector(".dot");
const c = document.querySelector("#c");
const f = document.querySelector("#f");

function changeScale() {
    tglBtn.addEventListener("click", ()=> {
        if (farenheit) {
            farenheit = false;
            dot.classList.remove("dot-click");
        } else {
            farenheit = true;
            dot.classList.add("dot-click");
        }

        renderMSComponents("0");
        renderAsideComponent("0");
        renderFooterComponents();
    })
}

export {farenheit, changeScale}