const apiKey = '4d8fb5b93d4af21d66a2948710284366'; // Your OpenWeatherMap API key
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');
const locationButton = document.querySelector('.location-button');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const locationText = document.querySelector('.location');
const humidityValue = document.querySelector('.humidity-value');
const windSpeed = document.querySelector('.wind-speed');

// Function to fetch weather data by city name
async function getWeatherByCity(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        const data = await response.json();
        
        if (response.ok) {
            updateWeatherUI(data);
        } else {
            alert('City not found. Please try again.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data. Please try again.');
    }
}

// Function to fetch weather data by coordinates
async function getWeatherByCoords(lat, lon) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
        const data = await response.json();
        
        if (response.ok) {
            updateWeatherUI(data);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data. Please try again.');
    }
}

// Function to update the UI with weather data
function updateWeatherUI(data) {
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;
    locationText.textContent = `${data.name}, ${data.sys.country}`;
    humidityValue.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${data.wind.speed} m/s`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}

// Event listener for search button
searchButton.addEventListener('click', () => {
    const city = searchInput.value.trim();
    if (city) {
        getWeatherByCity(city);
    }
});

// Event listener for Enter key in search input
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        const city = searchInput.value.trim();
        if (city) {
            getWeatherByCity(city);
        }
    }
});

// Event listener for location button
locationButton.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                getWeatherByCoords(latitude, longitude);
            },
            (error) => {
                console.error('Error getting location:', error);
                alert('Error getting location. Please try searching for a city instead.');
            }
        );
    } else {
        alert('Geolocation is not supported by your browser. Please search for a city instead.');
    }
}); 