const container = document.querySelector('.weather-container');
const search = document.querySelector('.search button')
const weatherSection = document.querySelector('.weather-section');
const details = document.querySelector('.details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const APIKey = 'b6c38cb34ebe6954469e570d0fda66ef';
    const city = document.querySelector('.search input').value;

    if (city == '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`).then(response => response.json()).then(json => {

        if (json.cod == '404') {
            container.style.height = '400px';
            weatherSection.classList.remove('active');
            details.classList.remove('active');
            error404.classList.add('active');
            return;
        }
        container.style.height  = '600px;'
        weatherSection.classList.add('active');
        details.classList.add('active');
        error404.classList.remove('active');

        const image = document.querySelector('.weather-section img');
        const temperature = document.querySelector('.weather-section .temperature');
        const description = document.querySelector('.weather-section .description');
        const humidity = document.querySelector('.details .humidity span');
        const wind = document.querySelector('.details .wind span');

        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'images/sun.png';
                break;
            
            case 'Rain':
                image.src = 'images/rain.png';
                break;
            
            case 'Snow':
                image.src = 'images/snow.png';
                break;
            
            case 'Clouds':
                image.src = 'images/overcast.png';
                break;
            
            case 'Mist':
                image.src = 'images/fog.png';
                break;

            case 'Haze':
                image.src = 'images/fog.png';
                break;

            default:
                image.src = 'images/overcast.png';
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°F</span>`;
        description.innerHTML = `${json.weather[0].main}<span></span>`;
        humidity.innerHTML = `${parseInt(json.main.humidity)}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}mph`;
    });
});