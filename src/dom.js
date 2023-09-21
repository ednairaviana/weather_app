import { dataBase } from "./database";
import { updateClock } from "./clock";

async function doThings() {
  console.log(dataBase.location.tz_id); //display things -> wait for data
}

export { doThings };
