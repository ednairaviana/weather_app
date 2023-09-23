let dataBase;

const main = document.querySelector("main");

async function getData(value) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=c55ebf895da8496991f222042231809&q=${value}&days=10&aqi=no&alerts=no`
  );
  const data = await response.json();

  if (response.ok) {
    dataBase = data;
  } else {
    console.log(response.statusText)
  }
}

export { dataBase, getData };
