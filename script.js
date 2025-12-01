// API Key and URL for fetching weather data
const apiKey = "0b984a3642a403726132d2d09461d572";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

// Selecting necessary DOM elements
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Clear input field on page refresh
window.onload = () => {
    searchBox.value = ""; // Reset the input field when the page loads
};

// Function to fetch and display weather data for a given city
async function checkWeather(city) {
    try {
        // Fetch weather data from the API
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if (response.status == 404) {
            // Show error message if the city is not found
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {
            // Parse the JSON response
            const data = await response.json();

            // Update weather details in the DOM
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = data.main.temp + " °C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

            // Update the weather icon based on the weather condition
            const weatherCondition = data.weather[0].main;
            if (weatherCondition === "Clouds") {
                weatherIcon.src = "images/clouds.png";
            } else if (weatherCondition === "Clear") {
                weatherIcon.src = "images/clear.png";
            } else if (weatherCondition === "Rain") {
                weatherIcon.src = "images/rain.png";
            } else if (weatherCondition === "Drizzle") {
                weatherIcon.src = "images/drizzle.png";
            } else if (weatherCondition === "Mist") {
                weatherIcon.src = "images/mist.png";
            } else {
                weatherIcon.src = "images/default.png"; // Default icon for unhandled cases
            }

            // Show the weather details and hide the error message
            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

// Add event listener to the search button to trigger weather check
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value); // Fetch weather for the entered city
});
