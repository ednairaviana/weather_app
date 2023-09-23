import { dataBase } from "./database";
import {renderAsideComponent} from "./createAsComp";
import { renderFooterComponents } from "./createFooComp";
import { renderMSComponents } from "./createMainSection";
import { renderHeader } from "./createHeaderComp";
import { updateClock } from "./clock";

async function doThings() {
  console.log(dataBase); //display things -> wait for data
  updateClock();
  renderHeader();
  renderMSComponents();
  renderAsideComponent("0");
  renderFooterComponents();
}

export { doThings };
