document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "ca5a5aadc71e65d62d82de4c4f4bed84";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

    const searchBox = document.querySelector(".search input");
    const searchBtn = document.querySelector(".search button");
    const weatherIcon = document.querySelector(".weather-icon");

    async function checkWeather(city) {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if (response.status == 404) {
            document.querySelector(".weather").style.display = "none";
            document.querySelector(".error").style.display = "block";

        } else {
            var data = await response.json();

            console.log(data);

            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

            switch (data.weather[0].main) {
                case "Clouds":
                    weatherIcon.src = "images/clouds.png";
                    break;
                case "Clear":
                    weatherIcon.src = "images/clear.png";
                    break;
                case "Rain":
                    weatherIcon.src = "images/rain.png";
                    break;
                case "Drizzle":
                    weatherIcon.src = "images/drizzle.png";
                    break;
                case "Mist":
                    weatherIcon.src = "images/mist.png";
                    break;
                default:
                    weatherIcon.src = "";
                    break;
            }

            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";

        }

    }

    searchBtn.addEventListener("click", () => {
        checkWeather(searchBox.value);
    });
});
