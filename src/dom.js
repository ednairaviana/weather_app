import { dataBase, getData } from "./database";
import { renderAsideComponent } from "./createAsComp";
import { renderFooterComponents } from "./createFooComp";
import { renderMSComponents } from "./createMainSection";
import { renderHeader } from "./createHeaderComp";
import { getDateApi, updateClock } from "./clock";

async function doThings(value) {
  await getData(value);
  console.log(dataBase); //display things -> wait for data
  getDateApi();
  renderHeader();
  renderMSComponents();
  renderAsideComponent("0");
  renderFooterComponents();
}

export {doThings}
