let unit = "°F";
const content = document.querySelector("#content");
const userLocation = document.querySelector("#location");
const searchBtn = document.querySelector("#searchWeather");
searchBtn.addEventListener("click", async () => {
  if (verifyLocation()) {
    let weather = await getApiWeather(userLocation.value);
    changeLayout(weather);
  }
});

function verifyLocation() {
  if (userLocation.value === "" || userLocation.value === null) {
    window.alert("Please write any place or country before search");
    return false;
  }
  return true;
}

async function getApiWeather(location) {
  const key = "QAA7S2HQMRSSG44SGL4PEZKZA";

  const date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = String(month).padStart(2, "0");
  let day = date.getDate();
  day = String(day).padStart(2, "0");

  const actualDate = `${year}-${month}-${day}`;

  const api =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
    location +
    "/" +
    actualDate +
    "/?key=" +
    key;
  const response = await fetch(api, { mode: "cors" });
  const data = await response.json();

  return data.days[0].temp;
}

function changeLayout(weather) {
  let place = document.createElement("p");
  place.innerText = userLocation.value;
  place.className = "display";
  place.style.width = "100%";
  place.style.textAlign = "center";

  while (content.hasChildNodes()) {
    content.removeChild(content.firstChild);
  }
  content.style.left = "50%";

  let placeWeather = document.createElement("p");
  placeWeather.innerText = `${weather} ${unit}`;
  placeWeather.className = "display";
  placeWeather.style.width = "100%";
  placeWeather.style.textAlign = "center";

  let buttonChangeType = document.createElement("button");
  buttonChangeType.innerText = "Change to Celsius";
  buttonChangeType.style.width = "100px";

  buttonChangeType.addEventListener("click", () => {
    if (unit === "°F") {
      unit = "°C";
      let Fahrenheit = parseFloat(placeWeather.innerText);
      let Celcius = ((Fahrenheit - 32) * 5) / 9;
      placeWeather.innerText = `${Celcius.toFixed(1)} ${unit}`;
      buttonChangeType.innerText = "Change to Fahrenheit";
    } else {
      unit = "°F";
      let Celcius = parseFloat(placeWeather.innerText);
      let Fahrenheit = (Celcius * 9) / 5 + 32;
      placeWeather.innerText = `${Fahrenheit.toFixed(1)} ${unit}`;
      buttonChangeType.innerText = "Change to Celsius";
    }
  });

  content.appendChild(place);
  content.appendChild(placeWeather);
  content.appendChild(buttonChangeType);
}
