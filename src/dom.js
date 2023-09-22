import { dataBase } from "./database";
import {renderAsideComponent} from "./createAsComp";
import { renderFooterComponents } from "./createFooComp";
import { renderMSComponents } from "./createMainSection";

async function doThings() {
  console.log(dataBase); //display things -> wait for data
  renderMSComponents();
  renderAsideComponent("0");
  renderFooterComponents();
}

export { doThings };
