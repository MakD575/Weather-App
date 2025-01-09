async function fetchWeather(city, state, country) {
    const apiKey = 'b6c38cb34ebe6954469e570d0fda66ef'; // Replace with your actual API key
    let location = city;
    if (state) location += `,${state}`;
    if (country) location += `,${country}`;
    const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
  
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw new Error('Unable to fetch weather data. Please try again.');
    }
  }
  
  function displayWeather(data) {
    const weatherDiv = document.getElementById('weatherResult');
    const weatherInfo = `
      <h2>Weather in ${data.name}, ${data.sys.country}</h2>
      <p>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">
        <br>Temperature: ${data.main.temp}°C
      </p>
      <p>Weather: ${data.weather[0].description}</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
    weatherDiv.innerHTML = weatherInfo;
  }
  
  document.getElementById('getWeather').addEventListener('click', async () => {
    const city = document.getElementById('cityInput').value;
    const state = document.getElementById('stateInput').value;
    const country = document.getElementById('countryInput').value;
    const weatherDiv = document.getElementById('weatherResult');
    weatherDiv.innerHTML = '<p>Loading...</p>';
  
    try {
      const weatherData = await fetchWeather(city, state, country);
      displayWeather(weatherData);
    } catch (error) {
      weatherDiv.innerHTML = `<p>${error.message}</p>`;
    }
  });
