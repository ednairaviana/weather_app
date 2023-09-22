import { dataBase } from "./database";
import {renderAsideComponent} from "./createAsComp";
import { renderFooterComponents } from "./createFooComp";

async function doThings() {
  console.log(dataBase); //display things -> wait for data
  renderAsideComponent("0");
  renderFooterComponents();
}

export { doThings };
