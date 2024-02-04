const form = document.querySelector("form");
const input = document.querySelector("#form__input");
const cardContent = document.querySelector(".card__content");
const btnBack = document.querySelector(".btn__back");
const weatherInfoDiv = document.getElementById("weatherInfo");
const failedToFetchWeatherInfoDiv = document.getElementById(
  "failedToFetchWeatherInfo"
);

function getWeather(e) {
  e.preventDefault();
  const cityName = input.value;
  const apiKey = "59e3ea418a47ae5706f67a0f882c03f8";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  let fellsLikeTempCol;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Extract and display relevant weather information from the API response

      let tempColor =
        Math.round(data.main.temp) >= 1 && Math.round(data.main.temp) <= 10
          ? "yellow"
          : Math.round(data.main.temp) >= 11 && Math.round(data.main.temp) <= 18
          ? "green"
          : "red";

      let fellsLikeTempCol =
        Math.round(data.main.feels_like) >= 1 &&
        Math.round(data.main.feels_like) <= 10
          ? "yellow"
          : Math.round(data.main.feels_like) >= 11 &&
            Math.round(data.main.feels_like) <= 18
          ? "green"
          : "red";

      weatherInfoDiv.innerHTML = `
        <p style="margin-bottom: 6px;">Temperature: <span style="color:${tempColor}">${Math.round(
        data.main.temp
      )}&deg;C</span></p>
        <p style="margin-bottom: 6px;">Feels Like: <span style="color:${fellsLikeTempCol}">${Math.round(
        data.main.feels_like
      )}&deg;C</span></p>
        <p style="margin-bottom: 6px;">Humidity: ${Math.round(
          data.main.humidity
        )}%</p>   
        <p style="margin-bottom: 6px;">Wind: ${Math.round(
          data.wind.speed
        )} km/h</p>  
        <p style="margin-bottom: 6px;">Description: <span style="text-transform: uppercase">${
          data.weather[0].description
        }</span></p>      
                                    `;
      failedToFetchWeatherInfoDiv.innerHTML = "";
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      failedToFetchWeatherInfoDiv.innerHTML =
        "<p>Failed to fetch weather data. Please try again.</p>";
      weatherInfoDiv.innerHTML = ``;
    });

  flipCard();
  form.reset();
}

function flipCard() {
  cardContent.classList.toggle("is-flipped");
}

form.addEventListener("submit", getWeather);
btnBack.addEventListener("click", flipCard);
