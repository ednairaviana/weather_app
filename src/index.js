import { getData } from "./database";
import { doThings } from "./dom";

async function thing() {
    await getData("maracanau");
    doThings();
}

thing();



