import { dataBase } from "./database";
import {renderAsideComponent} from "./createAsComp";

async function doThings() {
  console.log(dataBase); //display things -> wait for data
  renderAsideComponent("0");
}

export { doThings };
