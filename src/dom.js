import { dataBase, getData } from "./database";
import { renderAsideComponent } from "./createAsComp";
import { renderFooterComponents } from "./createFooComp";
import { renderMSComponents } from "./createMainSection";
import { renderHeader } from "./createHeaderComp";
import { getDateApi } from "./clock";
import { changeScale } from "./changeScale";

async function doThings(value) {
  await getData(value);
  console.log(dataBase); //display things -> wait for data
  getDateApi();
  renderHeader();
  renderMSComponents("0");
  renderAsideComponent("0");
  renderFooterComponents();
  changeScale();
}

export { doThings };
